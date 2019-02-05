import React from "react";
import requireAuth from "../requireAuth";
import Navbar from "./Navbar";

const Dashboard = () => {
  return (
    <div>
      <Navbar />
    </div>
  )
};

export default requireAuth(Dashboard);
