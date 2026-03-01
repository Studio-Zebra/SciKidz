<!-- src/views/QuizResultsView.vue -->
<script setup>
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import AppViewport from '../components/AppViewport.vue'

const route = useRoute()
const router = useRouter()

const moduleId = computed(() => String(route.params.moduleId || 'water-cycle'))

// Expect these query params from QuizView navigation
const score = computed(() => {
  const n = Number(route.query.score)
  return Number.isFinite(n) ? Math.max(0, Math.min(100, Math.round(n))) : 0
})

const correct = computed(() => {
  const n = Number(route.query.correct)
  return Number.isFinite(n) ? Math.max(0, Math.round(n)) : 0
})

const total = computed(() => {
  const n = Number(route.query.total)
  return Number.isFinite(n) ? Math.max(1, Math.round(n)) : 5
})

const isPerfect = computed(() => score.value === 100 && correct.value === total.value)

const headline = computed(() => `${score.value}%`)

const subline = computed(() => `${correct.value}/${total.value}`)

const detailLine = computed(() => {
  if (isPerfect.value) return 'Questions Answered\nCorrectly'
  return 'Questions Answered\nCorrectly'
})

const message = computed(() => {
  if (isPerfect.value) {
    return 'Congratulations, you have completed this module!'
  }
  // More helpful message based on score
  if (score.value >= 80) {
    return 'Nice work! Restart the quiz to try for a perfect score and earn the medal.'
  }
  if (score.value >= 50) {
    return 'Good effort! Restart the quiz to improve your score.'
  }
  return 'Keep going! Restart the quiz and try again.'
})

function goHome() {
  router.push({ name: 'Dashboard' })
}

function restartQuiz() {
  router.push({ name: 'Quiz', params: { moduleId: moduleId.value } })
}
</script>

<template>
  <AppViewport>
    <div class="page">
      <header class="topbar">
        <h1 class="title">Quiz Results</h1>

        <button class="home-btn" type="button" @click="goHome" aria-label="Return Home">
          <!-- Simple home icon -->
          <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
            <path
              fill="currentColor"
              d="M12 3.2 3 10.6v10.2h6.2v-6.1h5.6v6.1H21V10.6L12 3.2zm7 15.6h-2.2v-6.1H7.2v6.1H5V11.5l7-5.7 7 5.7v7.3z"
            />
          </svg>
        </button>
      </header>

      <main class="content">
        <div class="score-block">
          <div class="percent">{{ headline }}</div>
          <div class="fraction">{{ subline }}</div>
          <div class="caption">
            {{ detailLine }}
          </div>
        </div>

        <div class="divider" aria-hidden="true"></div>

        <p class="message">{{ message }}</p>

        <!-- Medal only for perfect score -->
        <div v-if="isPerfect" class="medal-wrap" aria-label="Medal earned">
          <!-- Medal icon SVG -->
          <svg viewBox="0 0 128 128" class="medal" aria-hidden="true">
            <path fill="#0b2f57" d="M40 10h18l6 14 6-14h18l-16 42H56L40 10z"/>
            <path fill="#0b2f57" d="M88 10h-18l-6 14-6-14H40l18 42h12l18-42z" opacity="0.15"/>
            <circle fill="#0b2f57" cx="64" cy="84" r="28"/>
            <circle fill="#ffffff" cx="64" cy="84" r="18"/>
            <circle fill="#0b2f57" cx="64" cy="84" r="12"/>
          </svg>
        </div>

        <!-- If not perfect, show a gentle CTA to retry -->
        <button v-if="!isPerfect" class="retry-link" type="button" @click="restartQuiz">
          Restart Quiz
        </button>
      </main>

      <footer class="bottombar">
        <button class="primary-btn" type="button" @click="goHome">Return Home</button>
      </footer>
    </div>
  </AppViewport>
</template>

<style scoped>
.page {
  min-height: 100%;
  display: grid;
  grid-template-rows: auto 1fr auto;
  background: rgba(255,255,255,0.98);
  color: #0b2f57;
}

/* Top bar */
.topbar {
  position: relative;
  padding: 16px 16px 10px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.title {
  margin: 0;
  font-size: 18px;
  font-weight: 900;
  letter-spacing: 0.2px;
}

.home-btn {
  position: absolute;
  right: 14px;
  top: 12px;
  width: 44px;
  height: 44px;
  border-radius: 999px;
  border: 2px solid rgba(11,47,87,0.35);
  background: white;
  color: #0b2f57;
  display: grid;
  place-items: center;
  box-shadow: 0 10px 18px rgba(0,0,0,0.10);
}

/* Content */
.content {
  padding: 6px 18px 0;
  display: grid;
  justify-items: center;
  align-content: start;
  gap: 14px;
}

.score-block {
  text-align: center;
  margin-top: 8px;
}

.percent {
  font-size: 44px;
  font-weight: 1000;
  line-height: 1;
}

.fraction {
  font-size: 20px;
  font-weight: 900;
  margin-top: 6px;
}

.caption {
  margin-top: 6px;
  font-weight: 900;
  color: rgba(11,47,87,0.75);
  white-space: pre-line; /* keep the newline */
}

.divider {
  width: 78%;
  height: 2px;
  background: rgba(11,47,87,0.18);
  border-radius: 999px;
  margin-top: 2px;
}

.message {
  margin: 0;
  text-align: center;
  color: rgba(11,47,87,0.55);
  max-width: 320px;
  line-height: 1.35;
}

.medal-wrap {
  margin-top: 4px;
}

.medal {
  width: 104px;
  height: 104px;
  display: block;
}

.retry-link {
  margin-top: 4px;
  border: 0;
  background: transparent;
  color: #0b2f57;
  font-weight: 900;
  text-decoration: underline;
  padding: 10px 12px;
}

/* Bottom button */
.bottombar {
  padding: 14px 18px 18px;
  display: flex;
  justify-content: center;
}

.primary-btn {
  width: 100%;
  max-width: 360px;
  border: 0;
  border-radius: 10px;
  padding: 14px 16px;
  font-weight: 900;
  background: #2fb6e6; /* mock-ish cyan */
  color: white;
  box-shadow: 0 10px 18px rgba(0,0,0,0.14);
}
</style>
