export const Auth = {
  login(user: string, pass: string) {
    const storedUsers = JSON.parse(localStorage.getItem("users") || "[]");

    const found = storedUsers.find(
      (u: any) => u.username === user && u.password === pass
    );

    if (found) {
      localStorage.setItem("logged", "true");
      localStorage.setItem("currentUser", user);
      return true;
    }

    return false;
  },

  register(newUser: { username: string; password: string }) {
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const exists = users.some((u: any) => u.username === newUser.username);

    if (exists) {
      return { ok: false, error: "Usuário já existe." };
    }

    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));

    return { ok: true };
  },

  logout() {
    localStorage.removeItem("logged");
    localStorage.removeItem("currentUser");
  },

  isLogged() {
    return localStorage.getItem("logged") === "true";
  }
};
