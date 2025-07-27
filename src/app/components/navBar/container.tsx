// app/account/page.tsx
import { getUserFromSession } from "@/lib/session";
import { redirect } from "next/navigation";

export default async function Page() {
  const user = await getUserFromSession();
  if (!user) redirect("/login");

  return <div>Welcome back, 
    {/* {user.userName} */}
    </div>;
}
