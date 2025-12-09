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

const breathAnimation = keyframes`
  0% {
    //transform: scaleX(1.03) scaleY(1.01) rotate(0.15deg);
    filter: drop-shadow(-8px 2px 25px rgba(255, 165, 0, 0.35));
  }

  33% {
    //transform: scaleX(1.01) scaleY(1.05) rotate(-0.2deg);
    filter: drop-shadow(6px -4px 35px rgba(255, 200, 0, 0.45));
  }

  66% {
    //transform: scaleX(1.04) scaleY(1.02) rotate(0.1deg);
    filter: drop-shadow(10px 6px 30px rgba(255, 165, 0, 0.4));
  }

  100% {
    //transform: scaleX(1.03) scaleY(1.01) rotate(0.15deg);
    filter: drop-shadow(-8px 2px 25px rgba(255, 165, 0, 0.35));
  }
`;


export const Logo = styled.img`
  height: 10rem;
  cursor: pointer;
  border-radius: 50%;
  object-fit: contain;
  transition: transform 200ms ease, box-shadow 200ms ease;
  margin-bottom: 1rem;
  
  box-shadow: 
    0 0 20px rgba(255, 140, 0, 0.4),
    0 0 10px rgba(255, 215, 0, 0.3);
  
  &:hover {
    transform: scale(1.05);
    //animation: ${breathAnimation} 4s cubic-bezier(0.4, 0, 0.2, 1) infinite;
    box-shadow: 
      0 0 30px rgba(255, 100, 0, 0.6),
      0 0 15px rgba(255, 200, 0, 0.5),
      0 5px 15px rgba(0, 0, 0, 0.1);
  }
  
  &.pop {
    animation: ${popAnimation} 300ms ease;
    box-shadow: 
      0 0 40px rgba(255, 165, 0, 0.8),
      0 0 20px rgba(255, 215, 0, 0.6);
  }
`;