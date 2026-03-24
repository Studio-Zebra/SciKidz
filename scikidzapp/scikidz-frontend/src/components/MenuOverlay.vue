<template>
  <Transition name="menu">
    <div
      v-if="open"
      class="menu-backdrop"
      @click="emit('close')"
    >
      <aside class="menu-panel" @click.stop>
        <div class="menu-header">
          <div class="profile-block">
            <div class="avatar-wrap">
              <img
                v-if="user?.avatarUrl"
                :src="user.avatarUrl"
                alt="Profile avatar"
                class="avatar-img"
              />
              <div v-else class="avatar-fallback">
                <span>{{ initials }}</span>
              </div>
            </div>

            <div class="profile-text">
              <h2 class="name">{{ user.name || 'Student Name' }}</h2>
              <p class="username">{{ user.username || 'username' }}</p>
            </div>
          </div>

          <button class="close-btn" @click="emit('close')" aria-label="Close menu">
            ‹
          </button>
        </div>

        <div class="divider"></div>

        <nav class="menu-links">
          <button class="menu-link" @click="goTo('/progress')">
            <span class="link-left">
              <img
                src="/assets/Progress_tracker_icon.png"
                alt="Progress Tracker"
                class="menu-icon-img"
              />
              <span>Progress Tracker</span>
            </span>
            <span class="chevron">›</span>
          </button>

          <button class="menu-link" @click="goTo('/account')">
            <span class="link-left">
              <img
                src="/assets/Account_settings_icon.png"
                alt="Account Settings"
                class="menu-icon-img"
              />
              <span>Account Settings</span>
            </span>
            <span class="chevron">›</span>
          </button>

          <button class="menu-link" @click="goTo('/dashboard')">
            <span class="link-left">
              <img
                src="/assets/Module_center_icon.png"
                alt="Module Center"
                class="menu-icon-img"
              />
              <span>Module Center</span>
            </span>
            <span class="chevron">›</span>
          </button>
        </nav>

        <div class="menu-footer">
          <button class="logout-btn" @click="handleLogout">
            Logout
          </button>
        </div>
      </aside>
    </div>
  </Transition>
</template>
  
  <script setup>
  import { computed } from 'vue'
  import { useRouter } from 'vue-router'
  import { watch } from 'vue'
  
  const props = defineProps({
    open: {
      type: Boolean,
      default: false
    },
    user: {
      type: Object,
      default: () => ({})
    }
  })
  
  const emit = defineEmits(['close', 'logout'])
  
  const router = useRouter()
  
  const initials = computed(() => {
    const name = props.user?.name || ''
    if (!name.trim()) return '?'
  
    return name
      .trim()
      .split(/\s+/)
      .slice(0, 2)
      .map(part => part[0]?.toUpperCase() || '')
      .join('')
  })
  
  function goTo(path) {
    emit('close')
    router.push(path)
  }
  
  function handleLogout() {
    emit('logout')
  }

  watch(
  () => props.user,
  (newVal) => {
    console.log('menu user prop:', newVal)
  },
  { immediate: true, deep: true }
)
  </script>
  
  <style scoped>
.menu-backdrop {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.28);
  z-index: 1200;
  display: flex;
  justify-content: flex-start;
  overflow: hidden;
}

.menu-panel {
  width: min(86vw, 340px);
  max-width: 340px;
  height: 100vh;
  background: #e9edf2;
  box-shadow: 8px 0 24px rgba(0, 0, 0, 0.18);
  display: flex;
  flex-direction: column;
  will-change: transform;
  box-sizing: border-box;
}

.menu-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  padding: 1.4rem 1.2rem 1rem;
  gap: 1rem;
}

.profile-block {
  display: flex;
  align-items: center;
  gap: 0.9rem;
  min-width: 0;
}

.avatar-wrap {
  width: 72px;
  height: 72px;
  flex-shrink: 0;
}

.avatar-img,
.avatar-fallback {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  border: 1.5px solid #1d4f8d;
  object-fit: cover;
}

.avatar-fallback {
  display: grid;
  place-items: center;
  background: #f7f9fc;
  color: #1d4f8d;
  font-weight: 700;
  font-size: 1.35rem;
}

.profile-text {
  padding-top: 0.2rem;
  min-width: 0;
}

.name {
  margin: 0;
  font-size: 1.4rem;
  font-weight: 800;
  color: #174a84;
  line-height: 1.1;
}

.username {
  margin: 0.2rem 0 0;
  font-size: 1rem;
  font-weight: 600;
  color: #5d6670;
}

.close-btn {
  width: 46px;
  height: 46px;
  border: 1px solid #2d5f98;
  border-radius: 50%;
  background: #f8fbff;
  color: #1d4f8d;
  font-size: 2rem;
  line-height: 1;
  cursor: pointer;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.15);
  flex-shrink: 0;
  display: grid;
  place-items: center;
}

.divider {
  height: 1px;
  background: #c8ced6;
  margin: 0 0 0.8rem;
}

.menu-links {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  padding: 0.25rem 0.75rem;
}

.menu-link {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border: none;
  background: transparent;
  padding: 0.9rem 0.5rem;
  font-size: 1.15rem;
  color: #5a5a5a;
  cursor: pointer;
  text-align: left;
}

.link-left {
  display: flex;
  align-items: center;
  gap: 0.7rem;
}

.menu-icon-img {
  width: 24px;
  height: 24px;
  object-fit: contain;
  flex-shrink: 0;
}

.chevron {
  font-size: 2rem;
  color: #6c6c6c;
  line-height: 1;
  flex-shrink: 0;
}

.menu-footer {
  margin-top: auto;
  padding: 1rem;
  border-top: 1px solid #c8ced6;
  display: flex;
  justify-content: flex-end;
}

.logout-btn {
  border: none;
  border-radius: 10px;
  background: #67c6ee;
  color: white;
  font-weight: 700;
  font-size: 1.05rem;
  padding: 0.8rem 1.1rem;
  cursor: pointer;
}

/* combined transition */
.menu-enter-active,
.menu-leave-active {
  transition: opacity 0.25s ease;
}

.menu-enter-from,
.menu-leave-to {
  opacity: 0;
}

.menu-enter-to,
.menu-leave-from {
  opacity: 1;
}

.menu-enter-active .menu-panel,
.menu-leave-active .menu-panel {
  transition: transform 0.32s cubic-bezier(0.22, 1, 0.36, 1);
}

.menu-enter-from .menu-panel,
.menu-leave-to .menu-panel {
  transform: translateX(-105%);
}

.menu-enter-to .menu-panel,
.menu-leave-from .menu-panel {
  transform: translateX(0);
}
  </style>