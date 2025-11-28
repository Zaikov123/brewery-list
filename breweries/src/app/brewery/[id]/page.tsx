import { BreweryDetail } from "@/components";
import { getBrewery } from "@/lib/api";
import styles from "./page.module.css";

export default async function Page({ params }: { params: { id: string } }) {
  const { id } = await params;
  const brewery = await getBrewery(id);

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <BreweryDetail brewery={brewery} />
      </main>
    </div>
  );
}
