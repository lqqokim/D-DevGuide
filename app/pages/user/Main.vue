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
  async fetch({ store, params }): Promise<any> {
    await store.dispatch('product/getProductList').then(() => {
      console.log(store.state.product.productList);
    });
  },
})
export default class extends Vue {}
</script>
<style lang="scss"></style>
