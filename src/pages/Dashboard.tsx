import React from 'react';
import { Shield, AlertTriangle, Gauge, Activity, Users, Flame, Zap, Clock } from 'lucide-react';
import StatusCard from '../components/Dashboard/StatusCard';
import AlertSummary from '../components/Dashboard/AlertSummary';
import ThreatMap from '../components/Dashboard/ThreatMap';
import TrafficChart from '../components/Dashboard/TrafficChart';
import { mockAlerts, mockThreatLocations, mockTrafficData } from '../data/mockData';

const Dashboard: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Security Dashboard</h1>
        <div className="text-sm text-gray-500 dark:text-gray-400 flex items-center">
          <Clock className="h-4 w-4 mr-1.5" />
          Last updated: <strong className="ml-1">Just now</strong>
        </div>
      </div>
      
      {/* Status Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatusCard
          title="Current Security Status"
          value="Elevated"
          icon={<Shield className="h-6 w-6" />}
          color="amber"
        />
        <StatusCard
          title="Active Alerts"
          value="12"
          icon={<AlertTriangle className="h-6 w-6" />}
          change={+25}
          changeText="vs last 24h"
          color="red"
        />
        <StatusCard
          title="Monitored Devices"
          value="147"
          icon={<Gauge className="h-6 w-6" />}
          change={+3}
          changeText="new devices"
          color="blue"
        />
        <StatusCard
          title="Network Traffic"
          value="1.2 TB"
          icon={<Activity className="h-6 w-6" />}
          change={-5}
          changeText="vs yesterday"
          color="teal"
        />
      </div>
      
      {/* Main Content - First Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ThreatMap locations={mockThreatLocations} />
        <AlertSummary alerts={mockAlerts.slice(0, 5)} />
      </div>
      
      {/* Main Content - Second Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <TrafficChart data={mockTrafficData} title="Network Traffic (24 hours)" />
        </div>
        
        <div className="bg-white dark:bg-navy-800 border border-gray-200 dark:border-navy-700 rounded-lg shadow-sm p-4">
          <h3 className="font-medium mb-4">Top Attack Sources</h3>
          
          <div className="space-y-3">
            {['China', 'Russia', 'Brazil', 'United States', 'India'].map((country, index) => (
              <div key={country} className="flex items-center">
                <div className="w-8 text-center text-sm text-gray-500 dark:text-gray-400">
                  {index + 1}
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm font-medium">{country}</span>
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      {Math.floor(Math.random() * 500) + 100} attacks
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-navy-700 h-2 rounded-full overflow-hidden">
                    <div 
                      className="bg-teal-500 h-full rounded-full"
                      style={{ width: `${100 - index * 16}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-6">
            <h3 className="font-medium mb-3">Common Attack Vectors</h3>
            <div className="space-y-2">
              {[
                { name: 'Brute Force', icon: <Flame className="h-4 w-4 text-red-500" />, count: 234 },
                { name: 'SQL Injection', icon: <Zap className="h-4 w-4 text-amber-500" />, count: 186 },
                { name: 'XSS', icon: <Activity className="h-4 w-4 text-blue-500" />, count: 157 },
                { name: 'DDoS', icon: <Users className="h-4 w-4 text-purple-500" />, count: 98 }
              ].map(item => (
                <div key={item.name} className="flex items-center justify-between p-2 bg-gray-50 dark:bg-navy-700 rounded">
                  <div className="flex items-center">
                    {item.icon}
                    <span className="ml-2 text-sm">{item.name}</span>
                  </div>
                  <span className="text-xs font-medium">{item.count}</span>
                </div>
              ))}
            </div>
          </div>
          
          <button className="mt-6 text-teal-600 dark:text-teal-400 text-sm font-medium hover:text-teal-700 dark:hover:text-teal-300 w-full text-center">
            View All Threat Intelligence
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;