<template>
  <div class="dbs-dialog">
    <p class="tit-con-small mgb-10">
      {{ $store.state.document.selectedProduct.productName }}
    </p>
    <div class="dbs-dialog-box overflow-y" style="height: 510px;">
      <ul class="thumb-list choice x-small-document">
        <li v-for="(doc, index) in localDocsByProduct" :key="doc._id">
          <!-- checkbox가 check 되었을 시 thumb 클래스에 on 추가 -->
          <div class="thumb" @click.prevent="clickDoc($event, doc)">
            <div class="dbs-checkbox-wrapper">
              <input
                :id="'mvCheck' + index"
                type="checkbox"
                :name="'movieCheck' + index"
                :checked="checkManagedDoc(doc._id)"
              />
              <label :for="'mvCheck' + index" class="dbs-checkbox"></label>
            </div>
            <img
              :src="
                doc.thumbnailPath && doc.thumbnailPath.replace('app/static', '')
              "
              alt="document"
            />
          </div>
          <dl class="thumb-desc">
            <dt>
              <i class="icon-doc" :class="doc.fileExt">{{
                doc.fileExt.toUpperCase()
              }}</i
              >{{ doc.docTitle }}
            </dt>
            <dd>
              {{ convertDateFormat(doc.uploadDate)
              }}<span class="hit">조회 {{ doc.viewCount }}</span>
            </dd>
          </dl>
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
import { dateFormat } from '~/utils/commonFuncs';
import { IDocument, ListParams } from '@/store/modules/document';
import { IAlert } from '@/store/modules/common';

const Doc = namespace('document');
const Common = namespace('common');

@Component
export default class DocManageModal extends Vue {
  @Doc.Action('getDocsByProduct') getDocsByProductAction;
  @Common.Action('alert') alertAction!: (payload: IAlert) => Promise<any>;

  private readonly LIMIT: number = 8;

  get localDocsByProduct(): IDocument[] {
    return this.docsByProduct;
  }

  docsByProduct: IDocument[] = [];
  selectedDocs: IDocument[] = [];

  isViewMore: boolean = true;
  countMore: number = 1;
  total!: number;

  created() {
    this.total = this.$store.state.document.totalSize;
    this.docsByProduct = this.$store.state.document.docsByProduct;

    if (this.total <= this.LIMIT) {
      this.isViewMore = false;
    }

    this.selectedDocs = this.$store.state.document.selectedProduct.managedDocs.slice();
  }

  async onClickMoreView(): Promise<any> {
    this.countMore++;

    const params: ListParams = {
      skip: this.localDocsByProduct.length,
      limit: 4,
      sort: '-uploadDate',
    };

    await this.getDocsByProductAction({
      data: this.$store.state.document.selectedProduct,
      params,
    });

    this.docsByProduct = this.localDocsByProduct.concat(
      this.$store.state.document.docsByProduct
    );

    // 마지막 페이지일 경우 더보기 버튼 hide
    if (Math.ceil(this.total / this.LIMIT) === this.countMore) {
      this.isViewMore = false;
    }
  }

  checkManagedDoc(id) {
    let isManaged = false;
    this.$store.state.document.selectedProduct.managedDocs.forEach(
      (managedDoc) => {
        if (!isManaged) {
          isManaged = managedDoc._id === id;
        }
      }
    );
    return isManaged;
  }

  clickDoc(e, doc) {
    let inputTag!: any;

    if (e.target.tagName === 'INPUT') {
      inputTag = e.target;
    } else if (e.target.tagName === 'LABEL') {
      inputTag = e.target.previousElementSibling;
    } else if (e.target.tagName === 'IMG') {
      inputTag = e.target.previousElementSibling.children[0];
    }

    if (!inputTag.checked) {
      if (this.selectedDocs.length === 5) {
        this.alertAction({
          type: 'warning',
          isShow: true,
          msg: '문서 선택은 최대 5개까지 할 수 있습니다.',
        }).then(() => {});
      } else {
        this.selectedDocs.push(doc);
        inputTag.checked = true;
      }
    } else {
      inputTag.checked = false;
      this.selectedDocs = this.selectedDocs.filter((selectedVideo) => {
        return selectedVideo._id !== doc._id;
      });
    }
  }

  convertDateFormat(time): string {
    return dateFormat(time);
  }

  getData() {
    return this.selectedDocs;
  }
}
</script>

<style scoped></style>
