<template>
  <div class="dbs-dialog">
    <div class="gray-info-box">
      <div class="box-desc">
        <ul class="bul-round-box">
          <li>
            <span>프로젝트 ID</span>
            {{ $store.state.product.product.productName }}
          </li>
        </ul>
      </div>
      <div class="box-desc">
        <ul class="bul-round-box">
          <li><span>브랜치</span> {{ $store.state.repository.currentRef }}</li>
        </ul>
      </div>
    </div>
    <div class="dialog-menu-tree mgt-20" style="height: 407px;">
      <tree
        ref="repositoryTree"
        :data="docSearchTreeData"
        :options="treeOptions"
        @tree:mounted="treeMounted"
        @node:selected="onNodeSelected"
      >
        <div slot-scope="{ node }">
          <p v-if="node.states.path === undefined">{{ node.text }}</p>
          <p v-else>{{ node.text }} ({{ node.states.path }})</p>
        </div>
      </tree>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator';
import LiquorTree from 'liquor-tree';

Vue.use(LiquorTree);

@Component
export default class DocSearchModal extends Vue {
  $refs!: {
    repositoryTree: any;
  };
  treeOptions = {
    propertyNames: {
      text: 'title',
      children: 'children',
      state: 'option',
      data: 'path',
    },
    // dnd: true,
    // checkbox: true,
  };
  docSearchTreeData: object = {};
  selectedNode: object = {};
  selectedFilePath: string = '';

  created() {
    this.docSearchTreeData = this.$store.state.repository.treeData;

    for (const key in this.docSearchTreeData) {
      if (this.docSearchTreeData[key].option.path === undefined) {
        this.docSearchTreeData[key].option.selectable = false;
      }
      this.docSearchTreeData[key].option.expanded = false;
      this.docSearchTreeData[key].option.selected = false;
    }
  }

  onNodeSelected(node) {
    console.log(node);
    console.log(this.$refs.repositoryTree.selected()[0]);
  }

  treeMounted() {
    if (this.$refs.repositoryTree.selected() !== undefined) {
      this.$refs.repositoryTree.selected()[0].unselect();
    }
  }

  getData() {
    return this.$refs.repositoryTree.selected();
  }
}
</script>

<style scoped></style>
