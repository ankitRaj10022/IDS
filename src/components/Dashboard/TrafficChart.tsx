import React from 'react';

interface DataPoint {
  time: string;
  normal: number;
  anomalies: number;
}

interface TrafficChartProps {
  data: DataPoint[];
  title: string;
}

const TrafficChart: React.FC<TrafficChartProps> = ({ data, title }) => {
  // Find the maximum value to scale the chart
  const maxValue = Math.max(...data.flatMap(d => [d.normal, d.anomalies])) * 1.1;
  
  return (
    <div className="border border-gray-200 dark:border-navy-700 rounded-lg shadow-sm bg-white dark:bg-navy-800 p-4">
      <h3 className="font-medium mb-4">{title}</h3>
      
      <div className="h-64">
        <div className="relative h-full">
          {/* Y-axis labels */}
          <div className="absolute left-0 top-0 bottom-0 w-8 flex flex-col justify-between text-xs text-gray-500 dark:text-gray-400">
            <span>100%</span>
            <span>75%</span>
            <span>50%</span>
            <span>25%</span>
            <span>0%</span>
          </div>
          
          {/* Chart area */}
          <div className="absolute left-10 right-0 top-0 bottom-0 flex items-end">
            {data.map((point, index) => (
              <div key={index} className="flex-1 flex flex-col justify-end h-full">
                {/* Anomaly bar */}
                {point.anomalies > 0 && (
                  <div 
                    className="w-3/5 mx-auto bg-red-500 dark:bg-red-600 rounded-t"
                    style={{ 
                      height: `${(point.anomalies / maxValue) * 100}%`,
                      transition: 'height 0.3s ease'
                    }}
                  ></div>
                )}
                
                {/* Normal traffic bar */}
                <div 
                  className="w-3/5 mx-auto bg-blue-500 dark:bg-blue-600 rounded-t"
                  style={{ 
                    height: `${(point.normal / maxValue) * 100}%`,
                    transition: 'height 0.3s ease'
                  }}
                ></div>
                
                {/* Time label */}
                <div className="text-center text-xs text-gray-500 dark:text-gray-400 mt-1">
                  {point.time}
                </div>
              </div>
            ))}
          </div>
          
          {/* Horizontal grid lines */}
          <div className="absolute left-8 right-0 top-0 bottom-0 pointer-events-none">
            {[0, 1, 2, 3, 4].map(i => (
              <div 
                key={i}
                className="border-b border-gray-100 dark:border-navy-700"
                style={{ height: '20%' }}
              ></div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Legend */}
      <div className="flex items-center justify-center space-x-6 mt-4">
        <div className="flex items-center">
          <div className="w-3 h-3 bg-blue-500 dark:bg-blue-600 rounded mr-2"></div>
          <span className="text-xs text-gray-600 dark:text-gray-300">Normal Traffic</span>
        </div>
        <div className="flex items-center">
          <div className="w-3 h-3 bg-red-500 dark:bg-red-600 rounded mr-2"></div>
          <span className="text-xs text-gray-600 dark:text-gray-300">Anomalies</span>
        </div>
      </div>
    </div>
  );
};

export default TrafficChart;