<template>
  <div class="dbs-container-wrap">
    <div class="viewer-wrap">
      <div class="dbs-top-image-wrap guide">
        <div class="dbs-top-image">
          <dl>
            <dt>개발자 가이드</dt>
            <dd>
              개발자가이드 서브 텍스트입니다. <br />
              개발자 가이드 서브 텍스트입니다 서브 텍스트입니다.
            </dd>
          </dl>
        </div>
      </div>
    </div>
    <div class="dbs-container">
      <!-- search -->
      <div class="srch-wrap-bar mgt-60">
        <div class="srch-wrap">
          <input
            type="search"
            class="m-srch-bar"
            placeholder="모든 제품에 대한 사용법, API, 질문 등을 검색하세요"
          />
          <button type="button" class="btn-search">search</button>
        </div>
      </div>
      <div class="srch-tag mgt-20">
        <strong>추천테그</strong>
        <ul class="keyword-list">
          <li>
            <a href="">#DEWS UI</a>
          </li>
          <li>
            <a href="">#DEWS J</a>
          </li>
          <li>
            <a href="">#DEWS STUDIO</a>
          </li>
          <li>
            <a href="">#SERVICE</a>
          </li>
          <li>
            <a href="">#신규서비스</a>
          </li>
          <li>
            <a href="">#DEWS Q</a>
          </li>
        </ul>
      </div>
      <product-list></product-list>
      <!--<div class="dbs-visual-wrap mgt-60">-->
      <!--<div class="dbs-visual-item dews-ui">-->
      <!--<strong>DEWS UI</strong>-->
      <!--<span>Project Sub Description</span>-->
      <!--<p class="btn-detail">-->
      <!--<a href="" class="btn-normal">자세히보기</a>-->
      <!--</p>-->
      <!--</div>-->
      <!--<div class="dbs-visual-item dews-j">-->
      <!--<strong>DEWS J</strong>-->
      <!--<span>Project Sub Description</span>-->
      <!--<p class="btn-detail">-->
      <!--<a href="" class="btn-normal">자세히보기</a>-->
      <!--</p>-->
      <!--</div>-->
      <!--<div class="dbs-visual-item dews-fd">-->
      <!--<strong>DEWS FD</strong>-->
      <!--<span>Project Sub Description</span>-->
      <!--<p class="btn-detail">-->
      <!--<a href="" class="btn-normal">자세히보기</a>-->
      <!--</p>-->
      <!--</div>-->
      <!--<div class="dbs-visual-item dews-bd">-->
      <!--<strong>DEWS BD</strong>-->
      <!--<span>Project Sub Description</span>-->
      <!--<p class="btn-detail">-->
      <!--<a href="" class="btn-normal">자세히보기</a>-->
      <!--</p>-->
      <!--</div>-->
      <!--<div class="dbs-visual-item dews-q">-->
      <!--<strong>DEWS Q</strong>-->
      <!--<span>Project Sub Description</span>-->
      <!--<p class="btn-detail">-->
      <!--<a href="" class="btn-normal">자세히보기</a>-->
      <!--</p>-->
      <!--</div>-->
      <!--<div class="dbs-visual-item d-erp">-->
      <!--<strong>D_ERP</strong>-->
      <!--<span>Project Sub Description</span>-->
      <!--<p class="btn-detail">-->
      <!--<a href="" class="btn-normal">자세히보기</a>-->
      <!--</p>-->
      <!--</div>-->
      <!--</div>-->
      <div class="ui-tab mgt-90">
        <div class="ui-tab-btns tab6" role="tablist">
          <a href="#" class="ui-tab-btn active" data-tab="1"><i>DEWS UI</i></a>
          <a href="#" class="ui-tab-btn" data-tab="2"><i>DEWS J</i></a>
          <a href="#" class="ui-tab-btn" data-tab="3"><i>DEWS FD</i></a>
          <a href="#" class="ui-tab-btn" data-tab="4"><i>DEWS BD</i></a>
          <a href="#" class="ui-tab-btn" data-tab="4"><i>DEWS Q</i></a>
          <a href="#" class="ui-tab-btn" data-tab="6"><i>D_ERP</i></a>
        </div>
        <div class="ui-tab-pnls mgt-30">
          <section id="tab1" class="ui-tab-pnl active" role="tabpanel">
            <dl class="dbs-list">
              <dd><i class="flag">Document</i> 버튼</dd>
              <dt>
                <a href=""
                  >데이터소스, 차트, 그리드, 트리뷰, 데이터 소스, 차트</a
                >
              </dt>
            </dl>
            <dl class="dbs-list">
              <dd><i class="flag">Document</i> 폼 컨트롤</dd>
              <dt>
                <a href=""
                  >데이터소스, 차트, 그리드, 트리뷰, 데이터 소스, 차트</a
                >
              </dt>
            </dl>
            <dl class="dbs-list">
              <dd><i class="flag">Document</i> 컨테이터</dd>
              <dt>
                <a href="">그리드, 트리뷰, 데이터소스, 차트</a>
              </dt>
            </dl>
            <dl class="dbs-list">
              <dd><i class="flag">Document</i> 데이터</dd>
              <dt>
                <a href=""
                  >데 이터소스, 차트, 그리드, 트리뷰, 데이터 소스, 차트</a
                >
              </dt>
            </dl>
            <dl class="dbs-list">
              <dd><i class="flag">Document</i> 데이터 통신</dd>
              <dt>
                <a href="">그리드, 트리뷰, 데이터소스, 차트</a>
              </dt>
            </dl>
            <dl class="dbs-list">
              <dd><i class="flag">Document</i>메인기</dd>
              <dt>
                <a href="">그리드, 트리뷰, 데이터소스, 차트</a>
              </dt>
            </dl>
          </section>
          <section id="tab2" class="ui-tab-pnl" role="tabpanel">
            22222
          </section>
          <section id="tab3" class="ui-tab-pnl" role="tabpanel">
            33333
          </section>
          <section id="tab4" class="ui-tab-pnl" role="tabpanel">
            4444
          </section>
          <section id="tab5" class="ui-tab-pnl" role="tabpanel">
            5555
          </section>
          <section id="tab6" class="ui-tab-pnl" role="tabpanel">
            6666
          </section>
        </div>
        <div class="btn-wrap mgt-30">
          <a href="#" class="btn-main small" role="button">더보기</a>
        </div>
      </div>
    </div>
    <div class="side-button"></div>
  </div>
</template>
<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator';
import ProductList from '~/components/productList/index.vue';

// import { GET_PROJECT_LIST } from '~/utils/storeTypes';

@Component({
  layout: 'TypeA',
  components: {
    ProductList,
  },
})
export default class extends Vue {
  // async fetch({ store }) {
  //   try {
  //     await store.dispatch(`projects/${GET_PROJECT_LIST}`);
  //   } catch (e) {
  //     console.log(e);
  //   }
  // }
}
</script>

<style lang="scss"></style>
