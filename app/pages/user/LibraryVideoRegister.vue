<template>
  <library-video-register></library-video-register>
</template>
<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator';
import LibraryVideoRegister from '~/components/libraryVideoRegister/index.vue';

@Component({
  layout: 'TypeA',
  components: {
    LibraryVideoRegister,
  },
})
export default class extends Vue {}
</script>

<style lang="scss"></style>
