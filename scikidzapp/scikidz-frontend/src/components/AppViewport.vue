<template>
    <div class="vp-root" :class="{ 'vp-gray': graySurround }">
      <div class="vp-frame" :class="{ 'vp-full': fullBleed }">
        <slot />
      </div>
    </div>
  </template>
  
  <script setup>
  defineProps({
    graySurround: { type: Boolean, default: true },
    fullBleed: { type: Boolean, default: true },
  })
  </script>
  
  <style scoped>
  .vp-root {
    min-height: 100vh;
    background: #ffffff;
  }
  
  .vp-frame {
    width: 100%;
    min-height: 100vh;
    background: #ffffff;
    overflow: hidden;
    position: relative;
  }
  
  /* Desktop/tablet: center a “phone canvas” that can scale */
  @media (min-width: 431px) {
    .vp-root.vp-gray {
      background: #6b6b6b;
      display: flex;
      justify-content: center;
      padding: 18px 12px;
    }
  
    .vp-frame {
      width: min(420px, 96vw);
      min-height: calc(100vh - 36px);
      box-shadow: 0 20px 60px rgba(0, 0, 0, 0.35);
    }
  }
  
  .vp-full {
    border-radius: 0 !important;
  }
  </style>
  