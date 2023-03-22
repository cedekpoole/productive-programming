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
            <Container className="py-4">
                <Row className="gap-4">
                    <Row className="gap-4 mobile-col">
                        <Col>
                            <Row className="gap-4">
                                <Col xs={12} >
                                    <WeatherWidget />
                                </Col>
                                <Col>
                                    <Row className="gap-4 mobile-col">
                                        <Col>
                                            <TimerWidget />
                                        </Col>
                                        <Col>
                                            <CalendarWidget />

                                        </Col>
                                    </Row>
                                </Col>

                            </Row>
                        </Col>
                        <Col>
                            <NewsWidget />
                        </Col>
                    </Row>
                    <Row className="gap-4 mobile-col">
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
                        <Col>
                            <StackOverflowWidget />
                        </Col>
                    </Row>
                </Row>
            </Container>
        </div>
    )
}

export default Home

