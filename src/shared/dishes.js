import * as ActionTypes from '../redux/ActionTypes';

export const Dishes = (state = {isLoading: true, errMess: null, dishes:[]}, action) => {
    switch(action.type){
        case ActionTypes.ADD_DISHES:
            return {...state, isLoading: false, errMess: null, dishes: action.payload};
        case ActionTypes.DISHES_LOADING:
            return {...state, isLoading: true, errMess: null, dishes: []};
        case ActionTypes.DISHES_FAILED:
            return {...state, isLoading: false, errMess: action.payload};
        default:
            return state;
    }
};

export const DISHES =
    [
        {
        id: 0,
        name:'Uthappizza',
        image: '/assets/images/uthappizza.png',
        category: 'mains',
        label:'Hot',
        price:'4.99',
        featured: true,
        description:'A unique combination of Indian Uthappam (pancake) and Italian pizza, topped with Cerignola olives, ripe vine cherry tomatoes, Vidalia onion, Guntur chillies and Buffalo Paneer.'                    
        },
        {
        id: 1,
        name:'Zucchipakoda',
        image: '/assets/images/zucchipakoda.png',
        category: 'appetizer',
        label:'',
        price:'1.99',
        featured: false,
        description:'Deep fried Zucchini coated with mildly spiced Chickpea flour batter accompanied with a sweet-tangy tamarind sauce'
        },
        {
        id: 2,
        name:'Vadonut',
        image: '/assets/images/vadonut.png',
        category: 'appetizer',
        label:'New',
        price:'1.99',
        featured: false,
        description:'A quintessential ConFusion experience, is it a vada or is it a donut?'
        },
        {
        id: 3,
        name:'ElaiCheese Cake',
        image: '/assets/images/elaicheesecake.png',
        category: 'dessert',
        label:'',
        price:'2.99',
        featured: false,
        description:'A delectable, semi-sweet New York Style Cheese Cake, with Graham cracker crust and spiced with Indian cardamoms'
        }
    ];