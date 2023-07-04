import appContext from "../../../context/app";
import { useContext } from "react";
import ArticleCategoryLoader from "./artCatLoader/articleCategoryLoader";
import { useState } from "react";
import "./articleCategory.css";
const ArticleCategory = ({ categories, OnCategory, isLoaded }) => {
  const context = useContext(appContext);
  const [activeCategory, setActiveCategory] = useState(null);
  return (
    <>
      {isLoaded ? (
        <ArticleCategoryLoader />
      ) : (
        <div
          className={`article-category theme-box-${context.mode} theme-text-${context.mode}`}
        >
          <div className="article-category-header">
            <span className={`bold badge-${context.mode} ${context.mode}`}>
              دسته بندی ها
            </span>
          </div>
          <ul>
            {categories.map((c) => {
              return (
                <li className={`flex border-b-${context.mode}`}>
                  <span class={`material-symbols-rounded icon-${context.mode}`}>
                    line_end_circle
                  </span>
                  <span className="each-category"
                    style={{
                      color:
                        activeCategory === c ? "#70a1ff" : " ",
                        cursor:'pointer'
                    }}
                    onClick={() => {
                      OnCategory(c);
                      setActiveCategory(c);
                    }}
                  >
                    {category(c)}
                  </span>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </>
  );
  function category(c) {
    if (c === "news") {
      return "اخبار گردشگری";
    } else if (c === "roles") {
      return "قوانین کشورها";
    } else if (c === "guide") {
      return "راهنمای گردشگری";
    } else if (c === "tourism") {
      return "جاذبه های  دیدنی";
    }
  }
};

export default ArticleCategory;
