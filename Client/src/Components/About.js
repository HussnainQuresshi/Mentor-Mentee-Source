import React, { Component } from "react";
import About from "../Containers/Aboutcard";
import { MDBRow, MDBContainer } from "mdbreact";
import Navbarr from "../Containers/Navbarr";

import usman from "../Assets/usman.jpg";

import hussnain from "../Assets/hussnain.jpg";
export default class Abouts extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <Navbarr {...this.props} title="About The Developers" goback={true}>
        <div className="container">
          <div className="row align-items-center ">
            <div className="col-lg-6">
              <h1 className="display-4">About The Website</h1>
              <p className="lead text-muted mb-0">
                This Website Was Created Using Advanced Level Web Tech Including
                React,Express ,Node ,MongoDB, Redux,Graphql ,Bootstrap Matrial
                UI,MDBReact, MDBBootstrap.
              </p>
            </div>
            <div className="col-lg-6 d-none d-lg-block">
              <img
                src="https://res.cloudinary.com/mhmd/image/upload/v1556834136/illus_kftyh4.png"
                alt=""
                className="img-fluid"
              />
            </div>
          </div>
        </div>
        <div className="container ">
          <div className="row align-items-center mb-5">
            <div className="col-lg-6 order-2 order-lg-1">
              <i className="fa fa-leaf fa-2x  text-danger"></i>
              <h2 className="font-weight-light">Teacher Evaulation Website</h2>
              <p className="font-italic text-muted mb-4">
                This is a website for the Evaulation of teachers for Universitry
                Of engineering and technology mardan
              </p>
            </div>
            <div className="col-lg-5 px-5 mx-auto order-1 order-lg-2">
              <img
                src="https://res.cloudinary.com/mhmd/image/upload/v1556834139/img-1_e25nvh.jpg"
                alt=""
                className="img-fluid mb-4 mb-lg-0"
              />
            </div>
          </div>
          <div className="row align-items-center">
            <div className="col-lg-5 px-5 mx-auto">
              <img
                src="https://res.cloudinary.com/mhmd/image/upload/v1556834136/img-2_vdgqgn.jpg"
                alt=""
                className="img-fluid mb-4 mb-lg-0"
              />
            </div>
            <div className="col-lg-6">
              <i className="fa fa-leaf fa-2x  text-primary"></i>
              <h2 className="font-weight-light">
                Accurate, Responsive and Clear Results 24/7
              </h2>
              <p className="font-italic text-muted mb-4">
                Our website is Extremly Fast and Responsive to each and every
                end, Due to React It is very efficient
              </p>
            </div>
          </div>
        </div>
        <div className="text-center ">
          <h1>
            <i className="fa fa-leaf fa-2x  text-danger"></i>
            Our team
            <i className="fa fa-leaf fa-2x  text-warning"></i>
          </h1>
          <MDBRow className="d-flex justify-content-center">
            <About cardtitle="Hussnain" pic={hussnain} />
            <About cardtitle="Usman" pic={usman} />
          </MDBRow>
        </div>
      </Navbarr>
    );
  }
}
