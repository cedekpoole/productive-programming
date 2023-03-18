import Timer from "../components/TimerWidget";
import Astronomy from "../components/AstronomyAPI"
import { useState, useEffect } from "react";
import { GrLounge } from "react-icons/gr";
import { BsFillPlayCircleFill } from "react-icons/bs";
import { BsPauseCircleFill } from "react-icons/bs";
import { Container, Row, Col, Card } from "react-bootstrap";

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
    <div>
      <h1 className="display-1 text-light text-center mb-4">
        Study Lounge <GrLounge />
      </h1>
      <Container fluid>
        <Row>
          <Col
            xs={12}
            md={3}
            className="d-flex align-items-center flex-column mb-2"
          >
            <Timer />
            <Card className="mt-4 bg-dark text-light text-center">
              <Card.Body>
                <Card.Title className="mb-0">Music to Focus</Card.Title>
                <Card.Text style={{ fontSize: "2rem" }} onClick={toggleMusic}>
                  {playMusic ? (
                    <BsPauseCircleFill role="button" />
                  ) : (
                    <BsFillPlayCircleFill role="button" />
                  )}
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col xs={12} md={9} className="d-flex justify-content-center">
            <Astronomy />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Study;
