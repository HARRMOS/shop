export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <div className="fixed inset-0 z-[100] bg-[#f8f7f4] overflow-auto">{children}</div>;
}
