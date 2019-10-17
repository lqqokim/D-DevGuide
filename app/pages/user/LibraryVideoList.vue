<template>
  <video-list></video-list>
</template>
<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator';
import VideoList from '~/components/libraryVideoList/index.vue';

@Component({
  layout: 'TypeA',
  components: {
    VideoList,
  },
})
export default class extends Vue {}
</script>

<style scoped></style>
