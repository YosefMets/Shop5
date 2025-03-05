<script setup>
import SvgV from "~/components/imgs/svg-v.vue";
import SvgX from "~/components/imgs/svg-x.vue";

const props = defineProps({
  placeholder: String,
  multiple: Boolean,
  x: Boolean,
  selected: Boolean,
});
const emit = defineEmits(['clear'])
const showOptions = ref(false);
</script>

<template>
  <div class="dd">
    <div :class="['dd-box', { sel: selected, open: showOptions }]" @click="showOptions = !showOptions">
      <div class="dd-lbl" v-html="placeholder" />
      <SvgX v-if="x" @click.stop="emit('clear')" class="dd-ic" />
      <SvgV v-else class="dd-ic" />
    </div>

    <div v-if="showOptions" class="options-wr">
      <div class="options" @click="multiple ? () => {} : showOptions = false">
        <slot />
      </div>
    </div>

    <div v-if="showOptions" class="dd-fog" @click="showOptions = false" />

  </div>
</template>

<style scoped>
.dd {
  position: relative;
  height: var(--cntl-h);
}
.dd-box {
  display: flex;
  justify-content: space-between;
  align-items: center;
  grid-gap: .5rem;
  background-color: var(--bg2);
  border-radius: var(--br);
  padding: 0 1rem;
  height: 100%;
  cursor: pointer;
  position: relative;
}
.dd-box.sel {
  background-color: #000;
  color: #fff;
}
.dd-box.open {
  border-radius: var(--br) var(--br) 0 0;
  z-index: 2100;
  /*background-color: #000;*/
  /*color: #fff;*/
}

.dd-lbl {
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  cursor: pointer;
}
.dd-ic {
  font-style: normal;
  cursor: pointer;
  position: relative;
  width: 1rem;
}
.dd-box.sel .dd-ic {
  stroke: #fff;
}

.options-wr {
  background-color: #000;
  position: absolute;
  z-index: 2000;
  min-width: 100%;
  border-radius: 0 0 var(--br) var(--br);
  overflow: hidden;
}
.dd-fog {
  display: block;
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  /*background-color: #00000066;*/
  z-index: 1000;
}
.options {
  width: 100%;
}
.option {}

.options > :slotted( * ) {
  width: 100%;
  color: #fff;
  display: grid;
  grid-template-columns: 1.5rem 1fr;
  padding: .5em 1em;
  cursor: pointer;
}
.options > :slotted( *:hover ) {
  background-color: #ffffff33;
}
.options > :slotted( .curr ) {
  color: #69f;
  fill: #69f;
}
.options > :slotted( *:before ) {
  content: '';
}
.options > :slotted( .curr:before ) {
  /*content: '\26AB';*/
  content: '';
  width: .7em;
  /*height: .7em;*/
  /*border-radius: 50%;*/
  /*background-color: #58f;*/
  align-self: center;


  width: 1rem;
  aspect-ratio: 2 / 1.1;
  box-shadow: -.2rem .2rem 0 0 #58f;
  rotate: -45deg;
  translate: 0 -80%;
}
</style>