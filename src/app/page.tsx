"use client";

import styles from "./page.module.css";
import { LogOut } from "@/deleteSessionAction";
export default function Home() {
  return (
<div className={styles.page}>
Home page !!!!
<button onClick={LogOut}>delete session</button>
</div>
  );
}
