<template>
  <div class="dbs-dialog">
    <p class="tit-con-small mgb-10">
      {{ $store.state.download.selectedProduct.productName }}
    </p>
    <div class="dbs-dialog-box overflow-y" style="height: 460px;">
      <ul class="thumb-list choice download">
        <li v-for="(file, index) in localFilesByProduct" :key="file._id">
          <div class="download-text" @click.prevent="clickFile($event, file)">
            <div class="dbs-checkbox-wrapper">
              <input
                :id="'mvCheck' + index"
                type="checkbox"
                :name="'movieCheck' + index"
                :checked="checkManagedFile(file._id)"
              />
              <label :for="'mvCheck' + index" class="dbs-checkbox"></label>
            </div>
            <dl class="thumb-desc">
              <dt>{{ file.fileTitle }}</dt>
              <dd>
                <span>{{ file.originFileName }}</span
                ><span class="hit">{{ Math.round(file.size / 1024) }}KB</span
                ><span class="hit">다운로드 {{ file.downloadCount }}</span>
              </dd>
            </dl>
          </div>
        </li>
      </ul>
      <div v-if="isViewMore" class="btn-wrap">
        <button type="button" class="btn-main small" @click="onClickMoreView">
          더보기
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, namespace } from 'nuxt-property-decorator';
import { IProduct, ListParams, IFile, IStaff } from '@/store/modules/download';
import { IAlert } from '@/store/modules/common';

const Common = namespace('common');
const Download = namespace('download');

@Component
export default class DownloadManageModal extends Vue {
  @Common.Action('alert') alertAction!: (payload: IAlert) => Promise<any>;
  @Download.Action('getFilesByProduct') getFilesByProductAction;

  private readonly LIMIT: number = 5;

  get localFilesByProduct(): IFile[] {
    return this.filesByProduct;
  }

  filesByProduct: IFile[] = [];
  selectedFiles: IFile[] = [];

  isViewMore: boolean = true;
  countMore: number = 1;
  total!: number;

  created() {
    this.total = this.$store.state.download.totalSize;
    this.filesByProduct = this.$store.state.download.filesByProduct;

    if (this.total <= this.LIMIT) {
      this.isViewMore = false;
    }

    this.selectedFiles = this.$store.state.download.selectedProduct.managedFiles.slice();
  }

  checkManagedFile(id) {
    let isManaged = false;
    this.$store.state.download.selectedProduct.managedFiles.forEach(
      (managedFile) => {
        if (!isManaged) {
          isManaged = managedFile._id === id;
        }
      }
    );
    return isManaged;
  }

  async onClickMoreView(): Promise<any> {
    this.countMore++;

    const moreViewParams: ListParams = {
      params: {
        skip: this.localFilesByProduct.length,
        limit: 5,
        sort: '-uploadDate',
      },
    };

    await this.getFilesByProductAction({
      data: this.$store.state.download.selectedProduct,
      params: moreViewParams,
    });

    this.filesByProduct = this.localFilesByProduct.concat(
      this.$store.state.download.filesByProduct
    );

    // 마지막 페이지일 경우 더보기 버튼 hide
    if (Math.ceil(this.total / this.LIMIT) === this.countMore) {
      this.isViewMore = false;
    }
  }

  clickFile(e, file) {
    let inputTag!: any;

    if (e.target.tagName === 'INPUT') {
      inputTag = e.target;
    } else if (e.target.tagName === 'LABEL') {
      inputTag = e.target.previousElementSibling;
    } else if (e.target.tagName === 'DT' || e.target.tagName === 'DD') {
      inputTag = e.target.parentNode.parentNode.children[0].children[0];
    } else if (e.target.tagName === 'DL') {
      inputTag = e.target.previousElementSibling.children[0];
    } else if (e.target.tagName === 'DIV') {
      inputTag = e.target.children[0].children[0];
    } else if (e.target.tagName === 'SPAN') {
      inputTag =
        e.target.parentNode.parentNode.parentNode.children[0].children[0];
    }

    if (!inputTag.checked) {
      if (this.selectedFiles.length === 6) {
        this.alertAction({
          type: 'warning',
          isShow: true,
          msg: '파일 선택은 최대 6개까지 할 수 있습니다.',
        }).then(() => {});
      } else {
        this.selectedFiles.push(file);
        inputTag.checked = true;
      }
    } else {
      inputTag.checked = false;
      this.selectedFiles = this.selectedFiles.filter((selectedFile) => {
        return selectedFile._id !== file._id;
      });
    }
  }

  getData() {
    return this.selectedFiles;
  }
}
</script>

<style scoped></style>
