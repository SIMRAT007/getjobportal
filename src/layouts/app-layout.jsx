import Header from "@/components/header";
import { Outlet, useLocation, Link } from "react-router-dom";

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

      {/* Footer section */}
      {AdminPanel && 
      <footer className="p-10 bg-[#173a96] mt-10 text-white">
        <div className="flex flex-col items-center space-y-4">
          <div className="flex items-center space-x-8">
            <Link to="/" className="hover:text-blue-200 transition-colors">Home</Link>
            <Link to="/contact" className="hover:text-blue-200 transition-colors">Contact</Link>
            <Link to="/terms-conditions" className="hover:text-blue-200 transition-colors">Terms & Conditions</Link>
          </div>
          <hr className="w-full border-gray-500 my-4" />
          <div className="text-cente">
            Copyright © 2025 by Destiny Jobs
          </div>
        </div>
      </footer>
    }
      
    </div>
  );
};

export default AppLayout;