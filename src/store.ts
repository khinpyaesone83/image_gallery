import create from "zustand";

interface CategoryStoreType {
  category: string;
  setCategory: (value: string) => void;
}
interface SearchStoreType {
  search: string;
  setSearch: (value: string) => void;
}

export const useCategoryStore = create<CategoryStoreType>((set) => ({
  category: "",
  setCategory: (newValue) => set({ category: newValue }),
}));

export const useSearchStore = create<SearchStoreType>((set) => ({
  search: "",
  setSearch: (newValue) => set({ search: newValue }),
}));
