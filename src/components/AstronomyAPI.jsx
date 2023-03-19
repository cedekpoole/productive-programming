import axios from "axios";
import { Spinner, Card } from "react-bootstrap";
import { useState, useEffect } from 'react'

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
        console.log(data)
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(true);
      });
  }, []);

  const handleLoading = () => {
    return (
        <Spinner className="text-light" animation="border" style={{ minWidth: '8rem', minHeight: '8rem' }} />
    )
  };

  const handleSuccess = () => {
    return (
      <div className="mb-3">
      <Card className="h-100" style={{ width: "95%" }}>
        <div>
          <Card.Img
            variant="top"
            src={data.hdurl}
            alt=""
            className="img-fluid"
          />
          <Card.Body>
            <Card.Title>Astronomy Picture of the day</Card.Title>
            <Card.Text style={{ fontSize: "16px" }}>
              {data.explanation}
            </Card.Text>
          </Card.Body>
        </div>
      </Card>
    </div>
    );
  };

  return loading ? handleLoading() : handleSuccess();
};

export default AstronomyAPI;
