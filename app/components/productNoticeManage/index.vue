<template>
  <div class="container-panel">
    <div class="view-top">
      <h1 class="tit-con-text">
        {{ $store.state.product.product.productName
        }}<span> 공지사항 관리</span>
      </h1>
    </div>
    <div class="gray-info-box mgt-20 mgb-60">
      <ul class="box-notice">
        <li @mouseleave="mouseLeaveToOtherArea">
          <div class="ui-select w-170">
            <select ref="category" title="품목형태" class="off" tabindex="-1">
              <option value="NEW" :selected="selectedCategory === 'NEW'"
                >NEW</option
              >
              <option value="UPDATE" :selected="selectedCategory === 'UPDATE'"
                >UPDATE</option
              >
              <option value="PATCH" :selected="selectedCategory === 'PATCH'"
                >PATCH</option
              >
              <option
                value="RECOMMENDED"
                :selected="selectedCategory === 'RECOMMENDED'"
                >RECOMMENDED</option
              >
              <option value="SAMPLE" :selected="selectedCategory === 'SAMPLE'"
                >SAMPLE</option
              >
            </select>
            <button
              type="button"
              class="ui-select-btn"
              :class="{ on: categoryBtnClick }"
              title="품목형태 선택"
              @click="categoryBtnClick = !categoryBtnClick"
            >
              {{ selectedCategory }}
            </button>
            <div class="ui-select-wrap" :class="{ on: categoryBtnClick }">
              <strong class="ui-select-tit" tabindex="0">품목 선택</strong>
              <div class="ui-select-options">
                <button
                  type="button"
                  class="ui-select-opt selected"
                  value="NEW"
                  @click="clickCategory('NEW')"
                >
                  <b class="ui-select-txt">NEW</b>
                </button>
                <button
                  type="button"
                  class="ui-select-opt"
                  value="UPDATE"
                  @click="clickCategory('UPDATE')"
                >
                  <b class="ui-select-txt">UPDATE</b>
                </button>
                <button
                  type="button"
                  class="ui-select-opt"
                  value="PATCH"
                  @click="clickCategory('PATCH')"
                >
                  <b class="ui-select-txt">PATCH</b>
                </button>
                <button
                  type="button"
                  class="ui-select-opt"
                  value="RECOMMENDED"
                  @click="clickCategory('RECOMMENDED')"
                >
                  <b class="ui-select-txt">RECOMMENDED</b>
                </button>
                <button
                  type="button"
                  class="ui-select-opt"
                  value="SAMPLE"
                  @click="clickCategory('SAMPLE')"
                >
                  <b class="ui-select-txt">SAMPLE</b>
                </button>
              </div>
            </div>
          </div>
          <input
            ref="noticeTitle"
            type="text"
            class="inp-base w-170"
            placeholder="키워드"
          />
          <input
            ref="noticeDescription"
            type="text"
            class="inp-base w-506"
            placeholder="설명"
          />
        </li>
        <li>
          <label class="txt-right w-170" style="display: inline-block;"
            >연결문서</label
          >
          <input
            ref="filePath"
            type="text"
            placeholder="/docs"
            class="inp-base"
            style="width: 578px;"
            readonly
          />
          <button
            type="button"
            class="dbs-icon-button notice"
            @click="openDocPageSearchModal"
          ></button>
          <button
            type="button"
            class="dbs-icon-button ico-left small plus"
            @click="noticeRegister"
          >
            추가
          </button>
        </li>
      </ul>
    </div>
    <h3 class="tit-con-sub mgb-15">
      공지사항
    </h3>
    <ul class="dbs-list drag-drop mgb-80">
      <draggable
        v-model="localNoticeList"
        group="category"
        handle=".btn-dragdrop"
        @change="draggableChange"
      >
        <li
          v-for="notice in localNoticeList"
          :key="notice.writeTime"
          class="list-row"
        >
          <div class="project-detail">
            <div class="btn-dragdrop"></div>
            <div class="project-wrap">
              <div class="project-title">
                <p>
                  <i
                    class="flag"
                    :class="{
                      patch: notice.category === 'PATCH',
                      recommended: notice.category === 'RECOMMENDED',
                      new: notice.category === 'NEW',
                      sample: notice.category === 'SAMPLE',
                      updated: notice.category === 'UPDATE',
                    }"
                    >{{ notice.category }}</i
                  >{{ notice.noticeTitle }}
                </p>
                <span class="info">{{ notice.noticeDescription }}</span>
              </div>
              <div class="project-description">
                <p class="dbs-icon-button ico-left ico-contents link">
                  {{ notice.filePath }}
                </p>
              </div>
            </div>
            <div class="project-controls">
              <div class="update-note">
                <p>{{ notice.writeTime }}</p>
                <p>{{ notice.writer }}</p>
              </div>
              <button
                type="button"
                class="dbs-icon-button ico-left small delete"
                @click="noticeDelete(notice)"
              >
                삭제
              </button>
            </div>
          </div>
        </li>
      </draggable>
    </ul>
    <modal-component
      :modal-title="docPageSearchModalTitle"
      :modal-name="docPageSearchModalName"
      :modal-height="docPageSearchModalHeight"
      :modal-width="docPageSearchModalWidth"
      @emit-confirm="docPageSearchModalConfirm"
    >
      <doc-search-modal
        slot="modalContent"
        ref="docPageSearchModal"
      ></doc-search-modal>
    </modal-component>
  </div>
