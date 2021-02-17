import React from "react";

import Link from "components/Link/Link";

import './Logo.scss'

const Logo = ({url}) => {
  return (
    <div className="header-logo-main">
      <Link to={url} className={"header-logo-main-link"}>
        <span>Logo</span>
      </Link>
    </div>
  );
};

export default Logo;
