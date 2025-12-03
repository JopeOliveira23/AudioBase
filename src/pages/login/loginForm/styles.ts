import styled, { keyframes } from "styled-components"

const popAnimation = keyframes`
  0% {
    transform: scale(1.05);
  }
  50% {
    transform: scale(1);
  }
  100% {
    transform: scale(1.05);
  }
`;

export const Logo = styled.img`
  height: 10rem;
  cursor: pointer;
  border-radius: 50%;
  object-fit: contain;
  transition: all 0.3s ease;
  margin-bottom: 1rem;
  
  /* Sombra com gradiente quente */
  box-shadow: 
    0 0 20px rgba(255, 165, 0, 0.4),
    0 0 10px rgba(255, 215, 0, 0.3);
  
  &:hover {
    transform: scale(1.05);
    box-shadow: 
      0 0 30px rgba(255, 140, 0, 0.6),
      0 0 15px rgba(255, 215, 0, 0.5),
      0 5px 15px rgba(0, 0, 0, 0.1);
  }
  
  &.pop {
    animation: ${popAnimation} 0.3s ease;
    box-shadow: 
      0 0 40px rgba(255, 100, 0, 0.8),
      0 0 20px rgba(255, 200, 0, 0.6);
  }
`;