</template>
<script lang="ts">
import draggable from 'vuedraggable';
import { Vue, Component, namespace } from 'nuxt-property-decorator';
import ModalComponent from '@/components/common/modal/modalComponent.vue';
import DocSearchModal from '@/components/productEdit/DocSearchModal.vue';
import * as notice from '@/store/modules/notice';
import * as repository from '@/store/modules/repository';
import { IAlert } from '@/store/modules/common';

const Notice = namespace('notice');
const Common = namespace('common');
const Repository = namespace('repository');

@Component({
  components: {
    draggable,
    DocSearchModal,
    ModalComponent,
  },
})
export default class ProductNoticeManage extends Vue {
  categoryBtnClick: boolean = false;
  selectedCategory: string = 'NEW';
  selectedPageTitle: string = '';
  localNoticeList: any[] = [];

  docPageSearchModalTitle: string = '문서 탐색기';
  docPageSearchModalName: string = 'docPageSearchModal';
  docPageSearchModalHeight: string = '673px';
  docPageSearchModalWidth: string = '700px';

  @Notice.Action('getNoticeList') getNoticeListAction;
  @Notice.Action('noticeRegister') noticeRegisterAction;
  @Notice.Action('noticeDelete') noticeDeleteAction;
  @Notice.Action('updateNoticeIndex') updateNoticeIndexAction;
  @Repository.Action('getIndexMdFile') getIndexMdFileAction;
  @Common.Action('alert') alertAction!: (payload: IAlert) => Promise<any>;

  $refs!: {
    category: any;
    noticeTitle: any;
    noticeDescription: any;
    filePath: any;
    docPageSearchModal: any;
  };
  $modal!: any;

  created() {
    try {
      if (!this.$store.state.user.user.gitlabToken) {
        return;
      }
      this.getIndexMdFileAction({
        productCode: this.$route.params.productCode,
        ref: 'master',
        refType: 'targetBranch',
      });
      this.getNoticeListAction({
        productCode: this.$route.params.productCode,
      }).then(() => {
        this.localNoticeList = this.$store.state.notice.noticeList.slice();
      });
    } catch (e) {
      console.error(e);
    }
  }

  // 카테고리 변경
  clickCategory(categoryName) {
    this.selectedCategory = categoryName;
    this.categoryBtnClick = false;
  }

