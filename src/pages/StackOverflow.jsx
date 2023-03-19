import StackOverflowWidget from '../components/StackOverflowWidget/StackOverflowWidget'
import StackCard from '../components/StackOverflowWidget/StackOverflowCard'
import axios from 'axios'
import { useEffect, useState } from 'react'

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
        <div>
            <StackOverflowWidget />
            <h3 className="mt-3 text-center">Hot React.js Questions</h3>
            <div style={{height: "220px", overflowY: "scroll"}}>
                {data.map((element, index) => (
                    <StackCard
                        num={index + 1}
                        title={element.title}
                        answered={element.is_answered}
                        link={element.link}
                        key={index}
                    />
                ))}
            </div>
        </div>
    )
}

export default StackOverflow;