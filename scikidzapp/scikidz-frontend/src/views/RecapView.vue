<template>
    <AppViewport :graySurround="true">
      <div class="recap-view">
        <div class="top-controls">
          <button class="float-btn" type="button" @click="goBack" aria-label="Go back">‹</button>
          <div class="top-title">{{ module.title }}</div>
          <button class="float-btn" type="button" @click="goHome" aria-label="Return to dashboard">⌂</button>
        </div>
  
        <main class="content">
          <h1 class="recap-title">Recap</h1>
          <h2 class="recap-subtitle">{{ recap.subtitle }}</h2>
          <p class="recap-text">{{ recap.body }}</p>
        </main>
  
        <div class="bottom-bar">
          <button class="quiz-btn" type="button" @click="takeQuiz" aria-label="Take quiz">
            Take Quiz <span aria-hidden="true">›</span>
          </button>
        </div>
      </div>
    </AppViewport>
  </template>
  
  <script setup>
  import { computed } from 'vue'
  import { useRoute, useRouter } from 'vue-router'
  import AppViewport from '../components/AppViewport.vue'
  
  const router = useRouter()
  const route = useRoute()
  const moduleId = computed(() => String(route.params.moduleId || 'water-cycle'))
  
  const MODULES = { 'water-cycle': { title: 'The Water Cycle' } }
  const module = computed(() => MODULES[moduleId.value] || MODULES['water-cycle'])
  
  const recap = computed(() => ({
    subtitle: 'Example Sub-Text for recap',
    body:
      'The water cycle describes how water moves through Earth’s air, land, and oceans. Sunlight causes evaporation, turning liquid water into water vapor. As the vapor rises and cools, it condenses into tiny droplets to form clouds. When droplets combine and become heavy, precipitation falls as rain, snow, sleet, or hail. Water then collects in rivers, lakes, oceans, and underground, where the cycle repeats.',
  }))
  
  function goBack() { router.back() }
  function goHome() { router.push('/dashboard') }
  function takeQuiz() { router.push(`/modules/${moduleId.value}/quiz`) }
  </script>
  
  <style scoped>
  .recap-view {
    min-height: 100vh;
    background: #ffffff;
  }
  
  /* Top controls */
  .top-controls {
    height: 52px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px 12px;
  }
  
  .top-title {
    font-weight: 900;
    color: #1f4f6b;
    font-size: 16px;
    text-align: center;
    max-width: 70%;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  
  .float-btn {
    width: 38px;
    height: 38px;
    border-radius: 999px;
    border: 1px solid rgba(0,0,0,0.12);
    background: rgba(255,255,255,0.92);
    display: grid;
    place-items: center;
    cursor: pointer;
    font-size: 18px;
    color: rgba(0,0,0,0.72);
    box-shadow: 0 6px 16px rgba(0,0,0,0.18);
  }
  
  /* Content */
  .content {
    padding: 12px 18px 96px;
  }
  
  .recap-title {
    margin: 4px 0 6px;
    font-size: 34px;
    font-weight: 900;
    color: #1f4f6b;
    line-height: 1;
  }
  
  .recap-subtitle {
    margin: 0 0 10px;
    font-size: 16px;
    font-weight: 900;
    color: #2f6f9b;
  }
  
  .recap-text {
    margin: 0;
    font-size: 13.5px;
    line-height: 1.45;
    color: rgba(0,0,0,0.72);
    max-width: 320px;
  }
  
  /* Bottom action pinned inside the frame */
  .bottom-bar {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    padding: 12px 14px 16px;
    display: flex;
    justify-content: flex-end;
  }
  
  .quiz-btn {
    height: 38px;
    padding: 0 14px;
    border-radius: 8px;
    border: 1px solid rgba(0,0,0,0.12);
    background: #4bb3f0;
    color: #ffffff;
    font-weight: 900;
    cursor: pointer;
    box-shadow: 0 6px 16px rgba(0,0,0,0.18);
  }
  
  .quiz-btn span { margin-left: 8px; }
  </style>
  