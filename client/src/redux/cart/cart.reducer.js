import CartActionTypes from "./cart.types";

import {addItemToCart, decrementItemInCart} from './cart.utils';

const INITIAL_STATE = {
    hidden: true,
    cartItems: []
};

const cartReducer = (state = INITIAL_STATE, action) => {
    const {hidden, cartItems} = state;

    switch (action.type) {
        case CartActionTypes.TOGGLE_CART_HIDDEN:
            return {
                ...state,
                hidden: !hidden
            };
        case CartActionTypes.ADD_ITEM:
            return {
                ...state,
                cartItems: addItemToCart(state.cartItems, action.payload)
            };
        case CartActionTypes.REMOVE_ITEM:
            return {
                ...state,
                cartItems: cartItems.filter(item => item.id !== action.payload.id)
            };
        case CartActionTypes.DECREMENT_ITEM:
            return {
                ...state,
                cartItems: decrementItemInCart(state.cartItems, action.payload)
            };
        case CartActionTypes.CLEAR_CART:
            return {
                ...state,
                cartItems: []
            };
        default:
            return state;
    }
};

export default cartReducer;
