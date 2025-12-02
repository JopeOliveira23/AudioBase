import styled, {keyframes} from "styled-components"
import {WifiX} from "@phosphor-icons/react";

export const Background = styled.main`
  background: #003b5aff;
  background: linear-gradient(90deg, rgba(0, 59, 90, 1) 0%, rgba(0, 112, 173, 1) 58%);

  width: 100vw;
  height: 100vh;

  padding: 1rem;

  display: flex;
  justify-content: center;
  align-items: center;
`

export const ImageWrapper = styled.div`
  position: relative;
  width: 10rem;
  height: 10rem;
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

  width: 60px;
  height: 60px;

  position: absolute;
  transform: perspective(300px) rotateX(45deg) rotateY(45deg);
  pointer-events: none;
  z-index: 999;
`;