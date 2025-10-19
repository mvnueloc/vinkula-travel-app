import { create } from "zustand";
import { getItem, removeItem, setItem } from "./storage";

const baseUrl = process.env.EXPO_PUBLIC_API_URL_DEV;

export interface Category {
  idCategory: string;
  name: string;
}

interface CategoryStore {
  categories: Category[];
  getCategories: () => Promise<boolean>;
  updateCategories: () => Promise<boolean>;
  checkCategories: () => Promise<boolean>;
  clearCategories: () => Promise<void>;
}

export const useCategoryStore = create<CategoryStore>((set) => ({
  categories: [],
  getCategories: async () => {
    try {
      const response = await fetch(`${baseUrl}/categories`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch categories");
      }

      const data = await response.json();

      set({ categories: data });

      await setItem("categories", data);
      // console.log("Categories saved to storage:", data);

      return true;
    } catch (error) {
      console.error("Fetch categories error:", error);
      return false;
    }
  },
  updateCategories: async () => {
    try {
      const response = await fetch(`${baseUrl}/categories`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch categories");
      }
      const data = await response.json();
      set({ categories: data });

      // console.log("Updating categories in storage:", data);

      await removeItem("categories");
      await setItem("categories", data);
      return true;
    } catch (error) {
      console.error("Error updating categories:", error);
      return false;
    }
  },
  checkCategories: async () => {
    const categories = await getItem("categories");
    if (categories) {
      set({ categories });
      // console.log("Categories loaded from storage:", categories);
      return true;
    }
    return false;
  },
  clearCategories: async () => {
    await removeItem("categories");
    set({ categories: [] });
    // console.log("Categories cleared from storage");
  },
}));
