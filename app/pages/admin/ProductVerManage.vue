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
  <!--<div class="dbs-container">-->
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
  <!--<li class="nav-item depth-3 page selected">-->
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
  <!--<h1 class="tit-con-text">DEWS/UI 버전 관리</h1>-->
  <!--</div>-->
  <!--<div class="gray-info-box mgt-20 mgb-60">-->
  <!--<p>-->
  <!--<span class="font-accent-color">DEWS/UI</span> 제품의 기준-->
  <!--브랜치인 <strong>master</strong> 브랜치의 현재 시점을 기준으로-->
  <!--신규 버전을 생성합니다. <br />버전이 생성되면-->
  <!--<strong>master</strong> 브랜치의 내용이 변경되어도 버전 시점의-->
  <!--문서를 사용자들이 확인할 수 있게 됩니다.<br />-->
  <!--생성된 버전은 Git Repository 에서 Tag로 관리됩니다.-->
  <!--</p>-->
  <!--</div>-->
  <!--<h2 class="tit-con-sub">버전</h2>-->
  <!--<ul class="dbs-list mgt-10">-->
  <!--<li class="list-row bg-gray bdr-bot-none">-->
  <!--<div class="project-detail">-->
  <!--<div class="project-wrap">-->
  <!--<div class="project-title">-->
  <!--<p>Recent</p>-->
  <!--<span class="time">현시점</span>-->
  <!--</div>-->
  <!--<div class="project-description">-->
  <!--<p class="dbs-icon-button ico-left ico-contents branch">-->
  <!--master-->
  <!--</p>-->
  <!--</div>-->
  <!--</div>-->
  <!--<div class="project-controls">-->
  <!--<button-->
  <!--type="button"-->
  <!--class="dbs-icon-button ico-left large tag-white"-->
  <!--&gt;-->
  <!--신규버젼생성-->
  <!--</button>-->
  <!--&lt;!&ndash; disabled button&ndash;&gt;-->
  <!--&lt;!&ndash;button-->
  <!--type="button"-->
  <!--disabled="disabled"-->
  <!--class="dbs-icon-button ico-left large tag-white"-->
  <!--&gt;-->
  <!--신규버젼생성-->
  <!--</button&ndash;&gt;-->
  <!--</div>-->
  <!--</div>-->
  <!--</li>-->
  <!--<li class="list-row bdr-bot-none">-->
  <!--<div class="project-detail">-->
  <!--<div class="project-wrap">-->
  <!--<div class="project-title">-->
  <!--<input-->
  <!--type="text"-->
  <!--class="inp-base mgb-5"-->
  <!--style="width: 310px;"-->
  <!--placeholder="버전이름"-->
  <!--/>-->
  <!--</div>-->
  <!--<div class="project-description">-->
  <!--<p-->
  <!--class="dbs-icon-button ico-left ico-contents tag verti-md"-->
  <!--&gt;-->
  <!--DOC_-->
  <!--</p>-->
  <!--<input-->
  <!--type="text"-->
  <!--class="inp-base"-->
  <!--style="width: 238px;"-->
  <!--placeholder="태그명"-->
  <!--/>-->
  <!--</div>-->
  <!--</div>-->
  <!--<div class="project-controls">-->
  <!--<button-->
  <!--type="button"-->
  <!--class="dbs-icon-button ico-left small confirm"-->
  <!--&gt;-->
  <!--확인</button-->
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
  <!--<ul class="dbs-list drag-drop mgb-80">-->
  <!--<li class="list-row">-->
  <!--<div class="project-detail">-->
  <!--<div class="btn-dragdrop"></div>-->
  <!--<div class="project-wrap">-->
  <!--<div class="project-title">-->
  <!--<p>v2.0-190702</p>-->
  <!--</div>-->
  <!--<div class="project-description">-->
  <!--<p class="dbs-icon-button ico-left ico-contents tag">-->
  <!--DOC_v2.0-191101-->
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
  <!--<p>v2.0-190702</p>-->
  <!--</div>-->
  <!--<div class="project-description">-->
  <!--<p class="dbs-icon-button ico-left ico-contents tag">-->
  <!--DOC_v2.0-191101-->
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
  <!--<p>v2.0-190702</p>-->
  <!--</div>-->
  <!--<div class="project-description">-->
  <!--<p class="dbs-icon-button ico-left ico-contents tag">-->
  <!--DOC_v2.0-191101-->
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
  <!--<p>v2.0-190702</p>-->
  <!--</div>-->
  <!--<div class="project-description">-->
  <!--<p class="dbs-icon-button ico-left ico-contents tag">-->
  <!--DOC_v2.0-191101-->
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
  <product-ver-manage></product-ver-manage>
</template>
<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator';
import ProductVerManage from '~/components/productVerManage/index.vue';

@Component({
  layout: 'default',
  components: {
    ProductVerManage,
  },
  fetch({ store, params }): any {
    try {
      // await store.dispatch('product/getProductList');
      //
      // await store.dispatch('product/selectProduct', {
      //   productCode: params.productCode,
      // });
      // await store.dispatch('version/getVersionList', {
      //   productCode: params.productCode,
      // });
      // if (!store.state.user.user.gitlabToken) {
      //   return;
      // }
    } catch (e) {
      console.error(e);
    }
  },
})
export default class extends Vue {}
</script>

<style lang="scss"></style>
