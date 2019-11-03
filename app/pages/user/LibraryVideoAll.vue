<template>
  <div></div>
</template>
<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator';
import LibraryVideoAll from '~/components/libraryVideoAll/index.vue';

@Component({
  layout: 'TypeA',
  components: {
    LibraryVideoAll,
  },
})
export default class extends Vue {}
</script>

<style lang="scss"></style>
