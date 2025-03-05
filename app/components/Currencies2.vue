<script setup>
// import {storeToRefs} from "pinia";
import {useAppStore} from "~/stores/appStore";
import {useUserStore} from "~/stores/userStore";

const { currencies, userCurrency } = storeToRefs( useAppStore() );
const { user } = storeToRefs( useUserStore() );

const set = (iso) => {
  userCurrency.value = iso
  user.value.currency = iso
}
</script>

<template>
  <ul class="crncs">
    <li v-for="currency in currencies" class="crnc-wr">
      <div @click="set(currency.ISO)"
           :class="['crnc', { 'crnc-curr': user.currency === currency.ISO }]">

        {{ currencies?.[currency.ISO]?.S }} {{ $t(`currencies.${currency.ISO}`) }}

      </div>
    </li>
  </ul>
</template>

<style scoped>
.crncs {
  list-style: none;
  margin: 0;
  padding: 0;
  display: inline-flex;
  border: .1rem solid var(--contr);
  border-radius: var(--border-radius);
  height: var(--search-height);
  overflow: hidden;
}
.crnc-wr {
  margin: 0;
  display: flex;
  border-right: .1rem solid var(--contr);
}
.crnc-wr:last-of-type { border-right: none; }

.crnc {
  color: #000;
  text-decoration: none;
  padding: .2rem 1rem;
  display: flex;
  align-items: center;
  cursor: pointer;
}
.crnc:hover {
  color: var(--active);
}
.crnc-curr {
  color: var(--active);
  background-color: #fff;
  border-color: var(--contr);
  cursor: default;
}

@media (max-width: 480px) {
  .crnc {
    /*font-size: 1.2rem;*/
    /*line-height: 1.4em;*/
  }
}
</style>