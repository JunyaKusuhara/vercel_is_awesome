import Image from "next/image";
import styles from "./page.module.css";
//import Categories from "./ui/catrgories";
import cale from './ui/clar';

export default async function Home() {
  return (<>
    <h1>Encycl</h1>
    <main className={styles.main}>
      <div className={styles.card}>
        <Categories />
      </div>
    </main>
    <p>{cale(2023,2025)}</p>
  </>);
}
