import styled from "styled-components";

export const Background = styled.main`
  background: linear-gradient(
    90deg, 
    rgba(28, 28, 28, 1) 0%, 
    rgba(38, 38, 38, 1) 20%, 
    rgba(45, 45, 45, 1) 50%, 
    rgba(38, 38, 38, 1) 80%, 
    rgba(28, 28, 28, 1) 100%
  );
  width: 100vw;
  height: 100vh;
  padding: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ImageBackground = styled.div<{ image: string }>`
  background-image: linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,1)), url(${props => props.image});
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
  min-height: 85vh;
  min-width: 100vw;
  position: fixed;
`;

export const Container = styled.div`
  display: flex;
  align-items: stretch;       /* faz filhos terem a mesma altura */
  justify-content: space-between; /* afasta os filhos para as extremidades */
  z-index: 999;
  flex-wrap: wrap;
  width: 100%;
  min-height: 500px; /* altura mínima */
  position: relative;
  padding: 0 15rem;   /* um padding lateral opcional */
`;

export const TextBlock = styled.div`
  max-width: 25vw;
  min-width: 300px;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  color: white;
  text-align: left;

  h2 {
    font-size: 3.5rem;
    font-weight: 700;
    line-height: 1.2;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
    padding: 0;
    margin: 0;
  }

  p {
    font-size: 1.3rem;
    line-height: 1.6;
    opacity: 0.9;
    padding: 0;
    margin: 0;
  }
`;

export const InfoIcons = styled.div`
  display: flex;
  justify-content: space-between;

  > div {
    display: flex;
    align-items: center;
    gap: 10px;
  }
`;