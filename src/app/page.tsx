
import { getUserFromSession } from "@/lib/session";
import styles from "./page.module.css";
import NavBar from "./components/navBar/container";
import SideBar from "./components/sideBar/container";
import { getUserReceipts } from "@/server/backend/queries/receiptsQueries";
import { getReceiptItems } from "@/server/backend/queries/itemsQueries";
export default async  function Home() {
const hi =await getReceiptItems(10);
return (
<div className={styles.page}>
  {hi}
{/* <NavBar/>
<SideBar/> */}
</div>
  );
}
