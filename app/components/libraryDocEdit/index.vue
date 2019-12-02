<template>
  <div class="dbs-container">
    <h1 class="tit-con mgt-50">문서 등록/수정</h1>
    <div class="position-wrap">
      <doc-editor ref="docEditorComp"></doc-editor>

      <input type="button" value="확인" @click="onclickSave" />
      <input type="button" value="취소" @click="onclickCancel" />
    </div>
    <div class="line"></div>
  </div>
</template>
<script lang="ts">
import { Vue, Component, namespace } from 'nuxt-property-decorator';
import DocEditor from './DocEditor.vue';
import * as document from '@/store/modules/document';

const Doc = namespace('document');

@Component({
  components: {
    DocEditor,
  },
})
export default class LibraryDocEdit extends Vue {
  @Doc.Action('updateDoc') updateDocAction!: (arg0: document.Document) => void;

  $refs!: {
    docEditorComp: any;
  };

  async onclickSave(): Promise<any> {
    await this.updateDocAction(this.$refs.docEditorComp.getFileInfo());
    this.redirectDocList();
  }

  onclickCancel(): void {
    this.redirectDocList();
  }

  redirectDocList(): void {
    this.$router.push({
      name: 'docList',
      params: {
        productName: this.$route.params.productName,
      },
    });
  }
}
</script>
