<template>
  <library-download-register></library-download-register>
</template>
<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator';
import libraryDownloadRegister from '@/components/libraryDownloadRegister/index.vue';

@Component({
  layout: 'default',
  components: {
    libraryDownloadRegister,
  },
  async fetch({ store, params }) {
    try {
      if (!store.state.download.producs) {
        // 제품 목록 조회(ssr)
        await store.dispatch('download/downloadProducts');
      }

      // if (!store.state.download.selectedProduct) {
      //   await store.commit('download/selectedProduct', params.productName);
      // }

      await store.commit('download/initState', 'selectedFile');
    } catch (e) {
      console.error(e);
    }
  },
})
export default class extends Vue {}
</script>

<style lang="scss"></style>
