// import React from 'react'
import "../css/nav.css";

import myImgLogo from "../assets/myImgLogo.jpg";
import { Link } from "react-router-dom";

function SideNav() {
  // let navigate = useNavigate();

  let scrollIntoView = (sectionID) => {
    let section = document.getElementById(sectionID);
    if (section) section.scrollIntoView({ behavior: "smooth" });
  };

  let toggleSideNav = () => {
    let sideNav = document.getElementById("sideNav");
    let slideBtn = document.getElementById("slideBtn");

    if (sideNav.classList.contains("animate")) {
      slideBtn.classList.remove("bg-red-500");
      sideNav.classList.remove("animate");
      sideNav.classList.toggle("CloseAnimate");
      slideBtn.innerHTML = `<i class="fa-solid fa-bars text-xl text-white font-bold shadow-lg "></i>`;
    } else {
      sideNav.classList.remove("CloseAnimate");
      sideNav.classList.toggle("animate");
      slideBtn.classList.toggle("bg-red-500");
      slideBtn.innerHTML = `<i class="fa-solid fa-xmark text-xl text-white font-bold"></i>`;
    }
  };
  return (
    <>
      <div
        id="slideBtn"
        className="hover:cursor-pointer md:hidden w-fit h-fit p-1 px-2 rounded-full bg-blue-500 fixed right-5 top-4 flex justify-center items-center"
        onClick={toggleSideNav}
      >
        <i className="fa-solid fa-bars text-xl shadow-lg text-white font-bold"></i>
      </div>

      <div
        id="sideNav"
        className="fixed flex flex-col items-center -left-[17rem] h-screen md:left-0 w-[40vh] md:w-[42.5vh] 2xl:w-[45vh] bg-blue-100  my-2 rounded-r-lg "
      >
        <div className="w-full flex justify-center mt-3">
          <img
            src={myImgLogo}
            className="rounded-full w-[50%] p-[1px] shadow-xl bg-black"
            alt=""
          />
        </div>

        <div className="flex justify-center gap-3 mt-4 text-lg">
          <Link to={"https://discord.com/invite/Zjm4ckBxdK"}>
            <div
              id="discordBtn"
              className="rounded-full bg-black hover:bg-white hover:text-black text-white font-bold shadow-lg px-[5px] py-[2px]"
            >
              {" "}
              <i className="fa-brands fa-discord"></i>
            </div>
          </Link>
          <Link
            to={
              "https://www.linkedin.com/in/mohammed-abubakar-479754298?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"
            }
          >
            <div className="rounded-full hover:bg-white hover:text-black bg-black  text-white font-bold shadow-lg px-[6px] py-[2px]">
              <i className="fa-brands fa-linkedin"></i>
            </div>
          </Link>

          <Link to={"https://github.com/Mohammed-Abubakar-11786"}>
            <div className="rounded-full hover:bg-white hover:text-black bg-black  text-white font-bold shadow-lg px-[6px] py-[2px]">
              <i className="fa-brands fa-github"></i>
            </div>
          </Link>
        </div>

        <div
          id="navItems"
          className="container m-3 mx-auto mt-7 w-fit h-full flex flex-col  gap-2 items-start"
        >
          <Link
            to="#home-section"
            onClick={() => {
              toggleSideNav();
              scrollIntoView("home-section");
            }}
            className="flex justify-center items-center text-xl hover:cursor-pointer bg-white  rounded-xl shadow-sm gap-2 px-2 py-1 font-bold hover:bg-black hover:text-white"
          >
            <lord-icon
              src="https://cdn.lordicon.com/epietrpn.json"
              trigger="hover"
              className="w-[100px] h-[100px]"
            ></lord-icon>
            <p>Home</p>
          </Link>
          <Link
            to="#about-section"
            onClick={() => {
              toggleSideNav();
              scrollIntoView("about-section");
            }}
            className="flex justify-center items-center text-xl hover:cursor-pointer bg-white  rounded-xl shadow-sm gap-2 px-2 py-1 font-bold hover:bg-black hover:text-white"
          >
            <lord-icon
              src="https://cdn.lordicon.com/fmasbomy.json"
              trigger="hover"
              state="hover-nodding"
              className="w-[100px] h-[100px]"
            ></lord-icon>
            <p>About</p>
          </Link>

          <Link
            to="#projects-section"
            onClick={() => {
              toggleSideNav();
              scrollIntoView("projects-section");
            }}
            className="flex justify-center items-center text-xl hover:cursor-pointer bg-white  rounded-xl shadow-sm gap-2 px-2 py-1 font-bold hover:bg-black hover:text-white"
          >
            <lord-icon
              src="https://cdn.lordicon.com/pbihtexz.json"
              trigger="hover"
              colors="primary:#b4b4b4,secondary:#b26836,tertiary:#ffc738,quaternary:#ebe6ef"
            ></lord-icon>
            <p>Projects</p>
          </Link>

          <Link
            to="#resume-section"
            onClick={() => {
              toggleSideNav();
              scrollIntoView("resume-section");
            }}
            className="flex justify-center items-center text-xl hover:cursor-pointer bg-white  rounded-xl shadow-sm gap-2 px-2 py-1 font-bold hover:bg-black hover:text-white"
          >
            <lord-icon
              src="https://cdn.lordicon.com/ujxzdfjx.json"
              trigger="hover"
              className="w-[100px] h-[]"
            ></lord-icon>{" "}
            <p>Resume</p>
          </Link>
          <Link
            to="#services-section"
            onClick={() => {
              toggleSideNav();
              scrollIntoView("services-section");
            }}
            className="flex justify-center items-center text-xl hover:cursor-pointer bg-white  rounded-xl shadow-sm gap-2 px-2 py-1 font-bold hover:bg-black hover:text-white"
          >
            <lord-icon
              src="https://cdn.lordicon.com/okdadkfx.json"
              trigger="hover"
              colors="primary:#ffffff,secondary:#4bb3fd"
            ></lord-icon>
            <p>services</p>
          </Link>
          <Link
            to="#contact-section"
            onClick={() => {
              toggleSideNav();
              scrollIntoView("contact-section");
            }}
            className="flex justify-center items-center text-xl hover:cursor-pointer bg-white  rounded-xl shadow-sm gap-2 px-2 py-1 font-bold hover:bg-black hover:text-white"
          >
            <lord-icon
              src="https://cdn.lordicon.com/mhhpoybt.json"
              trigger="hover"
              colors="primary:#000000,secondary:#f9c9c0,tertiary:#ebe6ef"
            ></lord-icon>
            <p>Contact</p>
          </Link>
        </div>

        <div className="w-full h-24 rounded-b-lg relative shadow-md bottom-0 bg-white flex justify-center hover:cursor-pointer items-center text-lg font-bold">
          <p>&copy; Mohammed Abubakar</p>
        </div>
      </div>
    </>
  );
}
export default SideNav;
