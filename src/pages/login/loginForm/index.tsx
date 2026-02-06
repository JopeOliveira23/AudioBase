import { Card } from "primereact/card";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { Button } from "primereact/button";
import { Logo } from "./styles";
import logo from "../../../assets/logo.png";
import { Auth } from "../../../context/auth/auth";
import { useTheme } from "../../../hooks/useTheme";
import { useState, useEffect } from "react";

interface LoginFormProps {
  onLoginSuccess: () => void;
  onOpenRegister: () => void;
  /**
   * callback usado para "expor" funções internas (como clearLoginForm)
   * ao componente pai. O pai guarda a função e usa quando o register
   * terminar com sucesso.
   */
  provideClear?: (helpers: { clearLoginForm: () => void }) => void;
}

export const LoginForm = ({ onLoginSuccess, onOpenRegister, provideClear }: LoginFormProps) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorLogin, setErrorLogin] = useState("");

  const { toggleTheme } = useTheme();
  const [isPopping, setIsPopping] = useState(false);

  const handleClick = () => {
    toggleTheme();
    setIsPopping(true);
    setTimeout(() => setIsPopping(false), 300);
  };

  const clearLoginForm = () => {
    setUsername("");
    setPassword("");
    setErrorLogin("");
  };

  // expõe a função clearLoginForm ao pai quando montado
  useEffect(() => {
    provideClear?.({ clearLoginForm });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // só na montagem

  const handleLogin = () => {
    setErrorLogin("");
    const ok = Auth.login(username, password);
    if (!ok) {
      setErrorLogin("Usuário ou senha inválidos.");
      return;
    }
    clearLoginForm();
    onLoginSuccess();
  };

  return (
    <Card header={<h2 style={{ marginBottom: "-1rem" }}>AudioBase</h2>} style={{ width: "350px", textAlign: "center" }}>
      <Logo
        src={logo}
        alt="AudioBase"
        onClick={handleClick}
        className={isPopping ? "pop" : ""}
      />

      <div className="flex flex-column gap-3">
        {errorLogin && <small style={{ color: "red" }}>{errorLogin}</small>}

        <div className="flex flex-column align-items-start gap-2">
          <label htmlFor="username">Usuário</label>
          <InputText
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && username && password) {
                handleLogin();
              }
            }}
            placeholder="Digite seu usuário"
            className="w-full"
          />
          <label htmlFor="password">Senha</label>
          <Password
            id="password"
            inputStyle={{ width: "20rem" }}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && username && password) {
                handleLogin();
              }
            }}
            placeholder="Digite sua senha"
            toggleMask
            feedback={false}
            pt={{
              showIcon: {
                tabIndex: -1
              }
            }}
          />
        </div>

        <Button label="Entrar" outlined onClick={handleLogin} disabled={!username || !password} />
      </div>

      <Button
        label="Criar conta"
        className="w-full mt-3 -mb-3"
        onClick={onOpenRegister}
      />
    </Card>
  );
};
