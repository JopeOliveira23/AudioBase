import { Outlet } from "react-router-dom";
import Footer from "./footer";
import Header from "./header";
import LeftSidebar from "../components/ToolSideBar";

const MainLayout = () => {
  return (
    <div className="flex h-screen overflow-hidden">
      
      {/* Sidebar */}
      <LeftSidebar />

      {/* Coluna principal */}
      <div className="flex flex-column flex-1 overflow-hidden">

        {/* Header */}
        <Header />

        {/* Conteúdo */}
        <main className="flex-1 overflow-hidden">
          <div className="h-full w-full p-4 flex justify-content-center">
            <Outlet />
          </div>
        </main>

        {/* Footer */}
        <Footer />
      </div>
    </div>
  );
};

export default MainLayout;
