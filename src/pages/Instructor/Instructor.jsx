import React from "react";
import { Outlet } from "react-router-dom";

const Instructor = () => {
  return (
    <div>
      <h1 className="text-3xl">instructor home</h1>
      <div>
        <Outlet></Outlet>
      </div>
    </div>
  );
};

export default Instructor;
