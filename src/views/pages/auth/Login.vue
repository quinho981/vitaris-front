<template>
    <div class="min-h-screen flex flex-col md:flex-row">
        <FloatingConfigurator />
        <AsideImage />

        <div class="w-full md:w-1/2 h-screen flex items-center justify-center bg-white dark:bg-gray-900">
            <div class="w-full max-w-md p-8">
                <h2 class="text-6xl font-bold text-gray-800 text-center mb-8 dark:text-gray-300">VITALFY</h2>
                <h2 class="text-3xl font-bold text-gray-800 text-center mb-2 dark:text-gray-300">Login</h2>
                <p class="text-lg text-gray-600 text-center mb-6 dark:text-gray-300">Welcome back! Please login to your account.</p>

                <form @submit.prevent="handleLogin">
                    <div class="mb-4">
                        <label for="email" class="block text-md font-medium text-gray-700 dark:text-gray-300">Email Address</label>
                        <InputText 
                            id="email1" 
                            type="text" 
                            placeholder="Enter your email" 
                            class="w-full" 
                            v-model="email" 
                        />
                    </div>
                    <div class="mb-4">
                        <label for="password" class="block text-md font-medium text-gray-700 dark:text-gray-300">Password</label>
                        <Password 
                            id="password1" 
                            v-model="password" 
                            placeholder="Enter your password" 
                            :toggleMask="true" 
                            class="mb-4" 
                            fluid 
                            :feedback="false"
                        ></Password>
                    </div>
                    <div class="flex items-center justify-between mb-4">
                        <label class="flex items-center">
                            <Checkbox 
                                v-model="checked" 
                                id="rememberme1" 
                                binary
                            ></Checkbox>
                            <span class="ml-2 text-md text-gray-600 dark:text-gray-300">Remember me</span>
                        </label>
                        <a href="#" class="text-md text-primary hover:underline">Forgot password?</a>
                    </div>
                    <Button label="Sign In" class="w-full" as="router-link" to="/"></Button>
                </form>

                <p class="text-md text-gray-600 text-center mt-4 dark:text-gray-300">
                    Don’t have an account? <a href="register" class="text-primary hover:underline cursor-pointer">Sign up</a>
                </p>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from "vue";
import AsideImage from './components/AsideImage.vue'

</script>

<style scoped>
</style>
