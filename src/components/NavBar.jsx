import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { FaTimes, FaBars } from "react-icons/fa";
import { useState } from "react";

const NavBar = () => {
  const { isAuthenticated, logout, user } = useAuth(); // Get the authentication state
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State for toggling mobile menu

  const handleLogout = () => {
    logout();
    navigate("/"); // Redirect to home after logout
  };

  return (
    <div
      className="navbar bg-base-100 shadow-lg fixed w-full z-10"
      id="app-nav-bar"
    >
      <div className="flex-1 ml-16">
        <Link to="/" className="btn btn-ghost rounded-none text-xl skeleton">
          Zzzemina
        </Link>
      </div>

      {/* Hamburger menu button (mobile) */}
      <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="btn btn-ghost btn-circle text-xl"
        >
          <FaBars />
        </button>
      </div>

      {/* Drawer (mobile) */}
      <div
        className={`fixed top-0 left-0 h-full bg-base-300 w-64 opacity-90 transform ${
          isMenuOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out z-20`}
      >
        <div className="absolute top-4 right-4">
          <button
            onClick={() => setIsMenuOpen(false)}
            className="btn btn-ghost text-xl top-5"
          >
            <FaTimes />
          </button>
        </div>

        <ul className="menu p-4">
          <li>
            <Link to="/" onClick={() => setIsMenuOpen(false)}>
              Home
            </Link>
          </li>

          {/* Only show Management if authenticated as admin */}
          {isAuthenticated && user?.role === "admin" && (
            <li>
              <details>
                <summary>Management</summary>
                <ul className="bg-base-100 p-2">
                  <li>
                    <Link
                      to="/manage_users"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Users
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/manage_seminars"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Seminars
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/manage_bookings"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Bookings
                    </Link>
                  </li>
                </ul>
              </details>
            </li>
          )}

          {/* Show this for authenticated users with "user" role */}
          {isAuthenticated && user?.role === "user" && (
            <>
              <li>
                <Link to="/my_bookings" onClick={() => setIsMenuOpen(false)}>
                  My Bookings
                </Link>
              </li>
              <li>
                <Link
                  to="/browse_seminars"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Browse Seminars
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>

      {/* Profile and login button */}
      <div className="flex-none gap-2">
        {isAuthenticated ? (
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full">
                <img
                  alt="User"
                  src={
                    user?.profilePic ||
                    "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                  }
                />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
            >
              <li>
                <h4 className="justify-center">
                  Hello, {user?.name || "Human"}
                </h4>
                <hr />
              </li>
              <li>
                <a className="justify-between">
                  Profile
                  <span className="badge">{user?.role || "Role"}</span>
                </a>
              </li>
              <li>
                <a onClick={handleLogout}>Logout</a>
              </li>
            </ul>
          </div>
        ) : (
          <Link to="/login" className="btn btn-default">
            Login
          </Link>
        )}
      </div>
    </div>
  );
};

export default NavBar;
