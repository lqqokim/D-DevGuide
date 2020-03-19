<template>
  <div class="dbs-container">
    <!-- search -->
    <search-bar></search-bar>

    <div class="position-wrap">
      <h1 class="tit-h1 mgb-15">제품별 질문/답변</h1>
      <div class="pst-rbtn">
        <button
          type="button"
          class="btn-sub-large"
          @click="onclickForumRegister"
        >
          질문 등록
        </button>
      </div>
    </div>
    <div class="box-gray-round mgb-60">
      <div class="dbs-visual-wrap qna">
        <nuxt-link
          v-for="product in localProducts"
          :key="product._id"
          :to="{
            name: 'forumList',
            params: { productCode: product.productCode },
            product: product,
          }"
          class="dbs-visual-list"
        >
          <dl class="dews-ui">
            <dt>{{ product.productName }}</dt>
            <dd>{{ product.description }}</dd>
          </dl>
          <p class="icon">
            <span>{{ product.productCode }}</span>
          </p>
        </nuxt-link>
      </div>
      <p v-if="count">
        <a role="button" class="arrow prev" @click="count--" />
      </p>
      <p v-if="products.slice(count + 1, 4 + count + 1).length === 4">
        <a role="button" class="arrow next" @click="count++" />
      </p>
    </div>
    <h1 class="tit-h1 mgb-15">질문/답변 현황</h1>

    <!-- 답변이 등록되지 않은 질문 -->
    <not-comment-list />

    <!-- 답변이 진행중인 질문 -->
    <in-progress-list />

    <!-- 추천이 많은 질문/답변 -->
    <many-like-list />

    <div v-if="isLoginUser()" class="sky-qna">
      <div class="sky-wrap">
        <p class="sky-title">내 활동 현황</p>
        <ul class="sky-list">
          <li class="sky-content">
            <span>완료</span
            ><span class="num">{{
              numberWithCommas(activityCondition.myActivity.complete)
            }}</span>
          </li>
          <li class="sky-content">
            <span>진행</span
            ><span class="num">{{
              numberWithCommas(activityCondition.myActivity.inProgress)
            }}</span>
          </li>
          <li class="sky-content">
            <span>답변</span
            ><span class="num">{{
              numberWithCommas(activityCondition.myActivity.commentCount)
            }}</span>
          </li>
        </ul>
      </div>
      <div class="sky-wrap">
        <p class="sky-title">전체 질문답변 현황</p>
        <ul class="sky-list">
          <li class="sky-content">
            <span>전체</span
            ><span class="num">{{
              numberWithCommas(activityCondition.allActivity.all)
            }}</span>
          </li>
          <li class="sky-content">
            <span>진행</span
            ><span class="num">{{
              numberWithCommas(activityCondition.allActivity.inProgress)
            }}</span>
          </li>
          <li class="sky-content">
            <span>완료</span
            ><span class="num">{{
              numberWithCommas(activityCondition.allActivity.complete)
            }}</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Vue, Component, namespace } from 'nuxt-property-decorator';
import * as removeMd from 'remove-markdown';
import { IAlert } from '~/store/modules/common';
import { IProduct, IActivityCondition } from '@/store/modules/forum';
import SearchBar from '@/components/common/search/searchBar.vue';
import InProgressList from '~/components/forumHome/InProgressList.vue';
import ManyLikeList from '~/components/forumHome/ManyLikeList.vue';
import NotCommentList from '~/components/forumHome/NotCommentList.vue';
import { dateFormat } from '~/utils/commonFuncs';

const Forum = namespace('forum');
const Common = namespace('common');

@Component({
  components: {
    SearchBar,
    InProgressList,
    ManyLikeList,
    NotCommentList,
  },
})
export default class ForumHome extends Vue {
  @Common.Action('alert') alertAction!: (payload: IAlert) => Promise<any>;
  @Forum.Action('forumHomePosts') forumHomePostsAction!: () => Promise<any>;

  count: number = 0;
  searchWord: string = '';
  selectedProduct!: IProduct;
  activityCondition!: IActivityCondition;

  products!: IProduct[];

  get localProducts(): IProduct[] {
    return this.products.slice(this.count, 4 + this.count);
  }

  isLoginUser(): boolean {
    return this.$store.state.user.user.loginId !== '';
  }

  created() {
    this.activityCondition = this.$store.state.forum.activityCondition;
    this.products = this.$store.state.forum.products;
  }

  onclickForumRegister(): void {
    if (!this.$store.state.forum.products.length) {
      this.alertAction({
        type: 'warning',
        isShow: true,
        msg: '제품을 먼저 등록해주세요.',
      });

      return;
    }

    this.$router.push({
      name: 'forumRegister',
      params: {
        productCode: this.$store.state.forum.products[0].productCode,
        editType: 'register',
      },
    });
    // }
  }

  // 숫자에 콤마 형식 적용 함수
  numberWithCommas(num): string {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }
}
</script>
<style scoped></style>
