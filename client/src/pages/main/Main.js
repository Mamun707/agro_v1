import React from "react";
import Dashboard from "../../components/dashboard/Dashboard";
import Transaction from "../../components/transactions/Transaction";
import User from "../../components/user/User";
import Land from "../../components/land/Land";

import Navbar from "../../components/navigation/Navbar";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import "./main.css";
import SignIn from "../../components/signin/SignIn";
function Main() {
  const role = localStorage.getItem("agro_role");


  if(localStorage.getItem("agro_auth")==="true"){
    return (
      <div className="main-board">
          <div className="main-nav">
            <Navbar />
          </div>
          <div className="main-dash">
              <Route path="/admin/dashboard">
                <Dashboard />
              </Route>
              
              <Route path="/admin/transaction">
                <Transaction />
              </Route>


              {role === "admin" ? (
              
              <Route path="/admin/user">
                <User />
              </Route>
            ) : null}

              {role === "admin" ? (
              <Route path="/admin/land">
                <Land />
              </Route>  
            ) : null}

          </div>
      </div>
    );
  }else{
    return(<Redirect to="/login"/>)
  }
  
}

export default Main;
