<template>
  <AppViewport>
    <div class="settings-page">
      <header class="settings-header">
        <button class="menu-btn" @click="goBack" aria-label="Back">
          ☰
        </button>
        <h1 class="header-title">Account</h1>
      </header>

      <main class="settings-content">
        <div class="profile-section">
          <div class="avatar-wrap">
            <img
              v-if="user.avatarUrl"
              :src="user.avatarUrl"
              alt="Profile"
              class="avatar-img"
            />
            <div v-else class="avatar-fallback">
              {{ initials }}
            </div>
          </div>
        </div>

        <section class="settings-group">
          <p class="group-label">Basic Info</p>

          <button class="settings-row" @click="goToBasicInfo">
            <span class="row-label">Username</span>
            <span class="row-value">{{ user.username || '—' }}</span>
            <span class="row-chevron">›</span>
          </button>

          <button class="settings-row" @click="goToBasicInfo">
            <span class="row-label">First Name</span>
            <span class="row-value">{{ user.firstName || '—' }}</span>
            <span class="row-chevron">›</span>
          </button>

          <button class="settings-row" @click="goToBasicInfo">
            <span class="row-label">Last Name</span>
            <span class="row-value">{{ user.lastName || '—' }}</span>
            <span class="row-chevron">›</span>
          </button>

          <button class="settings-row" @click="goToBasicInfo">
            <span class="row-label">Email</span>
            <span class="row-value">{{ user.email || '—' }}</span>
            <span class="row-chevron">›</span>
          </button>
        </section>

        <section class="settings-group">
          <p class="group-label">Security</p>

          <button class="settings-row" @click="goToPassword">
            <span class="row-label">Password</span>
            <span class="change-pill">Change</span>
          </button>
        </section>

        <section class="settings-group">
          <p class="group-label">Account Control</p>

          <button class="settings-row danger-row" @click="goToDelete">
            <span class="row-label">Delete Account</span>
            <span class="row-chevron">›</span>
          </button>
        </section>
      </main>
    </div>
  </AppViewport>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import AppViewport from '../components/AppViewport.vue'

const router = useRouter()

const user = ref({
  username: '',
  firstName: '',
  lastName: '',
  email: '',
  avatarUrl: ''
})

const initials = computed(() => {
  const first = user.value.firstName?.[0] || ''
  const last = user.value.lastName?.[0] || ''
  return `${first}${last}`.toUpperCase() || '?'
})

function goBack() {
  router.push('/dashboard')
}

function goToBasicInfo() {
  router.push('/account/basic-info')
}

function goToPassword() {
  router.push('/account/password')
}

function goToDelete() {
  router.push('/account/delete')
}

async function fetchUserProfile() {
  try {
    const token = localStorage.getItem('token')
    if (!token) return

    const response = await fetch('http://localhost:5757/api/users/me', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    })

    if (!response.ok) {
      throw new Error(`Failed to fetch user profile: ${response.status}`)
    }

    const data = await response.json()

    user.value = {
      username: data.username || '',
      firstName: data.firstName || '',
      lastName: data.lastName || '',
      email: data.email || '',
      avatarUrl: data.avatarUrl || ''
    }
  } catch (error) {
    console.error('Error loading account settings:', error)
  }
}

onMounted(() => {
  fetchUserProfile()
})
</script>

<style scoped>
.settings-page {
  min-height: 100%;
  background: #f3f4f6;
}

.settings-header {
  display: grid;
  grid-template-columns: 40px 1fr 40px;
  align-items: center;
  padding: 0.85rem 1rem 0.5rem;
}

.menu-btn {
  border: none;
  background: transparent;
  color: #174a84;
  font-size: 1.6rem;
  cursor: pointer;
}

.header-title {
  text-align: center;
  margin: 0;
  color: #174a84;
  font-size: 1.3rem;
  font-weight: 800;
}

.settings-content {
  padding: 0.5rem 1rem 1.25rem;
}

.profile-section {
  display: flex;
  justify-content: center;
  margin: 0.75rem 0 1rem;
}

.avatar-wrap {
  width: 84px;
  height: 84px;
}

.avatar-img,
.avatar-fallback {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  border: 2px solid #174a84;
  object-fit: cover;
}

.avatar-fallback {
  display: grid;
  place-items: center;
  background: #ffffff;
  color: #174a84;
  font-size: 1.9rem;
  font-weight: 800;
}

.settings-group {
  margin-bottom: 1rem;
}

.group-label {
  margin: 0 0 0.35rem;
  color: #b0b0b0;
  font-size: 0.72rem;
  font-weight: 700;
  text-transform: uppercase;
}

.settings-row {
  width: 100%;
  display: grid;
  grid-template-columns: 1fr auto auto;
  align-items: center;
  gap: 0.6rem;
  border: none;
  background: #ffffff;
  border-radius: 10px;
  padding: 0.8rem 0.9rem;
  margin-bottom: 0.45rem;
  box-shadow: 0 2px 8px rgba(0,0,0,0.08);
  text-align: left;
  cursor: pointer;
}

.row-label {
  color: #8f98a3;
  font-size: 0.88rem;
  font-weight: 600;
}

.row-value {
  color: #2e2e2e;
  font-size: 0.82rem;
  font-weight: 700;
}

.row-chevron {
  color: #7a7a7a;
  font-size: 1.2rem;
}

.change-pill {
  background: #67c6ee;
  color: white;
  font-size: 0.72rem;
  font-weight: 700;
  border-radius: 8px;
  padding: 0.3rem 0.8rem;
}

.danger-row .row-label {
  color: #c5c5c5;
}
</style>