"use client";
import { Brewery } from "@/types/Brewery";
import { useRouter } from "next/navigation";
import styles from "./BreweryDetail.module.css";

interface BreweryDetailProps {
  brewery: Brewery;
}

export function BreweryDetail({ brewery }: BreweryDetailProps) {
  const router = useRouter();
  return (
    <div className={styles.card}>
      <button className={styles.backButton} onClick={() => router.back()}>
        ← Back
      </button>
      <h2 className={styles.cardTitle}>{brewery.name}</h2>
      <h3 className={styles.cardSubTitle}>{brewery.id}</h3>
      <div className={styles.cardContent}>
        <div>
          <span className={styles.label}>Type:</span>
          <span className={styles.value}>{brewery.brewery_type}</span>
        </div>
        <div>
          <span className={styles.label}>Address:</span>
          <span className={styles.value}>
            {brewery.street ? brewery.street + ", " : ""}
            {brewery.country}, {brewery.city}, {brewery.state} {brewery.postal_code}, {brewery.country}
          </span>
        </div>
        <div>
          <span className={styles.label}>Coordinates:</span>
          <span className={styles.value}>
            {brewery.latitude}, {brewery.longitude}
          </span>
        </div>
        {brewery.phone && (
          <div>
            <span className={styles.label}>Phone:</span>
            <span className={styles.value}>{brewery.phone}</span>
          </div>
        )}
        {brewery.website_url && (
          <a
            href={brewery.website_url}
            className={styles.link}
            target="_blank"
            rel="noopener noreferrer"
          >
            {brewery.website_url}
          </a>
        )}
      </div>
    </div>
  );
}
