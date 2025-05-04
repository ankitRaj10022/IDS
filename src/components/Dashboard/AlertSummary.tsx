import React from 'react';
import { AlertCircle, ArrowUpRight, Clock } from 'lucide-react';

interface Alert {
  id: string;
  title: string;
  description: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  timestamp: string;
  source: string;
}

interface AlertSummaryProps {
  alerts: Alert[];
}

const severityStyles = {
  low: {
    bg: 'bg-green-100 dark:bg-green-900/20',
    text: 'text-green-700 dark:text-green-400',
    border: 'border-green-200 dark:border-green-800',
    icon: 'text-green-500 dark:text-green-400'
  },
  medium: {
    bg: 'bg-amber-100 dark:bg-amber-900/20',
    text: 'text-amber-700 dark:text-amber-400',
    border: 'border-amber-200 dark:border-amber-800',
    icon: 'text-amber-500 dark:text-amber-400'
  },
  high: {
    bg: 'bg-orange-100 dark:bg-orange-900/20',
    text: 'text-orange-700 dark:text-orange-400',
    border: 'border-orange-200 dark:border-orange-800',
    icon: 'text-orange-500 dark:text-orange-400'
  },
  critical: {
    bg: 'bg-red-100 dark:bg-red-900/20',
    text: 'text-red-700 dark:text-red-400',
    border: 'border-red-200 dark:border-red-800',
    icon: 'text-red-500 dark:text-red-400'
  }
};

const AlertSummary: React.FC<AlertSummaryProps> = ({ alerts }) => {
  return (
    <div className="border border-gray-200 dark:border-navy-700 rounded-lg shadow-sm bg-white dark:bg-navy-800">
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200 dark:border-navy-700">
        <h3 className="font-medium">Recent Alerts</h3>
        <button className="text-sm text-teal-600 dark:text-teal-400 flex items-center hover:underline">
          View all <ArrowUpRight className="h-3 w-3 ml-1" />
        </button>
      </div>
      
      <div className="divide-y divide-gray-100 dark:divide-navy-700">
        {alerts.length === 0 ? (
          <div className="p-4 text-center text-gray-500 dark:text-gray-400">
            No recent alerts
          </div>
        ) : (
          alerts.slice(0, 5).map(alert => (
            <div 
              key={alert.id} 
              className={`px-4 py-3 ${
                alert.severity === 'critical' ? 'animate-pulse-slow bg-red-50 dark:bg-red-900/10' : ''
              }`}
            >
              <div className="flex items-start">
                <div className={`p-1.5 rounded-full mt-0.5 ${severityStyles[alert.severity].bg}`}>
                  <AlertCircle className={`h-4 w-4 ${severityStyles[alert.severity].icon}`} />
                </div>
                
                <div className="ml-3 flex-1">
                  <div className="flex items-center justify-between">
                    <p className="font-medium text-sm">{alert.title}</p>
                    <span className={`text-xs font-medium capitalize px-2 py-0.5 rounded-full ${severityStyles[alert.severity].bg} ${severityStyles[alert.severity].text}`}>
                      {alert.severity}
                    </span>
                  </div>
                  
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5 line-clamp-1">
                    {alert.description}
                  </p>
                  
                  <div className="flex items-center mt-1 text-xs text-gray-500 dark:text-gray-400">
                    <Clock className="h-3 w-3 mr-1" />
                    <span>{alert.timestamp}</span>
                    <span className="mx-1.5">•</span>
                    <span>{alert.source}</span>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default AlertSummary;