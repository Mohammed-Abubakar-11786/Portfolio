import { Link } from "react-router-dom";
import socialBookImg from "../assets/SocialBookImg.png";
import wonderlustImg from "../assets/wonderlustImg.png";
import spotifyCloneImg from "../assets/spotifyCloneImg.png";
import simpleCalciImg from "../assets/simpleCalciImg.png";
import simonSayGameImg from "../assets/simonSayGameImg.png";

function AllProjects() {
  return (
    <div className="w-full h-full flex flex-wrap justify-evenly items-start mt-6">
      <Link
        className="w-fit h-fit"
        to={"https://socialbook-klzq.onrender.com/"}
      >
        <div>
          <img
            src={socialBookImg}
            alt=""
            className="w-[300px] rounded-xl hover:scale-95 shadow-xl"
          />
        </div>
        <div className="font-sans font-bold text-blue-600 text-sm mt-2">
          Social Networking Site
        </div>
      </Link>
      <Link
        className="w-fit h-fit"
        to={"https://wanderlust-project-7f20.onrender.com/listings"}
      >
        <div className="">
          <img
            src={wonderlustImg}
            alt=""
            className="w-[300px] rounded-xl hover:scale-95 shadow-xl"
          />
        </div>
        <div className="font-sans font-bold text-blue-600 text-sm mt-2">
          Airbnb Clone
        </div>
      </Link>

      <Link
        className="w-fit h-fit"
        to={"https://mohammed-abubakar-11786.github.io/Spotify-Website-Clone/"}
      >
        <div className="">
          <img
            src={spotifyCloneImg}
            alt=""
            className="w-[300px] rounded-xl hover:scale-95 shadow-xl"
          />
        </div>
        <div className="font-sans font-bold text-blue-600 text-sm mt-2">
          Spotify Website Clone
        </div>
      </Link>
      <Link
        className="w-fit h-fit"
        to={"https://mohammed-abubakar-11786.github.io/Simple-Calculator/"}
      >
        <div className="">
          <img
            src={simpleCalciImg}
            alt=""
            className="w-[300px] rounded-xl hover:scale-95 shadow-xl"
          />
        </div>
        <div className="font-sans font-bold text-blue-600 text-sm mt-2">
          Simple Calculator
        </div>
      </Link>
      <Link
        className="w-fit h-fit"
        to={"https://mohammed-abubakar-11786.github.io/Simon-Say-Game/"}
      >
        <div className="">
          <img
            src={simonSayGameImg}
            alt=""
            className="w-[300px] rounded-xl hover:scale-95 shadow-xl"
          />
        </div>
        <div className="font-sans font-bold text-blue-600 text-sm mt-2">
          Simon Say Game
        </div>
      </Link>
    </div>
  );
}

export default AllProjects;
