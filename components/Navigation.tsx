
import { ArrowLeft, Users, Building, User } from 'lucide-react';

interface NavigationProps {
  currentView: 'contacts' | 'person' | 'company';
  onBackToContacts: () => void;
  selectedPersonName?: string;
  selectedCompanyName?: string;
}

export const Navigation = ({ 
  currentView, 
  onBackToContacts, 
  selectedPersonName, 
  selectedCompanyName 
}: NavigationProps) => {
  return (
    <nav className="bg-white border-b border-slate-200 px-6 py-4">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-4">
          {currentView !== 'contacts' && (
            <button
              onClick={onBackToContacts}
              className="flex items-center space-x-2 text-slate-600 hover:text-slate-900 transition-colors"
            >
              <ArrowLeft size={20} />
              <span className="font-medium">Back to Contacts</span>
            </button>
          )}
          
          <div className="flex items-center space-x-3">
            {currentView === 'contacts' && (
              <>
                <Users className="text-blue-600" size={24} />
                <h1 className="text-2xl font-bold text-slate-900">Automated Omnichannel</h1>
              </>
            )}
            
            {currentView === 'person' && (
              <>
                <User className="text-blue-600" size={24} />
                <h1 className="text-2xl font-bold text-slate-900">{selectedPersonName}</h1>
              </>
            )}
            
            {currentView === 'company' && (
              <>
                <Building className="text-blue-600" size={24} />
                <h1 className="text-2xl font-bold text-slate-900">{selectedCompanyName}</h1>
              </>
            )}
          </div>
        </div>
        
        <div className="text-sm text-slate-500">
          Dashboard
        </div>
      </div>
    </nav>
  );
};
