import { Form, Button } from "react-bootstrap";
import { ImStackoverflow } from "react-icons/im"

// Create search form that will be used in the stackoverflow widget 
function SearchForm(props) {
  return (
    <Form>
      <div className="text-center">
        <label className="display-5 mb-2 mt-0"><ImStackoverflow /></label>
      </div>
      <div className="input-group">
        <input
          onChange={props.handleInputChange}
          onKeyDown={props.handleKeyDown}
          value={props.value}
          name="search"
          type="text"
          className="form-control bg-dark"
          placeholder="Search StackOverflow"
          id="search"
        />
        <Button onClick={props.handleFormSubmit} className="btn border btn-dark">
          Search
        </Button>
      </div>
    </Form>
  );
}

export default SearchForm;
