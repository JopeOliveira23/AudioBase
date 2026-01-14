import { Outlet } from "react-router-dom";
import Header from "../layout/header";
import Footer from "../layout/footer";

export default function MainLayout() {
  return (
    <div className="flex flex-column min-h-screen">
      <Header />
      
      <main className="flex flex-column flex-1 align-items-center py-6">
        <div className="w-full px-3 flex flex-column flex-1" style={{ maxWidth: "1000px" }}>
          <Outlet />
        </div>
      </main>
      
      <Footer />
    </div>
  );
}