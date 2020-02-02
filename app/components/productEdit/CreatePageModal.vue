<template>
  <div class="dbs-dialog">
    <div class="gray-info-box mgb-20">
      <div class="box-desc">
        <ul class="bul-round-box">
          <li>
            <span>프로젝트 ID</span>
            {{ $store.state.product.product.productName }}
          </li>
          <li>
            <span>기본경로</span>
            {{ $store.state.product.product.manualDocPath }}
          </li>
        </ul>
      </div>
      <div class="box-desc">
        <ul class="bul-round-box">
          <li><span>브랜치</span> {{ $store.state.repository.currentRef }}</li>
        </ul>
      </div>
    </div>

    <div class="dialog-form">
      <p>
        <label>문서 제목</label>
        <input
          ref="docTitle"
          type="text"
          placeholder="시작하기"
          class="inp-base"
        />
      </p>
    </div>

    <div class="white-info-box mgt-10">
      <div class="radio-button-wrap">
        <p>
          <input
            id="uiChk1_1"
            type="radio"
            name="uiCheck1"
            class="dews-ui-radio"
            value="newPage"
            :checked="newPage"
            @click="onClickRadioBtn"
          />
          <label for="uiChk1_1" class="dews-radio">신규페이지 생성</label>
        </p>
        <div class="dialog-form mgt-20">
          <p>
            <label>경로</label>
            <input
              ref="newPagePath"
              type="text"
              placeholder="/docs"
              class="inp-base"
              :disabled="usePage === 'existingPage'"
            />
            <button
              type="button"
              class="dbs-icon-button file"
              :disabled="usePage === 'existingPage'"
              @click="openGitFolderSearchModal"
            ></button>
          </p>
          <p>
            <label>파일명</label>
            <input
              ref="newPageName"
              type="text"
              placeholder="newpage.md"
              class="inp-base"
              :class="{
                'status-success': !duplicatedFileName,
                'status-error': duplicatedFileName,
              }"
              :disabled="usePage === 'existingPage'"
              @input="inputFileName"
            />
          </p>
        </div>
        <p class="mgt-20">
          <input
            id="uiChk1_2"
            type="radio"
            name="uiCheck1"
            class="dews-ui-radio"
            value="existingPage"
            :checked="!newPage"
            @click="onClickRadioBtn"
          />
          <label for="uiChk1_2" class="dews-radio">기존페이지 사용</label>
        </p>
        <div class="dialog-form mgt-20">
          <p>
            <label>경로</label>
            <input
              ref="existingPagePath"
              type="text"
              class="inp-base"
              placeholder="/docs"
              :disabled="usePage === 'newPage'"
            />
            <button
              type="button"
              class="dbs-icon-button file"
              :disabled="usePage === 'newPage'"
              @click="openGitPageSearchModal"
            ></button>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, namespace, Prop } from 'nuxt-property-decorator';
import ModalComponent from '@/components/common/modal/modalComponent.vue';
import GitFolderSearchModal from '@/components/productEdit/GitFolderSearchModal.vue';
import GitPageSearchModal from '@/components/productEdit/GitPageSearchModal.vue';
import DocSearchModal from '@/components/productEdit/DocSearchModal.vue';
import * as repository from '@/store/modules/repository';

const Repository = namespace('repository');

@Component({
  components: {
    ModalComponent,
    GitFolderSearchModal,
    GitPageSearchModal,
    DocSearchModal,
  },
})
export default class CreatePageModal extends Vue {
  @Repository.Action('getFileNameList') getFileNameListAction;
  @Prop() readonly docName!: string;
  @Prop() readonly docPath!: string;
  @Prop() private newPage!: boolean;

  $modal!: any;
  $refs!: {
    docTitle: any;
    newPagePath: any;
    newPageName: any;
    existingPagePath: any;
    gitFolderSearchModal: any;
  };

  usePage: string = 'newPage';
  duplicatedFileName: boolean = false;

  gitFolderSearchModalName: string = 'gitFolderSearchModal';

  gitPageSearchModalName: string = 'gitPageSearchModal';

  onClickRadioBtn(e) {
    // this.newPage = true;
    this.usePage = e.target.value;
    console.log(this.usePage);
    if (this.usePage === 'newPage') {
      this.$refs.existingPagePath.value = '';
    } else {
      this.$refs.newPagePath.value = '';
      this.$refs.newPageName.value = '';
    }
    this.duplicatedFileName = false;
    console.log(this.$refs.existingPagePath.value);
    console.log(this.$refs.newPagePath.value);
    console.log(this.$refs.newPageName.value);
  }

  // 신규페이지 생성에서 폴더 버튼 누르면 나오는 modal
  openGitFolderSearchModal() {
    this.$modal.show(this.gitFolderSearchModalName);
  }

  openGitPageSearchModal() {
    this.$modal.show(this.gitPageSearchModalName);
  }

  created() {
    this.getFileNameListAction({
      projectId: this.$store.state.product.product.projectId,
      branchName: this.$store.state.repository.currentRef,
      path: '',
    });
    if (!this.newPage) {
      this.usePage = 'existingPage';
    }
  }

  mounted() {
    console.log(this.$refs);
    if (!this.newPage) {
      this.$refs.docTitle.value = this.docName;
      this.$refs.existingPagePath.value = this.docPath;
    }
  }

  // 20-1 page
  gitFolderSearchModalConfirm(clickConfirmBtn) {
    if (clickConfirmBtn) {
      const folderPath = this.$refs.gitFolderSearchModal.getData();
      this.$refs.newPagePath.value = folderPath;
    }
    this.$modal.hide(this.gitFolderSearchModalName);
  }

  // 22, 23 page
  gitPageSearchModalConfirm(param) {
    console.log('gitPageSearchModalConfirm');
    console.log(param);
  }

  inputFileName(e) {
    this.$store.state.repository.fileNameList.some((fileName) => {
      return (this.duplicatedFileName = fileName === e.target.value);
    });
    console.log(this.$refs.newPagePath.value);
  }

  setFolderPath(folderPath) {
    this.duplicatedFileName = false;
    this.getFileNameListAction({
      projectId: this.$store.state.product.product.projectId,
      branchName: this.$store.state.repository.currentRef,
      path: folderPath,
    });
    this.$refs.newPagePath.value = folderPath;
  }

  setFilePath(filePath) {
    this.$refs.existingPagePath.value = filePath;
  }

  getData() {
    if (this.usePage === 'newPage') {
      return [
        this.$refs.docTitle.value,
        this.$refs.newPagePath.value,
        this.$refs.newPageName.value,
      ];
    } else {
      return [this.$refs.docTitle.value, this.$refs.existingPagePath.value];
    }
  }
}
</script>

<style scoped></style>
