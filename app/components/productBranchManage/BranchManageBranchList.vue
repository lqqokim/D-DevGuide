<template>
  <div>
    <div class="view-top bdr-bot-none">
      <h1 class="tit-con-sub">
        작업 브랜치<span
          >(기준 브랜치 : {{ $store.state.product.product.targetBranch }})</span
        >
      </h1>
      <div class="pst-rbtn">
        <button
          type="button"
          class="dbs-icon-button ico-left large branch-white"
          @click="showCreateBranchModal"
        >
          신규브랜치생성
        </button>
      </div>
    </div>
    <ul class="dbs-list mgb-60">
      <li
        v-for="branch in $store.state.branch.branchList"
        :key="branch.name"
        class="list-row"
      >
        <div class="project-detail">
          <div class="project-wrap">
            <div class="project-title">
              <p>{{ branch.name }}</p>
              <span class="time">{{ branch.commit.changed_time }}</span>
              <button
                v-if="!branch.can_push"
                type="button"
                class="dbs-icon-button ico-left ico-contents cont-merge access-role"
              >
                병합요청
              </button>
            </div>
            <div class="project-description">
              <p class="dbs-icon-button ico-left ico-contents change">
                {{ branch.commit.message }}
              </p>
            </div>
          </div>
          <div class="project-controls">
            <nuxt-link
              :to="{
                name: 'branchCompare',
                params: {
                  productCode: $store.state.product.product.productCode,
                  branchName: branch.name,
                },
              }"
              tag="button"
              class="dbs-icon-button ico-left small compare"
            >
              비교</nuxt-link
            ><nuxt-link
              :to="{
                name: 'editDocInit',
                params: {
                  productCode: $store.state.product.product.productCode,
                  branchName: branch.name,
                  pageType: 'Document',
                },
              }"
              tag="button"
              class="dbs-icon-button ico-left small modify"
              :disabled="!isAuthoredStaff"
            >
              수정</nuxt-link
            >
            <nuxt-link
              :to="{
                name: 'branchChangeHistory',
                params: {
                  productCode: $store.state.product.product.productCode,
                  branchName: branch.name,
                },
              }"
              tag="button"
              class="dbs-icon-button ico-left small change"
            >
              변경내역</nuxt-link
            >
            <nuxt-link
              :to="{
                name: 'branchDocViewInit',
                params: {
                  productCode: $store.state.product.product.productCode,
                  branchName: branch.name,
                  pageType: 'Document',
                  refType: 'branch',
                },
              }"
              tag="button"
              class="dbs-icon-button ico-left small document"
            >
              문서보기</nuxt-link
            ><button
              type="button"
              :disabled="!branch.can_push"
              class="dbs-icon-button ico-left small merge"
              @click="showMergeRequestModal(branch)"
            >
              병합요청
            </button>
          </div>
        </div>
      </li>
    </ul>
    <modal-component
      :modal-title="createBranchModalTitle"
      :modal-name="createBranchModalName"
      :modal-height="createBranchModalHeight"
      :modal-width="createBranchModalWidth"
      @emit-confirm="createBranchModalConfirm"
    >
      <create-branch-modal
        slot="modalContent"
        ref="createBranchModal"
      ></create-branch-modal>
    </modal-component>

    <modal-component
      :modal-title="mergeRequestModalTitle"
      :modal-name="mergeRequestModalName"
      :modal-height="mergeRequestModalHeight"
      :modal-width="mergeRequestModalWidth"
      @emit-confirm="mergeRequestModalConfirm"
    >
      <merge-request-modal
        slot="modalContent"
        ref="mergeRequestModal"
        :branch="selectedBranch"
      ></merge-request-modal>
    </modal-component>
  </div>
</template>

<script lang="ts">
import { Vue, Component, namespace } from 'nuxt-property-decorator';
import * as mergeRequest from '@/store/modules/mergeRequest';
import * as commit from '@/store/modules/commit';
// import * as branch from '@/store/modules/branch';
import CreateBranchModal from '@/components/productBranchManage/CreateBranchModal.vue';
import MergeRequestModal from '@/components/productBranchManage/MergeRequestModal.vue';
import ModalComponent from '@/components/common/modal/modalComponent.vue';
import { Commit as ICommit, Branch as IBranch } from '@/store/modules/branch';
import { IAlert } from '@/store/modules/common';

const MergeRequest = namespace('mergeRequest');
const Commit = namespace('commit');
const Branch = namespace('branch');
const Common = namespace('common');

