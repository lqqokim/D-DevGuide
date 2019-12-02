<template>
  <doc-editor></doc-editor>
</template>
<script>
import { Vue, Component } from 'nuxt-property-decorator';
import DocEditor from './DocEditor';

@Component({
  components: {
    DocEditor,
  },
})
export default class LibraryDocEdit extends Vue {}
</script>
