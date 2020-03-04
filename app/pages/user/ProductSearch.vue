<template>
  <!--<div class="dbs-container">-->
  <!--search-->
  <!--<div class="srch-wrap-bar mgt-60 mgb-60">-->
  <!--<div class="srch-wrap">-->
  <!--<input type="search" class="m-srch-bar" placeholder="검색어" />-->
  <!--<button type="button" class="btn-search">search</button>-->
  <!--</div>-->
  <!--</div>-->
  <!--<div class="ui-tab mgb-60">-->
  <!--<div class="ui-tab-btns tab-3" role="tablist">-->
  <!--<a href="#" class="ui-tab-btn active" data-tab="1"-->
  <!--&gt;<i>개발자 문서</i></a-->
  <!--&gt;-->
  <!--<a href="#" class="ui-tab-btn" data-tab="2"><i>질문/답변</i></a>-->
  <!--<a href="#" class="ui-tab-btn" data-tab="3"><i>자료실</i></a>-->
  <!--</div>-->
  <!--</div>-->
  <!--&lt;!&ndash; TO Do 검색 결과가 없을 떄-->
  <!--<div class="tit-con-sub">-->
  <!--<em class="font-accent-color">검색어</em>에 대한 검색 결과가 없습니다-->
  <!--</div>-->
  <!--<div class="search no-result mgb-80">검색결과가 없습니다.</div>-->
  <!--&ndash;&gt;-->
  <!--<div class="tit-con-sub mgb-20">-->
  <!--개발자 문서에서 <em class="font-accent-color">검색어</em>에 대한 검색 결과-->
  <!--(총 10건)-->
  <!--</div>-->
  <!--<div class="search-top">-->
  <!--DEWS/UI<span><em class="font-accent-color">2</em>건</span>-->
  <!--</div>-->
  <!--<ul class="srch-result-list text mgb-60">-->
  <!--<li>-->
  <!--<a href="#">-->
  <!--<dl>-->
  <!--<dt class="result-title">시작하기</dt>-->
  <!--<dd class="result-url">개발자문서 > DEWS/UI > 시작하기</dd>-->
  <!--<dd class="result-desc">-->
  <!--DEWS/UI 제품에 대한 개발을 시작합니다. 제품에 대한-->
  <!--<em>검색어</em>는 검색에서 필터링되어 출력될 수 있습니다. DEWS/UI-->
  <!--제품에 대한 개발을 시작합니다. 제품에 대한 <em>검색어</em>는-->
  <!--검색에서 필터링되어 출력될 수 있습니다.-->
  <!--</dd>-->
  <!--</dl>-->
  <!--</a>-->
  <!--</li>-->
  <!--<li>-->
  <!--<a href="#">-->
  <!--<dl>-->
  <!--<dt class="result-title">시작하기</dt>-->
  <!--<dd class="result-url">개발자문서 > 페이지 경로</dd>-->
  <!--<dd class="result-desc">-->
  <!--DEWS/UI 제품에 대한 개발을 시작합니다. 제품에 대한-->
  <!--<em>검색어</em>는 검색에서 필터링되어 출력될 수 있습니다. DEWS/UI-->
  <!--제품에 대한 개발을 시작합니다. 제품에 대한 <em>검색어</em>는-->
  <!--검색에서 필터링되어 출력될 수 있습니다. DEWS/UI 제품에 대한 개발을-->
  <!--시작합니다.-->
  <!--</dd>-->
  <!--</dl>-->
  <!--</a>-->
  <!--</li>-->
  <!--</ul>-->
  <!--<div class="search-top">-->
  <!--DEWS/UI<span><em class="font-accent-color">1</em>건</span>-->
  <!--</div>-->
  <!--<ul class="srch-result-list text mgb-80">-->
  <!--<li>-->
  <!--<a href="#">-->
  <!--<dl>-->
  <!--<dt class="result-title">시작하기</dt>-->
  <!--<dd class="result-url">개발자문서 > DEWS/UI > 시작하기</dd>-->
  <!--<dd class="result-desc">-->
  <!--DEWS/UI 제품에 대한 개발을 시작합니다. 제품에 대한-->
  <!--<em>검색어</em>는 검색에서 필터링되어 출력될 수 있습니다. DEWS/UI-->
  <!--제품에 대한 개발을 시작합니다. 제품에 대한 <em>검색어</em>는-->
  <!--검색에서 필터링되어 출력될 수 있습니다.-->
  <!--</dd>-->
  <!--</dl>-->
  <!--</a>-->
  <!--</li>-->
  <!--</ul>-->
  <!--</div>-->
  <product-search></product-search>
</template>
<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator';
import ProductSearch from '~/components/productSearch/index.vue';

@Component({
  layout: 'Search',
  components: {
    ProductSearch,
  },
  async fetch({ store, params }): Promise<any> {
    try {
      store.dispatch('common/alert', {
        type: 'loading',
        isShow: true,
        msg: '검색 중입니다.',
      });
      await store.dispatch('product/getProductList');

      await store.commit('search/setEmptySearchResult', []);
      await store.commit('search/setEmptySearchData', []);

      const productList = store.state.product.productList;

      for (let idx = 0; idx < productList.length; idx++) {
        await store.dispatch('search/devDocSearch', {
          content: params.searchWord,
          projectId: productList[idx].projectId,
        });

        await store.dispatch('repository/getIndexMdFile', {
          productCode: productList[idx].productCode,
          pageType: 'Document',
          ref: productList[idx].targetBranch,
          refType: 'targetBranch',
          search: true,
        });

        await store.commit('search/searchDevDocTitle', {
          searchDataArray: store.state.search.searchDataArray,
          treeData: store.state.repository.treeData,
          pageType: 'Document',
          productName: productList[idx].productName,
          productCode: productList[idx].productCode,
          searchWord: params.searchWord,
        });

        await store.dispatch('search/indexSearch', {
          treeData: store.state.repository.treeData,
          searchWord: params.searchWord,
          pageType: 'Document',
          ref: productList[idx].targetBranch, // targetBranch
          projectId: productList[idx].projectId,
          productCode: productList[idx].productCode,
        });
        await store.commit('repository/setEmptyTreeData');

        if (productList[idx].apiUse) {
          await store.dispatch('repository/getIndexMdFile', {
            productCode: productList[idx].productCode,
            pageType: 'API',
            ref: productList[idx].targetBranch,
            refType: 'targetBranch',
            search: true,
          });

          await store.commit('search/searchDevDocTitle', {
            searchDataArray: store.state.search.searchDataArray,
            treeData: store.state.repository.treeData,
            pageType: 'API',
            productName: productList[idx].productName,
            productCode: productList[idx].productCode,
            searchWord: params.searchWord,
          });

          await store.dispatch('search/indexSearch', {
            treeData: store.state.repository.treeData,
            searchWord: params.searchWord,
            pageType: 'API',
            ref: productList[idx].targetBranch,
            projectId: productList[idx].projectId,
            productCode: productList[idx].productCode,
          });
        }
        await store.commit('repository/setEmptyTreeData');
      }
      store.dispatch('common/alert', {
        type: 'loading',
        isShow: false,
        msg: '검색 중입니다.',
      });
    } catch (err) {
      console.error(err);
    }
  },
})
export default class extends Vue {}
</script>

<style lang="scss"></style>
