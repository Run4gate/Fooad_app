import { useEffect, useState } from "react";
import FoodItem from "./FoodItem";
import styled, { keyframes } from "styled-components";
import Card from "../UI/Card";

const animate = keyframes`
    from {
      opacity: 0;
      transform: translateY(3rem);
    }
  
    to {
      opacity: 1;
      transform: translateY(0);
    }
`;

const List = styled.section`
  max-width: 60rem;
  width: 90%;
  margin: 2rem auto;
  animation: ${animate} 1s ease-out forwards;

  & ul {
    list-style: none;
    margin: 0;
    padding: 0;
  }
`;
const Loading = styled.section`
  text-align: center;
  color: white;
`;
const Error = styled.section`
  text-align: center;
  color: red;
`;

const FoodList = () => {
  const [meals, setMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState();
  useEffect(() => {
    const fetchMeals = async () => {
      const response = await fetch(
        "https://react-http-2e5c1-default-rtdb.europe-west1.firebasedatabase.app/meals.json"
      );
      if (!response.ok) {
        throw new Error("Something went wrong!");
      }
      const responseData = await response.json();
      const loadedMeals = [];
      for (const key in responseData) {
        loadedMeals.push({
          id: key,
          key: key,
          name: responseData[key].name,
          description: responseData[key].description,
          price: responseData[key].price,
        });
      }
      setMeals(loadedMeals);
      setIsLoading(false);
    };

    fetchMeals().catch((error) => {
      setIsLoading(false);
      setHttpError(error.message);
    });
  }, []);

  const mealList = meals.map((el) => (
    <FoodItem
      id={el.id}
      key={el.id}
      name={el.name}
      description={el.description}
      price={el.price}
    />
  ));
  if (isLoading) {
    return (
      <Loading>
        <p>Is Loading...</p>
      </Loading>
    );
  }
  if (httpError) {
    return (
      <Error>
        <p>{httpError}</p>
      </Error>
    );
  }

  return (
    <List>
      <Card>
        <ul>{mealList}</ul>
      </Card>
    </List>
  );
};

export default FoodList;
