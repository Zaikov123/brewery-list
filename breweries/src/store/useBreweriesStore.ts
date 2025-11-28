import { create } from "zustand";
import { Brewery } from "../types/Brewery";
import { getBreweries } from "@/lib/api";

interface BreweriesState {
  breweries: Brewery[];
  isLoading: boolean;
  fetchBreweries: () => Promise<void>;
  removeBreweries: (breweryIds: string[]) => void;
}

export const useBreweriesStore = create<BreweriesState>((set) => ({
  breweries: [],
  isLoading: false,

  fetchBreweries: async () => {
    set({ isLoading: true });

    const rawData = await getBreweries();

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
  removeBreweries: (breweryIds: string[]) => {
    set((state) => ({
      breweries: state.breweries.filter(
        (brewery) => !breweryIds.includes(brewery.id)
      ),
    }));
  },
}));
