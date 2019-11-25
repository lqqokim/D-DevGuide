<template>
  <library-video-detail></library-video-detail>
</template>
<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator';
import LibraryVideoDetail from '~/components/libraryVideoDetail/index.vue';

@Component({
  layout: 'TypeA',
  components: {
    LibraryVideoDetail,
  },
})
export default class extends Vue {}
</script>

<style lang="scss"></style>
