<script setup>
const props = defineProps({ item: Object });

const { db } = storeToRefs( useAppStore() );
const { t, locale } = useI18n();

const dir = computed( () => props.item?.P ? db.value?.[props.item.P] : null );
const chars = computed( () => Object.keys(dir.value?.X || {})
                                    .filter( x => dir.value?.X[x]?.M && ( db.value?.[x]?.W === 'boolean' || x in props.item ) ) //  && x in props.item
                                    .reduce( (r, x) => {
                                      r[x] = [props.item?.[x]].flat();
                                      return r }, {}
                                    ));
</script>

<template>
  <div v-if="item && Object.keys(chars).length" class="main-chars">
    <template v-for="(val, attr) in chars">
      <template v-if="val && val.length" class="char">
        <template v-for="v in val">
          <NuxtImg v-if="attr === 'CO'" :src="`/${db?.[v]?.Iso}.svg`" />
          <b v-else class="mch">

            <template v-if="typeof v === 'number'">
              <i class="mch-dig">
                {{ parseFloat(v < 1000 ? v : v/1000).toLocaleString(locale) }}
              </i>
              <i class="mch-abc">{{ attr === 'v' ? $t(item.unit) : '' }}{{ db?.[attr]?.J }}</i>
            </template>

            <i v-else class="mch-abc">
              <template v-if="db[v]">{{ db[v]?.N }}</template>
              <template v-if="attr === 'MEV'">{{ $t( v ? 'mevushal' : 'lomevushal') }}</template>
            </i>
          </b>
        </template>
      </template>
    </template>
  </div>
</template>

<style scoped>
.main-chars {
  display: flex;
  flex-wrap: wrap;
  gap: .2rem;
  align-items: end;
  font-weight: 400;
  font-size: 1.2rem;
}
.mch {
  font-weight: inherit;
}
.mch:after {
  content: '\2022';
  color: #f00;
  margin-left: .2rem;
  display: inline-block;
}
.mch:last-of-type:after { content: none; }

.mch-dig {
  font-style: normal;
  font-family: 'Stint Ultra Condensed', 'Six Caps', 'Rubik', sans-serif;
  font-size: 2rem;
  line-height: 1em;
}
.mch-abc {
  font-style: normal;
}
img {
  display: inline-block;
  align-self: center;
  width: 1.4rem;
  height: 1.4rem;
  margin-right: .5rem;
  border-radius: 50%;
  border: .1rem solid #fff;
  box-shadow: 0 0 0 .1rem var(--dark);
}
</style>