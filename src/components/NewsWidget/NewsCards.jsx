import { Card, Button, Col, Row } from 'react-bootstrap';

function NewsCards(props) {
    const resultsArray = props.searchResults.map((result, i) => {

        const headline = result.name;
        const source = result.provider[0].name;
        const sourceIconURL = "image" in result.provider[0] ? result.provider[0].image.thumbnail.contentUrl : "";
        const description = result.description;
        const imageURL = "image" in result ? result.image.thumbnail.contentUrl : "https://placehold.co/400x400?text=No+Image";
        const articleURL = result.url;

        return (
            <div className="pane border-bottom p-3" key={i}>
                <Row className='newsCard'>
                    <Col xs={3} className='square m-0'><a href={articleURL}>
                        <img className='newsThumbnail' src={imageURL} /></a>
                    </Col>
                    <Col>
                        <a href={articleURL}>
                            <Card.Title className="mb-1 lead" style={{ fontWeight: '600' }}>{headline}</Card.Title>
                        </a>

                        <Card.Text className="mb-2 articleText">{description} </Card.Text>
                        <Card.Text className="mb-0 small text-muted">
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
                <Button variant="primary" onClick={props.loadMoreNews}>Load More</Button>
            </div>

        </div>
    );
};

export default NewsCards;