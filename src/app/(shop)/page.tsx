import { titleFont } from "@/config/fonts";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center  font-sans dark:bg-black">
      <div className="flex min-h-screen w-full flex-col items-center justify-between py-8 px-16  sm:items-start">
        <div className="flex flex-col items-center gap-6 text-center sm:items-start sm:text-left">
          <h1 className="text-3xl font-semibold">Hello world</h1>
          <h1 className={`text-3xl font-semibold ${titleFont.className}`}>
            Hello world
          </h1>
        </div>
      </div>
    </div>
  );
}
