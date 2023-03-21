import { Col, Spinner } from 'react-bootstrap';


function NewsPlaceholder(props) {
    const displayError =
        <Col className='p-4 d-flex justify-content-center flex-column text-center'>
            <h3>Whoops!</h3>
            We're unable to fetch you the latest news. :(
        </Col>

    const displaySpinner =
        <Col className='p-4 d-flex justify-content-center align-items-center'>
            <Spinner animation="border" size='xl' style={{ width: '5rem', height: '5rem' }} />
        </Col>

    if (props.apiFailCounter >= 3) {
        return displayError;
    }
    else {
        return displaySpinner;
    }
}

export default NewsPlaceholder;