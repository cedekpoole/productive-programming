import { Card, Button} from 'react-bootstrap'
import { useEffect, useState } from 'react'
import { Howl } from 'howler'

import timerMP3 from '../media/timer-sound.mp3'

let timerSound = new Howl({
  src: [ timerMP3 ],
})

const TimerWidget = () => {

  const [time, setTime] = useState(1500);
  const [startTimer, setStartTimer] = useState(false);


  const toggleTimer = () => {
    setStartTimer(!startTimer);
  };

  const resetTimer = () => {
    setTime(1500);
    setStartTimer(false);
  }

  useEffect(() => {
    const i = setInterval(() => {
      if (startTimer) {
        if (time > 0) {
          setTime(time - 1)
        } else if (time === 0) {
          clearInterval(i);
          timerSound.play()
        }
      }
    }, 1000);
    return () => clearInterval(i);
    // every time startTimer or time change, re-run the interval until either toggled off or time === 0
  }, [startTimer, time]); 

    return (
        <div>
        <Card className="bg-dark" style={{ width: '18rem' }}>
      <Card.Body>
        <Card.Title className="text-light">Pomodoro Timer</Card.Title>
        <Card.Text className="text-light">
          {`${Math.floor(time / 60) < 10 ? `0${Math.floor(time / 60)}` : `${Math.floor(time / 60)}`
        }:${time % 60 < 10 ? `0${time % 60}` : time % 60}`}
        </Card.Text>
        <Button variant="primary" className="me-2" onClick={toggleTimer}>{startTimer ? "Pause" : "Start"} </Button>
        <Button variant="danger" onClick={() => resetTimer()}>Reset</Button>
      </Card.Body>
    </Card>
    </div>
    );
};

export default TimerWidget;