import Header from "@/components/header";
import { Outlet, useLocation } from "react-router-dom";

const AppLayout = () => {
  const location = useLocation();

  // Define routes where the header should not be displayed
  const hideAdminPanelRoutes = ["/admin-portal"];

  const AdminPanel = !hideAdminPanelRoutes.some((route) =>
    location.pathname.startsWith(route)
  );

  return (
    <div>
      <div className="grid-background"></div>
      <main className="min-h-screen">
        {AdminPanel && <Header />}
        <Outlet />
      </main>
      {AdminPanel && 
      <div className="p-10 text-center bg-[#173a96] mt-10 text-white">
      Copyright © 2025 by Destiny Jobs
    </div>
    }
      
    </div>
  );
};

export default AppLayout;