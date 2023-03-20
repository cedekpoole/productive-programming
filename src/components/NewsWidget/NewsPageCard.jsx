import { Card, Container } from 'react-bootstrap';

function NewsPageCard() {

    return (
        <Card>
            <a href="#">
                <Card.Img src="https://placehold.co/600x400" />
                <Card.Body>
                    <Card.Title>
                        <h5>Lorem ipsum dolor sit amet.</h5>
                    </Card.Title>
                    <Card.Text>
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab accusantium ad alias, aliquid amet aspernatur atque culpa cum debitis dicta doloremque, dolorum ea eos et excepturi explicabo facilis harum illo impedit incidunt laborum laudantium...
                    </Card.Text>
                    <Card.Text>
                  <small className="text-muted">sources</small>
                </Card.Text>
                </Card.Body>
            </a>
        </Card>
    )
}
export default NewsPageCard;