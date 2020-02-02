<template>
  <div class="dbs-dialog">
    <div class="gray-info-box">
      <p>
        <span class="font-accent-color">{{
          $store.state.product.product.productName
        }}</span>
        제품의 기준 브랜치인
        <strong>{{ $store.state.product.product.targetBranch }}</strong>
        브랜치에 <strong>{{ branch.name }}</strong> 브랜치의 병합을 요청합니다.
      </p>
    </div>
    <div class="dialog-form mgt-20">
      <p>
        <label>제목</label>
        <input ref="mergeRequestTitle" type="text" class="inp-base" />
      </p>
      <p class="mgt-5">
        <label>설명</label>
        <textarea
          ref="mergeRequestDescription"
          style="resize: none; height: 120px;"
        ></textarea>
      </p>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'nuxt-property-decorator';

@Component
export default class MergeRequestModal extends Vue {
  @Prop() readonly branch!: object;

  $refs!: {
    mergeRequestTitle: HTMLInputElement;
    mergeRequestDescription: HTMLInputElement;
  };

  getData() {
    return [
      this.$refs.mergeRequestTitle.value,
      this.$refs.mergeRequestDescription.value,
    ];
  }
}
</script>

<style scoped></style>
