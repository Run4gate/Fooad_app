import { useState, useContext } from 'react'
import AppHeader from './components/Layout/AppHeader'
import FoodMain from './components/Food/FoodMain'
import ItemCart from './components/UI/ItemCart/ItemCart'
import CartContext from './context/cart-context'

function App() {
  const ctx = useContext(CartContext)

  return (
    <>
    {ctx.cartVisible && <ItemCart/>}
    <AppHeader/>
    <FoodMain/>
    </>
  )
}

export default App
