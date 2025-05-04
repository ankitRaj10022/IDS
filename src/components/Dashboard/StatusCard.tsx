import React from 'react';
import { ArrowUp, ArrowDown } from 'lucide-react';

interface StatusCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  change?: number;
  changeText?: string;
  color: 'teal' | 'amber' | 'red' | 'blue' | 'purple';
}

const colorVariants = {
  teal: 'bg-teal-50 text-teal-700 border-teal-200 dark:bg-teal-900/20 dark:text-teal-400 dark:border-teal-900',
  amber: 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-900/20 dark:text-amber-400 dark:border-amber-900',
  red: 'bg-red-50 text-red-700 border-red-200 dark:bg-red-900/20 dark:text-red-400 dark:border-red-900',
  blue: 'bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-900/20 dark:text-blue-400 dark:border-blue-900',
  purple: 'bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-900/20 dark:text-purple-400 dark:border-purple-900',
};

const iconColorVariants = {
  teal: 'bg-teal-100 text-teal-600 dark:bg-teal-800 dark:text-teal-300',
  amber: 'bg-amber-100 text-amber-600 dark:bg-amber-800 dark:text-amber-300',
  red: 'bg-red-100 text-red-600 dark:bg-red-800 dark:text-red-300',
  blue: 'bg-blue-100 text-blue-600 dark:bg-blue-800 dark:text-blue-300',
  purple: 'bg-purple-100 text-purple-600 dark:bg-purple-800 dark:text-purple-300',
};

const StatusCard: React.FC<StatusCardProps> = ({
  title,
  value,
  icon,
  change,
  changeText,
  color
}) => {
  return (
    <div className={`border rounded-lg p-5 shadow-sm ${colorVariants[color]}`}>
      <div className="flex justify-between">
        <div>
          <h3 className="text-sm font-medium opacity-80">{title}</h3>
          <p className="text-2xl font-bold mt-1">{value}</p>
          
          {(change !== undefined || changeText) && (
            <div className="flex items-center mt-2 text-xs font-medium">
              {change !== undefined && (
                <>
                  {change > 0 ? (
                    <ArrowUp className="h-3 w-3 mr-1" />
                  ) : (
                    <ArrowDown className="h-3 w-3 mr-1" />
                  )}
                  <span className={change > 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}>
                    {Math.abs(change)}%
                  </span>
                </>
              )}
              {changeText && <span className="ml-1 opacity-70">{changeText}</span>}
            </div>
          )}
        </div>
        
        <div className={`p-3 rounded-full ${iconColorVariants[color]}`}>
          {icon}
        </div>
      </div>
    </div>
  );
};

export default StatusCard;