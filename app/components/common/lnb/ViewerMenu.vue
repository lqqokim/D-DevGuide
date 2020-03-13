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
      <button
        v-else
        type="button"
        class="ui-select-btn"
        @click.prevent="displayVersionList = false"
      >
        {{ $route.params.branchName }}
      </button>
      <div
        class="ui-select-wrap"
        :class="{ on: displayVersionList }"
        @mouseleave="mouseLeaveToOtherArea"
      >
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
            :key="version.tagName"
            :to="{
              name: 'versionDocViewInit',
              params: {
                productCode: $store.state.product.product.productCode,
                pageType: 'Document',
                versionName: version.tagName,
              },
            }"
            tag="button"
            class="ui-select-opt"
            @click.native="displayVersionList = false"
          >
            <b class="ui-select-txt">{{ version.tagName }}</b>
          </nuxt-link>
        </div>
      </div>
    </div>
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
      <ul v-if="viewerMenuTreeData.length > 0">
        <product-repository-file-tree
          v-for="(item, index) in viewerMenuTreeData"
          :key="index"
          :tree-data="item"
          :depth="1"
        ></product-repository-file-tree>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, namespace, Watch } from 'nuxt-property-decorator';
import ProductRepositoryFileTree from '@/components/productDocView/ProductRepositoryFileTree.vue';
import EventBus from '@/store/modules/repository.ts';
import * as version from '@/store/modules/version.ts';

const Repository = namespace('repository');
const Version = namespace('version');

@Component({
  components: { ProductRepositoryFileTree },
})
export default class ViewerMenu extends Vue {
  @Repository.Action('getIndexMdFile') getIndexMdFileAction;
  @Repository.Action('getRepositorySampleFile') getRepositorySampleFileAction;
  @Version.Action('getVersionList') getVersionListAction;
  @Repository.Mutation('setEmptyTreeData') setEmptyTreeDataMutation;
  @Repository.Mutation('setCurrentRef') setCurrentRefMutation;

  displayVersionList: boolean = false;
  viewerMenuTreeData: Array<any> = [];

  mounted() {
    EventBus.$on('toggle', (folderData) => {
      if (folderData.type === 'page') {
        for (const key in this.viewerMenuTreeData) {
          this.removeSelectedOption(this.viewerMenuTreeData[key]);
        }
      }
      if (folderData.children) {
        folderData.option.expanded = !folderData.option.expanded;
      }
      folderData.option.selected = folderData.type === 'page';

      // Sample Page 일 경우 새 창을 띄워줌
      if (folderData.type === 'samplePage') {
        this.getRepositorySampleFileAction({
          productCode: this.$route.params.productCode,
          ref: this.$store.state.repository.currentRef,
          refType: this.$store.state.repository.refType,
          filePath: folderData.option.path,
          pageTitle: folderData.title,
        }).then((result) => {
          const win = window.open('');
          // 새 창이 제대로 열리지 않으면 null 이 반환됨
          if (win !== null) {
            win.document.write(result);
          }
        });
      }
    });
  }

