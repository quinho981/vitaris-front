import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import api from '@/services/axios';
import Cookies from 'js-cookie'
import { useUserStore } from '@/stores/userStore'
import { useRouter } from 'vue-router';

const router = useRouter();

export const authStore = defineStore('auth', () => {
    const token = ref(Cookies.get('token') || null)

    const register = async (payload) => {
        try {
            const response = await api.post('/register', payload)
            return response.data
        } catch (error) {
            return Promise.reject(error)
        }
    }

    const login = async (payload) => {
        try {
            const response = await api.post('/login', payload)

            token.value = response.data.access_token
            Cookies.set('token', token.value)

            return response.data
        } catch (error) {
            return Promise.reject(error)
        }
    }

    const logout = async () => {
        const userStore = useUserStore()
        const authToken = Cookies.get('token')

        try {
            const response = await api.post('/logout', null, {
                headers: {
                    Authorization: `Bearer ${authToken}`
                }
            })

            token.value = null
            userStore.userId = null
            userStore.username = null
            userStore.userEmail = null
            userStore.plan = null
            userStore.active = null

            Cookies.remove('id')
            Cookies.remove('token')
            Cookies.remove('username')
            Cookies.remove('user_email')
            Cookies.remove('plan')
            Cookies.remove('active')
            
            return response.data
        } catch (error) {
            return Promise.reject(error)
        }
    }

    const isAuthenticated = computed(() => !!token.value)

    return {
        token,
        register,
        login,
        logout,
        isAuthenticated
    }
})