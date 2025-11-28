import { Button } from "primereact/button";
import { Divider } from "primereact/divider";
import { Sidebar } from "primereact/sidebar";
import { useState } from "react";
import * as S from "./style.ts";
import PanelMenuCustom from "../PanelMenu/index.tsx";

const SidebarComponent = () => {
  const [visible, setVisible] = useState(false);

  const SocialMedia = () => {
    return (
      <div className="flex flex-wrap justify-content-center gap-3">
        <div className="flex flex-wrap justify-content-center gap-3">
            <Button icon="pi pi-phone" severity='info' text raised size='large' />
            <Button icon="pi pi-envelope" severity='danger' text raised size='large' />
            <Button icon="pi pi-whatsapp" severity='success' text raised size='large' />
            <Button icon="pi pi-instagram" severity='help' text raised size='large' />
        </div>
      </div>
    )
  }

  return (
    <>
      <Sidebar visible={visible} onHide={() => setVisible(false)}>
        <S.SidebarContent>
          <S.SidebarHeader>
            <h2>Sobre Nós</h2>
            <p>
              Somos uma plataforma que busca facilitar a vida de artistas, produtores,
              estúdios e engenheiros de áudio.
            </p>
            <p>Nossa missão é unificar tudo num único lugar.</p>
            <p>
              Uma plataforma colaborativa que visa reconhecer e intermediar a dedicação
              de cada profissional.
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
            <SocialMedia />
          </S.SidebarFooter>
        </S.SidebarContent>
      </Sidebar>
      <Button icon="pi pi-bars" onClick={() => setVisible(true)} text raised />
    </>
  )
}

export default SidebarComponent;