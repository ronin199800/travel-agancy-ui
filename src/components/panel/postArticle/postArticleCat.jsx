import React, { Component } from 'react';
import appContext from "../../../context/app";
import axios from "axios";

class PostArticleCat extends Component {
    static contextType = appContext;
    state = {
      category: {
        name_fa: "",
        name_en: "",

      },
    };
    handleSubmit = async (e) => {
      e.preventDefault();
      const response = await axios.post(
        "http://localhost:5000/api/article/category",
        this.state.category
      );
    };
    handleChange = (e) => {
      const input = e.currentTarget;
      const category = { ...this.state.category };
      category[input.name] = input.value;
      this.setState({ category });
    };
    render() {
      return (
        <form
          onSubmit={this.handleSubmit}
          className={`theme-text-${this.context.mode}`}
        >
          <div>
            <label htmlFor="name">نام فارسی</label>
            <input
              onChange={this.handleChange}
              value={this.state.category.name_fa}
              type="text"
              id="name_fa"
              name="name_fa"
            />
          </div>
          <div>
            <label htmlFor="content">نام انگلیسی</label>
            <input
              onChange={this.handleChange}
              value={this.state.category.name_en}
              type="text"
              id="name_en"
              name="name_en"
            />
          </div>
          <button> افزودن</button>
        </form>
      );
    }
}
 
export default PostArticleCat;