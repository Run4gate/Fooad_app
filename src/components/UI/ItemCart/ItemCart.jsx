import styled from "styled-components";
import { useContext, useState } from "react";
import CartContext from "../../../context/cart-context";
import Modal from "../Modal";
import CartItem from "./CartItem"
import Checkout from "./Checkout";

const CartTotal = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-weight: bold;
  font-size: 1.5rem;
  margin: 1rem 0;
`;
const CartActions = styled.div`
  text-align: right;
`;
const StyledButton = styled.button`
  font: inherit;
  cursor: pointer;
  border: 1px solid #8a2b06;
  padding: 0.5rem 2rem;
  border-radius: 25px;
  margin-left: 1rem;
  background-color: #8a2b06;
  color: white;
  &:hover,
  &:active {
    background-color: #5a1a01;
    border-color: #5a1a01;
    color: white;
  }
`;
const AltButton = styled.button`
  font: inherit;
  cursor: pointer;
  border: 1px solid #8a2b06;
  padding: 0.5rem 2rem;
  border-radius: 25px;
  margin-left: 1rem;
  color: #8a2b06;
  background-color: transparent;
  &:hover,
  &:active {
    background-color: #5a1a01;
    border-color: #5a1a01;
    color: white;
  }
`;
const Items = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  max-height: 20rem;
  overflow: auto;
`;

const ItemCart = () => {
  const [isCheckout, setIsCheckout] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const ctx = useContext(CartContext);
  const totalAmount = `$${ctx.totalAmount.toFixed(2)}`
  const cartItemAddHandler = (item) => {
    ctx.add({...item, amount:1})
  }
  const cartItemRemoveHandler = (id) => {
    ctx.remove(id)
  }
  const orderHandler = () => {
    setIsCheckout(true)
  }
  const submitHandler = async (values) => {
    setIsSubmitting(true)
    await fetch('https://react-http-2e5c1-default-rtdb.europe-west1.firebasedatabase.app/orders.json', {
      method: 'POST',
      body: JSON.stringify({user: values,
      order: ctx.cart})
    })
    setIsSubmitting(false)
    setIsSubmitted(true)
  }
  const finishHandler = () => {
    ctx.setCartVisible()
    ctx.clear()
    setIsSubmitted(false)
  }
  const cartItems = (
    <Items>
      {ctx.cart.map((el) => (
        <CartItem
        key={el.id}
        name={el.name}
        amount={el.amount}
        price={el.price}
        onAdd={cartItemAddHandler.bind(null, el)}
        onRemove={cartItemRemoveHandler.bind(null, el.id)}
        />
      ))}
    </Items>
  );
  const CartBody = (
    <>
         {cartItems}
      <CartTotal>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </CartTotal>
      {isCheckout && <Checkout onSubmitHandler={submitHandler}/>}
      {!isCheckout && <CartActions>
        <AltButton onClick={ctx.setCartVisible}>Close</AltButton>
        {ctx.cart.length > 0 && <StyledButton onClick={orderHandler}>Order</StyledButton>}
      </CartActions>}
    </>
  )
  const isSubmittingContent = <p>Sending the order data...</p>
  const contentIsSubmitted = <>
  <p>Order Succesfully Submitted!</p>
  <AltButton onClick={finishHandler}>Close</AltButton>
  </>

  return (
    <Modal>
      {!isSubmitting && !isSubmitted && CartBody}
      {isSubmitting && isSubmittingContent}
      {isSubmitted && contentIsSubmitted}
    </Modal>
  );
};

export default ItemCart;
