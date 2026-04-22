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

    <div v-if="showAvatarPicker" class="avatar-modal-backdrop" @click="closeAvatarPicker">
  <div class="avatar-modal" @click.stop>
    <h2 class="avatar-modal-title">Choose an Avatar</h2>

    <div class="avatar-grid">
      <button
        v-for="avatar in avatarOptions"
        :key="avatar"
        class="avatar-option"
        type="button"
        @click="selectAvatar(avatar)"
      >
        <img :src="avatar" alt="Avatar option" class="avatar-option-img" />
      </button>
    </div>

    <button class="avatar-close-btn" type="button" @click="closeAvatarPicker">
      Cancel
    </button>
  </div>
</div>


    <button
      class="avatar-edit-btn"
      type="button"
      @click="openAvatarPicker"
      aria-label="Edit profile picture"
    >
      <svg viewBox="0 0 24 24" class="icon">
        <path
          d="M12 22a10 10 0 1 1 10-10 10 10 0 0 1-10 10Z"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
        />
        <path
          d="M8.5 15.5 16 8l1.5 1.5-7.5 7.5H8.5v-1.5Z"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linejoin="round"
        />
      </svg>
    </button>
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

const showAvatarPicker = ref(false)

const avatarOptions = [
  '/assets/avatars/astronaut.png',
  '/assets/avatars/scientist-girl.png',
  '/assets/avatars/scientist-boy.png',
  '/assets/avatars/robot.png',
  '/assets/avatars/planet.png',
  '/assets/avatars/dinosaur.png'
]


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

function openAvatarPicker() {
  showAvatarPicker.value = true
}

function closeAvatarPicker() {
  showAvatarPicker.value = false
}

async function selectAvatar(avatarPath) {
  try {
    const token = localStorage.getItem('token')
    if (!token) return

    const response = await fetch('http://backend:5757/api/users/me/avatar', {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ avatarUrl: avatarPath })
    })

    if (!response.ok) {
      throw new Error(`Failed to update avatar: ${response.status}`)
    }

    const updatedUser = await response.json()
    user.value.avatarUrl = updatedUser.avatarUrl || ''
    closeAvatarPicker()
  } catch (error) {
    console.error('Error updating avatar:', error)
  }
}

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

    const response = await fetch('http://backend:5757/api/users/me', {
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
.avatar-wrap {
  position: relative;
  width: 84px;
  height: 84px;
}

.avatar-edit-btn {
  position: absolute;
  top: -2px;
  right: -2px;
  width: 30px;
  height: 30px;
  border: 2px solid #174a84;
  border-radius: 50%;
  background: #ffffff;
  color: #174a84;
  display: grid;
  place-items: center;
  cursor: pointer;
  padding: 0;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
}

.avatar-edit-btn .icon {
  width: 16px;
  height: 16px;
}

.avatar-modal-backdrop {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.35);
  display: grid;
  place-items: center;
  padding: 1rem;
  z-index: 1000;
}

.avatar-modal {
  width: min(360px, 100%);
  background: #ffffff;
  border-radius: 16px;
  padding: 1rem;
  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.2);
}

.avatar-modal-title {
  margin: 0 0 1rem;
  color: #174a84;
  font-size: 1rem;
  font-weight: 800;
  text-align: center;
}

.avatar-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.75rem;
}

.avatar-option {
  border: 2px solid #d9e2ec;
  border-radius: 14px;
  background: #f8fbff;
  padding: 0.5rem;
  cursor: pointer;
}

.avatar-option-img {
  width: 100%;
  aspect-ratio: 1 / 1;
  object-fit: cover;
  border-radius: 12px;
}

.avatar-close-btn {
  margin-top: 1rem;
  width: 100%;
  border: none;
  border-radius: 10px;
  padding: 0.8rem 1rem;
  background: #174a84;
  color: white;
  font-weight: 700;
  cursor: pointer;
}

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