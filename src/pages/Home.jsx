import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Axios from "axios";
import Carousel from "../components/Carousel";
import Hero from "../components/Hero";

const Home = () => {
  const [seminars, setSeminars] = useState([]);

  const fetchSeminars = async () => {
    try {
      const response = await Axios.get(
        "https://zzzemina-api.vercel.app/api/seminars/featured/10",
        {
          withCredentials: true,
        }
      );
      const data = response.data || [];
      setSeminars(data);
    } catch (error) {
      console.log("Error fetching seminars", error);
    }
  };

  useEffect(() => {
    fetchSeminars();
  }, []);

  return (
    <>
      <div className="max-h-screen h-full flex flex-col items-center">
        <Hero />
      </div>
      <div className="h-fit w-full flex flex-col items-center">
        <h1 className="h1 text-4xl mt-10 mb-10">Featured Seminars</h1>
        <Carousel seminars={seminars} />
      </div>
      <div className="h-fit w-full flex flex-col items-center m-10">
        <span className="text-3xl mt-10 mb-4">
          Looking for more?
        </span>
        <Link to="/browse_seminars" className="btn btn-wide btn-secondary">
          Browse...
        </Link>
      </div>
    </>
  );
};

export default Home;
