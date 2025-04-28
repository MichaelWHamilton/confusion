import React from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle, CardSubtitle } from 'reactstrap';
import { Loading } from './LoadingComponent';
import { baseUrl } from '../shared/baseUrl';


// Render card now checks if something isLoading, if error mess has been sent, else loads the cards for dishes like normal
function RenderCard({item, isLoading, errMess}) {
   if (isLoading) {
      return(
        <Loading />
      );
   }
   else if (errMess) {
      return(
        <h4>{errMess}</h4>
      );
   }
   else {   
      return (
        <Card>
            <CardImg src={baseUrl + item.image} alt={item.name} />
            <CardBody>
                <CardTitle>{item.name}</CardTitle>
                {item.designation ? <CardSubtitle>{item.designation}</CardSubtitle> : null}
                <CardText>{item.description}</CardText>
            </CardBody>
        </Card>    
      );
   }
}


// Home now passes the same error checks to the next level incase an individual card fails for some reason
function Home(props) {
    return (
      <div className="container">
         <div className="row align-items-start">
            <div className="col-12 col-md m-1">
               <RenderCard item={props.dish} isLoading={props.dishesLoading} errMess={props.dishesErrMess} />
            </div>
            <div className="col-12 col-md m-1">
               <RenderCard item={props.promotion} isLoading={props.promosLoading} errMess={props.promosErrMess} />
            </div>
            <div className="col-12 col-md m-1">
               <RenderCard item={props.leader} isLoading={props.leadersLoading} errMess={props.leadersErrMess} />
            </div>
         </div>
      </div>
    );
}

export default Home;