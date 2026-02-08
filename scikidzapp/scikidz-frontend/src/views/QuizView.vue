<!-- src/views/QuizView.vue -->
<script setup>
import { reactive, computed } from 'vue'
import { useRouter } from 'vue-router'
import AppViewport from '../components/AppViewport.vue'

const router = useRouter()

// Module key used for progress tracking (matches your Water Cycle flow)
const MODULE_KEY = 'water-cycle'

// 5-question quiz
const questions = [
  {
    id: 1,
    prompt: 'How many main stages does the water cycle commonly include?',
    options: ['2', '3', '4', '5'],
    correctIndex: 2, // 4
  },
  {
    id: 2,
    prompt: 'Which of the following is a real part of the water cycle?',
    options: ['Evaporation', 'Transportation', 'Geo-location', 'Motivation'],
    correctIndex: 0,
  },
  {
    id: 3,
    prompt: 'What is condensation?',
    options: [
      'Water vapor cooling into liquid droplets (clouds)',
      'Liquid water warming into vapor',
      'Water soaking into the ground',
      'Water freezing into ice instantly',
    ],
    correctIndex: 0,
  },
  {
    id: 4,
    prompt: 'What is precipitation?',
    options: [
      'Water gathering in oceans and lakes',
      'Water falling from clouds as rain, snow, sleet, or hail',
      'Water vapor rising from plants only',
      'Wind moving clouds across the sky',
    ],
    correctIndex: 1,
  },
  {
    id: 5,
    prompt: 'Which process is driven by the Sun’s energy?',
    options: ['Collection', 'Evaporation', 'Precipitation', 'Condensation'],
    correctIndex: 1,
  },
]

// answers[qIndex] = selected option index (number) or null
const state = reactive({
  answers: Array(questions.length).fill(null),
  error: '',
})

const answeredCount = computed(() => state.answers.filter(v => v !== null).length)

function calculateScorePercent() {
  let correct = 0
  for (let i = 0; i < questions.length; i++) {
    if (state.answers[i] === questions[i].correctIndex) correct++
  }
  // percent as integer (0..100)
  return Math.round((correct / questions.length) * 100)
}

function saveModuleProgress(percent) {
  // Store all module progress in a single object in localStorage
  // { "water-cycle": 80, "some-other-module": 40 }
  const key = 'scikidzModuleProgress'
  let progress = {}
  try {
    progress = JSON.parse(localStorage.getItem(key) || '{}')
  } catch {
    progress = {}
  }

  // Save best attempt (never decrease progress unless you want it to)
  const prev = typeof progress[MODULE_KEY] === 'number' ? progress[MODULE_KEY] : 0
  progress[MODULE_KEY] = Math.max(prev, percent)

  localStorage.setItem(key, JSON.stringify(progress))
}

function submitQuiz() {
  state.error = ''

  if (answeredCount.value !== questions.length) {
    state.error = 'Please answer all questions before submitting.'
    return
  }

  // compute score and correct count
  let correctCount = 0
  for (let i = 0; i < questions.length; i++) {
    if (state.answers[i] === questions[i].correctIndex) correctCount++
  }
  const percent = Math.round((correctCount / questions.length) * 100)

  // store module completion (percent)
  saveModuleProgress(percent)

  // navigate to results
  router.push({
    name: 'ModuleResults',
    params: { moduleId: MODULE_KEY },
    query: { score: percent, correct: correctCount, total: questions.length },
  })
}

</script>

<template>
  <AppViewport>
    <div class="page">
      <header class="topbar">
        <button class="icon-btn" type="button" @click="$router.back()">← Back</button>
        <h1 class="title">Quiz</h1>
        <div class="right-spacer" />
      </header>

      <main class="content">
        <p class="progress">
          Answered {{ answeredCount }} / {{ questions.length }}
        </p>

        <p v-if="state.error" class="error" role="alert">{{ state.error }}</p>

        <section
          v-for="(q, qIndex) in questions"
          :key="q.id"
          class="q-card"
          :class="{ 'q-card--incomplete': state.answers[qIndex] === null && state.error }"
        >
          <div class="q-pill">Question {{ qIndex + 1 }}</div>
          <h2 class="q-prompt">{{ q.prompt }}</h2>

          <div class="options" role="radiogroup" :aria-label="`Question ${qIndex + 1}`">
            <label v-for="(opt, optIndex) in q.options" :key="optIndex" class="option">
              <input
                type="radio"
                :name="`q-${q.id}`"
                :value="optIndex"
                :checked="state.answers[qIndex] === optIndex"
                @change="state.answers[qIndex] = optIndex"
              />
              <span class="opt-text">{{ opt }}</span>
            </label>
          </div>
        </section>
      </main>

      <footer class="submit-wrap">
  <button class="submit-pill" type="button" @click="submitQuiz">
    Submit Quiz <span class="chev">›</span>
  </button>
</footer>
    </div>
  </AppViewport>
</template>

<style scoped>
.page {
  min-height: 100%;
  display: grid;
  grid-template-rows: auto 1fr auto;
}

/* Top bar */
.topbar {
  display: grid;
  grid-template-columns: auto 1fr auto;
  align-items: center;
  padding: 12px 12px 6px;
}

.title {
  margin: 0;
  text-align: center;
  font-size: 20px;
  font-weight: 800;
}

.right-spacer {
  width: 64px; /* balances the back button width for centered title */
}

.icon-btn {
  border: 0;
  border-radius: 999px;
  padding: 10px 12px;
  background: rgba(255,255,255,0.10);
  color: white;
}

/* Content */
.content {
  padding: 8px 14px 16px;
  display: grid;
  gap: 12px;
}

.progress {
  margin: 0;
  opacity: 0.8;
  font-size: 13px;
}

.error {
  margin: 0;
  padding: 10px 12px;
  border-radius: 14px;
  background: rgba(255, 80, 80, 0.16);
  border: 1px solid rgba(255, 80, 80, 0.22);
}

/* Question card */
.q-card {
  background: rgba(255,255,255,0.95);
  color: #111;
  border-radius: 14px;
  padding: 12px 12px 10px;
  box-shadow: 0 10px 22px rgba(0,0,0,0.16);
}

.q-card--incomplete {
  outline: 2px solid rgba(255, 80, 80, 0.55);
  outline-offset: 2px;
}

.q-pill {
  display: inline-block;
  padding: 4px 10px;
  border-radius: 999px;
  background: #e9e9ee;
  color: #555;
  font-weight: 800;
  font-size: 13px;
  margin-bottom: 6px;
}

.q-prompt {
  margin: 0 0 10px;
  font-size: 14px;
  line-height: 1.25;
  font-weight: 800;
}

.options {
  display: grid;
  gap: 8px;
}

.option {
  display: grid;
  grid-template-columns: 18px 1fr;
  align-items: center;
  gap: 10px;
  font-size: 14px;
}

.option input {
  width: 14px;
  height: 14px;
}

.opt-text {
  line-height: 1.2;
}

.submit-wrap {
  padding: 14px 0 18px;
  display: flex;
  justify-content: center;
}

/* Pill button */
.submit-pill {
  border: 0;
  border-radius: 999px;
  padding: 12px 20px;
  font-size: 14px;
  font-weight: 800;
  background: #5bbadf; /* matches mock blue */
  color: white;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.18);
}

/* Chevron */
.chev {
  font-size: 18px;
  line-height: 1;
  transform: translateY(-1px);
}
</style>
