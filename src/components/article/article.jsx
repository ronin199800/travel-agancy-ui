import React, { Component } from "react";
import { digitsEnToFa } from "@persian-tools/persian-tools";
import appContext from "../../context/app";
import { Link } from "react-router-dom";
import moment from "jalali-moment";
import LazyLoad from "react-lazyload";


class Article extends Component {
  static contextType = appContext;
  render() {
    return (
      <div
        className={`article theme-box-${this.context.mode} theme-text-${this.context.mode}`}
      >
        <div className="img-container">
          <LazyLoad>
            <img src={this.props.article.img_url} alt="" />
          </LazyLoad>

        </div>
        <div className="text-container">
          <div className="article-header">
            <h2>{this.props.article.name}</h2>
            <div className="article-date">
              <span
                class={`material-symbols-rounded icon-${this.context.mode}`}
              >
                event
              </span>
              <span className={`text-mute-${this.context.mode} bold `}>
                {digitsEnToFa(
                  moment(this.props.article.updatedAt)
                    .locale("fa")
                    .format("YYYY/MM/DD")
                )}
              </span>
            </div>
          </div>
          <div className="truncate">
            <p>
              {this.context.convertNumbersToPersian(this.props.article.content)}
            </p>
          </div>
          <div className="article-cta">
            <div className="article-time">
              <span
                class={`material-symbols-rounded icon-${this.context.mode}`}
              >
                timelapse
              </span>
              <span className={`text-mute-${this.context.mode} bold`}>
                زمان مطالعه {digitsEnToFa(this.props.article.read_time)} دقیقه
              </span>
            </div>
            <div className={`article-btn theme-btn-${this.context.mode}`}>
              <Link
                className={`theme-btn-text-${this.context.mode}`}
                to={`/articles/${this.props.article._id}`}
              >
                مطالعه
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Article;
