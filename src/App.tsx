import 'primereact/resources/themes/mira/theme.css';

import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';

import './App.ts'

import { Toolbar } from 'primereact/toolbar';


import { Sidebar } from 'primereact/sidebar';
import { Button } from 'primereact/button';

import { PanelMenu } from 'primereact/panelmenu';
import { Divider } from 'primereact/divider';
        
import { useEffect, useRef, useState } from 'react'; 

import { SelectButton } from 'primereact/selectbutton';
import { AutoComplete, type AutoCompleteCompleteEvent } from 'primereact/autocomplete';

import * as S from './App.ts';
import { Avatar } from 'primereact/avatar';
import { Card } from 'primereact/card';
import { Badge } from 'primereact/badge';

import { Menu } from 'primereact/menu';
import type { MenuItem } from 'primereact/menuitem';
import { Toast } from 'primereact/toast';

import { Carousel, type CarouselResponsiveOption } from "primereact/carousel";
import { Tag } from "primereact/tag";

interface Product {
    id: string;
    code: string;
    name: string;
    description: string;
    image: string;
    price: number;
    category: string;
    quantity: number;
    inventoryStatus: string;
    rating: number;
}

const CarouselItems = () => {
    const [products, setProducts] = useState<Product[]>([]);

    // 🔥 Mock direto no componente
    const mockProducts: Product[] = [
        {
            id: "1000",
            code: "f230fh0g3",
            name: "Bamboo Watch",
            description: "Product Description",
            image: "bamboo-watch.jpg",
            price: 65,
            category: "Accessories",
            quantity: 24,
            inventoryStatus: "INSTOCK",
            rating: 5
        },
        {
            id: "1001",
            code: "nvklal433",
            name: "Black Watch",
            description: "Product Description",
            image: "black-watch.jpg",
            price: 72,
            category: "Accessories",
            quantity: 61,
            inventoryStatus: "INSTOCK",
            rating: 4
        },
        {
            id: "1000",
            code: "f230fh0g3",
            name: "Bamboo Watch",
            description: "Product Description",
            image: "bamboo-watch.jpg",
            price: 65,
            category: "Accessories",
            quantity: 24,
            inventoryStatus: "INSTOCK",
            rating: 5
        },
        {
            id: "1001",
            code: "nvklal433",
            name: "Black Watch",
            description: "Product Description",
            image: "black-watch.jpg",
            price: 72,
            category: "Accessories",
            quantity: 61,
            inventoryStatus: "INSTOCK",
            rating: 4
        },
        {
            id: "1000",
            code: "f230fh0g3",
            name: "Bamboo Watch",
            description: "Product Description",
            image: "bamboo-watch.jpg",
            price: 65,
            category: "Accessories",
            quantity: 24,
            inventoryStatus: "INSTOCK",
            rating: 5
        },
        {
            id: "1001",
            code: "nvklal433",
            name: "Black Watch",
            description: "Product Description",
            image: "black-watch.jpg",
            price: 72,
            category: "Accessories",
            quantity: 61,
            inventoryStatus: "INSTOCK",
            rating: 4
        },
        {
            id: "1000",
            code: "f230fh0g3",
            name: "Bamboo Watch",
            description: "Product Description",
            image: "bamboo-watch.jpg",
            price: 65,
            category: "Accessories",
            quantity: 24,
            inventoryStatus: "INSTOCK",
            rating: 5
        },
        {
            id: "1001",
            code: "nvklal433",
            name: "Black Watch",
            description: "Product Description",
            image: "black-watch.jpg",
            price: 72,
            category: "Accessories",
            quantity: 61,
            inventoryStatus: "INSTOCK",
            rating: 4
        }
    ];

    const responsiveOptions: CarouselResponsiveOption[] = [
        { breakpoint: "1400px", numVisible: 2, numScroll: 1 },
        { breakpoint: "1199px", numVisible: 3, numScroll: 1 },
        { breakpoint: "767px", numVisible: 2, numScroll: 1 },
        { breakpoint: "575px", numVisible: 1, numScroll: 1 }
    ];

    const getSeverity = (product: Product) => {
        switch (product.inventoryStatus) {
            case "INSTOCK": return "success";
            case "LOWSTOCK": return "warning";
            case "OUTOFSTOCK": return "danger";
            default: return null;
        }
    };

    // 🔥 Em vez de API, carregamos mock aqui
    useEffect(() => {
        setProducts(mockProducts);
    }, []);

    const productTemplate = (product: Product) => {
        return (
            <Card className="border-round m-2 text-center py-5 px-3">
                <div className="mb-3">
                    <img
                        src={`https://primefaces.org/cdn/primereact/images/product/${product.image}`}
                        alt={product.name}
                        className="w-6 shadow-2"
                    />
                </div>
                <div>
                    <h4 className="mb-1">{product.name}</h4>
                    <h6 className="mt-0 mb-3">${product.price}</h6>
                    <Tag value={product.inventoryStatus} severity={getSeverity(product)} />
                    <div className="mt-5 flex flex-wrap gap-2 justify-content-center">
                        <Button icon="pi pi-search" rounded />
                        <Button icon="pi pi-star-fill" rounded severity="success" />
                    </div>
                </div>
            </Card>
        );
    };

    return (
        <div className="card">
            <Carousel
                value={products}
                numVisible={3}
                numScroll={3}
                responsiveOptions={responsiveOptions}
                itemTemplate={productTemplate}
                circular
                autoplayInterval={3000}
            />
        </div>
    );
};


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

