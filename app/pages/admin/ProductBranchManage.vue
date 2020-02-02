<template>
  <!--<div class="dbs-container-wrap">-->
  <!--<div class="dbs-top-image-wrap guide">-->
  <!--<div class="dbs-top-image">-->
  <!--<dl>-->
  <!--<dt><strong>개발자 가이드</strong></dt>-->
  <!--<dd>-->
  <!--DEWS 플랫폼에 포함된 제품들을 이용하여 최적화된 개발을<br />-->
  <!--진행할 수 있도록 개발가이드 및 API 문서를 제공합니다.-->
  <!--</dd>-->
  <!--</dl>-->
  <!--</div>-->
  <!--</div>-->
  <!--<div class="dbs-container mgb-0">-->
  <!--<div class="content-wrap">-->
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
  <!--<a href="#" class="nav-text">버전 관리</a>-->
  <!--</li>-->
  <!--<li class="nav-item depth-3 page">-->
  <!--<a href="#" class="nav-text">공지사항 관리</a>-->
  <!--</li>-->
  <!--</ul>-->
  <!--</li>-->
  <!--<li class="nav-item depth-2 folder selected">-->
  <!--<a href="#" class="nav-text">DEWS J</a>-->
  <!--<ul class="nav-container depth-3" style="display: block;">-->
  <!--<li class="nav-item depth-3 page">-->
  <!--<a href="#" class="nav-text">작업 브랜치 관리</a>-->
  <!--</li>-->
  <!--<li class="nav-item depth-3 page">-->
  <!--<a href="#" class="nav-text">버전 관리</a>-->
  <!--</li>-->
  <!--<li class="nav-item depth-3 page">-->
  <!--<a href="#" class="nav-text">공지사항 관리</a>-->
  <!--</li>-->
  <!--</ul>-->
  <!--</li>-->
  <!--<li class="nav-item depth-2 folder selected">-->
  <!--<a href="#" class="nav-text">DEWS Q</a>-->
  <!--<ul class="nav-container depth-3" style="display: block;">-->
  <!--<li class="nav-item depth-3 page">-->
  <!--<a href="#" class="nav-text">작업 브랜치 관리</a>-->
  <!--</li>-->
  <!--<li class="nav-item depth-3 page">-->
  <!--<a href="#" class="nav-text">버전 관리</a>-->
  <!--</li>-->
  <!--<li class="nav-item depth-3 page">-->
  <!--<a href="#" class="nav-text">공지사항 관리</a>-->
  <!--</li>-->
  <!--</ul>-->
  <!--</li>-->
  <!--</ul>-->
  <!--</li>-->
  <!--<li class="nav-item depth-1 page selected">-->
  <!--<a href="#" class="nav-text">제품관리</a>-->
  <!--</li>-->
  <!--</ul>-->
  <!--</div>-->
  <!--</div>-->
  <!--<div class="container-panel">-->
  <!--<div class="view-top">-->
  <!--<h3 class="tit-con-text">DEWS/UI 작업 브랜치 관리</h3>-->
  <!--</div>-->
  <!--<div class="gray-info-box mgt-20 mgb-60">-->
  <!--<div class="box-desc">-->
  <!--<h2 class="tit-con-icon-sub-title icon-title dews">제품정보</h2>-->
  <!--<ul class="bul-round-box">-->
  <!--<li><span>제품명</span> DEWS UI</li>-->
  <!--<li><span>제품설명</span> DEWS Front-end Framework</li>-->
  <!--<li><span>API 사용여부</span> 사용</li>-->
  <!--</ul>-->
  <!--</div>-->
  <!--<div class="box-desc">-->
  <!--<h2 class="tit-con-icon-sub-title icon-title gitlab">-->
  <!--GitLab 리포지토리 정보-->
  <!--</h2>-->
  <!--<ul class="bul-round-box">-->
  <!--<li><span>프로젝트 ID</span> DEWS 15</li>-->
  <!--<li><span>기준 브랜치</span> master</li>-->
  <!--<li><span>문서 기본경</span> /docs</li>-->
  <!--<li><span>API 기본경로</span> /docs/api</li>-->
  <!--</ul>-->
  <!--</div>-->
  <!--</div>-->
  <!--<div class="view-top bdr-bot-none">-->
  <!--<h2 class="tit-con-sub">-->
  <!--작품 브랜치<span>(기준 브랜치 : master)</span>-->
  <!--</h2>-->
  <!--<div class="pst-rbtn">-->
  <!--<button-->
  <!--type="button"-->
  <!--class="dbs-icon-button ico-left large branch-white"-->
  <!--&gt;-->
  <!--신규브랜치생성-->
  <!--</button>-->
  <!--</div>-->
  <!--</div>-->
  <!--<ul class="dbs-list mgb-60">-->
  <!--<li class="list-row">-->
  <!--<div class="project-detail">-->
  <!--<div class="project-wrap">-->
  <!--<div class="project-title">-->
  <!--<p>DOC_BizboxIntegrations</p>-->
  <!--<span class="time">3시간</span>-->
  <!--<button-->
  <!--type="button"-->
  <!--class="dbs-icon-button ico-left ico-contents cont-merge access-role"-->
  <!--&gt;-->
  <!--병합요청-->
  <!--</button>-->
  <!--</div>-->
  <!--<div class="project-description">-->
  <!--<p class="dbs-icon-button ico-left ico-contents change">-->
  <!--그룹웨어 통합- 검색 - API주소 변경-->
  <!--</p>-->
  <!--</div>-->
  <!--</div>-->
  <!--<div class="project-controls">-->
  <!--<button-->
  <!--type="button"-->
  <!--class="dbs-icon-button ico-left small compare"-->
  <!--&gt;-->
  <!--비교</button-->
  <!--&gt;<button-->
  <!--type="button"-->
  <!--class="dbs-icon-button ico-left small modify"-->
  <!--&gt;-->
  <!--수정</button-->
  <!--&gt;<button-->
  <!--type="button"-->
  <!--class="dbs-icon-button ico-left small change"-->
  <!--&gt;-->
  <!--변경내역</button-->
  <!--&gt;<button-->
  <!--type="button"-->
  <!--class="dbs-icon-button ico-left small document"-->
  <!--&gt;-->
  <!--문서보기</button-->
  <!--&gt;<button-->
  <!--type="button"-->
  <!--disabled-->
  <!--class="dbs-icon-button ico-left small merge"-->
  <!--&gt;-->
  <!--병합요청-->
  <!--</button>-->
  <!--</div>-->
  <!--</div>-->
  <!--</li>-->
  <!--<li class="list-row">-->
  <!--<div class="project-detail">-->
  <!--<div class="project-wrap">-->
  <!--<div class="project-title">-->
  <!--<p>DOC_DownloadCenter</p>-->
  <!--<span class="time">2시간</span>-->
  <!--</div>-->
  <!--<div class="project-description">-->
  <!--<p class="dbs-icon-button ico-left ico-contents change">-->
  <!--다운로드 센터 관련 API 설명 추가-->
  <!--</p>-->
  <!--</div>-->
  <!--</div>-->
  <!--<div class="project-controls">-->
  <!--<button-->
  <!--type="button"-->
  <!--class="dbs-icon-button ico-left small compare"-->
  <!--&gt;-->
  <!--비교</button-->
  <!--&gt;<button-->
  <!--type="button"-->
  <!--class="dbs-icon-button ico-left small modify"-->
  <!--&gt;-->
  <!--수정</button-->
  <!--&gt;<button-->
  <!--type="button"-->
  <!--class="dbs-icon-button ico-left small change"-->
  <!--&gt;-->
  <!--변경내역</button-->
  <!--&gt;<button-->
  <!--type="button"-->
  <!--class="dbs-icon-button ico-left small document"-->
  <!--&gt;-->
  <!--문서보기</button-->
  <!--&gt;<button-->
  <!--type="button"-->
  <!--class="dbs-icon-button ico-left small merge"-->
  <!--&gt;-->
  <!--병합요청-->
  <!--</button>-->
  <!--</div>-->
  <!--</div>-->
  <!--</li>-->
  <!--<li class="list-row">-->
  <!--<div class="project-detail">-->
  <!--<div class="project-wrap">-->
  <!--<div class="project-title">-->
  <!--<p>DOC_1.0.0.1-Releas_DOCS</p>-->
  <!--<span class="time">2일전</span>-->
  <!--</div>-->
  <!--<div class="project-description"></div>-->
  <!--</div>-->
  <!--<div class="project-controls">-->
  <!--<button-->
  <!--type="button"-->
  <!--class="dbs-icon-button ico-left small compare"-->
  <!--&gt;-->
  <!--비교</button-->
  <!--&gt;<button-->
  <!--type="button"-->
  <!--class="dbs-icon-button ico-left small modify"-->
  <!--&gt;-->
  <!--수정</button-->
  <!--&gt;<button-->
  <!--type="button"-->
  <!--class="dbs-icon-button ico-left small change"-->
  <!--&gt;-->
  <!--변경내역</button-->
  <!--&gt;<button-->
  <!--type="button"-->
  <!--class="dbs-icon-button ico-left small document"-->
  <!--&gt;-->
  <!--문서보기</button-->
  <!--&gt;<button-->
  <!--type="button"-->
  <!--class="dbs-icon-button ico-left small merge"-->
  <!--&gt;-->
  <!--병합요청-->
  <!--</button>-->
  <!--</div>-->
  <!--</div>-->
  <!--</li>-->
  <!--<li class="list-row">-->
  <!--<div class="project-detail">-->
  <!--<div class="project-wrap">-->
  <!--<div class="project-title">-->
  <!--<p>DOC_Map_Comp_Doc</p>-->
  <!--<span class="time">3일전</span>-->
  <!--</div>-->
  <!--<div class="project-description">-->
  <!--<p class="dbs-icon-button ico-left ico-contents change">-->
  <!--신규 지도 컴포넌트 사용법 추가-->
  <!--</p>-->
  <!--</div>-->
  <!--</div>-->
  <!--<div class="project-controls">-->
  <!--<button-->
  <!--type="button"-->
  <!--class="dbs-icon-button ico-left small compare"-->
  <!--&gt;-->
  <!--비교</button-->
  <!--&gt;<button-->
  <!--type="button"-->
  <!--class="dbs-icon-button ico-left small modify"-->
  <!--&gt;-->
  <!--수정</button-->
  <!--&gt;<button-->
  <!--type="button"-->
  <!--class="dbs-icon-button ico-left small change"-->
  <!--&gt;-->
  <!--변경내역</button-->
  <!--&gt;<button-->
  <!--type="button"-->
  <!--class="dbs-icon-button ico-left small document"-->
  <!--&gt;-->
  <!--문서보기</button-->
  <!--&gt;<button-->
  <!--type="button"-->
  <!--class="dbs-icon-button ico-left small merge"-->
  <!--&gt;-->
  <!--병합요청-->
  <!--</button>-->
  <!--</div>-->
  <!--</div>-->
  <!--</li>-->
  <!--</ul>-->
  <!--<h3 class="tit-con-sub mgb-15">-->
  <!--병합 요청<span>(기준 브랜치 : master)</span>-->
  <!--</h3>-->
  <!--<ul class="dbs-list mgb-80">-->
  <!--<li class="list-row">-->
  <!--<div class="project-detail">-->
  <!--<div class="project-wrap">-->
  <!--<div class="project-title">-->
  <!--<p>그룹웨어 통합 API 사용법 추가</p>-->
  <!--<span class="time">DOC_Bizboxintegrations > master</span>-->
  <!--</div>-->
  <!--<div class="project-description">-->
  <!--<p>-->
  <!--그룹웨어 통합 API 사용법 및 가이드 문서 추가-->
  <!--</p>-->
  <!--</div>-->
  <!--</div>-->
  <!--<div class="project-controls">-->
  <!--<button-->
  <!--type="button"-->
  <!--class="dbs-icon-button ico-left small compare"-->
  <!--&gt;-->
  <!--비교</button-->
  <!--&gt;<button-->
  <!--type="button"-->
  <!--class="dbs-icon-button ico-left small confirm"-->
  <!--&gt;-->
  <!--승인</button-->
  <!--&gt;<button-->
  <!--type="button"-->
  <!--class="dbs-icon-button ico-left small cancel"-->
  <!--&gt;-->
  <!--취소-->
  <!--</button>-->
  <!--</div>-->
  <!--</div>-->
  <!--</li>-->
  <!--<li class="list-row">-->
  <!--<div class="project-detail">-->
  <!--<div class="project-wrap">-->
  <!--<div class="project-title">-->
  <!--<p>DOC 기준 표기 변경</p>-->
  <!--<span class="time">DOC_doc_standard > master</span>-->
  <!--</div>-->
  <!--<div class="project-description">-->
  <!--<p>-->
  <!--가이드 문서 표준 템플릿 변경-->
  <!--</p>-->
  <!--</div>-->
  <!--</div>-->
  <!--<div class="project-controls">-->
  <!--<button-->
  <!--type="button"-->
  <!--class="dbs-icon-button ico-left small compare"-->
  <!--&gt;-->
  <!--비교</button-->
  <!--&gt;<button-->
  <!--type="button"-->
  <!--class="dbs-icon-button ico-left small confirm"-->
  <!--&gt;-->
  <!--승인</button-->
  <!--&gt;<button-->
  <!--type="button"-->
  <!--class="dbs-icon-button ico-left small cancel"-->
  <!--&gt;-->
  <!--취소-->
  <!--</button>-->
  <!--</div>-->
  <!--</div>-->
  <!--</li>-->
  <!--</ul>-->
  <!--</div>-->
  <!--</div>-->
  <!--</div>-->
  <product-branch-manage></product-branch-manage>
  <!--</div>-->
