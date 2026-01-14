import { Outlet } from "react-router-dom";
import Footer from "./footer";
import Header from "./header";
import LeftSidebar from "../components/Sidebar copy";

const MainLayout = () => {

  return (
    <div className="flex flex-column h-screen">
      {/* Header fixo */}
      <Header />

      {/* Corpo */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar fixa */}
        <LeftSidebar />

        {/* Área central */}
        <main className="flex-1 overflow-hidden">
          {/* ESTE é o único scroll da aplicação */}
          <div className="h-full p-4 flex justify-content-center">
            <div className="w-full overflow-hidden" style={{ maxWidth: '1200px', height: 'calc(100vh - 21vh)' }}> 
              <Outlet />
            </div>
          </div>
        </main>
      </div>

      {/* Footer fixa */}
      <Footer />
    </div>
  );
};


export default MainLayout;