import { Outlet } from "react-router";
import { Sidebar } from "./Sidebar";

export function Layout() {
  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar />
      <main className="flex-1 md:ml-64 bg-linear-to-br  from-slate-50 to-slate-100 p-6 w-full">
        <div className="container mx-auto p-4 md:p-8  ">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
