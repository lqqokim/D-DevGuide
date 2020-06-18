<template>
  <div class="container-panel">
    <div class="view-top mgb-15">
      <h1 class="tit-con-text">문서<span>홈 화면 관리</span></h1>
    </div>
    <div
      v-for="(product, productIdx) in $store.state.document.products"
      :key="product._id"
    >
      <div class="video-top">
        <p class="tit-con-sub">{{ product.productName }}</p>
        <div class="pst-button">
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
        <draggable
          v-model="localManagedDocs[productIdx]"
          group="productCode"
          handle=".dbs-icon-move"
          animation="300"
          style="display: flex;"
          @change="draggableChange(product._id, productIdx)"
        >
          <li
            v-for="(managedDoc, index) in localManagedDocs[productIdx]"
            :key="managedDoc._id"
            :class="{ 'mgl-0': index === 0 }"
          >
            <div class="thumb" style="cursor: auto;">
              <button
                type="button"
                class="dbs-icon-move horizontal"
                style="cursor: move;"
              >
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
              <dt class="title-dim">
                <i class="icon-doc" :class="managedDoc.fileExt">{{
                  managedDoc.fileExt.toUpperCase()
                }}</i
                >{{ managedDoc.docTitle }}
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
        </draggable>
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
import draggable from 'vuedraggable';
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
    draggable,
    ModalComponent,
    DocManageModal,
  },
})
export default class LibraryDownloadEdit extends Vue {
  localManagedDocs: any[] = [];

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

  created() {
    this.$store.state.document.products.forEach((product) => {
      this.localManagedDocs.push(product.managedDocs);
    });
  }

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
      }).then(() => {
        this.localManagedDocs = [];
        this.$store.state.document.products.forEach((product) => {
          this.localManagedDocs.push(product.managedDocs);
        });
      });
      this.$modal.hide(this.docManageModalName);
    } else {
      this.$modal.hide(this.docManageModalName);
    }
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
        }).then(() => {
          this.localManagedDocs = [];
          this.$store.state.document.products.forEach((product) => {
            this.localManagedDocs.push(product.managedDocs);
          });
        });
      }
    });
  }

  draggableChange(id, productIdx) {
    this.updateManagedDocAction({
      productId: id,
      managedDocs: this.localManagedDocs[productIdx],
    });
  }
}
</script>

<style scoped>
.dbs-icon-move {
  cursor: move;
}
</style>
