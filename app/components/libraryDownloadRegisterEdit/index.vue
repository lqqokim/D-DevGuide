<template>
  <div class="container-panel">
    <div class="view-top mgb-15">
      <h1 class="tit-con-text">다운로드<span>등록/수정</span></h1>
    </div>
    <div class="gray-info-box mgb-20">
      <ul class="box-notice">
        <li>
          <div class="ui-select w-170">
            <select title="품목형태" class="off" tabindex="-1">
              <option
                v-for="product in $store.state.download.products"
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
              title="품목형태 선택"
              @click="isOpenSelectBox = !isOpenSelectBox"
            >
              {{ selectedCategory.productName }}
            </button>
            <!-- 셀렉트박스 선택시 ui-select-wrap 에 on 추가하면 display block 됨 -->
            <div class="ui-select-wrap" :class="{ on: isOpenSelectBox }">
              <strong class="ui-select-tit" tabindex="0">품목 선택</strong>
              <div class="ui-select-options">
                <button
                  v-for="product in $store.state.download.products"
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
            <div class="dim-select"></div>
          </div>
          <input
            v-model="file.fileTitle"
            type="text"
            class="inp-base w-680"
            placeholder="제목"
          />
        </li>
        <li>
          <template v-if="!isExistInputFile">
            <label class="txt-right w-170" style="display: inline-block;"
              >문서파일</label
            >

            <input
              ref="fileInputText"
              type="text"
              class="inp-base"
              style="width: 650px;"
              disabled
            />

            <button
              type="button"
              class="dbs-icon-button file"
              @click="onclickFileUpload"
            ></button>
          </template>
        </li>
      </ul>
    </div>
    <div class="movie-register-wrap mgb-10">
      <div class="movie-register-toastui">
        <TuiEditor
          ref="tui"
          height="500px"
          mode="wysiwyg"
          :value="file.description"
        />
      </div>
    </div>
    <!--    <div v-if="isExistInputFile" class="bg-gray add-file mgb-20">-->
    <!--      <button type="button" class="btn-attachment multi">-->
    <!--        {{ file.originFileName }}<span class="capacity">{{ file.size }}</span-->
    <!--        ><span class="closed" @click="removeFile"></span>-->
    <!--      </button>-->
    <!--    </div>-->
    <div v-if="isExistInputFile" class="bg-gray add-file mgb-20">
      <button type="button" class="btn-attachment multi">
        {{ localOriginFileName
        }}<span class="capacity">{{ localFileSize }} KB</span
        ><span class="closed" @click="removeFile" />
      </button>
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
import { Vue, Component, namespace } from 'nuxt-property-decorator';
import TurndownService from 'turndown';
import FileComponent from '~/components/common/file/FileComponent.vue';
import { IFile, IProduct } from '@/store/modules/download';
import { IAlert } from '~/store/modules/common';

const Download = namespace('download');
const Common = namespace('common');

interface Category {
  productName: string;
  productCode: string;
}

@Component({
  components: {
    FileComponent,
  },
})
export default class LibraryDownloadRegisterEdit extends Vue {
  @Common.Action('alert') alertAction!: (payload: IAlert) => Promise<any>;
  @Download.Action('createFile') createFileAction!: (
    file: IFile
  ) => Promise<any>;
  @Download.Action('updateFile') updateFileAction!: (
    file: IFile
  ) => Promise<any>;

  isExistInputFile: boolean = false;

  get file(): IFile {
    return this.$store.state.download.selectedFile;
  }

  $refs!: {
    fileInputText: any;
    fileUploader: any;
    tui: any;
  };

  inputFile!: any;
  isOpenSelectBox: boolean = false;
  selectedCategory: Category = {
    productName: '',
    productCode: '',
  };

  localOriginFileName: string = '';
  localFileSize: number = 0;

  created() {
    const selectedProduct: IProduct = this.$store.state.download
      .selectedProduct;
    const selectedFile: IFile = this.$store.state.download.selectedFile;
    if (selectedProduct._id) {
      this.selectedCategory.productName = selectedProduct.productName;
      this.selectedCategory.productCode = selectedProduct.productCode;
    }

    if (selectedFile._id) {
      this.isExistInputFile = true;
    }

    this.localOriginFileName = this.file.originFileName;
    // this.localFileSize = this.file.size ? this.file.size / 1024 ** 2 : 0; // byte to kb
    this.localFileSize = this.file.size;
  }

