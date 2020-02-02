<template>
  <library-video-edit></library-video-edit>
</template>
<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator';
import LibraryVideoEdit from '~/components/libraryVideoEdit/index.vue';

@Component({
  layout: 'default',
  components: {
    LibraryVideoEdit,
  },
  async fetch({ params, store }) {
    try {
      let projectId: string;

      if (!params.video) {
        // _id 로 video 상세 조회 (ssr)
        await store.dispatch('video/videoDetailById', params._id);
        projectId = store.state.video.selectedVideo.projectId;
      } else {
        // @ts-ignore
        projectId = params.video.projectId;
        // projectId = store.state.video.selectedVideo.projectId;
      }

      // // video 목록 조회 (ssr)
      // if (projectId && !store.state.video.videosByProduct.length) {
      //   await store.dispatch('video/getVideosByProduct', {
      //     projectId,
      //   });
      // }
    } catch (e) {
      console.error(e);
    }
  },
})
export default class extends Vue {}
</script>

<style lang="scss"></style>
