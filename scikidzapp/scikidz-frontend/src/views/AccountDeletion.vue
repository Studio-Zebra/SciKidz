<template>
    <AppViewport>
      <div class="config-page danger-page">
        <header class="config-header">
          <button class="text-btn" @click="goBack">Cancel</button>
        </header>
  
        <main class="config-content">
          <div class="warning-copy">
            <p class="warning-title">Confirm Deletion</p>
            <p class="warning-text">
              Once you have deleted your account, you will lose all your progress on modules
              and access to any educational learning material on your SciKidz account.
            </p>
          </div>
  
          <div class="field-group">
            <label class="field-label">Confirm Password</label>
            <input v-model="password" class="field-input" type="password" maxlength="64" />
            <p class="field-count">{{ password.length }}/64</p>
          </div>
        </main>
  
        <div class="delete-footer">
          <button class="delete-btn" @click="deleteAccount">
            Delete Account
          </button>
        </div>
      </div>
    </AppViewport>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  import { useRouter } from 'vue-router'
  import AppViewport from '../components/AppViewport.vue'
  
  const router = useRouter()
  const password = ref('')
  
  function goBack() {
    router.push('/account')
  }
  
  async function deleteAccount() {
    try {
      const token = localStorage.getItem('token')
      if (!token) return
  
      const response = await fetch('http://backend:5757/api/users/me', {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          password: password.value
        })
      })
  
      if (!response.ok) {
        throw new Error('Failed to delete account')
      }
  
      localStorage.removeItem('token')
      localStorage.removeItem('user')
  
      router.push('/login')
    } catch (error) {
      console.error('Failed to delete account:', error)
    }
  }
  </script>
  
  <style scoped>
  .config-page {
    min-height: 100%;
    background: #f7f7f7;
    display: flex;
    flex-direction: column;
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
  
  .config-content {
    padding: 0.4rem 1rem 1rem;
  }
  
  .warning-copy {
    margin-bottom: 1rem;
  }
  
  .warning-title {
    margin: 0 0 0.35rem;
    color: #4f4f4f;
    font-size: 0.72rem;
    font-weight: 700;
  }
  
  .warning-text {
    margin: 0;
    color: #9b9b9b;
    font-size: 0.72rem;
    line-height: 1.45;
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
  
  .delete-footer {
    margin-top: auto;
    padding: 1rem;
  }
  
  .delete-btn {
    width: 100%;
    border: none;
    border-radius: 8px;
    background: #ff6d6d;
    color: white;
    font-size: 0.95rem;
    font-weight: 800;
    padding: 0.95rem 1rem;
    cursor: pointer;
  }
  </style>