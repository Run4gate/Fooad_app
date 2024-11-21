import { useContext } from "react"
import CartContext from "../../context/cart-context"
import styled from "styled-components"
import FoodItemForm from "../Food/FoodItemForm"

const Item = styled.li`
    display: flex;
    justify-content: space-between;
    margin: 1rem;
    padding-bottom: 1rem;
    border-bottom: 1px solid #ccc;

  
  & h3 {
    margin: 0 0 0.25rem 0;
  }
  
  & span {
    font-style: italic;
  }
  
  & p {
    margin-top: 0.25rem;
    font-weight: bold;
    color: #ad5502;
    font-size: 1.25rem;
  }
`

const FoodItem = (props) => {
  const ctx = useContext(CartContext)
  const addToCartHandler = (amount) => {
    ctx.add({
      id: props.id,
      name: props.name,
      amount: amount,
      price: props.price,
    })
  }
    return (
        <Item>
            <div>
            <h3>{props.name}</h3>
            <span>{props.description}</span>
            <p>{props.price} $</p>
            </div>
            <FoodItemForm id={props.id} onAddToCart={addToCartHandler}/>
        </Item>
    )
}

export default FoodItem