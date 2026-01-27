<template>
    <div class="lesson-view">
      
      <header class="topbar">
        <button class="icon-btn" type="button" @click="goBack" aria-label="Go back">
          ‹
        </button>
  
        <div class="topbar-title">
          {{ module.title }}
        </div>
  
        
        <button class="icon-btn" type="button" @click="goHome" aria-label="Return to dashboard">
          ⌂
        </button>
      </header>
  
      
      <main class="content">
        <!-- Full-bleed banner (matches mock: edge-to-edge, no rounding) -->
<section class="banner">
    <div
  class="banner-bg"
  :style="bannerStyle"
  aria-hidden="true"
/>


  <!-- Gradient fade that blends into the page below -->
  <div class="banner-fade" aria-hidden="true"></div>

  <!-- Overlay content -->
  <div class="banner-overlay">
    <div class="banner-pill">{{ module.category }}</div>
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
      subtitle: 'Example sub-text for this module',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. This is placeholder text for the module lesson view. Replace with real lesson content pulled from your backend later.',
        heroImage: '/assets/lesson-watercycle.png',
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
  .topbar {
    height: 54px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 10px;
    background: #ffffff;
    border-bottom: 1px solid rgba(0,0,0,0.08);
  }
  
  .topbar-title {
    font-weight: 800;
    font-size: 16px;
    color: #2b2f33;
    text-align: center;
    max-width: 70%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  
  .icon-btn {
    width: 36px;
    height: 36px;
    border-radius: 10px;
    border: 1px solid rgba(0,0,0,0.12);
    background: #fff;
    cursor: pointer;
    display: grid;
    place-items: center;
    font-size: 18px;
  }
  
  /* Main content */
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

.banner-overlay {
  position: absolute;
  left: 14px;
  bottom: 14px;
  right: 60px; /* leave room for play button */
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.banner-pill {
  width: fit-content;
  padding: 6px 10px;
  border-radius: 999px;
  background: rgba(255,255,255,0.85);
  border: 1px solid rgba(0,0,0,0.08);
  font-size: 12px;
  font-weight: 800;
  color: rgba(0,0,0,0.65);
}

.banner-title {
  font-size: 28px;     /* IMPORTANT: larger text like mock */
  font-weight: 900;
  line-height: 1.02;
  color: rgba(0,0,0,0.80);
  text-shadow: 0 1px 0 rgba(255,255,255,0.35); /* subtle readability */
}

/* Play button: top-right, circular */
.banner-play {
  position: absolute;
  right: 14px;
  bottom: 20px;          /* sits above the fade */
  width: 48px;
  height: 48px;
  border-radius: 999px;
  border: none;
  background: #4bb3f0;   /* solid blue like mock */
  color: #ffffff;
  cursor: pointer;
  display: grid;
  place-items: center;
  font-size: 18px;
  box-shadow: 0 6px 16px rgba(0,0,0,0.25);
}


/* ===== Text under banner ===== */
.lesson-text {
  padding: 10px 14px 0;
}

.subtext {
  font-size: 12px;
  font-weight: 800;
  color: rgba(0,0,0,0.55);
  margin-bottom: 8px;
}

.bodytext {
  font-size: 13px;
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
    font-size: 22px;
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
  
  .btn:hover,
  .icon-btn:hover,
  .hero-play:hover {
    filter: brightness(0.98);
  }
  </style>
  