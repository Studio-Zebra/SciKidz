<template>
  <AppViewport :graySurround="false">
    <div class="lesson-view">
      <main class="content">
        <section class="banner">
          <div class="banner-bg" :style="bannerStyle" aria-hidden="true"></div>
          <div class="banner-fade" aria-hidden="true"></div>

          <div class="banner-controls">
            <button class="float-btn" type="button" @click="goBack" aria-label="Go back">‹</button>
          </div>

          <div class="banner-overlay">
            <div class="banner-title">{{ module.title }}</div>
          </div>

          <button class="banner-play" type="button" @click="startAR" aria-label="Start AR experience">
            ▶
          </button>
        </section>

        <div class="lesson-text">
          <div class="subtext">{{ module.subtitle }}</div>
          <div class="bodytext">{{ module.description }}</div>

          <img
            v-if="module.lessonImage"
            class="lesson-image"
            :src="module.lessonImage"
            :alt="`${module.title} diagram`"
          />

          <section v-for="(section, index) in module.sections" :key="index" class="lesson-section">
            <h3 class="section-title">{{ section.heading }}</h3>
            <p class="section-body">{{ section.text }}</p>
          </section>
        </div>
      </main>
    </div>
  </AppViewport>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import AppViewport from '../components/AppViewport.vue'

const route = useRoute()
const router = useRouter()

const moduleId = computed(() => String(route.params.moduleId || 'water-cycle'))

const MODULES = {
  'water-cycle': {
    title: 'The Water Cycle',
    subtitle: 'How water moves through Earth’s air, land, and oceans',
    description:
      'The water cycle is the continuous journey water takes as it moves through the Earth and the atmosphere. Water is always changing location and sometimes changing form, but the total amount of water on Earth stays about the same.',
    heroImage: '/assets/lesson-watercycle.png',
    lessonImage: '/assets/water-cycle-diagram.png',
    sections: [
      {
        heading: 'Evaporation',
        text:
          'Evaporation happens when the Sun heats water in oceans, lakes, and rivers, turning it into water vapor that rises into the air.',
      },
      {
        heading: 'Condensation',
        text:
          'As water vapor rises and cools, it changes back into tiny water droplets, forming clouds in the sky.',
      },
      {
        heading: 'Precipitation',
        text:
          'When clouds become heavy, water falls back to Earth as rain, snow, sleet, or hail.',
      },
      {
        heading: 'Collection',
        text:
          'Water gathers in oceans, rivers, lakes, and underground, where the cycle begins again.',
      },
    ],
  },
}

const module = computed(() => MODULES[moduleId.value] || MODULES['water-cycle'])

const bannerStyle = computed(() => ({
  backgroundImage: `url(${module.value.heroImage})`,
}))

function goBack() {
  router.back()
}

function startAR() {
  router.push(`/modules/${moduleId.value}/ar`)
}
</script>

<style scoped>
.lesson-view {
  min-height: 100vh;
  background: #ffffff;
}

.content {
  padding: 0;
}

.banner {
  position: relative;
  width: 100%;
  height: 235px;
  overflow: hidden;
  border-radius: 0;
  background: #cfe6ff;
}

.banner-bg {
  position: absolute;
  inset: 0;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  transform: scale(1.02);
  z-index: 1;
}

.banner-fade {
  position: absolute;
  left: 0;
  right: 0;
  bottom: -1px;
  height: 95px;
  background: linear-gradient(
    to bottom,
    rgba(255,255,255,0) 0%,
    rgba(255,255,255,0.65) 45%,
    rgba(255,255,255,1) 100%
  );
  z-index: 2;
  pointer-events: none;
}

.banner-controls {
  position: absolute;
  left: 12px;
  top: 12px;
  z-index: 4;
}

.float-btn {
  width: 36px;
  height: 36px;
  border-radius: 32px;
  border: 1px solid rgb(0, 15, 65);
  background: rgba(255,255,255,0.68);
  backdrop-filter: blur(6px);
  cursor: pointer;
  display: grid;
  place-items: center;
  font-size: 24px;
  color: rgba(0,0,0,0.75);
}

.banner-overlay {
  position: absolute;
  left: 14px;
  bottom: 14px;
  right: 86px;
  z-index: 3;
}

.banner-title {
  margin: 0;
  font-size: 42px;
  font-weight: 900;
  line-height: 1.02;
  color: rgba(0, 61, 92, 0.88);
  text-shadow: 0 1px 0 rgba(255,255,255,0.35);
}

.banner-play {
  position: absolute;
  right: 14px;
  bottom: 20px;
  width: 58px;
  height: 58px;
  border-radius: 999px;
  border: none;
  background: #4bb3f0;
  color: #ffffff;
  cursor: pointer;
  display: grid;
  place-items: center;
  font-size: 32px;
  box-shadow: 0 6px 16px rgba(0,0,0,0.25);
  z-index: 5;
}

.lesson-text {
  padding: 4px 18px 18px;
}

.subtext {
  font-size: 28px;
  font-weight: 800;
  color: rgba(0,0,0,0.55);
  margin: 0 0 6px;
}

.bodytext {
  font-size: 20px;
  line-height: 1.45;
  color: rgba(0,0,0,0.70);
  margin: 0 0 12px;
}

.lesson-image {
  width: 100%;
  margin-top: 14px;
  border-radius: 14px;
  border: 1px solid rgba(0,0,0,0.08);
  background: #ffffff;
}

.lesson-section {
  margin-top: 16px;
}

.section-title {
  margin: 0 0 6px;
  font-size: 18px;
  font-weight: 900;
  color: rgba(0, 61, 92, 0.88);
}

.section-body {
  margin: 0;
  font-size: 16px;
  line-height: 1.45;
  color: rgba(0,0,0,0.72);
}
</style>
