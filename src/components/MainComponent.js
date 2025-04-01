import React, { Component } from 'react'; 
import { Navbar, NavbarBrand } from 'reactstrap';
import {Routes, Route, Navigate, Switch, redirect, withRouter} from 'react-router-dom';
import { connect } from 'react-redux';
import Menu from './MenuComponent'; 
import DishDetail from './DishdetailComponent'; 
import { DISHES } from '../shared/dishes';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import Home from './HomeComponent';
import Contact from './ContactComponent';
import About from './AboutComponent';
import { COMMENTS } from '../shared/comments';
import { PROMOTIONS } from '../shared/promotions';
import { LEADERS } from '../shared/leaders';
import { addComment } from '../redux/ActionCreators';

const mapStateToProps = (state) => {
    return{
        dishes: state.dishes,
        comments: state.comments,
        promotions: state.promotions,
        leaders: state.leaders
    }
};

const mapDispatchToProps = dispatch => ({
    addComment: (dishId, rating, author, comment) => dispatch(addComment(dishId, rating, author, comment))
});


class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dishes: DISHES,
            comments: COMMENTS,
            promotions: PROMOTIONS,
            leaders: LEADERS
        };
    }

    onDishSelected(dishId) {
        this.setState({ selectedDish: dishId});
    }

    render(){

        const HomePage = () => {
            return(
                <Home 
                dish={this.state.dishes.filter((dish) => dish.featured)[0]} 
                promotion={this.state.promotions.filter((promo) => promo.featured)[0]} 
                leader={this.state.leaders.filter((leader) => leader.featured)[0]} 
                /> 
            );
        };

        const DishWithId = (props) => {
            const dishId = parseInt(props.dishId, 10);
            return (
                <DishDetail 
                    dish={props.dishes.find((dish) => dish.id === dishId)}
                    comments={props.comments.filter((comment) => comment.dishId === dishId)}
                    addComment={this.props.addComment}
                />
            );
        };
        
        

        return(
            <div>
                <Header/>
                <Routes>
                    {/* routes replaces switch, and navigate replaces redirect, element replaces component */}
                    <Route path='/home' element={<HomePage/>} />
                    <Route exact path='/aboutus' element={<About leaders={this.props.leaders} /> } />
                    <Route exact path='/menu' element={<Menu dishes={this.state.dishes} comments={this.props.comments} addComment={this.props.addComment}/>} />
                    <Route path='/menu/:dishId' element={<DishWithId dishes={this.state.dishes} comments={this.props.comments}/>} />
                    <Route exact path='/contactus' element={<Contact/>} />
                    <Route path="*" element={<Navigate to="/home" replace/>} /> {/* Redirect unknown routes */} 
                </Routes>
                
                <Footer/>
                {/* <Header />
                <Menu dishes={this.state.dishes} onClick={(dishId) => this.onDishSelected(dishId)} />
                <DishDetail  dish={this.state.dishes.filter((dish) => dish.id === this.state.selectedDish)[0]} />
                <Footer /> */}
            </div>
            
        );
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Main);