<template>
  <div>
    <div class="srch-wrap-bar mgt-60 mgb-60">
      <div class="srch-wrap">
        <input
          v-if="$route.name === 'list' || $route.name === 'devDocSearch'"
          type="search"
          class="m-srch-bar"
          placeholder="모든 제품에 대한 사용법, API 등을 검색하세요"
          :value="$route.params.searchWord"
          @input="inputWord"
          @keydown="searchRequest"
        />
        <input
          v-else-if="$route.name === 'Forum' || $route.name === 'qnaSearch'"
          type="search"
          class="m-srch-bar"
          placeholder="질문 / 답변 통합검색"
          :value="$route.params.searchWord"
          @input="inputWord"
          @keydown="searchRequest"
        />
        <input
          v-else-if="
            $route.name === 'library' || $route.name === 'librarySearch'
          "
          type="search"
          class="m-srch-bar"
          placeholder="자료실 통합검색"
          :value="$route.params.searchWord"
          @input="inputWord"
          @keydown="searchRequest"
        />
        <button class="btn-search" @click="searchRequest">search</button>
      </div>
    </div>
    <div
      v-if="
        $route.name === 'devDocSearch' ||
          $route.name === 'qnaSearch' ||
          $route.name === 'librarySearch'
      "
      class="ui-tab mgb-60"
    >
      <div class="ui-tab-btns tab-3" role="tablist">
        <a
          class="ui-tab-btn"
          data-tab="1"
          :class="{ active: $route.name === 'devDocSearch' }"
          @click="onClickTab('devDocSearch')"
          ><i>개발자 문서</i></a
        >
        <a
          class="ui-tab-btn"
          data-tab="2"
          :class="{ active: $route.name === 'qnaSearch' }"
          @click="onClickTab('qnaSearch')"
          ><i>질문/답변</i></a
        >
        <a
          class="ui-tab-btn"
          data-tab="3"
          :class="{ active: $route.name === 'librarySearch' }"
          @click="onClickTab('librarySearch')"
          ><i>자료실</i></a
        >
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, namespace } from 'nuxt-property-decorator';
import { IAlert } from '@/store/modules/common';

const Common = namespace('common');

@Component
export default class SearchBar extends Vue {
  @Common.Action('alert') alertAction!: (payload: IAlert) => Promise<any>;

  searchWord: string = '';

  created() {
    this.searchWord = this.$route.params.searchWord;
  }

  inputWord(e) {
    this.searchWord = e.target.value;
  }

  searchRequest(e) {
    if ((e.type === 'keydown' && e.keyCode === 13) || e.type === 'click') {
      if (this.searchWord === '' || this.searchWord === undefined) {
        this.alertAction({
          type: 'warning',
          isShow: true,
          msg: '검색어를 입력해주세요.',
        }).then(() => {});
      } else if (this.searchWord !== this.$route.params.searchWord) {
        if (
          this.$route.name === 'list' ||
          this.$route.name === 'devDocSearch'
        ) {
          this.$router.push({
            name: 'devDocSearch',
            params: {
              searchWord: this.searchWord,
            },
          });
        } else if (
          this.$route.name === 'Forum' ||
          this.$route.name === 'qnaSearch'
        ) {
          this.$router.push({
            name: 'qnaSearch',
            params: {
              searchWord: this.searchWord,
            },
          });
        } else if (
          this.$route.name === 'library' ||
          this.$route.name === 'librarySearch'
        ) {
          this.$router.push({
            name: 'librarySearch',
            params: {
              searchWord: this.searchWord,
            },
          });
        }
      }
    }
  }

  onClickTab(routerName) {
    if (routerName !== this.$route.name) {
      this.$router.push({
        name: routerName,
        params: { searchWord: this.$route.params.searchWord },
      });
    }
  }
}
</script>

<style scoped></style>
