import React, { Component } from 'react'; 
import { Navbar, NavbarBrand } from 'reactstrap';
import {Routes, Route, Navigate } from 'react-router-dom'
import Menu from './MenuComponent'; 
import DishDetail from './DishdetailComponent'; 
import { DISHES } from '../shared/dishes';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import Home from './HomeComponent';

;


class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dishes: DISHES,
            selectedDish: null
        };
    }

    onDishSelected(dishId) {
        this.setState({ selectedDish: dishId});
    }

    render(){

        const HomePage = () => {
            return(
                <Home />
            );
        }

        

        return(
            <div>
                <Header/>
                <Routes>
                    {/* routes replaces switch, and navigate replaces redirect */}
                    <Route path='/home' element={<Home/>} /> 
                    <Route exactpath='/menu' element={<Menu dishes={this.state.dishes} />} /> 
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