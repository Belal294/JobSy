import { Link, NavLink } from "react-router-dom";
import { 
  BarChart2, Users, User, CreditCard, HelpCircle, Home, Bookmark 
} from "lucide-react"; // 🆕 Added Bookmark icon
import SidebarItem from "./SidebarItem";

export default function Sidebar() {
  return (
    <div className="hidden md:flex flex-col w-64 h-screen bg-white border-r border-gray-200 shadow-xl">
      
      {/* Top Branding */}
      <div className="flex items-center p-6 border-b border-gray-200 bg-gradient-to-r from-green-50 to-white">
        <Link to='/'
         className="text-green-700 font-extrabold text-2xl flex items-center">
          <span className="text-green-500 mr-2">📊</span>JobSy
        </Link>
      </div>

      {/* Navigation Links */}
      <div className="flex-1 overflow-y-auto pt-4">
        <nav className="flex flex-col px-4 py-2 space-y-1">

          <NavLink to="/dashboard" end>
            {({ isActive }) => (
              <SidebarItem icon={<BarChart2 size={18} />} text="Dashboard" active={isActive} />
            )}
          </NavLink>

          <NavLink to="/dashboard/joblistitem">
            {({ isActive }) => (
              <SidebarItem icon={<BarChart2 size={18} />} text="Jobs" active={isActive} />
            )}
          </NavLink>

          <NavLink to="/dashboard/applications">
            {({ isActive }) => (
              <SidebarItem icon={<BarChart2 size={18} />} text="Applications" active={isActive} />
            )}
          </NavLink>

          <NavLink to="/dashboard/saved">
            {({ isActive }) => (
              <SidebarItem icon={<Bookmark size={18} />} text="Saved" active={isActive} />
            )}
          </NavLink> {/* 🆕 Saved Jobs NavLink */}

         

          <NavLink to="/dashboard/profile">
            {({ isActive }) => (
              <SidebarItem icon={<User size={18} />} text="Profile" active={isActive} />
            )}
          </NavLink>

     

          <NavLink to="/dashboard/support">
            {({ isActive }) => (
              <SidebarItem icon={<HelpCircle size={18} />} text="Support" active={isActive} />
            )}
          </NavLink>

        </nav>
      </div>

      {/* Footer Section */}
      <div className="p-4 border-t border-gray-200">
        <NavLink
          to="/"
          className="flex items-center justify-center gap-2 text-sm text-green-600 font-medium hover:underline"
        >
          <Home size={16} />
          Back to Home
        </NavLink>
        <p className="text-center text-xs text-gray-400 mt-2">&copy; {new Date().getFullYear()} JobSy. All rights reserved.</p>
      </div>
    </div>
  );
}
