import { useState } from "react";
import { Link, useLocation } from "react-router";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import {
  Menu,
  Package,
  Receipt,
  ArrowRightLeft,
  Home,
  Plus,
} from "lucide-react";
import logo from "@/assets/logo.webp";

const navItems = [
  {
    title: "Home",
    href: "/",
    icon: Home,
  },
  {
    title: "Products",
    href: "/products/all",
    icon: Package,
  },
  {
    title: "Receipts",
    href: "/receipts/all",
    icon: Receipt,
  },
  {
    title: "Transactions",
    href: "/transactions/all",
    icon: ArrowRightLeft,
  },
];

export function Sidebar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  return (
    <>
      <div className="hidden md:flex w-64 flex-col border-r bg-slate-50 fixed left-0 top-0 bottom-0 z-40">
        <div className="p-6 border-b flex justify-center">
          <img src={logo} alt="Logo" className="h-16 w-auto rounded-md" />
        </div>
        <ScrollArea className="flex-1 pb-8">
          <nav className="flex flex-col gap-1 p-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.href;
              return (
                <Link
                  key={item.href}
                  to={item.href}
                  onClick={() => setMobileOpen(false)}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-3 text-base font-medium transition-colors",
                    isActive
                      ? "bg-slate-900 text-slate-50"
                      : "text-slate-700 hover:bg-slate-100",
                  )}
                >
                  <Icon className="h-6 w-6" />
                  {item.title}
                </Link>
              );
            })}
          </nav>
        </ScrollArea>
        <div className="p-2 border-t -mt-6">
          <Link
            to="/products/add"
            onClick={() => setMobileOpen(false)}
            className="flex items-center gap-3 rounded-lg px-3 py-3 text-base font-medium transition-colors bg-slate-900 text-slate-50 hover:bg-slate-800"
          >
            <Plus className="h-6 w-6" />
            Add Product
          </Link>
        </div>
      </div>

      <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
        <SheetTrigger asChild className="md:hidden fixed left-4 top-4 z-50">
          <Button variant="outline" size="icon">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-64 p-0">
          <div className="flex h-full flex-col">
            <div className="p-6 border-b flex justify-center h-100">
              hi
              {<img src={logo} alt="Logo" className="h-16 w-auto" />}
            </div>
            <ScrollArea className="flex-1 pb-8">
              <nav className="flex flex-col gap-1 p-2">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = location.pathname === item.href;
                  return (
                    <Link
                      key={item.href}
                      to={item.href}
                      onClick={() => setMobileOpen(false)}
                      className={cn(
                        "flex items-center gap-3 rounded-lg px-3 py-3 text-base font-medium transition-colors",
                        isActive
                          ? "bg-slate-900 text-slate-50"
                          : "text-slate-700 hover:bg-slate-100",
                      )}
                    >
                      <Icon className="h-6 w-6" />
                      {item.title}
                    </Link>
                  );
                })}
              </nav>
            </ScrollArea>
            <div className="p-2">
              <Link
                to="/products/add"
                onClick={() => setMobileOpen(false)}
                className="flex items-center gap-3 rounded-lg px-3 py-3 text-base font-medium transition-colors bg-slate-900 text-slate-50 hover:bg-slate-800"
              >
                <Plus className="h-6 w-6" />
                Add Product
              </Link>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}
