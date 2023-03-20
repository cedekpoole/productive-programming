import './news.css'
import { useState, useEffect } from 'react';
import { Card, Button, Col, Row } from 'react-bootstrap';
import { format } from 'date-fns'

import axios from 'axios';

const NewsWidget = () => {
  const [category, setCategory] = useState("technology");
  const [searchResults, setSearchResults] = useState();
  const [searchResultsPage, setSearchResultsPage] = useState(0);

  const options = {
    method: 'GET',
    url: 'https://bing-news-search1.p.rapidapi.com/news/search',
    params: {
      q: 'programming, dev, tech',
      category: 'ScienceAndTechnology',
      mkt: 'en-GB',
      safeSearch: 'Off',
      textFormat: 'Raw',
      sortBy: 'relevance'
    },
    headers: {
      'X-BingApis-SDK': 'true',
      'X-RapidAPI-Key': '31da255736msh936614cca1dd1acp1c7e31jsn7de1029aaaaf',
      'X-RapidAPI-Host': 'bing-news-search1.p.rapidapi.com'
    }
  };
  
  useEffect(() => {

  axios.request(options).then(function (response) {
    console.log(response.data);
    console.log(response.data.value);
    setSearchResults(response.data.value);
  
  }).catch(function (error) {
    console.error(error);
  });
  },[]);

  // function trimDescription() {
  //   const charLimit = 110;
  //   const descriptionLong = testData.description;

  //   const firstSentence = testData.description.split('.')[0];
  //   const secondSentence = testData.description.split('.')[1];

  //   let descriptionShort = firstSentence;

  //   if (descriptionShort.length < charLimit) {
  //     descriptionShort = (`${firstSentence}. ${secondSentence}`)
  //   }

  //   descriptionShort = (`${descriptionShort.slice(0, charLimit)}...`);
  //   return descriptionShort;
  // }

  function generateNewsCards() {
    const resultsArray = searchResults.map((result, i) => {
      console.log(result.datePublished.split('T')[0]);
      // const day = format(result.datePublished.split('T')[0], "EEE");
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

              <Card.Text className="mb-2">{description} </Card.Text>
              <Card.Text className="mb-0 small text-muted">
                <img src={sourceIconURL} style={{ width: "1.5rem" }} /> &nbsp;
                {source}</Card.Text>
            </Col>
          </Row>
        </div>
      )
    });

    console.log(resultsArray);
    return (
      <div className='newsScrollWrapper'>
        {resultsArray}
        <Button variant="primary">Load More</Button>
      </div>
    );
  };

  // generateNewsCards()
  // const newsImage =
  //   <Col xs={3} className='square m-0'>
  //     <img className='newsThumbnail' src={testData[2].image.thumbnail.contentUrl} />
  //   </Col>

  // const newsCard = <div className="pane border-bottom p-3">
  //   <Row>
  //     {testData[1].image.thumbnail.contentUrl ? newsImage : ""}
  //     <Col>
  //       <Card.Title className="mb-1 lead" style={{ fontWeight: '600' }}>{testData[1].name}</Card.Title>
  //       <Card.Text className="mb-2">{testData[1].description} </Card.Text>
  //       <Card.Text className="mb-0 small text-muted">
  //         {/* <img src={testData[1].provider[0].image.thumbnail.contentUrl} /> */}
  //         {testData[1].provider[0].name}</Card.Text>
  //     </Col>
  //   </Row>
  //   <Row>
  //     {testData[2].image.thumbnail.contentUrl ? newsImage : ""}
  //     <Col>
  //       <Card.Title className="mb-1 lead" style={{ fontWeight: '600' }}>{testData[2].name}</Card.Title>
  //       <Card.Text className="mb-2">{testData[2].description} </Card.Text>
  //       <Card.Text className="mb-0 small text-muted">
  //         {/* <img src={testData[1].provider[0].image.thumbnail.contentUrl} /> */}
  //         {testData[2].provider[0].name}</Card.Text>
  //     </Col>
  //   </Row>
  // </div>

  // function getNewsContaner() {
  //   return (
  //     <div>
  //       {generateNewsCards()}
  //     </div>)
  // }

  return (
    <div>
      <Card style={{ width: '39rem' }}>
        <Card.Body>
          <Card.Title>News Widget</Card.Title>
          {searchResults && searchResults.length > 1 ? generateNewsCards() : ""}
        </Card.Body>
      </Card>
    </div>
  );
};

export default NewsWidget;