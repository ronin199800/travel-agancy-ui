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
  };
  async componentDidMount() {
    this.fetchArticles();
    this.fetchCategories();
  }

  fetchArticles = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/article");
      setTimeout(() => {
        this.setState({ articles: response.data.data, isLoaded: false });
      }, 1200);
    } catch (error) {
      console.error(error);
    }
  };

  fetchCategories = async () => {
    try {

      const response = await axios.get(
        "http://localhost:5000/api/article/category"
      );
      this.setState({ categories: response.data.data});
    } catch (error) {
      console.error(error);
    }
  };

  render() {
    return (
      <>
        <div className="article-router-body">
          <Breadcrumb />
          <div className="article-body-container">
            <div style={{position:'relative'}}>
              <ArticleCategory
                categories={this.state.categories}
                OnCategory={this.handleFilter}
                isLoaded={this.state.isLoaded}
              />
              <CtaArticle />
            </div>
            <Articles
              articles={this.state.articles}
              isLoaded={this.state.isLoaded}
            />
          </div>
        </div>
      </>
    );
  }
  handleFilter = async (categoryId) => {
    try {
      this.setState({ isLoaded: true });
      const response = await axios.get(
        `http://localhost:5000/api/article/${categoryId}`
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
