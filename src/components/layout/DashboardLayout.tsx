import Sidebar from "./Sidebar";
import Header from "./Header";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid grid-cols-[240px_1fr] min-h-screen bg-gray-50">
      <Sidebar />
      <div>
        <Header />
        <main className="p-6">{children}</main>
      </div>
    </div>
  );
}