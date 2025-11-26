import { create } from "zustand";
import { Brewery } from "../types/Brewery";

interface BreweriesState {
  breweries: Brewery[];
  isLoading: boolean;
  fetchBreweries: () => Promise<void>;
}

export const useBreweriesStore = create<BreweriesState>((set) => ({
  breweries: [],
  isLoading: false,

  fetchBreweries: async () => {
    set({ isLoading: true });

    const res = await fetch("https://api.openbrewerydb.org/v1/breweries");
    const rawData = await res.json();

    const isValidBreweryArray =
      Array.isArray(rawData) &&
      rawData.every(
        (item) =>
          typeof item === "object" &&
          item !== null &&
          "id" in item &&
          "name" in item
      );

    set({
      breweries: isValidBreweryArray ? (rawData as Brewery[]) : [],
      isLoading: false,
    });
  },
}));
