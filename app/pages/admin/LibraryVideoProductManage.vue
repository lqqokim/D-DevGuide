<template>
  <video-product-manage></video-product-manage>
</template>
<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator';
import VideoProductManage from '~/components/libraryVideoProductManage/index.vue';

@Component({
  layout: 'TypeA',
  components: {
    VideoProductManage,
  },
})
export default class extends Vue {}
</script>

<style lang="scss"></style>
