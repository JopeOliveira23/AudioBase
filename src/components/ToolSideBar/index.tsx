import { Button } from "primereact/button";
import { useEffect, useRef, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import * as S from './style.ts'
import SidebarComponent from "../Sidebar/index.tsx";

type SidebarRoute = {
  label: string;
  icon: string;
  path: string;
};

const sidebarRoutes: SidebarRoute[] = [
  { label: "Feed", icon: "pi pi-home", path: "/" },
  { label: "Colaborações", icon: "pi pi-users", path: "/error" },
  { label: "Compromissos", icon: "pi pi-calendar", path: "/error" },
  { label: "Estúdios", icon: "pi pi-map", path: "/error" },
];

const LeftSidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [expanded, setExpanded] = useState(false);
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
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
    }
    setExpanded(false);
  };

  const handleLeave = () => {
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
          className="flex flex-column gap-4 pt-3"
        >
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
                  width: expanded ? "11rem" : "3rem",
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
