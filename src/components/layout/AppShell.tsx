import { useState } from "react";
import { Outlet } from "react-router-dom";
import { Sidebar } from "./Sidebar";
import { Topbar } from "./Topbar";
export function AppShell() {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  return (
    <div className="flex h-screen bg-[#F5F7FA] overflow-hidden">
      {" "}
      <Sidebar
        collapsed={collapsed}
        onCollapse={setCollapsed}
        mobileOpen={mobileOpen}
        onMobileClose={() => setMobileOpen(false)}
      />{" "}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {" "}
        <Topbar onMobileMenuOpen={() => setMobileOpen(true)} />{" "}
        <main className="flex-1 overflow-y-auto">
          {" "}
          <div className="max-w-7xl mx-auto px-4 md:px-6 py-6">
            {" "}
            <Outlet />{" "}
          </div>{" "}
        </main>{" "}
      </div>{" "}
    </div>
  );
}
