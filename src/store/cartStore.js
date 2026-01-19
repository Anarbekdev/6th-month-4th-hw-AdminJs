import { create } from "zustand"
import { api } from "../api/axios"

export const useCartStore = create((set) => ({
    cart: [],
    isLoading: false,

    getCart: async() => {
         const res = await api.get("/cart")
         set({cart:res.data})
         console.log('getCart',res.data);
    },

    addToCart: async (productId) => {
        await api.post("/cart", {productId, quantity:1})
        const res = await api.get("/cart")
         set({cart:res.data}) 
         console.log('prodId', res.data);
    },

    removeFromCart: async (productId) => {
        await api.delete(`/cart/${productId}`)
        set((state) => ({
            cart: state.cart.filter((item) => item.product.id !== productId)
        }))
    }
}))