</template>
<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator';
import ProductBranchManage from '~/components/productBranchManage/index.vue';

@Component({
  layout: 'default',
  components: {
    ProductBranchManage,
  },
  async fetch({ store, params }): Promise<any> {
    try {
      await store.dispatch('product/getProductList');
      await store.dispatch('branch/getBranchList', {
        productCode: params.productCode,
        gitlabToken: store.state.user.user.gitlabToken,
        // gitlabToken: '__5uUEPux-qreBuxsJt2',
      });
      await store.dispatch('product/selectProduct', {
        productCode: params.productCode,
      });
      await store.dispatch('mergeRequest/getMergeRequestList', {
        productCode: params.productCode,
        gitlabToken: store.state.user.user.gitlabToken,
        // gitlabToken: '__5uUEPux-qreBuxsJt2',
      });
      // await store.dispatch('commit/getCommitList', {
      //   productCode: params.productCode,
      //   branchName: 'DOC_branch01',
      // });
      store.state.branch.branchList.forEach((branch) => {
        store.state.mergeRequest.mergeRequestList.forEach((mergeRequest) => {
          if (mergeRequest.source_branch === branch.name) {
            branch.can_push = false;
          }
        });
      });
    } catch (e) {
      console.error(e);
    }
  },
})
export default class extends Vue {}
</script>

<style lang="scss"></style>
