import React, { useState, useEffect } from "react";

const CalendarWidget = () => {
  var [date, setDate] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setDate(new Date()), 1000);
    return () => clearInterval(timer);
  });

  return (
    <div className="text-center glass p-3 d-flex flex-column align-items-center" style={{height: "100%"}}>
      {/* <p className="border rounded p-2 text-light">{date.toLocaleDateString()}</p> */}
      <p
        className="mt-auto mb-0"
        style={{fontSize: "3rem"}}
      >
        {date.toLocaleTimeString()}
      </p>
      <p className="mb-auto">{date.toLocaleDateString()}</p>
    </div>
  );
};

export default CalendarWidget;
