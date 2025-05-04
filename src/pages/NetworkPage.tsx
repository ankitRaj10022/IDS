import React from 'react';
import TopologyView from '../components/NetworkPage/TopologyView';
import { Shield, Server, Laptop, Smartphone, Wifi, Globe, Activity } from 'lucide-react';
import { mockNetworkNodes, mockNetworkConnections } from '../data/mockData';

const NetworkPage: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Network Monitoring</h1>
        
        <div className="flex space-x-2">
          <button className="px-4 py-2 bg-gray-100 dark:bg-navy-700 text-gray-800 dark:text-gray-200 rounded-md hover:bg-gray-200 dark:hover:bg-navy-600 transition-colors flex items-center">
            <Activity className="h-4 w-4 mr-2" />
            Live View
          </button>
          <button className="px-4 py-2 bg-teal-600 dark:bg-teal-700 text-white rounded-md hover:bg-teal-700 dark:hover:bg-teal-600 transition-colors">
            Add Device
          </button>
        </div>
      </div>
      
      {/* Network Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-navy-800 border border-gray-200 dark:border-navy-700 rounded-lg p-4 shadow-sm">
          <h3 className="text-sm text-gray-500 dark:text-gray-400">Total Devices</h3>
          <p className="text-2xl font-bold mt-1">147</p>
        </div>
        
        <div className="bg-white dark:bg-navy-800 border border-gray-200 dark:border-navy-700 rounded-lg p-4 shadow-sm">
          <h3 className="text-sm text-gray-500 dark:text-gray-400">Active Connections</h3>
          <p className="text-2xl font-bold mt-1">8,291</p>
        </div>
        
        <div className="bg-white dark:bg-navy-800 border border-gray-200 dark:border-navy-700 rounded-lg p-4 shadow-sm">
          <h3 className="text-sm text-gray-500 dark:text-gray-400">Blocked Traffic</h3>
          <p className="text-2xl font-bold mt-1">392 <span className="text-sm font-normal text-gray-500 dark:text-gray-400">packets</span></p>
        </div>
        
        <div className="bg-white dark:bg-navy-800 border border-gray-200 dark:border-navy-700 rounded-lg p-4 shadow-sm">
          <h3 className="text-sm text-gray-500 dark:text-gray-400">Bandwidth Usage</h3>
          <p className="text-2xl font-bold mt-1">24.7 <span className="text-sm font-normal text-gray-500 dark:text-gray-400">MB/s</span></p>
        </div>
      </div>
      
      {/* Network Topology Map */}
      <TopologyView nodes={mockNetworkNodes} connections={mockNetworkConnections} />
      
      {/* Bottom Panels */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white dark:bg-navy-800 border border-gray-200 dark:border-navy-700 rounded-lg shadow-sm p-4">
          <h3 className="font-medium mb-4">Recent Network Events</h3>
          
          <div className="overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-navy-700">
              <thead>
                <tr className="bg-gray-50 dark:bg-navy-900">
                  <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Time</th>
                  <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Event</th>
                  <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Source</th>
                  <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Destination</th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-navy-800 divide-y divide-gray-200 dark:divide-navy-700">
                {[
                  { time: '2:45 PM', event: 'New Connection', source: '192.168.1.15', destination: '8.8.8.8' },
                  { time: '2:42 PM', event: 'DNS Lookup', source: '192.168.1.6', destination: 'dns.google.com' },
                  { time: '2:40 PM', event: 'Traffic Blocked', source: '45.32.18.221', destination: '192.168.1.1' },
                  { time: '2:38 PM', event: 'Bandwidth Spike', source: '192.168.1.8', destination: 'cloud-storage.com' },
                  { time: '2:35 PM', event: 'New Device', source: '192.168.1.22', destination: 'DHCP Server' },
                ].map((event, index) => (
                  <tr key={index} className={index === 2 ? 'bg-red-50 dark:bg-red-900/10' : ''}>
                    <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{event.time}</td>
                    <td className="px-4 py-2 whitespace-nowrap text-sm">
                      <span className={`${index === 2 ? 'text-red-600 dark:text-red-400 font-medium' : 'text-gray-900 dark:text-gray-200'}`}>
                        {event.event}
                      </span>
                    </td>
                    <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400 font-mono">{event.source}</td>
                    <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400 font-mono">{event.destination}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        
        <div className="bg-white dark:bg-navy-800 border border-gray-200 dark:border-navy-700 rounded-lg shadow-sm p-4">
          <h3 className="font-medium mb-4">Traffic Distribution</h3>
          
          <div className="h-64 flex items-center justify-center">
            <div className="w-full max-w-xs">
              <div className="relative pt-1">
                <div className="flex mb-2 items-center justify-between">
                  <div>
                    <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-teal-600 bg-teal-200 dark:text-teal-300 dark:bg-teal-900">
                      HTTP/HTTPS
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-semibold inline-block text-teal-600 dark:text-teal-400">
                      62%
                    </span>
                  </div>
                </div>
                <div className="overflow-hidden h-2 mb-6 text-xs flex rounded bg-teal-200 dark:bg-teal-900">
                  <div style={{ width: '62%' }} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-teal-500 dark:bg-teal-600"></div>
                </div>
              </div>
              
              <div className="relative pt-1">
                <div className="flex mb-2 items-center justify-between">
                  <div>
                    <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-blue-600 bg-blue-200 dark:text-blue-300 dark:bg-blue-900">
                      DNS
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-semibold inline-block text-blue-600 dark:text-blue-400">
                      15%
                    </span>
                  </div>
                </div>
                <div className="overflow-hidden h-2 mb-6 text-xs flex rounded bg-blue-200 dark:bg-blue-900">
                  <div style={{ width: '15%' }} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-500 dark:bg-blue-600"></div>
                </div>
              </div>
              
              <div className="relative pt-1">
                <div className="flex mb-2 items-center justify-between">
                  <div>
                    <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-purple-600 bg-purple-200 dark:text-purple-300 dark:bg-purple-900">
                      SSH/SFTP
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-semibold inline-block text-purple-600 dark:text-purple-400">
                      10%
                    </span>
                  </div>
                </div>
                <div className="overflow-hidden h-2 mb-6 text-xs flex rounded bg-purple-200 dark:bg-purple-900">
                  <div style={{ width: '10%' }} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-purple-500 dark:bg-purple-600"></div>
                </div>
              </div>
              
              <div className="relative pt-1">
                <div className="flex mb-2 items-center justify-between">
                  <div>
                    <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-gray-600 bg-gray-200 dark:text-gray-300 dark:bg-gray-700">
                      Other
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-semibold inline-block text-gray-600 dark:text-gray-400">
                      13%
                    </span>
                  </div>
                </div>
                <div className="overflow-hidden h-2 mb-6 text-xs flex rounded bg-gray-200 dark:bg-gray-700">
                  <div style={{ width: '13%' }} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-gray-500 dark:bg-gray-600"></div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="text-sm text-center text-gray-500 dark:text-gray-400 mt-2">
            Based on last 24 hours of network traffic
          </div>
        </div>
      </div>
    </div>
  );
};

export default NetworkPage;