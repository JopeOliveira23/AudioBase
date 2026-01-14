import { Button } from "primereact/button";
import { Sidebar } from "primereact/sidebar";
import { Toolbar } from "primereact/toolbar";
import { Tooltip } from "primereact/tooltip";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

type SidebarRoute = {
  label: string;
  icon: string;
  path: string;
};

const sidebarRoutes: SidebarRoute[] = [
  { label: 'Feed', icon: 'pi pi-home', path: '/' },
  { label: 'Colaborações', icon: 'pi pi-users', path: '/error' },
  { label: 'Compromissos', icon: 'pi pi-calendar', path: '/error' },
  { label: 'Estúdios', icon: 'pi pi-map', path: '/error' },
];

const LeftSidebar = () => {
  const navigate = useNavigate();
  const [visible, setVisible] = useState(false);
  const closeTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  /* ======================
   * Hover handlers
   * ====================== */
  const handleMouseEnter = () => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
    setVisible(true);
  };

  const handleMouseLeave = () => {
    closeTimeoutRef.current = setTimeout(() => {
      setVisible(false);
    }, 200);
  };

  /* ======================
   * Render helpers
   * ====================== */
  const renderButtons = () =>
    sidebarRoutes.map(route => {
      const tooltipClass = `sidebar-btn-${route.label}`;

      return (
        <div key={route.path}>
          <Tooltip
            target={`.${tooltipClass}`}
            content={route.label}
            position="right"
          />

          <Button
            icon={route.icon}
            className={tooltipClass}
            rounded
            text
            onClick={() => navigate(route.path)}
          />
        </div>
      );
    });

  return (
    <Toolbar
      start={
        <div
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {renderButtons()}
        </div>
      }
    >
      <Sidebar
        visible={visible}
        onHide={() => setVisible(false)}
        showCloseIcon={false}
        modal={false}
        dismissable={false}
        position="left"
      >
        {renderButtons()}
      </Sidebar>
    </Toolbar>
  );
};

export default LeftSidebar;
