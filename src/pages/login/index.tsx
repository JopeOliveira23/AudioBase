import { Card } from "primereact/card";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { InputSwitch } from "primereact/inputswitch";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { useState } from "react";
import { Background } from "./styles";
import { Auth } from "../../context/auth/auth";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../../hooks/useTheme";

export default function Login() {
  const navigate = useNavigate();

  // LOGIN
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorLogin, setErrorLogin] = useState("");

  // REGISTER
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [newUser, setNewUser] = useState({ username: "", password: "", confirm: "" });
  const [errorRegister, setErrorRegister] = useState("");
  const passwordMismatch = newUser.password !== newUser.confirm;

  // THEME
  const { theme, toggleTheme } = useTheme();
  const [checked, setChecked] = useState(theme === "dark");

  // Helpers
  const clearLoginForm = () => {
    setUsername("");
    setPassword("");
    setErrorLogin("");
  };

  const clearRegisterForm = () => {
    setNewUser({ username: "", password: "", confirm: "" });
    setErrorRegister("");
  };

  // LOGIN HANDLER
  const handleLogin = () => {
    setErrorLogin("");

    const ok = Auth.login(username, password);
    if (!ok) {
      setErrorLogin("Usuário ou senha inválidos.");
      return;
    }

    clearLoginForm();
    navigate("/", { replace: true });
  };

  // REGISTER HANDLER
  const handleSaveUser = () => {
    setErrorRegister("");

    if (!newUser.username.trim()) return setErrorRegister("Informe o usuário.");
    if (!newUser.password.trim()) return setErrorRegister("Informe a senha.");
    if (passwordMismatch) return;

    const { ok, error } = Auth.register({
      username: newUser.username,
      password: newUser.password
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
    <Background>
      <Card
        header={<h2 style={{ marginBottom: "-1rem" }}>AudioBase</h2>}
        style={{ width: "350px", textAlign: "center" }}
      >
        <div className="flex flex-column gap-3">

          {errorLogin && (
            <small style={{ color: "red" }}>
              {errorLogin}
            </small>
          )}

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
            <div className="flex align-items-center gap-6 w-full">
              <Password
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Digite sua senha"
                toggleMask
                feedback={false}
              />

              <InputSwitch
                checked={checked}
                onChange={(e) => {
                  setChecked(e.value);
                  toggleTheme();
                }}
              />
            </div>

            <Button
              label="Criar conta"
              text
              className="mt-1 p-0"
              onClick={() => {
                clearRegisterForm();
                setShowRegisterModal(true);
              }}
            />
          </div>
        </div>

        <Button label="Entrar" className="w-full mt-2" onClick={handleLogin} />
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
              onChange={(e) =>
                setNewUser({ ...newUser, username: e.target.value })
              }
              className="w-full"
              placeholder="Nome de usuário"
            />
          </div>

          <div className="flex flex-column gap-2">
            <label>Senha</label>
            <Password
              value={newUser.password}
              onChange={(e) =>
                setNewUser({ ...newUser, password: e.target.value })
              }
              toggleMask
              feedback={false}
              className="w-full"
            />
          </div>

          <div className="flex flex-column gap-2">
            <label>Confirmar senha</label>
            <Password
              value={newUser.confirm}
              onChange={(e) =>
                setNewUser({ ...newUser, confirm: e.target.value })
              }
              toggleMask
              feedback={false}
              className="w-full"
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
    </Background>
  );
}
