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

        const articleImage = <Card.Img src={imageURL} className="mb-2" style={{borderRadius: "15px" }} />;
        const placeholderImage = <div style={{ width: "100%", height: "12rem", background: "mediumpurple", borderRadius: "15px" }} className="d-flex justify-content-center align-items-center mb-2">
            <FaRegNewspaper style={{ width: '3rem', height: '3rem', textDecoration: 'none' }} />
        </div>
        return (
            <div key={i} className="newsWidgetCard p-3">
                {imageURL ? articleImage : placeholderImage}
                <Card.Body>
                    <Card.Title className="mb-2">
                        <a href={articleURL} >
                            {headline}
                        </a>
                    </Card.Title>
                    <Card.Text className="mb-2">
                        {description}
                    </Card.Text>
                    <Card.Text>
                        <small><img src={sourceIconURL} style={{ width: "1.5rem" }} /> &nbsp;{source}</small>
                    </Card.Text>
                </Card.Body>
            </div>
        )
    })

    return (
        <div className="mt-3 glassCard">
            <ResponsiveMasonry
                columnsCountBreakPoints={{ 350: 1, 750: 2, 900: 4 }}
                >
                <Masonry gutter="15px" >
                    {resultsArray}
                </Masonry>
            
            </ResponsiveMasonry>
            <div className='d-flex justify-content-center pt-3'>
            {props.searchType == "news/search" && props.searchResults ? <button className='loadMoreButton' onClick={props.loadMoreNews}>Load More</button> : ""}
            </div>
        </div>
    )
}

export default NewsPageCards;