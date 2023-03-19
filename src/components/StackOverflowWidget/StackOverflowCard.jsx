import { Card, ListGroup, Container, Row, Col } from "react-bootstrap";

function StackOverflowCard(props) {
  const tags = props.tags
  return (
    <Container>
      <Row className="border border-right-0 border-light " style={{color: "#3993DD"}}>
        <Col xs={3} className="text-center" style={{fontSize: "12px"}}>
          <p className="mt-2 mb-1"><span style={{fontSize: "16px"}}>{props.votes}</span><br />votes</p>
          <p className="mb-1"><span style={{fontSize: "16px"}}>{props.answers}</span><br />answers</p>
          <p>{`${props.views} views`}</p>
        </Col>
        <Col xs={6}>
          <a href={props.link} style={{textDecoration: "none"}}><h6 className="mt-3 mb-3">{props.title}</h6></a>
          {tags.map(element => (
            <p className="me-4 text-light p-1 rounded" style={{display: "inline-block", backgroundColor: "#6A6B83"}}>{element}</p>
          ))}
        </Col>
        <Col className="d-flex align-content-end mt-3" xs={3}>
            <img className="inline-block me-2" style={{width: "32px", height: "32px"}} src={props.image}/>
            <p>{props.user}</p>

        </Col>
      </Row>
    </Container>
  );
}

export default StackOverflowCard;

