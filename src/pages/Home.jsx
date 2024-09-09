// import React from 'react'
import "../css/home.css";
import myImg from "../assets/myImage.jpg";
import SideNav from "../components/SideNav";
import { useEffect, useState } from "react";
import AllProjects from "../components/AllProjects";
import AllFSP from "../components/AllFSP";
import FrontEnd from "../components/FrontEnd";
function Home() {
  let [projView, setProjectView] = useState({
    all: true,
    frontEnd: false,
    fullstack: false,
  });

  let handleCloseSideBar = () => {
    let sideNav = document.getElementById("sideNav");
    let slideBtn = document.getElementById("slideBtn");

    if (sideNav.classList.contains("animate")) {
      slideBtn.classList.remove("bg-red-500");
      sideNav.classList.remove("animate");
      sideNav.classList.toggle("CloseAnimate");
      slideBtn.innerHTML = `<i class="fa-solid fa-bars text-xl text-white font-bold shadow-lg "></i>`;
    }
  };

  let handleUp = () => {
    let home = document.getElementById("home-section");
    if (home) home.scrollIntoView({ behavior: "smooth" });
  };

  let handleProjectView = (e) => {
    setProjectView(() => {
      return {
        all: false,
        frontEnd: false,
        fullstack: false,
        [e.target.id]: true,
      };
    });
  };

  useEffect(() => {
    const sections = document.querySelectorAll("section");
    const navLinks = document.querySelectorAll("#navItems a");
    const initAnimate = document.querySelectorAll(".initAnimate");
    const skillBars = document.getElementById("skillBars");

    const observerOptions = {
      root: null, // Uses the viewport as the root
      threshold: 0.3, // Trigger when 20% of the section is visible
    };

    const initAnimObserverOptions = {
      root: null, // Uses the viewport as the root
      threshold: 1, // Trigger when 20% of the section is visible
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          let sectionId = entry.target.id;

          if (sectionId === "home-section")
            document.getElementById("upBtn").classList.add("hidden");
          else document.getElementById("upBtn").classList.remove("hidden");

          // Remove 'active' class from all links
          navLinks.forEach((link) => {
            link.classList.remove("active");
            // Add 'active' class to the link corresponding to the visible section
            if (link.getAttribute("href").includes(sectionId)) {
              link.classList.add("active");
            }
          });
        }
      });
    }, observerOptions);

    const initAnimObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("applyInitAnimat");
        }
      });
    }, initAnimObserverOptions);

    const skillBarObserver = new IntersectionObserver((entry) => {
      entry.forEach((entry) => {
        if (entry.isIntersecting) {
          let skillbars = document.querySelectorAll(".eachSkillBar");
          skillbars.forEach((skillBar) =>
            skillBar.classList.add("skillAnimation")
          );
        }
      });
    }, observerOptions);

    sections.forEach((section) => observer.observe(section));

    initAnimate.forEach((i) => initAnimObserver.observe(i));

    if (skillBars) skillBarObserver.observe(skillBars);

    return () => {
      observer.disconnect();
      initAnimObserver.disconnect();
      skillBarObserver.disconnect();
    };
  }, []);

  return (
    <>
      <SideNav />

      <div
        onClick={handleCloseSideBar}
        className="absolute flex flex-col min-w-screen  justify-end top-0 left-0 md:left-[20.5rem] xl:right-0  -z-10"
      >
        <section id="home-section" className=" w-full">
          <img
            src={myImg}
            className="!sticky top-0 left-0 w-full h-screen md:w-full object-cover rounded-2xl p-2"
            alt=""
          />

          <div className="absolute top-0 flex flex-col justify-center items-center w-[98.7%] m-2  h-[100vh] bg-slate-100 opacity-50 rounded-t-2xl p-2"></div>
          <div className="absolute top-0 flex flex-col justify-center items-center w-[98.7%] m-2  h-[100vh] rounded-t-2xl p-2 mt-[15rem] ">
            <div className="bg-white p-2 rounded-xl">
              <h1 className="font-bold text-4xl sm:text-5xl text-blue-500">
                Mohammed Abubakar
              </h1>
              <h1 className="text-center text-sm sm:text-xl font-bold text-orange-500 md:text-2xl">
                Aspirant Software Developer
              </h1>
            </div>
          </div>
        </section>
        <section
          id="about-section"
          className="z-10 flex flex-col bg-blue-50 min-h-screen mx-2 px-3 sm:px-10 pt-5 sm:pt-10"
        >
          <h1 className="text-3xl font-bold mr-auto text-blue-600 flex flex-col">
            <div>About Me</div>{" "}
            <div className="w-[40%] h-1 bg-orange-500 mt-2"></div>
          </h1>
          <h1 className="mt-5 text-lg text-left font-sans">
            Hello! <span className=" font-bold">I'm Mohammed Abubakar</span>,
            currently in my <span className=" font-bold">fourth year</span>
            &nbsp; pursuing a Bachelor of Engineering degree in Information
            Science and Engineering <span className=" font-bold">(ISE)</span>.
            I’m passionate about &nbsp;
            <span className=" font-bold">
              Problem Solving using Data Structures and Algorithms (DSA) and
              Full Stack Web Development
            </span>
            .
            <br />{" "}
            <div className="mt-3">
              My journey in tech has been driven by a love for creating
              efficient, user-friendly web applications and solving complex
              problems through the strategic use of algorithms and data
              structures. As I continue to learn and grow, I’m excited to
              contribute to projects that make a meaningful impact.
            </div>
          </h1>
          {/* //facts */}
          <div className="mr-auto text-lg text-left font-sans">
            <h1 className="text-3xl font-bold text-blue-600 w-fit mt-6 mb-3 flex flex-col">
              <div>Facts</div>
              <div className="w-[40%] h-1 bg-orange-500 mt-2"></div>
            </h1>

            <div>
              I have successfully completed{" "}
              <span className="font-bold"> 5+ projects</span>, including{" "}
              <span className="font-bold">
                two major full-stack applications
              </span>{" "}
              and{" "}
              <span className="font-bold">
                three smaller frontend-focused projects.
              </span>{" "}
              Each of these endeavors has allowed me to effectively demonstrate
              and showcase my skills in web development. <br />
              <div className="mt-2">
                Currently, I am focusing on enhancing my problem-solving
                abilities using data structures and algorithms.
              </div>
            </div>
          </div>
          <h1 className="text-3xl font-bold mr-auto text-blue-600 mt-6 flex flex-col">
            <div>Skills </div>
            <div className="w-[40%] h-1 bg-orange-500 mt-2"></div>
          </h1>
          <div className="flex justify-center items-center flex-wrap gap-y-10 mt-3">
            <img
              className="w-[100px] lg:w-[14%] initAnimate"
              src="https://dme2wmiz2suov.cloudfront.net/User(90588750)/CourseBundles(42560)/2946480-Java-Logo.png"
              alt=""
            />
            <img
              className="w-[150px] lg:w-[19%] initAnimate"
              src="https://media.licdn.com/dms/image/D4E12AQFfe1nZbaWdMw/article-cover_image-shrink_720_1280/0/1698604163003?e=2147483647&v=beta&t=rtD52hfy37nFVmc4_MXfnflV6C-ke773W70SYJLoWRc"
              alt=""
            />
            <img
              className="w-[100px] lg:w-[10%] initAnimate"
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/61/HTML5_logo_and_wordmark.svg/640px-HTML5_logo_and_wordmark.svg.png"
              alt=""
            />
            <img
              className="w-[155px] lg:w-[17%] initAnimate"
              src="https://dwglogo.com/wp-content/uploads/2017/03/AngularJS_logo_004.svg"
              alt=""
            />
            <img
              className="w-[160px] lg:w-[17%] mb-10 initAnimate"
              src="https://studio3t.com/wp-content/uploads/2020/09/introduction-to-mongodb-1024x278.png"
              alt=""
            />
          </div>
          <div className="flex justify-center gap-8 items-center flex-wrap mt-4 gap-y-10">
            <img
              className="w-[70px] lg:w-[9%] initAnimate"
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d5/CSS3_logo_and_wordmark.svg/1200px-CSS3_logo_and_wordmark.svg.png"
              alt=""
            />
            <img
              className="w-[100px] lg:w-[15%] initAnimate"
              src="https://miro.medium.com/v2/resize:fit:900/1*TY9uBBO9leUbRtlXmQBiug.png"
              alt=""
            />
            <img
              className="w-[150px] lg:w-[16%] initAnimate"
              src="https://cdn.icon-icons.com/icons2/2699/PNG/512/reactjs_logo_icon_170805.png"
              alt=""
            />
            <img
              className="w-[100px] lg:w-[15%] initAnimate"
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/db/Npm-logo.svg/540px-Npm-logo.svg.png"
              alt=""
            />
          </div>
          <div
            id="skillBars"
            className="flex flex-wrap justify-evenly items-center w-full mr-auto sm:p-1 gap-y-3 mt-8"
          >
            <div className="flex flex-col w-[48%] sm:w-[40%]">
              <div className="flex justify-between w-full text-sm">
                <div className="mr-auto text-orange-500 font-bold">Java</div>{" "}
                <div className="text-orange-500 font-extrabold">80%</div>
              </div>
              <div className="container w-full h-[0.4rem] bg-slate-300 rounded-full ">
                <div id="javaSkill" className=" w-[80%] h-full">
                  <div className="bg-blue-600 w-full h-full rounded-full eachSkillBar"></div>
                </div>
              </div>
            </div>

            <div className="flex flex-col w-[48%] sm:w-[40%]">
              <div className="flex justify-between w-full text-sm">
                <div className="mr-auto text-orange-500 font-bold text-md">
                  JavaScript
                </div>{" "}
                <div className="text-orange-500 font-extrabold">90%</div>
              </div>
              <div className="container w-full h-[0.4rem] bg-slate-300 rounded-full">
                <div id="javaSkill" className=" w-[90%] h-full  ">
                  <div className="bg-blue-600 w-full h-full rounded-full eachSkillBar"></div>
                </div>
              </div>
            </div>

            <div className="flex flex-col w-[48%] sm:w-[40%]">
              <div className="flex justify-between w-full text-sm">
                <div className="mr-auto text-orange-500 font-bold text-md">
                  HTML
                </div>{" "}
                <div className="text-orange-500 font-extrabold">95%</div>
              </div>
              <div className="container w-full h-[0.4rem] bg-slate-300 rounded-full">
                <div id="javaSkill" className=" w-[95%] h-full  ">
                  <div className="bg-blue-600 w-full h-full rounded-full eachSkillBar"></div>
                </div>
              </div>
            </div>

            <div className="flex flex-col w-[48%] sm:w-[40%]">
              <div className="flex justify-between w-full text-sm">
                <div className="mr-auto text-orange-500 font-bold text-md">
                  AngularJS
                </div>{" "}
                <div className="text-orange-500 font-extrabold">75%</div>
              </div>
              <div className="container w-full h-[0.4rem] bg-slate-300 rounded-full">
                <div id="javaSkill" className=" w-[75%] h-full  ">
                  <div className="bg-blue-600 w-full h-full rounded-full eachSkillBar"></div>
                </div>
              </div>
            </div>

            <div className="flex flex-col w-[48%] sm:w-[40%]">
              <div className="flex justify-between w-full text-sm">
                <div className="mr-auto text-orange-500 font-bold text-md">
                  MongoDB
                </div>{" "}
                <div className="text-orange-500 font-extrabold">80%</div>
              </div>
              <div className="container w-full h-[0.4rem] bg-slate-300 rounded-full">
                <div id="javaSkill" className=" w-[80%] h-full  ">
                  <div className="bg-blue-600 w-full h-full rounded-full eachSkillBar"></div>
                </div>
              </div>
            </div>

            <div className="flex flex-col w-[48%] sm:w-[40%]">
              <div className="flex justify-between w-full text-sm">
                <div className="mr-auto text-orange-500 font-bold text-md">
                  CSS
                </div>{" "}
                <div className="text-orange-500 font-extrabold">90%</div>
              </div>
              <div className="container w-full h-[0.4rem] bg-slate-300 rounded-full">
                <div id="javaSkill" className=" w-[90%] h-full  ">
                  <div className="bg-blue-600 w-full h-full rounded-full eachSkillBar"></div>
                </div>
              </div>
            </div>

            <div className="flex flex-col w-[48%] sm:w-[40%]">
              <div className="flex justify-between w-full text-sm">
                <div className="mr-auto text-orange-500 font-bold text-md">
                  NodeJS
                </div>{" "}
                <div className="text-orange-500 font-extrabold">80%</div>
              </div>
              <div className="container w-full h-[0.4rem] bg-slate-300 rounded-full">
                <div id="javaSkill" className=" w-[80%] h-full  ">
                  <div className="bg-blue-600 w-full h-full rounded-full eachSkillBar"></div>
                </div>
              </div>
            </div>

            <div className="flex flex-col w-[48%] sm:w-[40%]">
              <div className="flex justify-between w-full text-sm">
                <div className="mr-auto text-orange-500 font-bold text-md">
                  ReactJS
                </div>{" "}
                <div className="text-orange-500 font-extrabold">90%</div>
              </div>
              <div className="container w-full h-[0.4rem] bg-slate-300 rounded-full">
                <div id="javaSkill" className=" w-[90%] h-full  ">
                  <div className="bg-blue-600 w-full h-full rounded-full eachSkillBar"></div>
                </div>
              </div>
            </div>

            <div className="flex flex-col w-[48%] sm:w-[40%]">
              <div className="flex justify-between w-full text-sm">
                <div className="mr-auto text-orange-500 font-bold text-md">
                  NPM
                </div>{" "}
                <div className="text-orange-500 font-extrabold">90%</div>
              </div>
              <div className="container w-full h-[0.4rem] bg-slate-300 rounded-full">
                <div id="javaSkill" className=" w-[90%] h-full  ">
                  <div className="bg-blue-600 w-full h-full rounded-full eachSkillBar"></div>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-12 text-lg text-left font-sans">
            <div className="flex w-full justify-center items-start">
              <div>
                <span className="text-blue-600 font-bold">
                  Problem Solving with Data Structures And Algorithms:
                </span>{" "}
                I possess a strong ability to tackle complex problems by
                designing and implementing efficient algorithms and utilizing
                data structures effectively.
                <div className="mt-3">
                  My deep understanding of these fundamental concepts allows me
                  to optimize solutions for both time and space complexity,
                  ensuring that applications are not just functional but also
                  highly performant. This skill is the backbone of my approach
                  to coding challenges and real-world software development.
                </div>
              </div>
              <img
                className="w-[25%] h-[20%] rounded-full relative bottom-10 hidden xl:block"
                src="https://backend.vlinkinfo.com/uploads/banner_img_a77a042e54.png"
                alt=""
              />
            </div>
          </div>
          <div className="text-lg text-left font-sans mt-3">
            {" "}
            <span className="text-blue-600 font-bold text-lg  mr-auto">
              Full Stack Web Development (MERN Stack):
            </span>{" "}
            Proficient in building complete web applications using <br />
            <span className=" font-bold">
              MongoDB, Express.js, React.js, and Node.js
            </span>{" "}
            I excel in creating responsive, user-friendly interfaces with HTML,
            CSS, and JavaScript, while also developing robust backend systems
            and RESTful APIs. My experience spans both frontend and backend
            development, ensuring seamless integration and efficient performance
            across all layers of the stack.
          </div>{" "}
          <br />
          <br />
        </section>
        <section
          id="projects-section"
          className="z-10 flex flex-col bg-blue-100 min-h-screen max-w-full mx-2 px-3 sm:px-10 pt-5 sm:pt-10 font-sans text-lg"
        >
          <h1 className="text-3xl font-bold mr-auto text-blue-600 flex flex-col mb-3">
            <div> Projects </div>{" "}
            <div className="w-[40%] h-1 bg-orange-500 mt-2"></div>
          </h1>
          {/* projects theory */}
          <div className="container w-3/4 mx-auto min-h-8 bg-white rounded-lg flex justify-evenly font-bold">
            <p
              id="all"
              className={`hover:text-orange-600 cursor-pointer w-1/3 ${
                projView.all ? "text-orange-600" : ""
              }`}
              onClick={(e) => handleProjectView(e)}
            >
              All
            </p>
            <p
              id="fullstack"
              className={`hover:text-orange-600 cursor-pointer w-1/3 ${
                projView.fullstack ? "text-orange-600" : ""
              }`}
              onClick={(e) => handleProjectView(e)}
            >
              FullStack <span className="hidden sm:block">(MERN App)</span>
            </p>
            <p
              id="frontEnd"
              className={`hover:text-orange-600 cursor-pointer w-1/3 ${
                projView.frontEnd ? "text-orange-600" : ""
              }`}
              onClick={(e) => handleProjectView(e)}
            >
              FrontEnd{" "}
            </p>
          </div>

          <div className="container w-full h-[25.5rem] overflow-auto hideScrollBar bg-white rounded-lg mt-2">
            {projView.all ? <AllProjects /> : null}

            {projView.fullstack ? <AllFSP /> : null}
            {projView.frontEnd ? <FrontEnd /> : null}
          </div>
          <div className="text-left w-full mt-6 mb-6">
            <span className="font-bold text-blue-600 text-2xl">
              Full Stack Projects
            </span>
            <br />{" "}
            <div className="flex justify-start gap-x-8 lg:gap-x-12 text-justify items-center my-3 w-full">
              <div>
                <span className="text-orange-600 font-bold ">
                  ❖ Social Networking Site
                </span>{" "}
                <br />
                <span className="font-bold">• Technologies:</span> HTML, CSS,
                JavaScript, MongoDB, Node.js, Express.js, Socket.io <br />{" "}
                <span className="font-bold">• Functionalities:</span> &nbsp;User
                authentication: Login and Sign, Post creation with features for
                liking, commenting, and sharing. Real-time one-on-one and group
                chatting. Online/offline user status indication using Socket.io.
              </div>
              <div>
                <span className="text-orange-600 font-bold ">
                  ❖ Airbnb Clone
                </span>
                <br />
                <span className="font-bold"> • Technologies:</span> HTML, CSS,
                JavaScript, MongoDB, Node.js, Express.js <br />{" "}
                <span className="font-bold">• Functionalities:</span> User
                authentication: Login and Sign Up. Create, edit, and delete
                property listings. Integrated MapBox for displaying listing
                locations. Review system for each listing.
              </div>
            </div>
            <span className="font-bold text-blue-600 text-2xl">
              {" "}
              Front End Projects{" "}
            </span>
            <div className="flex justify-start items-center gap-x-6 lg:gap-x-12 mt-3">
              <div>
                <span className="text-orange-600 font-bold">
                  Spotify Website Clone
                </span>{" "}
                <br /> <span className="font-bold">Technologies:</span>&nbsp;
                HTML, CSS
              </div>
              <div>
                <span className="text-orange-600 font-bold">
                  Simple Calculator
                </span>{" "}
                <br /> <span className="font-bold">Technologies:</span>&nbsp;
                HTML, CSS,JS
              </div>
              <div className="mt-3">
                <span className="text-orange-600 font-bold">
                  Simon Say Game
                </span>{" "}
                <br /> <span className="font-bold">Technologies:</span>&nbsp;
                HTML, CSS,JS
              </div>
            </div>
          </div>
        </section>
        <section
          id="resume-section"
          className="z-10 flex flex-col bg-blue-50 min-h-screen max-w-full mx-2 px-2 sm:px-10 pt-5 sm:pt-10"
        >
          <h1 className="text-3xl font-bold mr-auto text-blue-600 ">Resume </h1>
        </section>

        <section
          id="services-section"
          className="z-10 flex flex-col bg-blue-100 max-w-full min-h-screen mx-2 px-2 sm:px-10 pt-5 sm:pt-10"
        >
          <h1 className="text-3xl font-bold mr-auto text-blue-600 ">
            Services{" "}
          </h1>
        </section>
        <section
          id="contact-section"
          className="z-10 flex flex-col bg-blue-50 min-h-screen max-w-full mx-2 px-2 sm:px-10 pt-5 sm:pt-10"
        >
          <h1 className="text-3xl font-bold mr-auto text-blue-600 ">
            Contact Me{" "}
          </h1>
        </section>
      </div>

      <div
        id="upBtn"
        className="fixed bottom-5 cursor-pointer right-5 p-2 bg-green-400 font-bold  hover:bg-black hover:text-white rounded-full"
        onClick={handleUp}
      >
        Up
      </div>
    </>
  );
}

export default Home;
