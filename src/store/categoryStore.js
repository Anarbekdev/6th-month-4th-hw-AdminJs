import { create } from "zustand"
import { api } from "../api/axios"

export const useCategoriesStore = create ((set) => ({
    categories: [],
    isLoading: false,
    getCategories: async () => {
        set({isLoading:true})

        const res = await api.get('/categories')
        set({categories:res.data, isLoading: false})
    },

    createCategory: async (title) => {
        const res = api.post('/categories/create', {title})
        set((state) => ({
            categories: [...state.categories, res.data]
        }))
    }
}))