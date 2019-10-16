<template>
  <div>
    <div>
      자료실 문서 상세 페이지
    </div>

    <doc-contents></doc-contents>
    <doc-list></doc-list>
  </div>
</template>
<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator';
import DocContents from './detail/DocContents.vue';
import Doclist from './detail/DocList.vue';
import DocList from '~/components/library/document/list/DocList.vue';

@Component({
  components: {
    DocList,
    DocContents,
    Doclist,
  },
})
export default class DocumentDetail extends Vue {}
</script>

<style scoped></style>
