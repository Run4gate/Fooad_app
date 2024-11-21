import React, { useState, useReducer } from "react";

const defaultCartState = {
  items: [],
  totalAmount: 0,
};
const cartReducer = (state, action) => {
  if (action.type === "ADD") {
    const updatedTotalAmount =
      state.totalAmount + action.item.price * action.item.amount;
    const alreadyExistingItemIndex = state.items.findIndex(
      (item) => item.id === action.item.id
    );
    const alreadyExistingItem = state.items[alreadyExistingItemIndex];
    let updatedItem;
    let updatedItems;
    if (alreadyExistingItem) {
      updatedItem = {
        ...alreadyExistingItem,
        amount: alreadyExistingItem.amount + action.item.amount,
      };
      updatedItems = [...state.items];
      updatedItems[alreadyExistingItemIndex] = updatedItem;
    } else {
      updatedItems = state.items.concat(action.item);
    }
    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount,
    };
  }
  if (action.type === "REMOVE") {
    const alreadyExistingItemIndex = state.items.findIndex(
      (item) => item.id === action.id
    );
    const alreadyExistingItem = state.items[alreadyExistingItemIndex];
    const updatedTotalAmount = state.totalAmount - alreadyExistingItem.price;
    let updatedItems;
    if (alreadyExistingItem.amount === 1) {
      updatedItems = state.items.filter((item) => item.id !== action.id);
    } else {
      const updatedItem = {
        ...alreadyExistingItem,
        amount: alreadyExistingItem.amount - 1,
      };
      updatedItems = [...state.items];
      updatedItems[alreadyExistingItemIndex] = updatedItem;
    }
    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount,
    };
  }
  if (action.type === "CLEAR") {
    return defaultCartState;
  }
  return defaultCartState;
};

const CartContext = React.createContext({
  cart: [],
  totalAmount: 0,
  cartVisible: false,
  setCartVisible: () => {},
  add: (item) => {},
  remove: (id) => {},
  clear: () => {}
});

export const CartContextProvider = (props) => {
  const [cartState, dispatchCart] = useReducer(cartReducer, defaultCartState);
  const addToCart = (item) => {
    dispatchCart({ type: "ADD", item: item });
  };
  const removeFromCart = (id) => {
    dispatchCart({ type: "REMOVE", id: id });
  };
  const clearCart = () => {
    dispatchCart({ type: "CLEAR" });
  };
  const [cartIsShown, setCartIsShown] = useState(false);
  const cartVisibilityHandler = () => {
    setCartIsShown((cartIsShown) => !cartIsShown);
  };
  return (
    <CartContext.Provider
      value={{
        totalAmount: cartState.totalAmount,
        cart: cartState.items,
        cartVisible: cartIsShown,
        setCartVisible: cartVisibilityHandler,
        add: addToCart,
        remove: removeFromCart,
        clear: clearCart
      }}
    >
      {props.children}
    </CartContext.Provider>
  );
};

export default CartContext;
