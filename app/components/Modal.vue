<script setup>
import SvgX from "~/components/imgs/svg-x.vue";
import {useAppStore} from "~/stores/appStore";

const props = defineProps({
  show: Boolean,
  x: { type: Boolean, default: true },
  closeout: { type: Boolean, default: true },
  width: String,
  height: String,
  mobileFullHeight: Boolean,
  side: String,
});

const slots = useSlots();
const header = ref(!!slots.header);
const title = ref(!!slots.title);
const footer = ref(!!slots.footer);

const heightComp = computed( () => props.height );
const mobileFullHeightComp = computed( () => props.mobileFullHeight ? '100dvh' : 'unset' );

const sideClass = computed( () => props.side ? `modal-side-${props.side}` : null );
const selfWidth = ref( props.width || '30%' );

const emit = defineEmits(['close']);

useHead({
  bodyAttrs: {
    class: computed( () => props.show ? 'modal-mode' : undefined ),
  },
});
</script>

<template>
  <Teleport to="body">
    <Transition name="modal">

      <div :class="['fog', sideClass]" v-if="show">

        <div class="modal-container-wr" :style="`
          --modal-width: ${ width || '100%' };
          --modal-height: ${ mobileFullHeight ? '100dvh' : 'unset' }
        `">

          <div class="modal-container scroll">

            <div>
              <h2 v-if="header" :class="['mdl-ttl', { 'mdl-ttl-x': x }]"><slot name="header" /></h2>
              <slot/>
            </div>

            <div v-if="footer" class="mdx-footer"><slot name="footer" /></div>

          </div>

          <div v-if="x" class="mdl-x-wr">
            <svg-x class="mdl-x" @click="emit('close')" />
          </div>
        </div>

        <div v-if="closeout" class="fog-x" @click="emit('close')" />

      </div>

    </Transition>
  </Teleport>
</template>

<style>
.fog {
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr;
  justify-items: end;
  align-items: center;
  overflow-y: auto;
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  height: 100dvh;
  z-index: 1000;
}
.fog.modal-side-left { justify-items: start; }

.fog:after {
  content: '';
  background-color: var(--fog);
  /*backdrop-filter: blur(.2rem);*/
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
}
.modal-container-wr {
  position: relative;
  width: var(--modal-width);
  height: 100%;
  z-index: 10;
  max-height: 100vh;
  box-shadow: 0 .2rem 1rem -.7rem #000000;
}
.modal-container {
  width: 100%;
  height: 100%;
  /*background-color: var(--bg);*/
  background-color: #fff;
  padding: 3rem;
  overflow: auto;
  display: grid;
  grid-template-rows: 1fr;
  grid-auto-rows: auto;
  grid-auto-flow: row;
}
/*
.mc-w-s { width: 30rem; }
.mc-w-m { width: 45rem; }
.mc-w-l { width: 60rem; }
.mc-w-full { width: 100%; }
*/
.mc-h-full { height: 100%; }

.mdl-ttl {
  font-size: 1.6rem;
  font-weight: 500;
  margin: 0 0 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  grid-gap: 1rem;
  position: relative;
}
.mdl-ttl.empty { height: 0; overflow: hidden; margin: 0; }
.mdl-ttl-min {
  font-size: 1.2rem;
  font-weight: 500;
  margin: 0 0 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  grid-gap: 1rem;
  position: relative;
}

.mdl-ttl-x {
  /*margin-right: 2rem;*/
}
.mdl-x-wr {
  position: absolute;
  right: 1.5rem;
  top: 1.5rem;
  cursor: pointer;
  z-index: 100;
  display: block;
  width: 1rem;
  height: 1rem;
}
.ic-x.mdl-x {
  width: 100%;
  height: 100%;
}
.fog-x {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  cursor: default;
  z-index: 5;
}

.mdx-footer {
  position: sticky;
  bottom: 0;
  z-index: 50;
  padding-top: 2rem;
  background-color: #fff;
}
.mdx-footer:after {
  content: '';
  position: absolute;
  left: 0;
  right: 0;
  top: 100%;
  height: 3rem;
  background-color: #fff;
}


.modal-enter-active {
  transition: opacity 0s, background-color .2s;
  overflow: hidden;
}
.modal-leave-active {
  transition: opacity 0s .2s, background-color .2s;
  overflow: hidden;
}
.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.modal-enter-active:after,
.modal-leave-active:after {
  transition: opacity .2s;
}
.modal-enter-from:after,
.modal-leave-to:after {
  opacity: 0;
}

.modal-enter-active .modal-container-wr,
.modal-leave-active .modal-container-wr {
  transition: transform .2s, opacity .2s;
}
.modal-enter-from .modal-container-wr,
.modal-leave-to .modal-container-wr {
  transform: translateX(100%);
}
.modal-enter-from.modal-side-left .modal-container-wr,
.modal-leave-to.modal-side-left .modal-container-wr {
  transform: translateX(-100%);
}

@media (max-width: 480px) {
  .fog {
    width: unset;
    right: 0;
    top: unset;
  }
  .modal-container-wr {
    width: 100%;
    height: var(--modal-height);
    max-height: 100dvh;
    /*border-radius: 0;*/
    /*border-radius: var(--br) var(--br) 0 0;*/
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
  }
  .modal-container {
    padding: 1.5rem;
  }
  .mdx-footer {
    padding: 1.5rem 0;
    /*margin-bottom: -1.5rem;*/
  }
  .mdx-footer:after { height: 1.5rem; }

  .mc-w-s,
  .mc-w-m,
  .mc-w-l,
  .mc-w-full { width: 100%; }

  .mc-h-full { border-radius: 0; }

  .mdl-ttl-x {
    margin-right: 3rem;
  }
  .mdl-x-wr {
    /*position: fixed;*/
    /*right: 1.5rem;*/
    /*top: 0;*/
    /*translate: 0 -50%;*/
    /*cursor: pointer;*/
    /*z-index: 1;*/
    width: 3rem;
    height: 3rem;
    background-color: var(--bg);
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .ic-x.mdl-x {
    width: 40%;
    height: 40%;
  }

  .modal-enter-active {
    transition: opacity 0s, background-color .4s;
    overflow: hidden;
  }
  .modal-leave-active {
    transition: opacity 0s .4s, background-color .4s;
    overflow: hidden;
  }
  .modal-enter-from,
  .modal-leave-to {
    opacity: 0;
  }

  .modal-enter-active:after,
  .modal-leave-active:after {
    transition: opacity .4s;
  }
  .modal-enter-from:after,
  .modal-leave-to:after {
    opacity: 0;
  }

  .modal-enter-active .modal-container-wr,
  .modal-leave-active .modal-container-wr {
    transition: transform .4s;
  }
  .modal-enter-from .modal-container-wr,
  .modal-leave-to .modal-container-wr {
    transform: translateY(100%);
  }
  .modal-enter-from.modal-side-left .modal-container-wr,
  .modal-leave-to.modal-side-left .modal-container-wr {
    transform: translateY(100%);
  }
}
</style>