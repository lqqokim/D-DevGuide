<template>
  <div>
    <h2 class="tit-con-icon-title icon-title dews">제품정보</h2>
    <div class="tbl-wrap mgb-60">
      <table class="tbl-write tbl-fixed">
        <colgroup>
          <col style="width: 154px;" />
          <col style="width: auto;" />
        </colgroup>
        <tbody>
          <tr>
            <th scope="row">제품명</th>
            <td>
              <input
                :value="localProduct.productName"
                type="text"
                class="inp-base w-100p"
                placeholder="DEWS/UI"
                @input="changeProductName"
              />
            </td>
          </tr>
          <tr>
            <th scope="row">제품코드</th>
            <td>
              <input
                :value="localProduct.productCode"
                type="text"
                class="inp-base w-100p"
                placeholder="UI"
                @input="changeProductCode"
              />
            </td>
          </tr>
          <tr>
            <th scope="row">제품설명</th>
            <td>
              <input
                :value="localProduct.description"
                type="text"
                class="inp-base w-100p"
                placeholder="DEWS Front-end UI Framework"
                @input="changeDescription"
              />
            </td>
          </tr>
          <tr>
            <th scope="row">API 섹션 사용 여부</th>
            <td>
              <div class="dbs-checkbox-wrapper">
                <input
                  id="uiCheck1"
                  type="checkbox"
                  name="uiCheck1"
                  :checked="apiUseFlag"
                  @click="changeIsUseApiSection"
                />
                <label for="uiCheck1" class="dbs-checkbox">사용</label>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <h2 class="tit-con-icon-title icon-title gitlab">
      GitLab 리포지토리 정보
    </h2>
    <div class="tbl-wrap mgb-60">
      <table class="tbl-write tbl-fixed">
        <colgroup>
          <col style="width: 154px;" />
          <col style="width: auto;" />
        </colgroup>
        <tbody>
          <tr>
            <th scope="row">프로젝트 ID</th>
            <td>
              <input
                :value="localProduct.projectId"
                type="text"
                class="inp-base w-100p"
                :class="{
                  'status-error': !isExistProjectIdFlag,
                  'status-success': isExistProjectIdFlag,
                }"
                placeholder="DEWS15"
                @input="changeProjectId"
                @blur="checkProject"
              />
            </td>
          </tr>
          <tr>
            <th scope="row">기준 브랜치</th>
            <td>
              <div class="ui-select w-100p">
                <select title="품목형태" class="off" tabindex="-1">
                  <option
                    v-for="branch in $store.state.branch.branchNameList"
                    :key="branch"
                    :value="branch"
                    :selected="branch === localProduct.targetBranch"
                    >{{ branch }}
                  </option>
                </select>
                <button
                  type="button"
                  class="ui-select-btn"
                  :class="{ on: isClickedTargetBranch }"
                  title="품목형태 선택"
                  @click="isClickedTargetBranch = !isClickedTargetBranch"
                >
                  {{ localProduct.targetBranch }}
                </button>
                <div
                  class="ui-select-wrap"
                  :class="{ on: isClickedTargetBranch }"
                >
                  <strong class="ui-select-tit" tabindex="0">품목 선택</strong>
                  <div class="ui-select-options">
                    <button
                      v-for="branch in $store.state.branch.branchNameList"
                      :key="branch"
                      type="button"
                      class="ui-select-opt"
                      :value="branch"
                      @click="changeTargetBranch(branch)"
                    >
                      <b class="ui-select-txt">{{ branch }}</b>
                    </button>
                  </div>
                </div>
              </div>
            </td>
          </tr>
          <tr>
            <th scope="row">문서 기본 경로</th>
            <td>
              <input
                :value="localProduct.manualDocPath"
                type="text"
                class="inp-base w-269"
                placeholder="docs/document"
                @input="changeManualDocPath"
              />
              <button
                type="button"
                class="dbs-icon-button file"
                @click="openSelectDocPathModal"
              ></button>
            </td>
          </tr>
          <tr>
            <th scope="row">API 기본 경로</th>
            <td>
              <input
                :value="localProduct.APIDocPath"
                :disabled="!apiUseFlag"
                type="text"
                class="inp-base w-269"
                placeholder="docs/api"
                @input="changeAPIDocPath"
              />
              <button
                type="button"
                :disabled="!apiUseFlag"
                class="dbs-icon-button file"
                @click="openSelectAPIPathModal"
              ></button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <!-- 문서 기본 경로 탐색 다이얼로그 -->
    <modal-component
      :modal-title="selectDocPathModalTitle"
      :modal-name="selectDocPathModalName"
      :modal-height="selectDocPathModalHeight"
      :modal-width="selectDocPathModalWidth"
      @emit-confirm="selectDocPathModalConfirm"
    >
      <git-folder-search-modal
        slot="modalContent"
        ref="selectDocPathModal"
        :doc-path-flag="false"
        :project-id="localProduct.projectId"
        :current-ref="localProduct.targetBranch"
      ></git-folder-search-modal>
    </modal-component>
    <!-- API 기본 경로 탐색 다이얼로그 -->
    <modal-component
      :modal-title="selectAPIPathModalTitle"
      :modal-name="selectAPIPathModalName"
      :modal-height="selectAPIPathModalHeight"
      :modal-width="selectAPIPathModalWidth"
      @emit-confirm="selectAPIPathModalConfirm"
    >
      <git-folder-search-modal
        slot="modalContent"
        ref="selectAPIPathModal"
        :doc-path-flag="false"
        :project-id="localProduct.projectId"
        :current-ref="localProduct.targetBranch"
      ></git-folder-search-modal>
    </modal-component>
  </div>
