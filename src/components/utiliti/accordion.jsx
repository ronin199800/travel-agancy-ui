import React, { Component } from "react";
import { Link } from "react-router-dom";
class Accordion extends Component {
  state = {
    isOpen: "close",
  };
  render() {
    return (
      <ul className="panel-accordion">
        <li>
          <span onClick={this.handleOpen}>وبلاگ</span>
          <ul className={`is-${this.state.isOpen}`}>
            <li>مقالات</li>
            <li> افزودن مقاله</li>
            <li>دسته بندی ها</li>
            <li>افزودن دسته بندی</li>
          </ul>
        </li>
      </ul>
    );
  }
  handleOpen = () => {
    if (this.state.isOpen === "close") {
      this.setState({ isOpen: "open" });
    }
    if (this.state.isOpen === "open") {
      this.setState({ isOpen: "close" });
    }
  };
}

export default Accordion;
