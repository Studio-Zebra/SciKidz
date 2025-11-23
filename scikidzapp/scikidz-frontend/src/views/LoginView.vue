<template>
    <div class="login-container">
        <h1 class="title">Login</h1>

        <form class="login-form" @submit.prevent="handleLogin">
            <input
                v-model="email"
                type="email"
                placeholder="Email"
                required
            />

            <input
                v-model="password"
                type="password"
                placeholder="Password"
                required
            />

            <button type="submit">Login</button>

            <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
        </form>

        <p class="switch-text">
            Don't have an account?
            <router-link to="/register">Register</router-link>
        </p>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { useAuthStore } from '../store/auth';
import { useRouter } from 'vue-router';

const email = ref('');
const password = ref('');
const errorMessage = ref('');

const auth = useAuthStore();
const router = useRouter();

const handleLogin = async () => {
    errorMessage.value = '';

    try {
        await auth.login(email.value, password.value);
        router.push('/dashboard');
    } catch (err) {
        errorMessage.value = 'Invalid email or password.';
    }
};
</script>

<style scoped>
.login-container {
    max-width: 400px;
    margin: 80px auto;
    padding: 25px;
    border-radius: 8px;
    background: #ffffff;
    box-shadow: 0 0 15px rgba(0,0,0,0.1);
}

.title {
    text-align: center;
    margin-bottom: 20px;
}

.login-form {
    display: flex;
    flex-direction: column;
    gap: 15px;
}

input {
    padding: 12px;
    font-size: 16px;
    border-radius: 6px;
    border: 1px solid #ddd;
}

button {
    padding: 12px;
    background: #3b82f6;
    border: none;
    color: white;
    border-radius: 6px;
    font-size: 16px;
    cursor: pointer;
}

button:hover {
    background: #2563eb;
}

.error {
    color: red;
    text-align: center;
}

.switch-text {
    text-align: center;
    margin-top: 15px;
}
</style>