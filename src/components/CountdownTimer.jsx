import { useState, useEffect } from "react";

const CountdownTimer = ({ seminarDate, seminarTime }) => {
  const [countdown, setCountdown] = useState({
    days: "00",
    hours: "00",
    minutes: "00",
    seconds: "00",
  });

  // Calculate countdown based on seminar date and time
  const calculateCountdown = () => {
    const seminarDateTimeString = `${seminarDate}T${seminarTime}:00`;
    const seminarDateTime = new Date(seminarDateTimeString);

    if (isNaN(seminarDateTime)) return;

    const currentTime = new Date();
    const timeDifference = seminarDateTime - currentTime;

    if (timeDifference > 0) {
      const days = String(Math.floor(timeDifference / (1000 * 60 * 60 * 24))).padStart(2, "0");
      const hours = String(Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))).padStart(2, "0");
      const minutes = String(Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60))).padStart(2, "0");
      const seconds = String(Math.floor((timeDifference % (1000 * 60)) / 1000)).padStart(2, "0");
      setCountdown({
        days,
        hours,
        minutes,
        seconds,
      });
    } else {
      setCountdown({
        days: "00",
        hours: "00",
        minutes: "00",
        seconds: "00",
      });
    }
  };

  // Update the countdown every second
  useEffect(() => {
    const interval = setInterval(() => {
      calculateCountdown();
    }, 1000);
    return () => clearInterval(interval);
  }, [seminarDate, seminarTime]);

  return (
    <div className="items-center justify-center w-full">
      <div className="grid grid-flow-col gap-5 text-center auto-cols-max">
        <div className="flex flex-col p-2 bg-neutral rounded-box text-neutral-content">
          <span className="countdown font-mono text-5xl">{countdown.days}</span>
          days
        </div>
        <div className="flex flex-col p-2 bg-neutral rounded-box text-neutral-content">
          <span className="countdown font-mono text-5xl">{countdown.hours}</span>
          hours
        </div>
        <div className="flex flex-col p-2 bg-neutral rounded-box text-neutral-content">
          <span className="countdown font-mono text-5xl">{countdown.minutes}</span>
          min
        </div>
        <div className="flex flex-col p-2 bg-neutral rounded-box text-neutral-content">
          <span className="countdown font-mono text-5xl">{countdown.seconds}</span>
          sec
        </div>
      </div>
    </div>
  );
};

export default CountdownTimer;
