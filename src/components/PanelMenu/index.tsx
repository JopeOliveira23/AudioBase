import type { MenuItem } from "primereact/menuitem";
import { PanelMenu } from "primereact/panelmenu";

const PanelMenuCustom = () => {
  const items: MenuItem[] = [
    {
      label: 'Artistas',
      icon: 'pi pi-users',
      items: [
        {
          label: 'Compositores',
          icon: 'pi pi-file-edit',
          items: [
            {
              label: 'Letristas',
              icon: 'pi pi-pencil',
            },
            {
              label: 'Interpretes',
              icon: 'pi pi-microphone'
            }
          ]
        },
        {
          label: 'Produtores',
          icon: 'pi pi-desktop',
          items: [
            {
              label: 'Type Beat',
              icon: 'pi pi-headphones'
            },
            {
              label: 'Mixagem',
              icon: 'pi pi-sliders-v'
            },
            {
              label: 'Masterização',
              icon: 'pi pi-volume-up'
            }
          ]
        },
      ]
    },
    {
      label: 'Estudios',
      icon: 'pi pi-home',
      items: [
        {
          label: 'Procurar um Estudio',
          icon: 'pi pi-search'
        },
        {
          label: 'Cadastrar um Estudio',
          icon: 'pi pi-map-marker'
        },
      ]
    }
  ];
  
  return (
    <div className="card flex justify-content-center">
        <PanelMenu model={items} className="w-full md:w-20rem" />
    </div>
  )
}

export default PanelMenuCustom;