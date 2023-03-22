import { Form, Button } from "react-bootstrap";
import { ImStackoverflow } from "react-icons/im"

// Create search form that will be used in the stackoverflow widget 
function SearchForm(props) {
  return (
    <Form className="p-2">
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
          className="form-control"
          style={{border: "2px solid #6444e3"}}
          placeholder="Search StackOverflow"
          id="search"
        />
        <Button onClick={props.handleFormSubmit} className="btn border-0" style={{backgroundColor: "rgb(56 20 195 / 70%)"}}>
          Search
        </Button>
      </div>
    </Form>
  );
}

export default SearchForm;
