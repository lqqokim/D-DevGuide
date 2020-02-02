<template>
  <div class="container-panel">
    <div class="view-top mgb-15">
      <h1 class="tit-con-text">문서<span>홈 화면 관리</span></h1>
    </div>
    <div v-for="product in $store.state.document.products" :key="product._id">
      <div class="video-top">
        <p class="tit-con-sub">{{ product.productName }}</p>
        <div class="pst-button">
          <button
            type="button"
            class="dbs-icon-button ico-left small horizontal"
          >
            이동
          </button>
          <button
            type="button"
            class="dbs-icon-button ico-left small plus"
            @click="onClickAddButton(product)"
          >
            추가
          </button>
        </div>
      </div>
      <ul class="thumb-list x-document moving mgt-20 mgb-60">
        <li
          v-for="(managedDoc, index) in product.managedDocs"
          :key="managedDoc._id"
          :class="{ 'mgl-0': index === 0 }"
        >
          <div class="thumb">
            <button type="button" class="dbs-icon-move horizontal">
              좌우 이동
            </button>
            <img
              :src="
                managedDoc.thumbnailPath &&
                  managedDoc.thumbnailPath.replace('app/static', '')
              "
              alt="document"
            />
          </div>
          <dl class="thumb-desc">
            <!-- TO DO 두줄 이상인 경우 말줄임으로 나오게 해주세요 -->
            <dt style="word-break: break-all;">
              <i class="icon-doc" :class="managedDoc.fileExt">{{
                managedDoc.fileExt.toUpperCase()
              }}</i
              >{{ cutStr(managedDoc.docTitle) }}
            </dt>
            <dd>
              {{ convertDateFormat(managedDoc.uploadDate)
              }}<span class="administer"
                ><a
                  class="font-accent-color"
                  @click="removeManagedDocs(product, managedDoc)"
                  >삭제</a
                ></span
              >
            </dd>
          </dl>
        </li>
      </ul>
    </div>
    <modal-component
      :modal-title="docManageModalTitle"
      :modal-name="docManageModalName"
      :modal-height="docManageModalHeight"
      :modal-width="docManageModalWidth"
      @emit-confirm="docManageModalConfirm"
    >
      <doc-manage-modal
        slot="modalContent"
        ref="docManageModal"
      ></doc-manage-modal>
    </modal-component>
  </div>
</template>
<script lang="ts">
import { Vue, Component, namespace } from 'nuxt-property-decorator';
import { dateFormat } from '~/utils/commonFuncs';
import { IDocument, ListParams } from '@/store/modules/document';
import ModalComponent from '@/components/common/modal/modalComponent.vue';
import DocManageModal from '@/components/libraryDocHomeManage/DocManageModal.vue';
import { IAlert } from '@/store/modules/common';

const Doc = namespace('document');
const Common = namespace('common');

@Component({
  components: {
    ModalComponent,
    DocManageModal,
  },
})
export default class LibraryDownloadEdit extends Vue {
  @Doc.Action('getDocsByProduct') getDocsByProductAction;
  @Doc.Action('updateManagedDoc') updateManagedDocAction;
  @Common.Action('alert') alertAction!: (payload: IAlert) => Promise<any>;

  $refs!: {
    docManageModal: any;
  };

  $modal!: any;

  docManageModalTitle: string = '문서 선택';
  docManageModalName: string = 'docManageModal';
  docManageModalHeight: string = '734px';
  docManageModalWidth: string = '826px';

  // docType(doc: IDocument): string[] {
  //   console.log(doc);
  //   return [`btn-${doc.fileExt}`];
  // }

  async onClickAddButton(product) {
    await this.getDocsByProductAction({
      data: product,
      params: {
        limit: 8,
        skip: 0,
        sort: '-uploadDate',
      },
    }).then(() => {});

    this.$modal.show(this.docManageModalName);
  }

  docManageModalConfirm(clickConfirmBtn) {
    if (clickConfirmBtn) {
      const selectedDocs = this.$refs.docManageModal.getData();

      this.updateManagedDocAction({
        productId: this.$store.state.document.selectedProduct._id,
        managedDocs: selectedDocs,
      });
      this.$modal.hide(this.docManageModalName);
    } else {
      this.$modal.hide(this.docManageModalName);
    }
  }

  cutStr(orgText): void {
    let count = 0;
    let returnText = orgText;
    for (let idx = 0; idx < orgText.length; idx++) {
      const currentByte = orgText.charCodeAt(idx);
      currentByte > 128 ? (count += 2) : count++;
      if (count > 40) {
        returnText = orgText.substr(0, idx - 1) + '...';
        break;
      }
    }

    return returnText;
  }

  convertDateFormat(time): string {
    return dateFormat(time);
  }

  removeManagedDocs(product, docData) {
    this.alertAction({
      type: 'question',
      isShow: true,
      msg: '선택하신 문서를 홈 화면 관리에서 삭제하시겠습니까?',
    }).then((result) => {
      if (result.ok) {
        const newData = product.managedDocs.filter((doc) => {
          return doc._id !== docData._id;
        });
        this.updateManagedDocAction({
          productId: product._id,
          managedDocs: newData,
        });
      }
    });
  }
}
</script>

<style scoped></style>
