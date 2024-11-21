import CartButton from "./CartButton";
import mealsImage from "../../assets/meals.jpg"
import styled from "styled-components"

const Header = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 5rem;
  background-color: #8a2b06;
  color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 10%;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.25);
  z-index: 10;
`
const ImageBox = styled.div`
  width: 100%;
  height: 25rem;
  z-index: 0;
  overflow: hidden;
`
const Image = styled.img`
  width: 110%;
  height: 100%;
  object-fit: cover;
  transform: rotateZ(-5deg) translateY(-4rem) translateX(-1rem);
`

const AppHeader = () => {
  return (
    <>
    <Header>
      <h1>ReactMeals</h1>
      <CartButton></CartButton>
    </Header>
    <ImageBox>
      <Image src={mealsImage} alt="Plates of delicious food" />
    </ImageBox>
    </>
  );
};

export default AppHeader;
