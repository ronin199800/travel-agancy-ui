import React, { Component } from "react";
import appContext from "../../../context/app";
import { digitsEnToFa } from "@persian-tools/persian-tools";
import moment from "jalali-moment";
import axios from "axios";
import "./article.css";
class PArticle extends Component {
  static contextType = appContext;
  state = {
    articles: [],
  };
  componentDidMount() {
    this.fetchArticles();
  }
  fetchArticles = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/article");
      this.setState({ articles: response.data.data });
    } catch (error) {
      console.error(error);
    }
  };

  render() {
    return (
      <div className="panel-article-container">
        <ul
          className={`theme-box-${this.context.mode} theme-text-${this.context.mode} panel-article-list-container`}
        >
          <div className="list-header">
            <span>نام مقاله</span>
            <span>دسته بندی</span>
            <span>بروزرسانی</span>
            <span>حذف</span>
            <span>ویرایش</span>
          </div>
          {this.state.articles.map((article) => {
            return (
              <li>
                <div>
                  <span>{article.name}</span>
                </div>
                <div>
                  {" "}
                  <span>{this.category(article.category)}</span>
                </div>
                <div>
                  {" "}
                  <span>
                    {digitsEnToFa(
                      moment(article.updatedAt)
                        .locale("fa")
                        .format("YYYY/MM/DD")
                    )}
                  </span>
                </div>
                <div>
                  <button className=" delete-btn">
                    <span class={`material-symbols-rounded`}>
                      delete_forever
                    </span>
                  </button>
                </div>
                <div>
                  <button className=" edit-btn">
                    <span class={`material-symbols-rounded`}>edit</span>
                  </button>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
  category = (c) => {
    if (c === "news") {
      return "اخبار گردشگری";
    } else if (c === "roles") {
      return "قوانین کشورها";
    } else if (c === "guide") {
      return "راهنمای گردشگری";
    } else if (c === "tourism") {
      return "جاذبه های  دیدنی";
    }
  };
}

export default PArticle;
