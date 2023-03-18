import { Card, ListGroup } from "react-bootstrap";

function StackOverflowCard(props) {
  return (
    <Card>
      <ListGroup className="d-flex flex-row justify-content-between">
        <ListGroup.Item>{props.num}</ListGroup.Item>
        <a href={props.link} target="_blank"><ListGroup.Item className="border-0">{props.title}</ListGroup.Item></a>
        <ListGroup.Item className="border-0">
          {props.answered ? <span className="text-success">ANSWERED</span> : <span className="text-danger">NOT ANSWERED</span>}
        </ListGroup.Item>
      </ListGroup>
    </Card>
  );
}

export default StackOverflowCard;
