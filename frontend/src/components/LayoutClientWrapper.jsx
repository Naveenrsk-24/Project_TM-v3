"use client";

import { usePathname } from "next/navigation";
import NavBarMain from "@/components/Navbar/NavbarMain";
import Footer from "@/components/Footer/Footer";

export default function LayoutClientWrapper({ children }) {
  const pathname = usePathname();
  const isAdminRoute = pathname.startsWith("/admin");

  return (
    <>
      {!isAdminRoute && <NavBarMain />}
      {/* <PremiumNavbar/> */}
      {isAdminRoute ? (
        <div className="bg-gray-100 min-h-screen">{children}</div>
      ) : (
        children
      )}
      {!isAdminRoute && <Footer />}
    </>
  );
}
