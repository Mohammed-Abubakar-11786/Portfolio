// import React from 'react'
import "../css/home.css";
let myImg =
  "https://res.cloudinary.com/dqusuosoq/image/upload/v1726145583/Portfolio/MyImage_s4cedd.jpg";
import SideNav from "../components/SideNav";
import { useEffect, useState } from "react";
import AllProjects from "../components/AllProjects";
import AllFSP from "../components/AllFSP";
import FrontEnd from "../components/FrontEnd";
import { Link } from "react-router-dom";
import axios from "axios";
import { flashError, flashSuccess } from "../helper/flashMsgProvider";
import FlashMsg from "../components/FlashMsg";
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
      sideNav.classList.add("hidden");
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

  let certiViewToggler = () => {
    let certificateContainer = document.getElementById("certificate-Container");
    certificateContainer.classList.toggle("overflow-auto");
    certificateContainer.classList.toggle("overflow-hidden");
    let certiViewToggler = document.getElementById("certiViewToggler");
    if (certificateContainer.classList.contains("overflow-auto")) {
      certiViewToggler.innerText = "View Less";
      let lastCerti = document.getElementById("lastCerti");
      lastCerti.scrollIntoView({ behavior: "smooth", block: "nearest" });
    } else {
      certiViewToggler.innerText = "View All";
      let firstCert = document.getElementById("fastCeri");
      firstCert.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }
  };

  let [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  let [nameError, setNameError] = useState(false);
  let [emailError, setEmailError] = useState(false);
  let [msgError, setMsgError] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (formData.name) setNameError(false);
    if (formData.email) setEmailError(false);
    if (formData.message) setMsgError(false);
  };

  const contactForm = async (e) => {
    e.preventDefault();

    if (formData.name) setNameError(false);
    else setNameError(true);
    if (formData.email) setEmailError(false);
    else setEmailError(true);
    if (formData.message) setMsgError(false);
    else setMsgError(true);

    try {
      if (formData.name && formData.email && formData.message) {
        let url = `${import.meta.env.VITE_API_BACKEND_URL}/submitContactForm`;
        setIsLoading(true);
        let res = await axios.post(url, formData, {
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (res.data.success) {
          setIsLoading(false);
          flashSuccess(
            "Form submitted successfully! I will contact you very soon!"
          );
          setFormData({
            name: "",
            email: "",
            subject: "",
            message: "",
          });
        } else {
          setIsLoading(false);
          flashError(
            "There was an error submitting the form. Please try again later"
          );
        }
      } else {
        flashError("Fill the Required fields *");
      }
    } catch (err) {
      console.error("Error:", err);
      setIsLoading(false);
      flashError(
        "There was an error submitting the form. Please try again later"
      );
    }
  };

  useEffect(() => {
    const sections = document.querySelectorAll("section");
    const navLinks = document.querySelectorAll("#navItems a");
    const initAnimate = document.querySelectorAll(".initAnimate");
    const skillBars = document.getElementById("skillBars");
    const educationSection = document.getElementById("educationSection");

    const observerOptions = {
      root: null, // Uses the viewport as the root
      threshold: 0.3, // Trigger when 20% of the section is visible
    };

    const headingOption = {
      root: null, // Uses the viewport as the root
      threshold: 1, // Trigger when 100% of the section is visible
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

    const headingObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("headingAnimate");
        }
      });
    }, headingOption);

    const educationSecObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          let incHeights = document.querySelectorAll(".incHeight");
          incHeights.forEach((el) => {
            el.classList.add("increseHeightNow");
          });
        }
      });
    }, headingOption);

    const headings = document.querySelectorAll(".headingsToAnim");

    sections.forEach((section) => observer.observe(section));

    initAnimate.forEach((i) => initAnimObserver.observe(i));

    if (skillBars) skillBarObserver.observe(skillBars);
    educationSecObserver.observe(educationSection);

    headings.forEach((heading) => headingObserver.observe(heading));

    return () => {
      observer.disconnect();
      initAnimObserver.disconnect();
      skillBarObserver.disconnect();
      headingObserver.disconnect();
      educationSecObserver.disconnect();
    };
  }, []);

  return (
    <>
      <FlashMsg />
      {/* left part of home page  */}
      <div className="md:w-full h-full z-40">
        {" "}
        <SideNav />
      </div>
      {/* right part of home page  */}
      <div
        onClick={handleCloseSideBar}
        className="absolute md:left-[25%] md:w-3/4 flex justify-self-end flex-col justify-end -z-10 w-screen  items-start"
      >
        {/* home-section  */}
        <section id="home-section" className="w-full">
          <img
            src={myImg}
            className="w-full h-screen  object-cover rounded-2xl p-2 md:pt-0"
            alt=""
          />

          <div className="absolute top-0 md:left-0 flex flex-col justify-center items-center w-full md:w-full md:mt-0 h-[100vh] bg-slate-100 opacity-50 rounded-t-2xl"></div>
          <div className="absolute md:left-0  mx-auto top-0 flex flex-col justify-center items-center w-full md:w-full  h-[100vh] rounded-t-2xl  mt-[15rem] ">
            <div className="bg-white p-2 md:px-7 rounded-xl">
              <h1 className="font-bold text-2xl sm:text-4xl text-blue-500">
                Mohammed Abubakar
              </h1>
              <h1 className="text-center text-sm sm:text-lg lg:text-xl font-bold text-orange-500 xl:text-2xl">
                Aspirant Software Developer
              </h1>
            </div>
          </div>
        </section>
        {/* about-section  */}
        <section
          id="about-section"
          className="z-10 flex flex-col bg-blue-50 min-h-screen mx-2 px-3 sm:px-10 pt-5 sm:pt-10"
        >
          <h1
            id="aboutMe"
            className="headingsToAnim text-3xl font-bold mr-auto text-blue-600 flex flex-col"
          >
            <div>About Me</div>{" "}
            <div className="w-[40%] h-1 bg-orange-500 mt-2"></div>
          </h1>
          <h1 className="mt-5 text-left text-[17px] font-sans">
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
          <div className="mr-auto text-left text-[17px] font-sans">
            <h1
              id="facts"
              className="headingsToAnim text-3xl font-bold text-blue-600 w-fit mt-6 mb-3 flex flex-col"
            >
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
          <h1
            id="skills"
            className="headingsToAnim text-3xl font-bold mr-auto text-blue-600 mt-6 flex flex-col"
          >
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
          <div className="mt-12 text-left text-[17px] font-sans">
            <div className="flex w-full justify-center items-start">
              <div>
                <span className="text-blue-600 font-bold text-xl">
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
          <div className="text-[17px] text-left font-sans mt-3">
            {" "}
            <span className="text-blue-600 font-bold text-xl  mr-auto">
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
        {/* projects-section  */}
        <section
          id="projects-section"
          className="z-10 flex flex-col bg-blue-100 min-h-screen max-w-full mx-2 px-3 sm:px-10 pt-5 sm:pt-10 font-sans"
        >
          <h1
            id="projects"
            className="headingsToAnim text-3xl font-bold mr-auto text-blue-600 flex flex-col mb-3"
          >
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

          <div className="mx-auto w-full h-[25.5rem] overflow-auto hideScrollBar bg-white rounded-lg mt-2">
            {projView.all ? <AllProjects /> : null}

            {projView.fullstack ? <AllFSP /> : null}
            {projView.frontEnd ? <FrontEnd /> : null}
          </div>
          <div className="text-[17px] text-left w-full mt-6 mb-6">
            <span className="font-bold text-blue-600 text-2xl">
              Full Stack Projects
            </span>
            <br />{" "}
            <div className=" flex justify-start gap-x-8 lg:gap-x-12 text-justify items-center my-3 w-full">
              <div className="w-1/2 md:w-[45%] ">
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
              <div className="w-1/2 md:w-[45%]">
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
            <div className="flex flex-wrap justify-start items-center gap-x-6 lg:gap-x-12 mt-3">
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
        {/* resume-section  */}
        <section
          id="resume-section"
          className="text-[17px] z-10 flex flex-col bg-blue-50 min-h-screen max-w-full mx-2 px-2 sm:px-10 pt-5 sm:pt-10"
        >
          <h1
            id="resume"
            className="headingsToAnim text-3xl font-bold mr-auto text-blue-600 flex flex-col mb-3"
          >
            <div>Resume </div>{" "}
            <div className="w-[40%] h-1 bg-orange-500 mt-2"></div>
          </h1>

          <p className="text-left">
            I'm Mohammed Abubakar, currently pursuing a Bachelor of Engineering
            degree. I’m passionate about Problem Solving using Data Structures
            and Algorithms (DSA) and Creating Full Stack Web Applications.
          </p>
          <p className="text-2xl text-left font-bold mr-auto text-orange-500 mt-5">
            ❖ Education
          </p>
          <div
            id="educationSection"
            className="flex justify-start gap-x-7 mb-10 items-start max-sm:flex-col"
          >
            <div className="md:w-1/2 w-full">
              {/* Engineering */}
              <div className="flex items-start gap-x-3 mt-3">
                {/* //line a side */}
                <div className="flex-col items-center justify-center h-full">
                  <div className="w-5 h-5 rounded-full border-2 border-blue-500"></div>
                  <div className="h-[18rem] min-[360px]:h-[11rem] w-1 m-auto ">
                    <div className="incHeight border-2 h-full w-full border-blue-500"></div>
                  </div>
                </div>
                <div className="text-left">
                  <p className="text-[18px] font-bold">
                    {" "}
                    Bachelor of Engineering B.E | ISE (4<sup>th</sup> Year){" "}
                  </p>
                  <p className="text-left text-sm text-orange-500 font-bold">
                    CGPA: 9.04 (2021-2025)
                  </p>
                  <p className="italic mt-2 text-lg">
                    HKBK College Of Engineering
                  </p>

                  <p className="mt-2 text-[17px]">
                    Pursuing a Bachelor of Engineering degree in the branch of
                    Information Science and Engineering Currently in my 4th year{" "}
                    <br /> (7th semester) and engage most of my time in
                    self-study to enhance my skills
                  </p>
                </div>
              </div>
              {/* 12th  */}
              <div className="flex items-start gap-x-3 mt-3">
                {/* //line a side */}
                <div className="flex-col items-center justify-center h-full">
                  <div className="w-5 h-5 rounded-full border-2 border-blue-500"></div>
                  <div className="h-[23rem] min-[360px]:h-[13rem] max-h-max w-1 m-auto ">
                    <div className="incHeight border-2 h-full w-full border-blue-500"></div>
                  </div>
                </div>
                <div className="text-left">
                  <p className="text-[18px] font-bold">
                    {" "}
                    Pre University Education | 12<sup>th</sup> (PCMC)
                  </p>
                  <p className="text-left text-sm text-orange-500 font-bold">
                    Percentage : 89.6% (2019-2021)
                  </p>
                  <p className="italic mt-2 text-lg">
                    Indiranagar Composite PU College
                  </p>

                  <p className="mt-2 text-[17px]">
                    Successfully Completed the Pre University Course | 12
                    <sup>th</sup> <br />
                    with the Core Subjects as PCMC -{" "}
                    <span className="text-orange-500 font-bold">
                      Physics, Chemistry, Maths and Computer Science,
                    </span>{" "}
                    and this was the course from where my journey in tech got
                    started, i completed this cource under Department of
                    Pre-University Education
                  </p>
                </div>
              </div>
            </div>
            {/* <div className="mx-auto h-52 border-[1.5px] border-orange-500"></div> */}
            <div className="md:w-1/2 w-full">
              {/* 10th */}
              <div className="flex items-start gap-x-3 mt-3">
                {/* //line a side */}
                <div className="flex-col items-center justify-center h-full">
                  <div className="w-5 h-5 rounded-full border-2 border-blue-500"></div>
                  <div className="h-[19rem] min-[360px]:h-[12rem] max-h-max w-1 m-auto ">
                    <div className="incHeight border-2 h-full w-full border-blue-500"></div>
                  </div>
                </div>
                <div className="text-left">
                  <p className="text-[18px] font-bold">
                    {" "}
                    Secondary Education | 10<sup>th</sup> (SSLC)
                  </p>
                  <p className="text-left text-sm text-orange-500 font-bold">
                    Percentage : 85.3% (2019)
                  </p>
                  <p className="italic mt-2 text-lg">
                    New Oxford English School
                  </p>

                  <p className="mt-2 text-[17px]">
                    I completed my higher secondary education at New Oxford
                    English School, Bengaluru and passed out by securing 85.3%
                    in my 10<sup>th</sup> Examination, and Successfully obtained
                    Secondary School Leaving Certificate, under Karnataka
                    Secondary Education Examination Board [KSEEB]
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* achievements-section  */}
        <section
          id="achievements-section"
          className="z-10 flex flex-col bg-blue-100 max-w-full min-h-screen mx-2 px-2 sm:px-10 pt-5 sm:pt-10"
        >
          <h1
            id="achievements"
            className="headingsToAnim text-3xl font-bold mr-auto text-blue-600 flex flex-col mb-3"
          >
            <div> Achievements </div>{" "}
            <div className="w-[40%] h-1 bg-orange-500 mt-2"></div>
          </h1>

          <p className="text-left font-semibold text-[16px]">
            ❖ Full Stack Web Development -{" "}
            <span className="text-orange-500 font-bold">Apna College</span>{" "}
            <br /> ❖ Android App Development -{" "}
            <span className="text-orange-500 font-bold">
              Combridge Infotech
            </span>{" "}
            <br /> ❖ Introduction to Artificial Intelligence -{" "}
            <span className="text-orange-500 font-bold">
              Infosys Springboard
            </span>{" "}
            <br /> ❖ Fundamentals of AI and ML -{" "}
            <span className="text-orange-500 font-bold">
              Infosys Springboard
            </span>{" "}
            <br /> ❖ Database Fundamentals Database Concepts -{" "}
            <span className="text-orange-500 font-bold">
              Infosys Springboard
            </span>{" "}
            <br /> ❖ Database Design -{" "}
            <span className="text-orange-500 font-bold">
              Infosys Springboard
            </span>{" "}
            <br /> ❖ Data Mining -{" "}
            <span className="text-orange-500 font-bold">Great Learning</span>
          </p>

          <div
            id="certificate-Container"
            className="flex gap-x-14 gap-y-7 mt-6 mb-7 h-[30rem] overflow-hidden hideScrollBar flex-wrap justify-center items-center w-full"
          >
            <Link
              className="w-3/4 md:w-[40%]"
              to={
                "https://drive.google.com/file/d/1AmvT64nHX0GymrmmjgHasuiuGTpztELk/view"
              }
            >
              <img
                id="fastCeri"
                className="w-full rounded-xl hover:scale-105 cursor-pointer"
                src={
                  "https://res.cloudinary.com/dqusuosoq/image/upload/v1726937220/Portfolio/certificates/Full_Stack_Web_Development_-_Apna_College_page-0001_s7qmgx.jpg"
                }
              />{" "}
            </Link>
            <Link
              className="w-1/3"
              to={
                "https://drive.google.com/file/d/1RYDZI2NSDaIAwWle09iIc90rCXS2VGP5/view"
              }
            >
              <img
                className="w-full rounded-xl hover:scale-105 cursor-pointer"
                src={
                  "https://res.cloudinary.com/dqusuosoq/image/upload/v1726937220/Portfolio/certificates/Android_App_Development_-_Combridge_Infotech_page-0001_tcpvqb.jpg"
                }
              />
            </Link>
            <Link
              className="w-1/3"
              to={
                "https://drive.google.com/file/d/1nXEVwTegr_f8aCjIpyXvyU4dfpP5gzLF/view"
              }
            >
              <img
                className="w-full rounded-xl hover:scale-105 cursor-pointer"
                src={
                  "https://res.cloudinary.com/dqusuosoq/image/upload/v1726937220/Portfolio/certificates/Database_Design_-_Infosys_Springboard_page-0001_d2zwyb.jpg"
                }
              />
            </Link>
            <Link
              className="w-1/3"
              to={
                "https://drive.google.com/file/d/1hq8s3iJk46lKljldBmw6C2P1Ooh6GluF/view"
              }
            >
              <img
                className="w-full rounded-xl hover:scale-105 cursor-pointer"
                src={
                  "https://res.cloudinary.com/dqusuosoq/image/upload/v1726937220/Portfolio/certificates/Database_Fundamentals_Database_Concepts_-_Infosys_Springboard_page-0001_baugxa.jpg"
                }
              />
            </Link>
            <Link
              className="w-1/3"
              to={
                "https://drive.google.com/file/d/1uQhIBcXy5nEUU9C7DTb7JcEJBbBuZndb/view"
              }
            >
              <img
                className="w-full rounded-xl hover:scale-105 cursor-pointer"
                src={
                  "https://res.cloudinary.com/dqusuosoq/image/upload/v1726937221/Portfolio/certificates/Introduction_to_Artificial_Intelligence_-_Infosys_Springboard_page-0001_skqmsr.jpg"
                }
              />
            </Link>
            <Link
              className="w-1/3"
              to={
                "https://drive.google.com/file/d/14FmGWSsEIGq4zNP1ESVrEbY0pA5ag2A9/view"
              }
            >
              <img
                className="w-full rounded-xl hover:scale-105 cursor-pointer"
                src={
                  "https://res.cloudinary.com/dqusuosoq/image/upload/v1726937221/Portfolio/certificates/Fundamentals_of_AI_and_ML_-_Infosys_Springboard_page-0001_jj2oxj.jpg"
                }
              />
            </Link>
            <Link
              className="w-1/3"
              id="lastCerti"
              to={
                "https://drive.google.com/file/d/1xb43v9bXq7YhfJh-pLys773u6-qJj3hF/view"
              }
            >
              <img
                className="w-full rounded-xl hover:scale-105 cursor-pointer"
                src={
                  "https://res.cloudinary.com/dqusuosoq/image/upload/v1726937221/Portfolio/certificates/Data_Mining_-_Great_Learning_page-0001_rzfhru.jpg"
                }
              />
            </Link>{" "}
          </div>
          <div
            id="certiViewToggler"
            className="cursor-pointer p-1 px-2 mb-3 w-fit mx-auto hover:bg-blue-500  bg-orange-500 text-white font-bold rounded-xl"
            onClick={certiViewToggler}
          >
            <p>View All</p>
          </div>
        </section>
        {/* contact section  */}
        <section
          id="contact-section"
          className="z-10 flex flex-col bg-blue-50 min-h-screen max-w-full mx-2 px-2 sm:px-10 pt-5 sm:pt-10 rounded-b-lg"
        >
          <h1
            id="contactMe"
            className="headingsToAnim text-3xl font-bold mr-auto text-blue-600 flex flex-col mb-3"
          >
            <div>Contact Me </div>{" "}
            <div className="w-[40%] h-1 bg-orange-500 mt-2"></div>
          </h1>
          <h2 className="text-left font-bold text-orange-500 text-[22px] ">
            Get in Touch
          </h2>
          <p className="text-[17px] mt-3 font-semibold text-left">
            I’d love to hear from you! Whether you have a project in mind, a
            question, or just want to say hi, feel free to send me a message.
            I’ll respond as soon as possible.
          </p>
          <div className="w-full max-lg:flex-col lg:flex gap-x-2 text-left mt-3">
            {/* contact details  */}
            <div className="w-full lg:w-[50%] rounded-xl gap-y-5 p-2">
              {/* location */}
              <div className="flex gap-x-2 items-start shadow-md p-2">
                <div className="w-fit">
                  <lord-icon
                    src="https://cdn.lordicon.com/tdtlrbly.json"
                    trigger="hover"
                    style={{ width: "50px", height: "50px" }} // Adjust size here
                  ></lord-icon>
                </div>
                <div className="flex-col gap-y-5 ">
                  <p className="font-bold text-orange-500 text-[20px] ">
                    Location
                  </p>
                  <p className="text-[15px] font-semibold">
                    No. 507, 1<sup>st</sup> Cross 4<sup>th</sup> Main,
                    VinayakaNagar AnnasandraPalya, Vimanapura Post, Bengaluru
                    North - 560017
                  </p>
                </div>
              </div>
              {/* email */}
              <div className="flex gap-x-2 items-start shadow-md p-2">
                <div className="w-fit">
                  <lord-icon
                    src="https://cdn.lordicon.com/nqisoomz.json"
                    trigger="hover"
                    style={{ width: "50px", height: "50px" }}
                  ></lord-icon>
                </div>
                <div className="flex-col gap-y-5 !overflow-ellipsis">
                  <p className="font-bold text-orange-500 text-[20px] ">
                    Email
                  </p>

                  <p className="text-[15px] font-semibold">
                    mohdabubakar.11786@gmail.com
                  </p>
                </div>
              </div>
              {/* phone */}
              <div className="flex gap-x-2 items-start shadow-md p-2">
                <div className="w-fit">
                  <lord-icon
                    src="https://cdn.lordicon.com/mhhpoybt.json"
                    trigger="hover"
                    style={{ width: "50px", height: "50px" }}
                  ></lord-icon>
                </div>
                <div className="flex-col gap-y-5 ">
                  <p className="font-bold text-orange-500 text-[20px] ">
                    Phone
                  </p>
                  <p className="text-[15px] font-semibold">+91 93531 47372</p>
                </div>
              </div>
            </div>
            {/* form to contact  */}
            <div className="p-2">
              <div className="flex-col gap-x-2 w-full h-fit shadow-md p-2">
                <form onSubmit={contactForm} className="w-full">
                  <div className="w-full flex-col items-center">
                    {/* first row */}
                    <div className="w-full justify-center items-center flex gap-x-2">
                      {/* Name  */}
                      <div className="w-1/2 mb-2">
                        <label
                          htmlFor="name"
                          className="text-orange-500 text-[17px] font-bold"
                        >
                          Your Name<sup>*</sup>{" "}
                          {nameError ? (
                            <span className="text-xs text-red-500 font-bold">
                              &nbsp;Your Name is required
                            </span>
                          ) : null}
                        </label>
                        <input
                          className="w-full shadow-md border-gray-500 rounded-lg p-1 focus:outline-blue-700"
                          type="text"
                          name="name"
                          id="name"
                          onChange={handleChange}
                          value={formData.name}
                        />
                      </div>
                      {/* Email  */}
                      <div className="w-1/2 mb-2">
                        {" "}
                        <label
                          htmlFor="email"
                          className="text-orange-500 font-bold text-[17px]"
                        >
                          Email<sup>*</sup>{" "}
                          {emailError ? (
                            <span className="text-xs text-red-500 font-bold">
                              &nbsp;Your Email is required
                            </span>
                          ) : null}
                        </label>
                        <input
                          type="email"
                          className="w-full shadow-md border-gray-500 rounded-lg p-1 focus:outline-blue-700"
                          name="email"
                          id="email"
                          onChange={handleChange}
                          value={formData.email}
                        />
                      </div>
                    </div>
                    {/* subject  */}
                    <div className="w-full mb-2">
                      <label
                        htmlFor="subject"
                        className="text-orange-500 font-bold text-[17px]"
                      >
                        Subject
                      </label>
                      <input
                        className="w-full shadow-md border-gray-500 rounded-lg p-1 focus:outline-blue-700"
                        type="text"
                        name="subject"
                        id="subject"
                        onChange={handleChange}
                        value={formData.subject}
                      />
                    </div>
                    {/* message  */}
                    <div className="mb-2">
                      <label
                        htmlFor="message"
                        className="text-orange-500 text-[17px] font-bold"
                      >
                        Message<sup>*</sup>{" "}
                        {msgError ? (
                          <span className="text-xs text-red-500 font-bold">
                            &nbsp;Message is required
                          </span>
                        ) : null}
                      </label>
                      <textarea
                        name="message"
                        id="message"
                        onChange={handleChange}
                        value={formData.message}
                        className="w-full shadow-md border-gray-500 rounded-lg p-1 focus:outline-blue-700"
                      ></textarea>
                    </div>
                    <button
                      type="submit"
                      className="p-2 mb-2 bg-orange-500 hover:bg-blue-500 text-white font-bold rounded-xl"
                    >
                      Send
                    </button>
                  </div>
                </form>
              </div>
            </div>
            {isLoading ? (
              <div
                id="loading"
                className="fixed top-0 left-0 md:left-[10%] w-screen h-screen bg-gray-500 bg-opacity-75 flex justify-center items-center"
              >
                <div className="loader text-3xl font-bold text-white">
                  Please wait...
                </div>{" "}
                {/* Add your loading animation */}
              </div>
            ) : null}
          </div>
          {/* map  */}
          <div className="w-full my-8">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d923.4167465918638!2d77.67491564746867!3d12.962792495749932!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae13d2a9c2523d%3A0x74a99ec8f1b7f827!2sMADARSA-E-HUSSAINIYA!5e0!3m2!1sen!2sin!4v1727026852138!5m2!1sen!2sin"
              width="550"
              height="350"
              style={{ border: "0" }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Google Maps Location"
              className="mx-auto w-[200px] min-[330px]:w-[275px] h-[200px] min-[410px]:w-[350px]  min-[478px]:w-[450px]  min-[867px]:w-[550px] min-[867px]:h-[350px]"
            ></iframe>
          </div>
        </section>
        {/* footer  */}
        <div className="flex-col w-full p-2 justify-center mt-2 bg-white">
          <div className="flex w-fit justify-center gap-3 mx-auto text-lg">
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

          {/* footer */}
          <div className="font-semibold text-[15px] mt-2">
            <p> +91 93531 47372 | mohdabubakar.11786@gmail.com</p>
            <p>&copy; Mohammed Abubakar</p>
          </div>
        </div>
      </div>
      {/* page up btn  */}
      <div
        id="upBtn"
        className="fixed bottom-5 cursor-pointer right-5 p-2 bg-green-400 font-bold  hover:bg-black hover:text-white rounded-full z-50"
        onClick={handleUp}
      >
        Up
      </div>
    </>
  );
}

export default Home;
