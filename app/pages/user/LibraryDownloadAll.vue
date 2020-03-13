<template>
  <div></div>
</template>
<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator';
import LibraryDownloadAll from '~/components/libraryDownloadAll/index.vue';

@Component({
  layout: 'TypeA',
  components: {
    LibraryDownloadAll,
  },
})
export default class extends Vue {}
</script>

<style lang="scss"></style>
