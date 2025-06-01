import { useState, useContext, useEffect } from "react";
import { Star, Lock, Menu, X, User, LogOut } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../Context/AuthContext";

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const isLoggedIn = !!user;

  useEffect(() => {
    if (user) {
      console.log("User object from AuthContext:", user);
      console.log("Profile image URL:", user.profile_image);
    } else {
      console.log("User object is null or undefined.");
    }
  }, [user]);

  const toggleMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
  const toggleProfileDropdown = () => setIsProfileDropdownOpen(!isProfileDropdownOpen);

  const handleLogout = () => {
    logout();
    setIsProfileDropdownOpen(false);
    setIsMobileMenuOpen(false);
    navigate("/login");
  };

  const handlePostJobClick = () => {
    if (!isLoggedIn) {
      alert("Please log in to post a job.");
      return;
    }
    navigate("/postform");
  };

  const navItems = [
    { name: "Home", to: "/" },
    { name: "Job List", to: "/joblist" },
    { name: "Blog", to: "/blog" },
    { name: "About", to: "/about" },
    { name: "Contact", to: "/contact" },
  ];

  const userDisplayName = user?.first_name || user?.email?.split("@")[0] || "Profile";
  const userProfileImage = user?.profile_image;

  return (
    <header className="z-10 bg-transparent">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="text-white font-bold text-xl tracking-wider">JobSy</Link>

        {/* Desktop Nav */}
        <nav className="hidden ml-40 md:flex items-center space-x-8">
          {navItems.map(({ name, to }) => (
            <Link key={name} to={to} className="text-white hover:text-gray-300 transition-colors">
              {name}
            </Link>
          ))}
        </nav>

        {/* Desktop Right Actions */}
        <div className="hidden md:flex items-center space-x-4">
          <button
            onClick={handlePostJobClick}
            className="btn btn-outline text-white border-white hover:bg-white hover:text-black px-4 py-2 rounded-md flex items-center"
          >
            <Star className="w-4 h-4 mr-2" /> Post a Job
          </button>

          {!isLoggedIn ? (
            <Link to="/login" className="btn bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md flex items-center">
              <Lock className="w-4 h-4 mr-2" /> Log In
            </Link>
          ) : (
            <div className="relative">
              <button onClick={toggleProfileDropdown} className="flex items-center space-x-2 text-white">
                {userProfileImage ? (
                  <img
                    src={userProfileImage}
                    alt="Profile"
                    className="w-10 h-10 rounded-full object-cover border-2 border-white"
                  />
                ) : (
                  <User className="w-6 h-6" />
                )}
                <span>{userDisplayName}</span>
              </button>

              {isProfileDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-20">
                  <Link
                    to="/dashboard/profile"
                    onClick={() => {
                      setIsProfileDropdownOpen(false);
                      setIsMobileMenuOpen(false);
                    }}
                    className="block px-4 py-2 text-gray-800 hover:bg-gray-100 flex items-center"
                  >
                    <User className="w-4 h-4 mr-2" /> Profile
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-100 flex items-center"
                  >
                    <LogOut className="w-4 h-4 mr-2" /> Logout
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Mobile Menu Button & User Icon */}
        <div className="md:hidden flex items-center space-x-2">
          {isLoggedIn && userProfileImage && (
            <button onClick={toggleProfileDropdown} className="text-white flex items-center">
              <img
                src={userProfileImage}
                alt="Profile"
                style={{ width: "40px", height: "40px", borderRadius: "50%", border: "2px solid white" }}
              />
            </button>
          )}
          <button onClick={toggleMenu} className="text-white">
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Nav Menu (full screen overlay) */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-0 bg-black/90 px-4 py-4 space-y-4 text-white flex flex-col items-center justify-center">
          <button onClick={toggleMenu} className="absolute top-4 right-4 text-white">
            <X className="w-8 h-8" />
          </button>
          {navItems.map(({ name, to }) => (
            <Link
              key={name}
              to={to}
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-2xl hover:text-green-400 transition-colors py-3"
            >
              {name}
            </Link>
          ))}

          <div className="flex flex-col gap-4 mt-6 w-full max-w-xs">
            <button
              onClick={handlePostJobClick}
              className="btn btn-outline text-white border-white hover:bg-white hover:text-black px-4 py-3 rounded-md text-lg flex items-center justify-center"
            >
              <Star className="w-5 h-5 mr-2" /> Post a Job
            </button>

            {!isLoggedIn ? (
              <Link
                to="/login"
                onClick={() => setIsMobileMenuOpen(false)}
                className="btn bg-green-500 hover:bg-green-600 text-white px-4 py-3 rounded-md text-lg flex items-center justify-center"
              >
                <Lock className="w-5 h-5 mr-2" /> Log In
              </Link>
            ) : (
              <>
                <Link
                  to="/dashboard/profile"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="btn bg-blue-500 hover:bg-blue-600 text-white px-4 py-3 rounded-md text-lg flex items-center justify-center"
                >
                  <User className="w-5 h-5 mr-2" /> Profile
                </Link>
                <button
                  onClick={handleLogout}
                  className="btn bg-red-500 hover:bg-red-600 text-white px-4 py-3 rounded-md text-lg flex items-center justify-center"
                >
                  <LogOut className="w-5 h-5 mr-2" /> Logout
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
