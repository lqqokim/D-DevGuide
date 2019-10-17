<template>
  <video-detail></video-detail>
</template>
<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator';
import VideoDetail from '~/components/libraryVideoDetail/index.vue';

@Component({
  layout: 'TypeA',
  components: {
    VideoDetail,
  },
})
export default class extends Vue {}
</script>

<style scoped></style>
