<template>
  <div class="dbs-dialog">
    <div class="gray-info-box mgb-20">
      <div class="box-desc">
        <ul class="bul-round-box">
          <li>
            <span>프로젝트ID</span>
            {{ $store.state.product.product.productName }}
          </li>
          <li v-if="docPathFlag && $route.params.pageType === 'Document'">
            <span>기본경로</span
            >{{ $store.state.product.product.manualDocPath }}
          </li>
          <li v-else-if="docPathFlag && $route.params.pageType === 'API'">
            <span>기본경로</span>{{ $store.state.product.product.APIDocPath }}
          </li>
        </ul>
      </div>
      <div class="box-desc">
        <ul class="bul-round-box">
          <li>
            <span>브랜치</span>
            {{ currentRef }}
          </li>
        </ul>
      </div>
    </div>

    <div class="dialog-flex" style="height: 376px;">
      <div class="dialog-menu-tree">
        <tree
          v-if="docPathFlag"
          ref="repositoryTree"
          :options="treeOptions"
          @node:selected="clickTree"
        >
          <div slot-scope="{ node }">
            {{ node.text }}
          </div>
        </tree>
        <tree
          v-else
          ref="repositoryTree"
          :data="$store.state.repository.repositoryData"
          :options="treeOptions"
          @node:selected="clickTree"
        >
          <div slot-scope="{ node }">{{ node.text }}</div>
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
                :key="child.text"
              >
                <td
                  v-if="
                    child.states.type === 'blob' &&
                      (child.text.includes('.md') ||
                        child.text.includes('.html'))
                  "
                  class="txt-left"
                  @click="selectFile(child)"
                >
                  <div class="radio-button-wrap">
                    <input
                      :id="'uiChk' + child.text + index"
                      type="radio"
                      :name="'uiChk' + child.text + index"
                      class="dews-ui-radio"
                      :checked="checkedFile.text === child.text"
                    />
                    <label
                      :for="'uiChk' + child.text + index"
                      class="dews-radio"
                      v-html="cutStr(child.text)"
                    >
                    </label>
                  </div>
                </td>
                <td
                  v-if="
                    child.states.type === 'blob' &&
                      (child.text.includes('.md') ||
                        child.text.includes('.html'))
                  "
                  class="txt-data"
                >
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
import { Vue, Component, Prop, namespace } from 'nuxt-property-decorator';
import LiquorTree from 'liquor-tree';
import { TreeNode } from '@/store/modules/repository';

Vue.use(LiquorTree);
const Repository = namespace('repository');

@Component
export default class GitPageSearchModal extends Vue {
  @Prop() readonly docPathFlag!: boolean;
  @Prop() readonly currentRef!: string;
  @Repository.Action('getFileSize') getFileSizeAction;

  $refs!: {
    repositoryTree: any;
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

  checkedFile: TreeNode = {
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

  repositoryDocPathData = this.$store.state.repository.repositoryDocPathData.slice();

  fetchData() {
    this.repositoryDocPathData = this.$store.state.repository.repositoryDocPathData.slice();

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

  clickTree(node: TreeNode) {
    this.selectedNode = node;
    this.checkedFile = {
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
  }

  selectFile(node) {
    this.checkedFile = node;
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

  getData() {
    if (this.checkedFile.states !== undefined) {
      return this.checkedFile.states.path;
    }
  }
}
</script>

<style scoped></style>
