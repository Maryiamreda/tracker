import Image from "next/image";
import styles from "./page.module.css";
import { logout } from "./auth/register/actions";
export default function Home() {
  return (
<div className={styles.page}>
Home page !!!!
<button onClick={logout}>Log out</button>
</div>
  );
}
