import React, { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import "./navBar.scss";

const NavBar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <Link className="navbar-brand" to="/">
        <h2>Uifinity Assignment</h2>
      </Link>

      <ul className="nav-links">
        <li className="nav-item">
          <NavLink className="nav-link" to="/teacher">
            Teacher
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" to="/student">
            Student
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
