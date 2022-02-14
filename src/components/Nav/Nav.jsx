import React from 'react';
import { Link } from 'react-router-dom';
import LogOutButton from '../LogOutButton/LogOutButton';
//import './Nav.css';
import { useSelector } from 'react-redux';

function Nav() {
  const user = useSelector((store) => store.user);

  return (
  <nav>
      <Link to="/home">
        <h2 className="nav-title">Bhutville</h2>
      </Link>
        <Link  to="/home">
          <h2>Home</h2>
        </Link>
        {/* If a user is logged in, show these links */}
        {user.id && (
          <>
            <Link  to="/user">
              <h2>User</h2>
            </Link>

            <LogOutButton />
          </>
        )}
  </nav>
  );
}

export default Nav;
