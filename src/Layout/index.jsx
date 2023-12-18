import React from "react";
import Header from "./Components/Header";
import Footer from "./Components/Footer";

const Layout = ({ children }) => {
  return (
    <div className="h-screen">
      <Header />
      <React.Fragment>{children}</React.Fragment>
      <Footer />
    </div>
  );
};

export default Layout;