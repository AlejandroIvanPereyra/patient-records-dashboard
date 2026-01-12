import { create } from "zustand"
import { persist } from "zustand/middleware"

type FavoritesState = {
    favoriteIds: string[]
    toggleFavorite: (id: string) => void
    isFavorite: (id: string) => boolean
    reset: () => void
}

const STORAGE_KEY = "patient-favorites"

export const useFavoritesStore = create<FavoritesState>()(
    persist(
        (set, get) => ({
            favoriteIds: [],

            toggleFavorite: (id) =>
                set((state) => ({
                    favoriteIds: state.favoriteIds.includes(id)
                        ? state.favoriteIds.filter((favId) => favId !== id)
                        : [...state.favoriteIds, id],
                })),

            isFavorite: (id) => {
                return get().favoriteIds.includes(id)
            },

            reset: () => set({ favoriteIds: [] }),
        }),
        {
            name: STORAGE_KEY,
        }
    )
)
