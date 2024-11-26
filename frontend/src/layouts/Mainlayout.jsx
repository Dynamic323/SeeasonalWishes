import React from "react";
import HomePage from "../pages/HomePage";
import SignUpPage from "../pages/auth/SignUpPage";

function Mainlayout() {
  return (
    <>
      <div className="main ">
        <nav>Navbar Content</nav>
        {/* <HomePage /> */}
        <SignUpPage />
        <footer> Footer</footer>
      </div>
    </>
  );
}

export default Mainlayout;
