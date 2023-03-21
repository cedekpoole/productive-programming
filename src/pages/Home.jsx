import NewsWidget from '../components/NewsWidget/NewsWidget'
import CreateNote from '../components/NoteComponents/CreateNote'
import StackOverflowWidget from '../components/StackOverflowWidget/StackOverflowWidget'
import TimerWidget from '../components/TimerWidget'
import WeatherWidget from '../components/WeatherWidget'
import { Container, Row, Col } from 'react-bootstrap'
import ToDoWidget from '../components/ToDoComponents/ToDoWidget'


function Home() {
    const handleSave = (newNote) => {
        const storedNotes = JSON.parse(localStorage.getItem("notes")) || [];
        const updatedNotes = [...storedNotes, newNote];
        localStorage.setItem("notes", JSON.stringify(updatedNotes));
    };

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
                        <Row className="stackedCol gap-2">
                            <Col>
                                <CreateNote saveHandler={handleSave} />
                            </Col>
                            <Col>
                                <ToDoWidget />
                            </Col>
                        </Row>
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
