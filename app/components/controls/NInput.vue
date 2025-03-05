<script setup>
import SvgV from "~/components/imgs/svg-v.vue";

const prop = defineProps({
  modelValue: String,
  placeholder: String,
  readonly: Boolean,
  disabled: Boolean,
  select: Boolean,
  options: Array,
  hints: Array,
  icon: [Object, String, Boolean],
});
const emit = defineEmits(['update:modelValue']);

const virtualValue = ref(prop.modelValue);
const showedValue = ref(virtualValue.value);
const arrowing = ref(false);
const i = ref(-1);
const clearing = ref(null);
const open = ref(false);
const expandOptions = ref(false);

const options_ = computed( () => prop.options?.map( opt => opt.text ? opt : { text: opt } ) );
const ress = computed( () =>
    options_.value?.filter( ({ text }) =>
        text.toLowerCase().indexOf(virtualValue.value.replace(/^ *| *$/g,'').toLowerCase()) === 0 )
);
const selectMode = computed( () => prop.select && prop.options);
const results = computed( () => selectMode.value ? options_.value : ress.value );
const icon_ = computed( () => {
  const qqq = results.value?.find( ({ text }) => text.toLowerCase() === showedValue.value.toLocaleLowerCase() );
  return qqq?.ic || prop.icon;
});
const isOptionsOpen = computed( () => prop.options?.length && expandOptions.value );

watch( () => prop.modelValue, (n, o) => {
  if (selectMode.value) {
    showedValue.value = n;
    virtualValue.value = '';
  } else {
    virtualValue.value = showedValue.value = n;
  }
  if (selectMode.value && results.value)
    i.value = results.value.findIndex( ({ text }) => text.toLowerCase().indexOf( n.toLowerCase() ) === 0 );
  else
    i.value = -1;
});

const input = (e) => {
  if (selectMode.value) {
    showedValue.value = ress.value?.[0]?.text;
    i.value = results.value.findIndex( ({ text }) => text.toLowerCase().indexOf( showedValue.value.toLocaleLowerCase() ) === 0 );
    if (clearing.value) clearTimeout(clearing.value);
    clearing.value = setTimeout( () => virtualValue.value = '', 3000 );
  } else {
    virtualValue.value = e.target.value;
    //showedValue.value = ress.value?.[0]?.text || virtualValue.value;
    showedValue.value = virtualValue.value;
    i.value = -1;
  }
  expandOptions.value = true;
}

const go = async (val, e) => {
  await emit('update:modelValue', val);
  if (selectMode.value) {
    showedValue.value = val;
    virtualValue.value = '';
  } else {
    virtualValue.value = showedValue.value = val;
  }
  expandOptions.value = false;
  arrowing.value = false;
  e.target.blur();
}

const arrow = (q) => {
  i.value = q;
  showedValue.value = q === -1 ? virtualValue.value : ress.value?.[q]?.text;
  arrowing.value = !(q === -1);
}

const x = () => { expandOptions.value = false; }
</script>

<template>

  <div :class="['nin', { 'nin-sm': selectMode || arrowing }, { 'nin-dd': open }]" v-clickout="x">
    <label class="nin-lbl">
      <i v-if="icon" class="nin-ic">{{ icon_ }}</i>
      <div class="nin-in-wr">

        <b class="nin-sv">{{ showedValue }}</b>

        <input v-model="virtualValue"
               placeholder=" "
               :class="['nin-in', { 'nin-in-fill': selectMode && showedValue }]"
               v-bind:type="$attrs.type"
               v-bind:name="$attrs.name"
               v-bind:autocomplete="$attrs.autocomplete"
               v-bind:required="$attrs.required"
               v-bind:id="$attrs.inputId"
               v-bind:min="$attrs.min"
               v-bind:max="$attrs.max"
               @input="input"
               @change="go(showedValue, $event)"
               @focus="expandOptions = true"
               @keydown.down.prevent="arrow( i < results?.length-1 ? i+1 : select ? 0 : -1 )"
               @keydown.up.prevent="arrow( (i <= (select ? 0 : -1)) ? results?.length-1 : i-1 )"
               @keyup.esc="go(showedValue, $event)"
               @keydown.enter="go(showedValue, $event)" />

        <i class="nin-plh"><i>{{ placeholder }}</i></i>
      </div>
    </label>

    <i v-if="options?.length" class="nin-v" @click="expandOptions = !expandOptions"><svg-v class="nin-v-ic" /></i>

    <div v-if="isOptionsOpen" class="nin-ress-wr">
      <ul class="nin-ress">
        <li v-for="(res, q) in results"
            :class="['nin-res', { 'nin-res-sel': i === q }]"
            @click.stop.prevent="go(res.text, $event)">
          {{ res.ic || '' }} {{ res.text }}
        </li>
      </ul>
    </div>

    <div v-if="isOptionsOpen" class="dd-fog" @click="x" />

  </div>

