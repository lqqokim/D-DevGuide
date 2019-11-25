<template>
  <library-doc-detail></library-doc-detail>
</template>
<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator';
import LibraryDocDetail from '~/components/LibraryDocDetail/index.vue';

@Component({
  layout: 'TypeA',
  components: {
    LibraryDocDetail,
  },
  async fetch({ store, params }) {
    await store.dispatch('document/docDetail', params.docName);
  },
})
export default class extends Vue {}
</script>
<!--@Doc.Action('docDetailById') docDetailByIdAction!: (arg0: string) => void;-->
<style lang="scss"></style>
