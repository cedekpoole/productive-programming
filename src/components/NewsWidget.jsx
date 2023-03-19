import './news.css'
import { useState } from 'react';
import { Card, Button, Col, Row } from 'react-bootstrap'

const testData = {
  "author": "Kris Holt",
  "title": "Blizzard is making it easier to unlock new 'Overwatch 2' heroes",
  "description": "One of the major (and controversial) changes Blizzard made in Overwatch 2 was gating new heroes behind a battle pass. However, it should be a little easier for players to unlock the latest character, Ramattra, in the game's second season. Players who opt for the free track of the battle pass won't need to grind through as many levels before they can use the new tank in all game modes. Making some weekly challenges less of a chore should mean players can level up more quickly too.\"After reviewing data for Season 1, we're moving Ramattra into Tier 45 of the Battle Pass and making a few more...",
  "url": "https://www.engadget.com/overwatch-2-ramattra-battle-pass-205104977.html?src=rss",
  "source": "Engadget",
  "image": "https://s.yimg.com/os/creatr-uploaded-images/2022-12/c7a33a20-74d6-11ed-adeb-d092269cc262",
  "category": "technology",
  "language": "en",
  "country": "us",
  "published_at": "2022-12-05T20:51:04+00:00"
};



const NewsWidget = () => {
  const [category, setCategory] = useState("technology");

  function trimDescription() {
    const charLimit = 110;
    const descriptionLong = testData.description;

    const firstSentence = testData.description.split('.')[0];
    const secondSentence = testData.description.split('.')[1];

    let descriptionShort = firstSentence;

    if (descriptionShort.length < charLimit) {
      descriptionShort = (`${firstSentence}. ${secondSentence}`)
    }

    descriptionShort = (`${descriptionShort.slice(0, charLimit)}...`);
    return descriptionShort;
  }

  const newsImage = <Col xs={3} className='square m-0'>
    <img className='content' src={testData.image} />
  </Col>

  const newsCard = <div className="pane border-bottom p-3">
    <Row>
      {testData.image ? newsImage : ""}
      <Col>
        <Card.Title className="mb-1 lead" style={{ fontWeight: '600' }}>{testData.title}</Card.Title>
        <Card.Text className="mb-2">{trimDescription()}</Card.Text>
        <Card.Text className="mb-0 small text-muted">{testData.author} ({testData.source})</Card.Text>
        <Card.Text className="mb-0 small text-muted">Category: {category}</Card.Text>
      </Col>
    </Row>
  </div>

  function getNewsContaner() {
    return (
      <div>
        {newsCard}
        {newsCard}
      </div>)
  }
  return (
    <div>
      <Card style={{ width: '39rem' }}>
        <Card.Body>
          <Card.Title>News Widget</Card.Title>
          {getNewsContaner()}
          <Button variant="primary">Load More</Button>
        </Card.Body>
      </Card>
    </div>
  );
};

export default NewsWidget;