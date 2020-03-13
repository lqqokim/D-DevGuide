<template>
  <div class="dbs-dialog">
    <div class="gray-info-box mgb-20">
      <div class="box-desc">
        <ul class="bul-round-box">
          <li>
            <span>프로젝트 ID</span>
            {{ $store.state.product.product.projectId }}
          </li>
        </ul>
      </div>
      <div class="box-desc">
        <ul class="bul-round-box">
          <li><span>브랜치</span> {{ $store.state.repository.currentRef }}</li>
        </ul>
      </div>
    </div>
    <div class="dialog-form mgb-10">
      <p class="fr">
        <button
          type="button"
          class="dbs-icon-button ico-left small upload"
          @click="fileUploadToGit"
        >
          업로드
        </button>
      </p>
    </div>
    <div class="dialog-flex" style="height: 336px;">
      <div class="dialog-menu-tree">
        <tree
          ref="repositoryTree"
          :options="treeOptions"
          @node:clicked="clickTree"
        >
          <div slot-scope="{ node }">
            {{ node.text }}
          </div>
        </tree>
      </div>
      <div class="menu-file">
        <div class="tbl-wrap bdr-bot-none">
          <table class="tbl-write-ver no-line tbl-fixed">
            <colgroup>
              <col style="width: auto;" />
              <col style="width: 20%;" />
            </colgroup>
            <thead>
              <tr>
                <th class="tx-left">파일명</th>
                <th>용량</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(child, index) in selectedNode.children"
                :key="child.states.path"
              >
                <td v-if="child.states.type === 'blob'" class="txt-left">
                  <div class="dbs-checkbox-wrapper">
                    <input
                      :id="'uiCheck' + child.text + index"
                      type="checkbox"
                      :name="'uiCheck' + child.text + index"
                      :checked="selectedFilePath.includes(child.states.path)"
                      @click="onClickCheckBox(child.states.path)"
                    />
                    <label
                      :for="'uiCheck' + child.text + index"
                      class="dbs-checkbox"
                      v-html="cutStr(child.text)"
                    >
                    </label>
                  </div>
                </td>
                <td v-if="child.states.type === 'blob'" class="txt-data">
                  {{ child.states.size }}KB
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, namespace } from 'nuxt-property-decorator';
import { TreeNode } from '@/store/modules/repository';
import { IAlert } from '@/store/modules/common';

const Repository = namespace('repository');
const Common = namespace('common');

@Component
export default class FileUploadModal extends Vue {
  @Repository.Action('uploadFile') uploadFileAction;
  @Repository.Action('getRepository') getRepositoryAction;
  @Repository.Action('getFileSize') getFileSizeAction;
  @Repository.Action('getBlobFileSize') getBlobFileSizeAction;
  @Repository.Action('getProjectInfo') getProjectInfoAction;
  @Common.Action('alert') alertAction!: (payload: IAlert) => Promise<any>;

  $refs!: {
    repositoryTree: any;
    fileUploadPath: any;
  };
  treeOptions = {
    propertyNames: {
      text: 'name',
      children: 'children',
      state: 'data',
      data: 'path',
    },
    fetchData: this.fetchData(),
  };
  selectedNode: TreeNode = {
    id: '',
    states: {
      selected: false,
      selectable: false,
      checked: false,
      expanded: false,
      disabled: false,
      visible: false,
      editable: false,
      draggable: false,
      type: '',
      path: '',
      size: 0,
    },
    children: [],
    isBatch: false,
    isEditing: false,
    text: '',
  };
  selectedFilePath: Array<string> = [];
  repositoryDocPathData = this.$store.state.repository.repositoryData.slice();

