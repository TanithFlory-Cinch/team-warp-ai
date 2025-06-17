import { useState } from 'react';
import { ContactList } from '@/components/ContactList';
import { PersonProfile } from '@/components/PersonProfile';
import { CompanyProfile } from '@/components/CompanyProfile';
import { Navigation } from '@/components/Navigation';

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

const Index = () => {
  const [currentView, setCurrentView] = useState<'contacts' | 'person' | 'company'>('contacts');
  const [selectedPerson, setSelectedPerson] = useState<Person | null>(null);
  const [selectedCompany, setSelectedCompany] = useState<Company | null>(null);

  // Enhanced mock data with all required fields
  const mockCompanies: Company[] = [
    {
      id: '1',
      name: 'Tech Innovations Inc.',
      logo: 'https://images.unsplash.com/photo-1518005020951-eccb494ad742?w=100&h=100&fit=crop&crop=center',
      logoUrl: 'https://images.unsplash.com/photo-1518005020951-eccb494ad742?w=100&h=100&fit=crop&crop=center',
      revenue: 15000000,
      organizationRevenue: 15000000,
      foundedYear: 2019,
      intentStrength: 'High',
      websiteUrl: 'https://techinnovations.com',
      linkedinUrl: 'https://linkedin.com/company/tech-innovations',
      primaryPhone: '+1 (555) 123-4567',
      sanitizedPhone: '+1 (555) 123-4567',
      fundsReceived: 5000000,
      seedRound: 2000000
    },
    {
      id: '2',
      name: 'Global Solutions LLC',
      logo: 'https://images.unsplash.com/photo-1518005020951-eccb494ad742?w=100&h=100&fit=crop&crop=center',
      logoUrl: 'https://images.unsplash.com/photo-1518005020951-eccb494ad742?w=100&h=100&fit=crop&crop=center',
      revenue: 8500000,
      organizationRevenue: 8500000,
      foundedYear: 2020,
      intentStrength: 'Medium',
      websiteUrl: 'https://globalsolutions.com',
      linkedinUrl: 'https://linkedin.com/company/global-solutions',
      primaryPhone: '+1 (555) 987-6543',
      sanitizedPhone: '+1 (555) 987-6543',
      fundsReceived: 3200000,
      seedRound: 1500000
    },
    {
      id: '3',
      name: 'Future Dynamics Corp',
      logo: 'https://images.unsplash.com/photo-1518005020951-eccb494ad742?w=100&h=100&fit=crop&crop=center',
      logoUrl: 'https://images.unsplash.com/photo-1518005020951-eccb494ad742?w=100&h=100&fit=crop&crop=center',
      revenue: 22000000,
      organizationRevenue: 22000000,
      foundedYear: 2018,
      intentStrength: 'High',
      websiteUrl: 'https://futuredynamics.com',
      linkedinUrl: 'https://linkedin.com/company/future-dynamics',
      primaryPhone: '+1 (555) 456-7890',
      sanitizedPhone: '+1 (555) 456-7890',
      fundsReceived: 8500000,
      seedRound: 3000000
    }
  ];

  const mockPeople: Person[] = [
    {
      id: '1',
      name: 'Sarah Johnson',
      title: 'Chief Technology Officer',
      photo: 'https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=150&h=150&fit=crop&crop=center',
      photoUrl: 'https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=150&h=150&fit=crop&crop=center',
      headline: 'Innovative CTO driving digital transformation in enterprise solutions',
      email: 'sarah.johnson@techinnovations.com',
      phone: '+1 (555) 123-4567',
      linkedin: 'https://linkedin.com/in/sarah-johnson-cto',
      city: 'San Francisco',
      seniority: 'C-Level',
      company: mockCompanies[0],
      employmentHistory: [
        {
          company: 'Tech Innovations Inc.',
          position: 'Chief Technology Officer',
          startDate: '2021-03',
          endDate: '',
          current: true
        },
        {
          company: 'StartupCorp',
          position: 'Senior Software Engineer',
          startDate: '2018-01',
          endDate: '2021-02',
          current: false
        }
      ]
    },
    {
      id: '2',
      name: 'Michael Chen',
      title: 'VP of Sales',
      photo: 'https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?w=150&h=150&fit=crop&crop=center',
      photoUrl: 'https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?w=150&h=150&fit=crop&crop=center',
      headline: 'Results-driven sales leader with 10+ years in B2B enterprise sales',
      email: 'michael.chen@globalsolutions.com',
      phone: '+1 (555) 987-6543',
      linkedin: 'https://linkedin.com/in/michael-chen-sales',
      city: 'New York',
      seniority: 'Executive',
      company: mockCompanies[1],
      employmentHistory: [
        {
          company: 'Global Solutions LLC',
          position: 'VP of Sales',
          startDate: '2020-06',
          endDate: '',
          current: true
        },
        {
          company: 'Sales Corp',
          position: 'Sales Manager',
          startDate: '2017-03',
          endDate: '2020-05',
          current: false
        }
      ]
    },
    {
      id: '3',
      name: 'Emily Rodriguez',
      title: 'Product Manager',
      photo: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=150&h=150&fit=crop&crop=center',
      photoUrl: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=150&h=150&fit=crop&crop=center',
      headline: 'Strategic product leader focused on user-centric solutions',
      email: 'emily.rodriguez@futuredynamics.com',
      phone: '+1 (555) 456-7890',
      linkedin: 'https://linkedin.com/in/emily-rodriguez-pm',
      city: 'Austin',
      seniority: 'Senior',
      company: mockCompanies[2],
      employmentHistory: [
        {
          company: 'Future Dynamics Corp',
          position: 'Product Manager',
          startDate: '2022-01',
          endDate: '',
          current: true
        }
      ]
    }
  ];

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

  return (
    <div className="min-h-screen bg-slate-50">
      <Navigation 
        currentView={currentView}
        onBackToContacts={handleBackToContacts}
        selectedPersonName={selectedPerson?.name}
        selectedCompanyName={selectedCompany?.name}
      />
      
      <main className="container mx-auto px-6 py-8">
        {currentView === 'contacts' && (
          <ContactList 
            people={mockPeople}
            companies={mockCompanies}
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
            relatedPeople={mockPeople.filter(p => p.company.id === selectedCompany.id)}
            onPersonClick={handlePersonClick}
          />
        )}
      </main>
    </div>
  );
};

export default Index;
