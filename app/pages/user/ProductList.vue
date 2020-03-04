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
  <!--&lt;!&ndash; search &ndash;&gt;-->
  <!--<div class="srch-wrap-bar mgt-60 mgb-60">-->
  <!--<div class="srch-wrap">-->
  <!--<input-->
  <!--type="search"-->
  <!--class="m-srch-bar"-->
  <!--placeholder="모든 제품에 대한 사용법, API, 질문 등을 검색하세요"-->
  <!--/>-->
  <!--<button type="button" class="btn-search">search</button>-->
  <!--</div>-->
  <!--</div>-->
  <!--<div class="position-wrap">-->
  <!--<h1 class="tit-h1">제품</h1>-->
  <!--<div class="pst-rbtn">-->
  <!--<button type="button" class="btn-sub-large">-->
  <!--관리-->
  <!--</button>-->
  <!--</div>-->
  <!--</div>-->
  <!--<div class="dbs-visual-wrap docs mgb-60">-->
  <!--<a href="dews-ui.html" class="dbs-visual-list">-->
  <!--<dl class="dews-ui">-->
  <!--<dt>DEWS UI</dt>-->
  <!--<dd>Project Sub Description</dd>-->
  <!--</dl>-->
  <!--<button role="button" class="ico-setting">설정</button>-->
  <!--<p class="icon"><span>UI</span></p>-->
  <!--<button type="button" class="btn-detail btn-sub-small">-->
  <!--자세히보기-->
  <!--</button>-->
  <!--</a>-->
  <!--<a href="dews-j.html" class="dbs-visual-list">-->
  <!--<dl class="dews-j">-->
  <!--<dt>DEWS J</dt>-->
  <!--<dd>Project Sub Description</dd>-->
  <!--</dl>-->
  <!--<p class="icon"><span>J</span></p>-->
  <!--<button type="button" class="btn-detail btn-sub-small">-->
  <!--자세히보기-->
  <!--</button>-->
  <!--</a>-->
  <!--<a href="dews-fd.html" class="dbs-visual-list"-->
  <!--&gt;<dl class="dews-fd">-->
  <!--<dt>DEWS FD</dt>-->
  <!--<dd>Project Sub Description</dd>-->
  <!--</dl>-->
  <!--<p class="icon"><span>FD</span></p>-->
  <!--<button type="button" class="btn-detail btn-sub-small">-->
  <!--자세히보기-->
  <!--</button></a-->
  <!--&gt;-->
  <!--<a href="dews-bd.html" class="dbs-visual-list"-->
  <!--&gt;<dl class="dews-bd">-->
  <!--<dt>DEWS BD</dt>-->
  <!--<dd>Project Sub Description</dd>-->
  <!--</dl>-->
  <!--<p class="icon"><span>BD</span></p>-->
  <!--<button type="button" class="btn-detail btn-sub-small">-->
  <!--자세히보기-->
  <!--</button></a-->
  <!--&gt;-->
  <!--<a href="dews-q.html" class="dbs-visual-list">-->
  <!--<dl class="dews-q">-->
  <!--<dt>DEWS Q</dt>-->
  <!--<dd>Project Sub Description</dd>-->
  <!--</dl>-->
  <!--<p class="icon"><span>Q</span></p>-->
  <!--<button type="button" class="btn-detail btn-sub-small">-->
  <!--자세히보기-->
  <!--</button>-->
  <!--</a>-->
  <!--<a href="d-erp.html" class="dbs-visual-list">-->
  <!--<dl class="dews-erp">-->
  <!--<dt>D_ERP</dt>-->
  <!--<dd>Project Sub Description</dd>-->
  <!--</dl>-->
  <!--<p class="icon"><span>D</span></p>-->
  <!--<button type="button" class="btn-detail btn-sub-small">-->
  <!--자세히보기-->
  <!--</button>-->
  <!--</a>-->
  <!--</div>-->

  <!--<h1 class="tit-h1">새소식</h1>-->
  <!--<div class="ui-tab mgb-80">-->
  <!--<div class="ui-tab-btns tab-6" role="tablist">-->
  <!--<a href="#" class="ui-tab-btn active" data-tab="1"><i>DEWS UI</i></a>-->
  <!--<a href="#" class="ui-tab-btn" data-tab="2"><i>DEWS J</i></a>-->
  <!--<a href="#" class="ui-tab-btn" data-tab="3"><i>DEWS FD</i></a>-->
  <!--<a href="#" class="ui-tab-btn" data-tab="4"><i>DEWS BD</i></a>-->
  <!--<a href="#" class="ui-tab-btn" data-tab="5"><i>DEWS Q</i></a>-->
  <!--<a href="#" class="ui-tab-btn" data-tab="6"><i>D_ERP</i></a>-->
  <!--</div>-->
  <!--<div class="ui-tab-pnls mgt-30">-->
  <!--<section id="tab1" class="ui-tab-pnl active" role="tabpanel">-->
  <!--<ul class="dbs-list-basic">-->
  <!--<li>-->
  <!--<dl>-->
  <!--<dd class="category">버튼</dd>-->
  <!--<dd class="subject">-->
  <!--<a href=""-->
  <!--&gt;group type 컬럼 사용시 웹에서 표시되는 그리드화면과-->
  <!--엑셀다운로드시 화면이 다르게 나오는 문제 어떻게 해야-->
  <!--하나요? 문의드립니다. </a-->
  <!--&gt;<i class="flag updated">UPDATE</i>-->
  <!--</dd>-->
  <!--<dd class="date">2019.08.15 15:12</dd>-->
  <!--</dl>-->
  <!--</li>-->
  <!--<li>-->
  <!--<dl>-->
  <!--<dd class="category">폼 컨트롤</dd>-->
  <!--<dd class="subject">-->
  <!--<a href=""-->
  <!--&gt;엑셀에서 음수의 표현식 (100)이라는 값을 가진 셀을-->
  <!--복사한후, 리얼그리드 붙여넣기기 해결방법 문의</a-->
  <!--&gt;<i class="flag recommended">RECOMMENDED</i>-->
  <!--</dd>-->
  <!--<dd class="date">2019.08.15 15:12</dd>-->
  <!--</dl>-->
  <!--</li>-->
  <!--<li>-->
  <!--<dl>-->
  <!--<dd class="category">컨테이너</dd>-->
  <!--<dd class="subject">-->
  <!--<a href="">그리드, 트리뷰, 데이터 소스, 차트</a-->
  <!--&gt;<i class="flag sample">SAMPLE</i>-->
  <!--</dd>-->
  <!--<dd class="date">2019.08.15 15:12</dd>-->
  <!--</dl>-->
  <!--</li>-->
  <!--<li>-->
  <!--<dl>-->
  <!--<dd class="category">데이터</dd>-->
  <!--<dd class="subject">-->
  <!--<a href=""-->
  <!--&gt;소수점 절사 editFormat, numberFormat 적용시 입력값과-->
  <!--display값이 다르게 보임</a-->
  <!--&gt;<i class="flag patch">PATCH</i>-->
  <!--</dd>-->
  <!--<dd class="date">2019.08.15 15:12</dd>-->
  <!--</dl>-->
  <!--</li>-->
  <!--<li>-->
  <!--<dl>-->
  <!--<dd class="category">데이터 통신</dd>-->
  <!--<dd class="subject">-->
  <!--<a href="">그리드, 트리뷰, 데이터 소스, 차트</a-->
  <!--&gt;<i class="flag new">NEW</i>-->
  <!--</dd>-->
  <!--<dd class="date">2019.08.15 15:12</dd>-->
  <!--</dl>-->
  <!--</li>-->
  <!--<li>-->
  <!--<dl>-->
  <!--<dd class="category">메인기능</dd>-->
  <!--<dd class="subject">-->
  <!--<a href="">그리드, 트리뷰, 차트, 데이터 소스, 차트</a-->
  <!--&gt;<i class="flag updated">UPDATE</i>-->
  <!--</dd>-->
  <!--<dd class="date">2019.08.15 15:12</dd>-->
  <!--</dl>-->
  <!--</li>-->
  <!--</ul>-->
  <!--</section>-->
  <!--<section id="tab2" class="ui-tab-pnl" role="tabpanel">-->
  <!--22222-->
  <!--</section>-->
  <!--<section id="tab3" class="ui-tab-pnl" role="tabpanel">-->
  <!--33333-->
  <!--</section>-->
  <!--<section id="tab4" class="ui-tab-pnl" role="tabpanel">-->
  <!--4444-->
  <!--</section>-->
  <!--<section id="tab5" class="ui-tab-pnl" role="tabpanel">-->
  <!--5555-->
  <!--</section>-->
  <!--<section id="tab6" class="ui-tab-pnl" role="tabpanel">-->
  <!--6666-->
  <!--</section>-->
  <!--</div>-->
  <!--</div>-->
  <!--</div>-->
  <!--</div>-->
  <product-list></product-list>
</template>
<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator';
import ProductList from '~/components/productList/index.vue';

@Component({
  layout: 'default',
  components: {
    ProductList,
  },
  async fetch({ store }): Promise<any> {
    try {
      await store.dispatch('product/getProductList');

      if (
        store.state.product.productList !== undefined &&
        store.state.product.productList.length > 0
      ) {
        await store.dispatch('notice/getNoticeList', {
          productCode: store.state.product.productList[0].productCode,
        });
      }
    } catch (e) {
      console.error(e);
    }
  },
})
export default class extends Vue {}
</script>

<style lang="scss"></style>
