import React, { Component } from "react";
import ModeBtn from "../modeBtn/modeBtn";
import Accordion from "../utiliti/accordion";
import appContext from "../../context/app";
class PanelNav extends Component {
  state = {};
  static contextType = appContext;
  render() {
    return (
      <div
        className={`panel-nav panel-nav-${this.context.mode}`}
      >
        <ModeBtn />

        <Accordion />
      </div>
    );
  }
}

export default PanelNav;
