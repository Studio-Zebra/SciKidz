<template>
    <div class="ar-view">
      <!-- Background placeholder (replace with real AR canvas later) -->
      <div class="ar-bg" aria-hidden="true">
        <div class="ar-center-text">
          <div class="ar-center-title">AR</div>
          <div class="ar-center-subtitle">
            Experience<br />
            /3D<br />
            Simulation<br />
            Here
          </div>
        </div>
      </div>
  
      <!-- Floating controls -->
      <button class="float-btn back" type="button" @click="goBack" aria-label="Go back">
        ‹
      </button>
  
      <button class="float-btn info" type="button" @click="openInstructions" aria-label="Open instructions">
        i
      </button>
  
      <button class="done-btn" type="button" @click="done" aria-label="Done">
        Done
      </button>
  
      <!-- Bottom sheet: Instructions Overlay -->
      <div
        v-if="isInstructionsOpen"
        class="sheet-root"
        role="dialog"
        aria-modal="true"
        aria-label="Instructions overlay"
        @keydown.esc="closeInstructions"
        tabindex="-1"
        ref="sheetRoot"
      >
        <button class="sheet-backdrop" type="button" aria-label="Close instructions" @click="closeInstructions" />
  
        <div class="sheet">
          <div class="sheet-card">
            <div class="sheet-header">
              <div class="sheet-title">Gestures</div>
              <button class="float-btn sheet-close" type="button" @click="closeInstructions" aria-label="Close">
                ˅
              </button>
            </div>
  
            <div class="sheet-body">
              <p class="sheet-text">
                Use one finger to interact with objects. Tap on an object to get more information.
                Use two fingers to pan around the environment.
              </p>
  
              <div class="gesture-row">
<div class="gesture">
    <img
  class="gesture-icon"
  src="/assets/interact.png"
  alt="Tap to interact"
/>
  <div class="gesture-label">Interact</div>
</div>

<div class="gesture">
    <img
  class="gesture-icon"
  src="/assets/panenvironment.png"
  alt="Use two fingers to pan"
/>
  <div class="gesture-label">Pan Environment</div>
