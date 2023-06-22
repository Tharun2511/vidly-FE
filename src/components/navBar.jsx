import React, { Component } from "react";
import { NavLink, Link } from "react-router-dom";

class NavBar extends Component {
  render() {
    const user = this.props.user;
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
            {!user &&
              <React.Fragment>
                <NavLink className="nav-link nav-item" to="/login">
                  Login
                </NavLink>
                <NavLink className="nav-link nav-item" to="/register">
                  Register
                </NavLink>
              </React.Fragment>}
              {user &&
              <React.Fragment>
                <NavLink className="nav-link nav-item" to="/profile">
                  {user.name}
                </NavLink>
                <NavLink className="nav-link nav-item" to="/logout">
                  Logout
                </NavLink>
              </React.Fragment>}
          </div>
        </div>
      </nav>
    );
  }
}

export default NavBar;
