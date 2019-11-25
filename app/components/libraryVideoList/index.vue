<template>
  <video-list></video-list>
</template>
<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator';
import VideoList from './VideoList.vue';

@Component({
  components: {
    VideoList,
  },
})
export default class LibraryVideoList extends Vue {}
</script>

<style scoped></style>
