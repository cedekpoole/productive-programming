import React, { useState, useEffect } from "react";

const CalendarWidget = () => {
  var [date, setDate] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setDate(new Date()), 1000);
    return () => clearInterval(timer);
  });

  return (
    <div className="text-center glass p-3 d-flex flex-column align-items-center" style={{width: "17rem"}}>
      {/* <p className="border rounded p-2 text-light">{date.toLocaleDateString()}</p> */}
      <p
        className="mb-0"
        style={{fontSize: "4rem"}}
      >
        {date.toLocaleTimeString()}
      </p>
      <p>{date.toLocaleDateString()}</p>
    </div>
  );
};

export default CalendarWidget;
