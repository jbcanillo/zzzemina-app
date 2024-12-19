import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Axios from "axios";
import {
  formatCurrency,
  formatDate,
  formatTime,
  toProperCase,
} from "../hooks/customHooks";
import { useToast } from "../contexts/ToastContext";

const BookingManagement = () => {
  const navigate = useNavigate();
  const { showToastMessage } = useToast();
  const [bookings, setBookings] = useState([]);

  const fetchBookings = () => {
    Axios.get("http://localhost:5000/api/bookings", {
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

  // Fetch all bookings from the API when the component mounts
  useEffect(() => {
    fetchBookings();
  }, []);

  // Update booking status
  const handleUpdateBooking = (id, status) => {
    const isConfirmed = window.confirm(
      "Are you sure you want to update this booking?"
    );
    if (!isConfirmed) return;

    Axios.put(
      `http://localhost:5000/api/bookings/${id}`,
      { paymentStatus: status },
      {
        withCredentials: true,
      }
    )
      .then(() => {
        setBookings((prevBookings) =>
          prevBookings.filter((booking) => booking._id !== id)
        );
        showToastMessage(`Booking ${status} successfully!`, "success");
        fetchBookings();
      })
      .catch((error) => {
        console.error("Error updating booking:", error);
        showToastMessage(error.response?.data?.message || "Error", "error");
      });
  };

  // Cancel booking only if already processed
  const handleCancelBooking = (id) => {
    const isConfirmed = window.confirm(
      "Are you sure you want to cancel this booking?"
    );
    if (!isConfirmed) return;

    Axios.delete(`http://localhost:5000/api/bookings/${id}`, {
      withCredentials: true,
    })
      .then(() => {
        setBookings((prevBookings) =>
          prevBookings.filter((booking) => booking._id !== id)
        );
        showToastMessage(`Booking cancelled successfully!`, "success");
        fetchBookings();
      })
      .catch((error) => {
        console.error("Error cancelling the booking:", error);
        showToastMessage(error.response?.data?.message || "Error", "error");
      });
  };

  return (
    <section>
      <h1>Booking Management</h1>
      <div className="card card-bordered">
        <div className="card p-2 shadow-xl border border-gray-800 overflow-auto">
          <table className="table table-zebra table-auto">
            <thead>
              <tr>
                <th>#</th>
                <th>ID</th>
                <th>Booked on</th>
                <th>Booked by</th>
                <th>Title</th>
                <th>Speaker</th>
                <th>Date</th>
                <th>Time</th>
                <th>Fee</th>
                <th>Payment Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {bookings.length === 0 ? (
                <tr>
                  <td colSpan="99" className="text-center">
                    No bookings available
                  </td>
                </tr>
              ) : (
                bookings.map((booking, index) => {
                  const seminarDetails = booking.seminar;
                  const userDetails = booking.user;
                  return (
                    <tr key={booking._id} className="hover">
                      <td>{index + 1}</td>
                      <td>{booking._id}</td>
                      <td>
                        {formatDate(booking.createdAt) +
                          " " +
                          formatTime(booking.createdAt)}
                      </td>
                      <td>
                        {userDetails.lastName + ", " + userDetails.firstName}
                      </td>
                      <td>{seminarDetails.title}</td>
                      <td>{seminarDetails.speaker.name}</td>
                      <td>{formatDate(seminarDetails.date)}</td>
                      <td>
                        {formatTime(seminarDetails.timeFrame.from) +
                          "-" +
                          formatTime(seminarDetails.timeFrame.to)}
                      </td>
                      <td>{formatCurrency(seminarDetails.fee)}</td>
                      <td
                        className={
                          booking.paymentStatus === "pending"
                            ? "text-orange-500"
                            : booking.paymentStatus === "confirmed"
                            ? "text-green-500"
                            : booking.paymentStatus === "rejected"
                            ? "text-red-500"
                            : ""
                        }
                      >
                        {toProperCase(booking.paymentStatus)}
                      </td>
                      <td>
                        {booking.paymentStatus === "pending" ? (
                          <span className="row flex gap-2">
                            <button
                              className="btn btn-success btn-xs"
                              onClick={() =>
                                handleUpdateBooking(booking._id, "confirmed")
                              }
                            >
                              Confirm
                            </button>
                            <button
                              className="btn btn-error btn-xs"
                              onClick={() =>
                                handleUpdateBooking(booking._id, "rejected")
                              }
                            >
                              Reject
                            </button>
                          </span>
                        ) : (
                          <button
                            className="btn btn-warning btn-xs"
                            onClick={() => handleCancelBooking(booking._id)}
                          >
                            Cancel
                          </button>
                        )}
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default BookingManagement;
