<template>
  <div></div>
</template>
<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator';
import LibraryDocumentList from '~/components/libraryDocumentList/index.vue';

@Component({
  layout: 'TypeA',
  components: {
    LibraryDocumentList,
  },
})
export default class extends Vue {}
</script>

<style lang="scss"></style>
