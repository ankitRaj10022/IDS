import React, { useState } from 'react';
import { Filter, X } from 'lucide-react';

interface FilterOption {
  id: string;
  name: string;
  options: string[];
}

interface AlertFilterProps {
  filters: FilterOption[];
  onFilterChange: (filters: Record<string, string[]>) => void;
}

const AlertFilter: React.FC<AlertFilterProps> = ({ filters, onFilterChange }) => {
  const [activeFilters, setActiveFilters] = useState<Record<string, string[]>>({});
  const [showFilters, setShowFilters] = useState(false);
  
  const handleFilterChange = (filterId: string, value: string, checked: boolean) => {
    setActiveFilters(prev => {
      const currentValues = prev[filterId] || [];
      let newValues;
      
      if (checked) {
        newValues = [...currentValues, value];
      } else {
        newValues = currentValues.filter(v => v !== value);
      }
      
      const newFilters = {
        ...prev,
        [filterId]: newValues
      };
      
      // Remove empty arrays
      if (newValues.length === 0) {
        delete newFilters[filterId];
      }
      
      onFilterChange(newFilters);
      return newFilters;
    });
  };
  
  const clearFilters = () => {
    setActiveFilters({});
    onFilterChange({});
  };
  
  const activeFilterCount = Object.values(activeFilters).reduce(
    (count, values) => count + values.length, 
    0
  );
  
  return (
    <div className="mb-6">
      <div className="flex items-center justify-between mb-2">
        <h3 className="font-medium">Filters</h3>
        
        <div className="flex space-x-2">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center text-sm px-3 py-1.5 border border-gray-300 dark:border-navy-600 rounded-md bg-white dark:bg-navy-800 hover:bg-gray-50 dark:hover:bg-navy-700 transition-colors"
          >
            <Filter className="h-4 w-4 mr-1.5" />
            <span>Filters</span>
            {activeFilterCount > 0 && (
              <span className="ml-1.5 inline-flex items-center justify-center w-5 h-5 text-xs bg-teal-100 dark:bg-teal-900 text-teal-800 dark:text-teal-300 rounded-full">
                {activeFilterCount}
              </span>
            )}
          </button>
          
          {activeFilterCount > 0 && (
            <button
              onClick={clearFilters}
              className="text-sm px-3 py-1.5 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
            >
              Clear all
            </button>
          )}
        </div>
      </div>
      
      {showFilters && (
        <div className="bg-white dark:bg-navy-800 border border-gray-200 dark:border-navy-700 rounded-lg p-4 shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filters.map(filter => (
              <div key={filter.id}>
                <h4 className="text-sm font-medium mb-2">{filter.name}</h4>
                <div className="space-y-1.5">
                  {filter.options.map(option => (
                    <label key={option} className="flex items-center">
                      <input
                        type="checkbox"
                        className="rounded border-gray-300 text-teal-600 focus:ring-teal-500"
                        checked={(activeFilters[filter.id] || []).includes(option)}
                        onChange={(e) => handleFilterChange(filter.id, option, e.target.checked)}
                      />
                      <span className="ml-2 text-sm text-gray-600 dark:text-gray-300">
                        {option}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      
      {/* Active filter pills */}
      {activeFilterCount > 0 && (
        <div className="flex flex-wrap gap-2 mt-3">
          {Object.entries(activeFilters).map(([filterId, values]) => {
            const filterName = filters.find(f => f.id === filterId)?.name;
            
            return values.map(value => (
              <div 
                key={`${filterId}-${value}`}
                className="flex items-center bg-gray-100 dark:bg-navy-700 rounded-full px-3 py-1 text-xs"
              >
                <span className="text-gray-800 dark:text-gray-200">
                  {filterName}: <strong>{value}</strong>
                </span>
                <button
                  onClick={() => handleFilterChange(filterId, value, false)}
                  className="ml-1.5 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                >
                  <X className="h-3 w-3" />
                </button>
              </div>
            ));
          })}
        </div>
      )}
    </div>
  );
};

export default AlertFilter;