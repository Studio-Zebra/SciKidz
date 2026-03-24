<template>
  <AppViewport>
    <div class="page">
      <header class="topbar">
        <button class="icon-btn" type="button" @click="$router.back()">←</button>
        <div class="brand-wrap">
          <img class="brand-logo" src="/assets/scikidz-logo.png" alt="SciKidz" />
        </div>
        <div class="right-spacer" />
      </header>

      <main class="content">
        <h1 class="page-title">Module Progress</h1>

        <section class="module-list">
          <article
            v-for="module in modules"
            :key="module.id"
            class="module-card"
          >
            <img :src="module.imageUrl" :alt="module.title" class="module-thumb" />

            <div class="module-info">
              <h2 class="module-title">{{ module.title }}</h2>
              <p class="module-percent">{{ module.progress }}% Completion</p>

              <div class="progress-bar">
                <div
                  class="progress-fill"
                  :style="{
                    width: `${module.progress}%`,
                    background: module.barColor
                  }"
                ></div>
              </div>
            </div>
          </article>
        </section>

        <section class="overall-card">
          <h2 class="overall-title">Overall Progress</h2>
          <div class="overall-percent">{{ overallProgress }}%</div>

          <div class="overall-bar">
            <div
              class="overall-fill"
              :style="{ width: `${overallProgress}%` }"
            ></div>
          </div>

          <p class="overall-note">
            This is represented as the average across all downloaded modules.
          </p>
        </section>
      </main>
    </div>
  </AppViewport>
</template>

<script setup>
import { computed } from 'vue'
import AppViewport from '../components/AppViewport.vue'

const moduleCatalog = [
  {
    id: 'water-cycle',
    title: 'The Water Cycle',
    imageUrl: '/assets/lesson-watercycle.png',
    barColor: 'linear-gradient(90deg, #ef5b5b 0%, #f2d64b 45%, #36c93f 100%)'
  },
  {
    id: 'atoms-molecules',
    title: 'Atoms & Molecules',
    imageUrl: '/assets/lesson-atoms.png',
    barColor: 'linear-gradient(90deg, #ef5b5b 0%, #f2a23b 45%, #ffffff 100%)'
  },
  {
    id: 'basic-mechanics',
    title: 'Basic Mechanics',
    imageUrl: '/assets/lesson-mechanics.png',
    barColor: 'linear-gradient(90deg, #ef5b5b 0%, #f2d64b 45%, #36c93f 100%)'
  }
]

function getSavedProgress() {
  try {
    return JSON.parse(localStorage.getItem('scikidzModuleProgress') || '{}')
  } catch {
    return {}
  }
}

const modules = computed(() => {
  const savedProgress = getSavedProgress()

  return moduleCatalog.map(module => ({
    ...module,
    progress: typeof savedProgress[module.id] === 'number'
      ? savedProgress[module.id]
      : 0
  }))
})

const overallProgress = computed(() => {
  if (modules.value.length === 0) return 0

  const total = modules.value.reduce((sum, module) => sum + module.progress, 0)
  return Math.round(total / modules.value.length)
})
</script>

<style scoped>
.page {
  min-height: 100%;
  background: #ffffff;
}

.topbar {
  display: grid;
  grid-template-columns: 48px 1fr 48px;
  align-items: center;
  padding: 10px 12px 0;
  background: #ffffff;
}

.icon-btn {
  width: 40px;
  height: 40px;
  border: none;
  border-radius: 999px;
  background: transparent;
  color: #174a84;
  font-size: 24px;
  cursor: pointer;
}

.brand-wrap {
  display: flex;
  justify-content: center;
}

.brand-logo {
  height: 54px;
  width: auto;
}

.right-spacer {
  width: 40px;
  height: 40px;
}

.content {
  padding: 6px 16px 12px;
  padding-bottom: 0;
  background: #ffffff;
}

.page-title {
  text-align: center;
  color: #174a84;
  font-size: 1.9rem;
  font-weight: 800;
  margin: 0 0 1rem;
}

.module-list {
  display: grid;
  gap: 14px;
  margin-bottom: 20px;
}

.module-card {
  display: grid;
  grid-template-columns: 72px 1fr;
  gap: 12px;
  background: #ffffff;
  border-radius: 18px;
  padding: 10px;
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.12);
  align-items: center;
}

.module-thumb {
  width: 72px;
  height: 56px;
  object-fit: cover;
  border-radius: 12px;
}

.module-info {
  min-width: 0;
}

.module-title {
  margin: 0;
  color: #3d6ea7;
  font-size: 1.05rem;
  font-weight: 800;
  line-height: 1.1;
}

.module-percent {
  margin: 2px 0 8px;
  color: #4e88c5;
  font-size: 0.92rem;
  font-weight: 700;
}

.progress-bar,
.overall-bar {
  width: 100%;
  height: 10px;
  border: 2px solid #2f5f97;
  border-radius: 999px;
  background: #f6f7f8;
  overflow: hidden;
}

.progress-fill,
.overall-fill {
  height: 100%;
  border-radius: 999px;
}

.overall-card {
  background: #ffffff;
  border-radius: 20px;
  padding: 20px 18px;
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.12);
  text-align: center;
}

.overall-title {
  margin: 0 0 8px;
  color: #4b7ab2;
  font-size: 1.9rem;
  font-weight: 800;
}

.overall-percent {
  color: #4b7ab2;
  font-size: 3rem;
  font-weight: 900;
  line-height: 1;
  margin-bottom: 14px;
}

.overall-fill {
  background: #4e93df;
}

.overall-note {
  margin: 12px 0 0;
  color: #8a8f96;
  font-size: 0.9rem;
  line-height: 1.35;
}
</style>