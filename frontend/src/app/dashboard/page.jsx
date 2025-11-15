import AdminDashboard from "@/components/Dashboard/AdminDashboard";
import { pageMeta } from "@/lib/meta-data";


export const metadata = pageMeta({
title: "User Dashboard",
description: "Your TM Studios user dashboard.",
path: "/dashboard",
image: "/og-dashboard.jpg",
});

export default function dashboard() {
  return (
   <>
    <AdminDashboard/>
   </>

  );
}
