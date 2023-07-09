import "./article.css";
import React, { Component } from "react";
import Article from "./article";
import axios from "axios";
import ArticleLoader from "./article card loader/articleLoader";

class Articles extends Component {
  state = {

  };


  render() {
    return (
      <>
        <div className="container transition">
          {this.props.isLoaded ? (
            <ArticleLoader />
          ) : (
            this.props.articles.map((article, index) => {
              return <Article key={index} article={article} />;
            })
          )}

        </div>
      </>
    );
  }
}

export default Articles;
