import { Card, Button } from "react-bootstrap";
import { useEffect, useState } from "react";

// import howler - makes working with audio easier
import { Howl } from "howler";
// react icon
import { FiClock } from "react-icons/fi";
// import sfx that will be played at end of timer
import timerMP3 from "../media/timer-sound.mp3";

// make sound new instance of Howl
let timerSound = new Howl({
  src: [timerMP3],
});

const TimerWidget = () => {
  // Set the starting time to 25mins
  const [time, setTime] = useState(1500);
  const [startTimer, setStartTimer] = useState(false);

  const toggleTimer = () => {
    setStartTimer(!startTimer);
  };

  const resetTimer = () => {
    setTime(1500);
    setStartTimer(false);
  };

  const breakTime = () => {
    setTime(300);
    setStartTimer(false);
  };

  // Using setInterval, allow the timer to count down
  // If time is more than 0, set the time to the current time - 1 every second
  // If the time === 0, stop the interval and play the 'time up' sound
  useEffect(() => {
    const i = setInterval(() => {
      if (startTimer) {
        if (time > 0) {
          setTime(time - 1);
        } else if (time === 0) {
          clearInterval(i);
          timerSound.play();
        }
      }
    }, 1000);
    return () => clearInterval(i);
    // every time startTimer or time change, re-run the interval until either toggled off or time === 0
  }, [startTimer, time]);

  return (
    <div className="text-center glass text-dark p-3" style={{ width: "19rem" }}>
        <Card.Body className="bg-transparent">
          <Card.Title>
            <FiClock className="mb-2" /> <br />
            Pomodoro Timer
          </Card.Title>
          <Card.Text style={{fontSize: "20px"}}>
            {/* place time into an easy-to-read format */}
            {`${
              Math.floor(time / 60) < 10
                ? `0${Math.floor(time / 60)}`
                : `${Math.floor(time / 60)}`
            }:${time % 60 < 10 ? `0${time % 60}` : time % 60}`}
          </Card.Text>
          <Button className="me-2" onClick={toggleTimer} style={{backgroundColor: "rgb(56 20 195 / 80%)", border: "1px solid #6444e3"}}>
            {startTimer ? "Pause" : "Start"}
          </Button>
          <Button variant="danger" onClick={() => resetTimer()}>
            Reset
          </Button>
          <Button
            variant="success"
            className="ms-2"
            onClick={() => breakTime()}
          >
            Break
          </Button>
        </Card.Body>
    </div>
  );

};

export default TimerWidget;
