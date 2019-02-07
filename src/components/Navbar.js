import React from "react";
import { Link } from "react-router-dom"

import "./styles/Navbar.css"

const Navbar = () => {
  return (
    <div className="ui stackable menu" style={{backgroundColor: "#05A89E"}}>
      <div className="item">
        <Link to="/dashboard"><h1>TaskMaster</h1></Link>
      </div>
    </div>
  )
}

export default Navbar;
