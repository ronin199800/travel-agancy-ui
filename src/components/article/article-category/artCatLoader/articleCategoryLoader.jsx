import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import { useContext } from "react";
import "react-loading-skeleton/dist/skeleton.css";
import appContext from "../../../../context/app";

const ArticleCategoryLoader = () => {
  const context = useContext(appContext);
  return isMode(context);

  function isMode(context) {
    if (context.mode === "dark") {
      return (
        <SkeletonTheme baseColor="#2f3542" highlightColor="#57606f">
          <div
            className={`article-category-loader theme-box-${context.mode} theme-text-${context.mode}`}
          >
            <Skeleton style={{ marginBottom: ".5rem" }} height={30} count={3} />
          </div>
        </SkeletonTheme>
      );
    } else if (context.mode === "light") {
      return (
        <SkeletonTheme  baseColor="#ced6e0" highlightColor="#ffffff">
          <div
            className={`article-category-loader theme-box-${context.mode} theme-text-${context.mode}`}
          >
            <Skeleton style={{ marginBottom: ".5rem" }} height={30} count={3} />
          </div>
        </SkeletonTheme>
      );
    }
  }
};

export default ArticleCategoryLoader;
