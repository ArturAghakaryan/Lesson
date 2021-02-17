import React from "react";
import { useLocation } from "react-router-dom";

import Link from "components/Link/Link";

import "./Navigation.scss";

const Navigation = () => {
  const location = useLocation();

  return (
    <div className="main-navigation">
      <ul className="main-navigation-list">
        <li className="nav-item">
          <Link to="/" className={`nav-item-link ${location.pathname === '/' ? 'is-active': ''}`}>
            Home
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/posts" className={`nav-item-link ${location.pathname === '/posts' ? 'is-active': ''}`}>
            Posts
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/todos" className={`nav-item-link ${location.pathname === '/todos' ? 'is-active': ''}`}>
            Todos
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Navigation;
