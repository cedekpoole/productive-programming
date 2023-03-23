import React, { useState, useEffect } from "react";

// import package that formats date and time
import { format } from "date-fns";

const CalendarWidget = () => {
  const [date, setDate] = useState([]);

  // set an interval where every time a second goes by, set the new time and date in the date array
  useEffect(() => {
    const timer = setInterval(() => {
      // use date-fns to format current date
      const formattedDate = format(new Date(), `kk:mm:ss MM/dd/yyyy`);
      // turn date into a string and remove the quotes at beginning and end
      const dateString = JSON.stringify(formattedDate).substring(
        1,
        JSON.stringify(formattedDate).length - 1
      );
      // split the date and time into different elements and place them into array
      setDate(dateString.split(" "));
    }, 1000);
    return () => clearInterval(timer);
  });

  return (
    <div
      className="text-center glass p-3 d-flex flex-column align-items-center"
      style={{ height: "100%" }}
    >
      <p className="mt-auto mb-0" style={{ fontSize: "3rem" }}>
        {date[0]}
      </p>
      <p className="mb-auto">{date[1]}</p>
    </div>
  );
};

export default CalendarWidget;
