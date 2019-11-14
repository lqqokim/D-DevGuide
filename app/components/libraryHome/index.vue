<template>
  <div>
    <div>
      자료실 홈 페이지
    </div>

    <!--    동영상 목록-->
    <video-list></video-list>
  </div>
</template>
<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator';
import VideoList from './VideoList.vue';

@Component({
  components: {
    VideoList,
  },
})
export default class LibraryHome extends Vue {}
</script>

<style scoped></style>