const MenuSidebar = () => {
  const [visible, setVisible] = useState(false);

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

const FilterButton = () => {
  const [value, setValue] = useState(null);

  const justifyOptions = [
    {icon: 'pi pi-users', value: 'artists'},
    {icon: 'pi pi-home', value: 'studio'},
  ];

  const justifyTemplate = (option: { icon: string | undefined; }) => {
    return <i className={option.icon}></i>;
  }

  return (
    <SelectButton value={value} onChange={(e) => setValue(e.value)} itemTemplate={justifyTemplate} optionLabel="value" options={justifyOptions} />
  );
}

const SearchInput = () => {
  const [value, setValue] = useState<string>('');
  const [items, setItems] = useState<string[]>([]);

  const search = (event: AutoCompleteCompleteEvent) => {
      setItems([...Array(10).keys()].map(item => event.query + '-' + item));
  }

  return (
    <AutoComplete size={40} value={value} suggestions={items} completeMethod={search} onChange={(e) => setValue(e.value)} placeholder='Procurar por Pessoas ou Estudios...' />
  )
}

const LogOut = () => {
    const [loading, setLoading] = useState(false);

    const load = () => {
        setLoading(true);

        setTimeout(() => {
            setLoading(false);
        }, 2000);
    };

    return (
        <div className="card flex flex-wrap justify-content-center gap-3">
            <Button label="Sair" icon="pi pi-sign-out" loading={loading} onClick={load} severity='danger' />
        </div>
    )
}

const UserArea = () => {
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
            <Button label='João Oliveira' icon={<Avatar  image="https://avatars.githubusercontent.com/u/109597841?s=400&u=a84af5e9f6fea9b909be2a789a9bd88d27a157de&v=4" shape='circle' className="mr-2" />} iconPos='right' onClick={(event) => menuRight.current.toggle(event)} aria-controls="popup_menu_right" aria-haspopup text raised rounded />
        </div>
    )
}

const Interactions = () => {
  const [notifyValue, setNotifyValue] = useState(4);
  const [inboxValue, setInboxValue] = useState(20);

  const clearNotify = () => setNotifyValue(0);
  const clearInbox = () => setInboxValue(0);

  return (
    <>
      <div className='p-overlay-badge'>
        <Button
          icon="pi pi-bell"
          text
          raised
          rounded
          onClick={() => clearNotify()}
        />
        {notifyValue !== 0 && (
          <S.BadgeCustom value={notifyValue} severity="danger" />
        )}
      </div>

      <div className='p-overlay-badge'>
        <Button
          icon="pi pi-inbox"
          text
          raised
          rounded
          onClick={() => clearInbox()}
        />
        {inboxValue !== 0 && (
          <S.BadgeCustom value={inboxValue} severity="danger" />
        )}
      </div>
    </>
  );
};

const Header = () => {
    const startContent = (
      <MenuSidebar/>
    );

    const centerContent = (
      <div className="flex flex-wrap align-items-center gap-3">
        <FilterButton />
        <SearchInput/>
      </div>
    );

    const endContent = (
      <div className="flex flex-wrap align-items-center gap-3">
        <Interactions />
        <UserArea/>
      </div>
    );

    return (
      <Toolbar start={startContent} center={centerContent} end={endContent} 
        style={{
          //backgroundImage: 'linear-gradient(to right, var(--bluegray-500), var(--bluegray-800))' 
        }} />
    );
}

const Main = () => {
  return (
    <div className="surface-ground p-5">

      {/* Secção de destaques */}
      <div className="grid">
        {[1,2,3,4,5,6].map(i => (
          <div className="col-12 sm:col-6 md:col-4 lg:col-3" key={i}>
            <Card title={`Produto ${i}`} className="h-full">
              <p>Descrição do produto {i}...</p>
              <Button label="Comprar" icon="pi pi-shopping-cart" />
            </Card>
          </div>
        ))}
      </div>
      
      {/* Banner grande tipo Shopee / Mercado Livre */}
      <div className="mt-5">
        <Card className="justify-content-center align-items-center">
          <CarouselItems/>
        </Card>
      </div>

      {/* Secção 2 */}
      <h2 className="mt-5 mb-3">Mais recomendados</h2>
      <div className="grid">
        {[1,2,3,4].map(i => (
          <div className="col-12 sm:col-6 md:col-3" key={i}>
            <Card title={`Item ${i}`} className="h-full">
              <p>Outro produto top.</p>
              <Button label="Ver mais" text />
            </Card>
          </div>
        ))}
      </div>

    </div>
  );
};

function App() {

  return (
    <>
      <Header />
      
      <div style={{ flex: 1 }}>
        <Main />
      </div>

      <footer className="footer">
          <ul className="footer-links">
              <li>
                  <a href="https://github.com/JopeOliveira23" target="_blank">GitHub</a>
              </li>
              <li>
                  <a href="https://www.linkedin.com/in/joaooliveira2001/" target="_blank">LinkedIn</a>
              </li>
          </ul>
      </footer>
    </>
  )
}

export default App