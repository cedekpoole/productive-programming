import NewsWidget from '../components/NewsWidget'
import CreateNote from '../components/NoteComponents/CreateNote'
import StackOverflowWidget from '../components/StackOverflowWidget'
import TimerWidget from '../components/TimerWidget'
import WeatherWidget from '../components/WeatherWidget'
import { Container, Row, Col } from 'react-bootstrap'


function Home() {

    return (
        <div className="Home">
            <Container>
                <Row>
                <Col>
                    <Row>
                        <Col>
                        <WeatherWidget />
                        </Col>
                        <Col>
                        <TimerWidget />
                        </Col>
                    </Row>
                </Col>
                <Col>
                <CreateNote />
                </Col>
                </Row>
                <Row>
                    <Col>
                    <NewsWidget />
                    </Col>
                    <Col>
                    <StackOverflowWidget />
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default Home
