<template>
  <library-video-edit></library-video-edit>
</template>
<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator';
import LibraryVideoEdit from '~/components/libraryVideoEdit/index.vue';

@Component({
  layout: 'TypeA',
  components: {
    LibraryVideoEdit,
  },
})
export default class extends Vue {}
</script>

<style lang="scss"></style>
