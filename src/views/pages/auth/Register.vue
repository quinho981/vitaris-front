<template>
    <div class="min-h-screen flex flex-col md:flex-row">
        <FloatingConfigurator />
        <AsideImage />

        <div class="w-full md:w-1/2 h-screen flex items-center justify-center bg-white dark:bg-gray-900">
            <div class="w-full max-w-md p-8">
                <h2 class="text-6xl font-bold text-gray-800 text-center mb-8 dark:text-gray-300">VITALFY</h2>
                <h2 class="text-2xl font-bold text-gray-600 text-center mb-2 dark:text-gray-300">Create your account</h2>

                <form @submit.prevent="handleLogin">
                    <div class="mb-4">
                        <label for="name" class="block text-md font-medium text-gray-700 dark:text-gray-300">Name</label>
                        <InputText 
                            id="name" 
                            type="text" 
                            placeholder="Enter your email" 
                            class="w-full" 
                            v-model="form.name" 
                        />
                    </div>
                    <div class="mb-4">
                        <label for="email" class="block text-md font-medium text-gray-700 dark:text-gray-300">Email Address</label>
                        <InputText 
                            id="email" 
                            type="text" 
                            placeholder="Enter your email" 
                            class="w-full" 
                            v-model="form.email" 
                        />
                    </div>
                    <div class="mb-4">
                        <label for="password" class="block text-md font-medium text-gray-700 dark:text-gray-300">Password</label>
                        <Password 
                            id="password" 
                            v-model="form.password" 
                            placeholder="Enter your password" 
                            :toggleMask="true" 
                            class="mb-4" 
                            fluid 
                            :feedback="true"
                        ></Password>
                    </div>
                    <div class="mb-3">
                        <label for="password_confirmation" class="block text-md font-medium text-gray-700 dark:text-gray-300">Password confirmation</label>
                        <Password 
                            id="password_confirmation" 
                            v-model="form.password_confirmation" 
                            placeholder="Confirm your password" 
                            :toggleMask="true" 
                            class="mb-3" 
                            fluid 
                            :feedback="false"
                        ></Password>
                    </div>
                    <div class="flex items-center justify-between mb-3">
                        <label class="flex items-center">
                            <Checkbox 
                                v-model="form.checked" 
                                id="rememberme" 
                                binary
                            ></Checkbox>
                            <span class="ml-2 text-sm text-gray-600 dark:text-gray-300">
                                I declare and certify that i am over 18 years old and accept the <a href="#" class="text-md text-primary hover:underline cursor-pointer">terms of user</a>
                            </span>
                        </label>
                    </div>
                    <Button label="Register now" class="w-full" as="router-link" to="/"></Button>
                </form>

                <p class="text-md text-gray-600 text-center mt-3 dark:text-gray-300">
                    Already have an account? <a href="login" class="text-primary hover:underline cursor-pointer">Sign in</a>
                </p>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from "vue";
import AsideImage from './components/AsideImage.vue'

const form = ref({
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
    checked: false
})
</script>

<style scoped>
</style>
