<template>
  <div class="qna-wrap mgb-40">
    <div class="qna-left-box">
      <p class="qna-no-answer">
        <strong>답변이 <br />등록되지 않은 질문</strong>
        <span class="qna-more"
          ><a @click="onclickNotCommentMore">더보기</a></span
        >
      </p>
    </div>
    <div class="qna-content">
      <ul
        v-for="post in $store.state.forum.notExistCommentPosts"
        :key="post._id"
        class="dbs-list qna"
      >
        <li class="list-qna">
          <div class="qna-list">
            <ul class="num">
              <li>
                <strong>{{ post.like }}</strong
                >추천
              </li>
              <li>
                <strong>{{ post.comments.length }}</strong
                >답변
              </li>
            </ul>
            <dl class="text">
              <nuxt-link
                :to="{
                  name: 'postDetail',
                  params: {
                    productCode: 'ALL',
                    _id: post._id,
                    post,
                  },
                }"
                ><dt>
                  <strong>{{ post.title }}</strong>
                </dt>
                <dd
                  class="contents-dim"
                  v-html="removeMdFormat(post.contents)"
                />
              </nuxt-link>
              <dd class="user-info mgt-15">
                <i class="flag-qna">{{ post.boardCode }}</i
                ><span>{{ convertDateFormat(post.regDate) }}</span
                ><span>{{ post.userName }}({{ post.userId }}) </span
                ><span>조회 {{ post.viewCount }}</span>
              </dd>
            </dl>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator';
import * as removeMd from 'remove-markdown';
import { dateFormat } from '~/utils/commonFuncs';

@Component
export default class NotCommentList extends Vue {
  // 답변이 없는 질문 목록 더보기 클릭
  onclickNotCommentMore(): void {
    this.$router.push({
      name: 'forumList',
      params: {
        productCode: 'ALL',
        postType: this.$store.state.forum.postTypes.NOT_COMMENT,
      },
    });
  }

  removeMdFormat(contents: string): string {
    return removeMd(contents)
      .split('\n')
      .join('<br/>');
  }

  convertDateFormat(time): string {
    return dateFormat(time);
  }
}
</script>

<style scoped></style>