  // 공지사항 등록
  noticeRegister() {
    if (this.$refs.category.value === '') {
      this.alertAction({
        type: 'warning',
        isShow: true,
        msg: '카테고리를 선택해주세요.',
      }).then(() => {});
    } else if (this.$refs.noticeTitle.value === '') {
      this.alertAction({
        type: 'warning',
        isShow: true,
        msg: '키워드를 입력해주세요.',
      }).then(() => {});
    } else if (this.$refs.noticeDescription.value === '') {
      this.alertAction({
        type: 'warning',
        isShow: true,
        msg: '설명을 입력해주세요.',
      }).then(() => {});
    } else if (this.$refs.filePath.value === '') {
      this.alertAction({
        type: 'warning',
        isShow: true,
        msg: '연결문서를 선택해주세요.',
      }).then(() => {});
    } else {
      this.alertAction({
        type: 'question',
        isShow: true,
        msg: '공지사항을 등록하시겠습니까?',
      }).then(async (result) => {
        if (result.ok) {
          const currentTime: Date = new Date();
          const formattedDate: string =
            currentTime.getFullYear() +
            '-' +
            (currentTime.getMonth() + 1 > 9 ? '' : '0') +
            (currentTime.getMonth() + 1) +
            '-' +
            (currentTime.getDate() > 9 ? '' : '0') +
            currentTime.getDate() +
            ' ' +
            (currentTime.getHours() > 9 ? '' : '0') +
            currentTime.getHours() +
            ':' +
            (currentTime.getMinutes() > 9 ? '' : '0') +
            currentTime.getMinutes() +
            ':' +
            (currentTime.getSeconds() > 9 ? '' : '0') +
            currentTime.getSeconds();
          try {
            await this.noticeRegisterAction({
              productCode: this.$store.state.product.product.productCode,
              category: this.$refs.category.value,
              noticeTitle: this.$refs.noticeTitle.value,
              noticeDescription: this.$refs.noticeDescription.value,
              filePath: this.$refs.filePath.value,
              pageTitle: this.selectedPageTitle,
              writeTime: formattedDate,
              writer:
                this.$store.state.user.user.name +
                '(' +
                this.$store.state.user.user.loginId +
                ')',
            });
            this.localNoticeList = this.$store.state.notice.noticeList.slice();
            this.selectedCategory = 'NEW';
            this.$refs.noticeTitle.value = '';
            this.$refs.noticeDescription.value = '';
            this.$refs.filePath.value = '';
          } catch (e) {
            console.error(e);
          }
        }
      });
    }
  }

  // 공지사항 삭제
  noticeDelete(noticeData) {
    this.alertAction({
      type: 'question',
      isShow: true,
      msg: '공지사항을 삭제하시겠습니까?',
    }).then(async (result) => {
      if (result.ok) {
        try {
          await this.noticeDeleteAction({
            productCode: this.$store.state.product.product.productCode,
            category: noticeData.category,
            noticeTitle: noticeData.noticeTitle,
            noticeDescription: noticeData.noticeDescription,
            filePath: noticeData.filePath,
            pageTitle: noticeData.pageTitle,
            writeTime: noticeData.writeTime,
            writer: noticeData.writer,
          });
          this.localNoticeList = this.$store.state.notice.noticeList.slice();
        } catch (e) {
          console.error(e);
        }
      }
    });
  }

  // 연결문서 다이얼로그
  openDocPageSearchModal() {
    this.$modal.show(this.docPageSearchModalName);
  }

  // 연결문서 선택
  docPageSearchModalConfirm(clickConfirmBtn) {
    const selectedPageData = this.$refs.docPageSearchModal.getData();
    if (clickConfirmBtn) {
      if (selectedPageData.length === 0) {
        this.alertAction({
          type: 'warning',
          isShow: true,
          msg: '파일을 선택해주세요.',
        }).then(() => {});
        return;
      } else {
        this.$refs.filePath.value = selectedPageData[0].states.path;
        this.selectedPageTitle = selectedPageData[0].text;
      }
    }
    this.$modal.hide(this.docPageSearchModalName);
  }

  // 순서 변경
  draggableChange() {
    this.updateNoticeIndexAction(this.localNoticeList);
  }

  // 마우스가 select box 를 벗어났을 때 select box 를 닫기 위한 함수
  mouseLeaveToOtherArea() {
    this.categoryBtnClick = false;
  }
}
</script>

<style scoped></style>
