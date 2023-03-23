// Import created components needed for the stackoverflow widget
import SearchForm from "./SearchForm";
import StackOverflowCard from "./StackOverflowCard";

import axios from "axios";
import { useState, useEffect } from "react";

const StackOverflowWidget = () => {
  // Use the useState react hook to track api data and user search value
  const [search, setSearch] = useState("");
  const [data, setData] = useState([]);
  const [searchToExecute, setSearchToExecute] = useState("javascript");

  // Retrieve data from stackoverflow via the package axios
  useEffect(() => {
    axios
      .get(
        // `https://api.stackexchange.com/2.3/search/advanced?order=desc&sort=relevance&q=${searchToExecute}&site=stackoverflow`
      )
      .then((res) => {
        setData(res.data.items);
      })
      .catch((err) => console.log(err));
  }, [searchToExecute]);

  const handleInputChange = (event) => {
    // update search state when input changes
    setSearch(event.target.value);
  };

  const handleFormSubmit = (event) => {
    // stop page from refreshing when form is submitted
    event.preventDefault();
    // update the executed search when the form is submitted
    setSearchToExecute(search);
  };
  // allow the user to submit form using the enter button
  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      setSearchToExecute(search);
    }
  };
  return (
    <div className="glass p-3 h-100 d-flex flex-column" style={{padding: "15px"}}>
      <SearchForm
        value={search}
        handleInputChange={handleInputChange}
        handleFormSubmit={handleFormSubmit}
        handleKeyDown={handleKeyDown}
      />
      <div className="p-2 mt-1 newsScrollWrapper" style={{ height: "272px", overflowY: "scroll" }}>
        {/* Map over stackoverflow data and place each 
        element into its own card */}
        {data.map((element, index) => (
          <StackOverflowCard
            votes={element.score}
            title={element.title}
            answers={element.answer_count}
            link={element.link}
            key={index}
            views={element.view_count}
            tags={element.tags}
            user={element.owner.display_name}
            image={element.owner.profile_image}
          />
        ))}
      </div>
    </div>
  );
};

export default StackOverflowWidget;
