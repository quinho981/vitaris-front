import { defineStore } from 'pinia'
import { ref } from 'vue'
import api from '@/services/axios';
import Cookies from 'js-cookie'

export const useUserStore = defineStore('user', () => {
    const userId = ref(Cookies.get('id') || null)
    const username = ref(Cookies.get('username') || null)
    const userEmail = ref(Cookies.get('user_email') || null)
    const plan = ref(Cookies.get('plan') || null)
    const active = ref(Cookies.get('active') || null)

    const getUserInfo = async () => {
        const token = Cookies.get('token')
        try {
            const response = await api.get('/user', {
                headers: { Authorization: `Bearer ${token}` }
            })

            userId.value = response.data.id
            username.value = response.data.name
            userEmail.value = response.data.email
            plan.value = response.data.plans[0].name
            active.value = response.data.plans[0].pivot.active

            Cookies.set('id', userId.value)
            Cookies.set('username', username.value)
            Cookies.set('user_email', userEmail.value)
            Cookies.set('plan', plan.value)
            Cookies.set('active', active.value)

            return response.data
        } catch (error) {
            console.error(error)
        }
    }

    return {
        userId,
        username,
        userEmail,
        plan,
        active,
        getUserInfo
    }
})