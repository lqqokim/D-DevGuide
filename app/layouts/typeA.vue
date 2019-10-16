<template>
  <div class="container">
    <header-gnb></header-gnb>
    <nuxt class="content"></nuxt>
    <base-footer></base-footer>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator';
import HeaderGnb from './header/GNB.vue';
import BaseFooter from './footer/BaseFooter.vue';

@Component({
  components: {
    HeaderGnb,
    BaseFooter,
  },
})
export default class Header extends Vue {}
</script>
<style>
html,
body {
  margin: 0;
  padding: 0;
  height: 100%;
}

.content {
  height: 600px;
}
</style>
