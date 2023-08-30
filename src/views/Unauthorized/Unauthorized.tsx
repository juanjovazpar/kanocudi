import React from "react";
import { Outlet } from "react-router-dom";

function Unauthorized() {
  return <Outlet />;
}

export default Unauthorized;
