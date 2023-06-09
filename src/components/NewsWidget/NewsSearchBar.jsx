import { Button, Badge, Form } from 'react-bootstrap';

function NewsSearchBar(props) {
    return (
        <div>
            <Form className='py-2'>
                <div className="input-group flex-nowrap">
                    <input
                        id="search"
                        name="search"
                        type="text"
                        className="searchBar"
                        placeholder="Search News"
                        onChange={props.handleInputChange}
                        onKeyDown={props.handleKeyDown}
                        value={props.value}
                    />

                    <button className="searchButton" onClick={props.handleFormSubmit}>
                        Search
                    </button>
                </div>
            </Form>
        </div>
    )
}

export default NewsSearchBar;