import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Bell, Clock, User, ChevronDown, Menu, LogOut } from "lucide-react";
import useAuthContext from "../Hooks/UseAuthContext";

export default function DashboardHeader({ toggleSidebar }) {
  const { user, logout } = useAuthContext();
  const navigate = useNavigate();

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleLogout = () => {
    logout();
    navigate("/login");
    setIsDropdownOpen(false);
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const getFormattedDate = () => {
    const date = new Date();
    const options = { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' };
    return date.toLocaleDateString('en-US', options);
  };

  const userDisplayName = user?.first_name ? `${user.first_name} ${user.last_name || ''}`.trim() : user?.email || 'Account';
  const userAvatarInitial = user?.first_name?.charAt(0)?.toUpperCase() || user?.email?.charAt(0)?.toUpperCase() || '';

  return (
    <header className="bg-white border-b border-gray-200 flex items-center justify-between p-4 shadow-sm">
      {/* Sidebar Toggle Button */}
      <button onClick={toggleSidebar} className="md:hidden p-2 rounded-md text-gray-600 hover:bg-gray-100 transition-colors">
        <Menu size={20} />
      </button>

      {/* Right side icons and profile */}
      <div className="flex items-center space-x-4 ml-auto">
        <div className="text-sm text-gray-500 hidden sm:block">{getFormattedDate()}</div>
        <button className="p-2 rounded-full text-gray-600 hover:bg-gray-100 transition-colors">
          <Clock size={20} />
        </button>
        <Link to={'/dashboard/notify'} className="p-2 rounded-full text-gray-600 hover:bg-gray-100 transition-colors">
          <Bell size={20} />
        </Link>

        {/* Profile Dropdown */}
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="flex items-center space-x-2 p-1 rounded-full bg-green-50 hover:bg-green-100 transition-colors focus:outline-none focus:ring-2 focus:ring-green-400"
          >
            {user?.profile_image ? (
              <img
                src={user.profile_image}
                alt="Profile"
                className="w-8 h-8 rounded-full object-cover border border-green-300"
              />
            ) : (
              <div className="w-8 h-8 rounded-full bg-green-200 flex items-center justify-center text-green-800 font-bold text-sm">
                {userAvatarInitial || <User size={16} className="text-green-600" />}
              </div>
            )}
            <span className="hidden sm:inline text-sm font-medium text-gray-800">
              {userDisplayName}
            </span>
            <ChevronDown size={16} className="text-gray-500" />
          </button>

          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-56 bg-white border border-gray-200 rounded-lg shadow-xl z-10 animate-fade-in-down">
              <div className="py-1">
                {user && (
                  <>
                    <div className="block px-4 py-2 text-sm text-gray-700 border-b border-gray-100 font-semibold">
                      Signed in as: <span className="font-bold text-green-600">{user.email}</span>
                    </div>
                    {/* Profile link can be re-enabled here */}
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-3 text-sm text-gray-700 hover:bg-gray-100 flex items-center space-x-3 transition-colors rounded-b-lg"
                    >
                      <LogOut size={16} className="text-gray-500" />
                      <span>Logout</span>
                    </button>
                  </>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
