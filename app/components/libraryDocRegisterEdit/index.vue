<template>
  <div class="container-panel">
    <div class="view-top mgb-15">
      <h2 class="tit-con-text">문서<span>등록/수정</span></h2>
    </div>
    <div class="gray-info-box mgb-20">
      <ul class="box-notice">
        <li>
          <div class="ui-select w-170">
            <select title="제품종류" class="off" tabindex="-1">
              <option
                v-for="product in $store.state.document.products"
                :key="product._id"
                :value="product.productName"
                :selected="selectedCategory.productCode === product.productCode"
                >{{ product.productName }}</option
              >
            </select>
            <button
              type="button"
              class="ui-select-btn"
              :class="{ on: isOpenSelectBox }"
              title="제품종류 선택"
              @click="isOpenSelectBox = !isOpenSelectBox"
            >
              {{ selectedCategory.productName }}
            </button>
            <!-- 셀렉트박스  선택시 ui-select-wrap에 on 추가하면 display block 됨 -->
            <div class="ui-select-wrap" :class="{ on: isOpenSelectBox }">
              <strong class="ui-select-tit" tabindex="0">품목 선택</strong>
              <div class="ui-select-options">
                <button
                  v-for="product in $store.state.document.products"
                  :key="product._id"
                  type="button"
                  class="ui-select-opt"
                  :selected="
                    product.productCode === selectedCategory.productCode
                  "
                  :value="product.productName"
                  @click="onclickCategory(product)"
                >
                  <b class="ui-select-txt">{{ product.productName }}</b>
                </button>
              </div>
            </div>
          </div>
          <input
            v-model="doc.docTitle"
            type="text"
            class="inp-base w-680"
            placeholder="제목"
          />
        </li>
        <li>
          <label class="txt-right w-170" style="display: inline-block;"
            >문서파일</label
          >
          <input
            ref="fileInputText"
            type="text"
            placeholder="pdf 파일만 등록할 수 있습니다."
            class="inp-base"
            style="width: 650px;"
            disabled
          />

          <button
            type="button"
            class="dbs-icon-button file"
            @click="onclickFileUpload"
          ></button>
        </li>
      </ul>
    </div>
    <div class="movie-register-wrap mgb-20">
      <div class="movie-register-thumb document">
        <ul v-if="!thumbnailPath" class="thumb-list">
          <!--              <p class="base-document-info">-->
          <!--                문서 파일을 드래그하여 추가-->
          <!--              </p>-->
        </ul>
        <ul v-else class="thumb-list">
          <li class="main-document">
            <div class="thumb">
              <img
                :src="thumbnailPath.replace('app/static', '')"
                alt="document"
              />
            </div>
            <dl class="thumb-desc">
              <!--              <dt class="ellipsis">-->
              <!--                {{ doc.docName }}-->
              <!--              </dt>-->
              <dd>
                {{ doc.originDocName }}
                <span class="administer"
                  ><a class="font-accent-color" @click="onclickRemove"
                    >삭제</a
                  ></span
                >
              </dd>
            </dl>
          </li>
        </ul>
        <!--        <p class="drag-info">문서 파일을 드래그하여 추가</p>-->
        <!--        <ul class="thumb-list">-->
        <!--          <li class="drag-info">문서 파일을 드래그하여 추가</li>-->
        <!--        </ul>-->
      </div>
      <div class="movie-register-toastui">
        <TuiEditor
          ref="tui"
          height="300px"
          mode="wysiwyg"
          :value="doc.description"
        />
      </div>
    </div>
    <div class="btn-wrap mgb-80">
      <button
        type="button"
        class="dbs-icon-button ico-left small confirm"
        @click="onclickSave"
      >
        확인
      </button>
      <button
        type="button"
        class="dbs-icon-button ico-left small cancel"
        @click="onclickCancel"
      >
        취소
      </button>
    </div>
  </div>
</template>
<script lang="ts">
import { Vue, Component, namespace, Watch } from 'nuxt-property-decorator';
import TurndownService from 'turndown';
import DocEditor from '@/components/libraryDocEdit/DocEditor.vue';
import FileComponent from '@/components/common/file/FileComponent.vue';
import { IDocument } from '@/store/modules/document';
import { IAlert } from '~/store/modules/common';

const Common = namespace('common');

interface Category {
  productName: string;
  productCode: string;
}

const Doc = namespace('document');

@Component({
  components: {
    FileComponent,
    DocEditor,
  },
})
export default class LibraryDocRegister extends Vue {
  @Common.Action('alert') alertAction!: (payload: IAlert) => Promise<any>;
  @Doc.Action('createDoc') createDocAction!: (payload: any) => Promise<any>;
  @Doc.Action('updateDoc') updateDocAction!: (payload: any) => Promise<any>;
  @Doc.Action('previewDoc') previewDocAction!: (file: any) => void;

  @Watch('$route', { immediate: true, deep: true })
  onChangeRoute(to, from) {
    console.log('onChangeRoute :: ', to, from);
    // console.log('onChangeMenu :: ', this.selectedProductCode);
  }

