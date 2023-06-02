import React, { Component } from "react";
import { NavLink, Link } from "react-router-dom";

class NavBar extends Component {
  render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <Link className="navbar-brand" to="/movies">
          Vidly
        </Link>
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div className="navbar-nav">
            <NavLink className="nav-link nav-item" to="/movies">
              Movies
            </NavLink>
            <NavLink className="nav-link nav-item" to="/customers">
              Customers
            </NavLink>
            <NavLink className="nav-link nav-item" to="/rentals">
              Rentals
            </NavLink>
            <NavLink className="nav-link nav-item" to="/login">
              Login
            </NavLink>
            <NavLink className="nav-link nav-item" to="/register">
              Register
            </NavLink>
          </div>
        </div>
      </nav>
    );
  }
}

export default NavBar;
