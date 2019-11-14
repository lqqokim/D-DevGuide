<template>
  <div>
    <div>
      자료실 동영상 메인 페이지
    </div>
  </div>
</template>
<script lang="ts">
import { Vue, Component, namespace } from 'nuxt-property-decorator';
import * as video from '@/store/modules/video';

const Video = namespace('video');

@Component
export default class LibraryVideoList extends Vue {
  @Video.Action('getVideosByProduct') videosByProductAction!: () => void;
}
</script>

<style scoped></style>
