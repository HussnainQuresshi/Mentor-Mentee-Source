import React, { PureComponent } from "react";
import Navbarr from "../Containers/Navbarr";
import {
  MDBNavItem,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBBtn,
  MDBCard,
  MDBCardTitle,
  MDBCardBody,
  MDBCardFooter
} from "mdbreact";
import Calender from "../Containers/Calender";
import Tasks from "../Containers/Tasks";
import Modal from "../Containers/Model";
import axios from "axios";
import Aux from "../Containers/hoc/aux";
import Extrafeature from "../Containers/Extrafeature";
import { NotificationManager } from "react-notifications";
export default class Dashboard extends PureComponent {
  state = {
    userID: "",
    username: "",
    useremail: "",
    userpost: "",
    pic: "",
    date: new Date(),
    data: {
      columns: [
        {
          label: "Title",
          field: "title",
          sort: "asc"
        },
        {
          label: "With",
          field: "with",
          sort: "asc"
        },
        {
          label: "From",
          field: "from",
          sort: "asc"
        },
        {
          label: "To",
          field: "to",
          sort: "asc"
        }
      ],
      rows: []
    },
    ismentor: false,
    isloading: false
  };
  getProfile = async () => {
    await axios
      .get("http://localhost:5000/users/profile")
      .then(res => {
        let profile = res.data.data;
        if (profile.post === "mentor") {
          this.setState({
            userID: profile._id,
            username: profile.username,
            useremail: profile.email,
            userpost: profile.post,
            pic: profile.pic,
            ismentor: true
          });
        } else {
          this.setState({
            userID: profile._id,
            username: profile.username,
            useremail: profile.email,
            userpost: profile.post,
            pic: profile.pic,
            ismentor: false
          });
        }
      })
      .catch(err => {
        console.log(err);
      });
  };
  getMeetings = () => {
    this.setState({ isloading: true });
    axios
      .get("http://localhost:5000/users/getmeeting")
      .then(res => {
        this.setState({
          ...this.state,
          data: { columns: [...this.state.data.columns], rows: res.data },
          isloading: false
        });
      })

      .catch(err => {
        this.setState({ isloading: false });
      });
  };

  Signout = async () => {
    await axios
      .get("http://localhost:5000/users/signout")
      .then(res => {
        NotificationManager.success("Signed Out", "Successful!", 3000);
      })
      .catch(err => {
        NotificationManager.error("Something Went Wrong", "Error!");
      });
  };
  onChange = date => {
    this.setState({ date });
    this.setState({ meetingDate: date });
  };
  componentDidMount() {
    this.getProfile();
    this.getMeetings();
  }

  render() {
    let _component = (
      <Tasks
        {...this.props}
        ismentor={this.state.ismentor}
        data={this.state.data}
        NotificationManager={NotificationManager}
      />
    );
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
              valid={true}
              NotificationManager={NotificationManager}
              {...this.props}
            />
          }
        />
        <MDBContainer className="mt-5">
          <MDBRow className="container justify-content-between responsable">
            <MDBCol className="col-md-7">
              <MDBCard className="hoverable m-3 heavy-rain-gradient">
                <MDBCardTitle className="m-auto p-2">
                  <h2>
                    <strong>Meeting Schedule</strong>
                  </h2>
                </MDBCardTitle>
                <MDBCardBody>{_component}</MDBCardBody>
              </MDBCard>
            </MDBCol>
            <MDBCol className="col-md-5">
              <MDBCard className="hoverable m-3 heavy-rain-gradient">
                <MDBCardBody>
                  <Calender date={this.state.date} onChange={this.onChange} />
                </MDBCardBody>
                <MDBCardFooter>
                  <MDBBtn
                    style={{ display: this.state.ismentor ? "block" : "none" }}
                    className="btn rounded peach-gradient btn-block btn-sm rounded-pill "
                    data-toggle="modal"
                    data-target="#exampleModalCenter"
                  >
                    <i className="fas fa-plus fa-2x ml-2">Add</i>
                  </MDBBtn>
                </MDBCardFooter>
              </MDBCard>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
        <Modal
          {...this.props}
          date={this.state.date}
          userID={this.state.userID}
          NotificationManager={NotificationManager}
        />
      </Aux>
    );
  }
}
