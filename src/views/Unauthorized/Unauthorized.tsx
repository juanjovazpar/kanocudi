import React from "react";
import { Outlet } from "react-router-dom";

function Unauthorized() {
  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default Unauthorized;
