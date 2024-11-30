import React from "react";

function SignUpPage() {
  const containerStyle = {
    marginTop: "150px",
    background: "var( --gradient-background)",
    padding: "30px",
    borderRadius: "10px",
    boxShadow: "1px 1px 10px rgba(0, 0, 0, 0.1)",
    textAlign: "center",
    display: "flex",
    flexDirection: "column",
    justigyContent: "center",
    alignItems: "center",
    width: "fit-content",
  };

  const inputStyle = {
    width: "280px",
    padding: "10px",
    borderRadius: "5px",
    margin: "15px 0",
    border: "none",
    boxShadow: "1px 1px 5px rgba(255, 255, 255, 0.5)",
  };

  const buttonStyle = {
    background: "blue",
    color: "white",
    width: "300px",
    padding: "10px",
    marginTop: "20px",
    border: "none",
    borderRadius: "5px",
    fontWeight: "bold",
    cursor: "pointer",
  };

  const linkStyle = {
    color: "blue",
    textDecoration: "none",
    marginTop: "15px",
  };

  return (
    <div className=" ">
      <h1 className="text-center text-5xl font-bold text-skin-light-text relative top-[50px]">.</h1>
      <div className="m-auto " style={containerStyle}>
        <h1 className=" text-xl font-semibold">
          create an Account on <br />
          <span className="spfont text-3xl "> Seasonal Wishes</span>
        </h1>
        <input
          type="text"
          className="placeholder-black"
          placeholder="Username"
          style={inputStyle}
        />
        <input
          type="email"
          placeholder="Email address"
          required
          className="placeholder-black"
          style={inputStyle}
        />
        <input
          type="password"
          className="placeholder-black"
          placeholder="Password"
          style={inputStyle}
        />
        <div>
          <button style={buttonStyle} className="">
            Sign Up
          </button>
          <div style={{ marginTop: "15px" }}>
            <span className="mr-2">Already have an account?</span>
            <a href="/login" style={linkStyle}>
              Login
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUpPage;
