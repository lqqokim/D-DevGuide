<template>
  <div>
    <h2>
      자료실 홈 페이지
    </h2>

    <!--    동영상 목록-->
    <video-list></video-list>

    <!--   문서 목록-->
    <doc-list></doc-list>
  </div>
</template>
<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator';
import VideoList from './VideoList.vue';
import DocList from './DocList.vue';

@Component({
  components: {
    VideoList,
    DocList,
  },
})
export default class LibraryHome extends Vue {}
</script>

<style scoped></style>
