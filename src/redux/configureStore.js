import {configureStore, combineReducers, applyMiddleware} from '@reduxjs/toolkit';
import {thunk} from 'redux-thunk';
import logger from 'redux-logger';
import { Dishes } from './dishes'; 
import { Comments } from './comments'; 
import { Promotions } from './promotions'; 
import { Leaders } from './leaders'; 


export const ConfigureStore = () => {
    const store = configureStore ({
            reducer: combineReducers({
                dishes: Dishes,
                comments: Comments,
                promotions: Promotions,
                leaders: Leaders
            })
        },
        applyMiddleware(thunk, logger)
    );

    return store;
}