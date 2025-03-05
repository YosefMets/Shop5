<script setup>
import NLink from "~/components/controls/NLink.vue";
import NButton from "~/components/controls/NButton.vue";
import Delivery from "~/components/Delivery.vue";
import Payments from "~/components/Payments.vue";
import Terms from "~/components/Terms.vue";
import Privacy from "~/components/Privacy.vue";
import Refund from "~/components/Refund.vue";
import Imprint from "~/components/Imprint.vue";

const showArticle = ref(false);

const articleTitle = ref(null);
const articleBody = ref(null);

const showLaw = ( article ) => {
  articleTitle.value = article.title;
  articleBody.value = article.body;

  showArticle.value = true;
}
</script>

<template>
  <footer class="app-footer">
    <div class="af-service">
      <NLink :to="'/delivery'" class="copy-group-link">
        <span @click.prevent="showLaw({ title: $t('delivery'), body: Delivery })">{{ $t('delivery') }}</span>
      </NLink>
      <NLink :to="'/payments'" class="copy-group-link">
        <span @click.prevent="showLaw({ title: $t('payments'), body: Payments })">{{ $t('payments') }}</span>
      </NLink>
    </div>
    <div class="af-law">
      <NLink :to="'/terms'" class="copy-group-link">
        <span @click.prevent="showLaw({ title: $t('terms'), body: Terms })">{{ $t('terms') }}</span>
      </NLink>
      <NLink :to="'/privacy'" class="copy-group-link">
        <span @click.prevent="showLaw({ title: $t('privacy'), body: Privacy })">{{ $t('privacy') }}</span>
      </NLink>
      <NLink :to="'/refund'" class="copy-group-link">
        <span @click.prevent="showLaw({ title: $t('refund'), body: Refund })">{{ $t('refund') }}</span>
      </NLink>
      <NLink :to="'/imprint'" class="copy-group-link">
        <span @click.prevent="showLaw({ title: $t('imprint'), body: Imprint })">{{ $t('imprint') }}</span>
      </NLink>
    </div>
    <div class="af-copy">
      <span>&copy; {{ $t('allRights') }} The company name</span>
    </div>
  </footer>

  <Modal :show="showArticle"
         :width="'40rem'"
         :mobile-full-height="true"
         @close="showArticle = false">

    <template #header>{{ articleTitle }}</template>

    <Component v-if="typeof articleBody === 'object'" :is="articleBody"></Component>
    <template v-else>{{ articleBody }}</template>

    <template #footer>
      <NButton >Шеф, всё понял</NButton>
    </template>

  </Modal>
</template>

<style scoped>
.app-footer {
  padding: 2rem 2rem 1.4rem;
  display: flex;
  flex-direction: column;
  gap: .5rem;
}
.af-service,
.af-law,
.af-copy {
  display: flex;
  justify-content: center;
  gap: 1rem;
  color: var(--dark);
}
.app-footer .copy-group-link {
  color: #000;
}

@media (max-width: 480px) {
  .app-footer {
    padding: 1rem;
    background-color: var(--bg);
  }
}
</style>