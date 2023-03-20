import axios from "axios";
import { useState, useEffect } from "react";

// use axios to send a GET request and retrieve quote data
const ZenQuotes = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get("https://api.goprogram.ai/inspiration")
      .then((response) => {
        // set the state of data as whatever is retrieved from the quote api
        setData(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="p-3 mt-3 text-center">
      <figure>
        <blockquote className="blockquote text-white">
          <p>{`"${data.quote}"`}</p>
        </blockquote>
        <figcaption className="blockquote-footer">{data.author}</figcaption>
      </figure>
    </div>
  );
};

export default ZenQuotes;
