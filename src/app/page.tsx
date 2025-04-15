import Image from "next/image";
import styles from "./page.module.css";
import Categories from "./ui/catrgories";

export default async function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.description}>
        <Categories/>
      </div>
    </main>
  );
}
