import { Form, Button } from 'react-bootstrap'

function SearchForm(props) {
    return (
      <Form>
        <label htmlFor="search">Search:</label>
        <div className="input-group">
          <input
            onChange={props.handleInputChange}
            onKeyDown={props.handleKeyDown}
            value={props.value}
            name="search"
            type="text"
            className="form-control"
            placeholder="Search StackOverflow"
            id="search"
          />
          <Button onClick={props.handleFormSubmit} className="btn btn-primary">
            Search
          </Button>
        </div>
      </Form>
    );
  }
  
  export default SearchForm;
  