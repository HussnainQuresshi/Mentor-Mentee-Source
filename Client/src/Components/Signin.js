import React, { PureComponent } from "react";
import {
  MDBContainer,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBCardFooter,
  MDBIcon,
  MDBCardHeader,
  MDBBtn,
  MDBInput
} from "mdbreact";
import Navbarr from "../Containers/Navbarr";
import { Link } from "react-router-dom";
import Extrafeature from "../Containers/Extrafeature";
import { GoogleLogin } from "react-google-login";
import axios from "axios";
import { NotificationManager } from "react-notifications";
import { ConnectionStates } from "mongoose";
class Signin extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      code: "",
      errorMessage: "",
      isauth: false
    };
  }

  responseGoogle = async response => {
    if (response.error) {
      NotificationManager.error(response.error, "Error!");
    } else {
      await axios
        .post(
          "http://localhost:5000/users/oauth/google/signin",
          response.profileObj
        )
        .then(res => {
          NotificationManager.success("Signed in !!", "Successful!", 3000);
          this.props.history.push("/dashboard");
        })
        .catch(err => {
          NotificationManager.error("Wrong Pass or Email", "Error!");
        });
    }
  };
  onEmailChange = e => {
    this.setState({
      email: e.target.value
    });
  };
  onPassChange = e => {
    this.setState({
      password: e.target.value
    });
  };

  onSubmit = async e => {
    e.preventDefault();
    const data = { email: this.state.email, password: this.state.password };
    await axios
      .post("http://localhost:5000/users/signin", data)
      .then(res => {
        NotificationManager.success("Signed in !!", "Successful!", 3000);
        this.props.history.push("/dashboard");
      })
      .catch(err => {
        NotificationManager.error("Wrong Pass or Email", "Error!");
      });
  };
  checkauth = async () => {
    this.setState({ isauth: false });
    await axios
      .get("http://localhost:5000/users/checkauth")
      .then(res => {
        this.setState({ isauth: true });
      })
      .catch(err => {
        this.setState({ isauth: false });
      });
  };
  get = name => {
    var url = window.location.search;
    var num = url.search(name);
    var namel = name.length;
    var frontlength = namel + num + 1; //length of everything before the value
    var front = url.substring(0, frontlength);
    url = url.replace(front, "");
    num = url.search("&");

    if (num >= 0) return url.substr(0, num);
    if (num < 0) return url;
  };
  componentDidMount() {
    let x = this.get("value");
    if (x === "sucessfull") {
      NotificationManager.success("Signed in !!", "Successful!", 3000);
      this.props.history.push("/dashboard");
    } else if (x === "=unsccessful") {
      NotificationManager.error("Wrong Pass or Email", "Error!");
    }
    this.checkauth();
  }

  render() {
    let displaysign = (
      <div>
        <Navbarr extrafeature={<Extrafeature {...this.props} />} />
        <MDBContainer
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center"
          }}
          className="responsive mt-5"
        >
          <MDBCol md="5" className="mt-5">
            <MDBCard className="hoverable heavy-rain-gradient mt-2  ">
              <MDBCardBody>
                <MDBCardHeader className="form-header rounded-pill peach-gradient btn-block text-center">
                  <h3 className="my-2">
                    <MDBIcon icon="lock" /> Sign In
                  </h3>
                </MDBCardHeader>
                <form onSubmit={this.onSubmit}>
                  <div className="grey-text">
                    <MDBInput
                      label="Type your email"
                      icon="envelope"
                      type="email"
                      group
                      validate
                      error="wrong"
                      success="right"
                      value={this.state.email}
                      onChange={this.onEmailChange}
                      required
                    />
                    <MDBInput
                      label="Type your password"
                      icon="lock"
                      group
                      type="password"
                      validate
                      value={this.state.password}
                      onChange={this.onPassChange}
                      required
                    />
                    <div className="form-group form-check">
                      <input
                        type="checkbox"
                        className="form-check-input"
                        id="exampleCheck1"
                      />
                      <label className="form-check-label" for="exampleCheck1">
                        Remember Me
                      </label>
                    </div>
                  </div>

                  <div className="text-center">
                    <MDBBtn
                      className="btn rounded-pill peach-gradient"
                      type="submit"
                    >
                      Sign In
                    </MDBBtn>

                    <a className="text-danger">Forgot Password?</a>
                  </div>
                </form>
                <MDBCardFooter className="text-center heavy-rain-gradient rounded-pill ">
                  <p>Sign In With</p>
                  <GoogleLogin
                    clientId="174305250349-8mttdogu80ov35jt5k6u9tmg2f93i1o0.apps.googleusercontent.com"
                    render={renderProps => (
                      <button
                        className="btn rounded btn-light btn-outline-danger rounded-pill "
                        onClick={renderProps.onClick}
                        disabled={renderProps.disabled}
                      >
                        <i className="fab fa-google-plus-g text-danger fa-3x "></i>
                      </button>
                    )}
                    buttonText="Login"
                    onSuccess={this.responseGoogle}
                    onFailure={this.responseGoogle}
                    cookiePolicy={"single_host_origin"}
                  />
                  <a href="http://localhost:5000/users/auth/linkedin/signin">
                    <button className="btn rounded btn-light btn-outline-blue rounded-pill ">
                      <i className="fab fa-linkedin-in fa-3x mr-2 "></i>
                    </button>
                  </a>

                  <div>
                    Don't Have An Account?
                    <Link to="./signup" className="text-danger">
                      Register Now
                    </Link>
                  </div>
                </MDBCardFooter>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBContainer>
      </div>
    );
    if (this.state.isauth) {
      displaysign = <div>Already Sign In</div>;
      window.location = "http://localhost:3000/";
    }
    return <React.Fragment>{displaysign}</React.Fragment>;
  }
}
export default Signin;
