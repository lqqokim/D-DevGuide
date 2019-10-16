<template>
  <video-detail></video-detail>
</template>
<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator';
import VideoDetail from '~/components/library/video/VideoDetail.vue';

@Component({
  layout: 'TypeA',
  components: {
    VideoDetail,
  },
})
export default class extends Vue {}
</script>

<style scoped></style>
