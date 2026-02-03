import { Button } from "primereact/button";
import { useEffect, useRef, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import * as S from './style.ts'
import SidebarComponent from "../Sidebar/index.tsx";
import logo from "../../assets/logo.png";

type SidebarRoute = {
  label: string;
  icon: string;
  path: string;
};

const sidebarRoutes: SidebarRoute[] = [
  { label: "Página Inicial", icon: "pi pi-home", path: "/" },
  { label: "Minhas Letras", icon: "pi pi-pen-to-square", path: "/error" },
  { label: "Minhas Gravações", icon: "pi pi-microphone", path: "/error" },
  { label: "Minhas Produções", icon: "pi pi-headphones", path: "/error" },
  { label: "Compromissos", icon: "pi pi-calendar", path: "/error" },
  { label: "Buscar Estúdios", icon: "pi pi-map", path: "/error" },
];

const LeftSidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [expanded, setExpanded] = useState(false);
  const [locked, setLocked] = useState(false);
  const [activeLabel, setActiveLabel] = useState("Feed");
  const closeTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const active = sidebarRoutes.find(r => r.path === location.pathname);
    if (active) setActiveLabel(active.label);
  }, [location.pathname]);

  const handleEnter = () => {
    if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current);
    setExpanded(true);
  };

  const handleSidebarClose = () => {
    if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current);
    setLocked(false);
    setExpanded(false);
  };

  const handleLeave = () => {
    if (locked) return;

    closeTimeoutRef.current = setTimeout(() => {
      setExpanded(false);
    }, 120);
  };

  return (
    <S.ToolbarCustom
      className="flex flex-column justify-content-between"
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}

      start={
        <div
          className="flex flex-column gap-4"
        >
          <div className="flex align-items-center justify-content-between pl-2 py-2">
            <img
              src={logo}
              alt="AudioBase"
              width={40}
              height="auto"
            />


            {expanded && (
              <Button
                icon={locked ? "pi pi-lock" : "pi pi-lock-open"}
                rounded
                text={locked ? false : true}
                outlined={locked ? true : false}
                onClick={() => setLocked(prev => !prev)}
              />
            )}
          </div>
          {sidebarRoutes.map(route => {
            const isActive = route.label === activeLabel;

            return (
              <Button
                key={route.label}
                icon={route.icon}
                rounded
                text={!isActive}
                raised={isActive}
                className="justify-content-start"
                style={{
                  width: expanded ? "11.5rem" : "3rem",
                  transition: "width 0.2s ease"
                }}
                onClick={() => {
                  setActiveLabel(route.label);
                  navigate(route.path);
                }}
              >
                <span
                  style={{
                    marginLeft: "0.75rem",
                    whiteSpace: "nowrap",
                    opacity: expanded ? 1 : 0,
                    transform: expanded
                      ? "translateX(0)"
                      : "translateX(-6px)",
                    transition: "all 0.2s ease"
                  }}
                >
                  {route.label}
                </span>
              </Button>
            );
          })}
        </div>
      }

      end={
        <div
          className="flex flex-column gap-4"
        >
          <SidebarComponent
            expanded={expanded}
            onClose={handleSidebarClose}
          />
        </div>
      }
    />
  );
};

export default LeftSidebar;
