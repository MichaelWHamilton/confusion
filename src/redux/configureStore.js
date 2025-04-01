import {configureStore, combineReducers} from '@reduxjs/toolkit';
// import {Reducer, initialState} from './reducer';
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
        }
    );

    return store;
}