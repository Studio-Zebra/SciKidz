<template>
    <div class="register-wrapper">
      <!-- Back Button -->
      <button class="back-btn" @click="goBack">←</button>
  
      <h1 class="title">Security</h1>
  
      <label class="label">Password</label>
      <ul class="guidelines">
        <li>7 Characters Minimum (24 Max)</li>
        <li>1 Letter, 1 number, 1 special character</li>
      </ul>
  
      <input
        v-model="password"
        type="password"
        class="input-field"
      />
      <p v-if="password && !validPasswordLength()" class="error-text">
  Password must be 7–24 characters long.
</p>

<p v-if="password && !validPasswordLetter()" class="error-text">
  Must include at least one letter.
</p>

<p v-if="password && !validPasswordNumber()" class="error-text">
  Must include at least one number.
</p>

<p v-if="password && !validPasswordSpecial()" class="error-text">
  Must include at least one special character.
</p>

      <button
  class="signup-btn"
  :disabled="!isValidPassword()"
  @click="signUp"
>
  Sign Up
</button>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  import { useRouter, useRoute } from 'vue-router'
  import api from '../services/axios'
  
  const router = useRouter()
  const route = useRoute()
  
  const email = route.query.email
  const username = route.query.username
  const firstName = route.query.firstName
  const lastName = route.query.lastName

  const validPasswordLength = () =>
  password.value.length >= 7 && password.value.length <= 24;

  const validPasswordLetter = () => /[A-Za-z]/.test(password.value);
    const validPasswordNumber = () => /\d/.test(password.value);
    const validPasswordSpecial = () =>
  /[!@#$%^&*(),.?":{}|<>]/.test(password.value);

    const isValidPassword = () =>
  validPasswordLength() &&
  validPasswordLetter() &&
  validPasswordNumber() &&
  validPasswordSpecial();



  
  const password = ref('')
  
  const signUp = async () => {
    const payload = {
      email,
      username,
      firstName,
      lastName,
      password: password.value
    }
  
    await api.post('/auth/register', payload)
    router.push('/login')
  }
  
  const goBack = () => router.push({ name: 'Register2' })
  </script>
  
  <style scoped>
  @import '../styles/register.css';
  </style>