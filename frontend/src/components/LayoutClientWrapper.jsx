"use client";

import { usePathname } from "next/navigation";
import NavBarMain from "@/components/Navbar/NavbarMain";
import Footer from "@/components/Footer/Footer";

export default function LayoutClientWrapper({ children }) {
  const pathname = usePathname();

  const isAdminRoute = pathname.startsWith("/admin");

  // NEW: Hide layout on Coming Soon homepage (/)
  const isComingSoonPage = pathname === "/";

  const hideLayout = isAdminRoute || isComingSoonPage;

  return (
    <>
      {!hideLayout && <NavBarMain />}

      {isAdminRoute ? (
        <div className="bg-gray-100 min-h-screen">{children}</div>
      ) : (
        children
      )}

      {!hideLayout && <Footer />}
    </>
  );
}
