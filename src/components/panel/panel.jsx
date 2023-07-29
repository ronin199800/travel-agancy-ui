import React, { Component } from "react";
import appContext from "../../context/app";
import "./panel.css";
class Panel extends Component {
  state = {};
  static contextType = appContext;
  render() {
    const { mode} = this.context;
    return (
<></>
    );
  }

}

export default Panel;