</div>
              </div>
            </div>
          </div>
  
          <div class="sheet-safe-area" />
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { nextTick, ref } from 'vue'
  import { useRoute, useRouter } from 'vue-router'
  
  const router = useRouter()
  const route = useRoute()
  const moduleId = String(route.params.moduleId || 'water-cycle')
  
  const isInstructionsOpen = ref(false)
  const sheetRoot = ref(null)
  
  function goBack() {
    router.back()
  }
  
  function done() {
    // Match your flow. Common options:
    // router.push(`/modules/${moduleId}/recap`)
    // router.push(`/modules/${moduleId}/lesson`)
    router.push(`/modules/${moduleId}/recap`)
  }
  
  async function openInstructions() {
    isInstructionsOpen.value = true
    await nextTick()
    sheetRoot.value?.focus?.()
  }
  
  function closeInstructions() {
    isInstructionsOpen.value = false
  }
  </script>
  
  <style scoped>
  .ar-view {
    position: relative;
    min-height: 100vh;
    background: #6b6b6b; /* gray surround like mock */
    display: flex;
    justify-content: center;
    padding: 18px 12px;
  }
  
  /* Phone frame for desktop dev */
  .ar-bg {
    position: relative;
    width: 390px;
    max-width: 100%;
    height: calc(100vh - 36px);
    border-radius: 0;
    overflow: hidden;
    background:
      radial-gradient(circle at 20% 20%, rgba(255,255,255,0.18), transparent 55%),
      linear-gradient(120deg, rgba(40, 60, 80, 0.30), rgba(0,0,0,0.25)),
      linear-gradient(0deg, rgba(0,0,0,0.45), rgba(0,0,0,0.25));
    box-shadow: 0 20px 60px rgba(0,0,0,0.35);
  }
  
  /* Center placeholder text */
  .ar-center-text {
    position: absolute;
    inset: 0;
    display: grid;
    place-items: center;
    text-align: center;
    color: rgba(255,255,255,0.92);
  }
  
  .ar-center-title {
    font-size: 26px;
    font-weight: 900;
    margin-bottom: 6px;
  }
  
  .ar-center-subtitle {
    font-size: 30px;
    font-weight: 300;
    line-height: 1.05;
    text-shadow: 0 2px 10px rgba(0,0,0,0.35);
  }
  
  /* Floating buttons */
  .float-btn {
    position: absolute;
    width: 48px;
    height: 48px;
    border-radius: 999px;
    border: 1px solid rgba(14, 0, 106, 0.75);
    background: rgba(255,255,255,0.88);
    backdrop-filter: blur(6px);
    display: grid;
    place-items: center;
    cursor: pointer;
    font-size: 18px;
    color: rgba(14, 0, 106, 0.75);
    z-index: 5;
  }
  
  .back {
    top: 42px;
    left: 42px;
  }
  
  .info {
    bottom: 26px;
    left: 26px;
  }
  
  .done-btn {
    position: absolute;
    right: 42px;
    bottom: 42px;
    height: 38px;
    padding: 0 34px 0 34px;
    border-radius: 10px;
    border: 1px solid rgba(0,0,0,0.12);
    background: #4bb3f0;
    color: #ffffff;
    font-weight: 900;
    cursor: pointer;
    z-index: 5;
    font-size: 24px;
  }
  
  /* ===== Bottom sheet ===== */
  .sheet-root {
    position: absolute;
    inset: 0;
    z-index: 10;
    outline: none;
  }
  
  .sheet-backdrop {
    position: absolute;
    inset: 0;
    background: rgba(0,0,0,0.45);
    border: 0;
    padding: 0;
    cursor: pointer;
  }
  
  .sheet {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    justify-content: center;
    padding: 0 12px 14px;
    animation: sheetUp 180ms ease-out;
  }
  
  @keyframes sheetUp {
    from { transform: translateY(16px); opacity: 0.85; }
    to { transform: translateY(0); opacity: 1; }
  }
  
  .sheet-card {
    width: 390px;
    max-width: 100%;
    background: #eef2f6;
    border-radius: 14px 14px 0 0;
    border: 1px solid rgba(0,0,0,0.12);
    box-shadow: 0 10px 30px rgba(0,0,0,0.25);
    padding: 12px;
  }
  
  .sheet-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  
  .sheet-title {
    font-weight: 900;
    font-size: 20px;
    color: rgba(0,0,0,0.75);
  }
  
  .sheet-close {
    position: static;
    width: 54px;
    height: 54px;
    border-radius: 999px;
    font-size: 52px;
  }
  
  .sheet-body {
    margin-top: 6px;
  }
  
  .sheet-text {
    margin: 8px 0 12px;
    font-size: 20px;
    line-height: 1.4;
    color: rgba(0,0,0,0.62);
  }
  
  .gesture-row {
    display: flex;
    gap: 16px;
    justify-content: space-evenly;
    align-items: flex-end;
    padding-bottom: 4px;
  }
  
  .gesture {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 6px;
    width: 45%;
  }
  
  .gesture-icon {
  width: 120px;
  height: 120px;
  object-fit: contain;
}
  
  .gesture-label {
    font-weight: 900;
    font-size: 13px;
    color: rgba(0,0,0,0.78);
  }
  
  .sheet-safe-area {
    height: 6px;
  }
  
  /* Small screens: no gray surround/frame */
  @media (max-width: 430px) {
    .ar-view {
      padding: 0;
      background: #000;
    }
    .ar-bg {
      width: 100%;
      height: 100vh;
      border-radius: 0;
      box-shadow: none;
    }
    .back { top: 12px; left: 12px; }
    .info { bottom: 12px; left: 12px; }
    .done-btn { right: 12px; bottom: 12px; }
    .sheet { padding: 0; }
    .sheet-card { width: 100%; border-radius: 14px 14px 0 0; }
  }

  /* Transition timing */
.sheet-enter-active,
.sheet-leave-active {
  transition: opacity 180ms ease;
}

/* Backdrop fade */
.sheet-enter-from,
.sheet-leave-to {
  opacity: 0;
}
.sheet-enter-to,
.sheet-leave-from {
  opacity: 1;
}

/* Slide the sheet itself */
.sheet-enter-active .sheet,
.sheet-leave-active .sheet {
  transition: transform 180ms ease, opacity 180ms ease;
}

.sheet-enter-from .sheet,
.sheet-leave-to .sheet {
  transform: translateY(18px);
  opacity: 0.9;
}

.sheet-enter-to .sheet,
.sheet-leave-from .sheet {
  transform: translateY(0);
  opacity: 1;
}
  </style>
  