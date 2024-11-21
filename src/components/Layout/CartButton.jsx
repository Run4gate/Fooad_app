import { useContext, useEffect, useState } from "react";
import CartIcon from "./CartIcon";
import CartContext from "../../context/cart-context";
import styled, {keyframes} from "styled-components";

const animate = keyframes`
0% {
  transform: scale(1);
}
10% {
  transform: scale(0.9);
}
30% {
  transform: scale(1.1);
}
50% {
  transform: scale(1.15);
}
100% {
  transform: scale(1);
}
`
const Badge = styled.label`
background-color: #b94517;
padding: 0.25rem 1rem;
border-radius: 25px;
margin-left: 1rem;
font-weight: bold;
`
const Button = styled.button`
cursor: pointer;
font: inherit;
border: none;
background-color: #4d1601;
color: white;
padding: 0.75rem 3rem;
display: flex;
justify-content: space-around;
align-items: center;
border-radius: 25px;
font-weight: bold;
& label {
  cursor: pointer;
}
&:hover,
&:active {
  background-color: #2c0d00;
}
&.bump{
  animation: ${animate} 300ms ease-out; 
}
&:hover,
&:active ${Badge} {
  background-color: #92320c;
}
`
const Icon = styled.span`
width: 1.35rem;
height: 1.35rem;
margin-right: 0.5rem;
`
const CartButton = () => {
    const ctx = useContext(CartContext)
    const [isBumped, setIsBumped] = useState(false)
    useEffect(()=> {
      if (ctx.cart.length> 0) {
        setIsBumped(true)
        setTimeout(()=> setIsBumped(false), 300)
      }
      return clearTimeout
    }, [ctx.cart])
    const items = ctx.cart
    const itemsAmount = items.reduce((curNumber, item) => {
      return curNumber + item.amount;
    }, 0);

  return (
    <Button onClick={ctx.setCartVisible} className={isBumped && 'bump'}>
      <Icon>
      <CartIcon />
      </Icon>
      <label>Your Cart</label>
      <Badge>{itemsAmount}</Badge>
    </Button>
  );
};

export default CartButton;
