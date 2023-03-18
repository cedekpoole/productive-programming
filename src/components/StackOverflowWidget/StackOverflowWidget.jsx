import { Card, Button } from "react-bootstrap";
import SearchForm from "./SearchForm";
import StackOverflowCard from "./StackOverflowCard"
import axios from "axios";
import { useState, useEffect } from "react";

const StackOverflowWidget = () => {
  const [search, setSearch] = useState("");
  const [data, setData] = useState([]);
  const [searchToExecute, setSearchToExecute] = useState("javascript");

  useEffect(() => {
    axios
      .get(
        `https://api.stackexchange.com/2.3/search/advanced?order=desc&sort=relevance&q=${searchToExecute}&site=stackoverflow`
      )
      .then((res) => {
        setData(res.data.items)
        console.log(data)
      })
      .catch((err) => console.log(err))
    }, [searchToExecute]);

  const handleInputChange = event => {
    // update search state when input changes
    setSearch(event.target.value);
  }

  const handleFormSubmit = event => {
    // TODO: prevent the page from reloading
    // TODO: call the function to look up the movie
    event.preventDefault();
    setSearchToExecute(search);
  }

  const handleKeyDown = event => {
    if (event.key === 'Enter') {
      event.preventDefault();
      setSearchToExecute(search)
    }
  }
  return (
    <div>
      <SearchForm
      value={search}
      handleInputChange={handleInputChange}
      handleFormSubmit={handleFormSubmit}
      handleKeyDown={handleKeyDown}
       />
      {data.map((element, index) => (
        <StackOverflowCard 
        num={index + 1}
        title={element.title}
        answered={element.is_answered}
        key={index}
        />
      ))}
    </div>
  );
};

export default StackOverflowWidget;
