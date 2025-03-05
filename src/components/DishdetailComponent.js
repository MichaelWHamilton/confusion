import React from 'react'; 
import { Card, CardImg, CardText, CardBody, CardTitle } from 'reactstrap';

// RenderDish component - Displays the details of a single dish
function RenderDish({ dish }) {
  if (dish) {
    return (
      <Card>
        <CardImg top src={dish.image} alt={dish.name} />
        <CardBody>
          <CardTitle>{dish.name}</CardTitle>
          <CardText>{dish.description}</CardText>
        </CardBody>
      </Card>
    );
  } 
  else {
    return <div>No Dish Selected</div>;
  }
}

// RenderComments component - Displays the comments for a dish
function RenderComments({ comments }) {
    if (comments) {
        return (
            <div>
                <h4>Comments</h4> {comments.map((comment) => (
                <div key={comment.id}>
                    <p>{comment.comment}</p>
                        <p>
                            -- {comment.author}, 
                            {new Intl.DateTimeFormat('en-US', {year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(comment.date)))}
                        </p>
                </div>
                ))}
            </div>
        );
    } 
    else {
        return <div>No Comments</div>;
    }
}

// DishDetail component - Main component that renders both the dish and its comments
const DishDetail = (props) => {
  const { dish } = props;

  if (dish) {
    return (
      <div className="container">
        <div className="row">
            <div className="col-12 col-md-5 m-1">
                <RenderDish dish={dish} />
            </div>
        </div>
        <div className="row">
            <div className="col-12 m-1">
                <RenderComments comments={dish.comments} />
            </div>
          </div>
      </div>
    );
  }
};

export default DishDetail;
