<template>
  <li
    ref="liTree"
    class="nav-item"
    :class="[
      {
        page: data.type === 'page',
        folder: data.type === 'folder',
        selected: data.option.selected,
      },
      'depth-' + depth,
    ]"
  >
    <a v-if="data.type === 'folder'" class="nav-text" @click="toggle(data)">
      {{ data.title }}
    </a>
    <nuxt-link
      v-else-if="
        data.type === 'page' &&
          $store.state.repository.refType === 'targetBranch'
      "
      :to="{
        name: 'docView',
        params: {
          productCode: $store.state.product.product.productCode,
          pageType: $route.params.pageType,
          pageTitle: data.title,
          pageId: data.option.path,
        },
      }"
      tag="a"
      class="nav-text"
      @click.native="toggle(data)"
      >{{ data.title }}</nuxt-link
    >
    <nuxt-link
      v-else-if="
        data.type === 'page' && $store.state.repository.refType === 'branch'
      "
      :to="{
        name: 'branchDocView',
        params: {
          productCode: $store.state.product.product.productCode,
          pageType: $route.params.pageType,
          pageTitle: data.title,
          branchName: $store.state.repository.currentRef,
          pageId: data.option.path,
        },
      }"
      tag="a"
      class="nav-text"
      @click.native="toggle(data)"
      >{{ data.title }}</nuxt-link
    >
    <nuxt-link
      v-else-if="
        data.type === 'page' && $store.state.repository.refType === 'version'
      "
      :to="{
        name: 'versionDocView',
        params: {
          productCode: $store.state.product.product.productCode,
          pageType: $route.params.pageType,
          pageTitle: data.title,
          versionName: $store.state.repository.currentRef,
          pageId: data.option.path,
        },
      }"
      tag="a"
      class="nav-text"
      @click.native="toggle(data)"
      >{{ data.title }}</nuxt-link
    >
    <ul
      v-show="data.option.expanded"
      v-if="data.children"
      class="nav-container"
      :class="'depth-' + (depth + 1)"
      style="display: block;"
    >
      <product-repository-file-tree
        v-for="data in data.children"
        :key="data.option.path"
        :data="data"
        :depth="depth + 1"
      >
      </product-repository-file-tree>
    </ul>
  </li>
</template>

<script lang="ts">
import { Vue, Component, namespace, Prop } from 'nuxt-property-decorator';
import * as repository from '@/store/modules/repository';

const Repository = namespace('repository');

@Component
export default class ProductRepositoryFileTree extends Vue {
  open: boolean = false;
  fileName: string = '';
  filePath: string = '';
  $refs!: {
    liTree: HTMLElement;
  };

  @Repository.Action('getRepositoryFile') getRepositoryFileAction;

  @Prop() private data!: object;
  @Prop() private foldName!: string;
  @Prop() private depth!: number;

  toggle(folderData): void {
    if (folderData.type === 'page') {
      for (const key in this.$store.state.repository.treeData) {
        this.removeSelectedOption(this.$store.state.repository.treeData[key]);
      }
    }
    // this.$store.state.repository.treeData.forEach((data) => {
    //   removeSelectedOption(data);
    // });
    if (folderData.children) {
      folderData.option.expanded = !folderData.option.expanded;
    }
    folderData.option.selected = folderData.type === 'page';
  }

  removeSelectedOption(treeData): void {
    // console.log(treeData.length);
    // if (treeData.length !== undefined) {
    //   treeData.forEach((data) => {
    //     this.removeSelectedOption(data);
    //   });
    // }
    if (treeData.option.selected && treeData.type === 'page') {
      treeData.option.selected = false;
    }
    if (treeData.children) {
      treeData.children.forEach((data) => {
        this.removeSelectedOption(data);
      });
      // this.removeSelectedOption(treeData.children);
    }
    // treeData.forEach((data) => {
    //
    // });
  }
}
</script>

<style scoped></style>
