<template>
  <div class="page">
    <header class="appbar">
      <button class="icon-btn" aria-label="Menu" @click="toggleMenu">
        <svg viewBox="0 0 24 24" class="icon">
          <path d="M4 6h16M4 12h16M4 18h16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
        </svg>
      </button>

      <div class="brand">
        <img class="brand-logo" src="/assets/scikidz-logo.png" alt="SciKidz" />
      </div>

      <button class="icon-btn" aria-label="Edit Profile" @click="goToProfile">
        <svg viewBox="0 0 24 24" class="icon">
          <path d="M12 22a10 10 0 1 1 10-10 10 10 0 0 1-10 10Z" fill="none" stroke="currentColor" stroke-width="2"/>
          <path d="M8.5 15.5 16 8l1.5 1.5-7.5 7.5H8.5v-1.5Z" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/>
        </svg>
      </button>
    </header>

    <MenuOverlay
      :open="menuOpen"
      :user="userProfile"
      @close="menuOpen = false"
      @logout="logout"
    />

    <main class="content">
      <section class="cards">
        <article
          v-for="lesson in lessons"
          :key="lesson.id"
          class="lesson-card"
        >
          <div class="card-top" :style="{ background: lesson.ribbonColor }">
            <div class="card-title">{{ lesson.title }}</div>

            <button class="kebab" aria-label="More" @click="openLessonMenu(lesson)">
              <span></span><span></span><span></span>
            </button>
          </div>

          <div
            class="card-grade-strip"
            :style="{ background: lesson.ribbonColor }"
          >
            <div class="card-grade">{{ lesson.grade }}</div>
          </div>

          <div class="card-media">
            <img :src="lesson.imageUrl" :alt="lesson.title" />
            <button class="open-btn" @click.stop="openModule(lesson)">
              Open Module
            </button>
          </div>
        </article>
      </section>
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import MenuOverlay from '../components/MenuOverlay.vue'

const router = useRouter()
const menuOpen = ref(false)



const userProfile = ref({
  name: '',
  username: '',
  avatarUrl: ''
})

function openModule(lesson) {
  const moduleId = lesson?.moduleId || lesson?.id || lesson?.slug
  if (!moduleId) {
    console.error('Missing moduleId/id for lesson:', lesson)
    return
  }

  router.push({ name: 'Lesson', params: { moduleId } })
}

function toggleMenu() {
  menuOpen.value = !menuOpen.value
}

function goToProfile() {
  router.push({ name: 'account' })
}

function logout() {
  localStorage.removeItem('token')
  localStorage.removeItem('user')
  router.push('/login')
}

async function fetchUserProfile() {
  try {
    const token = localStorage.getItem('token')
    if (!token) return

    const response = await fetch('/api/users/me', {
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
console.log('raw data from API:', data)

userProfile.value = {
  name: `${data.firstName || ''} ${data.lastName || ''}`.trim(),
  username: data.username || '',
  avatarUrl: data.avatarUrl || ''
}

console.log('userProfile.value:', userProfile.value)

    localStorage.setItem('user', JSON.stringify(userProfile.value))
  } catch (error) {
    console.error('Error loading user profile:', error)

    const savedUser = localStorage.getItem('user')
    if (savedUser) {
      try {
        const parsed = JSON.parse(savedUser)

        userProfile.value = {
          name: parsed.name || '',
          username: parsed.username || '',
          avatarUrl: parsed.avatarUrl || ''
        }
      } catch (e) {
        console.error('Failed to parse saved user:', e)
      }
    }
  }
}

const lessons = ref([
  {
    id: 'water-cycle',
    title: 'The Water Cycle',
    grade: '3RD GRADE',
    ribbonColor: '#6EC6F4',
    imageUrl: '/assets/lesson-watercycle.png'
  },
  {
    id: 'atoms-molecules',
    title: 'Atoms and Molecules',
    grade: '6TH GRADE',
    ribbonColor: '#F2A23B',
    imageUrl: '/assets/lesson-atoms.png'
  },
  {
    id: 'basic-mechanics',
    title: 'Basic Mechanics',
    grade: '12TH GRADE',
    ribbonColor: '#F36B6B',
    imageUrl: '/assets/lesson-mechanics.png'
  }
])

function openLessonMenu(lesson) {
  alert(`Lesson options for: ${lesson.title}`)
}

onMounted(() => {
  fetchUserProfile()
})
</script>

<style scoped>
.page {
  min-height: 100vh;
  background: #ffffff;
}

.appbar {
  height: 64px;
  display: grid;
  grid-template-columns: 56px 1fr 56px;
  align-items: center;
  padding: 8px 10px;
  border-bottom: 1px solid rgba(0,0,0,0.06);
}

.icon-btn {
  width: 44px;
  height: 44px;
  border: none;
  background: transparent;
  border-radius: 999px;
  display: grid;
  place-items: center;
  cursor: pointer;
}

.icon {
  width: 28px;
  height: 28px;
  color: #1a1a1a;
}

.brand {
  display: grid;
  place-items: center;
}

.brand-logo {
  height: 68px;
  width: auto;
}

.content {
  padding: 14px;
  display: grid;
  place-items: start center;
}

.cards {
  width: min(420px, 100%);
  display: grid;
  gap: 16px;
}

.lesson-card {
  width: 100%;
  border-radius: 14px;
  overflow: hidden;
  box-shadow: 0 10px 22px rgba(0,0,0,0.18);
  background: #fff;
}

.card-top {
  display: grid;
  grid-template-columns: 1fr 40px;
  align-items: center;
  padding: 10px 10px;
}

.card-title {
  font-size: 20px;
  font-weight: 800;
  color: #ffffff;
  line-height: 1.1;
  text-shadow: 0 1px 0 rgba(0,0,0,0.1);
}

.card-grade-strip {
  padding: 6px 10px;
  background: inherit;
  opacity: 0.75;
}

.card-grade {
  font-size: 12px;
  font-weight: 800;
  letter-spacing: 0.6px;
  color: #ffffff;
}

.kebab {
  width: 34px;
  height: 34px;
  border-radius: 10px;
  border: none;
  background: rgba(255,255,255,0.55);
  display: grid;
  place-items: center;
  cursor: pointer;
}

.kebab span {
  display: block;
  width: 4px;
  height: 4px;
  background: #ffffff;
  border-radius: 999px;
  margin: 1px 0;
}

.card-media {
  position: relative;
  height: 168px;
  background: #e9eef5;
}

.card-media img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.open-btn {
  position: absolute;
  right: 14px;
  bottom: 12px;
  border: none;
  border-radius: 10px;
  padding: 10px 14px;
  font-size: 16px;
  font-weight: 800;
  color: #ffffff;
  background: rgba(18, 91, 160, 0.92);
  box-shadow: 0 6px 14px rgba(0,0,0,0.25);
  cursor: pointer;
}

.open-btn:active {
  transform: scale(0.98);
}

@media (max-width: 360px) {
  .card-title { font-size: 18px; }
  .card-media { height: 154px; }
  .open-btn { font-size: 15px; padding: 9px 12px; }
}
</style>