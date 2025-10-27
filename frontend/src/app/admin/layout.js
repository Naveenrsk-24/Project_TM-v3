import "../globals.css";

export const metadata = {
  title: "Admin Panel",
  description: "TM Photography Admin Dashboard",
};

export default function AdminLayout({ children }) {
  return (
    <div className="bg-gray-100 min-h-screen">
      {children}
    </div>
  );
}
