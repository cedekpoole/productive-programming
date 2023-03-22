import { useState } from "react";
import { BsFillPlayCircleFill } from "react-icons/bs";
import { BsPauseCircleFill } from "react-icons/bs";
import { Container, Row, Col, Card } from "react-bootstrap";

// Import API and timer components
import Astronomy from "../utils/AstronomyAPI";
import Quote from "../utils/ZenQuotesAPI";
import Timer from "../components/TimerWidget";

// Use Howler for audio
import { Howl } from "howler";
import studyMP3 from "../media/study-music.mp3";

const studyMusic = new Howl({
  src: [studyMP3],
});

// Structure the study page
const Study = () => {
  const [playMusic, setPlayMusic] = useState(false);

  const toggleMusic = () => setPlayMusic(!playMusic);

  playMusic ? studyMusic.play() : studyMusic.pause();

  return (
    <Container className="study-container">
      <h1 className="my-3">Study Lounge</h1>
      <hr className="text-light"></hr>
      <Row className="text-center">
        <Col xs={12} md={5} className="mb-2 border-end border-white study-time-music">
          <Row style={{flexDirection: "column"}}>
            <Col className="mb-3 d-flex justify-content-center">
              {/* Use timer component */}
              <Timer />
            </Col>
            <Col className="d-flex justify-content-center">
                <div
                  className="glass p-3"
                  style={{ width: "17rem" }}
                >
                  <Card.Body>
                    <Card.Title className="mb-0">Music to Focus</Card.Title>
                    <Card.Text style={{ fontSize: "2rem" }}>
                      {/* When icon is clicked, toggle the music and change icon to 
                      corresponding state */}
                      <span onClick={toggleMusic}>
                        {playMusic ? (
                          <BsPauseCircleFill role="button" />
                        ) : (
                          <BsFillPlayCircleFill role="button" />
                        )}
                      </span>
                    </Card.Text>
                  </Card.Body>
                </div>
            </Col>
          </Row>
        </Col>
        <Col xs={12} md={7} className="d-flex justify-content-center">
          <Astronomy />
        </Col>
      </Row>
      <div className="glass">
      <Quote />
      </div>
    </Container>
  );
};

export default Study;
