<template>
  <Main />
</template>
<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator';
import Main from '~/components/main/index.vue';

@Component({
  components: {
    Main,
  },
  async fetch({ store }): Promise<any> {
    await store.dispatch('product/getProductList');
  },
})
export default class extends Vue {}
</script>
<style lang="scss"></style>
