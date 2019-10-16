<template>
  <div>
    <div>
      자료실 문서 페이지
    </div>

    <doc-list></doc-list>
  </div>
</template>
<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator';
import DocList from './list/DocList.vue';

@Component({
  components: {
    DocList,
  },
})
export default class LibraryDocumentList extends Vue {}
</script>

<style scoped></style>
