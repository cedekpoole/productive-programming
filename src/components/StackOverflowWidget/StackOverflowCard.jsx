import { Card, ListGroup, Container, Row, Col } from "react-bootstrap";

// using props, create a generic stackoverflow card
// that will store data for each element of the data received
function StackOverflowCard(props) {
  const tags = props.tags;

  // Structure and style the stackoverflow card
  return (
    <Container>
      <Row className="border border-light rounded bg-dark" style={{ color: "#3993DD" }}>
        <Col xs={3} className="text-center border" style={{ fontSize: "12px" }}>
          <p className="mt-2 mb-1">
            <span style={{ fontSize: "16px" }}>{props.votes}</span>
            <br />
            votes
          </p>
          <p className="mb-1">
            <span style={{ fontSize: "16px" }}>{props.answers}</span>
            <br />
            answers
          </p>
          <p>{`${props.views} views`}</p>
        </Col>
        <Col xs={6}>
          <a href={props.link} style={{ textDecoration: "none" }} target="_blank">
            <h6 className="mt-3 mb-3">{props.title}</h6>
          </a>
          {tags.map((element) => (
            <p
              key={element}
              className="me-3 text-light p-1 rounded"
              style={{ display: "inline-block", backgroundColor: "#6A6B83" }}
            >
              {element}
            </p>
          ))}
        </Col>
        <Col className="d-flex align-content-end flex-wrap mb-3" xs={3}>
          <img
            className="inline-block me-2"
            style={{ width: "32px", height: "32px" }}
            src={props.image}
          />
          <p style={{ fontSize: "14px" }}>{props.user}</p>
        </Col>
      </Row>
    </Container>
  );
}

export default StackOverflowCard;
