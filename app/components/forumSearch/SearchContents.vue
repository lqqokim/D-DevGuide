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
        질문/답변에서
        <em class="font-accent-color">{{ $route.params.searchWord }}</em
        >에 대한 검색 결과 (총 {{ totalSearchDataLength }}건)
      </div>
      <div
        v-for="data in $store.state.forum.searchPostsResult"
        :key="data.boardName"
      >
        <div class="search-top">
          {{ data.boardName
          }}<span
            ><em class="font-accent-color">{{ data.searchData.length }}</em
            >건</span
          >
        </div>
        <ul class="srch-result-list text mgb-60">
          <li v-for="(result, index) in data.searchData" :key="index">
            <nuxt-link
              :to="{
                name: 'postDetail',
                params: {
                  productCode: result.boardCode,
                  _id: result._id,
                },
              }"
              tag="a"
            >
              <dl>
                <dt class="result-title" v-html="result.title"></dt>
                <dd class="result-url">
                  <i v-if="result.isComplete" class="flag-complete">완료</i>
                  <i v-else class="flag-ing">진행중</i>
                  <template v-if="isCommentChoose(result.comments)"
                    >답변채택</template
                  >
                  <!--                  {{ result._id }}-->
                </dd>
                <dd class="result-desc" v-html="result.contents"></dd>
              </dl>
            </nuxt-link>
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
    if (this.$store.state.forum.searchPostsResult.length > 0) {
      this.$store.state.forum.searchPostsResult.forEach((result) => {
        this.totalSearchDataLength += result.searchData.length;
      });
    }
  }

  isCommentChoose(comments) {
    let isChoose: boolean = false;
    if (comments !== null && comments.length > 0) {
      comments.forEach((comment) => {
        if (!isChoose) {
          isChoose = comment.isChoose;
        }
      });
    }
    return isChoose;
  }
}
</script>

<style scoped></style>
