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
                <!-- 셀렉트박스  선택시 ui-select-wrap에 on 추가하면 display block 됨 -->
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
                placeholder="/docs"
                @input="changeManualDocPath"
              />
              <button type="button" class="dbs-icon-button file"></button>
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
                placeholder="/docs/api"
                @input="changeAPIDocPath"
              />
              <button
                type="button"
                :disabled="!apiUseFlag"
                class="dbs-icon-button file"
              ></button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
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

const Branch = namespace('branch');

@Component
export default class ProductInfo extends Vue {
  apiUseFlag: boolean = false;
  isExistProjectIdFlag: boolean = false;
  isClickedTargetBranch: boolean = false;

  // @Branch.Action('getBranchList')
  // getBranchListAction;
  @Branch.Action('getBranchNameList')
  getBranchNameListAction;
  @Branch.Mutation('setBranchNameList') setBranchNameListEmpty;

  @Prop() readonly product!: any;
  @Watch('product', { immediate: true, deep: true })
  onProductChange(val, oldVal) {
    if (val === undefined) {
      return;
    }
    this.apiUseFlag = val.apiUse;
    this.isClickedTargetBranch = false;

    console.log(this.$store.state.product.projectIdList);
    const isExistProjectId = this.$store.state.product.projectIdList.findIndex(
      (projectId) => {
        return projectId === Number(val.projectId);
      }
    );

    this.isExistProjectIdFlag = isExistProjectId !== -1;

    if (!this.isExistProjectIdFlag) {
      this.setBranchNameListEmpty([]);
    } else {
      this.getBranchNameListAction({
        projectId: Number(val.projectId),
        gitlabToken: this.$store.state.user.user.gitlabToken,
      });
    }

    if (oldVal && val.productCode !== oldVal.productCode) {
      this.emitEvent();
    }

    // this.localProduct = Object.assign({}, val);
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
    projectId: 0,
    targetBranch: '',
    manualDocPath: '',
    APIDocPath: '',
    _id: '',
    isExistProjectIdFlag: false,
  };

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
    // this.localProduct.isExistProjectIdFlag = this.isExistProjectIdFlag;
    return this.localProduct;
  }

  // @ts-ignore
  changeProjectId(e: InputEvent<HTMLInputElement>) {
    console.log('여기');
    this.localProduct.projectId = e.target.value;
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
}
</script>

<style scoped></style>
