import React, { useState } from 'react';
import { ChevronDown, ChevronUp, MoreHorizontal, ExternalLink } from 'lucide-react';

interface Alert {
  id: string;
  timestamp: string;
  description: string;
  source: string;
  destination: string;
  protocol: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  status: 'new' | 'investigating' | 'resolved' | 'false-positive';
  category: string;
}

interface AlertTableProps {
  alerts: Alert[];
}

const severityStyles = {
  low: {
    bg: 'bg-green-100 dark:bg-green-900/30',
    text: 'text-green-800 dark:text-green-400'
  },
  medium: {
    bg: 'bg-amber-100 dark:bg-amber-900/30',
    text: 'text-amber-800 dark:text-amber-400' 
  },
  high: {
    bg: 'bg-orange-100 dark:bg-orange-900/30',
    text: 'text-orange-800 dark:text-orange-400'
  },
  critical: {
    bg: 'bg-red-100 dark:bg-red-900/30',
    text: 'text-red-800 dark:text-red-400'
  }
};

const statusStyles = {
  'new': {
    bg: 'bg-blue-100 dark:bg-blue-900/30',
    text: 'text-blue-800 dark:text-blue-400'
  },
  'investigating': {
    bg: 'bg-purple-100 dark:bg-purple-900/30',
    text: 'text-purple-800 dark:text-purple-400'
  },
  'resolved': {
    bg: 'bg-green-100 dark:bg-green-900/30',
    text: 'text-green-800 dark:text-green-400'
  },
  'false-positive': {
    bg: 'bg-gray-100 dark:bg-gray-700',
    text: 'text-gray-800 dark:text-gray-400'
  }
};

const AlertTable: React.FC<AlertTableProps> = ({ alerts }) => {
  const [expandedRows, setExpandedRows] = useState<string[]>([]);
  const [sortField, setSortField] = useState<keyof Alert>('timestamp');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
  
  const toggleRowExpanded = (id: string) => {
    setExpandedRows(prev => 
      prev.includes(id) 
        ? prev.filter(rowId => rowId !== id)
        : [...prev, id]
    );
  };
  
  const handleSort = (field: keyof Alert) => {
    if (sortField === field) {
      setSortDirection(prev => prev === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };
  
  const sortedAlerts = [...alerts].sort((a, b) => {
    if (a[sortField] < b[sortField]) return sortDirection === 'asc' ? -1 : 1;
    if (a[sortField] > b[sortField]) return sortDirection === 'asc' ? 1 : -1;
    return 0;
  });
  
  const renderSortIcon = (field: keyof Alert) => {
    if (sortField !== field) return null;
    
    return sortDirection === 'asc' 
      ? <ChevronUp className="h-4 w-4 ml-1" /> 
      : <ChevronDown className="h-4 w-4 ml-1" />;
  };

  return (
    <div className="bg-white dark:bg-navy-800 shadow-sm rounded-lg border border-gray-200 dark:border-navy-700 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-navy-700">
          <thead className="bg-gray-50 dark:bg-navy-900">
            <tr>
              <th scope="col" className="w-10 px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"></th>
              <th 
                scope="col" 
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider cursor-pointer"
                onClick={() => handleSort('timestamp')}
              >
                <div className="flex items-center">
                  Timestamp
                  {renderSortIcon('timestamp')}
                </div>
              </th>
              <th 
                scope="col" 
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider cursor-pointer"
                onClick={() => handleSort('description')}
              >
                <div className="flex items-center">
                  Description
                  {renderSortIcon('description')}
                </div>
              </th>
              <th 
                scope="col" 
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider cursor-pointer"
                onClick={() => handleSort('source')}
              >
                <div className="flex items-center">
                  Source
                  {renderSortIcon('source')}
                </div>
              </th>
              <th 
                scope="col" 
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider cursor-pointer"
                onClick={() => handleSort('severity')}
              >
                <div className="flex items-center">
                  Severity
                  {renderSortIcon('severity')}
                </div>
              </th>
              <th 
                scope="col" 
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider cursor-pointer"
                onClick={() => handleSort('status')}
              >
                <div className="flex items-center">
                  Status
                  {renderSortIcon('status')}
                </div>
              </th>
              <th scope="col" className="relative px-6 py-3">
                <span className="sr-only">Actions</span>
              </th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-navy-800 divide-y divide-gray-200 dark:divide-navy-700">
            {sortedAlerts.map(alert => (
              <React.Fragment key={alert.id}>
                <tr 
                  className={`${
                    expandedRows.includes(alert.id) ? 'bg-gray-50 dark:bg-navy-700' : ''
                  } ${
                    alert.severity === 'critical' && alert.status === 'new' 
                      ? 'animate-pulse-slow bg-red-50 dark:bg-red-900/10' 
                      : ''
                  } hover:bg-gray-50 dark:hover:bg-navy-700`}
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button
                      onClick={() => toggleRowExpanded(alert.id)}
                      className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
                    >
                      {expandedRows.includes(alert.id) ? (
                        <ChevronUp className="h-5 w-5" />
                      ) : (
                        <ChevronDown className="h-5 w-5" />
                      )}
                    </button>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                    {alert.timestamp}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900 dark:text-gray-200">
                    <div className="line-clamp-1">{alert.description}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                    {alert.source}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${severityStyles[alert.severity].bg} ${severityStyles[alert.severity].text}`}>
                      {alert.severity}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${statusStyles[alert.status].bg} ${statusStyles[alert.status].text}`}>
                      {alert.status.replace('-', ' ')}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button className="text-teal-600 dark:text-teal-400 hover:text-teal-900 dark:hover:text-teal-300">
                      <MoreHorizontal className="h-5 w-5" />
                    </button>
                  </td>
                </tr>
                
                {expandedRows.includes(alert.id) && (
                  <tr className="bg-gray-50 dark:bg-navy-700">
                    <td colSpan={7} className="px-6 py-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
                        <div>
                          <h4 className="font-medium text-gray-900 dark:text-white mb-1">Details</h4>
                          <div className="space-y-1 text-gray-600 dark:text-gray-300">
                            <p><span className="font-medium">Category:</span> {alert.category}</p>
                            <p><span className="font-medium">Protocol:</span> {alert.protocol}</p>
                            <p><span className="font-medium">Destination:</span> {alert.destination}</p>
                          </div>
                        </div>
                        
                        <div>
                          <h4 className="font-medium text-gray-900 dark:text-white mb-1">Actions</h4>
                          <div className="space-y-2">
                            <button className="px-3 py-1 bg-teal-100 dark:bg-teal-900 text-teal-800 dark:text-teal-300 text-xs rounded-md hover:bg-teal-200 dark:hover:bg-teal-800 font-medium">
                              Investigate
                            </button>
                            <button className="px-3 py-1 ml-2 bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-300 text-xs rounded-md hover:bg-red-200 dark:hover:bg-red-800 font-medium">
                              Block Source
                            </button>
                          </div>
                        </div>
                        
                        <div>
                          <h4 className="font-medium text-gray-900 dark:text-white mb-1">Related</h4>
                          <div className="space-y-1 text-gray-600 dark:text-gray-300">
                            <a href="#" className="flex items-center text-teal-600 dark:text-teal-400 hover:underline">
                              <ExternalLink className="h-3 w-3 mr-1" />
                              View in logs
                            </a>
                            <a href="#" className="flex items-center text-teal-600 dark:text-teal-400 hover:underline">
                              <ExternalLink className="h-3 w-3 mr-1" />
                              Check source reputation
                            </a>
                          </div>
                        </div>
                      </div>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AlertTable;