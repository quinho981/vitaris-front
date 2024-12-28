<template>
    <div class="min-h-screen flex flex-col md:flex-row">
        <div class="hidden md:flex md:w-1/2 h-screen items-center justify-center bg-primary relative">
            <div class="absolute inset-0 bg-green-500">
                <svg class="absolute bottom-0 w-full h-auto" xmlns="http://www.w3.org/2000/svg" viewBox="100 0 870 320">
                    <path fill="#183c2c" fill-opacity="1" d="M0,0L34.3,10.7C68.6,21,137,43,206,80C274.3,117,343,171,411,197.3C480,224,549,224,617,202.7C685.7,181,754,139,823,122.7C891.4,107,960,117,1029,133.3C1097.1,149,1166,171,1234,192C1302.9,213,1371,235,1406,245.3L1440,256L1440,320L1405.7,320C1371.4,320,1303,320,1234,320C1165.7,320,1097,320,1029,320C960,320,891,320,823,320C754.3,320,686,320,617,320C548.6,320,480,320,411,320C342.9,320,274,320,206,320C137.1,320,69,320,34,320L0,320Z"></path>
                </svg>
            </div>
            <img 
                src="/demo/images/login/work-chat.svg"
                alt="Login illustration"
                class="relative z-10 w-3/4 md:w-4/5 lg:w-full max-w-3xl"
            />
        </div>

        <div class="w-full md:w-1/2 h-screen flex items-center justify-center bg-white">
            <div class="w-full max-w-md p-8">
                <h2 class="text-6xl font-bold text-gray-800 text-center mb-10">VITALFY</h2>
                <h2 class="text-3xl font-bold text-gray-800 text-center mb-2">Login</h2>
                <p class="text-lg text-gray-600 text-center mb-6">Welcome back! Please login to your account.</p>

                <form @submit.prevent="handleLogin">
                    <div class="mb-4">
                        <label for="email" class="block text-md font-medium text-gray-700">Email Address</label>
                        <InputText 
                            id="email1" 
                            type="text" 
                            placeholder="Enter your email" 
                            class="w-full" 
                            v-model="email" 
                        />
                    </div>
                    <div class="mb-4">
                        <label for="password" class="block text-md font-medium text-gray-700">Password</label>
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
                            <span class="ml-2 text-md text-gray-600">Remember me</span>
                        </label>
                        <a href="#" class="text-md text-primary hover:underline">Forgot password?</a>
                    </div>
                    <Button label="Sign In" class="w-full" as="router-link" to="/"></Button>
                </form>

                <p class="text-md text-gray-600 text-center mt-4">Don’t have an account? <a href="#" class="text-primary hover:underline">Sign up</a></p>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            email: '',
            password: ''
        };
    },
    methods: {
        handleLogin() {
            // Handle login logic here
            console.log('Email:', this.email);
            console.log('Password:', this.password);
        }
    }
};
</script>

<style scoped>
.bg-primary {
    background-color: #4CAF50; /* Original primary color */
}
</style>
