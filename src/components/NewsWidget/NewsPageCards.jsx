import { Card, Button, Col, Row } from 'react-bootstrap';
import { FaRegNewspaper } from 'react-icons/fa'
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry"



function NewsPageCards(props) {
    const resultsArray = props.searchResults.map((result, i) => {
        const headline = result.name;
        const source = result.provider[0].name;
        const sourceIconURL = "image" in result.provider[0] ? result.provider[0].image.thumbnail.contentUrl : "";
        const description = result.description;
        const imageURL = "image" in result ? result.image.thumbnail.contentUrl : "";
        const articleURL = result.url;

        const articleImage = <Card.Img src={imageURL} />;
        const placeholderImage = <div style={{ width: "100%", height: "12rem", background: "mediumpurple" }} className="d-flex justify-content-center align-items-center">
            <FaRegNewspaper style={{ width: '3rem', height: '3rem', textDecoration: 'none' }} />
        </div>
        return (
            <Card key={i}>
                {imageURL ? articleImage : placeholderImage}
                <Card.Body>
                    <Card.Title>
                        <a href={articleURL}>
                            {headline}
                        </a>
                    </Card.Title>
                    <Card.Text>
                        {description}
                    </Card.Text>
                    <Card.Text>
                        <small className="text-muted"><img src={sourceIconURL} style={{ width: "1.5rem" }} /> &nbsp;{source}</small>
                    </Card.Text>
                </Card.Body>
            </Card>
        )


    })

    return (
        <ResponsiveMasonry
            columnsCountBreakPoints={{ 350: 1, 750: 2, 900: 4 }} 
            className="mt-3">
            <Masonry gutter="15px">
                {resultsArray}
            </Masonry>
        </ResponsiveMasonry>
    )
}

export default NewsPageCards;