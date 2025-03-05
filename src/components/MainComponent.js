import React, { Component } from 'react'; 
import { Navbar, NavbarBrand } from 'reactstrap';
import {Routes, Route, Navigate } from 'react-router-dom'
import Menu from './MenuComponent'; 
import DishDetail from './DishdetailComponent'; 
import { DISHES } from '../shared/dishes';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import Home from './HomeComponent';
import Contact from './ContactComponent';
import { COMMENTS } from '../shared/comments';
import { PROMOTIONS } from '../shared/promotions';
import { LEADERS } from '../shared/leaders';

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

        const DishWithId = ({match}) => {
            return( 
                <DishDetail dish={this.state.dishes.filter((dish) => dish.id === parseInt(match.params.dishId,10))[0]} 
                comments={this.state.comments.filter((comment) => comment.dishId === parseInt(match.params.dishId,10))} /> 
            );
        }
        

        return(
            <div>
                <Header/>
                <Routes>
                    {/* routes replaces switch, and navigate replaces redirect, element replaces component */}
                    <Route path='/home' element={<HomePage/>} /> 
                    <Route exact path='/menu' element={<Menu dishes={this.state.dishes} />} />
                    <Route path='/menu:dishId' element={<DishWithId/>} />
                    <Route exact path='/contactus' element={<Contact/>} />
                    <Route path="*" element={<Navigate to="/home" />} /> {/* Redirect unknown routes */} 
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

export default Main;