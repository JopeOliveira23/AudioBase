import SidebarComponent from "../../components/Sidebar/index.tsx";
import SelectButtonComponent from "../../components/SelectButton/index.tsx";
import AutoCompleteComponent from "../../components/AutoComplete/index.tsx";
import MenuComponent from "../../components/Menu/index.tsx";
import Notofications from "../../components/Notifications/index.tsx";

import { Toolbar } from "primereact/toolbar";

const Header = () => {
  const startContent = (
    <SidebarComponent />
  );

  const centerContent = (
    <div className="flex flex-wrap align-items-center gap-3">
      <SelectButtonComponent />
      <AutoCompleteComponent />
    </div>
  );

  const endContent = (
    <div className="flex flex-wrap align-items-center gap-3">
      <Notofications />
      <MenuComponent />
    </div>
  );

  return (
    <Toolbar start={startContent} center={centerContent} end={endContent} 
      style={{
        //backgroundImage: 'linear-gradient(to right, var(--bluegray-500), var(--bluegray-800))' 
      }} />
  );
};

export default Header;