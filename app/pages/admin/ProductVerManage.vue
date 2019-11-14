<template>
  <product-ver-manage></product-ver-manage>
</template>
<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator';
import ProductVerManage from '~/components/productVerManage/index.vue';

@Component({
  layout: 'TypeA',
  components: {
    ProductVerManage,
  },
})
export default class extends Vue {}
</script>

<style lang="scss"></style>
