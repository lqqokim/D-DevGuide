<template>
  <div class="dbs-container">
    <h1 class="tit-con mgt-50">문서 등록/수정</h1>
    <div class="position-wrap">
      <div class="top">
        <label>
          <select name="product">
            <option
              v-for="product in $store.state.document.products"
              :key="product._id"
              :value="product.productName"
              :selected="
                product.productName ===
                  $store.state.document.selectedProduct.productName
              "
              >{{ product.productName }}</option
            >
          </select>
        </label>

        <label>
          <input v-model="doc.docTitle" type="text" />
        </label>
      </div>

      <div class="content">
        <div v-if="isSelectedDoc" id="edit_viewer"></div>
        <div v-else>파일 Drag and Drop 영역</div>

        <!-- 파일 브라우저 컴포넌트-->
        <file-comp @emit-file="onChangeFile"></file-comp>

        <div class="tuiEditor">
          <label>
            <input
              v-model="doc.description"
              type="text"
              style="width: 300px;"
            />
          </label>
        </div>
      </div>

      <input type="button" value="확인" @click="onClickSave" />
      <input type="button" value="취소" @click="onClickCancel" />
    </div>
    <div class="line"></div>
  </div>
</template>
<script lang="ts">
import { Vue, Component, namespace } from 'nuxt-property-decorator';
import * as PDFObject from 'pdfobject';
import * as document from '@/store/modules/document';
import FileComp from '~/components/common/file/FileComp.vue';

const Doc = namespace('document');

@Component({
  components: {
    FileComp,
  },
})
export default class DocEditor extends Vue {
  @Doc.Action('updateDoc') updateDocAction!: (arg0: document.Document) => void;
  @Doc.Action('registerDoc') registerDocAction!: (file: any) => void;

  file!: any;

  get doc() {
    return this.$store.state.document.selectedDoc;
  }

  get isSelectedDoc() {
    return this.$store.state.document.selectedDoc._id;
  }

  mounted() {
    if (this.isSelectedDoc) {
      PDFObject.embed(
        this.doc.docPath.replace('app/static', ''),
        '#edit_viewer'
      );
    }
  }

  onChangeFile(file: any): void {
    this.file = file;
  }

  // get isEdit() {
  //   return this.$route.name === this.EDIT_NAME;
  // }

  async onClickSave(): Promise<any> {
    const user = this.$store.state.user.user;
    const data = {
      file: this.file,
      data: {
        docTitle: this.doc.docTitle,
        projectId: '1',
        productName: this.$route.params.productName,
        empName: user.name,
        depthPath: user.deptPath,
        description: this.doc.description,
      },
    };

    console.log('data ::: ', data);

    if (this.isSelectedDoc) {
      await this.updateDocAction(this.doc);
    } else {
      await this.registerDocAction(data);
    }

    this.redirectDocList();
  }

  onClickCancel(): void {
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

<style scoped>
.pdfobject-container {
  width: 500px;
}
</style>
