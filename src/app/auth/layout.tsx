export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <main className="flex justify-center">
      <div className="w-full sm:w-[450] px-10">{children}</div>
    </main>
  );
}
