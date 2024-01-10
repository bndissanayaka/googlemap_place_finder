import React from "react";
import "../../components/styles/frontPage.css";
import { Link } from "react-router-dom";

function FrontPage() {
  return (
    <div className="lv-frontpg-wrapper">
      <div className="lv-frontpg-content">
        Your sophisticated google maps place finder
      </div>
      <Link to="/landingPage">
        <div className="lv-frontpg-link">Search your address</div>
      </Link>
    </div>
  );
}

export default FrontPage;
