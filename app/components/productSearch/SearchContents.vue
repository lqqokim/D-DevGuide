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
// import * as product from '@/store/modules/product';
// import * as search from '@/store/modules/search';
// import * as repository from '@/store/modules/repository';
// import { IAlert } from '~/store/modules/common';
//
// const Product = namespace('product');
// const Search = namespace('search');
// const Repository = namespace('repository');
// const Common = namespace('common');

@Component
export default class SearchContents extends Vue {
  // @Product.Action('getProductList') getProductListAction;
  // @Search.Action('devDocSearch') devDocSearchAction;
  // @Search.Action('indexSearch') indexSearchAction;
  // @Search.Mutation('setEmptySearchResult') setEmptySearchResultMutation;
  // @Search.Mutation('setEmptySearchData') setEmptySearchDataMutation;
  // @Search.Mutation('searchDevDocTitle') searchDevDocTitleMutation;
  // @Repository.Action('getIndexMdFile') getIndexMdFileAction;
  // @Repository.Mutation('setEmptyTreeData') setEmptyTreeDataMutation;
  // @Common.Action('alert') alertAction!: (payload: IAlert) => Promise<any>;

  totalSearchDataLength: number = 0;

  created() {
    // await this.getProductListAction();
    //
    // console.log(this.setEmptySearchResultMutation);
    // console.log(this.$store.state.product.productList);
    // await this.setEmptySearchResultMutation();
    // await this.setEmptySearchDataMutation();
    //
    // const productList = this.$store.state.product.productList;
    //
    // this.alertAction({
    //   type: 'loading',
    //   isShow: true,
    //   msg: '검색 중입니다.',
    // }).then(() => {});
    //
    // for (let idx = 0; idx < productList.length; idx++) {
    //   console.log('for start');
    //   this.searching = true;
    //   await this.devDocSearchAction({
    //     content: this.$route.params.searchWord,
    //     projectId: productList[idx].projectId,
    //   });
    //
    //   console.log('index md file');
    //   await this.getIndexMdFileAction({
    //     productCode: productList[idx].productCode,
    //     pageType: 'Document',
    //     ref: productList[idx].targetBranch,
    //     refType: 'targetBranch',
    //     search: true,
    //   });
    //
    //   await this.searchDevDocTitleMutation({
    //     searchDataArray: this.$store.state.search.searchDataArray,
    //     treeData: this.$store.state.repository.treeData,
    //     pageType: 'Document',
    //     productName: productList[idx].productName,
    //     productCode: productList[idx].productCode,
    //     searchWord: this.$route.params.searchWord,
    //   });
    //
    //   await this.indexSearchAction({
    //     treeData: this.$store.state.repository.treeData,
    //     searchWord: this.$route.params.searchWord,
    //     pageType: 'Document',
    //     ref: productList[idx].targetBranch, // targetBranch
    //     projectId: productList[idx].projectId,
    //     productCode: productList[idx].productCode,
    //   });
    //
    //   await this.setEmptyTreeDataMutation();
    //
    //   if (productList[idx].apiUse) {
    //     await this.getIndexMdFileAction({
    //       productCode: productList[idx].productCode,
    //       pageType: 'API',
    //       ref: productList[idx].targetBranch,
    //       refType: 'targetBranch',
    //       search: true,
    //     });
    //     await this.searchDevDocTitleMutation({
    //       searchDataArray: this.$store.state.search.searchDataArray,
    //       treeData: this.$store.state.repository.treeData,
    //       pageType: 'API',
    //       productName: productList[idx].productName,
    //       productCode: productList[idx].productCode,
    //       searchWord: this.$route.params.searchWord,
    //     });
    //
    //     await this.indexSearchAction({
    //       treeData: this.$store.state.repository.treeData,
    //       searchWord: this.$route.params.searchWord,
    //       pageType: 'API',
    //       ref: productList[idx].targetBranch,
    //       projectId: productList[idx].projectId,
    //       productCode: productList[idx].productCode,
    //     });
    //   }
    //   await this.setEmptyTreeDataMutation();
    // }
    // this.searching = false;
    //
    // this.alertAction({
    //   type: 'loading',
    //   isShow: false,
    //   msg: '검색 중입니다.',
    // }).then(() => {});
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
