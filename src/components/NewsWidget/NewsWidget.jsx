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

  // Increases apiFailCounter by 1 and then waits 1 second 
  const apiCallFail = () => {
    setTimeout(() => {
      setAPIFailCounter(apiFailCounter + 1);
    }, 1000);
  };

  // object containing the request options including method, URL, and headers.
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
          'X-RapidAPI-Key': 'ca3e3b7c4dmshcf0d18644a9b128p15b157jsnca8487f0f2a9',
          'X-RapidAPI-Host': 'bing-news-search1.p.rapidapi.com'
        }
      };

      // axios request makes call using predetermined options.
      // If the search results page is greater than 0, append new search results to the existing ones. 
      // Else only display new results.
      axios.request(options)
        .then(function (response) {
          if (searchResultsPage > 0) {
            setSearchResults(searchResults.concat(response.data.value));
          } else {
            setSearchResults(response.data.value);
          }
        })
        .catch(function (error) {
          apiCallFail(error);
        });
    }
  }, [searchResultsPage, category, queryString, apiFailCounter]);

  // Increments the search results page by 12 to display more news articles.
  function loadMoreNews() {
    setSearchResultsPage(searchResultsPage + 12);
  }

  // Sets the search type to "news/search", clears the category and search results page, sets the page title to the query, and sets the query string to the search input.
  function searchKeywords(query) {
    setSearchType("news/search");
    setCategory("")
    setQueryString(query);
  }

  // Sets the search type to "news", clears the search string and search results page, sets the page title to the category, and sets the category to the button value.
  function searchCategories(category) {
    setSearchType("news");
    setSearchString("");
    setCategory(category);
  }

  // Sets the search string to the value of the search input.
  const handleInputChange = (event) => {
    setSearchString(event.target.value);
  };

  // Triggers the searchKeywords function passing in the search string as a parameter.
  const handleFormSubmit = (event) => {
    event.preventDefault();
    searchKeywords(searchString);
  };

  // Triggers the searchKeywords function if the Enter key is pressed while in the search input.
  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      searchKeywords(searchString);
    }
  };

  // Triggers the searchCategories function passing in the button value as a parameter.
  const handleCategorySearch = (event) => {
    event.preventDefault();
    searchCategories(event.currentTarget.value);
  };

  // Return news widget cards
  return (
    <div className='glassCard h-100'>
      <Card.Body className='h-100 d-flex flex-column'>
        <Card.Title>Todays Tech News</Card.Title>
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
    </div>
  );
};

export default NewsWidget;