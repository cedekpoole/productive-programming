import NewsWidget from '../components/NewsWidget/NewsWidget'
import CreateNote from '../components/NoteComponents/CreateNote'
import StackOverflowWidget from '../components/StackOverflowWidget/StackOverflowWidget'
import TimerWidget from '../components/TimerWidget'
import WeatherWidget from '../components/WeatherWidget'
import { Container, Row, Col } from 'react-bootstrap'
import ToDoWidget from '../components/ToDoComponents/ToDoWidget'
import CalendarWidget from '../components/CalendarWidget'


function Home() {
    const handleSave = (newNote) => {
        const storedNotes = JSON.parse(localStorage.getItem("notes")) || [];
        const updatedNotes = [...storedNotes, newNote];
        localStorage.setItem("notes", JSON.stringify(updatedNotes));
    };

    return (
        <div className="Home mt-3">
            <Container>
                <Row>
                    <Col>
                        <Row>
                            <Col xs={12} className="mb-3">
                                <WeatherWidget />
                            </Col>
                            <Col xl={6} className="mb-3">
                                <TimerWidget />
                            </Col>
                            <Col xl={6} className="mb-3">
                                <CalendarWidget />
                            </Col>
                        </Row>
                    </Col>
                    <Col>
                        <Row className="stackedCol gap-4">
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
                    <Col xl={6}>
                        <NewsWidget />
                    </Col>
                    <Col xl={6}>
                        <StackOverflowWidget />
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default Home
