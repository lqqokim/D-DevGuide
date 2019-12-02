<template>
  <download-home-manage></download-home-manage>
</template>
<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator';
import DownloadHomeManage from '~/components/libraryDownloadHomeManage/index.vue';

@Component({
  layout: 'TypeA',
  components: {
    DownloadHomeManage,
  },
})
export default class extends Vue {}
</script>

<style lang="scss"></style>
