import React from "react";
import {
  MDBNavbar,
  MDBNavbarNav,
  MDBNavLink,
  MDBBtn,
  MDBNavItem
} from "mdbreact";
import { Link } from "react-router-dom";
const deflist = {
  navitems: [
    {
      linkto: "./About",
      btnname: "About",
      iconclass: "fas fa-info-circle p-1"
    },
    {
      linkto: "./takeaction",
      btnname: "Take Action",
      iconclass: "fas fa-running p-1"
    },
    { linkto: "./blog", btnname: "Blog", iconclass: "fas fa-blog p-1" },
    {
      linkto: "./donate",
      btnname: "Donate",
      iconclass: "fas fa-donate p-1"
    }
  ]
};
function Navbarr(props) {
  const navitemsdisplay = deflist.navitems.map((v, i) => {
    return (
      <MDBNavItem key={i}>
        <Link to={v.linkto}>
          <button className="btn rounded btn-outline-dark hoverable">
            <i className={v.iconclass}></i>
            {v.btnname}
          </button>
        </Link>
      </MDBNavItem>
    );
  });

  let extrathing = props.extrafeature;
  return (
    <React.Fragment>
      <MDBNavbar
        className="navbar navbar-expand-lg d-flex hoverable 
				heavy-rain-gradient sticky-top"
        color="bg-transparent"
        expand="sm"
      >
        <MDBNavbarNav left>
          <MDBNavLink to="./">
            <MDBBtn className="btn rounded-pill peach-gradient">
              <i className="fas fa-home p-1">Home</i>
            </MDBBtn>
          </MDBNavLink>
        </MDBNavbarNav>
        <MDBBtn
          className="navbar-toggler btn btn-outline-black hoberable"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNavAltMarkup"
          aria-controls="navbarNavAltMarkup"
        >
          <i className="fas fa-bars"></i>
        </MDBBtn>
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <MDBNavbarNav right>
            {navitemsdisplay}
            {extrathing}
          </MDBNavbarNav>
        </div>
      </MDBNavbar>
      {props.children}
    </React.Fragment>
  );
}

export default Navbarr;
