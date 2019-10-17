<template>
  <div>
    <div>
      자료실 동영상 상세 페이지
    </div>

    <video-contents></video-contents>
    <video-playlist></video-playlist>
  </div>
</template>
<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator';
import VideoContents from './VideoContents.vue';
import VideoPlaylist from './VideoPlaylist.vue';

@Component({
  components: {
    VideoContents,
    VideoPlaylist,
  },
})
export default class VideoDetail extends Vue {}
</script>

<style scoped></style>
