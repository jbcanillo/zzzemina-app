import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import {
  formatDate,
  formatTime,
  formatCurrency,
  getRandomGradient,
} from "../helpers/CustomHelpers";
import Axios from "axios";
import {
  FaUser,
  FaCalendar,
  FaClock,
  FaMapMarkerAlt,
  FaChair,
  FaArrowLeft,
} from "react-icons/fa";
import { MdPayment } from "react-icons/md";
import { useAuth } from "../contexts/AuthContext";
import { useToast } from "../contexts/ToastContext";
import CountdownTimer from "../components/CountdownTimer";

const Seminar = () => {
  const navigate = useNavigate();
  const { showToastMessage } = useToast();
  const { isAuthenticated, user } = useAuth();
  const { id } = useParams();
  const [seminar, setSeminar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [background, setBackground] = useState(getRandomGradient());

  // Fetch seminar data from API
  const fetchSeminar = async () => {
    try {
      setLoading(true);
      const response = await Axios.get(
        `https://zzzemina-api.vercel.app/api/seminars/${id}`,
        {
          withCredentials: true,
        }
      );
      setSeminar(response.data);
    } catch (error) {
      setError("Error fetching seminar data");
      console.error("Error fetching seminar:", error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch seminar data when the component mounts or when `id` changes
  useEffect(() => {
    fetchSeminar();
  }, [id]);

  // Show loading message until data is fetched
  if (loading) {
    return <div>Loading...</div>;
  }

  // Show error message if there was an error during fetching
  if (error) {
    return <div>{error}</div>;
  }

  // If no seminar data available, show a fallback message
  if (!seminar) {
    return <div>No seminar found.</div>;
  }

  // Extract the necessary data
  const seminarDate = seminar.date.trim().split("T")[0]; // e.g., "2024-12-14"
  const seminarTime = seminar.timeFrame.from.trim(); // Ensure proper time format

  const handleAddBooking = (seminarId) => {
    Axios.post(
      `https://zzzemina-api.vercel.app/api/bookings`,
      { seminarId, user },
      {
        withCredentials: true,
      }
    )
      .then(() => {
        showToastMessage(
          "You have successfully booked this seminar!",
          "success"
        );
        navigate("/my_bookings");
      })
      .catch((error) => {
        console.error("Error booking this seminar:", error);
        showToastMessage(error.response?.data?.message || "Error", "error");
      });
  };

  return (
    <section className="m-4 sm:m-6 lg:m-10 p-4 sm:p-6 lg:p-10">
      <button onClick={() => navigate(-1)} className="text-2xl mb-4">
        <FaArrowLeft />
      </button>
      <div className="skeleton mockup-browser bg-base-300 shadow-xl">
        <div className="mockup-browser-toolbar">
          <div className="input justify-center text-center">
            <Link to={seminar.speaker?.linkedin || "#"}>
              {seminar.speaker?.linkedin || "LinkedIn"}
            </Link>
          </div>
        </div>
        <div
          className="bg-base-200 px-4 py-5 rounded-lg"
          style={{
            background: background, // Using the fixed background gradient
          }}
        >
          <div className="flex flex-col gap-4 sm:flex-row p-6">
            <div className="flex flex-col items-center gap-4 sm:items-start">
              <img
                src={
                  seminar.speaker.image ||
                  "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                }
                alt={seminar.speaker.name}
                className="w-48 h-48 rounded-full border-4 border-white"
                onError={(e) =>
                  (e.target.src =
                    "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp")
                }
              />
            </div>
            <div className="flex flex-col gap-4 w-full sm:w-3/6">
              <h1
                className="text-2xl sm:text-4xl mb-2 text-center sm:text-left"
                style={{
                  textShadow: "2px 2px 4px rgba(0, 0, 0, 0.6)",
                }}
              >
                {seminar.title || "Seminar Title"}
              </h1>
              <p
                className="italic text-center sm:text-left"
                style={{
                  textShadow: "2px 2px 4px rgba(0, 0, 0, 0.6)",
                }}
              >
                {seminar.description}
              </p>
            </div>
            <div className="flex flex-col gap-4 bg-base-300 p-4 rounded-lg w-full sm:w-3/12">
              <CountdownTimer
                seminarDate={seminarDate}
                seminarTime={seminarTime}
              />
              <div className="flex items-center gap-2">
                <FaUser />
                <h3>Speaker: {seminar.speaker?.name}</h3>
              </div>
              <div className="flex items-center gap-2">
                <FaCalendar />
                <h3>Date: {formatDate(seminar.date)}</h3>
              </div>
              <div className="flex items-center gap-2">
                <FaClock />
                <h3>
                  Time: {formatTime(seminar.timeFrame?.from)} -{" "}
                  {formatTime(seminar.timeFrame?.to)}
                </h3>
              </div>
              <div className="flex items-center gap-2">
                <FaMapMarkerAlt />
                <h3>Venue: {seminar.venue}</h3>
              </div>
              <div className="flex items-center gap-2">
                <MdPayment />
                <h3>
                  Fee: {seminar.fee > 0 ? formatCurrency(seminar.fee) : "Free"}
                </h3>
              </div>
              <div className="flex items-center gap-2">
                <FaChair />
                <h3>Slots remaining: {seminar.slotsAvailable}</h3>
              </div>
              <div className="w-full flex justify-center mt-4">
                {isAuthenticated && user?.role === "user" ? (
                  (() => {
                    const today = new Date();
                    const seminarDate = new Date(seminar.date);

                    if (seminar.slotsAvailable <= 0) {
                      return (
                        <p className="m-2 text-xl text-center text-red-500">
                          Fully booked!
                        </p>
                      );
                    } else if (seminarDate > today) {
                      return (
                        <button
                          className="btn btn-xl btn-neutral w-full"
                          onClick={() => handleAddBooking(seminar._id)}
                        >
                          Book a reservation
                        </button>
                      );
                    } else {
                      return (
                        <p className="m-2 text-xl text-center text-red-500">
                          No longer available!
                        </p>
                      );
                    }
                  })()
                ) : (
                  <p className="m-2 text-xl text-center text-red-500">
                    Please login to reserve
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Seminar;
