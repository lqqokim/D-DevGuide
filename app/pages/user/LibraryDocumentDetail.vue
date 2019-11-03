<template>
  <div></div>
</template>
<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator';
import LibraryDocumentDetail from '~/components/libraryDocumentDetail/index.vue';

@Component({
  layout: 'TypeA',
  components: {
    LibraryDocumentDetail,
  },
})
export default class extends Vue {}
</script>

<style lang="scss"></style>
