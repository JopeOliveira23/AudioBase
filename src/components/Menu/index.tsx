import { Avatar } from "primereact/avatar";
import { Button } from "primereact/button";
import { Divider } from "primereact/divider";
import { Menu } from "primereact/menu";
import type { MenuItem } from "primereact/menuitem";
import { Toast } from "primereact/toast";

import { useRef } from "react";
import { useTheme } from "../../hooks/useTheme";

const MenuComponent = () => {
    const { theme, toggleTheme } = useTheme();

    const menuRight = useRef<Menu>(null);
    const toast = useRef<Toast>(null);
    
    const items: MenuItem[] = [
        {
            items: [
                {
                    label: 'Meu perfil',
                    icon: 'pi pi-user',
                },
                {
                    label: 'Salvos',
                    icon: 'pi pi-bookmark',
                },
                {
                    label: 'Compras',
                    icon: 'pi pi-shopping-cart',
                },
                {
                    label: 'Upload',
                    icon: 'pi pi-upload',
                },
                {
                    label: theme === "light" ? "Modo escuro" : "Modo claro", // Label dinâmico
                    icon: theme === "light" ? 'pi pi-moon' : 'pi pi-sun', // Ícone dinâmico
                    command: () => toggleTheme() // Chama diretamente
                },
                {
                  template: () => <Divider />
                },
                {
                  label: 'Meus estudios',
                  icon: 'pi pi-home',
                },
                {
                  template: () => <Divider />
                },
                {
                    label: 'Sair',
                    icon: 'pi pi-sign-out',
                }
            ]
        }
    ];

    return (
        <div className="card flex justify-content-center align-items-center">
            <Toast ref={toast}></Toast>
            <Menu model={items} popup ref={menuRight} id="popup_menu_right" popupAlignment="right" />            
            <Button 
                label='João Oliveira' 
                icon={
                    <Avatar  
                        image="https://avatars.githubusercontent.com/u/109597841?s=400&u=a84af5e9f6fea9b909be2a789a9bd88d27a157de&v=4" 
                        shape='circle' 
                        className="mr-2" 
                    />
                } 
                iconPos='right' 
                onClick={(event) => menuRight.current?.toggle(event)} 
                aria-controls="popup_menu_right" 
                aria-haspopup 
                text 
                raised 
                rounded 
            />
        </div>
    )
}

export default MenuComponent;