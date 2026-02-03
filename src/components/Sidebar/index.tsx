import { Button } from "primereact/button";
import { Divider } from "primereact/divider";
import { Sidebar } from "primereact/sidebar";
import { useState } from "react";
import * as S from "./style.ts";
import PanelMenuCustom from "../PanelMenu/index.tsx";

type SidebarComponentProps = {
  expanded: boolean;
  onClose: () => void;
};

const SidebarComponent = ({ expanded, onClose }: SidebarComponentProps) => {
  const [visible, setVisible] = useState(false);

  const handleHide = () => {
    setVisible(false);
    onClose(); // 🔑 avisa o pai
  };

  return (
    <>
      <Sidebar visible={visible} onHide={handleHide}>
        <S.SidebarContent>
          <S.SidebarHeader>
            <h2>Sobre Nós</h2>
            <p>
              Somos uma plataforma que busca facilitar a vida de artistas, produtores,
              estúdios e engenheiros de áudio.
            </p>
            <Divider />
            <h2>Planos e Serviços</h2>
          </S.SidebarHeader>
          <S.SidebarBody>
            <PanelMenuCustom />
          </S.SidebarBody>
          <S.SidebarFooter>
            <Divider />
            <h2>Contato</h2>
            <div className="flex justify-content-center gap-3">
              <Button icon="pi pi-phone" severity="info" text raised />
              <Button icon="pi pi-envelope" severity="danger" text raised />
              <Button icon="pi pi-whatsapp" severity="success" text raised />
              <Button icon="pi pi-instagram" severity="help" text raised />
            </div>
          </S.SidebarFooter>
        </S.SidebarContent>
      </Sidebar>

      <Button
        icon="pi pi-bars"
        raised
        className="justify-content-start"
        style={{
          width: expanded ? "11rem" : "3rem",
          transition: "width 0.2s ease"
        }}
        onClick={() => setVisible(true)}
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
          Mais
        </span>
      </Button>
    </>
  );
};

export default SidebarComponent;
