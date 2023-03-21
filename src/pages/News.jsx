import { useState, useEffect } from 'react';
import { Container, Card, Button, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import '../components/NewsWidget/newsPage.css';
import NewsPageCards from '../components/NewsWidget/NewsPageCards';
import NewsSearch from '../components/NewsWidget/NewsSearchBar';
import NewsSearchCategories from '../components/NewsWidget/NewsSearchCategories';
import NewsPlaceholder from '../components/NewsWidget/NewsPlaceholder';


const News = () => {
    const [category, setCategory] = useState("");
    const [searchResults, setSearchResults] = useState();
    const [searchResultsPage, setSearchResultsPage] = useState(0);
    const [queryString, setQueryString] = useState('tech, coding');
    const [searchType, setSearchType] = useState("news/search");
    const [searchString, setSearchString] = useState("");
    const [apiFailCounter, setAPIFailCounter] = useState(0);
    const [pageTitle, setPageTitle] = useState("Tech & Coding");

    const categoryList = [
        { name: 'Business' },
        { name: 'Entertainment' },
        { name: 'Health' },
        { name: 'Politics' },
        { name: 'Sports' },
        { name: 'UK' },
        { name: 'World' },
        { name: 'ScienceAndTechnology' },
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
                    count: 12,
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

    function loadMoreNews() {
        setSearchResultsPage(searchResultsPage + 12);
    }

    function searchKeywords(query) {
        setSearchType("news/search");
        setCategory("");
        setSearchResultsPage(0);
        setPageTitle(query);
        setQueryString(query);
    }

    function searchCategories(category) {
        setSearchType("news");
        setSearchString("");
        setSearchResultsPage(0);
        setPageTitle(category);
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
        <Container>
            <div className="notes__header"><h1 className="notes__title">News - {pageTitle}</h1></div>
            <Container>
                <Card className='p-3'>
                    <NewsSearch
                        value={searchString}
                        handleInputChange={handleInputChange}
                        handleFormSubmit={handleFormSubmit}
                        handleKeyDown={handleKeyDown}
                    />
                    <NewsSearchCategories
                        category={category}
                        categoryList={categoryList}
                        handleCategorySearch={handleCategorySearch}
                    />
                </Card>

                {searchResults && searchResults.length > 1 ?
                    <NewsPageCards searchResults={searchResults} /> :
                    <Row style={{height: "50vh"}} className='d-flex justify-content-center align-items-center py-3'>
                        <Col className='card' sm={12} md={8} >
                        < NewsPlaceholder apiFailCounter={apiFailCounter} />
                    </Col>
                    </Row>
                }

                <div className='d-flex justify-content-center py-3'>
                    {searchType == "news/search" && searchResults ? <Button variant="primary" onClick={loadMoreNews}>Load More</Button> : ""}
                </div>

            </Container>
        </Container>
    )
}

export default News;