<template>
  <library-home />
</template>
<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator';
import LibraryHome from '~/components/libraryHome/index.vue';

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
      await store.dispatch('download/fileProducts');

      // if (store.state.video.products[0]) {
      //   await store.dispatch('video/getVideosByProduct', {
      //     data: store.state.video.products[0],
      //   });
      // }
      //
      // if (store.state.document.products[0]) {
      //   await store.dispatch('document/getDocsByProduct', {
      //     data: store.state.document.products[0],
      //   });
      // }
      //
      // await store.dispatch('download/filesByProducts');
    } catch (e) {
      console.error(e);
    }
  },
})
export default class extends Vue {}
</script>

<style lang="scss"></style>
