import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Axios from "axios";
import {
  FaUser,
  FaCalendar,
  FaClock,
  FaMapMarkerAlt,
  FaChair,
} from "react-icons/fa";
import { useAuth } from "../contexts/AuthContext";
import { useToast } from "../contexts/ToastContext";
import CountdownTimer from "../components/CountdownTimer";
import {
  formatDate,
  formatTime,
  formatCurrency,
  getRandomGradient,
} from "../helpers/CustomHelpers";

const Bookings = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { showToastMessage } = useToast();
  const [bookings, setBookings] = useState([]);

  const fetchBookings = () => {
    Axios.get("https://zzzemina-api.vercel.app/api/bookings/user_bookings", {
      withCredentials: true,
    })
      .then((response) => {
        const data = response.data || [];
        console.log("Fetched bookings:", data);
        setBookings(data);
      })
      .catch((error) => {
        console.error("Error fetching bookings:", error);
        navigate("/");
      });
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const handlePayBooking = () => {};

  const handleCancelBooking = (bookingId) => {
    const isConfirmed = window.confirm(
      "Are you sure you want to cancel this reservation?"
    );
    if (!isConfirmed) return;

    Axios.delete(`https://zzzemina-api.vercel.app/api/bookings/${bookingId}`, {
      withCredentials: true,
    })
      .then(() => {
        setBookings((prevBookings) =>
          prevBookings.filter((booking) => booking._id !== bookingId)
        );
        showToastMessage("Booking cancelled successfully!", "success");
        fetchBookings();
      })
      .catch((error) => {
        console.error("Error deleting booking:", error);
        showToastMessage(error.response?.data?.message || "Error", "error");
      });
  };

  return (
    <section>
      <h1 className="text-3xl font-bold text-center mb-6">My Bookings</h1>
      {bookings.length === 0 ? (
        <div className="text-center text-xl">No bookings yet</div>
      ) : (
        bookings.map((booking) => {
          const seminar = booking.seminar;
          const seminarDate = seminar.date.trim().split("T")[0]; // e.g., "2024-12-14"
          const seminarTime = seminar.timeFrame.from.trim(); // Ensure proper time format
          return (
            <div className="m-5 p-5" key={booking._id}>
              <div className="mockup-browser bg-base-300 shadow-xl">
                <div className="mockup-browser-toolbar">
                  <div className="input justify-center text-center">
                    <Link to={seminar.speaker?.linkedin || "#"}>
                      {seminar.speaker?.linkedin || "LinkedIn"}
                    </Link>
                  </div>
                </div>
                <div
                  className="bg-base-200 px-4 py-5"
                  style={{
                    background: getRandomGradient(),
                    borderRadius: "0.375rem",
                  }}
                >
                  <h2
                    className="text-2xl"
                    style={{
                      textShadow: "2px 2px 4px rgba(0, 0, 0, 0.6)",
                    }}
                  >
                    Booking ID: {booking._id}
                  </h2>
                  <div className="flex flex-col gap-4 p-6 sm:flex-row sm:gap-6">
                    <div className="flex flex-col items-center gap-4 w-full sm:w-4/12">
                      <img
                        src={
                          seminar.speaker.image ||
                          "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                        }
                        alt={seminar.speaker?.name}
                        className="w-48 h-48 rounded-full border-4 border-white"
                        onError={(e) =>
                          (e.target.src =
                            "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp")
                        }
                      />
                    </div>
                    <div className="flex flex-col gap-4 w-full sm:w-5/12">
                      <h1
                        className="text-4xl mb-2"
                        style={{
                          textShadow: "2px 2px 4px rgba(0, 0, 0, 0.6)",
                        }}
                      >
                        {seminar.title || "Seminar Title"}
                      </h1>
                      <p
                        className="italic"
                        style={{
                          textShadow: "2px 2px 4px rgba(0, 0, 0, 0.6)",
                        }}
                      >
                        {seminar.description}
                      </p>
                    </div>
                    <div className="flex flex-col gap-4 bg-base-300 p-4 rounded-lg w-full sm:w-4/12">
                      <CountdownTimer
                        seminarDate={seminarDate}
                        seminarTime={seminarTime}
                      />
                      <div className="flex items-center gap-2">
                        <FaUser />
                        <h3>Speaker: {seminar.speaker?.name}</h3>
                      </div>
                      <div className="flex items-center gap-2 w-max">
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
                        <FaChair />
                        <h3>Slots remaining: {seminar.slotsAvailable}</h3>
                      </div>
                      <div className="items-center justify-center w-full">
                        {booking.paymentStatus === "pending" && (
                          <button
                            className="btn btn-xl btn-success btn-block"
                            onClick={() => handlePayBooking(booking._id)}
                          >
                            Pay Now ({formatCurrency(seminar.fee)})
                          </button>
                        )}
                        {booking.paymentStatus === "confirmed" && (
                          <p className="m-2 text-xl justify-center text-center text-green-500">
                            Payment confirmed
                          </p>
                        )}
                        {booking.paymentStatus === "rejected" && (
                          <p className="m-2 text-xl justify-center text-center text-red-500">
                            Payment rejected
                          </p>
                        )}
                        <div className="divider"></div>
                        <button
                          className="btn btn-xl btn-error btn-block"
                          onClick={() => handleCancelBooking(booking._id)}
                        >
                          Cancel Reservation
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })
      )}
    </section>
  );
};

export default Bookings;
