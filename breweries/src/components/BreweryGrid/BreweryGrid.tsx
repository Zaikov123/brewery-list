"use client";
import { Brewery } from "@/types/Brewery";
import { BreweryCard } from "../BreweryCard";
import { useRouter } from "next/navigation";
import styles from "./BreweryGrid.module.css";
import { motion, AnimatePresence } from "framer-motion";

interface BreweryGridProps {
  breweries: Brewery[];
  selectedBreweries: Set<string>;
  onSelectBrewery: (breweryId: string) => void;
}

export function BreweryGrid({
  breweries,
  selectedBreweries,
  onSelectBrewery,
}: BreweryGridProps) {
  const router = useRouter();

  return (
    <div className={styles.grid}>
      <AnimatePresence>
        {breweries.map((brewery) => (          
          <motion.div
            key={brewery.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <BreweryCard
              brewery={brewery}
              isSelected={selectedBreweries.has(brewery.id)}
              onContextMenu={onSelectBrewery}
              onClick={() => router.push(`/brewery/${brewery.id}`)}
            />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
