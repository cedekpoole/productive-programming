import { Button, Badge, Form } from 'react-bootstrap';

function NewsSearchBar(props) {
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
        </div>
    )
}

export default NewsSearchBar;