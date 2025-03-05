<script setup>
</script>

<template>
  <div class="store-layout">
    <section class="body-store-layout">
      <slot />
<!--      <Footer />-->
    </section>
    <div class="mr-store-layout">
      <Mobar />
    </div>
    <div class="footer-store-layout">
      <Footer />
    </div>
  </div>
</template>

<style scoped>
.store-layout {
  min-height: 100dvh;
  display: grid;
  grid-template-columns: var(--mobar-size) 1fr;
  grid-template-rows: 1fr auto;
  grid-template-areas:
      "mbr body"
      "mbr footer";
}
.store-layout > * { min-width: 0; } /* hack: overflow scroll inside the grid */
.mr-store-layout {
  grid-area: mbr;
  position: sticky;
  top: 0;
  height: 100vh;
  z-index: 200;
  /*padding: 0;*/
}
.vd-store-layout { grid-area: vd; }
.body-store-layout { grid-area: body; }
.footer-store-layout { grid-area: footer; }

@media (max-width: 480px) {
  .store-layout {
    grid-template-columns: 1fr;
    grid-template-rows: var(--mobar-size) 1fr auto;
    grid-template-areas:
      "mbr"
      "body"
      "footer";
  }
  .mr-store-layout {
    height: unset;
  }
}
</style>