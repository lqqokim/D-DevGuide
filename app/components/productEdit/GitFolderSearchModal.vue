<template>
  <div class="dbs-dialog">
    <div class="gray-info-box">
      <div class="box-desc">
        <ul class="bul-round-box">
          <li><span>프로젝트 ID</span>{{ projectId }}</li>
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
          <li><span>브랜치</span>{{ currentRef }}</li>
        </ul>
      </div>
    </div>
    <div v-if="docPathFlag" class="dialog-menu-tree" style="height: 340px;">
      <tree
        ref="repositoryTree"
        :data="$store.state.repository.repositoryDocPathData"
        :options="treeOptions"
      >
        <div slot-scope="{ node }">{{ node.text }}</div>
      </tree>
    </div>
    <div v-else class="dialog-menu-tree mgt-20" style="height: 407px;">
      <tree
        ref="repositoryTree"
        :data="$store.state.repository.repositoryData"
        :options="treeOptions"
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
  @Prop() readonly projectId!: number;
  @Prop() readonly currentRef!: string;

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
  };

  getData() {
    return this.$refs.repositoryTree.selected()[0];
  }
}
</script>

<style scoped></style>
