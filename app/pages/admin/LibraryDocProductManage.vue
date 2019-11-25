<template>
  <doc-product-manage></doc-product-manage>
</template>
<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator';
import DocProductManage from '~/components/libraryDocProductManage/index.vue';

@Component({
  layout: 'TypeA',
  components: {
    DocProductManage,
  },
})
export default class extends Vue {}
</script>

<style lang="scss"></style>
