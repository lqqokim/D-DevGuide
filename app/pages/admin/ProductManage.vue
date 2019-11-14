<template>
  <product-manage></product-manage>
</template>
<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator';
import ProductManage from '~/components/productManage/index.vue';

@Component({
  layout: 'TypeA',
  components: {
    ProductManage,
  },
})
export default class extends Vue {}
</script>

<style lang="scss"></style>
