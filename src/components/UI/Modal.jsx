import { createPortal } from "react-dom";
import styled, {keyframes} from "styled-components";

const animate = keyframes`
    from {
      opacity: 0;
      transform: translateY(-3rem);
    }

    to {
      opacity: 1;
      transform: translateY(0);
    }
`

const StyledBackdrop = styled.div`
position: fixed;
top: 0;
left: 0;
width: 100%;
height: 100vh;
z-index: 20;
background-color: rgba(0, 0, 0, 0.75);
`
const StyledModal = styled.div`
position: fixed;
top: 20vh;
left: 5%;
width: 90%;
background-color: white;
padding: 1rem;
border-radius: 14px;
box-shadow: 0 2px 8px rgba(0, 0, 0, 0.25);
z-index: 30;
animation: ${animate} 300ms ease-out forwards;
@media (min-width: 768px) {
      width: 40rem;
      left: calc(50% - 20rem);
  }
`


const Backdrop = (props) => {
    return <StyledBackdrop  onClick={props.onClose}/>;
  };
  
  const ModalOverlay = (props) => {
    return (
      <StyledModal >
        {props.children}
      </StyledModal>
    );
  };
  
  const portalElement = document.getElementById('overlay-root');
  
  const Modal = (props) => {
    return (
      <>
        {createPortal(<Backdrop onClose={props.onClose} />, portalElement)}
        {createPortal(
          <ModalOverlay>{props.children}</ModalOverlay>,
          portalElement
        )}
      </>
    );
  };
  
  export default Modal;