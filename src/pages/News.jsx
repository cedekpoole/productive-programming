import { useState, useEffect } from 'react';
import { Card, Container } from 'react-bootstrap';
import axios from 'axios';
import '../components/NewsWidget/newsPage.css'
import Masonry, {ResponsiveMasonry} from "react-responsive-masonry"
import NewsPageCard  from '../components/NewsWidget/NewsPageCard';

const News = () => {
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

    return (
        <Container>
            <div className="notes__header"><h1 className="notes__title">News</h1></div>
            <Container>
            <ResponsiveMasonry
                columnsCountBreakPoints={{350: 1, 750: 2, 900: 3}}
                
            >
             <Masonry gutter="15px">
                    <NewsPageCard />
                    <NewsPageCard />
                   
                    <NewsPageCard />
                    <NewsPageCard />

                    </Masonry>
                    </ResponsiveMasonry> 
            </Container>


        </Container>
    )
}

export default News;