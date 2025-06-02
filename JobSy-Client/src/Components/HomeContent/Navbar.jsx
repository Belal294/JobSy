import { useState, useContext, useEffect } from "react";
import { Star, Lock, Menu, X, User, LogOut } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import AuthContext from "../Context/AuthContext";

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [isTransparent, setIsTransparent] = useState(true);

  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const isLoggedIn = !!user;

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

  useEffect(() => {
    const handleScroll = () => {
      // Only make the navbar transparent on the home page when at the top
      if (location.pathname === "/" && window.scrollY < 50) {
        setIsTransparent(true);
      } else {
        setIsTransparent(false);
      }
    };

    handleScroll(); // initial check
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [location]);

  // Determine the background style based on transparency
  const headerStyle = isTransparent && location.pathname === "/"
    ? { backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6))` }
    : {};

  return (
    <header
      className={`z-10 top-0 left-0 w-full transition-all duration-300 ${
        isTransparent && location.pathname === "/" ? "" : "bg-white shadow-md"
      }`}
      style={headerStyle}
    >
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className={`font-bold text-xl tracking-wider ${isTransparent && location.pathname === "/" ? "text-white" : "text-black"}`}>
          JobSy
        </Link>

        <nav className="hidden ml-40 md:flex items-center space-x-8">
          {navItems.map(({ name, to }) => (
            <Link
              key={name}
              to={to}
              className={`hover:text-green-600 transition-colors ${
                isTransparent && location.pathname === "/" ? "text-white" : "text-black"
              }`}
            >
              {name}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center space-x-4">
          <button
            onClick={handlePostJobClick}
            className={`btn btn-outline px-4 py-2 rounded-md flex items-center border ${
              isTransparent && location.pathname === "/"
                ? "text-white border-white hover:bg-white hover:text-black"
                : "text-black border-black hover:bg-black hover:text-white"
            }`}
          >
            <Star className="w-4 h-4 mr-2" /> Post a Job
          </button>

          {!isLoggedIn ? (
            <Link
              to="/login"
              className={`btn px-4 py-2 rounded-md flex items-center ${
                isTransparent && location.pathname === "/" ? "bg-green-500 text-white" : "bg-green-600 text-white"
              }`}
            >
              <Lock className="w-4 h-4 mr-2" /> Log In
            </Link>
          ) : (
            <div className="relative">
              <button onClick={toggleProfileDropdown} className="flex items-center space-x-2">
                {userProfileImage ? (
                  <img
                    src={userProfileImage}
                    alt="Profile"
                    className="w-10 h-10 rounded-full object-cover border-2"
                    style={{
                      borderColor: isTransparent && location.pathname === "/" ? "white" : "black",
                    }}
                  />
                ) : (
                  <User className={`w-6 h-6 ${isTransparent && location.pathname === "/" ? "text-white" : "text-black"}`} />
                )}
                <span className={`${isTransparent && location.pathname === "/" ? "text-white" : "text-black"}`}>{userDisplayName}</span>
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

        {/* Mobile Menu Toggle Button */}
        <div className="md:hidden flex items-center space-x-2">
          {isLoggedIn && userProfileImage && (
            <button onClick={toggleProfileDropdown}>
              <img
                src={userProfileImage}
                alt="Profile"
                className="w-10 h-10 rounded-full border-2"
                style={{
                  borderColor: isTransparent && location.pathname === "/" ? "white" : "black",
                }}
              />
            </button>
          )}
          <button onClick={toggleMenu}>
            {isMobileMenuOpen ? (
              <X className={`w-6 h-6 ${isTransparent && location.pathname === "/" ? "text-white" : "text-black"}`} />
            ) : (
              <Menu className={`w-6 h-6 ${isTransparent && location.pathname === "/" ? "text-white" : "text-black"}`} />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Nav Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-0 bg-black/90 px-4 py-4 space-y-4 text-white flex flex-col items-center justify-center z-50">
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