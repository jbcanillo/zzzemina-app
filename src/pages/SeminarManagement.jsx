import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Axios from "axios";
import { formatDate, formatTime } from "../hooks/customHooks";
import { useToast } from "../contexts/ToastContext";
import SeminarForm from "../forms/SeminarForm";

const SeminarManagement = () => {
  const navigate = useNavigate();
  const { showToastMessage } = useToast();
  const [seminars, setSeminars] = useState([]);
  const [editSeminar, setEditSeminar] = useState(null);

  const fetchSeminars = () => {
    Axios.get("https://zzzemina-api.vercel.app/api/seminars", { withCredentials: true })
      .then((response) => {
        const data = response.data || [];
        console.log("Fetched seminars:", data);
        setSeminars(data);
      })
      .catch((error) => {
        console.error("Error fetching seminars:", error);
        navigate("/");
      });
  };

  // Fetch seminars from the API when the component mounts
  useEffect(() => {
    fetchSeminars();
  }, []);

  // Create a new seminar
  const handleCreate = (seminarData) => {
    Axios.post("https://zzzemina-api.vercel.app/api/seminars", seminarData, {
      withCredentials: true,
    })
      .then((response) => {
        setSeminars((prevSeminars) => [...prevSeminars, response.data]);
        showToastMessage("New Seminar added successfully!", "success");
        fetchSeminars();
      })
      .catch((error) => {
        console.error("Error creating seminar:", error);
        showToastMessage(error.response?.data?.message|| "Error", "error");
      });
  };

  // Update an existing seminar
  const handleUpdate = (seminarData) => {
    Axios.put(
      `https://zzzemina-api.vercel.app/api/seminars/${editSeminar._id}`,
      seminarData,
      { withCredentials: true }
    )
      .then((response) => {
        setSeminars((prevSeminars) =>
          prevSeminars.map((seminar) =>
            seminar._id === editSeminar._id ? response.data : seminar
          )
        );
        showToastMessage("Seminar updated successfully!", "success");
        setEditSeminar(null);
        fetchSeminars();
      })
      .catch((error) => {
        console.error("Error updating seminar:", error);
        showToastMessage(error.response?.data?.message|| "Error", "error");
      });
  };

  const handleDelete = (id) => {
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this seminar?"
    );
    if (!isConfirmed) return;

    Axios.delete(`https://zzzemina-api.vercel.app/api/seminars/${id}`, {
      withCredentials: true,
    })
      .then(() => {
        setSeminars((prevSeminars) =>
          prevSeminars.filter((seminar) => seminar._id !== id)
        );
        showToastMessage("Seminar deleted successfully!", "success");
        fetchSeminars();
      })
      .catch((error) => {
        console.error("Error deleting seminar:", error);
        showToastMessage(error.response?.data?.message|| "Error", "error");
      });
  };

  return (
    <section>
      <div className="flex items-center justify-between">
        <h1>Seminar Management</h1>
        <label
          htmlFor="seminar-drawer"
          className="btn btn-primary btn-xs"
          onClick={() => setEditSeminar(null)}
        >
          Add
        </label>
      </div>
      <div className="drawer drawer-end">
        <input id="seminar-drawer" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content card card-bordered">
          <div className="card p-2 shadow-xl border border-gray-800 overflow-auto">
            <table className="table table-zebra table-auto">
              <thead>
                <tr>
                  <th>#</th>
                  <th>ID</th>
                  <th>Speaker</th>
                  <th>Title</th>
                  <th>Description</th>
                  <th>Date</th>
                  <th>Time</th>
                  <th>Venue</th>
                  <th>Slots Remaining</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {seminars.length === 0 ? (
                  <tr>
                    <td colSpan="99" className="text-center">No seminars available</td>
                  </tr>
                ) : (
                  seminars.map((seminar, index) => (
                    <tr key={seminar._id} className="hover">
                      <td>{index + 1}</td>
                      <td>{seminar._id}</td>
                      <td>{seminar.speaker ? seminar.speaker.name : "No speaker assigned"}</td>
                      <td>{seminar.title}</td>
                      <td>{seminar.description}</td>
                      <td>{formatDate(seminar.date)}</td>
                      <td>{seminar.timeFrame ? formatTime(seminar.timeFrame.from) + " - " + formatTime(seminar.timeFrame.to) : "No time frame available"}</td>
                      <td>{seminar.venue}</td>
                      <td>{seminar.slotsAvailable}</td>
                      <td>
                        <span className="row flex gap-2">
                          <button
                            className="btn btn-warning btn-xs"
                            onClick={() => {
                              setEditSeminar(seminar);
                              document.getElementById(
                                "seminar-drawer"
                              ).checked = true;
                            }}
                          >
                            Edit
                          </button>
                          <button
                            className="btn btn-error btn-xs"
                            onClick={() => handleDelete(seminar._id)}
                          >
                            Delete
                          </button>
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        <div className="drawer-side fixed inset-0 z-50">
          <label
            htmlFor="seminar-drawer"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <div className="bg-base-100 h-fit w-1/4">
            <SeminarForm
              seminar={editSeminar}
              onSave={editSeminar ? handleUpdate : handleCreate}
              onCancel={() => {
                document.getElementById("seminar-drawer").checked = false;
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default SeminarManagement;
