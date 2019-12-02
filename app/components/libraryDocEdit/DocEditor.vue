<template>
  <div>
    <div class="top">
      <label>
        <select name="product">
          <option
            v-for="product in $store.state.document.products"
            :key="product._id"
            :value="product.productName"
            :selected="product.productName === $route.params.productName"
            >{{ product.productName }}</option
          >
        </select>
      </label>

      <label>
        <input v-model="docTitle" type="text" />
      </label>
    </div>

    <div class="content">
      <template v-if="isSelectedDoc">
        <iframe
          :src="previewPath"
          frameborder="0"
          width="600"
          height="600"
          allowfullscreen
          webkitallowfullscreen
        ></iframe>
      </template>
      <template v-else>
        <div>파일 Drag and Drop 영역</div>
      </template>

      <div id="pdf"></div>

      <file-comp @emit-file="onChangeFile"></file-comp>

      <div class="tuiEditor">
        <label>
          <input v-model="description" type="text" style="width: 300px;" />
        </label>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Vue, Component, namespace, Emit } from 'nuxt-property-decorator';
// import * as PDFObject from 'pdfobject';
import * as document from '@/store/modules/document';
import FileComp from '~/components/common/file/FileComp.vue';

const Doc = namespace('document');

@Component({
  components: {
    FileComp,
  },
})
export default class DocEditor extends Vue {
  @Doc.Action('previewDoc') previewDocAction!: (file: any) => void;
  @Doc.Mutation('initState') initStateMutation!: (arg0: string) => void;

  file: any;
  docTitle!: string;
  description!: string;
  selectedDoc!: document.Document;

  get previewPath() {
    console.log(
      'previewPath :: ',
      `/ViewerJS/#../${this.$store.state.document.selectedDoc.docPath.replace(
        'app/static/',
        ''
      )}`
    );

    return `/ViewerJS/#../${this.$store.state.document.selectedDoc.docPath.replace(
      'app/static/',
      ''
    )}`;
  }

  get isSelectedDoc() {
    return this.$store.state.document.selectedDoc._id;
  }

  // get doc() {
  //   return this.$store.state.document.selectedDoc;
  // }
  //
  // get isSelectedDoc() {
  //   return this.$store.state.document.selectedDoc._id;
  // }

  created() {
    const selectedDoc: document.Document = this.$store.state.document
      .selectedDoc;

    if (selectedDoc) {
      this.docTitle = selectedDoc.docTitle;
      this.description = selectedDoc.description;
    }
  }

  async onChangeFile(file: any): Promise<any> {
    this.file = file;
    this.initData();

    try {
      await this.previewDocAction(file);
    } catch (e) {
      console.error(e);
    }
  }

  getFileInfo() {
    return {
      isChange: !!this.file,
      file: this.file,
      data: {
        docTitle: this.docTitle,
        projectId: '1',
        productName: this.$route.params.productName,
        empName: '',
        deptPath: '',
        description: this.description,
      },
    };
  }

  initData(): void {
    console.log('selectedDoc', this.$store.state.document.selectedDoc);
    this.initStateMutation('selectedDoc');

    // if (this.$store.state.document.selectedTemp) {
    //   console.log('selectedTemp', this.$store.state.document.selectedTemp);
    //   this.initStateMutation('selectedTemp');
    // }
  }

  // async onclickSave(): Promise<any> {
  //   const user = this.$store.state.user.user;
  //   const data = {
  //     file: this.file,
  //     data: {
  //       docTitle: this.doc.docTitle,
  //       projectId: '1',
  //       productName: this.$route.params.productName,
  //       empName: user.name,
  //       deptPath: user.deptPath,
  //       description: this.doc.description,
  //     },
  //   };
  //
  //   console.log('data ::: ', data);
  //   console.log('fdksl;fksldf ', this.$route);
  //
  //   if (this.$route.path.includes('edit')) {
  //     await this.updateDocAction(this.doc);
  //   } else {
  //     await this.registerDocAction(data);
  //   }
  //
  //   this.redirectDocList();
  // }

  // onclickCancel(): void {
  //   this.redirectDocList();
  // }
  //
  // redirectDocList(): void {
  //   this.$router.push({
  //     name: 'docList',
  //     params: {
  //       productName: this.$route.params.productName,
  //     },
  //   });
  // }
}
</script>

<style scoped>
.pdfobject-container {
  width: 500px;
}
</style>
