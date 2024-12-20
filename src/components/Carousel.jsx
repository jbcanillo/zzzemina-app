import { useEffect, useRef } from "react";
import { formatDate, formatTime, getRandomGradient } from "../helpers/CustomHelpers";
import { Link } from "react-router-dom";

const Carousel = ({ seminars }) => {
  const carouselRef = useRef(null);
  const intervalRef = useRef(null);

  // Limit the seminars to a random selection of 10 (or fewer)
  const getRandomSeminars = (seminars, count = 10) => {
    const shuffled = [...seminars].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, count);
  };
  const randomSeminars = getRandomSeminars(seminars);

  useEffect(() => {
    const slideCarousel = () => {
      const carousel = carouselRef.current;
      const firstItem = carousel.querySelector(".carousel-item");
      const width = firstItem ? firstItem.offsetWidth : 0;

      if (carousel && firstItem) {
        const currentScroll = carousel.scrollLeft;

        // If we've reached the end, reset scroll position to 0 (infinite loop effect)
        if (currentScroll + width >= carousel.scrollWidth) {
          carousel.scrollTo({
            left: 0, // Reset to the first item
            behavior: "smooth", // Smooth scroll effect
          });
        } else {
          carousel.scrollTo({
            left: currentScroll + width,
            behavior: "smooth", // Smooth scroll effect
          });
        }
      }
    };

    // Set an interval to slide every 3 seconds (3000 ms)
    intervalRef.current = setInterval(slideCarousel, 3000);

    // Cleanup the interval when the component unmounts
    return () => clearInterval(intervalRef.current);
  }, []);

  return (
    <div
      className="carousel-wrapper relative overflow-hidden"
      style={{ width: "100%" }}
    >
      <div
        ref={carouselRef}
        className="carousel flex space-x-4 transition-transform"
        style={{
          display: "flex",
          overflowX: "auto",
          scrollBehavior: "smooth",
        }}
      >
        {/* Loop through random seminars */}
        {randomSeminars.map((seminar) => (
          <div
            key={seminar._id}
            className=" carousel-item flex-none w-full md:w-96"
          >
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
              <div className="card-body">
                <h2 className="card-title">{seminar.title}</h2>
                <h3>Presented by {seminar.speaker.name}</h3>
                <h3>
                  {formatDate(seminar.date)} at{" "}
                  {formatTime(seminar.timeFrame.from)} -{" "}
                  {formatTime(seminar.timeFrame.to)}
                </h3>
                <h3>{seminar.slotsAvailable} available slots remaining</h3>
                <div className="card-actions justify-center">
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
        ))}
      </div>
    </div>
  );
};

export default Carousel;
