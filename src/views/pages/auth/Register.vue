<template>
    <div class="min-h-screen flex flex-col md:flex-row">
        <FloatingConfigurator />
        <AsideImage />

        <div class="w-full md:w-1/2 h-screen flex items-center justify-center bg-white dark:bg-zinc-900">
            <div class="w-full max-w-md p-8">
                <h2 class="text-6xl font-bold text-gray-800 text-center mb-8 dark:text-gray-300">VITALFY</h2>
                <h2 class="text-2xl font-bold text-gray-600 text-center mb-2 dark:text-gray-300">Create your account</h2>

                <form @submit.prevent="submit">
                    <div class="mb-4">
                        <label for="name" class="block text-md font-medium text-gray-700 dark:text-gray-300">Name</label>
                        <InputText 
                            id="name" 
                            type="text" 
                            placeholder="Enter your email" 
                            class="w-full"
                            :class="{ 'p-invalid': errors.name }"
                            v-model="form.name" 
                        />
                    </div>
                    <div class="mb-4">
                        <label for="email" class="block text-md font-medium text-gray-700 dark:text-gray-300">Email Address</label>
                        <InputText 
                            id="email" 
                            type="email" 
                            placeholder="Enter your email" 
                            class="w-full"
                            :class="{ 'p-invalid': errors.email }"
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
                            :class="{ 'p-invalid': errors.password }"
                            fluid 
                            :feedback="true"
                        />
                        <small class="p-error" v-if="errors.password">{{ errors.password }}</small>
                    </div>
                    <div class="mb-3">
                        <label for="password_confirmation" class="block text-md font-medium text-gray-700 dark:text-gray-300">Password confirmation</label>
                        <Password 
                            id="password_confirmation" 
                            v-model="form.password_confirmation" 
                            placeholder="Confirm your password" 
                            :toggleMask="true" 
                            :class="{ 'p-invalid': errors.password_confirmation }"
                            fluid 
                            :feedback="false"
                        />
                        <small class="p-error" v-if="errors.password_confirmation">{{ errors.password_confirmation }}</small>
                    </div>
                    <div class="flex items-center justify-between">
                        <label class="flex items-center">
                            <Checkbox 
                                v-model="form.checked" 
                                :class="{ 'p-invalid': errors.checked }"
                                id="rememberme" 
                                binary
                            />
                            <span class="ml-2 text-sm text-gray-600 dark:text-gray-300">
                                I declare and certify that i am over 18 years old and accept the <a href="#" class="text-md text-primary hover:underline cursor-pointer">terms of user</a>
                            </span>
                        </label>
                    </div>
                    <small class="p-error block mb-3" v-if="errors.checked">{{ errors.checked }}</small>
                    <Button label="Register now" :loading="loading" class="w-full mt-3" type="submit"></Button>
                </form>

                <p class="text-md text-gray-600 text-center mt-3 dark:text-gray-300">
                    Already have an account? 
                    <router-link to="login" class="text-primary hover:underline cursor-pointer">Sign in</router-link>
                </p>
            </div>
        </div>
        <Toast />
    </div>
</template>

<script setup>
import { ref } from "vue";
import { register } from './api'
import AsideImage from './components/AsideImage.vue'
import ToastService from 'primevue/toastservice';
import { useToast } from 'primevue/usetoast';
import { registerSchema } from '@/validations/authSchema.js';
import { useRouter } from 'vue-router';

const toast = useToast();
const router = useRouter();
const loading = ref(false)
const errors = ref({});

const form = ref({
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
    checked: false
})

const submit = () => {
    if (!validateForm()) {
        return;
    }

    loading.value = true

    register(form.value)
        .then(response => {
            showToastMessage('success', 'Sucesso', 'Usuário criado com successo!', 4000)
            setTimeout(() => {
                router.push({ name: 'login' });
            }, 1000);
        }).catch(error => {
            loading.value = false
            showToastMessage('error', 'Erro', 'Erro ao criar usuário!', 4000);
        })
}

const showToastMessage = (severity, summary, detail, life = 3000) => {
    toast.add({ severity: severity, summary: summary, detail: detail, life: life });
}

const validateForm = () => {
    try {
        const result = registerSchema.parse(form.value);
        errors.value = {};
        return true;
    } catch (error) {
        errors.value = {};
        error.errors.forEach((err) => {
            if (err.path) {
                errors.value[err.path[0]] = err.message;
            }
        });
        return false;
    }
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