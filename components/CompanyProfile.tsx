
import { Building, DollarSign, Calendar, TrendingUp, ExternalLink, Linkedin, Phone, Users, Mail } from 'lucide-react';
import type { Company, Person } from '@/app/page';

interface CompanyProfileProps {
  company: Company;
  relatedPeople: Person[];
  onPersonClick: (person: Person) => void;
}

export const CompanyProfile = ({ company, relatedPeople, onPersonClick }: CompanyProfileProps) => {
  const formatRevenue = (revenue: number) => {
    if (revenue >= 1000000) {
      return `$${(revenue / 1000000).toFixed(1)}M`;
    } else if (revenue >= 1000) {
      return `$${(revenue / 1000).toFixed(0)}K`;
    }
    return `$${revenue}`;
  };

  const getIntentStrengthColor = (strength: string) => {
    switch (strength) {
      case 'High':
        return 'text-green-600 bg-green-100';
      case 'Medium':
        return 'text-yellow-600 bg-yellow-100';
      case 'Low':
        return 'text-red-600 bg-red-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  const getIntentStrengthWidth = (strength: string) => {
    switch (strength) {
      case 'High':
        return 'w-full';
      case 'Medium':
        return 'w-2/3';
      case 'Low':
        return 'w-1/3';
      default:
        return 'w-0';
    }
  };

  return (
    <div className="space-y-8">
      {/* Header Section */}
      <div className="bg-white rounded-xl border border-slate-200 p-8">
        <div className="flex items-center space-x-6">
          <img
            src={company.logo}
            alt={company.name}
            className="w-20 h-20 rounded-lg object-cover border border-slate-200"
          />
          <div>
            <h1 className="text-3xl font-bold text-slate-900">{company.name}</h1>
            <p className="text-slate-600 mt-2">Enterprise Organization</p>
          </div>
        </div>
      </div>

      {/* Key Metrics Card */}
      <div className="bg-white rounded-xl border border-slate-200 p-8">
        <h2 className="text-2xl font-semibold text-slate-900 mb-6">Key Metrics</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Revenue */}
          <div className="text-center">
            <div className="bg-blue-50 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <DollarSign className="text-blue-600" size={28} />
            </div>
            <div className="text-3xl font-bold text-slate-900">{formatRevenue(company.revenue)}</div>
            <div className="text-slate-600 mt-1">Annual Revenue</div>
          </div>

          {/* Founded Year */}
          <div className="text-center">
            <div className="bg-purple-50 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <Calendar className="text-purple-600" size={28} />
            </div>
            <div className="text-3xl font-bold text-slate-900">{company.foundedYear}</div>
            <div className="text-slate-600 mt-1">Year Founded</div>
          </div>

          {/* Intent Strength */}
          <div className="text-center">
            <div className="bg-green-50 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <TrendingUp className="text-green-600" size={28} />
            </div>
            <div className="text-3xl font-bold text-slate-900">{company.intentStrength}</div>
            <div className="text-slate-600 mt-1">Intent Strength</div>
            
            {/* Intent Gauge */}
            <div className="mt-3">
              <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                <div className={`h-3 rounded-full transition-all duration-500 ${
                  company.intentStrength === 'High' ? 'bg-green-500' :
                  company.intentStrength === 'Medium' ? 'bg-yellow-500' : 'bg-red-500'
                } ${getIntentStrengthWidth(company.intentStrength)}`}></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Contact & Links Section */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl border border-slate-200 p-6">
            <h2 className="text-xl font-semibold text-slate-900 mb-6">Contact & Links</h2>
            
            <div className="space-y-4">
              <a
                href={company.websiteUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-3 p-3 rounded-lg hover:bg-slate-50 transition-colors group"
              >
                <ExternalLink className="text-slate-400 group-hover:text-blue-600" size={20} />
                <div>
                  <p className="text-sm text-slate-500">Website</p>
                  <p className="text-blue-600 group-hover:text-blue-700 transition-colors">Visit Website</p>
                </div>
              </a>
              
              <a
                href={company.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-3 p-3 rounded-lg hover:bg-slate-50 transition-colors group"
              >
                <Linkedin className="text-slate-400 group-hover:text-blue-600" size={20} />
                <div>
                  <p className="text-sm text-slate-500">LinkedIn</p>
                  <p className="text-blue-600 group-hover:text-blue-700 transition-colors">Company Profile</p>
                </div>
              </a>
              
              <a
                href={`tel:${company.primaryPhone}`}
                className="flex items-center space-x-3 p-3 rounded-lg hover:bg-slate-50 transition-colors group"
              >
                <Phone className="text-slate-400 group-hover:text-blue-600" size={20} />
                <div>
                  <p className="text-sm text-slate-500">Primary Phone</p>
                  <p className="text-blue-600 group-hover:text-blue-700 transition-colors">{company.primaryPhone}</p>
                </div>
              </a>
            </div>
          </div>
        </div>

        {/* Related Contacts */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl border border-slate-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-slate-900">Key Contacts</h2>
              <div className="flex items-center space-x-2 text-slate-500">
                <Users size={16} />
                <span className="text-sm">{relatedPeople.length} contacts</span>
              </div>
            </div>
            
            <div className="space-y-4">
              {relatedPeople.map((person) => (
                <div
                  key={person.id}
                  onClick={() => onPersonClick(person)}
                  className="flex items-center space-x-4 p-4 rounded-lg hover:bg-slate-50 transition-colors cursor-pointer group"
                >
                  <img
                    src={person.photo}
                    alt={person.name}
                    className="w-12 h-12 rounded-full object-cover border border-slate-200"
                  />
                  <div className="flex-1">
                    <h3 className="font-semibold text-slate-900 group-hover:text-blue-600 transition-colors">
                      {person.name}
                    </h3>
                    <p className="text-slate-600 text-sm">{person.title}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <a
                      href={`mailto:${person.email}`}
                      onClick={(e) => e.stopPropagation()}
                      className="p-2 text-slate-400 hover:text-blue-600 transition-colors"
                    >
                      <Mail size={16} />
                    </a>
                    <a
                      href={`tel:${person.phone}`}
                      onClick={(e) => e.stopPropagation()}
                      className="p-2 text-slate-400 hover:text-blue-600 transition-colors"
                    >
                      <Phone size={16} />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
