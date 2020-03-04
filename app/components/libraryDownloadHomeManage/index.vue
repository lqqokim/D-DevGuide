<template>
  <div class="container-panel">
    <div class="view-top mgb-20">
      <h1 class="tit-con-text">다운로드<span>홈 화면 관리</span></h1>
    </div>
    <div
      v-for="(product, productIdx) in $store.state.download.products"
      :key="product._id"
    >
      <div class="view-top bdr-bot-none">
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
      <ul class="dbs-list drag-drop moving mgb-60">
        <draggable
          v-model="localManagedFiles[productIdx]"
          group="productCode"
          handle=".btn-dragdrop"
          animation="300"
          @change="draggableChange(product._id, productIdx)"
        >
          <li
            v-for="managedFile in localManagedFiles[productIdx]"
            :key="managedFile._id"
            class="list-row"
            style="cursor: auto;"
          >
            <div class="project-detail">
              <div class="btn-dragdrop" style="cursor: move;"></div>
              <div class="project-wrap">
                <div class="project-title">
                  <p>{{ managedFile.fileTitle }}</p>
                </div>
                <div class="user-info">
                  <span class="file-name" data-filetype=".zip"
                    ><em>{{ managedFile.originFileName }}</em></span
                  ><span>{{ Math.round(managedFile.size / 1024) }}KB</span
                  ><span>다운로드 {{ managedFile.downloadCount }}</span>
                </div>
              </div>
              <div class="project-controls">
                <button
                  type="button"
                  class="dbs-icon-button ico-left small delete"
                  @click="removeManagedFiles(product, managedFile)"
                >
                  삭제
                </button>
              </div>
            </div>
          </li>
        </draggable>
      </ul>
    </div>
    <modal-component
      :modal-title="downloadManageModalTitle"
      :modal-name="downloadManageModalName"
      :modal-height="downloadManageModalHeight"
      :modal-width="downloadManageModalWidth"
      @emit-confirm="downloadManageModalConfirm"
    >
      <download-manage-modal
        slot="modalContent"
        ref="downloadManageModal"
      ></download-manage-modal>
    </modal-component>
  </div>
</template>
<script lang="ts">
import draggable from 'vuedraggable';
import { Vue, Component, namespace } from 'nuxt-property-decorator';
import ModalComponent from '@/components/common/modal/modalComponent.vue';
import DownloadManageModal from '@/components/libraryDownloadHomeManage/DownloadManageModal.vue';
import { IProduct, ListParams, IFile, IStaff } from '@/store/modules/download';
import { IAlert } from '@/store/modules/common';

const Common = namespace('common');
const Download = namespace('download');

@Component({
  components: {
    draggable,
    ModalComponent,
    DownloadManageModal,
  },
})
export default class LibraryDownloadHomeManage extends Vue {
  localManagedFiles: any[] = [];

  @Common.Action('alert') alertAction!: (payload: IAlert) => Promise<any>;
  @Download.Action('getFilesByProduct') getFilesByProductAction;
  @Download.Action('productByCode') productByCodeAction;
  @Download.Action('updateManagedFiles') updateManagedFilesAction;

  $refs!: {
    downloadManageModal: any;
  };

  $modal!: any;

  downloadManageModalTitle: string = '다운로드 선택';
  downloadManageModalName: string = 'downloadManageModal';
  downloadManageModalHeight: string = '684px';
  downloadManageModalWidth: string = '826px';

  created() {
    this.$store.state.download.products.forEach((product) => {
      this.localManagedFiles.push(product.managedFiles);
    });
  }

  downloadManageModalConfirm(clickConfirmBtn) {
    if (clickConfirmBtn) {
      const selectedFiles = this.$refs.downloadManageModal.getData();

      this.updateManagedFilesAction({
        productId: this.$store.state.download.selectedProduct._id,
        managedFiles: selectedFiles,
      }).then(() => {
        this.localManagedFiles = [];
        this.$store.state.download.products.forEach((product) => {
          this.localManagedFiles.push(product.managedFiles);
        });
      });
      this.$modal.hide(this.downloadManageModalName);
    } else {
      this.$modal.hide(this.downloadManageModalName);
    }
  }

  async onClickAddButton(product: IProduct) {
    await this.productByCodeAction(product.productCode);

    await this.getFilesByProductAction({
      data: product,
      params: {
        params: {
          limit: 5,
          skip: 0,
          sort: '-uploadDate',
        },
      },
    }).then(() => {});

    this.$modal.show(this.downloadManageModalName);
  }

  removeManagedFiles(product, fileData) {
    this.alertAction({
      type: 'question',
      isShow: true,
      msg: '선택하신 파일을 홈 화면 관리에서 삭제하시겠습니까?',
    }).then((result) => {
      if (result.ok) {
        const newData = product.managedFiles.filter((file) => {
          return file._id !== fileData._id;
        });
        this.updateManagedFilesAction({
          productId: product._id,
          managedFiles: newData,
        }).then(() => {
          this.localManagedFiles = [];
          this.$store.state.download.products.forEach((product) => {
            this.localManagedFiles.push(product.managedFiles);
          });
        });
      }
    });
  }

  draggableChange(id, productIdx) {
    this.updateManagedFilesAction({
      productId: id,
      managedFiles: this.localManagedFiles[productIdx],
    });
  }
}
</script>

<style lang="css" scoped></style>
