import React, { Component } from "react";
import { MDBDataTable } from "mdbreact";
import axios from "axios";

export default class Tasks extends Component {
  constructor(props) {
    super(props);
  }

  deletefunction = async e => {
    await axios
      .post("http://localhost:5000/users/delete", {
        delid: e
      })
      .then(e => {
        window.location = "http://localhost:3000/dashboard";
        this.props.NotificationManager.success("Deleted", "Successful!", 2000);
      })
      .catch(e => {
        this.props.NotificationManager.error(
          "Something went wrong",
          "Error",
          2000
        );
        console.log(e);
      });
  };
  render() {
    let data = this.props.data;
    if (this.props.ismentor) {
      let row = this.props.data.rows.map(e => {
        return {
          ...e,
          delete: (
            <button
              onClick={() => {
                this.deletefunction(e._id);
              }}
              className="btn peach-gradient rounded-pill btn-sm"
            >
              Delete
            </button>
          )
        };
      });
      data = {
        columns: [
          ...this.props.data.columns,
          {
            label: "Delete",
            field: "delete",
            sort: "asc"
          }
        ],
        rows: [...row]
      };
    }
    return (
      <MDBDataTable
        className=" scrollbar-ripe-malinka scroll"
        striped
        bordered
        responsive
        hover
        data={data}
      />
    );
  }
}
