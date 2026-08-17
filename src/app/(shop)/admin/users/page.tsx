import { redirect } from "next/navigation";

// https://tailwindcomponents.com/component/hoverable-table
import { getPaginatedUsers } from "@/actions";
import { Title } from "@/components";
import { UsersTable } from "./ui/UsersTable";

export default async function OrdersPage() {
  const { ok, users = [] } = await getPaginatedUsers();
  if (!ok) redirect("/auth/login");

  return (
    <>
      <Title title="User Management" />

      <div className="mb-10">
        <UsersTable users={users} />
      </div>
    </>
  );
}
