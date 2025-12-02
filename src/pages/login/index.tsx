import { Card } from "primereact/card";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { InputSwitch } from "primereact/inputswitch";
import { Button } from "primereact/button";
import { useState } from "react";
import { Background } from "./styles";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [checked, setChecked] = useState(false);

  return (
    <Background>
      <Card
        title="AudioBase"
        style={{ width: "350px", textAlign: "center" }}
      >
        <div className="flex flex-column align-items-start gap-2">
          <label htmlFor="username">Usuário</label>
          <InputText
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Digite seu usuário"
            className="w-full"
          />
        </div>

        <div className="flex flex-column align-items-start gap-2">
          <label htmlFor="password">Senha</label>
          <Password
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Digite sua senha"
            toggleMask
            feedback={false}
            className="w-full"
          />
          <InputSwitch
            checked={checked}
            onChange={(e) => setChecked(e.value)}
          />
        </div>

        <Button
          label="Entrar"
          className="w-full mt-2"
        />
      </Card>
    </Background>
  );
}
