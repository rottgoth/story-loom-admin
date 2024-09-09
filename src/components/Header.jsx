import React from "react";
import { Link } from "react-router-dom";

const Header = ({ isLoggedIn, handleLogout }) => {
  return (
    <header className="bg-blue-600 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-white text-xl">StoryLoom</h1>
        <nav>
          <ul>
            {isLoggedIn ? (
              <>
                <li>
                  <Link to="/dashboard" className="text-white mx-2">Dashboard</Link>
                </li>
                <li>
                  <button onClick={handleLogout} className="text-white mx-2">Logout</button>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link to="/signin" className="text-white mx-2">Sign In</Link>
                </li>
                <li>
                  <Link to="/signup" className="text-white mx-2">Sign Up</Link>
                </li>
              </>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;