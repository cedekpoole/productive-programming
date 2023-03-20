import Timer from "../components/TimerWidget";
import Astronomy from "../utils/AstronomyAPI";
import { useState } from "react";
import { BsFillPlayCircleFill } from "react-icons/bs";
import { BsPauseCircleFill } from "react-icons/bs";
import { Container, Row, Col, Card } from "react-bootstrap";
import Quote from '../utils/ZenQuotesAPI';

import { Howl } from "howler";
import studyMP3 from "../media/study-music.mp3";

const studyMusic = new Howl({
  src: [studyMP3],
});

const Study = () => {
  const [playMusic, setPlayMusic] = useState(false);

  const toggleMusic = () => setPlayMusic(!playMusic);

  playMusic ? studyMusic.play() : studyMusic.pause();

  return (
    <Container>
      <h1 className="display-3 text-light mb-3 mt-2">Study Lounge</h1>
      <hr className="text-light"></hr>
      <Row className="text-center">
        <Col xs={12} md={5} className="mb-2 border-end border-white">
          <Row>
            <Col className="mb-3 d-flex justify-content-center">
              <Timer />
            </Col>
            <Col className="d-flex justify-content-center">
              <div className="glass" style={{ width: "18rem" }}>
                <Card
                  className=" text-light p-1 bg-transparent border-0"
                  style={{ width: "18rem" }}
                >
                  <Card.Body>
                    <Card.Title className="mb-0">Music to Focus</Card.Title>
                    <Card.Text style={{ fontSize: "2rem" }}>
                      <span onClick={toggleMusic}>
                        {playMusic ? (
                          <BsPauseCircleFill role="button" />
                        ) : (
                          <BsFillPlayCircleFill role="button" />
                        )}
                      </span>
                    </Card.Text>
                  </Card.Body>
                </Card>
              </div>
            </Col>
          </Row>
        </Col>
        <Col xs={12} md={7} className="d-flex justify-content-center">
          <Astronomy />
        </Col>
      </Row>
      <Quote />
    </Container>
  );
};

export default Study;
