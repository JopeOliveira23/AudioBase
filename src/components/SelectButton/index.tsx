import { SelectButton } from "primereact/selectbutton";
import { useState } from "react";

const SelectButtonComponent = () => {
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

export default SelectButtonComponent;