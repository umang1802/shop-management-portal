import React from "react";
import Content from "./component/Content";

function AccessDenied() {
  return (
    <>
    <Content>Access Denied</Content>
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="text-2xl">You are not allowed to access this section</div>
    </div>
    </>
  );
}

export default AccessDenied;
