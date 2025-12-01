<template>
    <div class="register-wrapper">
      <!-- Back Button -->
      <button class="back-btn" @click="goBack">←</button>
  
      <h1 class="title">Register</h1>
      <h2 class="subtitle">Register a SciKidz account</h2>
  
      <label class="label">Email</label>
      <input
        v-model="email"
        type="email"
        placeholder="Enter your email"
        class="input-field"
      />
   <p v-if="email && !isValidEmail()" class="error-text">
  Please enter a valid email address.
    </p>
      <button class="next-btn"
      :disabled="!isValidEmail()"
       @click="nextStep">
       Next
    </button>
   
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  import { useRouter } from 'vue-router'
  
  const router = useRouter()
  const email = ref('')
  const emailRegex = /^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/;
  const isValidEmail = () => emailRegex.test(email.value);
  
  const nextStep = () => {
    router.push({
      name: 'Register2',
      query: { email: email.value }
    })
  }
  
  const goBack = () => router.push('/login')
  </script>
  
  <style scoped>
  @import '../styles/register.css';
  </style>