import styled, {keyframes} from "styled-components"
import {WifiX} from "@phosphor-icons/react";

export const Background = styled.div`
  background: linear-gradient(
    90deg, 
    rgba(28, 28, 28, 1) 0%, 
    rgba(38, 38, 38, 1) 20%, 
    rgba(45, 45, 45, 1) 50%, 
    rgba(38, 38, 38, 1) 80%, 
    rgba(28, 28, 28, 1) 100%
  );

  width: 100%;
  height: 100%;

  padding: 1rem;

  display: flex;
  justify-content: center;
  align-items: center;
`

export const ImageWrapper = styled.div`
  position: relative;
  width: 50%;
  height: 50%;
  margin: 0 auto;
  
  display: flex;
  justify-content: center;
  align-items: center;

  border-radius: 25px;
  overflow: hidden;

  background-color: #5b8297b2;;
`;

export const ErrorImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
  display: block;
  padding: 1rem;
`;


const animation = keyframes`
  0%              { opacity: 000%;  filter: drop-shadow(0 0 1em #ffffff); }
  25%, 50%, 75%   { opacity: 100%;  filter: none; };
  100%            { opacity: 000%;  filter: drop-shadow(0 0 1em #ffffff); }

  from {
    transform: rotateY(0deg);
  }
  to {
    transform: rotateY(360deg);
  }
`

export const Wifi = styled(WifiX)`
  animation-name: ${animation};
  animation-duration: 5s;
  animation-iteration-count: infinite;

  width: 50px;
  height: 50px;

  position: absolute;
  transform: perspective(300px) rotateX(45deg) rotateY(45deg);
  pointer-events: none;
  z-index: 999;
`;