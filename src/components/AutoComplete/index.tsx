import { AutoComplete, type AutoCompleteCompleteEvent } from "primereact/autocomplete";
import { useState } from "react";

const AutoCompleteComponent = () => {
  const [value, setValue] = useState<string>('');
  const [items, setItems] = useState<string[]>([]);

  const search = (event: AutoCompleteCompleteEvent) => {
      setItems([...Array(10).keys()].map(item => event.query + '-' + item));
  }

  return (
    <AutoComplete size={40} value={value} suggestions={items} completeMethod={search} onChange={(e) => setValue(e.value)} placeholder='Procurar por Pessoas ou Estudios...' />
  )
}

export default AutoCompleteComponent;