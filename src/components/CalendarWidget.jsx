import React, { useState, useEffect } from "react";
import { compareAsc, format } from 'date-fns'   

const CalendarWidget = () => {
  const [date, setDate] = useState([]);

  useEffect(() => {
    const timer = setInterval(() => { 
      const formattedDate = format(new Date(), `kk:mm:ss MM/dd/yyyy`)
      const dateString = JSON.stringify(formattedDate).substring(1, JSON.stringify(formattedDate).length -1 )
      setDate(dateString.split(' '))
    }, 1000);
    return () => clearInterval(timer);
  });


  return (
    <div className="text-center glass p-3 d-flex flex-column align-items-center" style={{width: "17rem"}}>
      <p
        className="mb-0"
        style={{fontSize: "4rem"}}
      >
        {date[0]}
      </p>
      <p>{date[1]}</p>
    </div>
  );
};

export default CalendarWidget;

