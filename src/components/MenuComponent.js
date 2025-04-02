import React, { useState } from 'react'; 
import { Card, CardImg, CardImgOverlay, CardTitle, BreadcrumbItem, Breadcrumb } from 'reactstrap'; 
import { Link } from 'react-router-dom';
import DishDetail from './DishdetailComponent';
import {Loading} from './LoadingComponent';

function RenderMenuItem ({dish, onClick}) { 

    if(dish!=null)
    {
        return ( 
            <Card onClick={() => onClick(dish)}>
                
                <CardImg width="100%" src={dish.image} alt={dish.name} /> 
                <CardImgOverlay> 
                    <CardTitle>{dish.name}</CardTitle> 
                </CardImgOverlay> 
                
            </Card> 
        );
    }
    else{
        return(<div>empty</div>);
    }

        //TODO: LEFT OFF HERE TRYING TOG ET CARDSS TO POP UP 
} 

const Menu = (props) => { 
    
    const [selectedDish, setSelectedDish] = useState(null);

    if(props.dishes.isLoading) {
        return (
            <div className="container">
                <div className="row">
                    <Loading />
                </div>
            </div>
        );
    }
    else if (props.dishes.errMess) {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <h4>{props.dishes.errMess}</h4>
                    </div>
                </div>
            </div>
        );
    }
    else {
        const menu = props.dishes.map((dish) => { 
            return ( 
                <div className="col-12 col-md-5 m-1"  key={dish.id}> 
                    <RenderMenuItem dish={dish} onClick={setSelectedDish} /> 
                </div> 
            ); 
        }); 
    
        return ( 
            <div className="container"> 
                <div className="row">
                    <Breadcrumb>
                        <BreadcrumbItem><Link to='/home'>Home</Link></BreadcrumbItem>
                        <BreadcrumbItem active>Menu</BreadcrumbItem>
                    </Breadcrumb>
                    <div className="col-12">
                        <h3>Menu</h3>
                        <hr/>
                    </div>
                </div>
    
                <div className="row">
                    {props.dishes.map((dish) => ( 
                        <div className="col-12 col-md-5 m-1" key={dish.id}> 
                            <RenderMenuItem dish={dish} onClick={setSelectedDish} />  
                        </div> 
                    ))}    
                </div>
    
                {/* Dish details appear below the menu */}
                {selectedDish && (
                    <div className="row">
    
                        {console.log("Filtered comments for dish:", selectedDish.id, 
                            props.comments ? props.comments.filter(comment => comment.dishId === selectedDish.id) : []
                        )}
    
                        <DishDetail 
                            dish={selectedDish} 
                            comments={props.comments.filter(comment => comment.dishId === selectedDish.id)} 
                            addComment={props.addComment}
                        />
                    </div>
                )}
    
            </div> 
        ); 
    }
    
} 
 
export default Menu; 