import React from "react";
import { NavLink } from "react-router-dom";
import "./Navbar.css";
import { useAuth } from "../store/auth";

const Navbar = () => {
    const { isLoggedIn } = useAuth(); // Corrected: changed isLoggeIn to isLoggedIn
    return (
        <>
            <header>
                <div className="container">
                    <a href="/">Getplaced</a>
                </div>
                <nav>
                    <ul>
                        <li><NavLink className="nav" to="/">HOME</NavLink></li>
                        <li><NavLink className="nav" to="/resources">Resources</NavLink></li>
                        <li><NavLink className="nav" to="/contact">Contact</NavLink></li>
                        <li><NavLink className="nav" to="/mentees">Mentees</NavLink></li>
                        
                        
                        {isLoggedIn ? (
                            <li><NavLink className="nav" to="/logout">Logout</NavLink></li>
                        ) : (
                            <>
                                <li><NavLink className="nav" to="/login">Login</NavLink></li>
                                <li><NavLink className="nav" to="/registration">SignUp</NavLink></li>
                            </>
                        )}
                    </ul>
                </nav>
            </header>
        </>
    );
}

export default Navbar;