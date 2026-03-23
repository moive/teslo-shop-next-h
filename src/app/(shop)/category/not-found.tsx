import Link from "next/link";

export default function NotFoundPage() {
  return (
    <div>
      <h1>404 Category not found</h1>
      <Link href="/">Go to home</Link>
    </div>
  );
}
