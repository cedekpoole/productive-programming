import './news.css'
import { useState, useEffect } from 'react';
import { Card, Button, Col, Row, ButtonGroup, Badge, Accordion, Form, Spinner } from 'react-bootstrap';
import NewsSearch from './NewsSearch';
import { format } from 'date-fns';

import axios from 'axios';


const NewsWidget = () => {
  const [category, setCategory] = useState("ScienceAndTechnology");
  const [searchResults, setSearchResults] = useState();
  const [searchResultsPage, setSearchResultsPage] = useState(0);
  const [queryString, setQueryString] = useState('programming, dev, tech');
  const [searchType, setSearchType] = useState("news/search");
  const [searchString, setSearchString] = useState("");
  const [apiFailCounter, setAPIFailCounter] = useState(0);



  const categoryList = [
    { name: 'Business' },
    { name: 'Entertainment' },
    { name: 'Health' },
    { name: 'Politics' },
    { name: 'ScienceAndTechnology' },
    { name: 'Sports' },
    { name: 'UK' },
    { name: 'World' },
  ];

  const apiCallFail = () => {
    setTimeout(() => {
      setAPIFailCounter(apiFailCounter + 1);
    }, 1000);
  };


  useEffect(() => {
    if (apiFailCounter < 3) {
      const options = {
        method: 'GET',
        url: `https://bing-news-search1.p.rapidapi.com/${searchType}`,
        params: {
          q: queryString,
          category: category,
          offset: searchResultsPage,
          mkt: 'en-GB',
          safeSearch: 'Moderate',
          textFormat: 'Raw',
          sortBy: 'Relevance'
        },
        headers: {
          'X-BingApis-SDK': 'true',
          'X-RapidAPI-Key': '31da255736msh936614cca1dd1acp1c7e31jsn7de1029aaaa',
          'X-RapidAPI-Host': 'bing-news-search1.p.rapidapi.com'
        }
      };

      axios.request(options).then(function (response) {
        console.log(response.data);
        console.log(response.data.value);
        setSearchResults(response.data.value);

      }).catch(function (error) {
        apiCallFail(error);
      });
    }
  }, [searchResultsPage, category, queryString, apiFailCounter]);

  function loadMoreNews() {
    setSearchResultsPage(searchResultsPage + 10);
  }

  function searchKeywords(query) {
    setSearchType("news/search");
    setQueryString(query);
  }

  function searchCategories(category) {
    setSearchType("news");
    setCategory(category);
    setSearchString("");
  }



  const handleInputChange = (event) => {
    setSearchString(event.target.value);
    console.log(searchString);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    searchKeywords(searchString);
    console.log(queryString);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      searchKeywords(searchString);
      console.log(queryString)
    }
  };

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

              <Card.Text className="mb-2 articleText">{description} </Card.Text>
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
        <div className='d-flex justify-content-center pt-3'>
          <Button variant="primary" onClick={loadMoreNews}>Load More</Button>
        </div>

      </div>
    );
  };


    function displayError() {
    return (
      <Col className='p-4'>
        Whoops!<br />
        We were unable to fetch you the latest Tech news. :(
      </Col>
    )
  };

  function displaySpinner() {
    return (
      <Col className='p-4 d-flex justify-content-center'>
        <Spinner animation="border" size='xl' style={{ width: '5rem', height: '5rem' }} />
      </Col>
    )
  };

  function loadContent() {
    if (apiFailCounter >= 3) {
      return displayError();
    }
    else {
      return displaySpinner();
    }
  }

  return (
    <div>
      <Card style={{ width: '39rem' }}>
        <Card.Body>
          <Card.Title>News Widget</Card.Title>
          <NewsSearch />
          <Accordion>
            <Accordion.Item eventKey="0">
              <Accordion.Header>Search</Accordion.Header>
              <Accordion.Body>
                <Form className='py-2'>
                  <div className="input-group">
                    <input
                      name="search"
                      type="text"
                      className="form-control"
                      placeholder="Search News"
                      id="search"
                      onChange={handleInputChange}
                      onKeyDown={handleKeyDown}
                      value={searchString}
                    />

                    <Button className="btn border" onClick={handleFormSubmit}>
                      Search
                    </Button>
                  </div>
                </Form>
                <div className="d-flex justify-content-evenly py-2">
                  {categoryList.map((category, i) => (
                    <Badge pill
                      key={i}
                      as="button"
                      bg={category.name == category ? "success" : "primary"}
                      style={{ border: "0px" }}
                      className="mx-0"
                      value={category.name}
                      onClick={(e) => { searchCategories(e.currentTarget.value) }}>
                      {category.name}
                    </Badge>
                  ))}
                </div>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
          {searchResults && searchResults.length > 1 ? generateNewsCards() : loadContent()}
        </Card.Body>
      </Card>
    </div>
  );
};

export default NewsWidget;