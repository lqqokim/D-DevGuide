<template>
  <div class="dbs-container">
    <!-- search -->
    <div class="srch-wrap-bar mgt-60 mgb-60">
      <div class="srch-wrap">
        <input type="search" class="m-srch-bar" placeholder="자료실 통합검색" />
        <button type="button" class="btn-search">search</button>
      </div>
    </div>

    <video-list></video-list>

    <doc-list></doc-list>

    <download-list></download-list>
  </div>
</template>
<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator';
import VideoList from './VideoList.vue';
import DocList from '~/components/libraryHome/DocList.vue';
import DownloadList from '~/components/libraryHome/DownloadList.vue';

@Component({
  components: {
    VideoList,
    DocList,
    DownloadList,
  },
})
export default class LibraryHome extends Vue {}
</script>

<style scoped></style>
