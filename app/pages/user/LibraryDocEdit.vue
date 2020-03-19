<template>
  <library-doc-edit></library-doc-edit>
</template>
<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator';
import LibraryDocEdit from '@/components/libraryDocEdit/index.vue';

@Component({
  layout: 'default',
  components: {
    LibraryDocEdit,
  },
  async fetch({ params, store }) {
    try {
      if (!store.state.document.producs) {
        await store.dispatch('document/docProducts');
      }

      if (!params.doc) {
        // docName 으로 문서 상세 조회 (ssr)
        await store.dispatch('document/docDetail', params._id);
      } else {
        // doc 존재
        await store.commit('document/selectedDoc', params.doc);
      }

      // initialize
      await store.commit('document/initState', 'selectedTemp');
    } catch (e) {
      console.error(e);
    }
  },
})
export default class extends Vue {}
</script>

<style lang="scss"></style>
