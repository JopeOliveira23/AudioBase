// src/pages/LoadingPage.tsx
import { ProgressSpinner } from "primereact/progressspinner";

const Loading = () => {
  return (
    <div className="flex justify-content-center align-items-center" style={{ height: '100vh' }}>
      <ProgressSpinner style={{width: '50px', height: '50px'}} strokeWidth="8" fill="var(--surface-ground)" animationDuration=".5s" />
    </div>
  );
};

export default Loading;