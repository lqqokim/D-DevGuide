<template>
  <div>
    <template v-if="totalSearchDataLength === 0">
      <div class="search-top">
        <em class="font-accent-color">{{ $route.params.searchWord }}</em
        >에 대한 검색 결과가 없습니다
      </div>
      <div class="search no-result mgb-80">검색결과가 없습니다.</div>
    </template>
    <template v-else>
      <div class="tit-con-sub mgb-20">
        개발자 문서에서
        <em class="font-accent-color">{{ $route.params.searchWord }}</em
        >에 대한 검색 결과 (총 {{ totalSearchDataLength }}건)
      </div>
      <div
        v-for="data in $store.state.search.searchResult"
        :key="data.productName"
      >
        <div class="search-top">
          {{ data.productName
          }}<span
            ><em class="font-accent-color">{{ data.resultData.length }}</em
            >건</span
          >
        </div>
        <ul class="srch-result-list text mgb-60">
          <li v-for="(result, index) in data.resultData" :key="index">
            <a @click="onClickDevDoc(data, result)">
              <dl>
                <dt class="result-title" v-html="result.pageTitle"></dt>
                <dd class="result-url">
                  개발자문서 > {{ data.productName }} >
                  {{ result.pagePath.split('/').join(' > ') }}
                </dd>
                <dd class="result-desc" v-html="result.data"></dd>
              </dl>
            </a>
          </li>
        </ul>
      </div>
    </template>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator';

@Component
export default class SearchContents extends Vue {
  totalSearchDataLength: number = 0;

  created() {
    if (this.$store.state.search.searchResult.length > 0) {
      this.$store.state.search.searchResult.forEach((result) => {
        this.totalSearchDataLength += result.resultData.length;
      });
    }
  }

  onClickDevDoc(data, result) {
    result.pageTitle = result.pageTitle.split('<em>').join('');
    result.pageTitle = result.pageTitle.split('</em>').join('');
    this.$router.push({
      name: 'docView',
      params: {
        productCode: data.productCode,
        pageType: result.pagePath.split('/')[0],
        pageTitle: result.pageTitle,
        pageId: result.filename,
      },
    });
  }
}
</script>

<style scoped></style>
