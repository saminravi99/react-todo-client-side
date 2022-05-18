import "./Header.css";
import React from "react";
import Navbar from "react-bootstrap/Navbar";
import { Container, Nav } from "react-bootstrap";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { signOut } from "firebase/auth";
import auth from "../firebase.init";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";

const Header = () => {
  // React Hooks for navigating and getting the pathname
  const { pathname } = useLocation();
  const navigate = useNavigate();
  let from = navigate?.state?.from?.pathname || "/login";

  // React Firebase Hook for getting the current user
  const [authUser] = useAuth();

  //Using Function to Sign Out Using Firebase Hooks
  const handleSignOut = () => {
    signOut(auth);
    navigate(from);
  };

  return (
    <div
      className={
        pathname === "/" ||
        pathname === "/login" ||
        pathname === "/sign-up" ||
        pathname === "/tasks"
          ? `d-block`
          : `d-none`
      }
    >
      <div>
        <div className="pt-4 navbar-container">
          <Navbar className="navbar-bg" collapseOnSelect expand="lg">
            <Container>
              <Link to="/">
                <div className="logo-img-container">
                  <img
                    className="logo-img"
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR8eCEUbADuIz1anZ8SHhqrioctPzZ4LIoltwV6IPK1xDmHIB_FAZ8f_OP8ohuQf16AuA&usqp=CAU"
                    alt="logo"
                  />
                </div>
              </Link>
              <Navbar.Toggle aria-controls="responsive-navbar-nav" />
              <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="mx-auto">
                  <NavLink
                    className={({ isActive }) =>
                      isActive ? `active-link mx-2` : `inactive-link mx-2`
                    }
                    to="/"
                  >
                    Home
                  </NavLink>
                  <NavLink
                    className={({ isActive }) =>
                      isActive ? `active-link mx-2` : `inactive-link mx-2`
                    }
                    to="/tasks"
                  >
                    Your Tasks
                  </NavLink>
                </Nav>
                <Nav>
                  {authUser ? (
                    <span>
                      <span className="px-4 user-name">
                        Hello, {authUser.displayName}
                      </span>
                      <button
                        className="btn sign-out-btn"
                        onClick={handleSignOut}
                      >
                        Sign Out
                        <FontAwesomeIcon
                          className="ms-2"
                          icon={faRightFromBracket}
                        />
                      </button>
                    </span>
                  ) : (
                    <NavLink className="mx-2 login-btn" to="/login">
                      Login
                    </NavLink>
                  )}
                </Nav>
              </Navbar.Collapse>
            </Container>
          </Navbar>
        </div>

        <div
          className={
            pathname.includes("login")
              ? "d-none"
              : pathname.includes("sign-up")
              ? `d-none`
              : pathname.includes("tasks")
              ? `d-none`
              : `header-img`
          }
        ></div>
      </div>
    </div>
  );
};

export default Header;
