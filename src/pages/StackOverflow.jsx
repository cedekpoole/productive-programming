// import components that are needed on stackoverflow page
import StackOverflowWidget from "../components/StackOverflowWidget/StackOverflowWidget";
import StackCard from "../components/StackOverflowWidget/StackOverflowCard";

import axios from "axios";
import { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";

const StackOverflow = () => {
  // Get date for the last day to use in API call
  let date = Math.floor(Date.now() / 1000) - 86400;
  const [data, setData] = useState([]);
  const [data2, setData2] = useState([]);

  // Retrieve data for the 'Hot React.js Questions' search
  useEffect(() => {
    axios
      .get(
        // `https://api.stackexchange.com/2.3/questions?fromdate=${date}&order=desc&sort=hot&tagged=react&site=stackoverflow`
      )
      .then((response) => {
        setData(response.data.items);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    axios
      .get(
        // "https://api.stackexchange.com/2.3/questions?order=desc&sort=week&tagged=javascript;reactjs&site=stackoverflow"
      )
      .then((res) => {
        setData2(res.data.items);
      })
      .catch((err) => {
        console.log(error);
      });
  }, []);

  // return the structure of the stackoverflow page
  return (
    <Container className="stack-container">
      <div className="notes__header my-3"><h1 className="notes__title">Stack Overflow</h1></div>
      <Row>
        <Col xl={6} className="glass mb-3 p-3">
          <h3 className="p-2 mb-3 text-dark">Top Questions This Week</h3>
          <div style={{ height: "90vh", overflowY: "scroll" }}>
            {data2.map((element, index) => (
              <StackCard
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
        </Col>
        <Col xl={6}>
          <StackOverflowWidget />
          <div className="glass p-3 mt-2 mb-3">
            <h3 className="p-2 mb-3 text-dark">Hot React.js Questions</h3>
            <div style={{ height: "250px", overflowY: "scroll" }}>
              {data.map((element, index) => (
                <StackCard
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
        </Col>
      </Row>
    </Container>
  );
};

export default StackOverflow;
