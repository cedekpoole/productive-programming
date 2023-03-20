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
        const placeholderImage = <FaRegNewspaper style={{ width: '3rem', height: '3rem', textDecoration: 'none' }} />

        return (
            <Card key={i}>
                <a href="#">
                {imageURL ? articleImage : placeholderImage}
                    <Card.Body>
                        <Card.Title>
                          {headline}
                        </Card.Title>
                        <Card.Text>
                        {description}                          
                        </Card.Text>
                        <Card.Text>
                            <small className="text-muted"><img src={sourceIconURL} style={{ width: "1.5rem" }} /> &nbsp;{source}</small>
                        </Card.Text>
                    </Card.Body>
                </a>
            </Card>
        )


    })

    return (
        <ResponsiveMasonry
            columnsCountBreakPoints={{ 350: 1, 750: 2, 900: 3 }}>
            <Masonry gutter="15px">
                {resultsArray}
            </Masonry>
        </ResponsiveMasonry>
    )
}

export default NewsPageCards;