  fetchData() {
    this.repositoryDocPathData = this.$store.state.repository.repositoryData.slice();

    this.getFileSizeAction({
      projectId: this.$store.state.product.product.projectId,
      ref: this.$store.state.repository.currentRef,
      repositoryData: this.repositoryDocPathData,
    }).then(() => {
      this.$refs.repositoryTree.tree.setModel(this.repositoryDocPathData);
      if (this.$refs.repositoryTree.selected()[0]) {
        this.selectedNode = this.$refs.repositoryTree.selected()[0];
      } else {
        this.selectedNode = this.$refs.repositoryTree.tree.model[0];
      }
      return this.repositoryDocPathData;
      // this.$refs.repositoryTree.tree.setModel(this.repositoryDocPathData);
      // this.selectedNode.children = this.$refs.repositoryTree.tree.model.slice();
      // return this.repositoryDocPathData;
    });
  }

  clickTree(node) {
    this.selectedNode = node;
  }

  fileUploadToGit() {
    if (this.selectedNode.id === undefined) {
      this.alertAction({
        type: 'warning',
        isShow: true,
        msg: '폴더를 선택해주세요.',
      }).then(() => {});
      return;
    }
    const input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.setAttribute('ref', 'fileUploadPath');
    input.click();

    let fileData!: File;

    // @ts-ignore
    input.addEventListener('change', (e: InputEvent<HTMLInputElement>) => {
      fileData = e.path[0].files[0];
      this.uploadFile(fileData);
    });
  }

  uploadFile(fileData: File) {
    this.uploadFileAction({
      projectId: this.$store.state.product.product.projectId,
      branchName: this.$store.state.repository.currentRef,
      file: fileData,
      gitlabToken: this.$store.state.user.user.gitlabToken,
      uploadPath: this.selectedNode.states.path,
    })
      .then((res) => {
        if (res.success && res.data) {
          this.getRepositoryAction({
            productCode: this.$store.state.product.product.productCode,
            ref: this.$store.state.repository.currentRef,
            // useDocPath: true,
            gitlabToken: this.$store.state.user.user.gitlabToken,
          }).then(() => {
            this.repositoryDocPathData = [];
            this.repositoryDocPathData = this.$store.state.repository.repositoryDocPathData;

            this.getBlobFileSizeAction({
              projectId: this.$store.state.product.product.projectId,
              ref: this.$store.state.repository.currentRef,
              filePath: this.selectedNode.states.path + '/' + fileData.name,
            }).then((blobData) => {
              let appendNode!: TreeNode;
              if (this.selectedNode.text === '') {
                appendNode = this.$refs.repositoryTree.append({
                  text: fileData.name,
                });
              } else {
                appendNode = this.$refs.repositoryTree.append(
                  this.selectedNode,
                  {
                    text: fileData.name,
                  }
                );
              }

              appendNode.states.size = Math.round(blobData.size / 1024);
              appendNode.states.path =
                this.selectedNode.states.path + '/' + fileData.name;
              appendNode.states.type = 'blob';
              appendNode.states.visible = false;
              if (this.selectedNode.text === '') {
                this.selectedNode.children = this.$refs.repositoryTree.tree.model.slice();
              }
            });
          });
        }
      })
      .catch((err) => {
        console.error(err);
      });
  }

  cutStr(orgText) {
    let count = 0;
    let returnText = orgText;
    for (let idx = 0; idx < orgText.length; idx++, count++) {
      // const currentByte = orgText.charCodeAt(idx);
      // currentByte > 128 ? (count += 2) : count++;
      if (count > 30) {
        // TODO 수정 필요
        const splitStr = orgText.split('.');
        returnText =
          '<span class="file-name" data-filetype=".' +
          splitStr[splitStr.length - 1] +
          '"><em>' +
          returnText +
          '</em></span>';
        break;
      }
    }
    return returnText;
  }

  onClickCheckBox(filePath) {
    this.selectedFilePath.includes(filePath)
      ? this.selectedFilePath.splice(this.selectedFilePath.indexOf(filePath), 1)
      : this.selectedFilePath.push(filePath);
  }

  getData() {
    return this.selectedFilePath;
  }
}
</script>

<style scoped></style>
