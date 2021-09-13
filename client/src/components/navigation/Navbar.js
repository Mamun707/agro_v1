import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import "./navbar.css";
import logo from "../../assets/logo.svg";
import { MdDashboard, MdPayment } from "react-icons/md";
import { AiOutlineLogout } from "react-icons/ai";
import { FaUserAlt } from "react-icons/fa";
import { GiIsland } from "react-icons/gi";

function Navbar() {
  const role = localStorage.getItem("agro_role");

  return (
    <>
      <div className="navigation">
        <div className="logo">
          <img src={logo} alt="logo" />
        </div>
        <div className="nav-bar">
          <ul className="nav-menu">
            <li>
              <div className="list1">
                <NavLink to="/admin/dashboard">
                  <MdDashboard />
                  <span>Dashboard</span>
                </NavLink>
              </div>
            </li>
            <li>
              <div className="list1">
                <NavLink to="/admin/transaction">
                  <MdPayment />
                  <span>Transaction</span>
                </NavLink>
              </div>
            </li>
            {role === "admin" ? (
              <li>
                <div className="list1">
                  <NavLink to="/admin/user">
                    <FaUserAlt />
                    <span>User</span>
                  </NavLink>
                </div>
              </li>
            ) : null}
            {role === "admin" ? (
              <li>
                <div className="list1">
                  <NavLink to="/admin/land">
                    <GiIsland />
                    <span>Land</span>
                  </NavLink>
                </div>
              </li>
            ) : null}

            <li>
              <div className="list1">
                <NavLink
                  to="/login"
                  onClick={() => {
                    localStorage.setItem("agro_auth", false);
                  }}
                >
                  <AiOutlineLogout />
                  <span>Logout</span>
                </NavLink>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}

export default Navbar;
