<template>
  <product-list></product-list>
</template>
<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator';
import ProductList from '~/components/product/ProductList.vue';

import { GET_PROJECT_LIST } from '~/utils/storeTypes';

@Component({
  layout: 'TypeA',
  components: {
    ProductList,
  },
})
export default class extends Vue {
  async fetch({ store }) {
    try {
      await store.dispatch(`projects/${GET_PROJECT_LIST}`);
    } catch (e) {
      console.log(e);
    }
  }
}
</script>

<style scoped></style>
