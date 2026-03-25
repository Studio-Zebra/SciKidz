<template>
    <AppViewport>
      <div class="config-page">
        <header class="config-header">
          <button class="text-btn" @click="goBack">Cancel</button>
          <button class="save-btn" @click="savePassword" aria-label="Save password">
            ✓
          </button>
        </header>
  
        <main class="config-content">
          <div class="field-group">
            <label class="field-label">Current Password</label>
            <input v-model="form.currentPassword" class="field-input" type="password" maxlength="64" />
            <p class="field-count">{{ form.currentPassword.length }}/64</p>
          </div>
  
          <div class="field-group">
            <label class="field-label">New Password</label>
            <input v-model="form.newPassword" class="field-input" type="password" maxlength="64" />
            <p class="field-count">{{ form.newPassword.length }}/64</p>
          </div>
  
          <ul class="password-rules">
            <li>7+ Characters Minimum (24 Max)</li>
            <li>1 Letter, 1 number, 1 special character</li>
          </ul>
        </main>
      </div>
    </AppViewport>
  </template>
  
  <script setup>
  import { reactive } from 'vue'
  import { useRouter } from 'vue-router'
  import AppViewport from '../components/AppViewport.vue'
  
  const router = useRouter()
  
  const form = reactive({
    currentPassword: '',
    newPassword: ''
  })
  
  function goBack() {
    router.push('/account')
  }
  
  async function savePassword() {
    try {
      const token = localStorage.getItem('token')
      if (!token) return
  
      const response = await fetch('http://localhost:5757/api/users/password', {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          currentPassword: form.currentPassword,
          newPassword: form.newPassword
        })
      })
  
      if (!response.ok) {
        throw new Error('Failed to update password')
      }
  
      router.push('/account')
    } catch (error) {
      console.error('Failed to update password:', error)
    }
  }
  </script>
  
  <style scoped>
  .config-page {
    min-height: 100%;
    background: #f7f7f7;
  }
  
  .config-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.9rem 1rem;
  }
  
  .text-btn {
    border: none;
    background: transparent;
    color: #9d9d9d;
    font-size: 0.8rem;
    cursor: pointer;
  }
  
  .save-btn {
    width: 34px;
    height: 34px;
    border-radius: 50%;
    border: 1px solid #315d8f;
    background: white;
    color: #315d8f;
    font-size: 1.1rem;
    font-weight: 800;
    cursor: pointer;
  }
  
  .config-content {
    padding: 0.4rem 1rem 1rem;
  }
  
  .field-group {
    margin-bottom: 1rem;
  }
  
  .field-label {
    display: block;
    margin-bottom: 0.35rem;
    color: #565656;
    font-size: 0.72rem;
    font-weight: 700;
  }
  
  .field-input {
    width: 100%;
    box-sizing: border-box;
    border: none;
    border-radius: 8px;
    background: white;
    box-shadow: 0 1px 6px rgba(0,0,0,0.08);
    padding: 0.85rem 0.9rem;
    font-size: 0.95rem;
    font-weight: 600;
    outline: none;
  }
  
  .field-count {
    margin: 0.25rem 0 0;
    text-align: right;
    color: #b0b0b0;
    font-size: 0.68rem;
  }
  
  .password-rules {
    margin: 0.5rem 0 0;
    padding-left: 1rem;
    color: #9e9e9e;
    font-size: 0.72rem;
    line-height: 1.45;
  }
  </style>