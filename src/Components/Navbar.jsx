import React from "react";
import { NavLink } from "react-router-dom";
import "./Navbar.css";
import { useAuth } from "../store/auth";

const Navbar = () => {
    const {isLoggedIn} = useAuth(); // Corrected: changed isLoggeIn to isLoggedIn
    return (
        <>
            <header>
                <div className="container">
                    <a href="/">Getplaced</a>
                </div>
                <nav>
                    <ul>
                        <li><NavLink className="nav" to="/">HOME</NavLink></li>
                        <li><NavLink className="nav" to="/Resources">Resources</NavLink></li>
                        <li><NavLink className="nav" to="/Contact">Contact</NavLink></li>
                        <li><NavLink className="nav" to="/Mentees">Mentees</NavLink></li>
                        
                        {isLoggedIn ? (
                            <li><NavLink className="nav" to="/Logout">Logout</NavLink></li>
                        ) : (
                            <>
                                <li><NavLink className="nav" to="/Login">Login</NavLink></li>
                                <li><NavLink className="nav" to="/Registration">SignUp</NavLink></li>
                            </>
                        )}
                    </ul>
                </nav>
            </header>
        </>
    );
}

export default Navbar;
