<template>
  <li
    ref="liTree"
    class="nav-item"
    :class="[
      {
        page: treeData.type === 'page' || treeData.type === 'samplePage',
        folder: treeData.type === 'folder',
        selected: treeData.option.selected,
      },
      'depth-' + depth,
    ]"
  >
    <a
      v-if="treeData.type === 'folder'"
      class="nav-text"
      @click="toggle(treeData)"
    >
      {{ treeData.title }}
    </a>
    <a
      v-if="treeData.type === 'samplePage'"
      class="nav-text"
      @click="toggle(treeData)"
    >
      {{ treeData.title }}
    </a>
    <nuxt-link
      v-else-if="
        treeData.type === 'page' &&
          $store.state.repository.refType === 'targetBranch'
      "
      :to="{
        name: 'docView',
        params: {
          productCode: $store.state.product.product.productCode,
          pageType: $route.params.pageType,
          pageTitle: treeData.title,
          pageId: treeData.option.path,
        },
      }"
      tag="a"
      class="nav-text"
      @click.native="toggle(treeData)"
      >{{ treeData.title }}</nuxt-link
    >
    <nuxt-link
      v-else-if="
        treeData.type === 'page' && $store.state.repository.refType === 'branch'
      "
      :to="{
        name: 'branchDocView',
        params: {
          productCode: $store.state.product.product.productCode,
          pageType: $route.params.pageType,
          pageTitle: treeData.title,
          branchName: $store.state.repository.currentRef,
          pageId: treeData.option.path,
        },
      }"
      tag="a"
      class="nav-text"
      @click.native="toggle(treeData)"
      >{{ treeData.title }}</nuxt-link
    >
    <nuxt-link
      v-else-if="
        treeData.type === 'page' &&
          $store.state.repository.refType === 'version'
      "
      :to="{
        name: 'versionDocView',
        params: {
          productCode: $store.state.product.product.productCode,
          pageType: $route.params.pageType,
          pageTitle: treeData.title,
          versionName: $route.params.versionName,
          pageId: treeData.option.path,
        },
      }"
      tag="a"
      class="nav-text"
      @click.native="toggle(treeData)"
      >{{ treeData.title }}</nuxt-link
    >
    <ul
      v-show="treeData.option.expanded && treeData.children"
      class="nav-container"
      :class="'depth-' + (depth + 1)"
      style="display: block;"
    >
      <product-repository-file-tree
        v-for="childData in treeData.children"
        :key="childData.title + childData.option.path"
        :tree-data="childData"
        :depth="depth + 1"
      >
        {{ childData.option.path }}
      </product-repository-file-tree>
    </ul>
  </li>
</template>

<script lang="ts">
import { Vue, Component, namespace, Prop } from 'nuxt-property-decorator';
import EventBus from '@/store/modules/repository';

const Repository = namespace('repository');

@Component
export default class ProductRepositoryFileTree extends Vue {
  open: boolean = false;
  fileName: string = '';
  filePath: string = '';
  $refs!: {
    liTree: HTMLElement;
  };
  modalTitle: string = 'test';
  modalHeight: string = '600px';

  @Repository.Action('getRepositoryFile') getRepositoryFileAction;

  @Prop() private treeData!: object;
  @Prop() private foldName!: string;
  @Prop() private depth!: number;

  createPageModalConfirm() {}

  toggle(folderData): void {
    EventBus.$emit('toggle', folderData);
  }
}
Vue.component('ProductRepositoryFileTree', ProductRepositoryFileTree);
</script>

<style scoped></style>
