<template>
  <!--<div class="dbs-dialog-wrap w-700" style="display: none; height: 673px;">-->
  <!--<div class="dialog-wrap">-->
  <div class="dbs-dialog">
    <div class="gray-info-box mgb-20">
      <div class="box-desc">
        <ul class="bul-round-box">
          <li>
            <span>프로젝트 ID</span>
            {{ $store.state.product.product.projectId }}
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
          :data="repositoryDocPathData"
          :options="treeOptions"
          @node:dragging:start="logDragStart"
          @node:dragging:finish="logDragFinish"
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
                v-for="child in selectedNode.children"
                :key="child.states.path"
              >
                <td
                  v-if="
                    child.states.type === 'blob' &&
                      child.text.slice(-3) === '.md'
                  "
                  class="txt-left"
                  @click="selectFile(child.states.path)"
                >
                  {{ child.text }}
                </td>
                <td
                  v-if="
                    child.states.type === 'blob' &&
                      child.text.slice(-3) === '.md'
                  "
                  class="txt-data"
                >
                  {{ child.states.size }}KB
                </td>
                <!-- 글자 수가 클 때 ...으로 표현되는 부분 -->
                <!--<td class="txt-left">-->
                <!--<span class="file-name" data-filetype=".md"-->
                <!--&gt;<em-->
                <!--&gt;Search PlaceGetstaredSearch PlaceGetstaredSearch-->
                <!--PlaceGetstaredSearch PlaceGetstared.md</em-->
                <!--&gt;</span-->
                <!--&gt;-->
                <!--</td>-->
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
  <!--</div>-->
  <!--</div>-->
</template>

<script lang="ts">
import { Vue, Component, namespace } from 'nuxt-property-decorator';
import * as repository from '@/store/modules/repository';
import { IAlert } from '@/store/modules/common';

const Repository = namespace('repository');
const Common = namespace('common');

@Component
export default class FileUploadModal extends Vue {
  @Repository.Action('uploadFile') uploadFileAction;
  @Repository.Action('getRepository') getRepositoryAction;
  @Repository.Action('getFileSizeTest') getFileSizeAction;
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
    dnd: true,
    // checkbox: true,
  };
  selectedNode = {
    id: '',
    text: '',
    states: {
      path: '',
      type: '',
      visible: false,
    },
  };
  selectedFilePath: string = '';
  repositoryDocPathData = this.$store.state.repository.repositoryDocPathData;

  logDragStart(node): void {
    console.log('Start dragging: ' + node.text);
  }

  logDragFinish(targetNode, distinationNode): void {
    console.log(`Stop dragging: [TARGET]${targetNode.text}`);
  }

  // TODO 용량 뿌려주는 부분 다시 해보기
  clickTree(node) {
    this.selectedFilePath = '';
    this.selectedNode = node;
    this.getFileSizeAction({
      projectId: this.$store.state.product.product.projectId,
      ref: this.$store.state.repository.currentRef,
      children: node.children,
    }).then((res) => {
      Vue.set(this.selectedNode, 'children', res);
    });
  }

  selectFile(path) {
    this.selectedFilePath = path;
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
            useDocPath: true,
            gitlabToken: this.$store.state.user.user.gitlabToken,
          }).then(() => {
            this.repositoryDocPathData = [];
            this.repositoryDocPathData = this.$store.state.repository.repositoryDocPathData;
            const appendNode = this.$refs.repositoryTree.append(
              this.selectedNode,
              {
                text: fileData.name,
              }
            );
            appendNode.states.path =
              this.selectedNode.states.path + '/' + fileData.name;
            appendNode.states.type = 'blob';
            appendNode.states.visible = false;
          });
        }
      })
      .catch((err) => {
        console.error(err);
      });
  }

  getData() {
    return this.selectedFilePath;
  }
}
</script>

<style scoped></style>
