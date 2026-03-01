<template>
  <AppViewport :graySurround="true">
    <div class="recap-view">
      <header class="topbar">
        <button class="icon-btn" type="button" @click="goBack" aria-label="Go back">‹</button>
        <div class="topbar-title">Recap</div>
        <button class="icon-btn" type="button" @click="goHome" aria-label="Home">⌂</button>
      </header>

      <main class="content">
        <section v-if="mod" class="card">
          <div class="hero" :style="heroStyle" aria-hidden="true"></div>

          <div class="card-body">
            <h2 class="title">{{ recapTitle }}</h2>

            <ul class="bullets">
              <li v-for="(b, i) in recapBullets" :key="i">{{ b }}</li>
            </ul>

            <button class="primary" type="button" @click="takeQuiz">
              Take Quiz
            </button>
          </div>
        </section>

        <section v-else class="card">
          <div class="card-body">
            <h2 class="title">Module not found</h2>
            <p class="muted">Go back and choose a module again.</p>
            <button class="primary" type="button" @click="goHome">Back to Dashboard</button>
          </div>
        </section>
      </main>
    </div>
  </AppViewport>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import AppViewport from '../components/AppViewport.vue'
import { getModule } from '../content/modules'

const route = useRoute()
const router = useRouter()

const moduleId = computed(() => String(route.params.moduleId || 'water-cycle'))
const mod = computed(() => getModule(moduleId.value))

const recapTitle = computed(() => mod.value?.recap?.title || `${mod.value?.title || 'Lesson'} Recap`)
const recapBullets = computed(() => mod.value?.recap?.bullets || [])

const heroStyle = computed(() => ({
  backgroundImage: `url(${mod.value?.heroImage || ''})`,
}))

function goBack() {
  router.back()
}

function goHome() {
  // adjust if your dashboard route name/path differs
  router.push({ name: 'Dashboard' })
  // or: router.push('/dashboard')
}

function takeQuiz() {
  router.push({ name: 'Quiz', params: { moduleId: moduleId.value } })
}
</script>

<style scoped>
.recap-view {
  min-height: 100vh;
  background: #ffffff;
}

.topbar {
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
  font-size: 24px;
  color: rgba(0,0,0,0.8);
}

.topbar-title {
  text-align: center;
  font-weight: 900;
  font-size: 18px;
  color: rgba(0,0,0,0.75);
}

.content {
  padding: 0 0px 0px;
  display: grid;
  place-items: start center;
}

.card {
  width: min(420px, 100%);
  border-radius: 14px;
  overflow: hidden;
  background: #fff;
  border-radius: 5px;
}

.hero {
  height: 170px;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  transform: scale(1.02);
}

.card-body {
  padding: 14px 16px 16px;
}

.title {
  margin: 0 0 10px;
  font-size: 26px;
  font-weight: 900;
  color: rgba(0, 61, 92, 0.88);
}

.muted {
  margin: 0 0 12px;
  color: rgba(0,0,0,0.65);
  line-height: 1.4;
}

.bullets {
  margin: 0 0 14px;
  padding-left: 18px;
  color: rgba(0,0,0,0.72);
  line-height: 1.5;
  font-size: 16px;
}

.primary {
  width: 100%;
  height: 46px;
  border: none;
  border-radius: 12px;
  background: #4bb3f0;
  color: #ffffff;
  font-weight: 900;
  font-size: 18px;
  cursor: pointer;
}

.primary:active {
  transform: scale(0.99);
}
</style>