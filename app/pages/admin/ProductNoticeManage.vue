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
  <!--<li class="nav-item depth-3 page">-->
  <!--<a href="#" class="nav-text">작업 브랜치 관리</a>-->
  <!--</li>-->
  <!--<li class="nav-item depth-3 page">-->
  <!--<a href="#" class="nav-text">버전 관리</a>-->
  <!--</li>-->
  <!--<li class="nav-item depth-3 page selected">-->
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
  <!--<h3 class="tit-con-text">DEWS/UI 공지사항 관리</h3>-->
  <!--</div>-->
  <!--<div class="gray-info-box mgt-20 mgb-60">-->
  <!--<ul class="box-notice">-->
  <!--<li>-->
  <!--<div class="ui-select w-170">-->
  <!--<select title="품목형태" class="off" tabindex="-1">-->
  <!--<option value="0" selected="">master</option>-->
  <!--<option value="1">품목1</option>-->
  <!--<option value="2">품목2</option>-->
  <!--</select>-->
  <!--<button-->
  <!--type="button"-->
  <!--class="ui-select-btn"-->
  <!--title="품목형태 선택"-->
  <!--&gt;-->
  <!--전체-->
  <!--</button>-->
  <!--&lt;!&ndash; 셀렉트박스  선택시 ui-select-wrap에 on 추가하면 display block 됨 &ndash;&gt;-->
  <!--<div class="ui-select-wrap">-->
  <!--<strong class="ui-select-tit" tabindex="0"-->
  <!--&gt;품목 선택</strong-->
  <!--&gt;-->
  <!--<div class="ui-select-options">-->
  <!--<button-->
  <!--type="button"-->
  <!--class="ui-select-opt selected"-->
  <!--value="품목1"-->
  <!--&gt;-->
  <!--<b class="ui-select-txt">품목1</b>-->
  <!--</button>-->
  <!--<button type="button" class="ui-select-opt" value="품목2">-->
  <!--<b class="ui-select-txt">품목2</b>-->
  <!--</button>-->
  <!--</div>-->
  <!--</div>-->
  <!--<div class="dim-select"></div>-->
  <!--</div>-->
  <!--<input-->
  <!--type="text"-->
  <!--class="inp-base w-170"-->
  <!--placeholder="키워드"-->
  <!--/>-->
  <!--<input type="text" class="inp-base w-506" placeholder="설명" />-->
  <!--</li>-->
  <!--<li>-->
  <!--<label class="txt-right w-170" style="display: inline-block;"-->
  <!--&gt;연결문서</label-->
  <!--&gt;-->
  <!--<input-->
  <!--type="text"-->
  <!--placeholder="/docs"-->
  <!--class="inp-base"-->
  <!--style="width: 578px;"-->
  <!--/>-->
  <!--<button type="button" class="dbs-icon-button notice"></button>-->
  <!--<button-->
  <!--type="button"-->
  <!--class="dbs-icon-button ico-left small plus"-->
  <!--&gt;-->
  <!--추가-->
  <!--</button>-->
  <!--</li>-->
  <!--</ul>-->
  <!--</div>-->
  <!--<h3 class="tit-con-sub mgb-15">공지사항</h3>-->
  <!--<ul class="dbs-list drag-drop mgb-80">-->
  <!--<li class="list-row">-->
  <!--<div class="project-detail">-->
  <!--<div class="btn-dragdrop"></div>-->
  <!--<div class="project-wrap">-->
  <!--<div class="project-title">-->
  <!--<p><i class="flag patch">PATCH</i>지도 컴포넌트</p>-->
  <!--<span class="info">지도 컴포넌트가 추가되었습니다.</span>-->
  <!--</div>-->
  <!--<div class="project-description">-->
  <!--<p class="dbs-icon-button ico-left ico-contents link">-->
  <!--/docs/components/map/index.md-->
  <!--</p>-->
  <!--</div>-->
  <!--</div>-->
  <!--<div class="project-controls">-->
  <!--<div class="update-note">-->
  <!--<p>2019-11-01 20:00:12</p>-->
  <!--<p>노휘겸(whistle)</p>-->
  <!--</div>-->
  <!--<button-->
  <!--type="button"-->
  <!--class="dbs-icon-button ico-left small delete"-->
  <!--&gt;-->
  <!--삭제-->
  <!--</button>-->
  <!--</div>-->
  <!--</div>-->
  <!--</li>-->
  <!--<li class="list-row">-->
  <!--<div class="project-detail">-->
  <!--<div class="btn-dragdrop"></div>-->
  <!--<div class="project-wrap">-->
  <!--<div class="project-title">-->
  <!--<p><i class="flag recommended">RECOMMENDED</i>패치 배포</p>-->
  <!--<span class="info"-->
  <!--&gt;v.2.0.1547001의 신규 패치가 배포되었습니다.</span-->
  <!--&gt;-->
  <!--</div>-->
  <!--<div class="project-description">-->
  <!--<p class="dbs-icon-button ico-left ico-contents link">-->
  <!--/docs/patches/2019/201547001.md-->
  <!--</p>-->
  <!--</div>-->
  <!--</div>-->
  <!--<div class="project-controls">-->
  <!--<div class="update-note">-->
  <!--<p>2019-11-01 20:00:12</p>-->
  <!--<p>노휘겸(whistle)</p>-->
  <!--</div>-->
  <!--<button-->
  <!--type="button"-->
  <!--class="dbs-icon-button ico-left small delete"-->
  <!--&gt;-->
  <!--삭제-->
  <!--</button>-->
  <!--</div>-->
  <!--</div>-->
  <!--</li>-->
  <!--<li class="list-row">-->
  <!--<div class="project-detail">-->
  <!--<div class="btn-dragdrop"></div>-->
  <!--<div class="project-wrap">-->
  <!--<div class="project-title">-->
  <!--<p><i class="flag new">NEW</i>코드 피커</p>-->
  <!--<span class="info"-->
  <!--&gt;코드 피커의 CODE/VALUE 설정 방법이 변경되었습니다.</span-->
  <!--&gt;-->
  <!--</div>-->
  <!--<div class="project-description">-->
  <!--<p class="dbs-icon-button ico-left ico-contents link">-->
  <!--/docs/components/codepicker/CodeValue.md-->
  <!--</p>-->
  <!--</div>-->
  <!--</div>-->
  <!--<div class="project-controls">-->
  <!--<div class="update-note">-->
  <!--<p>2019-11-01 20:00:12</p>-->
  <!--<p>노휘겸(whistle)</p>-->
  <!--</div>-->
  <!--<button-->
  <!--type="button"-->
  <!--class="dbs-icon-button ico-left small delete"-->
  <!--&gt;-->
  <!--삭제-->
  <!--</button>-->
  <!--</div>-->
  <!--</div>-->
  <!--</li>-->
  <!--<li class="list-row">-->
  <!--<div class="project-detail">-->
  <!--<div class="btn-dragdrop"></div>-->
  <!--<div class="project-wrap">-->
  <!--<div class="project-title">-->
  <!--<p><i class="flag sample">SAMPLE</i>패치 배포</p>-->
  <!--<span class="info"-->
  <!--&gt;v.2.0.1547001의 신규 패치가 배포되었습니다.</span-->
  <!--&gt;-->
  <!--</div>-->
  <!--<div class="project-description">-->
  <!--<p class="dbs-icon-button ico-left ico-contents link">-->
  <!--/docs/patches/2019/201547001.md-->
  <!--</p>-->
  <!--</div>-->
  <!--</div>-->
  <!--<div class="project-controls">-->
  <!--<div class="update-note">-->
  <!--<p>2019-11-01 20:00:12</p>-->
  <!--<p>노휘겸(whistle)</p>-->
  <!--</div>-->
  <!--<button-->
  <!--type="button"-->
  <!--class="dbs-icon-button ico-left small delete"-->
  <!--&gt;-->
  <!--삭제-->
  <!--</button>-->
  <!--</div>-->
  <!--</div>-->
  <!--</li>-->
  <!--</ul>-->
  <!--</div>-->
  <!--</div>-->
  <!--</div>-->
  <!--</div>-->
  <product-notice-manage></product-notice-manage>
</template>
<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator';
import ProductNoticeManage from '~/components/productNoticeManage/index.vue';

@Component({
  layout: 'default',
  components: {
    ProductNoticeManage,
  },
  async fetch({ store, params }): Promise<any> {
    try {
      await store.dispatch('product/getProductList');

      await store.dispatch('product/selectProduct', {
        productCode: params.productCode,
      });

      await store.dispatch('notice/getNoticeList', {
        productCode: params.productCode,
      });

      await store.dispatch('repository/getIndexMdFile', {
        productCode: params.productCode,
        ref: 'master',
        refType: 'targetBranch',
      });
    } catch (e) {
      console.error(e);
    }
  },
})
export default class extends Vue {}
</script>

<style lang="scss"></style>