  created() {
    // 트리 클릭 시 확장, 포커스 설정
    if (
      this.$route.params.branchName !== undefined &&
      !this.$store.state.user.user.gitlabToken
    ) {
      return;
    }
    this.viewerMenuTreeData = this.$store.state.repository.treeData.slice();
    // const differenceProduct =
    //   this.$store.state.product.product.productCode ===
    //   this.$route.params.productCode;
    //
    // await this.$store.dispatch('product/selectProduct', {
    //   productCode: this.$route.params.productCode,
    // });
    //
    // let refName: string = '';
    // let currentRefType: string = 'targetBranch';
    // if (this.$route.params.branchName !== undefined) {
    //   refName = this.$route.params.branchName;
    //   currentRefType = 'branch';
    // } else if (this.$route.params.versionName !== undefined) {
    //   refName = 'DOC_' + this.$route.params.versionName;
    //   currentRefType = 'version';
    // } else {
    //   refName = this.$store.state.product.product.targetBranch;
    //   currentRefType = 'targetBranch';
    // }
    //
    // await this.setCurrentRefMutation([refName, currentRefType]);
    //
    // if (
    //   this.$store.state.repository.treeData === undefined ||
    //   this.$store.state.repository.treeData.length === 0 ||
    //   !differenceProduct ||
    //   this.$route.name === 'detail' ||
    //   this.$route.name === 'branchDocViewInit'
    // ) {
    //   console.log('come in');
    //   await this.getIndexMdFileAction({
    //     productCode: this.$route.params.productCode,
    //     pageType: this.$route.params.pageType,
    //     ref: refName,
    //     refType: currentRefType,
    //     filePath: this.$route.params.pageId,
    //     pageTitle: this.$route.params.pageTitle,
    //   });
    // }
    //
    // if (
    //   this.$route.params.branchName !== undefined &&
    //   (this.$store.state.repository.treeData === undefined ||
    //     this.$store.state.repository.treeData.length === 0 ||
    //     !differenceProduct ||
    //     this.$route.name === 'branchDocViewInit')
    // ) {
    //   await this.getIndexMdFileAction({
    //     productCode: this.$route.params.productCode,
    //     pageType: this.$route.params.pageType,
    //     ref: refName,
    //     refType: currentRefType,
    //     filePath: this.$route.params.pageId,
    //     pageTitle: this.$route.params.pageTitle,
    //   });
    // }
    //
    // if (this.$route.params.pageId) {
    //   await this.getRepositoryFileAction({
    //     productCode: this.$route.params.productCode,
    //     filePath: this.$route.params.pageId + '.md',
    //     ref: refName,
    //     refType: currentRefType,
    //     pageTitle: this.$route.params.pageTitle,
    //   });
    // }
    //
    // await this.getVersionListAction({
    //   productCode: this.$route.params.productCode,
    // });
    // console.log(this.$store.state.repository.treeData);
  }
  // 현재 선택되지 않은 li 의 selected 속성 없애주기
  removeSelectedOption(treeData): void {
    if (treeData.option.selected && treeData.type === 'page') {
      treeData.option.selected = false;
    }
    if (treeData.children) {
      treeData.children.forEach((data) => {
        this.removeSelectedOption(data);
      });
    }
  }

  // pageType 이 변경되었을 때
  @Watch('$route.params.pageType')
  onChangePageType(value) {
    if (value === undefined) {
      return;
    }
    if (
      // targetBranch 의 최신 버전
      this.$route.params.branchName === undefined &&
      this.$route.params.versionName === undefined
    ) {
      this.setEmptyTreeDataMutation();
      this.getIndexMdFileAction({
        productCode: this.$route.params.productCode,
        pageType: value,
        ref: 'master',
        refType: 'targetBranch',
      }).then((res) => {
        this.viewerMenuTreeData = this.$store.state.repository.treeData.slice();
      });
    } else if (
      // 선택된 version
      this.$route.params.branchName !== undefined &&
      this.$route.params.versionName === undefined
    ) {
      this.setEmptyTreeDataMutation();
      this.getIndexMdFileAction({
        productCode: this.$route.params.productCode,
        pageType: value,
        ref: this.$route.params.branchName,
        refType: 'branch',
      }).then((res) => {
        this.viewerMenuTreeData = this.$store.state.repository.treeData.slice();
      });
    } else if (
      // 작성 중인 branch
      this.$route.params.branchName === undefined &&
      this.$route.params.versionName !== undefined
    ) {
      this.setEmptyTreeDataMutation();
      this.getIndexMdFileAction({
        productCode: this.$route.params.productCode,
        pageType: value,
        ref: 'DOC_' + this.$route.params.versionName,
        refType: 'version',
      }).then((res) => {
        this.viewerMenuTreeData = this.$store.state.repository.treeData.slice();
      });
    }
  }

