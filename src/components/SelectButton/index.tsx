import { SelectButton } from "primereact/selectbutton";
import { useState } from "react";

const SelectButtonComponent = () => {
  const [value, setValue] = useState<'artists' | 'studio'>('artists');

  const justifyOptions = [
    {icon: 'pi pi-users', value: 'artists'},
    {icon: 'pi pi-desktop', value: 'studio'},
  ];

  const justifyTemplate = (option: { icon: string }) => {
    return <i className={option.icon}></i>;
  }

  return (
    <SelectButton value={value} onChange={(e) => setValue(e.value)} itemTemplate={justifyTemplate} optionLabel="value" options={justifyOptions} />
  );
}

export default SelectButtonComponent;