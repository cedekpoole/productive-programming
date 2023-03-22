import React, { useState, useEffect } from "react";
import { compareAsc, format } from 'date-fns'   

const CalendarWidget = () => {
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => { 
      setDate(format(new Date(), `kk:mm:ss MM/dd/yyyy`))
    }, 1000);
    return () => clearInterval(timer);
  });

  const dateString = JSON.stringify(date).substring(1, JSON.stringify(date).length -1 )
  const dateArr = dateString.split(' ')
 

  return (
    <div className="text-center glass p-3 d-flex flex-column align-items-center" style={{width: "17rem"}}>
      <p
        className="mb-0"
        style={{fontSize: "4rem"}}
      >
        {dateArr[0]}
      </p>
      <p>{dateArr[1]}</p>
    </div>
  );
};

export default CalendarWidget;
