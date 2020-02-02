<template>
  <div class="dbs-dialog">
    <div class="gray-info-box mgb-20">
      <div class="box-desc">
        <ul class="bul-round-box">
          <li>
            <span>프로젝트ID</span>
            {{ $store.state.product.product.productName }}
          </li>
          <li v-if="docPathFlag">
            <span>기본경로</span
            >{{ $store.state.product.product.manualDocPath }}
          </li>
        </ul>
      </div>
      <div class="box-desc">
        <ul class="bul-round-box">
          <li>
            <span>브랜치</span> {{ $store.state.product.product.targetBranch }}
          </li>
        </ul>
      </div>
    </div>

    <div class="dialog-flex" style="height: 376px;">
      <div class="dialog-menu-tree">
        <tree
          v-if="docPathFlag"
          ref="repositoryTree"
          :data="$store.state.repository.repositoryDocPathData"
          :options="treeOptions"
          @node:dragging:start="logDragStart"
          @node:dragging:finish="logDragFinish"
        >
          <div slot-scope="{ node }" @click="clickTree(node)">
            {{ node.text }}
          </div>
        </tree>
        <tree
          v-else
          ref="repositoryTree"
          :data="$store.state.repository.repositoryData"
          :options="treeOptions"
          @node:dragging:start="logDragStart"
          @node:dragging:finish="logDragFinish"
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
              <tr v-for="child in selectedNode.children" :key="child.id">
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
</template>

<script lang="ts">
import { Vue, Component, Prop, namespace } from 'nuxt-property-decorator';
import LiquorTree from 'liquor-tree';
import * as repository from '@/store/modules/repository';

Vue.use(LiquorTree);
const Repository = namespace('repository');

@Component
export default class GitPageSearchModal extends Vue {
  @Prop() readonly docPathFlag!: boolean;

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
    dnd: true,
    // checkbox: true,
  };
  selectedNode: object = {};
  selectedFilePath: string = '';

  logDragStart(node): void {
    console.log('Start dragging: ' + node.text);
  }

  logDragFinish(targetNode, distinationNode): void {
    console.log(`Stop dragging: [TARGET]${targetNode.text}`);
  }

  clickTree(node) {
    this.selectedFilePath = '';
    this.selectedNode = node;
  }

  selectFile(path) {
    this.selectedFilePath = path;
    console.log(this.selectedFilePath);
  }

  getData() {
    // if (this.selectedFilePath === undefined) {
    //   alert('파일을 선택해주세요.');
    //   return;
    // }
    return this.selectedFilePath;
  }
}
</script>

<style scoped></style>