</template>

<script lang="ts">
import {
  Component,
  Vue,
  Prop,
  Watch,
  Emit,
  namespace,
} from 'nuxt-property-decorator';
import * as branch from '@/store/modules/branch';
import * as repository from '@/store/modules/repository';
import * as product from '@/store/modules/product';
import ModalComponent from '@/components/common/modal/modalComponent.vue';
import GitFolderSearchModal from '@/components/productEdit/GitFolderSearchModal.vue';
import { IAlert } from '@/store/modules/common';

const Branch = namespace('branch');
const Common = namespace('common');
const Repository = namespace('repository');
const Product = namespace('product');

@Component({
  components: {
    ModalComponent,
    GitFolderSearchModal,
  },
})
export default class ProductInfo extends Vue {
  apiUseFlag: boolean = false;
  isExistProjectIdFlag: boolean = false;
  isClickedTargetBranch: boolean = false;

  selectDocPathModalTitle: string = 'Git 폴더 탐색기';
  selectDocPathModalName: string = 'selectDocPathModal';
  selectDocPathModalHeight: string = '673px';
  selectDocPathModalWidth: string = '700px';

  selectAPIPathModalTitle: string = 'Git 폴더 탐색기';
  selectAPIPathModalName: string = 'selectAPIPathModal';
  selectAPIPathModalHeight: string = '673px';
  selectAPIPathModalWidth: string = '700px';

  $modal!: any;

  $refs!: {
    selectDocPathModal: any;
    selectAPIPathModal: any;
  };

  @Branch.Action('getBranchNameList')
  getBranchNameListAction;
  @Branch.Mutation('setBranchNameList') setBranchNameListEmpty;
  @Common.Action('alert') alertAction!: (payload: IAlert) => Promise<any>;
  @Repository.Action('getRepository') getRepositoryAction;
  @Product.Action('checkProjectInfo') checkProjectInfoAction;

  currentProjectId: string = '';

  @Prop() readonly product!: any;
  @Watch('product', { immediate: true, deep: true })
  onProductChange(val, oldVal) {
    if (val === undefined) {
      return;
    }
    this.apiUseFlag = val.apiUse;
    this.isClickedTargetBranch = false;

    if (oldVal && val.productCode !== oldVal.productCode) {
      this.emitEvent();
    }

    this.localProduct = val;
  }

  @Emit('emit-event')
  emitEvent() {
    return true;
  }

  localProduct = {
    productName: '',
    productCode: '',
    description: '',
    apiUse: '',
    projectId: '',
    targetBranch: '',
    manualDocPath: '',
    APIDocPath: '',
    _id: '',
    isExistProjectIdFlag: false,
  };

  mounted() {
    setTimeout(() => {
      this.checkProject();
    }, 500);
  }

