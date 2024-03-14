import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from './AuthContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import "./styles.css";

import {
  faHome,
  faUserPlus,
  faSignInAlt,
  faMoneyCheck,
  faMoneyBill,
  faUsers,
  faSignOutAlt,
} from '@fortawesome/free-solid-svg-icons';

import "./Navbar.css";

function Navbar() {
    const navigate = useNavigate();
    const { isAuthenticated, logout } = useContext(AuthContext);

    const handleLogout = () => {
        localStorage.removeItem('currentUser');
        logout();
        navigate('/login');
    };

    return (
        <nav>
            <Link to="/">
                <FontAwesomeIcon icon={faHome} className="navbar-icon" /> Home
            </Link>
            {!isAuthenticated && (
                <Link to="/register">
                    <FontAwesomeIcon icon={faUserPlus} className="navbar-icon"/> Register
                </Link>
            )}
            {!isAuthenticated && (
                <Link to="/login">
                    <FontAwesomeIcon icon={faSignInAlt} className="navbar-icon" /> Login
                </Link>
            )}
            {isAuthenticated && (
                <Link to="/deposit">
                    <FontAwesomeIcon icon={faMoneyCheck} className="navbar-icon"/> Deposit
                </Link>
            )}
            {isAuthenticated && (
                <Link to="/withdraw">
                    <FontAwesomeIcon icon={faMoneyBill} className="navbar-icon"/> Withdraw
                </Link>
            )}
            {isAuthenticated && (
                <Link to="/customer-data">
                    <FontAwesomeIcon icon={faUsers} className="navbar-icon" /> Customer Data
                </Link>
            )}
            {isAuthenticated && (
                <button onClick={handleLogout} id='logout'>
                    <FontAwesomeIcon icon={faSignOutAlt} className="navbar-icon"/> Logout
                </button>
            )}
        </nav>
    );
}

export default Navbar;
