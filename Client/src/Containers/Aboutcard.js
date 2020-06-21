import React, { Component } from "react";
import { MDBContainer, MDBCard, MDBCardImage, MDBCardBody } from "mdbreact";

export default class About extends Component {
  render() {
    let github = "";
    let facebook = "";
    let insta = "";
    let links = [
      {
        GITHUB: "/linktogithub",
        FACEBOOK: "/linkto facebook",
        INSTA: "/linktoinstagram"
      },
      {
        GITHUB: "/linktogithub",
        FACEBOOK: "/linkto facebook",
        INSTA: "/linktoinstagram"
      }
    ];
    if (this.props.cardtitle === "Hussnain") {
      github = links[0].GITHUB;
      facebook = links[0].FACEBOOK;
      insta = links[0].INSTA;
    } else if (this.props.cardtitle === "Usman") {
      github = links[1].GITHUB;
      facebook = links[1].FACEBOOK;
      insta = links[1].INSTA;
    }
    return (
      <MDBCard
        style={{ width: "20rem" }}
        className="d-flex hoverable deep-blue-gradient m-2 animated pulse"
      >
        <MDBCardImage
          className="mx-auto white rounded-circle  z-depth-2"
          style={{ width: "200px", height: "200px" }}
          src={this.props.pic}
          alt="woman avatar"
        />
        <MDBCardBody>
          <h4 className="card-title d-flex justify-content-center">
            {this.props.cardtitle}
          </h4>
          <hr />
          <MDBContainer className="d-flex justify-content-center">
            <a
              style={{ fontSize: "30px", color: "inherit" }}
              href={facebook}
              className="fab fa-facebook m-4 text-primary"
            />

            <a
              style={{ fontSize: "30px", color: "inherit" }}
              href={insta}
              className="fab fa-instagram m-4 text-danger"
            />

            <a
              style={{ fontSize: "30px", color: "inherit" }}
              href={github}
              className="fab fa-github m-4 text-dark"
            />
          </MDBContainer>
        </MDBCardBody>
      </MDBCard>
    );
  }
}
