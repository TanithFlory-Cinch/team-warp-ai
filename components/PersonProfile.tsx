
import { Mail, Phone, Linkedin, Building, Calendar, MapPin } from 'lucide-react';
import type { Company, Person } from '@/app/page';

interface PersonProfileProps {
  person: Person;
  onCompanyClick: (company: Company) => void;
}

export const PersonProfile = ({ person, onCompanyClick }: PersonProfileProps) => {
  const formatDate = (dateString: string) => {
    if (!dateString) return 'Present';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short' });
  };

  return (
    <div className="space-y-8">
      {/* Header Section */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-8 py-12">
          <div className="flex items-center space-x-6">
            <img
              src={person.photo}
              alt={person.name}
              className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-lg"
            />
            <div className="text-white">
              <h1 className="text-3xl font-bold">{person.name}</h1>
              <p className="text-blue-100 text-lg mt-2">{person.title}</p>
              <p className="text-blue-200 text-sm mt-3 max-w-2xl">{person.headline}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Contact Information */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl border border-slate-200 p-6">
            <h2 className="text-xl font-semibold text-slate-900 mb-6">Contact Information</h2>
            
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <Mail className="text-slate-400" size={20} />
                <div>
                  <p className="text-sm text-slate-500">Email</p>
                  <a href={`mailto:${person.email}`} className="text-blue-600 hover:text-blue-700 transition-colors">
                    {person.email}
                  </a>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <Phone className="text-slate-400" size={20} />
                <div>
                  <p className="text-sm text-slate-500">Phone</p>
                  <a href={`tel:${person.phone}`} className="text-blue-600 hover:text-blue-700 transition-colors">
                    {person.phone}
                  </a>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <Linkedin className="text-slate-400" size={20} />
                <div>
                  <p className="text-sm text-slate-500">LinkedIn</p>
                  <a href={person.linkedin} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-700 transition-colors">
                    View Profile
                  </a>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <Building className="text-slate-400" size={20} />
                <div>
                  <p className="text-sm text-slate-500">Company</p>
                  <button
                    onClick={() => onCompanyClick(person.company)}
                    className="text-blue-600 hover:text-blue-700 transition-colors font-medium"
                  >
                    {person.company.name}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Employment History */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl border border-slate-200 p-6">
            <h2 className="text-xl font-semibold text-slate-900 mb-6">Employment History</h2>
            
            <div className="space-y-6">
              {person.employmentHistory.map((job, index) => (
                <div key={index} className="flex space-x-4">
                  <div className="flex-shrink-0">
                    <div className={`w-4 h-4 rounded-full ${job.current ? 'bg-green-500' : 'bg-slate-300'} mt-1`}></div>
                    {index < person.employmentHistory.length - 1 && (
                      <div className="w-0.5 h-16 bg-slate-200 ml-1.5 mt-2"></div>
                    )}
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-semibold text-slate-900">{job.position}</h3>
                        <p className="text-slate-600 mt-1">{job.company}</p>
                      </div>
                      <div className="flex items-center space-x-2 text-sm text-slate-500">
                        <Calendar size={14} />
                        <span>
                          {formatDate(job.startDate)} - {job.current ? 'Present' : formatDate(job.endDate)}
                        </span>
                        {job.current && (
                          <span className="bg-green-100 text-green-700 px-2 py-0.5 rounded-full text-xs font-medium">
                            Current
                          </span>
                        )}
                      </div>
                    </div>
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
