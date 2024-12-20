import { useState, useEffect } from "react";
import Axios from "axios";
import { formatDate, formatTime } from "../helpers/CustomHelpers";
import { useToast } from "../contexts/ToastContext";
import Card from "../components/Card";

const Seminars = () => {
  const [date, setDate] = useState("");
  const [timeFrom, setTimeFrom] = useState(""); // Time input will be in AM/PM format
  const [speaker, setSpeaker] = useState("");
  const [seminars, setSeminars] = useState([]); // Holds all seminars
  const [filteredSeminars, setFilteredSeminars] = useState([]); // Holds filtered seminars
  const { showToastMessage } = useToast();

  // Fetch all seminars initially
  useEffect(() => {
    Axios.get("https://zzzemina-api.vercel.app/api/seminars/available")
      .then((response) => {
        setSeminars(response.data);
        setFilteredSeminars(response.data); // Show all initially
      })
      .catch((error) => {
        console.error("Error fetching seminars:", error);
        showToastMessage(error.response?.data?.message || "Error", "error");
      });
  }, []);

  // Handle search functionality
  const handleSearch = () => {
    let filtered = seminars;
    if (date) {
      // Format both the seminar date and the input date for comparison
      filtered = filtered.filter(
        (seminar) => formatDate(seminar.date) === formatDate(date)
      );
    }
    // Filter only by timeFrom (AM/PM)
    if (timeFrom) {
      filtered = filtered.filter((seminar) => {
        // Get AM/PM part of the time
        const seminarTime = formatTime(seminar.timeFrame.from, "h:mm a"); // "h:mm a" format, AM/PM
        const timePart = seminarTime.split(" ")[1]; // Extract AM/PM part
        return timePart === timeFrom;
      });
    }
    if (speaker) {
      filtered = filtered.filter((seminar) =>
        seminar.speaker.name.toLowerCase().includes(speaker.toLowerCase())
      );
    }
    setFilteredSeminars(filtered);
    if (filtered.length === 0) {
      showToastMessage(
        "No seminars found for the given search criteria",
        "info"
      );
    }
  };

  // Handle clear functionality
  const handleClear = () => {
    setDate("");
    setTimeFrom("");
    setSpeaker("");
    setFilteredSeminars(seminars);
  };

  return (
    <section className="mt-4">
      <div className="card card-compact bg-base-300 skeleton border border-gray-800 mb-5 rounded-none shadow-2xl">
        <div className="card-body">
          <div className="flex flex-wrap gap-4 items-center justify-center">
            <div className="flex flex-col md:flex-row gap-2">
              <label className="w-full mt-1 md:w-10">Date:</label>
              <input
                className="input input-bordered input-sm w-full md:w-48"
                type="date"
                name="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </div>
            <div className="flex flex-col md:flex-row gap-2">
              <label className="w-full mt-1 md:w-20">Time of day:</label>
              <select
                className="input input-bordered input-sm w-full md:w-48"
                name="timeFrom"
                value={timeFrom}
                onChange={(e) => setTimeFrom(e.target.value)}
              >
                <option value="">Select</option>
                <option value="AM">AM</option>
                <option value="PM">PM</option>
              </select>
            </div>
            <div className="flex flex-col md:flex-row gap-2">
              <label className="w-full mt-1 md:w-14">Speaker:</label>
              <input
                className="input input-bordered input-sm w-full md:w-60"
                type="text"
                name="speaker"
                value={speaker}
                onChange={(e) => setSpeaker(e.target.value)}
              />
            </div>
            <div className="flex flex-col md:flex-row gap-2">
              <button
                className="btn btn-sm btn-primary w-full md:w-20"
                onClick={handleSearch}
              >
                Search
              </button>
              <button
                className="btn btn-sm btn-neutral w-full md:w-20"
                onClick={handleClear}
              >
                Clear
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap justify-center items-center gap-4">
        {filteredSeminars.map((seminar) => (
          <Card key={seminar._id} seminar={seminar} />
        ))}
      </div>
    </section>
  );
};

export default Seminars;