  mounted() {
    // setTimeout(() => {
    //   if (this.$refs.fileInputText && this.$refs.fileInputText.value) {
    //     this.$refs.fileInputText.value = this.file.originFileName;
    //   }
    // }, 200);
  }

  onclickSave(): void {
    if (!this.file.fileTitle) {
      this.alertAction({
        type: 'warning',
        isShow: true,
        msg: '파일 제목을 입력해주세요.',
      });

      return;
    }

    console.log(this.file);
    console.log(this.inputFile);

    if (!this.isExistInputFile) {
      this.alertAction({
        type: 'warning',
        isShow: true,
        msg: '파일을 선택해주세요.',
      });

      return;
    }

    // const ts = new TurndownService();
    this.file.description = this.$refs.tui.invoke('getValue'); // get tui-editor md
    this.file.productName = this.selectedCategory.productName;
    this.file.productCode = this.selectedCategory.productCode;

    const request = {
      isChange: !!this.inputFile,
      data: this.file,
      file: this.inputFile,
    };

    if (this.file._id) {
      this.onUpdateFile(request);
    } else {
      this.onCreateFile(request);
    }
  }

  onclickCancel(): void {
    this.alertAction({
      type: 'question',
      isShow: true,
      msg: '파일정보 수정을 취소하시겠습니까?',
    }).then((result) => {
      if (result.ok) {
        this.redirectDownloadList();
      }
    });
  }

  onUpdateFile(request): void {
    this.alertAction({
      type: 'question',
      isShow: true,
      msg: '파일을 수정하시겠습니까?',
    }).then(async (result) => {
      if (result.ok) {
        await this.updateFileAction(request);
        this.redirectDownloadList();
      }
    });
  }

  onCreateFile(request): void {
    this.alertAction({
      type: 'question',
      isShow: true,
      msg: '파일을 등록하시겠습니까?',
    }).then(async (result) => {
      if (result.ok) {
        await this.createFileAction(request);
        this.redirectDownloadList();
      }
    });
  }

  // onChangeFile(file: any): void {
  //   if (!this.isExistInputFile) {
  //     this.isExistInputFile = true;
  //   }
  //
  //   this.inputFile = file;
  //   // this.localFileSize = file.files[0].size / 1024 ** 2;
  //   this.localFileSize = file.files[0].size;
  //   this.localOriginFileName = file.files[0].name;
  // }

  onclickFileUpload(): void {
    const input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.setAttribute('ref', 'fileUploader');
    input.click();

    let fileData!: any;

    input.addEventListener(
      'change',
      // @ts-ignore
      (e: InputEvent<HTMLInputElement>) => {
        fileData = e.path[0];

        this.inputFile = fileData;
        this.localFileSize = fileData.files[0].size;
        this.localOriginFileName = fileData.files[0].name;

        //  file input filed
        this.$refs.fileInputText.value = fileData.files[0].name;

        if (!this.isExistInputFile) {
          this.isExistInputFile = true;
        }
      }
    );
  }

  removeFile(): void {
    if (this.isExistInputFile) {
      this.isExistInputFile = false;
    }
  }

  redirectDownloadList(): void {
    this.$router.push({
      name: 'downloadList',
      params: {
        productCode: this.$route.params.productCode,
        product: this.$store.state.download.selectedProduct,
      },
    });
  }

  onclickCategory(product: any): void {
    this.selectedCategory.productCode = product.productCode;
    this.selectedCategory.productName = product.productName;
    this.isOpenSelectBox = false;
  }

  readonly fileAccept: Array<string> = [
    '.csv',
    'text/plain',
    'application/pdf',
    'application/msword',
    'application/vnd.ms-excel',
    'application/vnd.ms-powerpoint',
    'application/vnd.openxmlformats-officedocument.presentationml.slideshow',
    'application/vnd.openxmlformats-officedocument.presentationml.presentation',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  ];
}
</script>

<style scoped></style>
