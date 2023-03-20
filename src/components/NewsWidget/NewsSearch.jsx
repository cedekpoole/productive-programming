import { Button, Badge, Accordion, Form } from 'react-bootstrap';

function NewsSearch(props) {
    return (
       <div>
                    <Form className='py-2'>
                        <div className="input-group">
                            <input
                                id="search"
                                name="search"
                                type="text"
                                className="form-control"
                                placeholder="Search News"
                                onChange={props.handleInputChange}
                                onKeyDown={props.handleKeyDown}
                                value={props.value}
                            />

                            <Button className="btn border" onClick={props.handleFormSubmit}>
                                Search
                            </Button>
                        </div>
                    </Form>
                    <div className="d-flex justify-content-evenly flex-wrap py-2">
                        {props.categoryList.map((category, i) =>
                        (
                            <Badge pill
                                key={i}
                                as="button"
                                bg={category.name == props.category ? "success" : "primary"}
                                style={{ border: "0px" }}
                                className="mx-0"
                                value={category.name}
                                onClick={props.handleCategorySearch}>
                                {category.name}
                            </Badge>
                        ))}
                    </div>
            </div>
    )
}

export default NewsSearch;