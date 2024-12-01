import React from "react";
import HomePage from "../pages/HomePage";
import SignUpPage from "../pages/auth/SignUpPage";
import { Link } from "react-router-dom";
// import Link from "next/link"




function Mainlayout() {
  return (
    <>
       <HomePage /> 
      {/* <div className="main ">
        <nav>Navbar Content</nav>
        <SignUpPage />
        <footer> Footer</footer>
      </div> */}

    </>
  );
}

export default Mainlayout;
