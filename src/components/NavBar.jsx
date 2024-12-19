import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const NavBar = () => {
  const { isAuthenticated, logout, user } = useAuth(); // Get the authentication state
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/"); // Redirect to home after logout
  };

  return (
    <div className="navbar bg-base-100 shadow-lg fixed" id="app-nav-bar">
      <div className="flex-1">
        <a className="btn text-xl skeleton">Zzzemina</a>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1">
          <li>
            <Link to="/">Home</Link>
          </li>
          {/* Only show Management if authenticated as admin */}
          {isAuthenticated && user?.role === "admin" && (
            <li>
              <details>
                <summary>Management</summary>
                <ul className="bg-base-100 rounded-t-none p-2">
                  <li>
                    <Link to="/manage_users">Users</Link>
                  </li>
                  <li>
                    <Link to="/manage_seminars">Seminars</Link>
                  </li>
                  <li>
                    <Link to="/manage_bookings">Bookings</Link>
                  </li>
                </ul>
              </details>
            </li>
          )}

          {/* Show this for authenticated users with "user" role */}
          {isAuthenticated && user?.role === "user" && (
            <>
              <li>
                <Link to="/my_bookings">My Bookings</Link>
              </li>
              <li>
                <Link to="/browse_seminars">Browse Seminars</Link>
              </li>
            </>
          )}
        </ul>
      </div>

      <div className="flex-none gap-2">
        {/* Show avatar and profile if authenticated */}
        {isAuthenticated ? (
          <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full">
                <img
                  alt="User"
                  src={user?.profilePic || "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"}
                />
              </div>
            </div>
            <ul tabIndex={0} className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
              <li>
                <h4 className="justify-center">Hello, {user?.name || "Human"}</h4>
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
          // Show login link if not authenticated
          <Link to="/login" className="btn btn-default">
            Login
          </Link>
        )}
      </div>
    </div>
  );
};

export default NavBar;
