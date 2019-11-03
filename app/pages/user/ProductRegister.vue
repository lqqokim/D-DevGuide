<template>
  <div>
    <!--<div class=" dbs-container txt-left mgt-50">-->
    <!--<h1 class="tit">제품 정보 등록</h1>-->
    <!--<div class="tbl-wrap mgt-10">-->
    <!--<table class="tbl-write tbl-fixed">-->
    <!--<colgroup>-->
    <!--<col style="width: 20%;" />-->
    <!--<col style="width: auto;" />-->
    <!--</colgroup>-->
    <!--<tbody>-->
    <!--<tr>-->
    <!--<th scope="row">-->
    <!--제품군<em class="required"-->
    <!--&gt;*<span class="hide">필수입력항목</span></em-->
    <!--&gt;-->
    <!--</th>-->
    <!--<td>-->
    <!--<div class="ui-select">-->
    <!--<select title="품목형태" class="off" tabindex="-1">-->
    <!--<option value="0" selected="">전체</option>-->
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
    <!--<strong class="ui-select-tit" tabindex="0">품목 선택</strong>-->
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
    <!--</td>-->
    <!--</tr>-->
    <!--<tr>-->
    <!--<th scope="row">-->
    <!--제품명<em class="required"-->
    <!--&gt;*<span class="hide">필수입력항목</span></em-->
    <!--&gt;-->
    <!--</th>-->
    <!--<td>-->
    <!--<input-->
    <!--type="text"-->
    <!--class="inp-base w-100p"-->
    <!--placeholder="해당 제품 링크내 삽입될 제품"-->
    <!--/>-->
    <!--</td>-->
    <!--</tr>-->
    <!--<tr>-->
    <!--<th scope="row">-->
    <!--제품설명<em class="required"-->
    <!--&gt;*<span class="hide">필수입력항목</span></em-->
    <!--&gt;-->
    <!--</th>-->
    <!--<td>-->
    <!--<input-->
    <!--type="text"-->
    <!--class="inp-base w-100p"-->
    <!--placeholder="링크 버튼내 삽입될 간략한 설명"-->
    <!--/>-->
    <!--</td>-->
    <!--</tr>-->
    <!--<tr>-->
    <!--<th scope="row">-->
    <!--프로젝트 ID<em class="required"-->
    <!--&gt;*<span class="hide">필수입력항목</span></em-->
    <!--&gt;-->
    <!--</th>-->
    <!--<td>-->
    <!--<input-->
    <!--type="text"-->
    <!--class="inp-base w-100p"-->
    <!--placeholder="등록할 제품의 Git Project ID"-->
    <!--/>-->
    <!--<p class="caution">-->
    <!--등록한 Git 프로젝트소스 내에 개발자 문서가 포함되어 있어야-->
    <!--합니다.-->
    <!--</p>-->
    <!--</td>-->
    <!--</tr>-->
    <!--<tr>-->
    <!--<th scope="row">-->
    <!--병합요청 대상 브랜치명<em class="required"-->
    <!--&gt;*<span class="hide">필수입력항목</span></em-->
    <!--&gt;-->
    <!--</th>-->
    <!--<td>-->
    <!--<input-->
    <!--type="text"-->
    <!--class="inp-base w-100p"-->
    <!--placeholder="ex: dev"-->
    <!--/>-->
    <!--<p class="caution">-->
    <!--병합할 대상브랜치에서 각 편집자가 작업한 내용들이 합쳐집니다.-->
    <!--</p>-->
    <!--</td>-->
    <!--</tr>-->
    <!--<tr>-->
    <!--<th scope="row">-->
    <!--제품 사용법 문서 경로<em class="required"-->
    <!--&gt;*<span class="hide">필수입력항목</span></em-->
    <!--&gt;-->
    <!--</th>-->
    <!--<td>-->
    <!--<input-->
    <!--type="text"-->
    <!--class="inp-base w-100p"-->
    <!--placeholder="등록할 프로젝트 Git의 문서폴더 경로(ex: path/to/dec)"-->
    <!--/>-->
    <!--<p class="caution">-->
    <!--등록할 경로 밑에 마크다운 파일로 문서가 존재해야 한다.-->
    <!--</p>-->
    <!--</td>-->
    <!--</tr>-->
    <!--<tr>-->
    <!--<th scope="row">제품 API 문서 경로</th>-->
    <!--<td>-->
    <!--<input-->
    <!--type="text"-->
    <!--class="inp-base w-100p"-->
    <!--placeholder="등록할 프로젝트 Git의 문서폴더 경로(ex: path/to/api)"-->
    <!--/>-->
    <!--<p class="caution">-->
    <!--등록할 경로 밑에 마크다운 파일로 문서가 존재해야 한다. API가-->
    <!--필요없는 경우 공란으로 설정한다.-->
    <!--</p>-->
    <!--</td>-->
    <!--</tr>-->
    <!--<tr>-->
    <!--<th scope="row">첨부파일 경로</th>-->
    <!--<td>-->
    <!--<input-->
    <!--type="text"-->
    <!--class="inp-base w-100p"-->
    <!--placeholder="등록할 프로젝트 Git의 문서폴더 경로(ex: path/to/doc_file)"-->
    <!--/>-->
    <!--<p class="caution">-->
    <!--등록할 경로 밑에 마크다운 파일로 문서가 존재해야 한다. API가-->
    <!--필요없는 경우 공란으로 설정한다.-->
    <!--</p>-->
    <!--</td>-->
    <!--</tr>-->
    <!--</tbody>-->
    <!--</table>-->
    <!--</div>-->
    <!--<div class="btn-wrap mgt-30">-->
    <!--<a href="#" class="btn-main" role="button">등록</a>-->
    <!--</div>-->
    <product-register></product-register>
  </div>
</template>
<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator';
import ProductRegister from '~/components/productRegister/index.vue';
// import RegisterForm from '~/components/productRegister/RegisterForm.vue';

@Component({
  layout: 'TypeA',
  components: {
    ProductRegister,
    // RegisterForm,
  },
})
export default class extends Vue {}
</script>

<style lang="scss"></style>
