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
  <!--&lt;!&ndash; 좌측메뉴 S &ndash;&gt;-->
  <!--<div class="left-menu">-->
  <!--<p class="tit-con-left"><strong>개발자 문서 관리</strong></p>-->
  <!--<div class="ui-accordion-left-pnl">-->
  <!--<ul>-->
  <!--<li class="nav-item depth-1 folder">-->
  <!--<a href="#" class="nav-text">문서관리</a>-->
  <!--<ul class="nav-container depth-2">-->
  <!--<li class="nav-item depth-2 page">-->
  <!--<a href="#" class="nav-text">DEWS UI</a>-->
  <!--</li>-->
  <!--<li class="nav-item depth-2 page">-->
  <!--<a href="#" class="nav-text">DEWS J</a>-->
  <!--</li>-->
  <!--<li class="nav-item depth-2 page">-->
  <!--<a href="#" class="nav-text">DEWS Q</a>-->
  <!--</li>-->
  <!--</ul>-->
  <!--</li>-->
  <!--<li class="nav-item depth-1 page selected">-->
  <!--<a href="#" class="nav-text">제품관리</a>-->
  <!--</li>-->
  <!--</ul>-->
  <!--</div>-->
  <!--</div>-->
  <!--&lt;!&ndash; // 좌측메뉴 E &ndash;&gt;-->
  <!--<div class="container-panel">-->
  <!--<div class="view-top">-->
  <!--<h1 class="tit-con-text">제품관리</h1>-->
  <!--<div class="pst-rbtn">-->
  <!--<button type="button" class="btn-sub-large">-->
  <!--추가-->
  <!--</button>-->
  <!--<button type="button" class="btn-sub-large">-->
  <!--삭제-->
  <!--</button>-->
  <!--</div>-->
  <!--</div>-->
  <!--<div class="product-manage-wrap mgb-80">-->
  <!--<div class="left-proc-menu">-->
  <!--<div class="dbs-visual-wrap manage">-->
  <!--<a href="dews-ui.html" class="dbs-visual-list">-->
  <!--<dl class="dews-ui">-->
  <!--<dt>DEWS UI</dt>-->
  <!--<dd>DEWS Front-end UI Framework</dd>-->
  <!--</dl>-->
  <!--<p class="icon"><span>UI</span></p>-->
  <!--<p class="btn-move">이동</p>-->
  <!--</a>-->
  <!--<a href="dews-j.html" class="dbs-visual-list">-->
  <!--<dl class="dews-j">-->
  <!--<dt>DEWS J</dt>-->
  <!--<dd>DEWS Front-end UI Framework</dd>-->
  <!--</dl>-->
  <!--<p class="icon"><span>J</span></p>-->
  <!--<p class="btn-move">이동</p>-->
  <!--</a>-->
  <!--<a href="dews-fd.html" class="dbs-visual-list"-->
  <!--&gt;<dl class="dews-fd">-->
  <!--<dt>DEWS FD</dt>-->
  <!--<dd>Project Sub Description</dd>-->
  <!--</dl>-->
  <!--<p class="icon"><span>FD</span></p>-->
  <!--<p class="btn-move">이동</p></a-->
  <!--&gt;-->
  <!--<a href="dews-bd.html" class="dbs-visual-list"-->
  <!--&gt;<dl class="dews-bd">-->
  <!--<dt>DEWS BD</dt>-->
  <!--<dd>Project Sub Description</dd>-->
  <!--</dl>-->
  <!--<p class="icon"><span>BD</span></p>-->
  <!--<p class="btn-move">이동</p></a-->
  <!--&gt;-->
  <!--<a href="dews-ui.html" class="dbs-visual-list">-->
  <!--<dl class="dews-ui">-->
  <!--<dt>DEWS UI</dt>-->
  <!--<dd>DEWS Front-end UI Framework</dd>-->
  <!--</dl>-->
  <!--<p class="icon"><span>UI</span></p>-->
  <!--<p class="btn-move">이동</p>-->
  <!--</a>-->
  <!--</div>-->
  <!--</div>-->
  <!--<div class="right-proc-content">-->
  <!--<h2 class="tit-con-icon-title icon-title dews">제품정보</h2>-->
  <!--<div class="tbl-wrap mgb-60">-->
  <!--<table class="tbl-write tbl-fixed">-->
  <!--<colgroup>-->
  <!--<col style="width: 154px;" />-->
  <!--<col style="width: auto;" />-->
  <!--</colgroup>-->
  <!--<tbody>-->
  <!--<tr>-->
  <!--<th scope="row">제품명</th>-->
  <!--<td>-->
  <!--<input-->
  <!--type="text"-->
  <!--class="inp-base w-100p"-->
  <!--placeholder="DEWS/UI"-->
  <!--/>-->
  <!--</td>-->
  <!--</tr>-->
  <!--<tr>-->
  <!--<th scope="row">제품코드</th>-->
  <!--<td>-->
  <!--<input-->
  <!--type="text"-->
  <!--class="inp-base w-100p"-->
  <!--placeholder="UI"-->
  <!--/>-->
  <!--</td>-->
  <!--</tr>-->
  <!--<tr>-->
  <!--<th scope="row">제품설명</th>-->
  <!--<td>-->
  <!--<input-->
  <!--type="text"-->
  <!--class="inp-base w-100p"-->
  <!--placeholder="DEWS Front-end UI Framework"-->
  <!--/>-->
  <!--</td>-->
  <!--</tr>-->
  <!--<tr>-->
  <!--<th scope="row">API 섹션 사용 여부</th>-->
  <!--<td>-->
  <!--<div class="dbs-checkbox-wrapper">-->
  <!--<input-->
  <!--id="uiCheck1"-->
  <!--type="checkbox"-->
  <!--name="uiCheck1"-->
  <!--/>-->
  <!--<label for="uiCheck1" class="dbs-checkbox"-->
  <!--&gt;사용</label-->
  <!--&gt;-->
  <!--</div>-->
  <!--</td>-->
  <!--</tr>-->
  <!--</tbody>-->
  <!--</table>-->
  <!--</div>-->
  <!--<h2 class="tit-con-icon-title icon-title gitlab">-->
  <!--GitLab 리포지토리 정보-->
  <!--</h2>-->
  <!--<div class="tbl-wrap mgb-60">-->
  <!--<table class="tbl-write tbl-fixed">-->
  <!--<colgroup>-->
  <!--<col style="width: 154px;" />-->
  <!--<col style="width: auto;" />-->
  <!--</colgroup>-->
  <!--<tbody>-->
  <!--<tr>-->
  <!--<th scope="row">프로젝트 ID</th>-->
  <!--<td>-->
  <!--<input-->
  <!--type="text"-->
  <!--class="inp-base w-100p status-error"-->
  <!--placeholder="DEWS15"-->
  <!--/>&lt;!&ndash;input-->
  <!--type="text"-->
  <!--class="inp-base w-100p status-success"-->
  <!--placeholder="DEWS15"-->
  <!--/&ndash;&gt;-->
  <!--</td>-->
  <!--</tr>-->
  <!--<tr>-->
  <!--<th scope="row">기준 브랜치</th>-->
  <!--<td>-->
  <!--<div class="ui-select w-100p">-->
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
  <!--<button-->
  <!--type="button"-->
  <!--class="ui-select-opt"-->
  <!--value="품목2"-->
  <!--&gt;-->
  <!--<b class="ui-select-txt">품목2</b>-->
  <!--</button>-->
  <!--</div>-->
  <!--</div>-->
  <!--</div>-->
  <!--</td>-->
  <!--</tr>-->
  <!--<tr>-->
  <!--<th scope="row">제품설명</th>-->
  <!--<td>-->
  <!--<input-->
  <!--type="text"-->
  <!--class="inp-base w-100p"-->
  <!--placeholder="DEWS Front-end UI Framework"-->
  <!--/>-->
  <!--</td>-->
  <!--</tr>-->
  <!--<tr>-->
  <!--<th scope="row">문서 기본 경로</th>-->
  <!--<td>-->
  <!--<input-->
  <!--type="text"-->
  <!--class="inp-base w-269"-->
  <!--placeholder="/docs"-->
  <!--/>-->
  <!--<button-->
  <!--type="button"-->
  <!--class="dbs-icon-button file"-->
  <!--&gt;</button>-->
  <!--</td>-->
  <!--</tr>-->
  <!--<tr>-->
  <!--<th scope="row">API 기본 경로</th>-->
  <!--<td>-->
  <!--<input-->
  <!--type="text"-->
  <!--class="inp-base w-269"-->
  <!--placeholder="/docs/api"-->
  <!--/>-->
  <!--<button-->
  <!--type="button"-->
  <!--class="dbs-icon-button file"-->
  <!--&gt;</button>-->
  <!--</td>-->
  <!--</tr>-->
  <!--</tbody>-->
  <!--</table>-->
  <!--</div>-->
  <!--<div class="position-wrap">-->
  <!--<h2 class="tit-con-icon-title icon-title manager">-->
  <!--관리자 정보-->
  <!--</h2>-->
  <!--<div class="pst-rbtn">-->
  <!--<button-->
  <!--type="button"-->
  <!--class="dbs-icon-button ico-left small plus"-->
  <!--&gt;-->
  <!--추가-->
  <!--</button>-->
  <!--</div>-->
  <!--</div>-->
  <!--<div class="tbl-wrap mgb-20">-->
  <!--<table class="tbl-write-ver tbl-fixed">-->
  <!--<colgroup>-->
  <!--<col style="width: 200px;" />-->
  <!--<col style="width: auto;" span="3" />-->
  <!--</colgroup>-->
  <!--<thead>-->
  <!--<tr>-->
  <!--<th>이름(아이)</th>-->
  <!--<th>작성</th>-->
  <!--<th>병합</th>-->
  <!--<th>삭제</th>-->
  <!--</tr>-->
  <!--</thead>-->
  <!--<tbody>-->
  <!--<tr>-->
  <!--<td>노휘겸(whistle)</td>-->
  <!--<td>-->
  <!--<div class="dbs-checkbox-wrapper">-->
  <!--<input-->
  <!--id="uiCheck11"-->
  <!--type="checkbox"-->
  <!--name="uiCheck11"-->
  <!--checked="checked"-->
  <!--/>-->
  <!--<label for="uiCheck11" class="dbs-checkbox"></label>-->
  <!--</div>-->
  <!--</td>-->
  <!--<td>-->
  <!--<div class="dbs-checkbox-wrapper">-->
  <!--<input-->
  <!--id="uiCheck12"-->
  <!--type="checkbox"-->
  <!--name="uiCheck12"-->
  <!--checked="checked"-->
  <!--/>-->
  <!--<label for="uiCheck12" class="dbs-checkbox"></label>-->
  <!--</div>-->
  <!--</td>-->
  <!--<td>삭제</td>-->
  <!--</tr>-->
  <!--<tr>-->
  <!--<td>정일영(jiy)</td>-->
  <!--<td>-->
  <!--<div class="dbs-checkbox-wrapper">-->
  <!--<input-->
  <!--id="uiCheck21"-->
  <!--type="checkbox"-->
  <!--name="uiCheck21"-->
  <!--checked="checked"-->
  <!--/>-->
  <!--<label for="uiCheck21" class="dbs-checkbox"></label>-->
  <!--</div>-->
  <!--</td>-->
  <!--<td>-->
  <!--<div class="dbs-checkbox-wrapper">-->
  <!--<input-->
  <!--id="uiCheck22"-->
  <!--type="checkbox"-->
  <!--name="uiCheck22"-->
  <!--checked="checked"-->
  <!--/>-->
  <!--<label for="uiCheck22" class="dbs-checkbox"></label>-->
  <!--</div>-->
  <!--</td>-->
  <!--<td>삭제</td>-->
  <!--</tr>-->
  <!--<tr>-->
  <!--<td>전병철(jbc)</td>-->
  <!--<td>-->
  <!--<div class="dbs-checkbox-wrapper">-->
  <!--<input-->
  <!--id="uiCheck31"-->
  <!--type="checkbox"-->
  <!--name="uiCheck31"-->
  <!--checked="checked"-->
  <!--/>-->
  <!--<label for="uiCheck31" class="dbs-checkbox"></label>-->
  <!--</div>-->
  <!--</td>-->
  <!--<td>-->
  <!--<div class="dbs-checkbox-wrapper">-->
  <!--<input-->
  <!--id="uiCheck32"-->
  <!--type="checkbox"-->
  <!--name="uiCheck32"-->
  <!--/>-->
  <!--<label for="uiCheck32" class="dbs-checkbox"></label>-->
  <!--</div>-->
  <!--</td>-->
  <!--<td>삭제</td>-->
  <!--</tr>-->
  <!--</tbody>-->
  <!--</table>-->
  <!--</div>-->
  <!--<div class="btn-wrap-sub">-->
  <!--<button-->
  <!--type="button"-->
  <!--class="dbs-icon-button ico-left small confirm"-->
  <!--&gt;-->
  <!--확인-->
  <!--</button>-->
  <!--<button-->
  <!--type="button"-->
  <!--class="dbs-icon-button ico-left small cancel"-->
  <!--&gt;-->
  <!--취소-->
  <!--</button>-->
  <!--</div>-->
  <!--</div>-->
  <!--</div>-->
  <!--</div>-->
  <!--</div>-->
  <!--</div>-->
  <!--</div>-->
  <product-manage></product-manage>
</template>
<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator';
import ProductManage from '~/components/productManage/index.vue';

@Component({
  layout: 'default',
  components: {
    ProductManage,
  },
})
export default class extends Vue {}
</script>

<style lang="scss"></style>
