import { Card } from "primereact/card";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { useState } from "react";
import { Logo } from "./styles";
import logo from "../../../assets/logo.png";
import { Auth } from "../../../context/auth/auth";
import { useTheme } from "../../../hooks/useTheme";

interface LoginFormProps {
  onLoginSuccess: () => void;
}

export const LoginForm = ({ onLoginSuccess }: LoginFormProps) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorLogin, setErrorLogin] = useState("");

  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [newUser, setNewUser] = useState({ username: "", password: "", confirm: "" });
  const [errorRegister, setErrorRegister] = useState("");
  const passwordMismatch = newUser.password !== newUser.confirm;

  const { toggleTheme } = useTheme(); 
  const [isPopping, setIsPopping] = useState(false);

  const handleClick = () => { toggleTheme();
    setIsPopping(true);
    setTimeout(() => setIsPopping(false), 300);
  };

  const clearLoginForm = () => {
    setUsername("");
    setPassword("");
    setErrorLogin("");
  };

  const clearRegisterForm = () => {
    setNewUser({ username: "", password: "", confirm: "" });
    setErrorRegister("");
  };

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

  const handleSaveUser = () => {
    setErrorRegister("");
    if (!newUser.username.trim()) return setErrorRegister("Informe o usuário.");
    if (!newUser.password.trim()) return setErrorRegister("Informe a senha.");
    if (passwordMismatch) return;

    const { ok, error } = Auth.register({
      username: newUser.username,
      password: newUser.password,
    });

    if (!ok) {
      setErrorRegister(error || "Erro ao criar usuário.");
      return;
    }

    clearRegisterForm();
    clearLoginForm();
    setShowRegisterModal(false);
  };

  return (
    <>
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
              placeholder="Digite seu usuário"
              className="w-full"
            />
            <label htmlFor="password">Senha</label>
            <Password
              id="password"
              inputStyle={{ width: "20rem" }}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Digite sua senha"
              toggleMask
              feedback={false}
            />
          </div>
          <Button label="Entrar" outlined onClick={handleLogin} disabled={!username || !password} />
        </div>

        <Button
          label="Criar conta"
          className="w-full mt-3 -mb-3"
          onClick={() => {
            clearRegisterForm();
            setShowRegisterModal(true);
          }}
        />
      </Card>

      {/* REGISTER MODAL */}
      <Dialog
        header="Criar novo usuário"
        visible={showRegisterModal}
        style={{ width: "400px" }}
        modal
        draggable={false}
        onHide={() => setShowRegisterModal(false)}
      >
        <div className="flex flex-column gap-3">
          {errorRegister && (
            <small style={{ color: "red", display: "block", marginBottom: "1rem" }}>
              {errorRegister}
            </small>
          )}

          <div className="flex flex-column gap-2">
            <label>Usuário</label>
            <InputText
              value={newUser.username}
              onChange={(e) => setNewUser({ ...newUser, username: e.target.value })}
              className="w-full"
              placeholder="Nome de usuário"
            />
          </div>

          <div className="flex flex-column gap-2">
            <label>Senha</label>
            <Password
              value={newUser.password}
              onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
              toggleMask
              feedback={false}
              inputStyle={{ width: "20rem" }}
            />
          </div>

          <div className="flex flex-column gap-2">
            <label>Confirmar senha</label>
            <Password
              value={newUser.confirm}
              onChange={(e) => setNewUser({ ...newUser, confirm: e.target.value })}
              toggleMask
              feedback={false}
              inputStyle={{ width: "20rem" }}
            />
            {passwordMismatch && newUser.confirm.length > 0 && (
              <p style={{ color: "red", fontSize: "0.8rem", marginTop: "-0.5rem" }}>
                As senhas não coincidem.
              </p>
            )}
          </div>

          <div className="flex justify-content-end gap-2 mt-3">
            <Button label="Cancelar" text onClick={() => setShowRegisterModal(false)} />
            <Button
              label="Salvar"
              icon="pi pi-check"
              onClick={handleSaveUser}
              disabled={!newUser.username || !newUser.password || passwordMismatch || errorRegister.length > 0}
            />
          </div>
        </div>
      </Dialog>
    </>
  );
};