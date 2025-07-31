
import { getUserFromSession } from "@/lib/session";
import styles from "./page.module.css";
import NavBar from "./components/navBar/container";
import SideBar from "./components/sideBar/container";
import { getUserReceipts } from "@/server/backend/queries/receiptsQueries";
export default async  function Home() {

return (
<div className={styles.page}>
{/* <NavBar/>
<SideBar/> */}
</div>
  );
}
