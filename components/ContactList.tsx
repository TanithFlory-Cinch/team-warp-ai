'use client'
import { useState } from 'react';
import { Building, TrendingUp, TrendingDown, Minus, Users, Eye, ExternalLink, MapPin, Award } from 'lucide-react';
import type { Person, Company } from '@/app/page';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';

interface ContactListProps {
  people: Person[];
  companies: Company[];
  onPersonClick: (person: Person) => void;
  onCompanyClick: (company: Company) => void;
}

export const ContactList = ({ people, companies, onPersonClick, onCompanyClick }: ContactListProps) => {
  const [selectedCompanyEmployees, setSelectedCompanyEmployees] = useState<Person[]>([]);
  const [selectedCompany, setSelectedCompany] = useState<Company | null>(null);

  const formatRevenue = (revenue: number) => {
    if (revenue >= 1000000) {
      return `$${(revenue / 1000000).toFixed(1)}M`;
    } else if (revenue >= 1000) {
      return `$${(revenue / 1000).toFixed(0)}K`;
    }
    return `$${revenue}`;
  };

  const getSeniorityColor = (seniority: string) => {
    switch (seniority) {
      case 'C-Level':
        return 'bg-purple-100 text-purple-700 border-purple-200';
      case 'Executive':
        return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'Senior':
        return 'bg-green-100 text-green-700 border-green-200';
      case 'Mid':
        return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'Junior':
        return 'bg-gray-100 text-gray-700 border-gray-200';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getEmployeesForCompany = (companyId: string) => {
    return people.filter(person => person.company.id === companyId);
  };

  const handleViewEmployees = (company: Company) => {
    const employees = getEmployeesForCompany(company.id);
    setSelectedCompanyEmployees(employees);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold text-slate-900">Organizations</h2>
        <div className="text-sm text-slate-500">
          {companies.length} organizations
        </div>
      </div>
      
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Website</TableCell>
              <TableCell>Phone</TableCell>
              <TableCell>Revenue</TableCell>
              <TableCell>Funds Received</TableCell>
              <TableCell>Seed Round</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {companies.map((company) => {
              const employeeCount = getEmployeesForCompany(company.id).length;
              return (
                <TableRow key={company.id} className="cursor-pointer hover:bg-slate-50">
                  <TableCell>
                    <div className="flex items-center space-x-3">
                      <img
                        src={company.logoUrl}
                        alt={company.name}
                        className="w-10 h-10 rounded-lg object-cover border border-slate-200"
                      />
                      <div>
                        <p className="font-semibold text-slate-900">{company.name}</p>
                        <p className="text-sm text-slate-500">Enterprise</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <a
                      href={company.websiteUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-1 text-blue-600 hover:text-blue-800 transition-colors"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <ExternalLink size={14} />
                      <span className="text-sm">Visit Site</span>
                    </a>
                  </TableCell>
                  <TableCell>
                    <span className="text-slate-600 text-sm">{company.sanitizedPhone}</span>
                  </TableCell>
                  <TableCell>
                    <span className="font-semibold text-slate-900">
                      {formatRevenue(company.organizationRevenue)}
                    </span>
                  </TableCell>
                  <TableCell>
                    <span className="font-semibold text-green-600">
                      {formatRevenue(company.fundsReceived)}
                    </span>
                  </TableCell>
                  <TableCell>
                    <span className="font-semibold text-blue-600">
                      {company.seedRound}
                    </span>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => onCompanyClick(company)}
                        className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                      >
                        View Details
                      </button>
                      <Dialog open={selectedCompany === company} onClose={() => setSelectedCompany(null)}>
                        <DialogTitle>Employees at {company.name}</DialogTitle>
                        <DialogContent>
                          <div className="space-y-4 max-h-96 overflow-y-auto">
                            {getEmployeesForCompany(company.id).map((person) => (
                              <div
                                key={person.id}
                                onClick={() => onPersonClick(person)}
                                className="flex items-center space-x-4 p-4 rounded-lg hover:bg-slate-50 transition-colors cursor-pointer border border-slate-100"
                              >
                                <img
                                  src={person.photoUrl}
                                  alt={person.name}
                                  className="w-14 h-14 rounded-full object-cover border border-slate-200"
                                />
                                <div className="flex-1">
                                  <div className="flex items-center space-x-2 mb-1">
                                    <h3 className="font-semibold text-slate-900 hover:text-blue-600 transition-colors">
                                      {person.name}
                                    </h3>
                                    <div className={`px-2 py-0.5 rounded-full text-xs font-medium border ${getSeniorityColor(person.seniority)}`}>
                                      {person.seniority}
                                    </div>
                                  </div>
                                  <p className="text-slate-600 text-sm font-medium">{person.title}</p>
                                  <div className="flex items-center space-x-4 mt-2 text-xs text-slate-500">
                                    <span>{person.email}</span>
                                    <div className="flex items-center space-x-1">
                                      <MapPin size={12} />
                                      <span>{person.city}</span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </DialogContent>
                        <DialogActions>
                          <Button onClick={() => handleViewEmployees(company)}>View Employees</Button>
                        </DialogActions>
                      </Dialog>
                    </div>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};
