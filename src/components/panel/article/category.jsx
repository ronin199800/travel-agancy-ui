import React, { Component } from "react";
import appContext from "../../../context/app";
import { digitsEnToFa } from "@persian-tools/persian-tools";
import moment from "jalali-moment";
import axios from "axios";
import "./article.css";
import "./category.css";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

class PCategory extends Component {
  static contextType = appContext;
  state = {
    categories: [],
    currentPage: 1,
    totalPages: 0,
    isLoaded: false,
  };

  componentDidMount() {
    this.fetchArticleCat();
  }

  fetchArticleCat = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/article/category?page=${this.state.currentPage}`
      );
      const totalPages = response.data.totalPages || 0;
      console.log(this.response);

      setTimeout(() => {
        this.setState({
          categories: response.data.data,
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
        this.fetchArticleCat
      );
    }
  };

  previousPage = () => {
    const { currentPage } = this.state;
    if (currentPage > 1) {
      this.setState(
        { currentPage: currentPage - 1, isLoaded: false },
        this.fetchArticleCat
      );
    }
  };
  handleDelete = async (category) => {
    const confirmation = window.confirm(
      "Are you sure you want to delete this article category?"
    );

    if (confirmation) {
      try {
        this.setState({ isLoaded: false });
        const response = await axios.delete(
          `http://localhost:5000/api/article/category/${category._id}`
        );
        // Remove the deleted article from the list of articles
        const updatedCat = this.state.categories.filter(
          (item) => item._id !== category._id
        );

        setTimeout(() => {
          this.setState({ categories: updatedCat, isLoaded: true });
        },500);
      } catch (error) {
        console.error(error);
      }
    }
  };

  render() {
    const { categories, currentPage, totalPages } = this.state;
    const disablePrevious = currentPage === 1;
    const disableNext = categories.length < 12;

    return (
      <div className="panel-body">
        <div
          className={`panel-article-container panel-article-container-${this.context.mode}`}
        >
          <ul
            className={`theme-box-${this.context.mode} theme-text-${this.context.mode} panel-article-list-container`}
          >
            <div className="list-header">
              <span>نام فارسی</span>
              <span>نام انگلیسی</span>
              <span>بروزرسانی</span>
              <span>ویرایش</span>
              <span>حذف</span>
            </div>
            {this.state.isLoaded
              ? categories.map((category) => (
                  <li key={categories.id}>
                    <div className="name">
                      <span>{category.name_fa}</span>
                    </div>
                    <div className="cat name_en">
                      <span>{category.name_en}</span>
                    </div>
                    <div className={`date`}>
                      <span>
                        {digitsEnToFa(
                          moment(category.updatedAt)
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
                      <button className="delete-btn">
                        <span onClick={()=>{
                          this.handleDelete(category)
                        }} className={`material-symbols-rounded`}>
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

export default PCategory;
