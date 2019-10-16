<template>
  <library-document-detail></library-document-detail>
</template>
<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator';
import LibraryDocumentDetail from '~/components/library/document/DocumentDetail.vue';

@Component({
  layout: 'TypeA',
  components: {
    LibraryDocumentDetail,
  },
})
export default class extends Vue {}
</script>

<style scoped></style>
