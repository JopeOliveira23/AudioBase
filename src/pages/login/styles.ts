import { Button } from "primereact/button";
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

export const Main = styled.div`
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

export const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 2rem;
`;

export const GlassButton = styled(Button)`
  /* 🎐 Glass Effect */
  background: rgba(255, 255, 255, 0.06);
  backdrop-filter: blur(5px) saturate(120%);
  -webkit-backdrop-filter: blur(5px) saturate(120%);
  border: 1px solid rgba(255, 255, 255, 0.25);

  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.25);

  transition:
    transform 120ms cubic-bezier(0.4, 0, 0.2, 1),
    box-shadow 120ms cubic-bezier(0.4, 0, 0.2, 1);

  &:hover {
    transform: translateY(-1px);
  }

  &:active {
    transform: translateY(1px);
    box-shadow: 0 4px 14px rgba(0, 0, 0, 0.35);
  }
`;


export const CardGlass = styled.div`
  width: 35rem;
  height: 100%;
  flex: 1;

  display: flex;
  flex-direction: column;
  justify-content: space-between;

  padding: 2rem;
  border-radius: 15px;

  color: #fff;
  text-align: left;

  /* 🎐 Glass Effect */
  background: rgba(255, 255, 255, 0.06);
  backdrop-filter: blur(5px) saturate(120%);
  -webkit-backdrop-filter: blur(5px) saturate(120%);
  border: 1px solid rgba(255, 255, 255, 0.25);

  /* Profundidade */
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.25);

  /* Melhora renderização do blur */
  transform: translateZ(0);
  
  position: relative;
  overflow: hidden;

  .content {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100%;

    transition:
      opacity 1000ms cubic-bezier(0.4, 0, 0.2, 1),
      transform 1000ms cubic-bezier(0.4, 0, 0.2, 1);

    will-change: opacity, transform;
  }

  .fade-in {
    opacity: 1;
    transform: translateY(0);
  }

  .fade-out {
    opacity: 0;
    transform: translateY(4px);
  }

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

    >i {
      font-size: 1.5rem;
      border-radius: 25px;
      padding: 10px;
      background: var(--highlight-bg);
      color: var(--primary-color)

    }
  }
`;