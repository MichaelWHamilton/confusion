import React from 'react'; 
import { Card, CardImg, CardText, CardBody, CardTitle, Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { Link } from 'react-router-dom';

// RenderDish component - Displays the details of a single dish
function RenderDish({ dish }) {
  if (dish!= null) {
    return (
      <div className="col-12 col-md m-1"> 
        <Card>
            <CardImg width="100%" src={dish.image} alt={dish.name} />
            <CardBody>
                <CardTitle>{dish.name}</CardTitle>
                <CardText>{dish.description}</CardText>
            </CardBody>
        </Card>
      </div>
    );
  }
  else {
    return (<div></div>);
  }
}

// RenderComments component - Displays the comments for a dish
function RenderComments({ comments }) {
    if (!comments || comments.length === 0) {  // Check if comments exist
        return <div><h4>Comments</h4><p>No comments available.</p></div>;
    }

    return (
        <div>
            <h4> Comments </h4>
            <Card>
                <ul className="list-unstyled">
                    {comments.map(comment => (
                        <li key={comment.id}>
                            <p>{comment.comment}</p>
                            <p>-- {comment.author}, 
                                {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit' }).format(new Date(comment.date))}
                            </p>
                        </li>
                    ))}
                </ul>
            </Card>
        </div>
    );
}

// DishDetail component - Main component that renders both the dish and its comments
const DishDetail = (props) => {
    console.log("Dishdetail received comments:", props.comments);

    const dish = props.dish;
    if(dish==null){
        return (<div></div>);
    }

    return (
        <div className="container">
            <div className="row">
                    <div className="col-12">
                        <h3>{props.dish.name}</h3>
                        <hr />
                    </div>
                </div>
                <div className="row align-items-stretch"> 
                    <div className="col-12 col-md-6 d-flex"> 
                        <RenderDish dish={dish} /> 
                    </div> 
                    <div className="col-12 col-md-6 d-flex"> 
                        <RenderComments comments={props.comments} /> 
                    </div> 
                </div>
        </div>
    );  
}

export default DishDetail;
