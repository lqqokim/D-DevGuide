<template>
  <!--<div class="dbs-container-wrap">-->
  <!--<div class="dbs-top-image-wrap guide">-->
  <!--<div class="dbs-top-image">-->
  <!--<dl>-->
  <!--<dt>개발자 가이드</dt>-->
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
  <!--<p class="tit-con-left"><strong>개발자 문서 관리</strong></p>-->
  <!--<div class="ui-accordion-left-pnl">-->
  <!--<ul>-->
  <!--<li class="nav-item depth-1 folder selected">-->
  <!--<a href="#" class="nav-text">문서관리</a>-->
  <!--<ul class="nav-container depth-2" style="display: block;">-->
  <!--<li class="nav-item depth-2 folder selected">-->
  <!--<a href="#" class="nav-text">DEWS/UI</a>-->
  <!--<ul class="nav-container depth-3" style="display: block;">-->
  <!--<li class="nav-item depth-3 page selected">-->
  <!--<a href="#" class="nav-text">작업 브랜치 관리</a>-->
  <!--</li>-->
  <!--<li class="nav-item depth-3 page">-->
  <!--<a href="#" class="nav-text">버젼관리</a>-->
  <!--</li>-->
  <!--<li class="nav-item depth-3 page">-->
  <!--<a href="#" class="nav-text">공지사항 관리</a>-->
  <!--</li>-->
  <!--</ul>-->
  <!--</li>-->
  <!--<li class="nav-item depth-2 page">-->
  <!--<a href="#" class="nav-text">DEWS J</a>-->
  <!--</li>-->
  <!--<li class="nav-item depth-2 page">-->
  <!--<a href="#" class="nav-text">DEWS/FD</a>-->
  <!--</li>-->
  <!--</ul>-->
  <!--</li>-->
  <!--<li class="nav-item depth-1 page">-->
  <!--<a href="#" class="nav-text">제품관리</a>-->
  <!--</li>-->
  <!--</ul>-->
  <!--</div>-->
  <!--</div>-->
  <!-- // 좌측메뉴 E -->
  <!--<div class="container-panel">-->
  <!--<div class="view-top mgb-20">-->
  <!--<h1 class="tit-con-text">DEWS/UI<span>브랜치 비교</span></h1>-->
  <!--</div>-->
  <!--<div class="view-top bdr-bot-none">-->
  <!--<p class="tit-con-sub">-->
  <!--브랜치 비교<span>Master - DOC_BixzboxIntegrations</span>-->
  <!--</p>-->
  <!--</div>-->
  <!--<div class="compare-branch-box">-->
  <!--<div class="compare-content"></div>-->
  <!--<div class="compare-content"></div>-->
  <!--</div>-->
  <!--<div class="btn-wrap-both mgt-10 mgb-80">-->
  <!--<span class="fr"-->
  <!--&gt;<button-->
  <!--type="button"-->
  <!--class="dbs-icon-button ico-left small list"-->
  <!--&gt;-->
  <!--목록-->
  <!--</button></span-->
  <!--&gt;-->
  <!--</div>-->
  <!--</div>-->
  <!--</div>-->
  <!--</div>-->
  <!--</div>-->
  <product-branch-compare></product-branch-compare>
</template>
<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator';
import ProductBranchCompare from '~/components/productBranchCompare/index.vue';

@Component({
  layout: 'default',
  components: {
    ProductBranchCompare,
  },
  async fetch({ store, params }): Promise<any> {
    try {
      await store.dispatch('product/getProductList');
      await store.dispatch('branch/getBranchList', {
        productCode: params.productCode,
        gitlabToken: store.state.user.user.gitlabToken,
      });
      await store.dispatch('product/selectProduct', {
        productCode: params.productCode,
      });

      if (params.mergeRequestIId !== undefined) {
        await store.dispatch('mergeRequest/getChangesData', {
          productCode: params.productCode,
          mergeRequestIId: params.mergeRequestIId,
          gitlabToken: store.state.user.user.gitlabToken,
        });
      } else {
        await store.dispatch('branch/getBranchChangesData', {
          projectId: store.state.product.product.projectId,
          branchName: params.branchName,
          targetBranch: store.state.product.product.targetBranch,
          gitlabToken: store.state.user.user.gitlabToken,
        });
      }

      // await store.dispatch('mergeRequest/getMergeRequestList', {
      //   productCode: params.productCode,
      //   gitlabToken: store.state.user.user.gitlabToken,
      // });

      // await store.dispatch('mergeRequest/getMergeRequestList', {
      //   productCode: params.productCode,
      // });
      // await store.dispatch('commit/getCommitList', {
      //   productCode: params.productCode,
      //   branchName: 'DOC_branch01',
      // });
      // store.state.branch.branchList.forEach((branch) => {
      // if (branch.name === params.branchName) {
      // }
      // let iid!: string;
      // store.state.mergeRequest.mergeRequestList.forEach((mergeRequest) => {
      //   if (mergeRequest.source_branch === params.branchName) {
      //     iid = mergeRequest.iid;
      //   }
      // });
      // await store.dispatch('mergeRequest/getChangesData', {
      //   productCode: params.productCode,
      //   mergeRequestIId: iid,
      //   gitlabToken: store.state.user.user.gitlabToken,
      // });
      // });
    } catch (e) {
      console.error(e);
    }
  },
})
export default class extends Vue {}
</script>

<style lang="scss"></style>
