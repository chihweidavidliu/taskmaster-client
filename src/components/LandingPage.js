import React from "react";
import { Link } from "react-router-dom";

import "./styles/LandingPage.css";

const LandingPage = () => {
  return (
    <div className="landingPage">
      <div className="navbar">
        <div className="item">
          <Link to="/" className="logo">
            <h1>TaskMaster</h1>
          </Link>
        </div>
        <a href="/auth/google">
          <i class="google icon" /> Sign-in with Google
        </a>
      </div>
      <div className="ui stackable center aligned two column grid">
        <div className="column">
          <div className="message">
            <h3>Master your day, simplify your life</h3>
            <ul>
              <li>
                <i className="small list ul icon" /> a <span className="beautiful">beautiful</span>, minimalistic todo
                app
              </li>
              <li>
                <i className="small folder outline icon" /> organise todos by project and label
              </li>
              <li>
                <i className="small cloud icon" /> cloud storage for easy access
              </li>
              <li>
                <i className="small google icon" /> secure login with Google
              </li>
            </ul>
          </div>
        </div>
        <div className="column">
          <div className="interface-screenshot" />
        </div>
      </div>
      <div className="bottom-wave">
        <h4>David Liu 2019</h4>
        <h4>example@provider.com</h4>
        <h4>
          <a href="https://github.com/qwertyuiop1993">https://github.com/qwertyuiop1993</a>
        </h4>
      </div>
    </div>
  );
};

export default LandingPage;
