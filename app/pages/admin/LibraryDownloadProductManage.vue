<template>
  <download-product-manage></download-product-manage>
</template>
<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator';
import DownloadProductManage from '~/components/libraryDownloadProductManage/index.vue';

@Component({
  layout: 'default',
  components: {
    DownloadProductManage,
  },
})
export default class extends Vue {}
</script>

<style lang="scss"></style>
