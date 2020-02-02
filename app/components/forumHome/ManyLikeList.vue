<template>
  <div class="qna-wrap mgb-80">
    <div class="qna-left-box mgt-30">
      <p class="qna-recommended">
        <strong>추천이 많은 <br />질문/답변</strong>
        <span class="qna-more"><a @click="onclickManyLikeMore">더보기</a></span>
      </p>
    </div>

    <div class="qna-content">
      <div class="sorting-qna">
        <div class="sorting-option">
          <div
            v-for="product in $store.state.forum.products"
            :key="product.productCode"
          >
            <input
              :id="product.productCode + '_like'"
              :checked="selectedProduct.productCode === product.productCode"
              type="radio"
              name="sort-like"
            />
            <label
              :for="product.productCode + '_like'"
              @click="onclickProduct(product)"
              >{{ product.productName }}</label
            >
          </div>
        </div>
      </div>
      <ul
        v-for="post in $store.state.forum.manyLikeCountPosts"
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
                    productCode: selectedProduct.productCode,
                    product: selectedProduct,
                    _id: post._id,
                    post,
                  },
                }"
              >
                <dt>
                  <i v-if="post.isComplete" class="flag-complete">완료</i>
                  <strong>{{ post.title }}</strong>
                </dt>
                <dd>
                  {{ removeMdFormat(post.contents) }}
                </dd></nuxt-link
              >
              <dd class="user-info mgt-15">
                <span>{{ convertDateFormat(post.regDate) }}</span
                ><span>{{ post.userName }}({{ post.userId }})</span
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
import { Vue, Component, namespace } from 'nuxt-property-decorator';
import * as removeMd from 'remove-markdown';
import { dateFormat } from '~/utils/commonFuncs';
import { IProduct } from '~/store/modules/forum';

const Forum = namespace('forum');

@Component
export default class ManyLikeList extends Vue {
  @Forum.Action('forumHomePosts') forumHomePostsAction!: (payload: {
    type: string;
    productCode: string;
    params: any;
  }) => Promise<any>;
  selectedProduct!: IProduct;

  created() {
    this.selectedProduct = this.$store.state.forum.products[0];
  }

  onclickProduct(product: IProduct): void {
    if (this.selectedProduct._id === product._id) {
      return;
    }

    this.selectedProduct = product;
    this.forumHomePostsAction({
      type: 'manyLikeCountPosts',
      productCode: product.productCode,
      params: {
        ...this.$store.state.forum.forumDefaultListParams.params,
        limit: 3,
        sort: '-like',
      },
    });
  }

  onclickManyLikeMore(): void {
    this.$router.push({
      name: 'forumList',
      params: {
        productCode: this.selectedProduct.productCode,
        postType: this.$store.state.forum.postTypes.MANY_LIKE,
      },
    });
  }

  removeMdFormat(contents: string): string {
    return removeMd(contents);
  }

  convertDateFormat(time): string {
    return dateFormat(time);
  }
}
</script>

<style scoped></style>
