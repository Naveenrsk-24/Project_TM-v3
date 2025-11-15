import AdminDashboard from "@/components/Dashboard/AdminDashboard";

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
