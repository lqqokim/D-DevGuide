<template>
  <div class="left-menu">
    <p class="tit-con-left">
      <strong>{{ $store.state.product.product.productName }}</strong>
    </p>
    <div
      class="ui-select w-100p mgt-15 mgb-5"
      :class="{
        'no-arrow':
          $route.name === 'branchDocViewInit' ||
          $route.name === 'branchDocView',
      }"
    >
      <select title="품목형태" class="off" tabindex="-1">
        <option value="0" selected="">v2.0-1907112341</option>
        <option value="1">v2.1-1907112341</option>
        <option value="2">v2.2-1907112341</option>
      </select>
      <button
        v-if="$route.name === 'detail' || $route.name === 'docView'"
        type="button"
        class="ui-select-btn"
        :class="{ on: displayVersionList }"
        @click="displayVersionList = !displayVersionList"
      >
        최신버전
      </button>
      <button
        v-else-if="
          $route.name === 'versionDocViewInit' ||
            $route.name === 'versionDocView'
        "
        type="button"
        class="ui-select-btn"
        :class="{ on: displayVersionList }"
        @click="displayVersionList = !displayVersionList"
      >
        {{ $route.params.versionName }}
      </button>
      <!-- buttonClick 시 아무동작도 일어나지 않도록 수정 필요 -->
      <button
        v-else
        type="button"
        class="ui-select-btn"
        @click.prevent="displayVersionList = false"
      >
        {{ $route.params.branchName }}
      </button>
      <!-- 셀렉트박스  선택시 ui-select-wrap에 on 추가하면 display block 됨 -->
      <div class="ui-select-wrap" :class="{ on: displayVersionList }">
        <div class="ui-select-options">
          <nuxt-link
            :to="{
              name: 'detail',
              params: {
                productCode: $store.state.product.product.productCode,
                pageType: 'Document',
              },
            }"
            tag="button"
            class="ui-select-opt selected"
            @click.native="displayVersionList = false"
          >
            <b class="ui-select-txt">최신버전</b>
          </nuxt-link>
          <nuxt-link
            v-for="version in $store.state.version.versionList"
            :key="version.tag_name"
            :to="{
              name: 'versionDocViewInit',
              params: {
                productCode: $store.state.product.product.productCode,
                pageType: 'Document',
                versionName: version.tag_name,
              },
            }"
            tag="button"
            class="ui-select-opt"
            @click.native="displayVersionList = false"
          >
            <b class="ui-select-txt">{{ version.tag_name }}</b>
          </nuxt-link>
        </div>
      </div>
    </div>
    <!--<p v-if="$store.state.repository.refType === 'branch'">-->
    <!--{{ $store.state.repository.currentRef }}-->
    <!--</p>-->
    <div class="ui-accordion-left-pnl">
      <ul class="ui-navi">
        <nuxt-link
          v-if="
            $route.params.versionName === undefined &&
              $route.params.branchName === undefined
          "
          :to="{
            name: 'detail',
            params: {
              productCode: $route.params.productCode,
              pageType: 'Document',
            },
          }"
          tag="li"
          :class="{ selected: $route.params.pageType === 'Document' }"
          ><a>Document</a></nuxt-link
        >
        <nuxt-link
          v-else-if="
            $route.params.versionName !== undefined &&
              $route.params.branchName === undefined
          "
          :to="{
            name: 'versionDocViewInit',
            params: {
              productCode: $route.params.productCode,
              pageType: 'Document',
              versionName: $route.params.versionName,
            },
          }"
          tag="li"
          :class="{ selected: $route.params.pageType === 'Document' }"
          ><a>Document</a></nuxt-link
        >
        <nuxt-link
          v-else-if="
            $route.params.versionName === undefined &&
              $route.params.branchName !== undefined
          "
          :to="{
            name: 'branchDocViewInit',
            params: {
              productCode: $route.params.productCode,
              pageType: 'Document',
              branchName: $route.params.branchName,
            },
          }"
          tag="li"
          :class="{ selected: $route.params.pageType === 'Document' }"
          ><a>Document</a></nuxt-link
        >
        <nuxt-link
          v-if="
            $route.params.versionName === undefined &&
              $route.params.branchName === undefined
          "
          v-show="$store.state.product.product.apiUse"
          :to="{
            name: 'detail',
            params: {
              productCode: $route.params.productCode,
              pageType: 'API',
            },
          }"
          tag="li"
          :class="{ selected: $route.params.pageType === 'API' }"
          ><a>API</a></nuxt-link
        >
        <nuxt-link
          v-else-if="
            $route.params.versionName !== undefined &&
              $route.params.branchName === undefined
          "
          v-show="$store.state.product.product.apiUse"
          :to="{
            name: 'versionDocViewInit',
            params: {
              productCode: $route.params.productCode,
              pageType: 'API',
              versionName: $route.params.versionName,
            },
          }"
          tag="li"
          :class="{ selected: $route.params.pageType === 'API' }"
          ><a>API</a></nuxt-link
        >
        <nuxt-link
          v-else-if="
            $route.params.versionName === undefined &&
              $route.params.branchName !== undefined
          "
          v-show="$store.state.product.product.apiUse"
          :to="{
            name: 'branchDocViewInit',
            params: {
              productCode: $route.params.productCode,
              pageType: 'API',
              branchName: $route.params.branchName,
            },
          }"
          tag="li"
          :class="{ selected: $route.params.pageType === 'API' }"
          ><a>API</a></nuxt-link
        >
      </ul>
      <div class="line mgt-15"></div>
      <ul>
        <product-repository-file-tree
          v-for="(item, index) in viewerMenuTreeData"
          :key="index"
          :data="item"
          :depth="1"
        >
        </product-repository-file-tree>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, namespace, Watch } from 'nuxt-property-decorator';
