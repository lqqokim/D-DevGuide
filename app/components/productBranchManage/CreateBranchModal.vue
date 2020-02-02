<template>
  <div class="dbs-dialog">
    <div class="gray-info-box mgb-20">
      <p>
        <span class="font-accent-color">{{
          $store.state.product.product.productName
        }}</span>
        제품의 기준 브랜치인
        <strong>{{ $store.state.product.product.targetBranch }}</strong>
        브랜치에서 새로운 브랜치를 생성합니다. <br />브랜치 명은 영문으로
        작성해주세요.
      </p>
    </div>
    <div class="dialog-form">
      <p>
        <label>브랜치 명</label>
        <input
          id="branchName"
          ref="branchName"
          type="text"
          name="branchName"
          class="inp-base"
        />
      </p>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator';

@Component
export default class BranchManageModal extends Vue {
  test: string = '';
  $refs!: {
    branchName: HTMLInputElement;
  };

  getData() {
    return this.$refs.branchName.value;
  }
}
</script>

<style scoped></style>
