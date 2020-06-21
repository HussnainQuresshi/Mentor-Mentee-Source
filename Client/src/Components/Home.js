import React, { Component } from "react";
import Navbarr from "../Containers/Navbarr";
import Extrafeature from "../Containers/Extrafeature";
import axios from "axios";
import { NotificationManager } from "react-notifications";
export default class Home extends Component {
  render() {
    return (
      <div>
        <Navbarr
          extrafeature={
            <Extrafeature
              {...this.props}
              NotificationManager={NotificationManager}
            />
          }
        />
      </div>
    );
  }
}
