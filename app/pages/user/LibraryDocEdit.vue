<template>
  <library-doc-edit></library-doc-edit>
</template>
<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator';
import LibraryDocEdit from '~/components/libraryDocEdit/DocEditor.vue';

@Component({
  layout: 'TypeA',
  components: {
    LibraryDocEdit,
  },
  async fetch({ params, store }) {
    try {
      console.log('LibraryDocEdit Fetch :: ', params);

      if (!store.state.document.producs) {
        await store.dispatch('document/docProducts');
      }

      if (!params.doc) {
        // docName 으로 문서 상세 조회 (ssr)
        await store.dispatch('document/docDetail', params.docName);
      } else {
        // doc 존재
        await store.commit('document/selectedDoc', params.doc);
      }
    } catch (e) {
      console.error(e);
    }
  },
})
export default class extends Vue {}
</script>

<style lang="scss"></style>
