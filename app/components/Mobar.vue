<script setup>
import NLink from "~/components/controls/NLink.vue";
import Logo from "~/components/imgs/logo.vue";

const { activeGroup } = storeToRefs( useAppStore() );

const testAuth = async () => {
  const auth = await $fetch('/api/auth', {
    method: 'post',
    body: {
      email: 'qwe@qwe.com',
      pass: '61724732164721',
      firstName: 'Arye'
    }
  });
  console.log( auth );
}
</script>

<template>
  <header class="mb">
    <div class="mb-logo">
      <NLink :to="null" class="mb-logo-link"><Logo /></NLink>
    </div>
    <div class="mb-cart">
      <CartButton />
    </div>
    <div class="mb-user">
      <div class="user-component" @click="testAuth">Hi Yosef! Grossemorengasse 45/2, 1020, Vienna, Austria </div>
    </div>
    <div class="mb-search">
<!--      <Search />-->
    </div>
    <Catalog class="mb-cat" />
    <div class="mb-settings">
      <Settings />
    </div>
  </header>
</template>

<style scoped>

.mb {
  height: 100%;
  display: grid;
  grid-template-columns: 1fr auto;
  grid-template-rows: var(--mobar-el-size) var(--mobar-el-size) var(--mobar-el-size) 1fr auto;
  grid-template-areas:
      "logo cart"
      "user user"
      "srch srch"
      "cat  cat"
      "sett sett";
  /*background-color: #fff;*/
  background-color: var(--bg);
  color: #000;
  padding: 1rem;
  grid-gap: .5rem;
  /*box-shadow: 0 0 0 .05rem var(--active-bg);*/
}
.mb-logo {
  grid-area: logo;
  text-decoration: none;
  display: flex;
  align-items: center;
  padding: 0;
}
.mb-settings {
  grid-area: sett;
  /*margin: 0 -.3rem;*/
  /*display: grid;*/
  /*grid-template-columns: 1fr auto auto;*/
  /*grid-template-rows: auto;*/
  /*grid-gap: .3rem;*/
}
.mb-user {
  grid-area: user;

  display: flex;
  align-items: center;
  border-radius: var(--br);
  cursor: pointer;
  transition: all .2s;
}
.mb-user:hover { background-color: var(--hover-bg-dark); padding: 0 .3rem; }
.user-component {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-weight: 300;
}

.mb-search {
  grid-area: srch;
  padding: 1rem .5rem;
}
.mb-cat {
  grid-area: cat;
  margin: 0 -1rem;
}
.mb-cart {
  grid-area: cart;
  /*display: none;*/
  /*position: absolute;*/
  /*left: 100%;*/
  /*top: 0;*/
  width: var(--mobar-el-size);
  aspect-ratio: 1 / 1;
  /*translate: -.5rem 0;*/
  border-radius: 0 var(--br) var(--br) 0;
  /*background-color: #fff;*/
}

.mb-logo-link {
  display: flex;
}


@media (max-width: 1000px) {

}

@media (max-width: 480px) {
  .mb {
    right: 0;
    bottom: unset;
    width: unset;
    height: unset;
    grid-template-columns: var(--mobar-el-size) var(--mobar-el-size) 1fr var(--mobar-el-size) var(--mobar-el-size);
    grid-template-rows: 1fr;
    grid-template-areas:
      "cat logo user sett cart";
    border-width: 0 0 var(--line) 0;
    padding: 0;
    grid-gap: 0;
    box-shadow: 0 .1rem 0 var(--hover-bg);
  }
  .mb-logo {
    height: unset;
    justify-content: center;
    align-items: center;
    padding: 0;
    /*margin: 0 -2rem;*/
    translate: -1rem 0;
  }
  .mb-search {
    display: none;
  }
  .mb-cart {
    /*grid-area: cart;*/
    position: relative;
    display: flex;
  }
  .mb-cat {
    margin: 0;
  }
  .mb-progress { display: none; }
  .user-component { display: none }
}
</style>