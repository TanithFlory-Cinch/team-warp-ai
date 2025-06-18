'use client'

import { useState, useEffect } from 'react';
import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import {ContactList} from '@/components/ContactList';
import {PersonProfile} from '@/components/PersonProfile';
import {CompanyProfile} from '@/components/CompanyProfile';
import {Navigation} from '@/components/Navigation';

export type Person = {
  id: string;
  name: string;
  title: string;
  photo: string;
  photoUrl: string;
  headline: string;
  email: string;
  phone: string;
  linkedin: string;
  city: string;
  seniority: 'Junior' | 'Mid' | 'Senior' | 'Executive' | 'C-Level';
  company: Company;
  employmentHistory: EmploymentHistory[];
};

export type Company = {
  id: string;
  name: string;
  logo: string;
  logoUrl: string;
  revenue: number;
  organizationRevenue: number;
  foundedYear: number;
  intentStrength: 'Low' | 'Medium' | 'High';
  websiteUrl: string;
  linkedinUrl: string;
  primaryPhone: string;
  sanitizedPhone: string;
  fundsReceived: number;
  seedRound: number;
};

export type EmploymentHistory = {
  company: string;
  position: string;
  startDate: string;
  endDate: string;
  current: boolean;
};

const Page = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  
  const [currentView, setCurrentView] = useState<'contacts' | 'person' | 'company'>('contacts');
  const [selectedPerson, setSelectedPerson] = useState<Person | null>(null);
  const [selectedCompany, setSelectedCompany] = useState<Company | null>(null);
  const [contactsData, setContactsData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // Redirect to sign-in if not authenticated
  useEffect(() => {
    if (status === 'loading') return; // Still loading
    if (!session) {
      router.push('/auth/signin');
      return;
    }
  }, [session, status, router]);

  useEffect(() => {
    fetch('/api/contacts')
      .then(res => res.json())
      .then((data) => {
        setContactsData(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  // Map fetched data to Person and Company types
  // Since contactsData is now an array of company profiles, we need to extract all organizations and people
  const allOrganizations: any[] = [];
  const allPeople: any[] = [];
  const profileDataMap = new Map(); // To store profile-level data like FundsReceived, SeedRound

  // Extract organizations and people from all company profiles
  contactsData?.forEach((profile: any) => {
    if (profile.data?.organizations) {
      // Store profile-level data for each organization
      profile.data.organizations.forEach((org: any) => {
        profileDataMap.set(org.id, {
          fundsReceived: profile.data.FundsReceived || '0',
          seedRound: profile.data.SeedRound || '0',
        });
      });
      allOrganizations.push(...profile.data.organizations);
    }
    if (profile.data?.people) {
      allPeople.push(...profile.data.people);
    }
  });

  // Helper function to convert string amounts to numbers
  const parseAmount = (amount: string | number): number => {
    if (typeof amount === 'number') return amount;
    if (!amount || amount === '0') return 0;
    
    const str = amount.toString().replace(/[$,]/g, '');
    
    // Handle non-numeric values like "Seed"
    if (str.toLowerCase() === 'seed' || isNaN(parseFloat(str))) {
      return 0; // or you could return a default value
    }
    
    if (str.includes('M')) {
      return parseFloat(str.replace('M', '')) * 1000000;
    }
    if (str.includes('K')) {
      return parseFloat(str.replace('K', '')) * 1000;
    }
    return parseFloat(str) || 0;
  };

  const companies: Company[] = allOrganizations.map((org: any) => {
    const profileData = profileDataMap.get(org.id) || { fundsReceived: '0', seedRound: '0' };
    
    return {
      id: org.id,
      name: org.name,
      logo: org.logo_url,
      logoUrl: org.logo_url,
      revenue: org.organization_revenue ?? 0,
      organizationRevenue: org.organization_revenue ?? 0,
      foundedYear: org.founded_year ?? 0,
      intentStrength: org.intent_strength || 'Low',
      websiteUrl: org.website_url,
      linkedinUrl: org.linkedin_url,
      primaryPhone: org.primary_phone?.number ?? '',
      sanitizedPhone: org.sanitized_phone ?? '',
      fundsReceived: parseAmount(profileData.fundsReceived),
      seedRound: profileData.seedRound,
    };
  });

  const people: Person[] = allPeople.map((p: any) => ({
    id: p.id,
    name: p.name,
    title: p.title,
    photo: p.photo_url,
    photoUrl: p.photo_url,
    headline: p.headline,
    email: p.email,
    phone: p.organization?.primary_phone?.number ?? '',
    linkedin: p.linkedin_url,
    city: p.city,
    seniority: p.seniority === 'founder' ? 'C-Level' : (p.seniority || 'Junior').replace(/^./, (c: string) => c.toUpperCase()),
    company: companies.find((c) => c.id === (p.organization?.id || p.organization_id)) || {
      id: p.organization?.id || '',
      name: p.organization?.name || '',
      logo: p.organization?.logo_url || '',
      logoUrl: p.organization?.logo_url || '',
      revenue: p.organization?.organization_revenue ?? 0,
      organizationRevenue: p.organization?.organization_revenue ?? 0,
      foundedYear: p.organization?.founded_year ?? 0,
      intentStrength: p.organization?.intent_strength || 'Low',
      websiteUrl: p.organization?.website_url || '',
      linkedinUrl: p.organization?.linkedin_url || '',
      primaryPhone: p.organization?.primary_phone?.number ?? '',
      sanitizedPhone: p.organization?.sanitized_phone ?? '',
      fundsReceived: 0,
      seedRound: 0,
    },
    employmentHistory: (p.employment_history || []).map((eh: any) => ({
      company: eh.organization_name,
      position: eh.title,
      startDate: eh.start_date,
      endDate: eh.end_date,
      current: eh.current,
    })),
  }));

  const handlePersonClick = (person: Person) => {
    setSelectedPerson(person);
    setCurrentView('person');
  };

  const handleCompanyClick = (company: Company) => {
    setSelectedCompany(company);
    setCurrentView('company');
  };

  const handleBackToContacts = () => {
    setCurrentView('contacts');
    setSelectedPerson(null);
    setSelectedCompany(null);
  };

  // Show loading while checking authentication
  if (status === 'loading') {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  // Don't render if not authenticated
  if (!session) {
    return null;
  }

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading data...</div>;
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Add user info and sign out button */}
      <div className="bg-white border-b border-slate-200 px-6 py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-4">
            {session.user?.image && (
              <img 
                src={session.user.image} 
                alt={session.user.name || ''} 
                className="w-8 h-8 rounded-full"
              />
            )}
            <span className="text-sm text-gray-700">
              Welcome, {session.user?.name || session.user?.email}
            </span>
          </div>
          <button
            onClick={() => signOut()}
            className="text-sm text-red-600 hover:text-red-800 cursor-pointer"
          >
            Sign Out
          </button>
        </div>
      </div>

      <Navigation 
        currentView={currentView}
        onBackToContacts={handleBackToContacts}
        selectedPersonName={selectedPerson?.name}
        selectedCompanyName={selectedCompany?.name}
      />
      
      <main className="container mx-auto px-6 py-8">
        {currentView === 'contacts' && (
          <ContactList 
            people={people}
            companies={companies}
            onPersonClick={handlePersonClick}
            onCompanyClick={handleCompanyClick}
          />
        )}
        
        {currentView === 'person' && selectedPerson && (
          <PersonProfile 
            person={selectedPerson}
            onCompanyClick={handleCompanyClick}
          />
        )}
        
        {currentView === 'company' && selectedCompany && (
          <CompanyProfile 
            company={selectedCompany}
            relatedPeople={people.filter(p => p.company.id === selectedCompany.id)}
            onPersonClick={handlePersonClick}
          />
        )}
      </main>
    </div>
  );
};

export default Page;
