<script setup>
import {useAppStore} from "~/stores/appStore";
import {useUserStore} from "~/stores/userStore";
import NMiniButton from "~/components/controls/NMiniButton.vue";

const route = useRoute();
const { currencies, userCurrency } = storeToRefs( useAppStore() );
const { user } = storeToRefs( useUserStore() );

const set = (iso) => {
  userCurrency.value = iso
  user.value.currency = iso
}
</script>

<template>

<!--  <Modal :show="route.query?.['choose-currency'] !== undefined"-->
<!--         :width="'var(&#45;&#45;mobar-size)'"-->
<!--         :side="'left'"-->
<!--         @close="navigateTo({ query: {...route.query, ['choose-currency']: undefined} })">-->

<!--    <h2 class="lcl-ttl">{{ $t('currency') }}:</h2>-->

    <div class="crncs">
      <NMiniButton v-for="currency in currencies"
                   class="crnc-btn"
                   :current="user.currency === currency.ISO"
                   @click="set(currency.ISO)">
        <template #icon>{{ currencies?.[currency.ISO]?.S }}</template>
        {{ $t(`currencies.${currency.ISO}`) }}
      </NMiniButton>
    </div>

<!--  </Modal>-->
</template>

<style scoped>
.crncs {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  /*align-items: flex-start;*/
  grid-gap: .5rem;
  /*border: .1rem solid var(--contr);*/
  /*border-radius: var(--border-radius);*/
  /*height: var(--search-height);*/
  /*overflow: hidden;*/
}
.crnc-btn {
  width: max-content;
  display: inline-flex;
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