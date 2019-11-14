<template>
  <product-notice-manage></product-notice-manage>
</template>
<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator';
import ProductNoticeManage from '~/components/productNoticeManage/index.vue';

@Component({
  layout: 'TypeA',
  components: {
    ProductNoticeManage,
  },
})
export default class extends Vue {}
</script>

<style lang="scss"></style>
