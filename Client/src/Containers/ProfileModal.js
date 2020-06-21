import React, { PureComponent } from "react";
import { MDBBtn, MDBCardImage } from "mdbreact";
import axios from "axios";
import IMG from "../Assets/user.png";
export default class ProfileModal extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      pic: "",
      username: "",
      password: ""
    };
  }

  onProfileChange = e => {
    const value = e.target.value;
    this.setState({
      ...this.state,
      [e.target.name]: value
    });
  };
  onProfileSubmit = async e => {
    await axios
      .post("http://localhost:5000/users/update", this.state)
      .then(res => {
        this.props.NotificationManager.success(
          "Profile Updated! ",
          "Successful!"
        );
      })
      .catch(err => {
        this.props.NotificationManager.error(err, "Error!");
      });

    this.setState({
      pic: null,
      username: "",
      password: ""
    });
  };

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
        <div className="modal-dialog modal-dialog-centered " role="document">
          <div className="modal-content">
            <form
              className="heavy-rain-gradient text-center border border-light p-5 bg-light"
              onSubmit={this.onProfileSubmit}
            >
              {" "}
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
              <p className="h4 mb-4">Edit Your Profile</p>
              <MDBCardImage
                className="m-auto rounded-circle"
                style={{ width: "180px" }}
                src={this.props.pic ? this.props.pic : IMG}
                alt="Card image cap"
              />
              {/* <div className="input-group mt-4 mb-4">
                <div className="custom-file">
                  <input
                    type="file"
                    className="custom-file-input"
                    name="pic"
                    placeholder={this.state.pic}
                    id="inputGroupFile01"
                    aria-describedby="inputGroupFileAddon01"
                    onChange={this.onProfileChange}
                  />

                  <label
                    className="custom-file-label text-primary  border border-success "
                    for="inputGroupFile01"
                  >
                    choose File
                  </label>
                </div>
              </div> */}
              <input
                type="text"
                className="form-control mt-4 mb-4 border border-success"
                placeholder={this.props.username}
                name="username"
                onChange={this.onProfileChange}
                required
              />
              <input
                type="password"
                className="form-control mb-4 border border-success"
                placeholder="Password"
                name="password"
                onChange={this.onProfileChange}
                required
              />
              <MDBBtn
                className="btn btn-info btn-block btn rounded-pill peach-gradient"
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
