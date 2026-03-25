<template>
    <AppViewport>
      <div class="config-page">
        <header class="config-header">
          <button class="text-btn" @click="goBack">Cancel</button>
          <button class="save-btn" @click="saveChanges" aria-label="Save changes">
            ✓
          </button>
        </header>
  
        <main class="config-content">
          <div class="field-group">
            <label class="field-label">Username</label>
            <input v-model="form.username" class="field-input" type="text" maxlength="32" />
            <p class="field-count">{{ form.username.length }}/32</p>
          </div>
  
          <div class="field-group">
            <label class="field-label">First Name</label>
            <input v-model="form.firstName" class="field-input" type="text" maxlength="16" />
            <p class="field-count">{{ form.firstName.length }}/16</p>
          </div>
  
          <div class="field-group">
            <label class="field-label">Last Name</label>
            <input v-model="form.lastName" class="field-input" type="text" maxlength="16" />
            <p class="field-count">{{ form.lastName.length }}/16</p>
          </div>
  
          <div class="field-group">
            <label class="field-label">Email</label>
            <input v-model="form.email" class="field-input" type="email" maxlength="64" />
            <p class="field-count">{{ form.email.length }}/64</p>
          </div>
        </main>
      </div>
    </AppViewport>
  </template>
  
  <script setup>
  import { onMounted, reactive } from 'vue'
  import { useRouter } from 'vue-router'
  import AppViewport from '../components/AppViewport.vue'
  
  const router = useRouter()
  
  const form = reactive({
    username: '',
    firstName: '',
    lastName: '',
    email: ''
  })
  
  function goBack() {
    router.push('/account')
  }
  
  async function fetchProfile() {
    try {
      const token = localStorage.getItem('token')
      if (!token) return
  
      const response = await fetch('http://localhost:5757/api/users/me', {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      })
  
      if (!response.ok) {
        throw new Error('Failed to fetch profile')
      }
  
      const data = await response.json()
  
      form.username = data.username || ''
      form.firstName = data.firstName || ''
      form.lastName = data.lastName || ''
      form.email = data.email || ''
    } catch (error) {
      console.error('Failed to load profile:', error)
    }
  }
  
  async function saveChanges() {
    try {
      const token = localStorage.getItem('token')
      if (!token) return
  
      const response = await fetch('http://localhost:5757/api/users/me', {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username: form.username,
          firstName: form.firstName,
          lastName: form.lastName,
          email: form.email
        })
      })
  
      if (!response.ok) {
        throw new Error('Failed to update profile')
      }
  
      router.push('/account')
    } catch (error) {
      console.error('Failed to save profile:', error)
    }
  }
  
  onMounted(() => {
    fetchProfile()
  })
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
  </style>