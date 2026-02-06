import { AutoComplete, type AutoCompleteCompleteEvent } from "primereact/autocomplete";
import { IconField } from "primereact/iconfield";
import { InputIcon } from "primereact/inputicon";
import { useState } from "react";

const AutoCompleteComponent = () => {
  const [value, setValue] = useState<string>('');
  const [items, setItems] = useState<string[]>([]);

  const search = (event: AutoCompleteCompleteEvent) => {
      setItems([...Array(10).keys()].map(item => event.query + '-' + item));
  }

  const handleResetSearch = () => {
    setValue('');
    setItems([]);
  };

  return (
    <IconField iconPosition="right">
      <AutoComplete
        size={40}
        value={value}
        suggestions={items}
        completeMethod={search}
        onChange={(e) => setValue(e.value)}
        placeholder="Pesquisar"
      />

      <InputIcon
        className={value ? "pi pi-times cursor-pointer" : "pi pi-search"}
        onClick={value ? handleResetSearch : undefined}
      />
    </IconField>
  );
};

export default AutoCompleteComponent;