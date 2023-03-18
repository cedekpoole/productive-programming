import { Card, ListGroup } from 'react-bootstrap'

function StackOverflowCard(props) {
    return (
      <Card>
        <ListGroup>
            <ListGroup.Item>{props.num}</ListGroup.Item>
            <ListGroup.Item>{props.title}</ListGroup.Item>
            <ListGroup.Item>{props.answered ? "ANSWERED" : "NOT ANSWERED"}</ListGroup.Item>
        </ListGroup>
      </Card>
    );
  }
  
  export default StackOverflowCard;
  

