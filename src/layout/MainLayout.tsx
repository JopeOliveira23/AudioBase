import { Outlet } from "react-router-dom";
import Header from "../layout/header";
import Footer from "../layout/footer/index.tsx";

export default function MainLayout() {
  return (
    <div className="layout-wrapper">
      <Header />
      
      <main className="content">
        <Outlet />
      </main>
      
      <Footer />
    </div>
  );
}