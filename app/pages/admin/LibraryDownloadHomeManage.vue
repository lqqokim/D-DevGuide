<template>
  <download-home-manage />
</template>
<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator';
import DownloadHomeManage from '@/components/libraryDownloadHomeManage/index.vue';

@Component({
  layout: 'default',
  components: {
    DownloadHomeManage,
  },
  async fetch({ store }): Promise<any> {
    try {
      // 제품 목록을 조회
      await store.dispatch('download/fileProducts');
    } catch (e) {
      console.error(e);
    }
  },
})
export default class extends Vue {}
</script>

<style lang="scss"></style>
