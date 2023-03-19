import StackOverflowWidget from '../components/StackOverflowWidget/StackOverflowWidget'
import StackCard from '../components/StackOverflowWidget/StackOverflowCard'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { Container } from 'react-bootstrap'

const StackOverflow = () => {
    // Get date for the last day to use in API call
    let date = Math.floor(Date.now() / 1000) - 86400;
    const [data, setData] = useState([]);
    
    useEffect(() => {
        axios.get(`https://api.stackexchange.com/2.3/questions?fromdate=${date}&order=desc&sort=hot&tagged=react&site=stackoverflow`)
        .then(response => {
            setData(response.data.items)
            console.log(data)
        })
        .catch(error => {
            console.log(error)
        })
    }, [])
    
    return (
        <Container>
            <StackOverflowWidget />
            <h3 className="mt-5 mb-4 text-light">Hot React.js Questions</h3>
            <div style={{height: "270px", overflowY: "scroll"}}>
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
        </Container>
    )
}

export default StackOverflow;