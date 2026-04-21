import { auth } from "@/auth.config";
import { Footer, Sidebar } from "@/components";
import TopMenu from "@/components/ui/top-menu/TopMenu";
import { redirect } from "next/navigation";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  console.log({ session });
  if (!session?.user) redirect("/auth/login");
  return (
    <main className="min-h-screen">
      <TopMenu />
      <Sidebar />
      <div className="px-0 sm:px-10">{children}</div>
      <Footer />
    </main>
  );
}
