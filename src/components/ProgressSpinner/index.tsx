// src/pages/LoadingPage.tsx
import { ProgressSpinner } from "primereact/progressspinner";
import { useEffect, useState } from "react";

interface LoadingPageProps {
  minDisplayTime?: number; // Tempo mínimo em milissegundos (opcional)
}

const LoadingComponent = ({ minDisplayTime = 2000 }: LoadingPageProps) => {
  const [shouldShow, setShouldShow] = useState(true);
  const [startTime] = useState(Date.now());

  useEffect(() => {
    const ensureMinimumTime = () => {
      const elapsed = Date.now() - startTime;
      const remaining = Math.max(0, minDisplayTime - elapsed);

      if (remaining > 0) {
        // Ainda não passou o tempo mínimo, aguarda o restante
        setTimeout(() => {
          setShouldShow(false);
        }, remaining);
      } else {
        // Já passou o tempo mínimo, pode esconder
        setShouldShow(false);
      }
    };

    ensureMinimumTime();
  }, [minDisplayTime, startTime]);

  // Quando shouldShow for false, retorna null para o Suspense continuar
  if (!shouldShow) {
    return null;
  }

  return (
    <div 
      className="flex justify-content-center align-items-center" 
      style={{ 
        height: '100vh',
        background: 'var(--surface-ground)'
      }}
    >
      <div className="flex flex-column align-items-center gap-3">
        <ProgressSpinner 
          style={{ 
            width: '60px', 
            height: '60px' 
          }} 
          strokeWidth="4" 
          fill="transparent" 
          animationDuration=".8s" 
        />
        <div className="text-center">
          <p className="text-900 font-medium mb-1">Carregando</p>
          <small className="text-600">Aguarde um momento...</small>
        </div>
      </div>
    </div>
  );
};

export default LoadingComponent;