// AppLayout.tsx
import Sidebar from "./AdminSideBar";
import { Outlet } from "react-router-dom";

const AdminAppLayout = () => {
  return (
    <div className="flex max-h-screen overflow-hidden">
      <Sidebar />
      <div className="flex-1 bg-gray-100 overflow-y-auto">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminAppLayout;
