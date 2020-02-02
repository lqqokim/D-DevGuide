<template>
  <!--<div class="dbs-container">-->
  <!--&lt;!&ndash; search &ndash;&gt;-->
  <!--<div class="srch-wrap-bar mgt-60 mgb-60">-->
  <!--<div class="srch-wrap">-->
  <!--<input type="search" class="m-srch-bar" placeholder="검색어" />-->
  <!--<button type="button" class="btn-search">search</button>-->
  <!--</div>-->
  <!--</div>-->
  <!--<div class="ui-tab mgb-60">-->
  <!--<div class="ui-tab-btns tab-3" role="tablist">-->
  <!--<a href="#" class="ui-tab-btn" data-tab="1"><i>개발자 문서</i></a>-->
  <!--<a href="#" class="ui-tab-btn active" data-tab="2"><i>질문/답변</i></a>-->
  <!--<a href="#" class="ui-tab-btn" data-tab="3"><i>자료실</i></a>-->
  <!--</div>-->
  <!--</div>-->
  <!--<div class="tit-con-sub mgb-20">-->
  <!--질문/답에서 <em class="font-accent-color">검색어</em>에 대한 검색 결과 (총-->
  <!--10건)-->
  <!--</div>-->
  <!--<div class="search-top">-->
  <!--DEWS/UI<span><em class="font-accent-color">2</em>건</span>-->
  <!--</div>-->
  <!--<ul class="srch-result-list text mgb-60">-->
  <!--<li>-->
  <!--<a href="#">-->
  <!--<dl>-->
  <!--<dt class="result-title">-->
  <!--검색어 검색 기능을 구현할 수 있는 방법을 알려주세요.-->
  <!--</dt>-->
  <!--<dd class="result-url">-->
  <!--<i class="flag-complete">완료</i>답변채택-->
  <!--</dd>-->
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
  <!--<dd class="result-url"><i class="flag-ing">진행중</i></dd>-->
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
  <!--<dd class="result-url"><i class="flag-ing">진행중</i></dd>-->
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
  <forum-search></forum-search>
</template>
<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator';
import ForumSearch from '@/components/forumSearch/index.vue';

@Component({
  layout: 'Search',
  components: {
    ForumSearch,
  },
  async fetch({ store, params }): Promise<any> {
    try {
      await store.dispatch('forum/searchPosts', {
        searchWord: params.searchWord,
      });
    } catch (err) {
      console.error(err);
    }
  },
})
export default class extends Vue {}
</script>

<style lang="scss"></style>
