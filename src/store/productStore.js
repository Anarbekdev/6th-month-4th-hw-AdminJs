import { create } from "zustand";
import { api } from "../api/axios"
export const useProductStore = create((set) => ({
    products: [],
    isLoading: false,

    getProducts : async() => {
        set({isLoading: true});

        const res = await api.get("/products")
        set({products: res.data, isLoading: false})
    }
}))