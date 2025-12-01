<template>
    <div class="login-wrapper">
      <div class="login-container">
  
        <!-- SciKidz logo -->
        <img
          src="/assets/scikidz-logo.png"
          alt="SciKidz"
          class="logo"
        />
  
        <!-- Username -->
        <input
          v-model="username"
          type="text"
          placeholder="Username"
          class="input-field"
        />
  
        <!-- Password -->
        <input
          v-model="password"
          type="password"
          placeholder="Password"
          class="input-field"
        />
  
        <!-- Login Button -->
        <button class="login-btn" @click="handleLogin">
          Log in
        </button>
  
        <!-- Register section -->
        <div class="register-section">
          <p>Don’t have an account?</p>
          <button class="register-btn" @click="goToRegister">
            Register
          </button>
        </div>
  
        <!-- Footer Logo -->
        <div class="footer">
          <img src="/assets/studioz-logo.png" alt="Studio Z" class="footer-logo" />
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  import { useRouter } from 'vue-router'
  import axios from '../services/axios'
  
  const router = useRouter()
  const username = ref('')
  const password = ref('')
  
  const handleLogin = async () => {
    try {
      const res = await axios.post('/auth/login', {
        username: username.value,
        password: password.value
      })
  
      localStorage.setItem('token', res.data.token)
      router.push('/dashboard')
    } catch (err) {
      console.error('Login failed', err)
      alert('Invalid username or password')
    }
  }
  
  const goToRegister = () => {
    router.push('/register')
  }
  </script>
  
  <style scoped>
  /* Wrapper fills screen */
  .login-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    padding: 20px;
    background: #ffffff;
  }
  
  /* Main container */
  .login-container {
    width: 100%;
    max-width: 380px;
    text-align: center;
  }
  
  /* Logo */
  .logo {
    width: 65%;
    max-width: 260px;
    margin: 0 auto 40px auto;
    display: block;
  }
  
  /* Input styling */
  .input-field {
    width: 100%;
    display: block;
    margin-left: auto;
    margin-right: autp;
    padding: 14px 16px;
    margin-bottom: 16px;
    border-radius: 10px;
    border: none;
    font-size: 15px;
    background: #ffffff;
    box-shadow: 0 0 15px rgba(0,0,0,0.1);
    outline: none;
    box-sizing: border-box;
  }
  
  /* Login button */
  .login-btn {
    width: 100%;
    padding: 14px 0;
    margin-top: 8px;
    background: #125BA0;
    color: #fff;
    border-radius: 22px;
    border: none;
    font-size: 16px;
    font-weight: 600;
    cursor: pointer;
    box-shadow: 0 4px 10px rgba(0,0,0,0.15);
  }
  .login-btn:active {
    transform: scale(0.98);
  }
  
  /* Register section */
  .register-section p {
    margin-top: 32px;
    color: #a0a0a0;
    font-size: 16px;
    font-family: "Poppins", sans-serif;

  }
  
  .register-btn {
    margin-top: 8px;
    padding: 10px 28px;
    border: 2px solid #125BA0;
    background: white;
    border-radius: 22px;
    font-size: 15px;
    color: #125BA0;
    cursor: pointer;
  }
  
  /* Footer */
  .footer {
    margin-top: 50px;
  }
  
  .footer-logo {
    width: 50px;
    opacity: 0.9;
    margin: 0 auto;
    display: block;
  }
  
  /* Mobile responsiveness */
  @media (max-height: 700px) {
    .logo {
      margin-bottom: 25px;
    }
    .footer {
      margin-top: 30px;
    }
  }
  </style>
  