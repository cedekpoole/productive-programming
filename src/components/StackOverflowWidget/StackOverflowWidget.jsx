import { Card, Button } from "react-bootstrap";
import SearchForm from "./SearchForm";
import StackOverflowCard from "./StackOverflowCard"
import axios from "axios";
import { useState, useEffect } from "react";

const StackOverflowWidget = () => {
  const [search, setSearch] = useState("");
  const [data, setData] = useState({});
  const [searchToExecute, setSearchToExecute] = useState("javascript");

  useEffect(() => {
    axios
      .get(
        `https://api.stackexchange.com/2.3/search/advanced?order=desc&sort=relevance&q=${searchToExecute}&site=stackoverflow`
      )
      .then((res) => setData(res.data))
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
  return (
    <div>
      {/* <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src="holder.js/100px180" />
      <Card.Body>
        <Card.Title>Stack Overflow Widget</Card.Title>
        <Card.Text>
          Some quick example text to build on the card title and make up the
          bulk of the card's content.
        </Card.Text>
        <Button variant="primary">Go somewhere</Button>
      </Card.Body>
    </Card> */}
      <SearchForm
      value={search}
      handleInputChange={handleInputChange}
      handleFormSubmit={handleFormSubmit}
       />
       
    </div>
  );
};

export default StackOverflowWidget;
