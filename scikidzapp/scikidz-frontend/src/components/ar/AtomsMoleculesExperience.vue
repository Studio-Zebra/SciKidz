<template>
  <div class="experience">
    <iframe
      class="experience-frame"
      src="/ar/atoms-molecules-explorer.html"
      title="Atoms and Molecules 3D Experience"
      loading="eager"
      allowfullscreen
    />
  </div>
</template>

<style scoped>
.experience {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.experience-frame {
  display: block;
  width: 100%;
  height: 100%;
  border: 0;
  background: transparent;
}
</style>