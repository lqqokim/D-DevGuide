<template>
  <product-branch-manage></product-branch-manage>
</template>
<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator';
import ProductBranchManage from '~/components/productBranchManage/index.vue';

@Component({
  layout: 'TypeA',
  components: {
    ProductBranchManage,
  },
})
export default class extends Vue {}
</script>

<style lang="scss"></style>
