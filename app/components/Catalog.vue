<script setup>
import SvgHamburger from "~/components/imgs/svg-hamburger.vue";
import SvgV from "~/components/imgs/svg-v.vue";

const isOpen = ref(false);
const appStore = useAppStore();
const { db, activeGroup: group } = storeToRefs( appStore );
// const { items } = storeToRefs( useCartStore() );

const activeDir = ref(null);

watch( () => group, () => {
  activeDir.value = group.value
}, { immediate: true, deep: true });

</script>

<template>
  <div>
    <div :class="['cat-btn', { arrLeft: isOpen }]" @click="isOpen = !isOpen">
      <Component :is="isOpen ? SvgV : SvgHamburger" class="cat-ic" />
    </div>

    <div :class="['cat', { 'cat-open': isOpen }]">
      <CatalogList class="cat-lvl"
                   :activeDir="activeDir"
                   @x="isOpen = false"
                   @activate="(actDir) => activeDir = actDir"
                   @deactivate="(actDir) => activeDir = actDir" />
      <div class="cat-fog" @click="isOpen = false" />
    </div>
  </div>
</template>

<style scoped>
.cat-btn { display: none; }
.arrLeft { transform: rotate(-90deg) }
.cat-ic {
  width: 1.6rem;
  height: 1.6rem;
  stroke-width: .15rem;
  stroke: #000;
}
.arrLeft > .cat-ic { transform: rotate(180deg) }

.cat {
  position: relative;
  height: 100%;
}
.cat > .cat-lvl {
  transform: translateX(0);
}

.cat-fog { display: none; }


.catalog-enter-active,
.catalog-leave-active {
  transition: all .2s;
}
.catalog-enter-from,
.catalog-leave-to {
  /*opacity: 0;*/
}
.catalog-enter-active .cat-lvl,
.catalog-leave-active .cat-lvl {
  transition: transform .2s;
}
.catalog-enter-from .cat-lvl,
.catalog-leave-to .cat-lvl {
  transform: translateX(-100%);
}
.catalog-enter-active .cat-fog,
.catalog-leave-active .cat-fog {
  transition: opacity .2s;
}
.catalog-enter-from .cat-fog,
.catalog-leave-to .cat-fog {
  opacity: 0;
}

@media (max-width: 480px) {
  .cat-btn {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 4rem;
    height: 100%;
    stroke: #000;
    cursor: pointer;
    transition: transform .1s;
  }
  .cat-btn:hover { stroke: var(--active) }

  .cat {
    position: fixed;
    left: 0;
    top: var(--mobar-el-size);
    width: 100%;
    height: calc( 100% - var(--mobar-el-size));
    padding: 0;
    display: block;
    z-index: 900;
    transform: translateX(-100%);
    transition: transform 0s .2s;
  }
  .cat.cat-open {
    transition: transform 0s;
    transform: translateX(0);
  }

  .cat > .cat-lvl {
    transform: translateX(-100%);
    transition: transform .2s;
    width: 80%;
  }
  .cat-open .cat-lvl {
    transform: translateX(0);
  }
  .cat-fog {
    display: block;
    position: absolute;
    right: 0;
    top: 0;
    left: 0;
    bottom: 0;
    background-color: #00000099;
    opacity: 0;
    transform: translateX(-100%);
    transition: opacity .2s, transform .2s .2s;
  }
  .cat-open .cat-fog {
    transition: opacity .2s;
    opacity: 1;
    transform: translateX(0);
  }
}
</style>
