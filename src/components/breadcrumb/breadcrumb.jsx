import appContext from "../../context/app";
import { useContext } from "react";
import {  NavLink } from "react-router-dom";
import "./breadcrumb.css";
const Breadcrumb = () => {
  const context = useContext(appContext);
  return (
    <nav className={`breadcrumb-${context.mode} breadcrumb`}>
      <ul className={`${context.mode}`}>
        <li className={`breadcrumb-link-${context.mode}`}>
          < NavLink activeClassName={`active`} to="/">صفحه اصلی</ NavLink>
        </li>
        <li className={`breadcrumb-link-${context.mode}`}>
          < NavLink activeClassName={`active`} to="/articles">مقالات</ NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Breadcrumb;
