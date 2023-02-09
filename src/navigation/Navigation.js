import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import AuthLayout from "../layouts/AuthLayout";
import GuestLayout from "../layouts/GuestLayout";
import "../App.css";
import Login from "../pages/authentication/Login";
import Register from "../pages/authentication/Register";
import Home from "../pages/Home";
import * as authActions from "../store/actions/auth";
const Navigation = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const dispatch = useDispatch();
  return (
    <Router>
      <div className="App">
        <ul className="App-header">
          {!isAuthenticated && (
            <>
              <li>
                <Link to="/login">Login</Link>
              </li>
              <li>
                <Link to="/register">Register</Link>
              </li>
            </>
          )}
          {isAuthenticated && (
            <li>
              <Link
                to="/login"
                onClick={() => {
                  dispatch(authActions.logOut());
                }}
              >
                Log Out
              </Link>
            </li>
          )}
        </ul>
        <Routes>
          <Route element={<GuestLayout />}>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/register" element={<Register />}></Route>
          </Route>
          <Route element={<AuthLayout />}>
            <Route path="/" element={<Home />}></Route>
          </Route>
        </Routes>
      </div>
    </Router>
  );
};

export default Navigation;
