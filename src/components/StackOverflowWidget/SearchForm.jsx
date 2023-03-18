import { Form, Button } from "react-bootstrap";
import { ImStackoverflow } from "react-icons/im"

function SearchForm(props) {
  return (
    <Form>
      <label className="display-6 mb-2"><ImStackoverflow /></label>
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
        <Button onClick={props.handleFormSubmit} className="btn btn-dark">
          Search
        </Button>
      </div>
    </Form>
  );
}

export default SearchForm;