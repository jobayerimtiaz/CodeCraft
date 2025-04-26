import React from "react";
import Navbar from "../../components/student/Navbar";
import { Outlet } from "react-router-dom";

const Home = () => {
  return (
    <div>
      <Navbar></Navbar>
      <h1>student home</h1>
      <Outlet></Outlet>
    </div>
  );
};

export default Home;