import ProductRepositoryFileTree from '@/components/productDocView/ProductRepositoryFileTree.vue';
import * as repository from '@/store/modules/repository';

const Repository = namespace('repository');

@Component({
  components: { ProductRepositoryFileTree },
})
export default class ViewerMenu extends Vue {
  @Repository.Action('getIndexMdFile') getIndexMdFileAction;

  displayVersionList: boolean = false;
  viewerMenuTreeData: Array<any> = [];

  created() {
    this.viewerMenuTreeData = this.$store.state.repository.treeData.slice();
  }

  @Watch('$route.params.pageType')
  onChangePageType(value, oldValue) {
    if (
      this.$route.params.branchName === undefined &&
      this.$route.params.versionName === undefined
    ) {
      this.getIndexMdFileAction({
        productCode: this.$route.params.productCode,
        pageType: value,
        ref: 'master',
        refType: 'targetBranch',
      }).then((res) => {
        this.viewerMenuTreeData = this.$store.state.repository.treeData.slice();
      });
    } else if (
      this.$route.params.branchName !== undefined &&
      this.$route.params.versionName === undefined
    ) {
      this.getIndexMdFileAction({
        productCode: this.$route.params.productCode,
        pageType: value,
        ref: this.$route.params.branchName,
        refType: 'branch',
      }).then((res) => {
        this.viewerMenuTreeData = this.$store.state.repository.treeData.slice();
      });
    } else if (
      this.$route.params.branchName === undefined &&
      this.$route.params.versionName !== undefined
    ) {
      this.getIndexMdFileAction({
        productCode: this.$route.params.productCode,
        pageType: value,
        ref: this.$route.params.versionName,
        refType: 'version',
      }).then((res) => {
        this.viewerMenuTreeData = this.$store.state.repository.treeData.slice();
      });
    }
  }

  @Watch('$route.name')
  onChangeVersion(value, oldValue) {
    if (
      value === 'detail' &&
      (oldValue === 'versionDocViewInit' || oldValue === 'versionDocView')
    ) {
      this.getIndexMdFileAction({
        productCode: this.$store.state.product.product.productCode,
        pageType: 'Document',
        ref: this.$store.state.product.product.targetBranch,
        refType: 'targetBranch',
      }).then((res) => {
        this.viewerMenuTreeData = this.$store.state.repository.treeData.slice();
      });
    } else if (
      value === 'versionDocViewInit' &&
      (oldValue === 'detail' || oldValue === 'docView')
    ) {
      this.getIndexMdFileAction({
        productCode: this.$route.params.productCode,
        pageType: 'Document',
        ref: this.$route.params.versionName,
        refType: 'version',
      }).then((res) => {
        this.viewerMenuTreeData = this.$store.state.repository.treeData.slice();
      });
    }
    this.displayVersionList = false;
  }
}
</script>

<style scoped></style>
