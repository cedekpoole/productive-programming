import './news.css'
import { useState, useEffect } from 'react';
import { Card } from 'react-bootstrap';
import NewsSearchBar from './NewsSearchBar';
import NewsCards from './NewsCards';
import NewsPlaceholder from './NewsPlaceholder';
import axios from 'axios';

const NewsWidget = () => {
  const [category, setCategory] = useState("");
  const [searchResults, setSearchResults] = useState();
  const [searchResultsPage, setSearchResultsPage] = useState(0);
  const [queryString, setQueryString] = useState('tech, coding');
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
          // 'X-RapidAPI-Key': '31da255736msh936614cca1dd1acp1c7e31jsn7de1029aaaaf',
          'X-RapidAPI-Host': 'bing-news-search1.p.rapidapi.com'
        }
      };

      axios.request(options)
      .then(function (response) {
        setSearchResults(response.data.value);
      })
      .catch(function (error) {
        apiCallFail(error);
      });
    }
  }, [searchResultsPage, category, queryString, apiFailCounter]);

  function loadMoreNews() {
    setSearchResultsPage(searchResultsPage + 10);
  }

  function searchKeywords(query) {
    setSearchType("news/search");
    setCategory("")
    setQueryString(query);
  }

  function searchCategories(category) {
    setSearchType("news");
    setSearchString("");
    setCategory(category);
  }

  const handleInputChange = (event) => {
    setSearchString(event.target.value);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    searchKeywords(searchString);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      searchKeywords(searchString);
    }
  };

  const handleCategorySearch = (event) => {
    event.preventDefault();
    searchCategories(event.currentTarget.value);
  };

  return (
    <div>
      <Card style={{ width: '39rem' }}>
        <Card.Body>
          <Card.Title>News Widget</Card.Title>
          <NewsSearchBar
            value={searchString}
            category={category}
            categoryList={categoryList}
            handleInputChange={handleInputChange}
            handleFormSubmit={handleFormSubmit}
            handleKeyDown={handleKeyDown}
            handleCategorySearch={handleCategorySearch}
          />
          {searchResults && searchResults.length > 1 ?
            <NewsCards
              searchResults={searchResults}
              loadMoreNews={loadMoreNews} /> :
            <NewsPlaceholder
              apiFailCounter={apiFailCounter}
            />}
        </Card.Body>
      </Card>
    </div>
  );
};

export default NewsWidget;