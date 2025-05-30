import { Bell, Clock, User, ChevronDown, Menu, LogOut, LogIn } from "lucide-react"; 
import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuthContext from "../Hooks/UseAuthContext";

export default function Header() {
  const { _user, logoutUser } = useAuthContext();
  const navigate = useNavigate();

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleLogout = () => {
    logoutUser();
    navigate("/login");
    setIsDropdownOpen(false);
  };

  const handleLoginRedirect = () => {
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
  }, [dropdownRef]);

  const getFormattedDate = () => {
    const date = new Date();
    const options = { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' };
    return date.toLocaleDateString('en-US', options);
  };

  return (
    <header className="bg-white border-b border-gray-200 flex items-center justify-between p-4 shadow-sm">
      <button className="md:hidden p-2 rounded-md text-gray-600 hover:bg-gray-100 transition-colors">
        <Menu size={20} />
      </button>

      <div className="flex items-center space-x-4 ml-auto">
        <div className="text-sm text-gray-500 hidden sm:block">{getFormattedDate()}</div>
        <button className="p-2 rounded-full text-gray-600 hover:bg-gray-100 transition-colors">
          <Clock size={20} />
        </button>
        <button className="p-2 rounded-full text-gray-600 hover:bg-gray-100 transition-colors">
          <Bell size={20} />
        </button>

        {/* Profile Dropdown */}
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="flex items-center space-x-2 p-1 rounded-full bg-blue-50 hover:bg-blue-100 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <div className="w-8 h-8 rounded-full bg-blue-200 flex items-center justify-center text-blue-800 font-bold text-sm">
              {_user && _user.first_name ?
                <span className="text-sm font-medium">
                  {_user.first_name.charAt(0).toUpperCase()}
                </span>
                : <User size={16} className="text-blue-600" />
              }
            </div>
            <span className="hidden sm:inline text-sm font-medium text-gray-800">
              {_user ? `${_user.first_name || 'User'} ${_user.last_name || ''}` : 'Account'}
            </span>
            <ChevronDown size={16} className="text-gray-500" />
          </button>

          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-xl z-10 animate-fade-in-down">
              <div className="py-1">
                {_user ? (
                  <>
                    <div className="block px-4 py-2 text-sm text-gray-700 border-b border-gray-100 font-semibold">
                      Signed in as: <span className="font-bold text-blue-600">{_user.email}</span>
                    </div>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-3 text-sm text-gray-700 hover:bg-gray-100 flex items-center space-x-3 transition-colors rounded-b-lg"
                    >
                      <LogOut size={16} className="text-gray-500" />
                      <span>Logout</span>
                    </button>
                  </>
                ) : (
                  <button
                    onClick={handleLoginRedirect}
                    className="w-full text-left px-4 py-3 text-sm text-gray-700 hover:bg-gray-100 flex items-center space-x-3 transition-colors rounded-lg"
                  >
                    <LogIn size={16} className="text-gray-500" />
                    <span>LogOut</span>
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}