<template>
  <div class="dbs-container">
    <search-bar />

    <!-- 동영상 목록 -->
    <video-list />

    <!-- 문서 목록-->
    <doc-list />

    <!-- 다운로드 파일 목록 -->
    <download-list />
  </div>
</template>
<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator';
import VideoList from './VideoList.vue';
import DocList from '~/components/libraryHome/DocList.vue';
import DownloadList from '~/components/libraryHome/DownloadList.vue';
import SearchBar from '~/components/common/search/searchBar.vue';

@Component({
  components: {
    VideoList,
    DocList,
    DownloadList,
    SearchBar,
  },
})
export default class LibraryHome extends Vue {}
</script>

<style scoped></style>
