import Header from "@/components/header";
import { Outlet } from "react-router-dom";

const AppLayout = () => {
  return (
    <div>
      <div className="grid-background"></div>
      <main className="min-h-screen">
        <Header />
        <Outlet />
      </main>
      <div className="p-10 text-center bg-[#173a96] mt-10 text-white">
        Copyright © 2025 by Destiny Jobs
      </div>
    </div>
  );
};

export default AppLayout;