  // @Watch('$route.name')
  // onChangeVersion(fromRouteName, toRouteName) {
  // if (
  //   (fromRouteName === 'detail' &&
  //     (toRouteName === 'versionDocViewInit' ||
  //       toRouteName === 'versionDocView')) ||
  //   (fromRouteName === 'detail' &&
  //     (toRouteName === 'detail' || toRouteName === 'docView'))
  // ) {
  //   this.getIndexMdFileAction({
  //     productCode: this.$store.state.product.product.productCode,
  //     pageType: this.$route.params.pageType,
  //     ref: this.$store.state.product.product.targetBranch,
  //     refType: 'targetBranch',
  //   }).then((res) => {
  //     this.viewerMenuTreeData = this.$store.state.repository.treeData.slice();
  //   });
  // } else if (
  //   (fromRouteName === 'versionDocViewInit' &&
  //     (toRouteName === 'detail' || toRouteName === 'docView')) ||
  //   (fromRouteName === 'versionDocViewInit' &&
  //     (toRouteName === 'versionDocViewInit' ||
  //       toRouteName === 'versionDocView'))
  // ) {
  //   this.getIndexMdFileAction({
  //     productCode: this.$route.params.productCode,
  //     pageType: this.$route.params.pageType,
  //     ref: 'DOC_' + this.$route.params.versionName,
  //     refType: 'version',
  //   }).then((res) => {
  //     this.viewerMenuTreeData = this.$store.state.repository.treeData.slice();
  //   });
  // }
  // this.displayVersionList = false;
  // }

  // version 선택 시
  @Watch('$route.params.versionName')
  onChangeVersion(toVersion, fromVersion) {
    // 최신버전
    if (toVersion === undefined) {
      this.getIndexMdFileAction({
        productCode: this.$store.state.product.product.productCode,
        pageType: this.$route.params.pageType,
        ref: this.$store.state.product.product.targetBranch,
        refType: 'targetBranch',
      }).then((res) => {
        this.viewerMenuTreeData = this.$store.state.repository.treeData.slice();
      });
    } else {
      // version 선택 시
      this.getIndexMdFileAction({
        productCode: this.$route.params.productCode,
        pageType: this.$route.params.pageType,
        ref: 'DOC_' + this.$route.params.versionName,
        refType: 'version',
      }).then((res) => {
        this.viewerMenuTreeData = this.$store.state.repository.treeData.slice();
      });
    }
    this.displayVersionList = false;
  }

  // 뒤로가기, 앞으로가기 했을 때 좌측 메뉴 트리 포커스 문제 때문에 추가한 코드
  @Watch('$route.params.pageTitle')
  onChangePageTitle() {
    if (document) {
      setTimeout(() => {
        if (
          document.querySelectorAll('li.nav-item.page.selected').length === 0 ||
          document.querySelectorAll('li.nav-item.page.selected').length > 1
        ) {
          let selectedPage;
          for (let idx = 0; idx < this.viewerMenuTreeData.length; idx++) {
            selectedPage = this.findSelectedPage(
              this.viewerMenuTreeData[idx],
              this.$route.params.pageTitle,
              this.$route.params.pageId + '.md'
            );
            if (selectedPage !== undefined) {
              EventBus.$emit('toggle', selectedPage);
              break;
            }
          }
        }
      });
    }
  }

  // 현재 선택되어 있는 페이지를 찾음
  findSelectedPage(parent, pageTitle, filePath): any {
    if (pageTitle === parent.title && filePath === parent.option.path) {
      parent.option.selected = true;
      return parent;
    } else if (parent.children && parent.children.length > 0) {
      for (let childIdx = 0; childIdx < parent.children.length; childIdx++) {
        const findResult = this.findSelectedPage(
          parent.children[childIdx],
          pageTitle,
          filePath
        );
        if (findResult !== undefined) {
          return findResult;
        }
      }
    } else {
      return undefined;
    }
  }

  // 버전 리스트 select box 출력 후 마우스가 select box 밖으로 나가면 닫힘
  mouseLeaveToOtherArea() {
    this.displayVersionList = false;
  }
}
</script>

<style scoped></style>
