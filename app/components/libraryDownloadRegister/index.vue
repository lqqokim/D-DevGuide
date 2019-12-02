<template>
  <div class="dbs-container">
    <h1 class="tit-con mgt-50">다운로드 등록/수정</h1>

    <download-editor ref="downloadEditorComp"></download-editor>

    <div class="line"></div>
    <input type="button" value="확인" @click="onclickSave" />
    <input type="button" value="취소" @click="onclickCancel" />
  </div>
</template>
<script lang="ts">
import { Vue, Component, namespace } from 'nuxt-property-decorator';
import DownloadEditor from '@/components/libraryHome/download/DownloadEditor.vue';
import * as download from '@/store/modules/download';

const Download = namespace('download');

@Component({
  components: {
    DownloadEditor,
  },
})
export default class LibraryDownloadRegister extends Vue {
  @Download.Action('registerFile') registerFileAction!: (arg0: any) => void;

  $refs!: {
    downloadEditorComp: any;
  };

  onclickSave(): void {
    this.registerFileAction(this.$refs.downloadEditorComp.getFileInfo());
  }

  onclickCancel(): void {
    this.redirectDocList();
  }

  redirectDocList(): void {
    this.$router.push({
      name: 'downloadList',
      params: {
        productName: this.$route.params.productName,
      },
    });
  }
}
</script>

<style scoped></style>