@Component({
  components: {
    CreateBranchModal,
    MergeRequestModal,
    ModalComponent,
  },
})
export default class BranchManageBranchList extends Vue {
  @MergeRequest.Action('createMergeRequest') createMergeRequestAction;
  // @MergeRequest.Action('getMergeRequestList') getMergeRequestListAction;
  // @Commit.Action('getCommitDiff') getCommitDiffAction;
  @Branch.Action('createBranch') createBranchAction;
  @Common.Action('alert') alertAction!: (payload: IAlert) => Promise<any>;

  $modal!: any;
  $refs!: {
    createBranchModal: any;
    mergeRequestModal: any;
  };

  selectedBranch: IBranch = {
    can_push: true,
    commit: {
      author_email: '',
      author_name: '',
      authored_date: '',
      changed_time: '',
      committed_date: '',
      committed_email: '',
      committed_name: '',
      created_at: '',
      id: '',
      message: '',
      parent_ids: '',
      short_id: '',
      title: '',
    },
    name: '',
  };
  createBranchModalTitle: string = '새 브랜치 작성';
  createBranchModalName: string = 'createBranchModal';
  createBranchModalHeight: string = '320px';
  createBranchModalWidth: string = '700px';

  mergeRequestModalTitle: string = '병합 요청';
  mergeRequestModalName: string = 'mergeRequestModal';
  mergeRequestModalHeight: string = '445px';
  mergeRequestModalWidth: string = '700px';

  isAuthoredStaff: boolean = false;

  created() {
    if (
      this.$store.state.user.user.authority !== 'M' &&
      this.$store.state.product.product.staffs.length > 0
    ) {
      this.$store.state.product.product.staffs.forEach((staff) => {
        if (
          staff.empId === this.$store.state.user.user.loginId &&
          staff.writeAuthority
        ) {
          this.isAuthoredStaff = true;
        }
      });
    }
    if (
      this.$store.state.user.user.authority === 'A' ||
      this.$store.state.user.user.authority === 'S'
    )
      this.isAuthoredStaff = true;
  }

  // 신규 브랜치 생성
  showCreateBranchModal() {
    this.$modal.show(this.createBranchModalName);
  }

  createBranchModalConfirm(clickConfirmBtn) {
    const branchName = this.$refs.createBranchModal.getData();
    if (clickConfirmBtn) {
      // 확인 버튼 클릭 시
      if (branchName === '') {
        this.alertAction({
          type: 'warning',
          isShow: true,
          msg: 'branch 이름을 입력해주세요.',
        }).then(() => {});
        return;
      }
      const branchNameCheck = this.$store.state.branch.branchNameList.includes(
        'DOC_' + branchName
      );

      if (branchNameCheck) {
        this.alertAction({
          type: 'warning',
          isShow: true,
          msg: '중복된 이름의 branch 가 존재합니다.',
        }).then(() => {});
      } else {
        this.createBranchAction({
          projectId: this.$store.state.product.product.projectId,
          branchName: 'DOC_' + branchName,
          ref: this.$store.state.product.product.targetBranch,
          gitlabToken: this.$store.state.user.user.gitlabToken,
        });
        this.$modal.hide(this.createBranchModalName);
      }
    } else {
      // 취소 버튼 클릭 시
      this.$modal.hide(this.createBranchModalName);
    }
  }

  // 병합 요청
  showMergeRequestModal(branch) {
    this.selectedBranch = branch;
    this.$modal.show(this.mergeRequestModalName, {
      props: {
        selectedBranch: this.selectedBranch,
      },
    });
  }

  mergeRequestModalConfirm(clickConfirmBtn) {
    const mergeRequestData = this.$refs.mergeRequestModal.getData();
    if (clickConfirmBtn) {
      if (mergeRequestData[0] === '') {
        this.alertAction({
          type: 'warning',
          isShow: true,
          msg: '병합 요청 제목을 입력해주세요.',
        }).then(() => {});
        return;
      }
      if (mergeRequestData[1] === '') {
        this.alertAction({
          type: 'warning',
          isShow: true,
          msg: '병합 요청 내용을 입력해주세요.',
        }).then(() => {});
        return;
      }
      this.selectedBranch.can_push = false;
      this.createMergeRequestAction({
        projectId: this.$store.state.product.product.projectId,
        productCode: this.$store.state.product.product.productCode,
        sourceBranch: this.selectedBranch.name,
        targetBranch: this.$store.state.product.product.targetBranch,
        title: mergeRequestData[0],
        description: mergeRequestData[1],
        gitlabToken: this.$store.state.user.user.gitlabToken,
      });
      this.$modal.hide(this.mergeRequestModalName);
    } else {
      this.$modal.hide(this.mergeRequestModalName);
    }
  }
}
</script>

<style scoped></style>
