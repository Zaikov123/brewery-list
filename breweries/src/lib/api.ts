import { Brewery } from "@/types/Brewery";

const BASE_URL = "https://api.openbrewerydb.org/v1/breweries";

async function apiFetch<T>(url: string, init?: RequestInit): Promise<T> {
  const res = await fetch(url, {
    ...init,
    next: { revalidate: 60 },
  });

  if (!res.ok) {
    throw new Error(`API error: ${res.status}`);
  }

  return res.json();
}

export async function getBreweries(page: number, limit: number = 10): Promise<Brewery[]> {
  return apiFetch<Brewery[]>(`${BASE_URL}?page=${page}&per_page=${limit}`);
}

export async function getBrewery(id: string): Promise<Brewery> {
  return apiFetch<Brewery>(`${BASE_URL}/${id}`);
}

export async function searchBreweries(query: string): Promise<Brewery[]> {
  return apiFetch<Brewery[]>(`${BASE_URL}/search?query=${query}`);
}
