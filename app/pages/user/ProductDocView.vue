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
  <!-- TO DO 작성중인 문서가 있을 때 추가 -->
  <!--<div class="dbs-viewer-desc">-->
  <!--작성중인 브랜치(<span class="write-branch">DOC_BizboxIntergrations</span-->
  <!--&gt;)의 문서를 조회 중입니다.-->
  <!--</div>-->
  <!--<div class="dbs-container">-->
  <!--<div class="content-wrap">-->
  <!--&lt;!&ndash; 좌측메뉴 S &ndash;&gt;-->
  <!--<div class="left-menu">-->
  <!--<p class="tit-con-left"><strong>DEWS UI</strong></p>-->
  <!--&lt;!&ndash; TO DO version을 사용하지 않을시 no-arrow 클래스 추가 &ndash;&gt;-->
  <!--<div class="ui-select no-arrow w-100p mgt-15 mgb-5">-->
  <!--<select title="품목형태" class="off" tabindex="-1">-->
  <!--<option value="0" selected="">v2.0-1907112341</option>-->
  <!--<option value="1">v2.1-1907112341</option>-->
  <!--<option value="2">v2.2-1907112341</option>-->
  <!--</select>-->
  <!--<button type="button" class="ui-select-btn">-->
  <!--v2.0-1907112341-->
  <!--</button>-->
  <!--&lt;!&ndash; 셀렉트박스  선택시 ui-select-wrap에 on 추가하면 display block 됨 &ndash;&gt;-->
  <!--<div class="ui-select-wrap">-->
  <!--<div class="ui-select-options">-->
  <!--<button-->
  <!--type="button"-->
  <!--class="ui-select-opt selected"-->
  <!--value="v2.1-190711234"-->
  <!--&gt;-->
  <!--<b class="ui-select-txt">v2.1-1907112341</b>-->
  <!--</button>-->
  <!--<button-->
  <!--type="button"-->
  <!--class="ui-select-opt"-->
  <!--value="v2.2-1907112341"-->
  <!--&gt;-->
  <!--<b class="ui-select-txt">v2.2-1907112341</b>-->
  <!--</button>-->
  <!--</div>-->
  <!--</div>-->
  <!--</div>-->
  <!--<div class="ui-accordion-left-pnl">-->
  <!--<ul class="ui-navi">-->
  <!--<li class="selected"><a href="#" role="button">Document</a></li>-->
  <!--<li class=""><a href="#" role="button">API</a></li>-->
  <!--</ul>-->
  <!--<div class="line mgt-15"></div>-->
  <!--<ul>-->
  <!--<li class="nav-item depth-1 folder selected">-->
  <!--<a href="#" class="nav-text">데이터</a>-->
  <!--<ul class="nav-container depth-2" style="display: block;">-->
  <!--<li class="nav-item depth-2 folder selected">-->
  <!--<a href="#" class="nav-text">그리드</a>-->
  <!--<ul class="nav-container depth-3" style="display: block;">-->
  <!--<li class="nav-item depth-3 page selected">-->
  <!--<a href="#" class="nav-text">그리드 사용법</a>-->
  <!--</li>-->
  <!--<li class="nav-item depth-3 page">-->
  <!--<a href="#" class="nav-text">에디터 사용법</a>-->
  <!--</li>-->
  <!--<li class="nav-item depth-3 page">-->
  <!--<a href="#" class="nav-text">포맷 사용법</a>-->
  <!--</li>-->
  <!--<li class="nav-item depth-3 page">-->
  <!--<a href="#" class="nav-text">그리드 이벤트</a>-->
  <!--</li>-->
  <!--</ul>-->
  <!--</li>-->
  <!--<li class="nav-item depth-2 page">-->
  <!--<a href="#" class="nav-text">트리뷰</a>-->
  <!--</li>-->
  <!--<li class="nav-item depth-2 page">-->
  <!--<a href="#" class="nav-text">데이터 소스</a>-->
  <!--</li>-->
  <!--<li class="nav-item depth-2 page">-->
  <!--<a href="#" class="nav-text">차트</a>-->
  <!--</li>-->
  <!--</ul>-->
  <!--</li>-->
  <!--<li class="nav-item depth-1 folder">-->
  <!--<a href="#" class="nav-text">기타</a>-->
  <!--</li>-->
  <!--<li class="nav-item depth-1 folder">-->
  <!--<a href="#" class="nav-text">데이터 통신</a>-->
  <!--</li>-->
  <!--<li class="nav-item depth-1 folder">-->
  <!--<a href="#" class="nav-text">메인 기능</a>-->
  <!--</li>-->
  <!--</ul>-->
  <!--</div>-->
  <!--</div>-->
  <!--&lt;!&ndash; // 좌측메뉴 E &ndash;&gt;-->
  <!--<div class="container-panel view-content">-->
  <!--<div class="view-page-container">-->
  <!--<div class="view-top">-->
  <!--<p class="tit-con-text">그리드 사용법</p>-->
  <!--<div class="pst-button">-->
  <!--<div class="srch-wrap-motion">-->
  <!--<input type="text" />-->
  <!--<div class="search"></div>-->
  <!--</div>-->
  <!--<ul class="view-icon">-->
  <!--<li class="icon"><a href="" class="btn-edit"></a></li>-->
  <!--<li class="icon"><a href="" class="btn-share"></a></li>-->
  <!--<li class="icon"><a href="" class="btn-print"></a></li>-->
  <!--</ul>-->
  <!--</div>-->
  <!--</div>-->
  <!--<div class="view-detail">-->
  <!--<h1 class="tit-con-sub">그리드</h1>-->
  <!--<p class="paragraph">-->
  <!--그리드는 각 필드에 행 단위의 데이터가 저장되어 표 형태로-->
  <!--보여지는 컨트롤입니다. 각 행에는 텍스트뿐만 아니라 다양한-->
  <!--컨트롤들이 들어갈 수 있습니다.<br />-->
  <!--<span class="p-caution"-->
  <!--&gt;* 사용가능한 컨트롤은 <a href="">그리드-에디터 사용법</a> 을-->
  <!--참고하시기 바랍니다.</span-->
  <!--&gt;-->
  <!--</p>-->
  <!--<h1 class="tit-con-sub">초기화 방법</h1>-->
  <!--<p class="paragraph">-->
  <!--<code>div</code> 태그에 <code>dews-ui-grid</code>클래스를-->
  <!--지정하여 사용합니다.-->
  <!--</p>-->
  <!--<ul class="para-list">-->
  <!--<li>HTML 초기화</li>-->
  <!--<li>스크립트 초기화</li>-->
  <!--</ul>-->
  <!--<h1 class="tit-con-sub">사용방법</h1>-->
  <!--<div class="ui-tab small mgb-60">-->
  <!--<div class="ui-tab-btns" role="tablist">-->
  <!--<a href="#tab1" class="ui-tab-btn active"><i>HTML</i></a>-->
  <!--<a href="#tab2" class="ui-tab-btn"><i>Javascript</i></a>-->
  <!--<a href="#tab3" class="ui-tab-btn"><i>Result</i></a>-->
  <!--<div class="pst-rbtn">-->
  <!--<button-->
  <!--type="button"-->
  <!--class="dbs-icon-button ico-left small copy"-->
  <!--&gt;-->
  <!--복사-->
  <!--</button>-->
  <!--</div>-->
  <!--</div>-->
  <!--<div class="ui-tab-pnls">-->
  <!--<section id="tab1" class="ui-tab-pnl active" role="tabpanel">-->
  <!--<pre><code>HTML 코드 들어갑니다</code></pre>-->
  <!--</section>-->
  <!--<section id="tab2" class="ui-tab-pnl" role="tabpanel">-->
  <!--<pre><code>Javascript 코드 들어갑니다.</code></pre>-->
  <!--</section>-->
  <!--<section id="tab3" class="ui-tab-pnl" role="tabpanel">-->
  <!--<pre><code>결과 내용 들어갑니다.</code></pre>-->
  <!--</section>-->
  <!--</div>-->
  <!--</div>-->
  <!--</div>-->
  <!--</div>-->
  <!--<div class="view-page-side">-->
  <!--<div class="view-page-side-content">-->
  <!--<p class="tit-con-view">목차</p>-->
  <!--<div class="view-page-side-section">-->
  <!--<ul>-->
  <!--<li class="selected"><a href="#">그리드</a></li>-->
  <!--<li>-->
  <!--<a href="#"><span>초기화 방법</span></a>-->
  <!--<ul class="bul-round mgt-5">-->
  <!--<li><a href="#">HTML 초기화</a></li>-->
  <!--<li class="selected"><a href="#">스크립트 초기화</a></li>-->
  <!--</ul>-->
  <!--</li>-->
  <!--<li>-->
  <!--<a href="#"><span>사용방법</span></a>-->
  <!--<ul class="bul-round mgt-5">-->
  <!--<li><a href="#">HTML</a></li>-->
  <!--<li><a href="#">Javascript</a></li>-->
  <!--<li><a href="#">Result</a></li>-->
  <!--</ul>-->
  <!--</li>-->
  <!--</ul>-->
  <!--</div>-->
  <!--</div>-->
  <!--</div>-->
  <!--</div>-->
  <!--</div>-->
  <!--</div>-->
  <!--</div>-->
  <product-doc-view></product-doc-view>
