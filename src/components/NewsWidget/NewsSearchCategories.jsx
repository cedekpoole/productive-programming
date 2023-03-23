import { Button, Badge, Form } from 'react-bootstrap';

function NewsSearchCategories(props) {




    return (

        <div className="row g-2">
            {props.categoryList.map((category, i) =>
            (
                <div key={i} className='col-12 col-md-6 col-lg-3'>
                <button 
                    key={i}
                    className={category.name == props.category ? "categoryButtonActive" : "categoryButton"}
                    style={{ border: "0px" }}
                    value={category.name}
                    onClick={props.handleCategorySearch}>
                    {category.name}&nbsp;{category.icon}
                </button>
                </div>
            ))}
        </div>
    )
}

export default NewsSearchCategories;