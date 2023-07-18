import React, { Component } from "react";
import { Link } from "react-router-dom";
class Accordion extends Component {
  state = {
    isOpen: "open",
  };
  render() {
    return (
      <ul className="panel-accordion">
        <li>
          <span onClick={this.handleOpen} className="accordion-header">
            <div>
              <span className="material-symbols-rounded header-icon">
                contract_edit
              </span>
              <span>وبلاگ</span>
            </div>
            <span
              className={`material-symbols-rounded ${
                this.state.isOpen === 'open' ? " animate" : ""
              }`}
            >
              navigate_before
            </span>
          </span>
          <ul className={`is-${this.state.isOpen} accordion-body`}>
            <li>
              <Link to="/panel/articles">
                <span className="material-symbols-rounded">library_books</span>
                <span>مقالات</span>
              </Link>
            </li>
            <li>
              <Link to="/panel/articles">
                <span className="material-symbols-rounded">edit</span>
                <span>افزودن پست</span>
              </Link>
            </li>
            <li>
              {" "}
              <Link to="/panel/articles">
                <span className="material-symbols-rounded">category</span>
                <span>دسته بندی ها</span>
              </Link>
            </li>
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
