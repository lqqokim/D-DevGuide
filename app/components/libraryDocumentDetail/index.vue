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
import DocContents from './DocContents.vue';
import DocList from './DocList.vue';

@Component({
  components: {
    DocList,
    DocContents,
  },
})
export default class DocumentDetail extends Vue {}
</script>

<style scoped></style>
