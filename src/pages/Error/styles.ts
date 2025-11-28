import styled, {keyframes} from "styled-components"
import {WifiX, ArrowClockwise} from "@phosphor-icons/react";

export const Background = styled.main`
  background: rgb(0, 59, 90);
  background: linear-gradient(90deg, rgba(0, 59, 90, 1) 0%, rgba(0, 112, 173, 1) 58%);

  width: 100vw;
  height: 100vh;

  padding: 1rem;

  display: flex;
  justify-content: center;
  align-items: center;
`

export const Card = styled.div`
  display: grid;
  place-items: center;

  background-color: white;

  height: 30rem;
  width: 30rem;

  padding: 2rem;

  border-radius: 15px;

  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);

  img {
    height: 20vh;
    width: 10vw;
    background-color: var(--blue-600);
    padding: 1.5rem;
    border-radius: 15px;
    opacity: 50%;
  }

  @media (max-width: 900px) {
    /* Adicione a media query para //! tablet */
    img {
      height: 10vh;
      width: 10vh;
    }
  }

  @media (max-width: 400px) {
    /* Adicione a media query para //! mobile */
    img {
      width: 20vh;
      height: 20vh;
    }
  }
`

export const Title = styled.h1`
  text-align: center;

  color: #222227;
  font-size: 30px;
  font-weight: bold;
`

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

  margin-bottom: -10rem;
  z-index: 999;

  transform: perspective(300px) rotateX(45deg) rotateY(45deg);
`

export const Text = styled.p`
  text-align: center;
`

export const Button = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  border-radius: 0.5rem;
  width: 11rem;
  height: 2rem;

  cursor: pointer;
  font-size: 13px;

  color: var(--surface-0);
  background-color: var(--blue-500);

  &:hover {
    transform: scale(1.01);
    background-color: #105b83;
  }
`

export const IconWrapper = styled(ArrowClockwise)`
  margin-right: 0.5rem;
`