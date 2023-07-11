import React, { Component } from "react";
import Articles from "../components/article/articles";
import appContext from "../context/app";
import "./article.css";
import ArticleCategory from "../components/article/article-category/articleCategory";
import Breadcrumb from "../components/breadcrumb/breadcrumb";
import CtaArticle from "../components/ctaArticle/ctaArticle";
import axios from "axios";

class Article extends Component {
  static contextType = appContext;
  state = {
    articles: [],
    isLoaded: true,
    categories: [],
    currentPage: 1,
    articlesPerPage: 6,
  };
  async componentDidMount() {
    this.fetchArticles();
    this.fetchCategories();
  }

  fetchArticles = async () => {
    try {
      const { currentPage, articlesPerPage } = this.state;
      const response = await axios.get("http://localhost:5000/api/article", {
        params: {
          page: currentPage,
          limit: articlesPerPage,
        },
      });
      setTimeout(() => {
        this.setState({ articles: response.data.data, isLoaded: false });
      }, 1200);
    } catch (error) {
      console.error(error);
    }
  };
  handleNextPage = () => {
    const { currentPage } = this.state;
    this.setState({ currentPage: currentPage + 1 }, () => {
      this.fetchArticles();
    });
  };

  handlePreviousPage = () => {
    const { currentPage } = this.state;
    if (currentPage > 1) {
      this.setState({ currentPage: currentPage - 1 }, () => {
        this.fetchArticles();
      });
    }
  };

  fetchCategories = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/article/category"
      );
      this.setState({ categories: response.data.data });
    } catch (error) {
      console.error(error);
    }
  };

  render() {
    const { articles, isLoaded, categories, currentPage, articlesPerPage } =
      this.state;
    const totalArticles = articles.length;

    // Calculate the index of the last article on the current page
    const indexOfLastArticle = currentPage * articlesPerPage;

    // Calculate the index of the first article on the current page
    const indexOfFirstArticle = indexOfLastArticle - articlesPerPage;

    // Get the articles to be displayed on the current page
    const currentArticles = articles.slice(
      indexOfFirstArticle,
      indexOfLastArticle
    );
    return (
      <>
        <div className="article-router-body">
          <Breadcrumb />
          <div className="article-body-container">
            <div style={{ position: "relative" }}>
              <ArticleCategory
                categories={categories}
                OnCategory={this.handleFilter}
                isLoaded={isLoaded}
              />
              <CtaArticle />
            </div>
            <div>
              <Articles articles={currentArticles} isLoaded={isLoaded} />
            </div>
          </div>
          <div className="pagination-container">
            <div className={`pagination ${this.context.mode}`}>
              <button
                onClick={this.handlePreviousPage}
                disabled={currentPage === 1}
              >
                <span class={`material-symbols-rounded`}>navigate_next</span>
              </button>
              <button
                onClick={this.handleNextPage}
                disabled={indexOfLastArticle >= totalArticles}
              >
                <span class={`material-symbols-rounded`}>navigate_before</span>
              </button>
            </div>
          </div>
        </div>
      </>
    );
  }
  handleFilter = async (categoryId) => {
    try {
      this.setState({ isLoaded: true });
      const response = await axios.get(
        `http://localhost:5000/api/article/category/${categoryId}`
      );
      setTimeout(() => {
        this.setState({ articles: response.data.data, isLoaded: false });
      }, 1700);
    } catch (error) {
      console.error(error);
    }
  };
}

export default Article;
