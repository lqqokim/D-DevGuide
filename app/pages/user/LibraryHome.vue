<template>
  <library-home></library-home>
</template>
<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator';
import LibraryHome from '~/components/libraryHome/index.vue';
import { Product } from '@/store/modules/projects';
import { Product as DocProduct } from '@/store/modules/document';

@Component({
  layout: 'default',
  components: {
    LibraryHome,
  },
  async fetch({ store }): Promise<any> {
    try {
      // 제품 목록을 조회
      await store.dispatch('video/videoProducts');
      await store.dispatch('document/docProducts');
      await store.dispatch('download/downloadProducts');

      // 첫번째 제품에 대한 동영상 목록 조회
      const selectedVideoProduct: Array<Product> =
        store.state.video.products[0];

      // 첫번째 제품에 대한 문서 목록 조회
      const selectedDocProduct: Array<DocProduct> =
        store.state.document.products[0];

      await store.dispatch('video/getVideosByProduct', selectedVideoProduct);
      await store.dispatch('document/getDocsByProduct', selectedDocProduct);
    } catch (e) {
      console.error(e);
    }
  },
})
export default class extends Vue {}
</script>

<style lang="scss"></style>
