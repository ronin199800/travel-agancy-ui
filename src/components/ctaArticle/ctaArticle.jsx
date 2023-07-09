import { useContext } from "react";
import appContext from "../../context/app";
import { useEffect, useState } from "react";
import "./ctaarticle.css";
import LazyLoad from "react-lazyload";
const CtaArticle = () => {
  const context = useContext(appContext);
  const [scrollPosition, setScrollPosition] = useState(0);
  useEffect(() => {
    const handleScroll = () => {
      const position = window.pageYOffset;
      setScrollPosition(position);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  const isFixed = scrollPosition > 200;
  return (
    <div
      className={` theme-box-${context.mode} theme-text-${
        context.mode
      } sidebar ${isFixed ? "fixed" : ""}`}
    >
      <div className={`cta-iamge-container-${context.mode}`}>
        <LazyLoad>
          <img
            src="https://s8.uupload.ir/files/sml_584260314-1501857542-travel-plane-large_3n3u.jpg"
            alt=""
          />
        </LazyLoad>
      </div>
      <div className="cta-test">
        <span>برای مشاوره و رزرو تور همین حالا با ما تماس گیرید !</span>
        <span
          style={{ display: "block", padding: ".3rem" }}
          className={`text-mute-${context.mode}`}
        >
          هم اکنون پاسخگوی شما هستیم
        </span>
      </div>
      <div className={`cta-btn-${context.mode}`}>
        <a role="button" href="#">
          مشاوره و رزرو تور
        </a>
      </div>
    </div>
  );
};

export default CtaArticle;
