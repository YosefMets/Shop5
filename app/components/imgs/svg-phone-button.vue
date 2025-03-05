<template>
  <div>
    <svg-phone />
  </div>
</template>

<script>
import SvgPhone from "./svg-phone";
export default {
  name: "svg-phone-button",
  components: {SvgPhone}
}
</script>

<style scoped>
  div {
    display: inline-flex;
    border-radius: 50%;
    background-color: #080;
    width: 2.5rem;
    height: 2.5rem;
    justify-content: center;
    align-items: center;
  }
  div > svg {
    width: 50%;
    height: 50%;
  }

  @media (max-width: 480px) {
    div {
      width: 3.5rem;
      height: 3.5rem;
    }
  }
</style>
