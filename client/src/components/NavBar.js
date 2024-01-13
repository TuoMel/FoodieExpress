import React from 'react';
import { NavLink } from 'react-router-dom';

const NavBar = () => {
    return (
        <nav>
            <ul style={navBar}>
                <li style={navBarItem}>
                    <NavLink to="/">Home</NavLink>
                </li>
                <li style={navBarItem}>
                    <NavLink to="/restaurants">Restaurants</NavLink>
                </li>
                <li style={navBarItem}>
                    <NavLink to="/register">Create Account</NavLink>
                </li>
            </ul>
        </nav>
    );
};

const navBar = {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: "100%", backgroundColor: "lightblue", minHeight: "50px" };
const navBarItem = { listStyle: "none", paddingLeft: "10%", paddingRight: "10%" };
export default NavBar;
