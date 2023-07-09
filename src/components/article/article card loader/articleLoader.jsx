import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import appContext from "../../../context/app";
import { useContext } from "react";
import "./articleLoader.css";
const ArticleLoader = () => {
  const context = useContext(appContext);
  return isMode(context);
};
function isMode(context) {
  if (context.mode === "dark") {
    return (
      <>
        {Array(6)
          .fill({})
          .map(() => {
            return (
              <>
                <SkeletonTheme baseColor="#2f3542" highlightColor="#57606f">
                  <div
                    className={`article-loader-box theme-box-${context.mode} theme-text-${context.mode}`}
                  >
                    <div className="loader-img-container">
                      <Skeleton width={180} height={180} />
                    </div>
                    <div className="loader text">
                      <Skeleton
                        style={{ marginBottom: "1rem" }}
                        height={35}
                        width={200}
                      />
                      <Skeleton
                        style={{ marginBottom: ".3rem" }}
                        count={3}
                        width={390}
                        height={18}
                      />
                    </div>
                  </div>
                </SkeletonTheme>
              </>
            );
          })}
      </>
    );
  } else if (context.mode === "light") {
    return (
      <>
        {Array(6)
          .fill({})
          .map(() => {
            return (
              <>
                <SkeletonTheme baseColor="#ced6e0" highlightColor="#ffffff">
                  <div
                    className={`article-loader-box theme-box-${context.mode} theme-text-${context.mode}`}
                  >
                    <div className="loader-img-container">
                      <Skeleton width={180} height={180} />
                    </div>
                    <div className="loader text">
                      <Skeleton
                        style={{ marginBottom: "1rem" }}
                        height={35}
                        width={200}
                      />
                      <Skeleton
                        style={{ marginBottom: ".3rem" }}
                        count={3}
                        width={390}
                        height={18}
                      />
                    </div>
                  </div>
                </SkeletonTheme>
              </>
            );
          })}
      </>
    );
  }
}
export default ArticleLoader;
