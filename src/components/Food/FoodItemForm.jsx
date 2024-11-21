import { useContext, useRef, useState } from "react";
import CartContext from "../../context/cart-context";
import Input from "../UI/Input";
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
const Form = styled.form`
  text-align: right;
`;
const Bump = styled.button`

  font: inherit;
  cursor: pointer;
  background-color: #8a2b06;
  border: 1px solid #8a2b06;
  color: white;
  padding: 0.25rem 2rem;
  border-radius: 20px;
  font-weight: bold;


&:hover {
  background-color: #641e03;
  border-color: #641e03;
}
&:active {
  background-color: #641e03;
  border-color: #641e03;
  animation: ${animate} 300ms ease-out; 
}
`

const FoodItemForm = (props) => {
  const [amountIsValid, setAmountIsValid] = useState(true)
  const amountInputRef = useRef()
  const submitHandler = (event) => {
    event.preventDefault()
    const enteredAmount = amountInputRef.current.value
    const num = +enteredAmount
    if (
      enteredAmount.trim().length === 0 ||
      num < 1 ||
      num > 5
    ) {
      setAmountIsValid(false)
      return;
    }
    setAmountIsValid(true)
     props.onAddToCart(num)
  }
  return (
    <Form onSubmit={submitHandler}>
      <Input
        ref={amountInputRef}
        label="Amount"
        input={{
          id: "amount_" + props.id,
          type: "number",
          min: "1",
          max: "5",
          step: "1",
          defaultValue: "1",
        }}
      />
      <Bump type="submit">+ Add</Bump>
      {!amountIsValid && <p>Please enter a valid amount from 1 to 5</p>}
    </Form>
  );
};
export default FoodItemForm;
