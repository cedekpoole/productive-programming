import { Button, Badge, Form } from 'react-bootstrap';

function NewsSearchCategories(props) {



    
    return (

        <div className="row">
            {props.categoryList.map((category, i) =>
            (
                <button 
                    key={i}
                    variant={category.name == props.category ? "success" : "primary"}
                    style={{ border: "0px" }}
                    className="my-1 categoryButton"
                    value={category.name}
                    onClick={props.handleCategorySearch}>
                    {category.name}
                </button>
            ))}
        </div>
    )
}

export default NewsSearchCategories;