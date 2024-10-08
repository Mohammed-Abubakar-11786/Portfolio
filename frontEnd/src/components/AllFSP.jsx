import { Link } from "react-router-dom";
let socialBookImg =
  "https://res.cloudinary.com/dqusuosoq/image/upload/v1726145583/Portfolio/SocialBookImg_ttzicu.png";
let wonderlustImg =
  "https://res.cloudinary.com/dqusuosoq/image/upload/v1726145584/Portfolio/wonderlustImg_vv0mud.png";

function AllFSP() {
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
    </div>
  );
}

export default AllFSP;
