import React, { Component } from 'react'; 
import { Card, CardImg, CardText, CardBody, CardTitle, Button, Breadcrumb, BreadcrumbItem, Modal, ModalHeader, ModalBody, Form, Label, Input, FormGroup, Row, Col, FormFeedback } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Loading } from './LoadingComponent';

// Assignment 7 Comment Form Class
class CommentForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isModalOpen: false,
            rating: '',
            author: '',
            comment:'',
            touched: {
                rating: false,
                author: false,
                comment: false
            }
        }
        this.toggleModal = this.toggleModal.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleBlur = this.handleBlur.bind(this);
    }

    handleBlur = (field) => (evt) => {
        this.setState({
            touched: {...this.state.touched, [field]: true}
        });
    }

    validate(author) {
        const errors = {
            author: ''
        };

        if(this.state.touched.author && author.length < 3) {
            errors.author = 'Must be greater than 2 characters';
        }
        else if (this.state.touched.author && author.length > 15) {
            errors.author = 'Must not be greater than 15 characters';
        }


        return errors;
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    toggleModal() {
        console.log("Submit Comment clicked. Modal toggled");

        this.setState({
            isModalOpen: !this.state.isModalOpen
        });
    }

    handleSubmit(event) {
        event.preventDefault();
        console.log("Rating: " + this.state.rating + " Author: " + this.state.author + " Comment: " + this.state.comment);
        
        alert("Rating: " + this.state.rating + " Author: " + this.state.author + " Comment: " + this.state.comment);
        
        console.log("Submitting comment with:");
        console.log("Dish ID:", this.props.dishId);
        console.log("Rating:", this.state.rating);
        console.log("Author:", this.state.author);
        console.log("Comment:", this.state.comment);
        console.log("Props available:", this.props);

        // Dispatch the Redux action to add the comment
        this.props.addComment(this.props.dishId, this.state.rating, this.state.author, this.state.comment);

        // Reset form (optional)
        this.setState({
            rating: '',
            author: '',
            comment: '',
            touched: {
                rating: false,
                author: false,
                comment: false
            }
        });

        this.toggleModal();
    }

    render() {
        const errors = this.validate(this.state.author);

        console.log("CommentForm props:", this.props);
        
        return (
            <div className="container">
                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal} fade={false}>
                    <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
                    <ModalBody>
                        <Form onSubmit={this.handleSubmit}>
                            <FormGroup>
                                <Label htmlFor="rating"/>
                                    <Input type="select" id="rating" name="rating" value={this.state.rating} onChange={this.handleInputChange}>
                                        <option value="1">1</option>
                                        <option value="2">2</option>
                                        <option value="3">3</option>
                                        Rating
                                    </Input>
                            </FormGroup>
                            <FormGroup>
                                <Label htmlFor="author">Your Name</Label>
                                <Input 
                                type="text" 
                                id="author" 
                                name="author"
                                placeholder="Your Name" 
                                value={this.state.author} 
                                
                                onBlur={this.handleBlur('author')}
                                onChange={this.handleInputChange}
                                />
                                {this.state.touched.author && errors.author && (<div className="text-danger">{errors.author}</div>)}
                                <FormFeedback>{errors.author}</FormFeedback>
                            </FormGroup>
                            <FormGroup>
                                <Label htmlFor="comment">Comment</Label>
                                <Input type="textarea" id="comment" name="comment" rows="6" value={this.state.comment} onChange={this.handleInputChange}></Input>
                            </FormGroup>
                            <Button md={{size:10, offset:2}}type="submit" value="submit" color="primary" onClick={this.handleSubmit}>Submit</Button>
                        </Form>
                    </ModalBody>
                </Modal>

                <Button outline onClick={this.toggleModal}><span className="fa fa-pencil fa-lg"></span> Submit Comment</Button>
            </div>
        );
    }
}



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
function RenderComments({ comments, addComment, dishId }) {
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
                <CommentForm dishId={dishId} addComment={addComment} />
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

    if(props.isLoading) {
        return (
            <div className="container">
                <div className="row">
                    <Loading />
                </div>
            </div>
        );
    }
    else if (props.errMess) {
        return (
            <div className="container">
                <div className="row">
                    <h4>{props.errMess}</h4>
                </div>
            </div>
        );
    }
    else if (props.dish!= null)
    {
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
                            <RenderComments comments={props.comments} dishId={props.dish.id} addComment={props.addComment} /> 
                        </div> 
                    </div>
            </div>
        );  
    }

    
}

export default DishDetail;
