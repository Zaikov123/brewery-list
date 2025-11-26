"use client";

import { useEffect } from "react";
import { useBreweriesStore } from "../store/useBreweriesStore";
import { Header, BreweriesContent } from "@/components";
import styles from "./page.module.css";

export default function Home() {
  const { breweries, isLoading, fetchBreweries } = useBreweriesStore();

  useEffect(() => {
    fetchBreweries();
  }, []);

  return (
    <div className={styles.container}>
      <Header />
      <main className={styles.main}>
        <BreweriesContent breweries={breweries} isLoading={isLoading} />
      </main>
    </div>
  );
}
