import { Card, Button, Col, Row } from 'react-bootstrap';
import { FaRegNewspaper } from 'react-icons/fa'

function NewsCards(props) {
    const resultsArray = props.searchResults.map((result, i) => {

        const headline = result.name;
        const source = result.provider[0].name;
        const sourceIconURL = "image" in result.provider[0] ? result.provider[0].image.thumbnail.contentUrl : "";
        const description = result.description;
        const imageURL = "image" in result ? result.image.thumbnail.contentUrl : "";
        const articleURL = result.url;

        const articleImage = <img className='newsThumbnail' src={imageURL} />;
        const placeholderImage = <div className='d-flex justify-content-center align-items-center h-100'> <FaRegNewspaper style={{width: '3rem', height: '3rem', textDecoration: 'none' }}/></div>

        return (
            <div className="newsWidgetCard pane my-2 p-3" key={i}>
                <Row className='newsCard'>
                    {/* <Col xs={3} className='square m-0'><a href={articleURL}>
                        {imageURL ? articleImage : placeholderImage}
                        </a>
                    </Col> */}
                    <Col>
                        <a href={articleURL}>
                            <Card.Title className="mb-1 lead" style={{ fontWeight: '600' }}>{headline}</Card.Title>
                        </a>

                        <Card.Text className="mb-2 articleText">{description} </Card.Text>
                        <Card.Text className="mb-0 small">
                            <img src={sourceIconURL} style={{ width: "1.5rem" }} /> &nbsp;
                            {source}</Card.Text>
                    </Col>
                </Row>
            </div>
        )
    });

    return (
        <div className='newsScrollWrapper'>
            {resultsArray}
            <div className='d-flex justify-content-center pt-3'>
            <button className="loadMoreButton" onClick={props.loadMoreNews}>Load More</button>
            </div>

        </div>
    );
};

export default NewsCards;