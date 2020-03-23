import React from 'react';
import {connect} from 'react-redux';

import {addItem, decrementItem, removeItem} from "../../redux/cart/cart.actions";

import './checkout-item.styles.scss';

const CheckoutItem = ({item, decrementItem, removeItem, addItem}) => {
    const {imageUrl, name, quantity, price} = item;
    return <div className='checkout-item'>
        <div className='image-container'>
            <img src={imageUrl} alt='item'/>
        </div>
        <span className='name'>{name}</span>
        <span className='quantity'>
            <div className='arrow' onClick={() => decrementItem(item)}>&#10094;</div>
            <span className='value'>{quantity}</span>
            <div className='arrow' onClick={() => addItem(item)}>&#10095;</div>
        </span>
        <span className='price'>${price}</span>
        <div className='remove-button' onClick={() => removeItem(item)}>&#10005;</div>
    </div>
};

const mapDispatchToProps = dispatch => ({
    addItem: item => dispatch(addItem(item)),
    decrementItem: item => dispatch(decrementItem(item)),
    removeItem: item => dispatch(removeItem(item))
});

export default connect(null, mapDispatchToProps)(CheckoutItem);
