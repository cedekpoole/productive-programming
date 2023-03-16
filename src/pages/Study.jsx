import Timer from '../components/TimerWidget'
import axios from 'axios'
import { useState, useEffect } from 'react'
import { GrLounge } from 'react-icons/gr'
import {Container, Row, Col, Card} from 'react-bootstrap'

const Study = () => {
    const [data, setData] = useState([]);
    
    useEffect(() => {
        axios.get('https://api.nasa.gov/planetary/apod?api_key=AJ6cjvyNYD3HWl9hXYRk9MGUb0mSJLNDhf694BWj')
        .then(response => {
            setData(response.data);
        })
        .catch(err => {
            console.log(err);
        });
    }, [])

    return (
        <div>
            <h1 className="display-1 text-center">Study Lounge <GrLounge /></h1>
            <Container fluid>
                <Row>
                    <Col xs={12} md={3} className="d-flex justify-content-center mb-2"><Timer /></Col>
                    <Col xs={12} md={9}>
                        <Card className="h-100" style={{width: "50%"}}>
                            <div>
                            <Card.Img
                                variant="top"
                                src={data.hdurl}
                                alt=""
                                className="img-fluid"
                            />
                            <Card.Body>
                                <Card.Title>Astronomy Picture of the day</Card.Title>
                                <Card.Text>{data.explanation}</Card.Text>
                            </Card.Body>
                            </div>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default Study;