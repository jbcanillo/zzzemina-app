import { useEffect, useRef } from "react";
import Card from "./Card";

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
    <div className="carousel-wrapper relative overflow-hidden" style={{ width: "100%" }}>
      <div
        ref={carouselRef}
        className="carousel flex space-x-4 transition-transform"
        style={{
          display: "flex",
          overflowX: "auto",
          scrollBehavior: "smooth",
        }}
      >
        {/* Loop through random seminars and render the Card component */}
        {randomSeminars.map((seminar) => (
          <Card key={seminar._id} seminar={seminar} />
        ))}
      </div>
    </div>
  );
};

export default Carousel;
