<script setup>
import SvgArr from "~/components/imgs/svg-arr.vue";
import NLink from "~/components/controls/NLink.vue";

const { db, activeGroup: group, dirs } = storeToRefs( useAppStore() );

const props = defineProps({
  dir: Object,
  activeDir: Object,
  depth: {
    type: Number,
    default: 0
  }
})

const emit = defineEmits(['x', 'activate', 'deactivate', 'back'])

const dirs_ = computed(() => props.dir ? props.dir.children?.map( id => db.value?.[id] ) : dirs.value.filter( dir => !dir.P ))

</script>

<template>
  <ul :class="['cat-list', 'scroll', 'cat-'+depth ]">

<!--    <li v-if="dir" class="cat-back" @click.stop="$emit('back')">-->
<!--      <svg-arr class="cat-back-ic" />-->
<!--      {{ dir.P && db?.[dir.P] ? db?.[dir.P].N : $t('mainMenu') }}-->
<!--    </li>-->

    <li v-if="dir" class="cat-subtitle">
      <i class="cat-back-" @click.stop="$emit('back')">
        <svg-arr class="cat-back-ic-" />
      </i>
      {{ dir?.N }}
    </li>

    <li v-if="dir" class="cat-item">
      <NLink :to="dir"
             :min="null"
             :max="null"
             :class="['cat-link', { 'cat-link-curr': dir === group }]"
             @click="emit('x')">
        <i class="cat-ic">{{ dir.IC }}</i>
        {{ $t('shopAll')}}
      </NLink>
    </li>

    <CatalogItem v-for="dr in dirs_"
                 :dir="dr"
                 :activeDir="activeDir"
                 :depth="depth"
                 @x="$emit('x')"
                 @activate="(actDir) => emit('activate', actDir)"
                 @deactivate="(actDir) => emit('deactivate', actDir)" />

    <template v-if="!depth">
      <li v-for="hash in db.hashtags" class="cat-item">
        <NLink :to="hash" :class="['cat-link', { 'cat-link-curr': hash === group }]" @click="emit('x')"># {{ hash?.N }}</NLink>
      </li>
    </template>
  </ul>
</template>

<style scoped>
.cat-list {
  list-style: none;
  margin: 0;
  padding: .5rem 1rem .5rem 0;
  width: 100%;
  overflow-y: auto;
  overflow-x: hidden;
  /*background-color: #fff;*/
  background-color: var(--bg);
  /*background-color: var(--dark);*/
  z-index: 910;

  position: absolute;
  left: 0;
  top: 0;
  /*transform: translateX(100%);*/
  /*transition: transform .2s;*/
  height: 100%;
}
.cat-item.in-chain > .cat-list {
  opacity: 1;
  z-index: 2;
  transform: translateX(0);
  transition: transform .2s;
}

.cat-sub { display: none }

.cat-sub {
  display: block;
  margin: -1rem 0 1rem;
  padding: .5rem;
  line-height: 1.2em;
  font-size: 1.1rem;
  /*font-weight: 400;*/
  /* text-transform: uppercase; */
  /*box-shadow: 0 .2rem 1rem -.7rem #000000;*/
}
.cat-back {
  display: flex;
  align-items: center;
  grid-gap: .5rem;
  padding: .5rem 0 .5rem 1rem;
  margin: -.5rem 0 0;
  font-size: .9rem;
  font-weight: 300;
  cursor: pointer;
  border-radius: var(--br);
  transition: all .2s;
  /*opacity: .7;*/
  color: var(--dark);
}
.cat-back:hover {
  color: #000;
  background-color: var(--bg);
}
.cat-back-ic {
  transform: rotate(180deg);
  transition: transform .2s;
}
.cat-back:hover > .cat-back-ic {
  transform: rotate(180deg) translateX(.2rem);
}

.cat-subtitle {
  position: relative;
  padding: .3rem 0 1rem 1rem;
  margin: 0 0 .5rem;
  font-size: 1.8rem;
  line-height: 1.2em;
  /*border-bottom: .1rem solid var(--active-bg);*/
  /*background-color: #fff;*/
  background-color: var(--bg);
  display: grid;
  grid-template-columns: 1.6rem 1fr;
  align-items: center;
  column-gap: .5rem;
}
.cat-subtitle:after {
  content: '';
  display: block;
  position: absolute;
  left: 1rem;
  right: 1rem;
  bottom: 0;
  height: .1rem;
  border-bottom: .1rem solid var(--active-bg);
}

.cat-back- {
  display: flex;
  justify-content: center;
  align-items: center;
  aspect-ratio: 1 / 1;
  border-radius: 50%;
  /*background-color: #000;*/
  cursor: pointer;
  margin: -.3rem;
  transition: translate .2s, background-color .2s;
}
.cat-back-ic- {
  /*stroke: #fff;*/
  stroke-width: .15rem;
  rotate: 180deg;
}
.cat-back-:hover {
  translate: -.2rem;
  background-color: var(--bg);
}

.cat-item {
  padding: 0;
}
.cat-link {
  display: grid;
  grid-template-columns: auto 1fr;
  grid-gap: .5rem;
  padding: .4em 0 .4em 1rem;
  text-decoration: none;
  color: #111;
  /*border-radius: var(--br);*/
  align-items: center;
  line-height: 1.2em;
  font-size: 1.1rem;
  cursor: pointer;
  transition: all .2s;
}
.cat-item:hover > .cat-link {
  /*padding-left: 1.1rem;*/
  /*padding-right: .3rem;*/
  background-color: var(--bg);
}
.cat-ic {
  font-style: normal;
  width: 1.6rem;
  text-align: center;
  /*aspect-ratio: 1 / 1;*/
}
.cat-link.router-link-exact-active,
.cat-link.router-link-exact-active:hover {
  background-color: var(--active-bg);
}


@media (max-width: 480px) {
  .cat-list { padding: .5rem 0; }
  .cat-link {
    font-size: 1.3rem;
    padding: 1rem;
  }
  .cat-back {
    font-size: 1rem;
  }
  .cat-subtitle {
    grid-template-columns: 2.2rem 1fr;
    font-size: 2rem;
  }
  .cat-back-ic- {
    width: 1.6rem;
    height: 1.6rem;
  }
  .cat-ic {
    width: 2.2rem;
  }
  /*
  .cat-list:not(.cat-0) {
    opacity: 1;
    border-left: none;
    left: 0;
  }
  */

  /*
  .cat-item.in-chain > .cat-list {
    transform: translateX(0);
    transition: transform .2s;
  }
  */

  /*
  .cat-sub {
    display: block;
    margin: -1rem 0 1rem;
    padding: .5rem;
    line-height: 1.2em;
    font-size: 1.1rem;
    font-weight: 400;
     text-transform: uppercase;
    border-bottom: 0.1rem solid var(--contr);
    box-shadow: 0 .2rem 1rem -.7rem #000000;
  }
  .cat-back {
    display: flex;
    align-items: center;
    grid-gap: .5rem;
    padding: 0.5rem;
    font-size: .9rem;
    text-transform: uppercase;
    background-color: var(--bg2);
    border-radius: var(--border-radius);
  }
  .cat-back-ic {
    width: 1rem;
    height: 1rem;
    stroke-width: 0.1rem;
    transform: rotate(180deg);
  }
  .cat-subtitle {
    padding: 1rem .5rem .5rem;
    font-size: 1.4rem;
  }
  */
}
</style>