</template>
<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator';
import ProductDocView from '~/components/productDocView/index.vue';

@Component({
  layout: 'default',
  components: {
    ProductDocView,
  },
  async fetch({ store, params, route }): Promise<any> {
    try {
      const differenceProduct =
        store.state.product.product.productCode === params.productCode;

      await store.dispatch('product/selectProduct', {
        productCode: params.productCode,
      });

      if (
        params.branchName !== undefined &&
        !store.state.user.user.gitlabToken
      ) {
        return;
      }

      let refName: string = '';
      let currentRefType: string = 'targetBranch';
      if (params.branchName !== undefined) {
        refName = params.branchName;
        currentRefType = 'branch';
      } else if (params.versionName !== undefined) {
        refName = 'DOC_' + params.versionName;
        currentRefType = 'version';
      } else {
        refName = store.state.product.product.targetBranch;
        currentRefType = 'targetBranch';
      }
      await store.commit('repository/setCurrentRef', [refName, currentRefType]);

      if (
        store.state.repository.treeData === undefined ||
        store.state.repository.treeData.length === 0 ||
        !differenceProduct ||
        (params.branchName !== undefined && params.pageId === undefined) ||
        route.name === 'detail'
      ) {
        await store.dispatch('repository/getIndexMdFile', {
          productCode: params.productCode,
          pageType: params.pageType,
          ref: refName,
          refType: currentRefType,
          filePath: params.pageId,
          pageTitle: params.pageTitle,
        });
      }

      if (params.pageId) {
        await store.dispatch('repository/getRepositoryFile', {
          productCode: params.productCode,
          filePath: params.pageId + '.md',
          ref: refName,
          refType: currentRefType,
          pageTitle: params.pageTitle,
        });
      }

      await store.dispatch('version/getVersionList', {
        productCode: params.productCode,
      });
    } catch (e) {
      console.error(e);
    }
  },
})
export default class extends Vue {
  mounted() {
    window.scrollTo(0, 0);
  }
}
</script>

<style lang="scss"></style>
