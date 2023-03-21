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

  // return the structure of the stackoverflow page
  return (
    <Container>
      <Row>
        <Col xl={6} className="glass mt-4">
          <h3 className="mt-2 mb-3 text-dark">Hot React.js Questions</h3>
          <div style={{ height: "80vh", overflowY: "scroll" }}>
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
        </Col>
        <Col xl={6} className="mt-2">
            <StackOverflowWidget />
        </Col>
      </Row>
    </Container>
  );
};

export default StackOverflow;
