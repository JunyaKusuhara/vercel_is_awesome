import Image from "next/image";
import styles from "./page.module.css";
import Categories from "./ui/catrgories";

export default async function Home() {
  return (<>
    <h1>Encycl</h1>
    <main className={styles.main}>
      <div className={styles.card}>
        <Categories/>
      </div>
    </main>
  </>);
}
