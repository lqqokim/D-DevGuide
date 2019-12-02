<template>
  <doc-editor></doc-editor>
</template>
<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator';
import DocEditor from '~/components/libraryDocEdit/DocEditor.vue';

@Component({
  components: {
    DocEditor,
  },
})
export default class LibraryDocRegister extends Vue {}
</script>

<style></style>
