<template>
  <div>
    <h3 class="tit-con-sub mgb-15">
      병합 요청<span
        >(기준 브랜치 : {{ $store.state.product.product.targetBranch }})</span
      >
    </h3>
    <ul class="dbs-list mgb-80">
      <li
        v-for="mergeRequest in $store.state.mergeRequest.mergeRequestList"
        :key="mergeRequest.id"
        class="list-row"
      >
        <div class="project-detail">
          <div class="project-wrap">
            <div class="project-title">
              <p>{{ mergeRequest.title }}</p>
              <span class="time"
                >{{ mergeRequest.source_branch }} >
                {{ mergeRequest.target_branch }}</span
              >
            </div>
            <div class="project-description">
              <p>
                {{ mergeRequest.description }}
              </p>
            </div>
          </div>
          <div class="project-controls">
            <nuxt-link
              :to="{
                name: 'mergeRequestCompare',
                params: {
                  productCode: $store.state.product.product.productCode,
                  branchName: mergeRequest.source_branch,
                  mergeRequestIId: mergeRequest.iid,
                },
              }"
              tag="button"
              class="dbs-icon-button ico-left small compare"
            >
              비교</nuxt-link
            ><button
              type="button"
              class="dbs-icon-button ico-left small confirm"
              :disabled="!isAuthoredStaff"
              @click="acceptMergeRequest(mergeRequest)"
            >
              승인</button
            ><button
              type="button"
              class="dbs-icon-button ico-left small cancel"
              :disabled="!isAuthoredStaff"
              @click="closeMergeRequest(mergeRequest)"
            >
              취소
            </button>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { Vue, Component, namespace } from 'nuxt-property-decorator';
import * as mergeRequest from '@/store/modules/mergeRequest';
import * as branch from '@/store/modules/branch';
import { IAlert } from '@/store/modules/common';

const MergeRequest = namespace('mergeRequest');
const Branch = namespace('branch');
const Common = namespace('common');

@Component
export default class BranchManageMergeRequest extends Vue {
  @MergeRequest.Action('removeMergeRequest') removeMergeRequestAction;
  @MergeRequest.Action('acceptMergeRequest') acceptMergeRequestAction;
  @Branch.Action('getBranchList') getBranchListAction;
  @Common.Action('alert') alertAction!: (payload: IAlert) => Promise<any>;

  isAuthoredStaff: boolean = false;

  created() {
    if (!this.$store.state.user.user.gitlabToken) {
      return;
    }

    if (
      this.$store.state.user.user.authority !== 'M' &&
      this.$store.state.product.product.staffs.length > 0
    ) {
      this.$store.state.product.product.staffs.forEach((staff) => {
        if (
          staff.empId === this.$store.state.user.user.loginId &&
          staff.mergeAuthority
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

  // 승인 버튼 클릭 시
  acceptMergeRequest(mergeRequest) {
    this.alertAction({
      type: 'question',
      isShow: true,
      msg: '병합 요청을 승인하시겠습니까?',
    }).then(async (result) => {
      if (result.ok) {
        await this.acceptMergeRequestAction({
          projectId: this.$store.state.product.product.projectId,
          productCode: this.$store.state.product.product.productCode,
          mergeRequestIId: mergeRequest.iid,
          gitlabToken: this.$store.state.user.user.gitlabToken,
        })
          .then((mergeResult) => {
            this.alertAction({
              type: 'check',
              isShow: true,
              msg: '병합이 정상적으로 되었습니다.',
            }).then(() => {});
          })
          .catch((err) => {
            if (err.response.status === 405) {
              this.alertAction({
                type: 'warning',
                isShow: true,
                msg: '병합 중 충돌이 발생했습니다.',
              }).then(() => {});
            }
          });

        await this.getBranchListAction({
          productCode: this.$store.state.product.product.productCode,
          gitlabToken: this.$store.state.user.user.gitlabToken,
        });
      }
    });
  }

  // 취소 버튼 클릭 시
  closeMergeRequest(mergeRequest): void {
    this.alertAction({
      type: 'question',
      isShow: true,
      msg: '병합 요청을 취소하시겠습니까?',
    }).then(async (result) => {
      if (result.ok) {
        await this.removeMergeRequestAction({
          projectId: this.$store.state.product.product.projectId,
          productCode: this.$store.state.product.product.productCode,
          mergeRequestIId: mergeRequest.iid,
          gitlabToken: this.$store.state.user.user.gitlabToken,
        });

        await this.$store.state.branch.branchList.forEach((branch) => {
          if (branch.name === mergeRequest.source_branch) {
            branch.can_push = true;
          }
        });
      }
    });
  }
}
</script>

<style scoped></style>
