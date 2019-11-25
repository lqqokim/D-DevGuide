<template>
  <library-doc-register></library-doc-register>
</template>
<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator';
import LibraryDocRegister from '~/components/libraryDocRegister/index.vue';

@Component({
  layout: 'TypeA',
  components: {
    LibraryDocRegister,
  },
  async fetch({ store }) {
    try {
      if (!store.state.document.producs) {
        await store.dispatch('document/docProducts');
      }

      await store.commit('document/initState', 'selectedDoc');
    } catch (e) {
      console.error(e);
    }
  },
})
export default class extends Vue {}
</script>

<style lang="scss"></style>
