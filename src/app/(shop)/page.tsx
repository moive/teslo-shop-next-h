import { titleFont } from "@/config/fonts";

export default function Home() {
  return (
    <div>
      <h1 className="text-3xl font-semibold">Hello world</h1>
      <h1 className={`text-3xl font-semibold ${titleFont.className}`}>
        Hello world
      </h1>
    </div>
  );
}
