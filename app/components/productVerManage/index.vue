<template>
  <div class="container-panel">
    <div class="view-top">
      <h1 class="tit-con-text">
        {{ $store.state.product.product.productName }}<span>버전 관리</span>
      </h1>
    </div>
    <div class="gray-info-box mgt-20 mgb-60">
      <p>
        <span class="font-accent-color">{{
          $store.state.product.product.productName
        }}</span>
        제품의 기준 브랜치인
        <strong>{{ $store.state.product.product.targetBranch }}</strong>
        브랜치의 현재 시점을 기준으로 신규 버전을 생성합니다. <br />버전이
        생성되면
        <strong>{{ $store.state.product.product.targetBranch }}</strong>
        브랜치의 내용이 변경되어도 버전 시점의 문서를 사용자들이 확인할 수 있게
        됩니다.<br />
        생성된 버전은 Git Repository 에서 Tag로 관리됩니다.
      </p>
    </div>
    <h2 class="tit-con-sub">버전</h2>
    <ul class="dbs-list mgt-10">
      <li class="list-row bg-gray bdr-bot-none">
        <div class="project-detail">
          <div class="project-wrap">
            <div class="project-title">
              <p>Recent</p>
              <span class="time">현시점</span>
            </div>
            <div class="project-description">
              <p class="dbs-icon-button ico-left ico-contents branch">
                {{ $store.state.product.product.targetBranch }}
              </p>
            </div>
          </div>
          <div class="project-controls">
            <button
              type="button"
              :disabled="newVersionCreateFlag"
              class="dbs-icon-button ico-left large tag-white"
              @click="switchVersionCreateFlag()"
            >
              신규버젼생성
            </button>
          </div>
        </div>
      </li>
      <li v-if="newVersionCreateFlag" class="list-row bdr-bot-none">
        <div class="project-detail">
          <div class="project-wrap">
            <div class="project-title">
              <input
                ref="versionName"
                type="text"
                class="inp-base mgb-5"
                style="width: 310px;"
                placeholder="버전이름"
              />
            </div>
            <div class="project-description">
              <p class="dbs-icon-button ico-left ico-contents tag verti-md">
                DOC_
              </p>
              <input
                ref="tagName"
                type="text"
                class="inp-base"
                style="width: 238px;"
                placeholder="태그명"
              />
            </div>
          </div>
          <div class="project-controls">
            <button
              type="button"
              class="dbs-icon-button ico-left small confirm"
              @click="createVersion()"
            >
              확인</button
            ><button
              type="button"
              class="dbs-icon-button ico-left small cancel"
              @click="switchVersionCreateFlag()"
            >
              취소
            </button>
          </div>
        </div>
      </li>
    </ul>
    <ul class="dbs-list drag-drop moving mgb-80">
      <draggable
        v-model="localVersionList"
        group="tagName"
        handle=".btn-dragdrop"
        @change="draggableChange"
      >
        <li
          v-for="version in localVersionList"
          :key="version.tagName"
          class="list-row"
        >
          <div class="project-detail">
            <div class="btn-dragdrop"></div>
            <div class="project-wrap">
              <div class="project-title">
                <p>
                  <strong>{{ version.description }}</strong>
                </p>
              </div>
              <div class="project-description">
                <p class="dbs-icon-button ico-left ico-contents tag">
                  DOC_{{ version.tagName }}
                </p>
              </div>
            </div>
            <div class="project-controls">
              <div class="update-note">
                <p>{{ version.createdAt }}</p>
                <p>{{ version.authorName }}({{ version.authorID }})</p>
              </div>
              <button
                type="button"
                class="dbs-icon-button ico-left small delete"
                @click="removeVersion(version)"
              >
                삭제
              </button>
            </div>
          </div>
        </li>
      </draggable>
    </ul>
  </div>
</template>
<script lang="ts">
import draggable from 'vuedraggable';
import { Vue, Component, namespace } from 'nuxt-property-decorator';
import * as version from '@/store/modules/version';
import * as product from '@/store/modules/product';
import { IAlert } from '@/store/modules/common';

const Version = namespace('version');
const Product = namespace('product');
const Common = namespace('common');

@Component({
  components: {
    draggable,
  },
})
export default class ProductVerManage extends Vue {
  newVersionCreateFlag: boolean = false;
  localVersionList: any[] = [];

  @Version.Action('getVersionList') getVersionListAction;
  @Version.Action('createVersion') createVersionAction;
  @Version.Action('removeVersion') removeVersionAction;
  @Version.Action('updateVersionIndex') updateVersionIndexAction;
  @Product.Action('selectProduct') selectProductAction;

  @Common.Action('alert') alertAction!: (payload: IAlert) => Promise<any>;

  $refs!: {
    versionName: any;
    tagName: any;
  };

  created() {
    if (!this.$store.state.user.user.gitlabToken) {
      return;
    }

    this.selectProductAction({
      productCode: this.$route.params.productCode,
    });

    this.getVersionListAction({
      productCode: this.$route.params.productCode,
    }).then(() => {
      this.localVersionList = this.$store.state.version.versionList.slice();
    });
  }

  switchVersionCreateFlag() {
    this.newVersionCreateFlag = !this.newVersionCreateFlag;
  }

  createVersion() {
    if (this.$refs.versionName.value === '') {
      this.alertAction({
        type: 'warning',
        isShow: true,
        msg: '버전이름을 입력해주세요.',
      }).then(() => {});
    } else if (this.$refs.tagName.value === '') {
      this.alertAction({
        type: 'warning',
        isShow: true,
        msg: '태그명을 입력해주세요.',
      }).then(() => {});
    } else {
      this.alertAction({
        type: 'question',
        isShow: true,
        msg: '버전을 생성하시겠습니까?',
      }).then(async (result) => {
        if (result.ok) {
          try {
            await this.createVersionAction({
              projectId: this.$store.state.product.product.projectId,
              productCode: this.$store.state.product.product.productCode,
              versionName: this.$refs.versionName.value,
              tagName: this.$refs.tagName.value,
              ref: this.$store.state.product.product.targetBranch,
              gitlabToken: this.$store.state.user.user.gitlabToken,
            });
            this.$refs.versionName.value = '';
            this.$refs.tagName.value = '';
            this.newVersionCreateFlag = false;
            this.localVersionList = this.$store.state.version.versionList.slice();
          } catch (err) {
            console.error(err);
          }
        }
      });
    }
  }

  removeVersion(version) {
    this.alertAction({
      type: 'question',
      isShow: true,
      msg: '버전을 삭제하시겠습니까?',
    }).then(async (result) => {
      if (result.ok) {
        try {
          await this.removeVersionAction({
            projectId: this.$store.state.product.product.projectId,
            productCode: this.$store.state.product.product.productCode,
            tagName: version.tagName,
            description: version.description,
            authorName: version.authorName,
            authorID: version.authorID,
            gitlabToken: this.$store.state.user.user.gitlabToken,
          });
          this.localVersionList = this.$store.state.version.versionList.slice();
        } catch (e) {
          console.error(e);
        }
      }
    });
  }

  draggableChange() {
    this.updateVersionIndexAction(this.localVersionList);
  }
}
</script>

<style scoped></style>
