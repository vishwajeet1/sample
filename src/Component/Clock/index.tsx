import React, { useEffect, useRef, useState } from "react";
import "Clock.css";
import { eventId } from "Component/Clock/constant";
import useClock from "Component/Clock/useClock";

const Clock = () => {
  const [seconds, setSeconds] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [inputTime, setInputTime] = useState("00:00");
  let clockMinRef = useRef<any>(null);
  let clockSecRef = useRef<any>(null);

  const onUpdate = (data: number, unit: "min" | "sec") => {
    if (unit === "min") {
      setMinutes(() => data);
    }
    if (unit === "sec") {
      setSeconds(() => data);
    }
  };
  useClock(onUpdate);

  useEffect(() => {
    const newTimeTOShow = formatTime(seconds, minutes);
    setInputTime(() => newTimeTOShow);
    if (clockMinRef.current) clearInterval(clockMinRef.current);
    if (clockSecRef.current) clearInterval(clockSecRef.current);
    clockMinRef.current = setInterval(() => {
      if (minutes >= 60) setMinutes(() => 0);
      else setMinutes((prevState) => prevState + 1);
    }, 1000 * 60);
    clockSecRef.current = setInterval(() => {
      if (seconds >= 60) setSeconds(() => 0);
      else setSeconds((prevState) => prevState + 1);
    }, 1000);
    return () => {
      if (clockMinRef.current) clearInterval(clockMinRef.current);
      if (clockSecRef.current) clearInterval(clockSecRef.current);
    };
  }, [minutes, seconds]);

  const validationOnInput = (value: number) => {
    return value % 60 || 0;
  };
  const handleInputChange = (event: any) => {
    const value = event.target.value;
    setInputTime(value);
    const [newMinutes, newSeconds] = value
      .split(":")
      .map((part: any) => parseInt(part));
    setMinutes(() => validationOnInput(newMinutes));
    setSeconds(() => validationOnInput(newSeconds));
  };

  const handleMinInputChange = (event: any) => {
    const value = event.target.value;
    setMinutes(() => validationOnInput(parseInt(value)));
  };
  const handleSecInputChange = (event: any) => {
    const value = event.target.value;
    setSeconds(() => validationOnInput(parseInt(value)));
  };

  const formatTime = (second: any, minutes: any) => {
    const formattedSeconds = second < 10 ? `0${second}` : second.toString();
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes.toString();
    return `${formattedMinutes}:${formattedSeconds}`;
  };

  return (
    <div className="container">
      <div className="clockWithTimeContainer">
        <div className="clockContainerClass" id={eventId.clockContainer}>
          <div
            className="secondHandClass clockHand"
            id="clockSecondHand"
            style={{ transform: `rotate(${seconds * 6}deg)` }}
          ></div>
          <div
            id={eventId.clockMinHand}
            className="clockHand minuteHandClass"
            style={{ transform: `rotate(${minutes * 6}deg)` }}
          ></div>
        </div>
        <div className="flex justify-center items-center">
          <div>
            <input
              className="inputBox"
              type="text"
              value={minutes}
              onChange={handleMinInputChange}
            />
            <div className="text-center">Minutes</div>
          </div>
          :
          <div>
            <input
              className="inputBox"
              type="text"
              value={seconds}
              onChange={handleSecInputChange}
            />
            <div className="text-center">Seconds</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Clock;
