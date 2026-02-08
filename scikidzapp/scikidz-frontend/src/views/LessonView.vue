<template>
    <div class="lesson-view">

      <main class="content">
        <!-- Full-bleed banner (matches mock: edge-to-edge, no rounding) -->
        <section class="banner">
  <div class="banner-bg" :style="bannerStyle" aria-hidden="true"></div>
  <div class="banner-fade" aria-hidden="true"></div>

  <!-- Floating controls (no physical top bar) -->
  <div class="banner-controls">
    <button class="float-btn" type="button" @click="goBack" aria-label="Go back">‹</button>
    
  </div>

  <div class="banner-overlay">
    <div class="banner-title">{{ module.title }}</div>
  </div>

  <button class="banner-play" type="button" @click="startAR" aria-label="Start AR experience">
    ▶
  </button>
/>


  <!-- Gradient fade that blends into the page below -->
  <div class="banner-fade" aria-hidden="true"></div>

  <!-- Overlay content -->
  <div class="banner-overlay">
    
    <div class="banner-title">{{ module.title }}</div>
  </div>

  <!-- Play button -->
  <button class="banner-play" type="button" @click="startAR" aria-label="Start AR experience">
    ▶
  </button>
</section>

<div class="lesson-text">
  <div class="subtext">{{ module.subtitle }}</div>
  <div class="bodytext">{{ module.description }}</div>

  <!-- Lesson diagram image -->
  <img
    v-if="module.lessonImage"
    class="lesson-image"
    :src="module.lessonImage"
    :alt="`${module.title} diagram`"
  />

  <!-- Additional lesson content -->
<section
  v-for="(section, index) in module.sections"
  :key="index"
  class="lesson-section"
>
  <h3 class="section-title">{{ section.heading }}</h3>
  <p class="section-body">{{ section.text }}</p>
</section>


</div>
  
      </main>
    </div>
  </template>
  
  <script setup>
  import { computed } from 'vue'
  import { useRoute, useRouter } from 'vue-router'

  const bannerStyle = computed(() => ({
  backgroundImage: `
    linear-gradient(180deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.9) 90%),
    url(${module.value.heroImage})
  `,
}))
  
  const route = useRoute()
  const router = useRouter()
  
  const moduleId = computed(() => String(route.params.moduleId || 'water-cycle'))
  
  // Temporary local
  const MODULES = {
    'water-cycle': {
      title: 'The Water Cycle',
      category: 'Earth Science',
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
  ]

,
    },
    'atoms-and-molecules': {
      title: 'Atoms and Molecules',
      category: 'Chemistry',
      subtitle: 'Intro to matter and bonding',
      description:
        'Placeholder description for atoms and molecules. Replace with real content later.',
    },
    'basic-mechanics': {
      title: 'Basic Mechanics',
      category: 'Physics',
      subtitle: 'Forces, motion, and energy',
      description:
        'Placeholder description for mechanics. Replace with real content later.',
    },
  }
  
  const module = computed(() => MODULES[moduleId.value] || MODULES['water-cycle'])
  
  function goBack() {
    router.back()
  }

  function startAR(){
    router.push(`/modules/${moduleId.value}/ar`)
  }
  
  function goHome() {
    router.push('/dashboard')
  }
  

  function startLesson() {
    goAR()
  }
  
  function goAR() {
    router.push(`/modules/${moduleId.value}/ar`)
  }
  
  function goRecap() {
    router.push(`/modules/${moduleId.value}/recap`)
  }
  
  function goQuiz() {
    router.push(`/modules/${moduleId.value}/quiz`)
  }
  </script>
  
  <style scoped>
    .lesson-view {
    min-height: 100vh;
    background: #ffffff; /* mock looks like white content background */
    }
  
  /* Header */

  
  /* Main content */
  .banner {
  position: relative;
  width: 100%;
  height: 235px;        /* adjust as needed */
  overflow: hidden;
  border-radius: 0;
}

  .content {
  padding: 0; /* IMPORTANT: banner is full-bleed, padding happens below it */
    }
  
  .hero {
    background: transparent;
  }

  .banner {
  position: relative;
  width: 100%;
  height: 230px;             /* similar to mock */
  overflow: hidden;
  background: #cfe6ff;       /* fallback */
  border-radius: 0;          /* IMPORTANT: no rounded corners */
}

.banner-bg {
  position: absolute;
  inset: 0;
  background:
    radial-gradient(circle at 20% 15%, rgba(255,255,255,0.35), transparent 45%),
    linear-gradient(120deg, rgba(120, 190, 255, 0.70), rgba(205, 215, 220, 0.35)),
    linear-gradient(180deg, rgba(0,0,0,0.05), rgba(0,0,0,0.02));
    background-size: cover;
    background-repeat: no-repeat;
  transform: scale(1.02); /* helps avoid any 1px edge gaps */
}

.banner-bg {
  position: absolute;
  inset: 0;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  z-index: 1;
}

.banner-fade {
  position: absolute;
  left: 0;
  right: 0;
  bottom: -1px;
  height: 90px;
  background: linear-gradient(
    to bottom,
    rgba(255,255,255,0) 0%,
    rgba(255,255,255,0.65) 45%,
    rgba(255,255,255,1) 100%
  );
}

.banner-fade {
  position: absolute;
  left: 0;
  right: 0;
  bottom: -1px;
  height: 90px;
  background: linear-gradient(
    to bottom,
    rgba(255,255,255,0) 0%,
    rgba(255,255,255,0.65) 45%,
    rgba(255,255,255,1) 100%
  );
  z-index: 2;
}
.float-btn {
  width: 36px;
  height: 36px;
  border-radius: 32px;               /* Figma looks like rounded square */
  border: 1px solid rgb(0, 15, 65);
  background: rgba(255,255,255,0.68);
  backdrop-filter: blur(6px);         /* nice “floating” feel */
  cursor: pointer;
  display: grid;
  place-items: center;
  font-size: 24px;
  color: rgba(0,0,0,0.75);
}

