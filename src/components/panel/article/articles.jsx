import React, { Component } from "react";
import appContext from "../../../context/app";
import { digitsEnToFa } from "@persian-tools/persian-tools";
import moment from "jalali-moment";
import axios from "axios";
import "./article.css";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import { Link } from "react-router-dom";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Snackbar,
  SnackbarContent,
} from "@material-ui/core";


class PArticle extends Component {
  static contextType = appContext;
  state = {
    articles: [],
    currentPage: 1,
    totalPages: 0,
    isLoaded: false,
  };

  componentDidMount() {
    this.fetchArticles();
  }

  fetchArticles = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/article?page=${this.state.currentPage}`
      );
      const totalPages = response.data.totalPages || 0;

      setTimeout(() => {
        this.setState({
          articles: response.data.data,
          totalPages,
          isLoaded: true,
        });
      }, 500);
    } catch (error) {
      console.error(error);
    }
  };

  nextPage = () => {
    const { currentPage, totalPages } = this.state;
    if (currentPage < totalPages) {
      this.setState(
        { currentPage: currentPage + 1, isLoaded: false },
        this.fetchArticles
      );
    }
  };

  previousPage = () => {
    const { currentPage } = this.state;
    if (currentPage > 1) {
      this.setState(
        { currentPage: currentPage - 1, isLoaded: false },
        this.fetchArticles
      );
    }
  };
  handleDelete = async (article) => {
    const confirmation = window.confirm(
      "Are you sure you want to delete this article?"
    );

    if (confirmation) {
      try {
        this.setState({ isLoaded: false });
        const response = await axios.delete(
          `http://localhost:5000/api/article/${article._id}`
        );
        // Remove the deleted article from the list of articles
        const updatedArticles = this.state.articles.filter(
          (item) => item._id !== article._id
        );

        setTimeout(() => {
          this.setState({ articles: updatedArticles, isLoaded: true });
        }, 500);
      } catch (error) {
        console.error(error);
      }
    }
  };

  render() {
    const { articles, currentPage, totalPages } = this.state;
    const disablePrevious = currentPage === 1;
    const disableNext = articles.length < 12;

    return (
      <div className="panel-body">
        <div
          className={`panel-article-container panel-article-container-${this.context.mode}`}
        >
 <div className="add-article-button">
            <Button
              style={{
                backgroundColor: this.context.mode === "dark" ? "rgba(255,255,255 ,.1)" : "rgba(255,255,255 ,.6)",
                color: this.context.mode === "dark" ? "#fff" : "#000",
                transition: "background-color 0.3s ease",
              }}
            >
              <Link to='/panel/articles/post' className="material-symbols-rounded">history_edu</Link>
              <Link to='/panel/articles/post' className="my-font" style={{fontSize:'.85rem',marginBottom:'2px'}}>مقاله جدید</Link>
            </Button>
          </div>
          <ul
            className={`theme-box-${this.context.mode} theme-text-${this.context.mode} panel-article-list-container`}
          >
            <div className="list-header">
              <span>نام مقاله</span>
              <span>دسته بندی</span>
              <span>بروزرسانی</span>
              <span>ویرایش</span>
              <span>حذف</span>
            </div>
            {this.state.isLoaded
              ? articles.map((article) => (
                  <li key={article.id}>
                    <div className="name">
                      <span>{article.name}</span>
                    </div>
                    <div className="cat">
                      <span>{article.category.name_fa}</span>
                    </div>
                    <div className={`date`}>
                      <span>
                        {digitsEnToFa(
                          moment(article.updatedAt)
                            .locale("fa")
                            .format("YYYY/MM/DD")
                        )}
                      </span>
                    </div>
                    <div className="edit">
                      <button className="edit-btn">
                        <span className={`material-symbols-rounded`}>edit</span>
                      </button>
                    </div>
                    <div className="delete">
                      <button
                        onClick={() => {
                          this.handleDelete(article);
                        }}
                        className="delete-btn"
                      >
                        <span className={`material-symbols-rounded`}>
                          delete_forever
                        </span>
                      </button>
                    </div>
                  </li>
                ))
              : Array(12)
                  .fill({})
                  .map(() => {
                    return (
                      <SkeletonTheme
                        baseColor={
                          this.context.mode === "dark" ? "#2f3542" : "#ced6e0"
                        }
                        highlightColor={
                          this.context.mode === "dark" ? "#57606f" : "#ffffff"
                        }
                      >
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-around",
                            margin: "1rem",
                          }}
                        >
                          <Skeleton width={250} />
                          <Skeleton width={80} />
                          <Skeleton width={80} />
                          <Skeleton width={60} />
                          <Skeleton width={60} />
                        </div>
                      </SkeletonTheme>
                    );
                  })}
          </ul>
          <div className="pagination">
            <span
              style={{
                color: `var(--text-mute-${this.context.mode})`,
              }}
            >
              {`${digitsEnToFa(currentPage)} از ${digitsEnToFa(totalPages)}`}{" "}
              صفحه
            </span>

            <div className="pagination-btn">
              <button onClick={this.previousPage} disabled={disablePrevious}>
                <span className="material-symbols-rounded">navigate_next</span>
              </button>
              <button onClick={this.nextPage} disabled={disableNext}>
                <span className="material-symbols-rounded">
                  navigate_before
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default PArticle;
