<template>
  <library-doc-list></library-doc-list>
</template>
<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator';
import LibraryDocList from '~/components/libraryDocList/index.vue';

@Component({
  layout: 'TypeA',
  components: {
    LibraryDocList,
  },
  async fetch({ params, store }) {
    try {
      // 제품에 대한 문서 목록 조회
      await store.dispatch('document/getDocsByProduct', params);
    } catch (e) {
      console.error(e);
    }
  },
})
export default class extends Vue {}
</script>

<style lang="scss"></style>
