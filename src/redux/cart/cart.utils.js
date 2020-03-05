export const addItemToCart = (cartItems, newItem) => {
    const existingCartItem = cartItems.find(item => item.id === newItem.id);

    if (existingCartItem) {
        return cartItems.map(item =>
            item.id === newItem.id ? {...item, quantity: item.quantity + 1} : item
        );
    }

    return [...cartItems, {...newItem, quantity: 1}];
};

export const decrementItemInCart = (cartItems, itemToDecrement) => {
    const existingCartItem = cartItems.find(item => item.id === itemToDecrement.id);

    if (existingCartItem.quantity == 1) {
        return cartItems.filter(item => item.id !== itemToDecrement.id);
    }

    return cartItems.map(item => item.id === itemToDecrement.id ? {...item, quantity: item.quantity - 1} : item);
};
