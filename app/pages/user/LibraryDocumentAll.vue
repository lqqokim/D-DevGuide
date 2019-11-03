<template>
  <div></div>
</template>
<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator';
import LibraryDocumentAll from '~/components/LibraryDocumentAll/index.vue';

@Component({
  layout: 'TypeA',
  components: {
    LibraryDocumentAll,
  },
})
export default class extends Vue {}
</script>

<style lang="scss"></style>
