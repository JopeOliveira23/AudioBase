import { Avatar } from "primereact/avatar";
import { Button } from "primereact/button";
import { Divider } from "primereact/divider";
import { Menu } from "primereact/menu";
import type { MenuItem } from "primereact/menuitem";
import { Toast } from "primereact/toast";

import { useRef } from "react";
import { useTheme } from "../../hooks/useTheme";
import { useNavigate } from "react-router-dom";
import { Auth } from "../../context/auth/auth";

const MenuComponent = () => {
    const { theme, toggleTheme } = useTheme();
    const navigate = useNavigate();

    const menuRight = useRef<Menu>(null);
    const toast = useRef<Toast>(null);

    const currentUsername = localStorage.getItem("currentUser");
    const allUsers = JSON.parse(localStorage.getItem("users") || "[]");
    const loggedUser = allUsers.find((u: any) => u.username === currentUsername);
    const displayName = loggedUser?.username || "Usuário";
    const initial = displayName.charAt(0).toUpperCase();

    const items: MenuItem[] = [
        {
            items: [
                { label: 'Meu perfil', icon: 'pi pi-user' },
                { label: 'Salvos', icon: 'pi pi-bookmark' },
                { label: 'Compras', icon: 'pi pi-shopping-cart' },
                { label: 'Upload', icon: 'pi pi-upload' },
                {
                    label: theme === "light" ? "Modo escuro" : "Modo claro",
                    icon: theme === "light" ? "pi pi-moon" : "pi pi-sun",
                    command: () => toggleTheme()
                },
                { template: () => <Divider /> },
                { label: 'Meus estúdios', icon: 'pi pi-home' },
                { template: () => <Divider /> },
                {
                    label: 'Sair',
                    icon: 'pi pi-sign-out',
                    command: () => {
                        Auth.logout();
                        navigate('/login', { replace: true });
                    }
                }
            ]
        }
    ];

    return (
        <div className="card flex justify-content-center align-items-center">
            <Toast ref={toast} />

            <Menu
                model={items}
                popup
                ref={menuRight}
                id="popup_menu_right"
                popupAlignment="right"
            />

            <Button
                label={displayName}
                icon={
                    <Avatar
                        shape="circle"
                        label={initial}
                        className="mr-2"
                    />
                }
                iconPos="right"
                onClick={(event) => menuRight.current?.toggle(event)}
                aria-controls="popup_menu_right"
                aria-haspopup
                text
                raised
                rounded
            />
        </div>
    );
};

export default MenuComponent;