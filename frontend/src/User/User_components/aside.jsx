/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import { useState } from "react";
import Navlink from "./Link";
import { TiTimes } from "react-icons/ti";
import {  MenuIcon } from "lucide-react";
import { HiViewGrid } from "react-icons/hi";
import { PiClockDuotone, PiEnvelopeDuotone, PiImagesDuotone, PiStorefrontDuotone, PiUsersDuotone } from "react-icons/pi";
import { BiCog } from "react-icons/bi";
import { FiLink2 } from "react-icons/fi";
export default function AsideBar({ className }) {
  const [Mode, setMode] = useState("close");
  return (
    <>
      <div
        className={`backdrop ${Mode}`}
        onClick={(e) => {
          Mode == "open" ? setMode("close") : setMode("open");
        }}
      ></div>
      <button
        onClick={(_e) => {
          Mode == "open" ? setMode("close") : setMode("open");
        }}
        className={` hidden ${Mode} btn w-12 h-12 asidebtn `}
      >
        {Mode == "open" ? <TiTimes /> : <MenuIcon />}
      </button>
      <aside
        className={`asidebar  p-2 ${Mode} fixed ${className} overflow-auto overflow-x-hidden`} 
      >
        <div className={` w-[274px] `}>
          <div className="brad-name  fixed border-b-2 border-primary  rounded-t-xl w-[inherit] py-5 bg-base-100 text-white bg-opacity-85 p-4 ">
            <a href="/">
              <h4 className="brand-name   text-start font-bold  text-primary">
                OpenScale
              </h4>
            </a> 
          </div>
        </div>
        <nav className="nav-link overflow-y-auto flex flex-col px-2 pt-24 bg-base-100 h-[calc(100vh-5vh)] rounded-xl shadow-xl">
          <ul className="nav  ms-0 justify-content-center">
            <Navlink.Link
              link={"/"} 
              icon={<HiViewGrid className="navicon" />}
              title={"Dashboard"}
              active={true}
            />
            <Navlink.Link
              link={"/Create"}
              icon={<PiEnvelopeDuotone className="navicon" />}
              title={"Create Greeting"} 
              active={true}
            />
             <Navlink.Link
              link={"/template"}
              icon={<PiImagesDuotone className="navicon" />}
              title={"Template Gallery"}
              active={true}
            />
            <Navlink.Link
              link={"/automation"}
              icon={<PiClockDuotone className="navicon" />}
              title={"Automated Greetings"}
              active={true}
            />
             
            <Navlink.Link
              link={"/setting"}
              icon={<BiCog className="navicon" />}
              title={"Settings"}
              active={true}
            />
          </ul>
        </nav>
      </aside>
    </>
  );
}