  get doc() {
    return this.$store.state.document.selectedDoc;
  }

  $refs!: {
    fileInputText: any;
    fileUploader: any;
    docEditorComp: any;
    fileComp: any;
    tui: any;
  };

  isExistInputFile: boolean = false;
  inputFile!: any;
  isOpenSelectBox: boolean = false;
  selectedCategory: Category = {
    productName: '',
    productCode: '',
  };

  thumbnailPath: string = '';
  selectedTempName: string = '';

  created() {
    console.log(this.$route);

    const selectedProduct = this.$store.state.document.selectedProduct;
    if (selectedProduct._id) {
      this.selectedCategory.productName = selectedProduct.productName;
      this.selectedCategory.productCode = selectedProduct.productCode;
    }

    const selectedDoc: IDocument = this.$store.state.document.selectedDoc;
    this.thumbnailPath = selectedDoc.thumbnailPath;
    this.selectedTempName = selectedDoc.docName;
  }

  mounted() {
    setTimeout(() => {
      if (this.$refs.fileInputText && this.$refs.fileInputText.value) {
        this.$refs.fileInputText.value = this.doc.originDocName;
      }
    }, 200);
  }

  onclickCategory(product: Category): void {
    this.selectedCategory.productCode = product.productCode;
    this.selectedCategory.productName = product.productName;
    this.isOpenSelectBox = false;
  }

  async onChangeFile(file: any): Promise<any> {
    if (!this.isExistInputFile) {
      this.isExistInputFile = true;
    }

    this.inputFile = file;
    await this.previewDocAction(file);
    this.thumbnailPath = this.$store.state.document.selectedTemp.thumbnailPath;
    this.selectedTempName = this.$store.state.document.selectedTemp.docName;
    console.log('selectedTemp ', this.$store.state.document.selectedTemp);
  }

  async onclickSave(): Promise<any> {
    if (!this.doc.docTitle) {
      this.alertAction({
        type: 'warning',
        isShow: true,
        msg: '문서 제목을 입력해주세요.',
      });

      return;
    }

    if (!this.thumbnailPath) {
      this.alertAction({
        type: 'warning',
        isShow: true,
        msg: '문서를 선택해주세요.',
      });

      return;
    }

    // const ts = new TurndownService();
    this.doc.description = this.$refs.tui.invoke('getValue'); // get tui-editor md
    this.doc.productName = this.selectedCategory.productName;
    this.doc.productCode = this.selectedCategory.productCode;

    const payload = {
      isChange: !!this.inputFile,
      data: this.doc,
      file: this.inputFile,
    };

    if (this.doc._id) {
      await this.onUpdateDoc(payload);
    } else {
      await this.onCreateDoc(payload);
    }
  }

  onUpdateDoc(payload): void {
    this.alertAction({
      type: 'question',
      isShow: true,
      msg: '문서를 수정하시겠습니까?',
    }).then(async (result) => {
      if (result.ok) {
        await this.updateDocAction(payload);
        this.redirectDocList();
      }
    });
  }

  onCreateDoc(payload): void {
    this.alertAction({
      type: 'question',
      isShow: true,
      msg: `${this.selectedCategory.productName} 에 문서를 등록하시겠습니까?`,
    }).then(async (result) => {
      if (result.ok) {
        await this.createDocAction(payload);
        this.redirectDocList();
      }
    });
  }

  onclickFileUpload(): void {
    if (!this.isExistInputFile) {
      this.isExistInputFile = true;
    }

    const input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.setAttribute('ref', 'fileUploader');
    input.setAttribute('accept', 'application/pdf');
    input.click();

    let fileData!: any;

    input.addEventListener(
      'change',
      // @ts-ignore
      async (e: InputEvent<HTMLInputElement>) => {
        fileData = e.path[0];

        console.log('fileData ', fileData.files[0]);
        this.inputFile = fileData;
        await this.previewDocAction(fileData);

        //  file input filed
        this.$refs.fileInputText.value = fileData.files[0].name;

        // pdf thumbnail
        this.thumbnailPath = this.$store.state.document.selectedTemp.thumbnailPath;

        // doc for preview
        this.selectedTempName = this.$store.state.document.selectedTemp.docName;
      }
    );
  }

  onclickRemove(): void {
    this.thumbnailPath = '';
    this.$refs.fileInputText.value = '';
    this.inputFile = null;
  }

  onclickCancel(): void {
    const msg: string =
      this.$route.params.editType === 'edit'
        ? '문서 수정을 취소하시겠습니까?'
        : '문서 등록을 취소하시겠습니까?';

    this.alertAction({
      type: 'question',
      isShow: true,
      msg,
    }).then((result) => {
      if (result.ok) {
        this.redirectDocList();
      }
    });
  }

  redirectDocList(): void {
    this.$router.push({
      name: 'docList',
      params: {
        productCode: this.$route.params.productCode,
      },
    });
  }
}
</script>

<style></style>
