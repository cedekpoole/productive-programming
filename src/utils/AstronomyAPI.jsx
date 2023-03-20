import axios from "axios";
import { Spinner, Card } from "react-bootstrap";
import { useState, useEffect } from "react";

const AstronomyAPI = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(
        "https://api.nasa.gov/planetary/apod?api_key=AJ6cjvyNYD3HWl9hXYRk9MGUb0mSJLNDhf694BWj"
      )
      .then((response) => {
        setData(response.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(true);
      });
  }, []);

  const handleLoading = () => {
    return (
      <Spinner
        className="text-light"
        animation="border"
        style={{ minWidth: "8rem", minHeight: "8rem" }}
      />
    );
  };

  const videoResponse = () => {
    return (
      <iframe width="400" height="315" src={data.url}></iframe>
    );
  };

  const imageResponse = () => {
    <Card.Img
      variant="top"
      src={data.hdurl}
      alt={data.title}
      className="img-fluid"
      style={{ width: "400px", height: "315px" }}
    />;
  };

  const handleSuccess = () => {
    return (
      <div className="mb-3">
        <Card className="h-100 bg-dark text-light" style={{ width: "100%" }}>
          <div>
            {data.media_type === "video" ? videoResponse() : imageResponse()}
            <Card.Body>
              <Card.Title>Astronomy Picture of the day</Card.Title>
              <Card.Text style={{ fontSize: "16px" }}>{data.title}</Card.Text>
            </Card.Body>
          </div>
        </Card>
      </div>
    );
  };

  return loading ? handleLoading() : handleSuccess();
};

export default AstronomyAPI;
