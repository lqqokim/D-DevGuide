<template>
  <video-product-manage></video-product-manage>
</template>
<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator';
import VideoProductManage from '~/components/libraryVideoProductManage/index.vue';

@Component({
  layout: 'default',
  components: {
    VideoProductManage,
  },
  async fetch({ store }) {
    try {
      await store.dispatch('video/videoProducts');
    } catch (e) {
      console.error(e);
    }
  },
})
export default class extends Vue {}
</script>

<style lang="scss"></style>
