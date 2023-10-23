import React from "react";
import Header from "./Header";
import NotFound from "./NotFound";
import Home from "../components/Home/index"

function Layout() {
  return (
    <main>
      <Header />
      <div className="container">
        <Home/>
      </div>
    </main>
  );
}

export default Layout;
