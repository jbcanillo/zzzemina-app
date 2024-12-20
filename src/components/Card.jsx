import {
  formatDate,
  formatTime,
  getRandomGradient,
} from "../helpers/CustomHelpers";
import { Link } from "react-router-dom";

const Card = ({ seminar }) => {
  return (
    <div className="carousel-item flex-none w-full md:w-96">
      <div className="skeleton card card-compact bg-base-300 w-full border border-gray-800 shadow-xl">
        {/* Figure with random gradient background */}
        <figure
          className="relative w-full h-48"
          style={{
            background: getRandomGradient(),
            borderRadius: "0.375rem",
          }}
        >
          {/* Profile photo on top of the gradient */}
          <img
            src={
              seminar.speaker.image ||
              "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
            }
            alt={seminar.speaker.name}
            className="absolute top-24 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-40 h-40 rounded-full border-4 border-white"
            onError={
              (e) =>
                (e.target.src =
                  "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp") // Fallback image
            }
          />
        </figure>
        <div className="card-body flex flex-col flex-grow">
          <h2 className="card-title">{seminar.title}</h2>
          <h3>Presented by {seminar.speaker.name}</h3>
          <h3>
            {formatDate(seminar.date)} at {formatTime(seminar.timeFrame.from)} -{" "}
            {formatTime(seminar.timeFrame.to)}
          </h3>
          <h3>{seminar.slotsAvailable} available slots remaining</h3>
          <div className="card-actions justify-center mt-auto">
            {/* Link to the seminar details page */}
            <Link
              to={`/seminar/${seminar._id}`}
              className="btn btn-sm btn-dark"
            >
              Book now!
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
