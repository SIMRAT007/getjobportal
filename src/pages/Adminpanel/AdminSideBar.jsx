import { useState } from "react";
import {
  FaAngleDoubleLeft,
  FaAngleDoubleRight,
  FaTachometerAlt,
  FaGem,
  FaSignOutAlt
} from "react-icons/fa";
import { supabase } from "../../utils/supabase"; 

const AdminSideBar = () => {
  const [collapsed, setCollapsed] = useState(false);

  const toggleSidebar = () => setCollapsed(!collapsed);


  const handleLogout = async () => {
    try {
      await supabase.auth.signOut(); // Sign out the user
      window.location.href = "/admin-portal"; // Redirect to the admin login page
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <>
    <div
      className={`min-h-screen bg-[#173a96]  text-white flex flex-col transition-all duration-300 ${
        collapsed ? "w-20" : "w-64"
      }`}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-4 border-b border-white">
        {!collapsed && <h1 className="text-lg font-bold text-white">Admin Portal</h1>}
        <button onClick={toggleSidebar}>
          {collapsed ? <FaAngleDoubleRight /> : <FaAngleDoubleLeft />}
        </button>
      </div>

      {/* Menu */}
      <nav className="flex-1 px-2 py-4 space-y-2">
        <button
          onClick={() => window.location.href = '/adminportal-all-jobs'}
          className="flex items-center gap-3 px-4 py-2 rounded hover:bg-blue-500 w-full text-left"
        >
          <FaTachometerAlt />
          {!collapsed && <span>All Jobs </span>}
        </button>

        <button
          onClick={() => window.location.href = '/adminportal-all-users'}
          className="flex items-center gap-3 px-4 py-2 rounded hover:bg-blue-500 w-full text-left"
        >
          <FaGem />
          {!collapsed && <span>All Users</span>}
        </button>
      </nav>

       {/* Logout Button */}
       <div className="px-4 py-4">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 w-full px-4 py-2 rounded hover:bg-red-700 bg-red-500"
        >
          <FaSignOutAlt />
          {!collapsed && <span>Logout</span>}
        </button>
      </div>

      {/* Footer */}
      <div className="px-4 py-4 border-t border-gray-500 text-sm text-center">
        {!collapsed && <p>© DestinyJobs</p>}
      </div>
    </div>
    </>
  );
};

export default AdminSideBar;