  checkProject() {
    this.checkProjectInfoAction({
      gitlabToken: this.$store.state.user.user.gitlabToken,
      projectId: this.localProduct.projectId,
    })
      .then((res) => {
        console.log(res);
        this.currentProjectId = this.localProduct.projectId;
        this.isExistProjectIdFlag = true;
        this.getBranchNameListAction({
          projectId: this.localProduct.projectId,
          gitlabToken: this.$store.state.user.user.gitlabToken,
        });
      })
      .catch((err) => {
        console.error(err);
        this.isExistProjectIdFlag = false;
        this.setBranchNameListEmpty([]);
      });
    // if (this.currentProjectId !== this.localProduct.projectId) {
    //
    // }
  }

  // @ts-ignore
  changeProductName(e: InputEvent<HTMLInputElement>) {
    this.localProduct.productName = e.target.value;
  }

  // @ts-ignore
  changeProductCode(e: InputEvent<HTMLInputElement>) {
    this.localProduct.productCode = e.target.value;
  }

  // @ts-ignore
  changeDescription(e: InputEvent<HTMLInputElement>) {
    this.localProduct.description = e.target.value;
  }

  // @ts-ignore
  changeIsUseApiSection(e: InputEvent<HTMLInputElement>) {
    this.localProduct.apiUse = e.target.checked;
    this.localProduct.APIDocPath = '';
    this.apiUseFlag = !this.apiUseFlag;
  }

  getProduct() {
    return [this.localProduct, this.isExistProjectIdFlag];
  }

  // @ts-ignore
  changeProjectId(e: InputEvent<HTMLInputElement>) {
    this.localProduct.projectId = e.target.value;
    this.localProduct.APIDocPath = '';
    this.localProduct.manualDocPath = '';
  }

  // @ts-ignore
  changeTargetBranch(branchName) {
    this.localProduct.targetBranch = branchName;
    this.isClickedTargetBranch = false;
  }

  // @ts-ignore
  changeManualDocPath(e: InputEvent<HTMLInputElement>) {
    this.localProduct.manualDocPath = e.target.value;
  }

  // @ts-ignore
  changeAPIDocPath(e: InputEvent<HTMLInputElement>) {
    this.localProduct.APIDocPath = e.target.value;
  }

  async openSelectDocPathModal() {
    if (!this.isExistProjectIdFlag) {
      this.alertAction({
        type: 'warning',
        isShow: true,
        msg: '유효한 프로젝트 ID 를 입력해주세요.',
      }).then(() => {});
      return;
    }
    await this.getRepositoryAction({
      projectId: this.localProduct.projectId,
      filePath: '',
      ref: this.localProduct.targetBranch,
      useDocPath: false,
    });
    this.$modal.show(this.selectDocPathModalName);
  }

  async openSelectAPIPathModal() {
    if (!this.isExistProjectIdFlag) {
      this.alertAction({
        type: 'warning',
        isShow: true,
        msg: '유효한 프로젝트 ID 를 입력해주세요.',
      }).then(() => {});
      return;
    }
    await this.getRepositoryAction({
      projectId: this.localProduct.projectId,
      filePath: '',
      ref: this.localProduct.targetBranch,
      useDocPath: false,
    });
    this.$modal.show(this.selectAPIPathModalName);
  }

  selectDocPathModalConfirm(clickConfirmBtn) {
    const folderPath = this.$refs.selectDocPathModal.getData();
    if (clickConfirmBtn && folderPath === undefined) {
      this.alertAction({
        type: 'warning',
        isShow: true,
        msg: '폴더를 선택해주세요.',
      }).then(() => {});
      return;
    }
    if (clickConfirmBtn) {
      this.localProduct.manualDocPath = folderPath.states.path;
    }
    this.$modal.hide(this.selectDocPathModalName);
  }

  selectAPIPathModalConfirm(clickConfirmBtn) {
    const folderPath = this.$refs.selectAPIPathModal.getData();
    if (clickConfirmBtn && folderPath === undefined) {
      this.alertAction({
        type: 'warning',
        isShow: true,
        msg: '폴더를 선택해주세요.',
      }).then(() => {});
      return;
    }
    if (clickConfirmBtn) {
      this.localProduct.APIDocPath = folderPath.states.path;
    }
    this.$modal.hide(this.selectAPIPathModalName);
  }
}
</script>

<style scoped></style>