</template>

<style scoped>
.nin {
  position: relative;
  display: grid;
  grid-template-columns: 1fr auto;
  height: var(--cntl-h);
  background-color: #fff;
  /*box-shadow: inset 0 0 0 .05rem var(--contr);*/
  border-radius: var(--br);
  cursor: text;
  /*padding-right: .5em;*/
  font-size: 1rem;
}
.nin.sch-dd {
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
}
.nin-lbl {
  /*display: grid;*/
  display: flex;
  grid-template-columns: auto 1fr;
  padding-left: .5em;
}
.nin-ic {
  font-style: normal;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: text;
  /*padding: 0 5px 0 10px;*/
  width: 40px;
  background-color: #ffffff66;
}
.nin-in-wr {
  position: relative;
  width: 100%;
}
.nin-sv,
.nin-in {
  font-size: 1.1rem;
  font-weight: 400;
  padding: .8em 0 0;
}
.nin-sv {
  display: none;
  align-items: center;
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 1;
}
.nin-in {
  position: relative;
  width: 100%;
  height: 100%;
  border: none;
  background-color: transparent;
  margin: 0;
  /*padding: 0;*/
  z-index: 10;
}

.nin-sm .nin-sv { display: flex; }
.nin-sm .nin-in { opacity: 0; cursor: pointer; }

.nin-plh {
  font-style: normal;
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  color: #000000cc;
  z-index: 20;
  transition: opacity .1s;
  cursor: text;
  width: 1px;
}
.nin-plh > i {
  font-style: normal;
  display: block;
  transform-origin: 0 50%;
  font-size: 1rem;
  transition: transform linear .1s;
  white-space: nowrap;
}
.nin-in:focus + .nin-plh > i,
.nin-in:not(:placeholder-shown) + .nin-plh > i,
.nin-in.nin-in-fill + .nin-plh > i {
  transform: scale(.8) translateY(-1em);
}
.nin-in:focus + .nin-plh > i:after,
.nin-in:not(:placeholder-shown) + .nin-plh > i:after,
.nin-in.nin-in-fill + .nin-plh > i:after {
  content: ':';
}
.nin-v {
  font-style: normal;
  display: flex;
  align-items: center;
  cursor: pointer;
  padding: 0 .5em;
}
.nin-v-ic {
  width: 1rem;
  height: .6rem;
}
.nin-ress-wr {
  position: absolute;
  left: 0;
  right: 0;
  top: 100%;
  z-index: 1000;

  background-color: #fff;
  box-shadow: 0 1em 1em -1em #00000066;
  margin: -.1rem 0 0;
  padding: 0;
  width: 100%;
  /*transform-origin: top;*/
  max-height: 10em;
  overflow-y: hidden;
  border-radius: 0 0 var(--br) var(--br);
  border-top-color: var(--bg);
  border-top-style: solid;
  border-top-width: .1rem;
}
.nin-ress {
  list-style: none;
  margin: 0;
  padding: 0;
  max-height: 10em;
  overflow-y: auto;
}
.nin-res {
  padding: .5em;
  cursor: pointer;
}
.nin-res:hover { background-color: var(--active-light); }
.nin-res.nin-res-sel {
  background-color: #000;
  color: #fff;
}
</style>