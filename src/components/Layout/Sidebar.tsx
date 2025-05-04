import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  Shield, 
  Bell, 
  Activity, 
  Settings, 
  Users, 
  Server, 
  FileText, 
  BarChart3, 
  LogOut 
} from 'lucide-react';

const navItems = [
  { path: '/', name: 'Dashboard', icon: <Shield className="w-5 h-5" /> },
  { path: '/alerts', name: 'Alerts', icon: <Bell className="w-5 h-5" /> },
  { path: '/network', name: 'Network', icon: <Activity className="w-5 h-5" /> },
  { path: '/logs', name: 'Logs', icon: <FileText className="w-5 h-5" /> },
  { path: '/analytics', name: 'Analytics', icon: <BarChart3 className="w-5 h-5" /> },
  { path: '/devices', name: 'Devices', icon: <Server className="w-5 h-5" /> },
  { path: '/users', name: 'Users', icon: <Users className="w-5 h-5" /> },
  { path: '/settings', name: 'Settings', icon: <Settings className="w-5 h-5" /> },
];

const Sidebar: React.FC = () => {
  return (
    <div className="bg-navy-900 text-white h-screen w-64 flex flex-col shadow-lg">
      <div className="p-4 border-b border-navy-700">
        <div className="flex items-center space-x-2">
          <Shield className="h-8 w-8 text-teal-500" />
          <span className="text-xl font-bold">SecureIDS</span>
        </div>
      </div>

      <nav className="flex-1 overflow-y-auto py-4">
        <ul className="space-y-1 px-2">
          {navItems.map((item) => (
            <li key={item.path}>
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center space-x-3 px-3 py-2.5 rounded-md transition-colors ${
                    isActive
                      ? 'bg-navy-700 text-teal-400'
                      : 'text-gray-300 hover:bg-navy-800 hover:text-white'
                  }`
                }
              >
                {item.icon}
                <span>{item.name}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      <div className="p-4 border-t border-navy-700">
        <button className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors w-full">
          <LogOut className="h-5 w-5" />
          <span>Log out</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;