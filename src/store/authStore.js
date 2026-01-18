import { create } from "zustand";
import { api } from "../api/axios";

export const useAuthStore = create((set) => ({
    user: null,
    accessToken: null,
    refreshToken: null,
    isAuth: false,
    isLoading: false,
    error: null,

    profile: null,
    getProfile: async() => {
        const res = await api.get("/profile")
        set({profile: res.data})    
    },

    login: async (data) => {
        try{
             set({isLoading:true, error: null})
             const res = await api.post('auth/login', data)

             set({
                user: res.data.user,
                accessToken: res.data.token.accessToken,
                refreshToken: res.data.token.refreshToken,
                isAuth: true,
             })
             
        
             
             localStorage.setItem('accessToken', res.data.token.accessToken)
             localStorage.setItem('refreshToken', res.data.token.refreshToken)
             console.log(localStorage.getItem('accessToken'));

        } catch (err) {
            set({error: err.response?.data?.message || "Login Failed"})
        } finally {
            set({isLoading: false})
        }
    },

    register: async(data) => {
        try {
            set({isLoading: true, error: null})
            await api.post('/auth/register', data)
        } catch (err) {
            set({error: err.response?.data?.message || 'Registration failed'})
        } finally {
            set({isLoading: false})
        }
    },


    logout: () => {
        set({
          user: null,
          accessToken: null,
          refreshToken: null,
          isAuth: false,
          error: null,
        });
      
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
      
      }
        
}))