import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import Signin from "./Components/Signin";
import NotFoundPage from "./Containers/NotFoundPage";
import Signup from "./Components/Signup";
import Home from "./Components/Home";
import Dashboard from "./Components/Dashboard";
import Profile from "./Components/Profile";
import React, { Component } from "react";
import "react-notifications/lib/notifications.css";
import { NotificationContainer } from "react-notifications";
import { LinkedInPopUp } from "react-linkedin-login-oauth2";
import About from "./Components/About";

export default class createRoutes extends Component {
  render() {
    return (
      <React.Fragment>
        <Router>
          <Switch>
            <Route exact path="/linkedin" component={LinkedInPopUp} />
            <Route exact path="/" component={Home} />
            <Route exact path="/Signin" component={Signin} />
            <Route exact path="/Signup" component={Signup} />
            <Route exact path="/Dashboard" component={Dashboard} />
            <Route exact path="/Profile" component={Profile} />
            <Route path="/About" component={About} />
            <Route component={NotFoundPage} />
          </Switch>
          <NotificationContainer />
        </Router>
      </React.Fragment>
    );
  }
}
