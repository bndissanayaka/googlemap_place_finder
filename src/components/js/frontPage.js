import React, { useEffect, useState } from "react";
import "../../components/styles/frontPage.css";
import { Link } from "react-router-dom";

function FrontPage() {
  const [onLoad, setOnLoad] = useState(false);
  function onImageLoaded(url) {
    const img = new Image();
    img.src = url;
    img.onload = function () {
      setTimeout(() => {
        setOnLoad(true);
      }, "5000");
    };
  }
  useEffect(() => {
    onImageLoaded("./background.jpg");
  }, []);

  return (
    <>
      {onLoad ? (
        <div className="lv-frontpg-wrapper">
          <div className="lv-frontpg-content">
            Your sophisticated google maps place finder
          </div>
          <Link to="/landingPage">
            <div className="lv-frontpg-link">Search your address</div>
          </Link>
        </div>
      ) : (
        <div className="lv-loading-img">
          <img src="./marker.svg" alt="logo" className="lv-loading-marker" />
          <p className="lv-frontpg-waitMsg"> Please wait...</p>
        </div>
      )}
    </>
  );
}

export default FrontPage;
