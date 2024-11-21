import { useFormik } from "formik";
import * as Yup from "yup";
import styled from "styled-components";
import CartContext from "../../../context/cart-context";
import { useContext } from "react";

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
const StyledCheckout = styled.form`
  margin: 1rem 0;
  height: 19rem;
  overflow: auto;
`
const StyledControl = styled.div`

  margin-bottom: 0.5rem;


& label {
  font-weight: bold;
  margin-bottom: 0.25rem;
  display: block;
}

& input {
  font: inherit;
  border: 1px solid #ccc;
  border-radius: 4px;
  width: 20rem;
  max-width: 100%;
}
&.invalid label {
  color: #ca3e51;
}

&.invalid input {
  border-color: #aa0b20;
  background-color: #ffeff1;
}
`
const StyledActions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
`



const Checkout = (props) => {
  const ctx = useContext(CartContext)
  const formik = useFormik({
    initialValues: {
      name: "",
      street: "",
      postal: "",
      city: "",
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .required()
        .max(25),
      street: Yup.string().required(),
      postal: Yup.string().required().length(5),
      city: Yup.string().required(),
    }),
    onSubmit: (values) => props.onSubmitHandler(values)
  });

  return (
    <StyledCheckout onSubmit={formik.handleSubmit}>
      <StyledControl className={formik.errors.name && formik.touched.name ? 'invalid' : null}>
        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          name="name"
          placeholder="Your Name"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.name}
        />

      </StyledControl>
      <StyledControl className={formik.errors.street && formik.touched.street ? 'invalid' : null}>
        <label htmlFor="street">Street</label>
        <input
          type="text"
          id="street"
          name="street"
          placeholder="Your Street"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.street}
        />
      </StyledControl>
      <StyledControl className={formik.errors.postal && formik.touched.postal ? 'invalid' : null}>
        <label htmlFor="postal">Postal Code</label>
        <input
          type="text"
          id="postal"
          name="postal"
          placeholder="Your Postal Code"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.postal}
        />
      </StyledControl>
      <StyledControl className={formik.errors.city && formik.touched.city ? 'invalid' : null}>
        <label htmlFor="city">City</label>
        <input
          type="text"
          id="city"
          name="city"
          placeholder="Your City"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.city}
        />
      </StyledControl>
      <StyledActions>
      <AltButton onClick={ctx.setCartVisible}>Cancel</AltButton>
      <StyledButton type="submit">Submit</StyledButton>
      </StyledActions>
    </StyledCheckout>
  );
};

export default Checkout;
