import Timer from "../components/TimerWidget";
import axios from "axios";
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
  const [data, setData] = useState([]);
  const [playMusic, setPlayMusic] = useState(false);

  useEffect(() => {
    axios
      .get(
        "https://api.nasa.gov/planetary/apod?api_key=AJ6cjvyNYD3HWl9hXYRk9MGUb0mSJLNDhf694BWj"
      )
      .then((response) => {
        setData(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const toggleMusic = () => setPlayMusic(!playMusic);

  if (playMusic) {
    studyMusic.play();
  } else {
    studyMusic.pause();
  }

  return (
    <div>
      <h1 className="display-1 text-center mb-4">
        Study Lounge <GrLounge />
      </h1>
      <Container fluid>
        <Row>
          <Col
            xs={12}
            md={3}
            className="d-flex  align-items-center flex-column mb-2"
          >
            <Timer />
            <Card className="mt-4 bg-dark text-light">
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
            <Card className="h-100" style={{ width: "80%" }}>
              <div>
                <Card.Img
                  variant="top"
                  src={data.hdurl}
                  alt=""
                  className="img-fluid"
                />
                <Card.Body>
                  <Card.Title>Astronomy Picture of the day</Card.Title>
                  <Card.Text style={{ fontSize: "16px" }}>
                    {data.explanation}
                  </Card.Text>
                </Card.Body>
              </div>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Study;
