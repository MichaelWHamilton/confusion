import * as ActionTypes from './ActionTypes';
import { DISHES } from '../shared/dishes';
import { baseUrl } from '../shared/baseUrl';
import fetch from 'cross-fetch';

export const addComment = (comment) => ({
   type: ActionTypes.ADD_COMMENT,
   payload: comment
});

export const postComment = (dishId, rating, author, comment) => (dispatch) => {
   const newComment = {
      dishId: dishId,
      rating: rating,
      author: author,
      comment: comment
   }
   newComment.date = new Date().toISOString();
   
   return fetch(baseUrl + 'comments', {
      method: 'POST',
      body: JSON.stringify(newComment),
      headers: {
         'Content-Type': 'application/json'
      },
      credentials: 'same-origin'
   })
   .then(response => {
      if (response.ok) {
         return response;
      }
      else {
         var error = new Error('Error ' + response.status + ': ' + response.statusText);
         error.response = response;
         throw error;
      }
   }, 
   error => {
      var errmess = new Error(error.message);
      throw errmess;
   })
   .then(response => response.json())
   .then(response => dispatch(addComment(response)))
   .catch(error => { console.log('Post comments ', error.message);
      alert('Your comment could not be posted\nError: ' + error.message); 
   })
}

export const postFeedback = (feedback) => (dispatch) => {
   const newFeedback = {
      firstname: feedback.firstname,
      lastname: feedback.lastname,
      telnum: feedback.telnum,
      email: feedback.email,
      agree: feedback.agree,
      contactType: feedback.contactType,
      message: feedback.message
   }
    
   return fetch(baseUrl + 'feedback', {
      method: 'POST',
      body: JSON.stringify(newFeedback),
      headers: {
         'Content-Type': 'application/json'
      },
      credentials: 'same-origin'
   })
   .then(response => {
      if (response.ok) {
         return response;
      }
      else {
         var error = new Error('Error ' + response.status + ': ' + response.statusText);
         error.response = response;
         throw error;
      }
   }, 
   error => {
      var errmess = new Error(error.message);    
      throw errmess;
   })
   .then(response => response.json())
   .then(response => { 
      console.log("Current State is: " + JSON.stringify(response)); 

      const feedbackMessage = 
         "Thank you for your feedback!!!\n\n" +
         `First Name: ${response.firstname}\n` +
         `Last Name: ${response.lastname}\n` +
         `Tel. Number: ${response.telnum}\n` +
         `Email: ${response.email}\n` +
         `Agree: ${response.agree}\n` +
         `Contact Type: ${response.contactType}\n` +
         `Message: ${response.message}`;

      alert(feedbackMessage); 
   })
   .catch(error => { console.log('Post comments ', error.message);
      alert('Your feedback could not be posted\nError: ' + error.message); 
   })
}

export const fetchDishes = () => (dispatch) => {
   dispatch(dishesLoading(true));
   
   return fetch(baseUrl + 'dishes')
   .then(response => {
      if (response.ok) {
         return response;
      }
      else {
         var error = new Error('Error ' + response.status + ': ' + response.statusText);
         error.response = response;
         throw error;
      }
   }, 
   error => {
      var errmess = new Error(error.message);
      throw errmess;
   })
   .then(response => response.json())
   .then(dishes => dispatch(addDishes(dishes)))
   .catch(error => dispatch(dishesFailed(error.message)));
}

// Dishes loading
export const dishesLoading = () => ({
   type: ActionTypes.DISHES_LOADING
});

// Dishes failed
export const dishesFailed = (errmess) => ({
   type: ActionTypes.DISHES_FAILED,
   payload: errmess
});

// Add dishes
export const addDishes = (dishes) => ({
   type: ActionTypes.ADD_DISHES,
   payload: dishes
})

// Get comments for dishes
export const fetchComments = () => (dispatch) => {   
   return fetch(baseUrl + 'comments')
   .then(response => {
      if (response.ok) {
         return response;
      }
      else {
         var error = new Error('Error ' + response.status + ': ' + response.statusText);
         error.response = response;
         throw error;
      }
   }, 
   error => {
      var errmess = new Error(error.message);
      throw errmess;
   })
   .then(response => response.json())
   .then(comments => dispatch(addComments(comments)))
   .catch(error => dispatch(commentsFailed(error.message)));
}

// Failed to get comments
export const commentsFailed = (errmess) => ({
   type: ActionTypes.COMMENTS_FAILED,
   payload: errmess
});

// Add comments for dishes
export const addComments = (comments) => ({
   type: ActionTypes.ADD_COMMENTS,
   payload: comments
})

// Get promotions
export const fetchPromos = () => (dispatch) => {
   dispatch(promosLoading(true));
   
   return fetch(baseUrl + 'promotions')
   .then(response => {
      if (response.ok) {
         return response;
      }
      else {
         var error = new Error('Error ' + response.status + ': ' + response.statusText);
         error.response = response;
         throw error;
      }
   }, 
   error => {
      var errmess = new Error(error.message);
      throw errmess;
   })
   .then(response => response.json())
   .then(promos => dispatch(addPromos(promos)))
   .catch(error => dispatch(promosFailed(error.message)));
}

// Promos are loading
export const promosLoading = () => ({
   type: ActionTypes.PROMOS_LOADING
});

// Promos failed to load
export const promosFailed = (errmess) => ({
   type: ActionTypes.PROMOS_FAILED,
   payload: errmess
});

// Add promos 
export const addPromos = (promos) => ({
   type: ActionTypes.ADD_PROMOS,
   payload: promos
})

// Get the leaders
export const fetchLeaders = () => (dispatch) => {
   dispatch(leadersLoading(true));
   
   return fetch(baseUrl + 'leaders')
   .then(response => {
      if (response.ok) {
         return response;
      }
      else {
         var error = new Error('Error ' + response.status + ': ' + response.statusText);
         error.response = response;
         throw error;
      }
   }, 
   error => {
      var errmess = new Error(error.message);
      throw errmess;
   })
   .then(response => response.json())
   .then(promos => dispatch(addLeaders(promos)))
   .catch(error => dispatch(leadersFailed(error.message)));
}

// Leaders are loading
export const leadersLoading = () => ({
   type: ActionTypes.LEADERS_LOADING
});

// Leaders failed to load
export const leadersFailed = (errmess) => ({
   type: ActionTypes.LEADERS_FAILED,
   payload: errmess
});

// Add leaders
export const addLeaders = (leaders) => ({
   type: ActionTypes.ADD_LEADERS,
   payload: leaders
})