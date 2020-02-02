<template>
  <div class="dbs-dialog">
    <div class="gray-info-box">
      <div class="box-desc">
        <ul class="bul-round-box">
          <li>
            <span>프로젝트 ID</span
            >{{ $store.state.product.product.productName }}
          </li>
          <li v-if="docPathFlag">
            <span>기본경로</span
            >{{ $store.state.product.product.manualDocPath }}
          </li>
        </ul>
      </div>
      <div class="box-desc">
        <ul class="bul-round-box">
          <li><span>브랜치</span>{{ $store.state.repository.currentRef }}</li>
        </ul>
      </div>
    </div>
    <div v-if="docPathFlag" class="dialog-menu-tree" style="height: 340px;">
      <tree
        ref="repositoryTree"
        :data="$store.state.repository.repositoryDocPathData"
        :options="treeOptions"
        @node:dragging:start="logDragStart"
        @node:dragging:finish="logDragFinish"
      >
        <div slot-scope="{ node }">{{ node.text }}</div>
      </tree>
    </div>
    <div v-else class="dialog-menu-tree mgt-20" style="height: 407px;">
      <tree
        ref="repositoryTree"
        :data="$store.state.repository.repositoryData"
        :options="treeOptions"
        @node:dragging:start="logDragStart"
        @node:dragging:finish="logDragFinish"
      >
        <div slot-scope="{ node }">{{ node.text }}</div>
      </tree>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'nuxt-property-decorator';
import LiquorTree from 'liquor-tree';

Vue.use(LiquorTree);

@Component
export default class GitFolderSearchModal extends Vue {
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

  logDragStart(node): void {
    console.log('Start dragging: ' + node.text);
  }

  logDragFinish(targetNode, distinationNode): void {
    console.log(`Stop dragging: [TARGET]${targetNode.text}`);
  }

  getData() {
    // if (this.$refs.repositoryTree.selected()[0] === undefined) {
    //   alert('폴더를 선택해주세요.');
    //   return;
    // }
    return this.$refs.repositoryTree.selected()[0];
  }
}
</script>

<style scoped></style>
