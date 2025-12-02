export const Auth = {
  login(user: string, pass: string) {
    if (user === "Jopeskt" && pass === "teste123") {
      localStorage.setItem("logged", "true");
      return true;
    }
    return false;
  },

  logout() {
    localStorage.removeItem("logged");
  },

  isLogged() {
    return localStorage.getItem("logged") === "true";
  }
};
