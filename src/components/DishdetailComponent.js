import React, { useState } from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle, Button, Breadcrumb, BreadcrumbItem, Modal, ModalHeader, ModalBody, Label, Input, FormGroup, Row, Col } from 'reactstrap';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Loading } from './LoadingComponent';

const CommentForm = ({ dishId, addComment }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, touchedFields}
  } = useForm();

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const onSubmit = (data) => {
    addComment(dishId, data.rating, data.author, data.comment);
    alert("Submitted Comment: " + JSON.stringify(data, null, 2));
    reset();
    toggleModal();
  };

  return (
    <div className="container">
        <Modal isOpen={isModalOpen} toggle={toggleModal}>
            <ModalHeader toggle={toggleModal}>Submit Comment</ModalHeader>
            <ModalBody>
                <form onSubmit={handleSubmit(onSubmit)}>
                <FormGroup>
  <Label htmlFor="rating">Rating</Label>
  <select
    id="rating"
    name="rating"
    className="form-control"
    {...register("rating", { required: true })}
  >
    <option value="">Select</option>
    <option value="1">1</option>
    <option value="2">2</option>
    <option value="3">3</option>
    <option value="4">4</option>
    <option value="5">5</option>
  </select>
  {errors.rating && <p className="text-danger">Rating is required</p>}
</FormGroup>


                <FormGroup>
                    <Label htmlFor="author">Your Name</Label>
                    <input
                    type="text"
                    id="author"
                    name="author"
                    className="form-control"
                    placeholder="Your Name"
                    {...register("author", { required: true, minLength: 3, maxLength: 15 })}
                    />
                    {errors.author && <p className="text-danger">Name must be 3-15 characters</p>}
                </FormGroup>

                <FormGroup>
                    <Label htmlFor="comment">Comment</Label>
                    <input
                    type="textarea"
                    id="comment"
                    name="comment"
                    className="form-control"
                    rows="6"
                    {...register("comment", { required: true })}
                    />
                    {errors.comment && <p className="text-danger">Comment is required</p>}
                </FormGroup>

                <Button type="submit" color="primary">Submit</Button>
                </form>
            </ModalBody>
        </Modal>


      <Button outline onClick={toggleModal}>
        <span className="fa fa-pencil fa-lg"></span> Submit Comment
      </Button>
    </div>
  );
};

function RenderDish({ dish }) {
  if (dish != null) {
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
  } else {
    return <div></div>;
  }
}

function RenderComments({ comments, addComment, dishId }) {
  if (!comments || comments.length === 0) {
    return (
      <div>
        <h4>Comments</h4>
        <p>No comments available.</p>
      </div>
    );
  }

  return (
    <div>
      <h4>Comments</h4>
      <Card>
        <ul className="list-unstyled">
          {comments.map((comment) => (
            <li key={comment.id}>
              <p>{comment.comment}</p>
              <p>
                -- {comment.author},
                {new Intl.DateTimeFormat('en-US', {
                  year: 'numeric',
                  month: 'short',
                  day: '2-digit'
                }).format(new Date(comment.date))}
              </p>
            </li>
          ))}
        </ul>
        <CommentForm dishId={dishId} addComment={addComment} />
      </Card>
    </div>
  );
}

const DishDetail = (props) => {
  console.log("Dishdetail received comments:", props.comments);

  const dish = props.dish;
  if (dish == null) {
    return <div></div>;
  }

  if (props.isLoading) {
    return (
      <div className="container">
        <div className="row">
          <Loading />
        </div>
      </div>
    );
  } else if (props.errMess) {
    return (
      <div className="container">
        <div className="row">
          <h4>{props.errMess}</h4>
        </div>
      </div>
    );
  } else if (props.dish != null) {
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
            <RenderComments
              comments={props.comments}
              dishId={props.dish.id}
              addComment={props.addComment}
            />
          </div>
        </div>
      </div>
    );
  }
};

export default DishDetail;