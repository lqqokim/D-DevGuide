<template>
  <modal
    :name="modalName"
    class="dialog-wrap"
    :height="modalHeight"
    :width="modalWidth"
  >
    <div class="dbs-dialog-title">
      <!-- modal title 영역 -->
      <h1 class="tit-dialog">{{ modalTitle }}</h1>
      <a class="pst-closed" role="button" @click="closeModal">닫기</a>
    </div>
    <!-- modal content 영역 -->
    <slot ref="modalContent" name="modalContent"></slot>
    <!-- modal footer 영역 -->
    <div class="dbs-dialog-footer">
      <div class="btn-wrap">
        <button
          type="button"
          class="dbs-icon-button text"
          @click="onClickModalButton(true)"
        >
          확인
        </button>
        <button
          type="button"
          class="dbs-icon-button text"
          @click="onClickModalButton(false)"
        >
          취소
        </button>
      </div>
    </div>
  </modal>
</template>

<script lang="ts">
import { Vue, Component, Prop, Emit } from 'nuxt-property-decorator';

@Component
export default class modalComponent extends Vue {
  @Prop() readonly modalTitle!: string;
  // @Prop() readonly modalClasses!: Array<string>;
  @Prop() readonly modalName!: string;
  @Prop() readonly modalHeight!: string;
  @Prop() readonly modalWidth!: string;

  // @Prop() readonly selectedBranch!: object;

  $refs!: {
    modalContent: any;
  };
  $modal!: any;

  @Emit('emit-confirm')
  onClickModalButton(clickConfirmBtn) {
    return clickConfirmBtn;
  }

  closeModal() {
    // const overlay = document.getElementsByClassName('dbs-overlay')[0];
    // document.querySelector('.base-wrap').removeChild(overlay);
    this.$modal.hide(this.modalName);
  }
}
</script>

<style scoped></style>
