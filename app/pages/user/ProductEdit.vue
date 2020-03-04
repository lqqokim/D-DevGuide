<template>
  <!--<div class="dbs-container-wrap">-->
  <!--<div class="dbs-top-image-wrap guide">-->
  <!--<div class="dbs-top-image">-->
  <!--<dl>-->
  <!--<dt>개발자 문서</dt>-->
  <!--<dd>-->
  <!--DEWS 플랫폼에 포함된 제품들을 이용하여 최적화된 개발을<br />-->
  <!--진행할 수 있도록 개발가이드 및 API 문서를 제공합니다.-->
  <!--</dd>-->
  <!--</dl>-->
  <!--</div>-->
  <!--</div>-->
  <!--<div class="dbs-container">-->
  <!--<div class="content-wrap">-->
  <!-- 좌측메뉴 S -->
  <!--<div class="left-menu">-->
  <!--<p class="tit-con-left"><strong>DEWS UI</strong></p>-->
  <!--<div class="branch-name">-->
  <!--<p class="dbs-icon-button ico-left ico-contents branch ellipsis">-->
  <!--DOC_BixzboxIntegrations-->
  <!--</p>-->
  <!--<i class="ico-setting"></i>-->
  <!--</div>-->
  <!--<ul class="ui-navi">-->
  <!--<li class="selected"><a href="#" role="button">Document</a></li>-->
  <!--<li class=""><a href="#" role="button">API</a></li>-->
  <!--</ul>-->
  <!--<div class="line mgt-15 mgb-15"></div>-->
  <!--<div class="btn-wrap-both mgt-15 mgb-10">-->
  <!--<button type="button" class="dbs-icon-button ico-left small file">-->
  <!--새폴더-->
  <!--</button>-->
  <!--<button-->
  <!--type="button"-->
  <!--class="dbs-icon-button ico-left small document"-->
  <!--&gt;-->
  <!--새페이지-->
  <!--</button>-->
  <!--</div>-->
  <!--<div class="menu-tree">-->
  <!--<tree-->
  <!--:data="treeData"-->
  <!--:options="treeOptions"-->
  <!--@node:dragging:start="logDragStart"-->
  <!--@node:dragging:finish="logDragFinish"-->
  <!--/>-->
  <!--</div>-->
  <!--<div class="btn-wrap-both mgt-10">-->
  <!--<button type="button" class="dbs-icon-button ico-left small delete">-->
  <!--삭제-->
  <!--</button>-->
  <!--<span class="fr">-->
  <!--<button type="button" class="dbs-icon-button arrow up"></button>-->
  <!--<button type="button" class="dbs-icon-button arrow down"></button>-->
  <!--</span>-->
  <!--</div>-->
  <!--</div>-->
  <!-- // 좌측메뉴 E -->
  <!--<div class="container-panel">-->
  <!--<div class="view-top mgb-20">-->
  <!--<p class="tit-con-text">문서 수정</p>-->
  <!--</div>-->
  <!--<div class="gray-info-box document mgb-20">-->
  <!--<ul class="bul-round-box">-->
  <!--<li><span>문서명</span>시작하기</li>-->
  <!--<li><span>git 마크다운 경로</span>/docs/index.md</li>-->
  <!--</ul>-->
  <!--<button type="button" class="dbs-icon-button ico-left small modify">-->
  <!--수정-->
  <!--</button>-->
  <!--</div>-->
  <!--<div class="movie-register-toastui mgb-20">-->
  <!--<TuiEditor height="500px"></TuiEditor>-->
  <!--</div>-->
  <!--<div class="btn-wrap mgb-80">-->
  <!--<button-->
  <!--type="button"-->
  <!--class="dbs-icon-button ico-left small confirm"-->
  <!--&gt;-->
  <!--확인-->
  <!--</button>-->
  <!--<button type="button" class="dbs-icon-button ico-left small cancel">-->
  <!--취소-->
  <!--</button>-->
  <!--</div>-->
  <!--</div>-->
  <!--</div>-->
  <!--</div>-->
  <!--</div>-->
  <product-edit></product-edit>
</template>
<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator';
import ProductEdit from '~/components/productEdit/index.vue';

@Component({
  layout: 'default',
  components: {
    ProductEdit,
  },
  fetch({ store, params }): any {
    try {
      // await store.dispatch('product/selectProduct', {
      //   productCode: params.productCode,
      // });
      //
      // if (!store.state.user.user.gitlabToken) {
      //   return;
      // }
      //
      // if (
      //   store.state.repository.treeData === undefined ||
      //   store.state.repository.treeData.length === 0 ||
      //   (params.branchName !== undefined && params.pageId === undefined)
      // ) {
      //   await store.dispatch('repository/getIndexMdFile', {
      //     productCode: params.productCode,
      //     pageType: params.pageType,
      //     ref: params.branchName,
      //     refType: 'branch',
      //     filePath: params.pageId,
      //     pageTitle: params.pageTitle,
      //     gitlabToken: store.state.user.user.gitlabToken,
      //   });
      // }
      // if (params.pageId) {
      //   await store.dispatch('repository/getRepositoryFile', {
      //     productCode: params.productCode,
      //     filePath: params.pageId + '.md',
      //     ref: params.branchName,
      //     refType: 'branch',
      //     pageTitle: params.pageTitle,
      //     gitlabToken: store.state.user.user.gitlabToken,
      //   });
      // }
      //
      // await store.dispatch('repository/getRepository', {
      //   productCode: params.productCode,
      //   ref: params.branchName,
      //   gitlabToken: store.state.user.user.gitlabToken,
      // });
      //
      // await store.dispatch('repository/getRepository', {
      //   productCode: params.productCode,
      //   ref: params.branchName,
      //   useDocPath: true,
      //   gitlabToken: store.state.user.user.gitlabToken,
      //   pageType: params.pageType,
      // });
    } catch (err) {
      console.error(err);
    }
  },
})
export default class extends Vue {}
</script>

<style lang="scss"></style>
