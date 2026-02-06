// src/components/registerDialog/RegisterDialog.tsx
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { Auth } from "../../../context/auth/auth";
import { useState } from "react";

interface RegisterDialogProps {
  visible: boolean;
  onHide: () => void;
  onSuccess: () => void;   // AVISA ao pai que tudo ok (pai chama clearLoginForm)
}

export const RegisterDialog = ({ visible, onHide, onSuccess }: RegisterDialogProps) => {
  const [newUser, setNewUser] = useState({ username: "", password: "", confirm: "" });
  const [errorRegister, setErrorRegister] = useState("");

  const passwordMismatch = newUser.password !== newUser.confirm;

  const reset = () => {
    setNewUser({ username: "", password: "", confirm: "" });
    setErrorRegister("");
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
      const msg = error || "Erro ao criar usuário.";
      setErrorRegister(msg);
      return;
    }

    // cadastro OK: avisa o pai e reseta o conteúdo local
    reset();
    onSuccess();
    onHide();
  };

  return (
    <Dialog
      header="Criar novo usuario"
      style={{ width: "400px", textAlign: "center" }}
      visible={visible}
      modal
      draggable={false}
      onHide={() => {
        reset();
        onHide();
      }}
    >
      <div className="flex flex-column gap-3" style={{textAlign: "left"}}>
        {errorRegister && <small style={{ color: "red", marginBottom: "1rem" }}>{errorRegister}</small>}

        <div className="flex flex-column gap-2">
          <label>Usuário</label>
          <InputText
            value={newUser.username}
            onChange={(e) => setNewUser({ ...newUser, username: e.target.value })}
            onKeyDown={(e) => {
              if (e.key === "Enter" && newUser.username && newUser.password && newUser.confirm) {
                handleSaveUser();
              }
            }}
            className="w-full"
          />
          <label>Senha</label>
          <Password
            value={newUser.password}
            onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
            onKeyDown={(e) => {
              if (e.key === "Enter" && newUser.username && newUser.password && newUser.confirm) {
                handleSaveUser();
              }
            }}
            inputStyle={{ width: "21.8rem" }}
            toggleMask
            feedback={false}
            pt={{
              showIcon: {
                tabIndex: -1
              }
            }}
          />
          <label>Confirmar senha</label>
          <Password
            value={newUser.confirm}
            onChange={(e) => setNewUser({ ...newUser, confirm: e.target.value })}
            onKeyDown={(e) => {
              if (e.key === "Enter" && newUser.username && newUser.password && newUser.confirm) {
                handleSaveUser();
              }
            }}
            inputStyle={{ width: "21.8rem" }}
            toggleMask
            feedback={false}
            pt={{
              showIcon: {
                tabIndex: -1
              }
            }}
          />
          {passwordMismatch && newUser.confirm.length > 0 && (
            <p style={{ color: "red", fontSize: "0.8rem" }}>As senhas não coincidem.</p>
          )}
        </div>

        <div className="flex justify-content-end gap-2 mt-3">
          <Button
            label="Cancelar"
            text
            onClick={() => {
              reset();
              onHide();
            }}
          />
          <Button
            label="Salvar"
            icon="pi pi-check"
            onClick={handleSaveUser}
            disabled={!newUser.username || !newUser.password || passwordMismatch}
          />
        </div>
      </div>
    </Dialog>
  );
};
