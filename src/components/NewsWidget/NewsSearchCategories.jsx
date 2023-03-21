import { Button, Badge, Form } from 'react-bootstrap';

function NewsSearchCategories(props) {
    return (

        <div className="d-flex justify-content-evenly flex-wrap py-2">
            {props.categoryList.map((category, i) =>
            (
                <Button 
                    key={i}
                    variant={category.name == props.category ? "success" : "primary"}
                    style={{ border: "0px" }}
                    className="my-1"
                    value={category.name}
                    onClick={props.handleCategorySearch}>
                    {category.name}
                </Button>
            ))}
        </div>
    )
}

export default NewsSearchCategories;