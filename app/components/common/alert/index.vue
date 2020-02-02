<template>
  <div>
    <div ref="alertWrap" class="dbs-message-wrap" style="display: block;">
      <div class="message-wrap">
        <a class="pst-closed" role="button" @click="onclickCancel">닫기</a>
        <div class="dbs-message-icon" :class="checkType">
          <p class="dbs-message-sub">{{ info.msg }}</p>
        </div>
        <!-- button 영역 -->
        <div class="dbs-message-footer">
          <div class="btn-wrap">
            <template v-if="info.type === 'question'">
              <button
                type="button"
                class="dbs-icon-button text"
                @click="onclickOk"
              >
                예
              </button>
              <button
                type="button"
                class="dbs-icon-button text"
                @click="onclickCancel"
              >
                아니오
              </button>
            </template>
            <button
              v-else
              type="button"
              class="dbs-icon-button text"
              @click="onclickConfirm"
            >
              확인
            </button>
          </div>
        </div>
      </div>
    </div>
    <div class="dbs-overlay"></div>
  </div>
</template>
<script lang="ts">
import { Vue, Component, Prop, namespace } from 'nuxt-property-decorator';
import { IAlert } from '@/store/modules/common';

const Common = namespace('common');

@Component
export default class AlertComponent extends Vue {
  /**
   * check, error, information, question, warning
   */
  @Prop() readonly info!: IAlert;
  @Prop() readonly position;
  @Common.Action('alert') alertAction!: (payload: IAlert) => Promise<any>;
  @Common.Action('alertButton') alertButtonAction!: (payload: {
    ok: boolean;
    cancel: boolean;
  }) => Promise<any>;

  $refs!: {
    alertWrap: any;
  };

  get checkType() {
    return {
      [this.info.type]: true,
    };
  }

  created() {
    // document.addEventListener('click', (event) => {
    //   if (this.$refs.alertWrap) {
    //     this.$refs.alertWrap.style.marginTop = -event.clientY / 2 + 277 + 'px';
    //     this.$refs.alertWrap.style.marginLeft = -event.clientX / 2 + 250 + 'px';
    //   }
    // });
  }

  async onclickOk(): Promise<any> {
    await this.alertButtonAction({
      ok: true,
      cancel: false,
    });
  }

  async onclickConfirm(): Promise<any> {
    await this.alertButtonAction({
      ok: true,
      cancel: false,
    });
    // await this.alertAction({
    //   ...this.info,
    //   isShow: false,
    // });
  }

  async onclickCancel(): Promise<any> {
    await this.alertButtonAction({
      ok: false,
      cancel: true,
    });
    // await this.alertAction({
    //   ...this.info,
    //   isShow: false,
    // });
  }
}
</script>

<style></style>
