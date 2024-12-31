<template>
    <div class="min-h-screen flex flex-col md:flex-row">
        <FloatingConfigurator />
        <AsideImage />

        <div class="w-full md:w-1/2 h-screen flex items-center justify-center bg-white dark:bg-zinc-900">
            <div class="w-full max-w-md p-8">
                <h2 class="text-6xl font-bold text-gray-800 text-center mb-8 dark:text-gray-300">VITALFY</h2>
                <h2 class="text-3xl font-bold text-gray-800 text-center mb-2 dark:text-gray-300">Login</h2>
                <p class="text-lg text-gray-600 text-center mb-6 dark:text-gray-300">Welcome back! Please login to your account.</p>

                <Message 
                    v-if="errorMessage" 
                    class="mb-4" 
                    severity="error"
                >
                    Wrong email or password
                </Message>

                <form @submit.prevent="submit">
                    <div class="mb-4">
                        <label for="email" class="block text-md font-medium text-gray-700 dark:text-gray-300">Email Address</label>
                        <InputText 
                            id="email" 
                            type="email" 
                            placeholder="Enter your email" 
                            class="w-full" 
                            :class="{ 'p-invalid': errorMessage }"
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
                            :class="{ 'p-invalid': errorMessage }"
                            fluid 
                            :feedback="false"
                        ></Password>
                    </div>
                    <div class="flex items-center justify-between mb-4">
                        <label class="flex items-center">
                            <Checkbox 
                                v-model="form.checked" 
                                id="rememberme" 
                                binary
                            ></Checkbox>
                            <span class="ml-2 text-md text-gray-600 dark:text-gray-300">Remember me</span>
                        </label>
                        <a href="#" class="text-md text-primary hover:underline">Forgot password?</a>
                    </div>
                    <Button label="Sign In" class="w-full" :loading="loading" type="submit"></Button>
                </form>

                <p class="text-md text-gray-600 text-center mt-4 dark:text-gray-300">
                    Don’t have an account? 
                    <router-link to="register" class="text-primary hover:underline cursor-pointer">Sign up</router-link>
                </p>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from "vue";
import AsideImage from './components/AsideImage.vue'
import { login } from './api'
import { useRouter } from 'vue-router';

const router = useRouter();
const loading = ref(false);
const errorMessage = ref(false);

const form = ref({
    email: '',
    password: '',
    checked: false
})

const submit = () => {
    if (!validateForm()) {
        return;
    }

    errorMessage.value = false;
    loading.value = true;

    login(form.value)
        .then(response => {
            loading.value = false;
            router.push({ name: 'home' });
        }).catch(error => {
            loading.value = false;
            errorMessage.value = true;
        })
}

const validateForm = () => {
    if (!form.value.email && !form.value.password) {
        errorMessage.value = true;
        return false;
    }
    return true;
};
</script>

<style scoped>
.p-invalid {
    border-color: #dc3545 !important;
}

.p-error {
    color: #dc3545;
    font-size: 0.875rem;
    margin-top: 0.25rem;
}
</style>
