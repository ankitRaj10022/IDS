import React, { useState } from 'react';
import AlertFilter from '../components/AlertsPage/AlertFilter';
import AlertTable from '../components/AlertsPage/AlertTable';
import { mockAlerts } from '../data/mockData';

const filterOptions = [
  {
    id: 'severity',
    name: 'Severity',
    options: ['low', 'medium', 'high', 'critical']
  },
  {
    id: 'status',
    name: 'Status',
    options: ['new', 'investigating', 'resolved', 'false-positive']
  },
  {
    id: 'category',
    name: 'Category',
    options: ['Network', 'Application', 'Authentication', 'Malware', 'DDoS']
  }
];

const AlertsPage: React.FC = () => {
  const [activeFilters, setActiveFilters] = useState<Record<string, string[]>>({});
  const [searchQuery, setSearchQuery] = useState('');
  
  const handleFilterChange = (filters: Record<string, string[]>) => {
    setActiveFilters(filters);
  };
  
  const filterAlerts = () => {
    return mockAlerts.filter(alert => {
      // Check if it matches search query
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        const matchesSearch = 
          alert.description.toLowerCase().includes(query) ||
          alert.source.toLowerCase().includes(query) ||
          alert.destination.toLowerCase().includes(query);
          
        if (!matchesSearch) return false;
      }
      
      // Check if it matches all active filters
      for (const [filterId, values] of Object.entries(activeFilters)) {
        if (values.length > 0) {
          // @ts-ignore
          const alertValue = alert[filterId]?.toString().toLowerCase();
          if (!values.some(value => value.toLowerCase() === alertValue)) {
            return false;
          }
        }
      }
      
      return true;
    });
  };
  
  const filteredAlerts = filterAlerts();
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Security Alerts</h1>
        
        <div className="flex space-x-2">
          <button className="px-4 py-2 bg-teal-600 dark:bg-teal-700 text-white rounded-md hover:bg-teal-700 dark:hover:bg-teal-600 transition-colors">
            Export
          </button>
        </div>
      </div>
      
      {/* Search Bar */}
      <div className="relative">
        <input
          type="text"
          placeholder="Search alerts by description, source, or destination..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full px-4 py-2 pl-10 bg-white dark:bg-navy-800 border border-gray-300 dark:border-navy-700 rounded-md shadow-sm focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
        />
        <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
      </div>
      
      {/* Alert Summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-navy-800 border border-gray-200 dark:border-navy-700 rounded-lg p-4 shadow-sm">
          <h3 className="text-sm text-gray-500 dark:text-gray-400">Total Alerts</h3>
          <p className="text-2xl font-bold mt-1">{mockAlerts.length}</p>
        </div>
        
        <div className="bg-white dark:bg-navy-800 border border-gray-200 dark:border-navy-700 rounded-lg p-4 shadow-sm">
          <h3 className="text-sm text-gray-500 dark:text-gray-400">Critical</h3>
          <p className="text-2xl font-bold mt-1 text-red-600 dark:text-red-400">
            {mockAlerts.filter(a => a.severity === 'critical').length}
          </p>
        </div>
        
        <div className="bg-white dark:bg-navy-800 border border-gray-200 dark:border-navy-700 rounded-lg p-4 shadow-sm">
          <h3 className="text-sm text-gray-500 dark:text-gray-400">Unresolved</h3>
          <p className="text-2xl font-bold mt-1 text-amber-600 dark:text-amber-400">
            {mockAlerts.filter(a => a.status === 'new' || a.status === 'investigating').length}
          </p>
        </div>
        
        <div className="bg-white dark:bg-navy-800 border border-gray-200 dark:border-navy-700 rounded-lg p-4 shadow-sm">
          <h3 className="text-sm text-gray-500 dark:text-gray-400">Resolved</h3>
          <p className="text-2xl font-bold mt-1 text-green-600 dark:text-green-400">
            {mockAlerts.filter(a => a.status === 'resolved' || a.status === 'false-positive').length}
          </p>
        </div>
      </div>
      
      {/* Filters */}
      <AlertFilter 
        filters={filterOptions} 
        onFilterChange={handleFilterChange} 
      />
      
      {/* Results */}
      <div>
        <div className="mb-4 text-sm text-gray-500 dark:text-gray-400">
          Showing <span className="font-medium text-gray-900 dark:text-white">{filteredAlerts.length}</span> of {mockAlerts.length} alerts
        </div>
        
        <AlertTable alerts={filteredAlerts} />
      </div>
    </div>
  );
};

export default AlertsPage;