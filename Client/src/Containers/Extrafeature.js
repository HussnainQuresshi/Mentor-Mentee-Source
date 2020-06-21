import React, { Component } from "react";
import { Link } from "react-router-dom";
import { MDBNavItem } from "mdbreact";
import IMG from "../Assets/user.png";
import axios from "axios";
import { NotificationManager } from "react-notifications";
let data = [
  {
    linkto: "./signin",
    btnname: "Sign In",
    iconclass: "fas fa-sign-in-alt p-1"
  },
  {
    linkto: "./signup",
    btnname: "Sign Up",
    iconclass: "fas fa-user-plus p-1"
  }
];
const Extrafeature2 = props => {
  return (
    <MDBNavItem>
      <div className="btn-group m-auto">
        <button
          className="btn dropdown-toggle rounded btn-outline-dark hoverable"
          data-toggle="dropdown"
          data-display="static"
          aria-haspopup="true"
          aria-expanded="false"
        >
          <img
            className="m-auto rounded-circle"
            style={{ height: "22px" }}
            src={props.pic ? props.pic : IMG}
            alt="IMG"
          />
          Setting
        </button>
        <div className="dropdown-menu p-2 heavy-rain-gradient">
          <button
            onClick={() =>
              (window.location = "http://localhost:3000/dashboard")
            }
            className="btn dropdown-item rounded btn-outline-dark mb-2 hoverable"
          >
            <i className="fas fa-grip-horizontal"></i>Dashboard
          </button>

          <button
            onClick={() => (window.location = "http://localhost:3000/profile")}
            className="btn dropdown-item rounded btn-outline-dark mb-2 hoverable"
          >
            <i className="fas fa-user"></i>Profile
          </button>

          <button
            onClick={props.Signout}
            className="btn dropdown-item rounded btn-outline-dark hoverable"
          >
            <i className="fas fa-sign-out-alt"></i>Signout
          </button>
        </div>
      </div>
    </MDBNavItem>
  );
};

const extrafeature1 = data.map(v => {
  return (
    <MDBNavItem>
      <Link to={v.linkto}>
        <button className="btn rounded btn-outline-dark hoverable">
          <i className={v.iconclass}></i>
          {v.btnname}
        </button>
      </Link>
    </MDBNavItem>
  );
});
export default class Extrafeature extends Component {
  constructor(props) {
    super(props);
  }
  state = { isauth: false, pic: null };
  Signout = async () => {
    await axios
      .get("http://localhost:5000/users/signout")
      .then(res => {
        this.props.NotificationManager.success(
          "Loged out!",
          "Successful!",
          3000
        );
      })
      .catch(err => {
        this.props.NotificationManager.error(err, "Error!", 3000);
      });
    this.setState({ isauth: false });
  };
  checkAuth = async () => {
    await axios
      .get("http://localhost:5000/users/checkauth")
      .then(res => {
        {
          this.setState({ isauth: true, pic: res.data.data });
        }
      })
      .catch(err => {
        this.setState({ isauth: false });
      });
  };
  componentDidMount() {
    this.checkAuth();
  }
  render() {
    if (!this.state.isauth && !this.props.valid) {
      return <React.Fragment>{extrafeature1}</React.Fragment>;
    } else {
      return (
        <React.Fragment>
          {<Extrafeature2 pic={this.state.pic} Signout={this.Signout} />}
        </React.Fragment>
      );
    }
  }
}
