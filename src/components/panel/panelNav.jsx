import React, { Component } from "react";
import ModeBtn from "../modeBtn/modeBtn";
import Accordion from "../utiliti/accordion";
import appContext from "../../context/app";
class PanelNav extends Component {
  state = {
  };
  static contextType = appContext;
  render() {
    return (
      <div
        className={`panel-nav panel-nav-${this.context.mode} ${
          this.context.isOpen==='open' ? "panel-nav-open" : "panel-nav-close"
        }`}
      >
        <ModeBtn />
        <button
          onClick={this.context.openClose}
        >
          ham
        </button>


        <Accordion />
      </div>
    );
  }
}

export default PanelNav;
