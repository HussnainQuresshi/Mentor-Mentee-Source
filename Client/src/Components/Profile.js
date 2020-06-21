import React, { PureComponent } from "react";
import Navbarr from "../Containers/Navbarr";
import IMG from "../Assets/user.png";
import ProfileModal from "../Containers/ProfileModal";
import { NotificationManager } from "react-notifications";
import {
  MDBNavItem,
  MDBContainer,
  MDBRow,
  MDBCard,
  MDBCol,
  MDBCardTitle,
  MDBCardBody,
  MDBCardFooter,
  MDBCardImage,
  MDBBtn
} from "mdbreact";
import Aux from "../Containers/hoc/aux";
import axios from "axios";
import Extrafeature from "../Containers/Extrafeature";
export default class Profile extends PureComponent {
  state = {
    pic: "",
    username: "",
    useremail: "",
    userpost: "",
    Employes: [],
    isloading: false
  };

  getProfile = async () => {
    this.setState({ isloading: true });
    await axios
      .get("http://localhost:5000/users/profile")
      .then(res => {
        let profile = res.data.data;

        this.setState({
          username: profile.username,
          useremail: profile.email,
          userpost: profile.post,
          pic: profile.pic
        });
      })
      .catch(err => {
        this.setState({ isloading: false });
        console.log(err);
      });
    await axios
      .get("http://localhost:5000/users/employes")
      .then(res => {
        this.setState({ Employes: res.data.data, isloading: false });
      })
      .catch(err => {
        this.setState({ isloading: false });
        console.log(err);
      });
  };
  readyemployelist = () => {
    return this.state.Employes.map(v => {
      return (
        <div className="row mt-2">
          <div
            style={{ width: "350px", height: "100px" }}
            className="card heavy-rain-gradient rounded-pill bordered border-primary"
          >
            <div
              style={{
                display: "flex",
                flex: "1 1 auto"
              }}
            >
              <img
                style={{ width: "100px", height: "100px" }}
                className="rounded-circle p-2"
                src={v.pic ? v.pic : IMG}
                alt="No Image "
              />
              <div className="card-body">
                <p>
                  {v.username}
                  <br />
                  {v.email}
                  <br /> {v.post}
                </p>
              </div>
            </div>
          </div>
        </div>
      );
    });
  };
  Signout = async () => {
    await axios
      .get("http://localhost:5000/users/signout")
      .then(res => {
        NotificationManager.success("Signed Out", "Successful!", 3000);
        this.props.history.push("/signin");
      })
      .catch(err => {
        NotificationManager.error("Something Went Wrong", "Error!");
        console.log(err);
      });
  };

  componentDidMount() {
    this.getProfile();
  }
  render() {
    let _component = this.readyemployelist();
    if (this.state.isloading) {
      _component = (
        <MDBContainer className="m-auto p-5 ">
          <div className="m-5 p-5 spinner-border text-danger" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        </MDBContainer>
      );
    }
    return (
      <Aux {...this.props}>
        <Navbarr
          extrafeature={
            <Extrafeature
              {...this.props}
              NotificationManager={NotificationManager}
              valid={true}
            />
          }
        />
        <MDBContainer className="mt-5">
          <MDBRow className="container justify-content-between responsable">
            <MDBCol className="col-lg-6">
              <MDBCard
                style={{ width: "350px" }}
                className="hoverable p-3 m-3 heavy-rain-gradient"
              >
                <div className="profile-pic">
                  <MDBCardImage
                    className="m-auto rounded-circle"
                    style={{ width: "180px" }}
                    src={this.state.pic ? this.state.pic : IMG}
                    alt="Card image cap"
                  />
                </div>
                <MDBCardTitle className="m-auto">
                  <strong>Profile</strong>
                </MDBCardTitle>
                <MDBCardBody>
                  <b>Name</b>
                  <p>{this.state.username}</p>
                  <b>Email</b>
                  <p>{this.state.useremail}</p>
                  <b>Post</b>
                  <p>{this.state.userpost}</p>
                </MDBCardBody>
                <MDBCardFooter>
                  <MDBBtn
                    className="btn rounded-pill peach-gradient"
                    data-toggle="modal"
                    data-target="#exampleModalCenter"
                  >
                    Edit Profile
                  </MDBBtn>
                </MDBCardFooter>
              </MDBCard>
            </MDBCol>
            <MDBCol className="col-lg-6">
              <MDBCard
                style={{ width: "400px" }}
                className="hoverable p-3 m-3 heavy-rain-gradient"
              >
                <MDBCardTitle className="m-auto">
                  <i className="fas fa-users"></i>
                  {"  "}
                  <strong>ALL Mentor/Mentees</strong>
                  {"  "}
                  <i className="fas fa-user-friends"></i>
                </MDBCardTitle>
                <MDBCardBody className="scrollbar-ripe-malinka scroll">
                  {_component}
                </MDBCardBody>
              </MDBCard>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
        <ProfileModal
          pic={this.state.pic}
          username={this.state.username}
          useremail={this.state.useremail}
          userpost={this.state.userpost}
          NotificationManager={NotificationManager}
        />
      </Aux>
    );
  }
}