.banner-overlay {
  position: absolute;
  left: 14px;
  bottom: 18px;
  right: 78px; /* space for play button */
  display: flex;
  flex-direction: column;
  gap: 10px;
  z-index: 3;
}
.banner-title {
  font-size: 32px;
  font-weight: 900;
  line-height: 1.02;
  color: rgba(0,0,0,0.80);
  text-shadow: 0 1px 0 rgba(255,255,255,0.35);
  margin: 0;
}

.banner-play {
  position: absolute;
  right: 14px;
  bottom: 20px;
  width: 64px;
  height: 64px;
  border-radius: 999px;
  border: none;
  background: #4bb3f0;
  color: #ffffff;
  cursor: pointer;
  display: grid;
  place-items: center;
  font-size: 18px;
  box-shadow: 0 6px 16px rgba(0,0,0,0.25);
  z-index: 5;
}

.banner-controls {
  position: absolute;
  left: 12px;
  right: 12px;
  top: 12px;
  display: flex;
  justify-content: space-between;
  z-index: 4;
}

.banner-overlay {
  position: absolute;
  left: 14px;
  bottom: 14px;
  right: 60px; /* leave room for play button */
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.banner-title {
  font-size: 42px;     /* IMPORTANT: larger text like mock */
  font-weight: 900;
  line-height: 1.02;
  color: rgba(0, 61, 92, 0.8);
  text-shadow: 0 1px 0 rgba(255,255,255,0.35); /* subtle readability */
}

/* Play button: top-right, circular */
.banner-play {
  position: absolute;
  right: 14px;
  bottom: 20px;          /* sits above the fade */
  width: 58px;
  height: 58px;
  border-radius: 999px;
  border: none;
  background: #4bb3f0;   /* solid blue like mock */
  color: #ffffff;
  cursor: pointer;
  display: grid;
  place-items: center;
  font-size: 32px;
  box-shadow: 0 6px 16px rgba(0,0,0,0.25);
}


/* ===== Text under banner ===== */
.lesson-text {
  padding: 1px 18px 0;
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
  margin-bottom: 12px;
}

/* Now apply padding to the rest of your sections */
.card,
.actions {
  margin: 0 14px 12px;
}
  
  .hero-image {
    position: relative;
    width: 100%;
    height: 180px;
    border-radius: 14px;
    background: linear-gradient(135deg, rgba(68, 165, 250, 0.35), rgba(44, 62, 80, 0.15));
    border: 1px solid rgba(0,0,0,0.08);
    overflow: hidden;
  }
  
  .hero-image-overlay {
    position: absolute;
    inset: 0;
    padding: 14px;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    gap: 8px;
  }
  
  .hero-badge {
    width: fit-content;
    padding: 4px 8px;
    border-radius: 999px;
    background: rgba(255,255,255,0.85);
    border: 1px solid rgba(0,0,0,0.08);
    font-size: 12px;
    font-weight: 700;
    color: rgba(0,0,0,0.72);
  }
  
  .hero-title {
    margin: 0;
    font-size: 32px;
    font-weight: 900;
    color: rgba(0,0,0,0.82);
  }
  
  .hero-play {
    position: absolute;
    right: 12px;
    top: 12px;
    width: 44px;
    height: 44px;
    border-radius: 999px;
    border: 1px solid rgba(0,0,0,0.12);
    background: rgba(255,255,255,0.92);
    cursor: pointer;
    display: grid;
    place-items: center;
    font-size: 18px;
  }
  
  .hero-subtext {
    margin: 10px 2px 0;
    font-size: 13px;
    font-weight: 700;
    color: rgba(0,0,0,0.6);
  }
  
  .hero-body {
    margin: 6px 2px 0;
    font-size: 14px;
    color: rgba(0,0,0,0.72);
    line-height: 1.45;
  }
  
  /* Card */
  .card {
    background: #ffffff;
    border: 1px solid rgba(0,0,0,0.08);
    border-radius: 14px;
    padding: 12px;
  }
  
  .card-title {
    font-weight: 900;
    font-size: 14px;
    color: rgba(0,0,0,0.78);
    margin-bottom: 10px;
  }
  
  .diagram {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }
  
  .diagram-label {
    font-size: 12px;
    font-weight: 700;
    color: rgba(0,0,0,0.55);
  }
  
  .diagram-box {
    height: 140px;
    border-radius: 12px;
    background: rgba(0,0,0,0.04);
    border: 1px dashed rgba(0,0,0,0.18);
  }
  
  /* Actions */
  .actions {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
  
  .actions-row {
    display: flex;
    gap: 10px;
  }
  
  .btn {
    height: 42px;
    border-radius: 12px;
    border: 1px solid rgba(0,0,0,0.12);
    background: #ffffff;
    font-weight: 800;
    cursor: pointer;
    padding: 0 12px;
    flex: 1;
  }
  
  .btn-primary {
    background: #4bb3f0;
    color: #ffffff;
    border-color: rgba(0,0,0,0.06);
  }
  
  .lesson-image {
  width: 100%;
  margin-top: 14px;          /* space from description */
  border-radius: 14px;       /* soft card look like mock */
  border: 1px solid rgba(0,0,0,0.08);
  background: #ffffff;
}

  .btn:hover,
  .icon-btn:hover,
  .hero-play:hover {
    filter: brightness(0.98);
  }
  </style>
  