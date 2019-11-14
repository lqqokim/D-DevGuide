<template>
  <video-home-manage></video-home-manage>
</template>
<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator';
import VideoHomeManage from '~/components/libraryVideoHomeManage/index.vue';

@Component({
  layout: 'TypeA',
  components: {
    VideoHomeManage,
  },
})
export default class extends Vue {}
</script>

<style lang="scss"></style>
