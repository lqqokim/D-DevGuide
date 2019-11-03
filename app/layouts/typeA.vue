<template>
  <div class="base-wrap">
    <header-comp></header-comp>
    <nuxt></nuxt>
    <footer-comp></footer-comp>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator';
import HeaderComp from '@/components/common/header/index.vue';
import FooterComp from '@/components/common/footer/index.vue';

@Component({
  components: {
    HeaderComp,
    FooterComp,
  },
})
export default class CommonLayout extends Vue {}
</script>
<style lang="scss"></style>
