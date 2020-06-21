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
  MDBInput,
  MDBFormInline
} from "mdbreact";
import Navbarr from "../Containers/Navbarr";
import Extrafeature from "../Containers/Extrafeature";
import { GoogleLogin } from "react-google-login";
import { NotificationManager } from "react-notifications";
import axios from "axios";

class Signup extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      email: "",
      password: "",
      post: "",
      code: "",
      errorMessage: "",
      isauth: false
    };
  }
  onClick = e => () => {
    this.setState({
      post: e
    });
  };

  onUserChange = e => {
    this.setState({
      username: e.target.value
    });
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

  responseGoogle = async response => {
    if (!response.error) {
      if (
        window.confirm(
          "Press OK if you are a Mentor Or Cancel If you are a Mentee"
        )
      ) {
        this.setState({ post: "mentor" });
      } else {
        this.setState({ post: "mentee" });
      }
      let post = this.state.post;

      response = { ...response.profileObj, post };

      await axios
        .post("http://localhost:5000/users/oauth/google/signup", response)
        .then(res => {
          NotificationManager.success("Please Signin now", "Successful!", 3000);
          this.props.history.push("/signin");
        })
        .catch(err => {
          NotificationManager.error("Account Already Exists", "Error!");
        });
    } else {
      NotificationManager.error(response.error, "Error!");
    }
  };

  onSubmit = async e => {
    e.preventDefault();
    const data = {
      username: this.state.username,
      email: this.state.email,
      password: this.state.password,
      post: this.state.post
    };
    await axios
      .post("http://localhost:5000/users/signup", data)
      .then(res => {
        NotificationManager.success("Please Signin now", "Successful!", 3000);
        this.props.history.push("/signin");
      })
      .catch(err => {
        NotificationManager.error("Account Already Exists", "Error", 3000);
      });

    this.setState({
      username: "",
      password: "",
      email: "",
      post: ""
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
      NotificationManager.success("Please Signin now", "Successful!", 3000);
      this.props.history.push("/Signin");
    } else if (x === "=unsccessful") {
      NotificationManager.error("Account Already Exists", "Error", 3000);
    }
    this.checkauth();
  }
  render() {
    let displaysign = (
      <div>
        <Navbarr extrafeature={<Extrafeature />} />
        <MDBContainer
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center"
          }}
          className="mt-5"
        >
          <MDBCol md="5" className="mt-5">
            <MDBCard className="hoverable heavy-rain-gradient mt-2">
              <MDBCardBody>
                <MDBCardHeader className="form-header rounded-pill  peach-gradient btn-block text-center">
                  <h3 className="my-2">
                    <MDBIcon icon="lock" /> Sign Up
                  </h3>
                </MDBCardHeader>
                <form onSubmit={this.onSubmit}>
                  <div className="grey-text">
                    <MDBInput
                      label="UserName"
                      icon="user"
                      group
                      validate
                      error="wrong"
                      success="right"
                      value={this.state.username}
                      onChange={this.onUserChange}
                      required
                    />
                    <MDBInput
                      label="Email"
                      type="email"
                      icon="envelope"
                      group
                      validate
                      error="wrong"
                      success="right"
                      value={this.state.email}
                      onChange={this.onEmailChange}
                      required
                    />
                    <MDBInput
                      label="password"
                      icon="lock"
                      group
                      type="password"
                      validate
                      value={this.state.password}
                      onChange={this.onPassChange}
                      required
                    />
                    <MDBFormInline>
                      <MDBInput
                        style={{ height: "15px", width: "15px" }}
                        className="responsive"
                        onClick={this.onClick("mentor")}
                        checked={this.state.post === "mentor" ? true : false}
                        label="Mentor"
                        type="radio"
                        id="radio1"
                        containerClass="mr-5"
                      />
                      <MDBInput
                        style={{ height: "15px", width: "15px" }}
                        className="responsive"
                        onClick={this.onClick("mentee")}
                        checked={this.state.post === "mentee" ? true : false}
                        label="Mantee"
                        type="radio"
                        id="radio2"
                      />
                    </MDBFormInline>
                  </div>

                  <div className="responsive text-center">
                    <MDBBtn
                      className="peach-gradient rounded-pill "
                      type="submit"
                    >
                      Sign Up
                    </MDBBtn>
                  </div>
                </form>
                <MDBCardFooter className="text-center rounded-pill heavy-rain-gradient">
                  <p>Sign Up With</p>
                  <GoogleLogin
                    clientId="174305250349-8mttdogu80ov35jt5k6u9tmg2f93i1o0.apps.googleusercontent.com"
                    render={renderProps => (
                      <button
                        className="btn rounded btn-light btn-outline-danger rounded-pill m-auto "
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
                  <a href="http://localhost:5000/users/auth/linkedin/signup">
                    <button className="btn rounded btn-light btn-outline-blue rounded-pill ">
                      <i className="fab fa-linkedin-in fa-3x mr-2 "></i>
                    </button>
                  </a>
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
export default Signup;
