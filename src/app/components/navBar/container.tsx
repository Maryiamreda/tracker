import { getUserFromSession } from "@/lib/session";
import { redirect } from "next/navigation";

export default async function NavBar() {
const user= await getUserFromSession();

  return <div>
   <div>Welcome back, {user?.userName}</div> 
    </div>;
}
