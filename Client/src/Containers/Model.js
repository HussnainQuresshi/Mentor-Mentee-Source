import React, { PureComponent } from "react";
import { MDBBtn } from "mdbreact";
import axios from "axios";
export default class Model extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      date: "",
      title: "",
      with: "",
      from: "",
      to: "",
      mentee_users: [],
      optionloop: 1
    };
  }
  onModelSubmit = async e => {
    let data = {
      date: this.state.date,
      title: this.state.title,
      mentor: this.props.userID,
      with: this.state.with,
      from: this.state.from,
      to: this.state.to
    };

    await axios
      .post("http://localhost:5000/users/addmeeting", data)
      .then(res => {
        window.location = "http://localhost:3000/dashboard";
        this.props.NotificationManager.success(
          "New Meeting Added",
          "Successful!",
          2000
        );
      })
      .catch(err => {
        this.props.NotificationManager.error(
          "Something went worong",
          "Error!",
          2000
        );
      });
  };
  onModelChange = e => {
    const value = e.target.value;
    const name = e.target.username;
    this.setState({
      ...this.state,
      [e.target.username]: name,
      [e.target.name]: value
    });
  };
  GetMenteeList = async () => {
    await axios
      .get("http://localhost:5000/users/employes")
      .then(res => {
        this.setState({
          ...this.state,
          date: this.props.date,
          mentee_users: res.data.data
        });
      })
      .catch(err => {
        this.props.NotificationManager.error(
          "Could'nt Get employe list",
          "Error",
          3000
        );
      });
  };
  optionss = () => {
    return this.state.mentee_users.map((v, i) => {
      if (v.post === "mentee") {
        if (this.state.optionloop === 1) {
          this.setState({
            with: v._id,
            optionloop: 2
          });
          return (
            <option username={v.username} value={v._id} key={i}>
              {v.username}
            </option>
          );
        } else {
          return (
            <option username={v.username} value={v._id} key={i} selected>
              {v.username}
            </option>
          );
        }
      }
    });
  };
  componentDidMount() {
    this.GetMenteeList();
  }
  render() {
    return (
      <div
        className="modal fade"
        id="exampleModalCenter"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="exampleModalCenterTitle"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <form
              onSubmit={this.onModelSubmit}
              className="text-center border border-light p-5 bg-light"
            >
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
              <p className="h4 mb-4">Schedule A Meeting</p>

              <input
                type="text"
                className="form-control mb-4 "
                name="meetingDate"
                value={
                  this.props.date.getFullYear() +
                  "-" +
                  (this.props.date.getMonth() + 1) +
                  "-" +
                  this.props.date.getDate()
                }
                disabled
              />

              <input
                type="text"
                className="form-control mb-4"
                name="title"
                placeholder="enter title here"
                onChange={this.onModelChange}
                required
              />

              <select
                className="browser-default custom-select mb-4"
                name="with"
                placeholder="Select Mentee"
                value={this.state.with}
                onChange={this.onModelChange}
                required
              >
                {this.optionss()}
              </select>
              <div className="row">
                <div className="col col-6">
                  {" "}
                  <input
                    type="text"
                    className="form-control mb-4"
                    placeholder="Start At"
                    name="from"
                    onChange={this.onModelChange}
                    required
                  />
                </div>
                <div className="col col-6">
                  {" "}
                  <input
                    type="text"
                    className="form-control mb-4"
                    placeholder="End At"
                    name="to"
                    onChange={this.onModelChange}
                    required
                  />
                </div>
              </div>

              <MDBBtn
                className="btn btn-info btn-block rounded-pill peach-gradient"
                type="submit"
              >
                Save
              </MDBBtn>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
