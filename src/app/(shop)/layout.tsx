import TopMenu from "@/components/ui/top-menu/TopMenu";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <main className="min-h-screen">
      <TopMenu />
      <div className="px-0 sm:px-10">{children}</div>
    </main>
  );
}
