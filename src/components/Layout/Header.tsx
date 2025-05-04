import React, { useState } from 'react';
import { Bell, Search, Menu, X, User } from 'lucide-react';

interface HeaderProps {
  toggleSidebar: () => void;
  sidebarOpen: boolean;
}

const Header: React.FC<HeaderProps> = ({ toggleSidebar, sidebarOpen }) => {
  const [notifications, setNotifications] = useState(3);
  
  return (
    <header className="bg-white dark:bg-navy-800 border-b border-gray-200 dark:border-navy-700 h-16 flex items-center justify-between px-4 lg:px-6">
      <div className="flex items-center">
        <button
          onClick={toggleSidebar}
          className="p-2 rounded-md text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-navy-700 lg:hidden"
        >
          {sidebarOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
        
        <div className="relative ml-4 lg:ml-0">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <input
            type="text"
            placeholder="Search..."
            className="pl-10 pr-4 py-2 bg-gray-100 dark:bg-navy-700 rounded-md w-full lg:w-64 text-sm dark:text-gray-300 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
        </div>
      </div>

      <div className="flex items-center space-x-4">
        <div className="relative">
          <button className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-navy-700 transition-colors">
            <Bell className="h-5 w-5 text-gray-500 dark:text-gray-400" />
            {notifications > 0 && (
              <span className="absolute top-0 right-0 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center animate-pulse">
                {notifications}
              </span>
            )}
          </button>
        </div>
        
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded-full bg-teal-500 flex items-center justify-center text-white">
            <User className="h-5 w-5" />
          </div>
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300 hidden md:inline-block">Pushp</span>
        </div>
      </div>
    </header>
  );
};

export default Header;