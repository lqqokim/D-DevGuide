<template>
  <div>
    <h2 class="tit-con-small">내가 답변한 질문</h2>
    <div class="qna-wrap mgb-25">
      <div class="sorting-qna">
        <div class="sorting-option">
          <div>
            <input
              id="sort4"
              checked="checked"
              type="radio"
              name="sort"
              @click="onclickAll"
            />
            <label for="sort4"
              >전체 <em>{{ postCount.totalCount }}</em></label
            >
          </div>
          <div>
            <input
              id="sort5"
              type="radio"
              name="sort"
              @click="onclickComplete"
            />
            <label for="sort5"
              >완료됨 <em>{{ postCount.completeCount }}</em></label
            >
          </div>
          <div class="process">
            <input
              id="sort6"
              type="radio"
              name="sort"
              @click="onclickProgress"
            />
            <label for="sort6"
              >진행중 <em>{{ postCount.progressCount }}</em></label
            >
          </div>
        </div>
        <div class="sorting-list">
          <div class="ui-select small">
            <select title="내가 작성한 질문" class="off" tabindex="-1">
              <option
                v-for="sort in sortOptions"
                :key="sort.code"
                :value="sort.name"
                :selected="selectedSortOption.code === sort.code"
                >{{ sort.name }}</option
              >
            </select>
            <button
              type="button"
              class="ui-select-btn"
              :class="{ on: isOpenSort }"
              title="정렬형태 선택"
              @click="isOpenSort = !isOpenSort"
            >
              {{ selectedSortOption.name }}
            </button>

            <div class="ui-select-wrap" :class="{ on: isOpenSort }">
              <strong class="ui-select-tit" tabindex="0">목록순서</strong>
              <div class="ui-select-options">
                <button
                  v-for="sort in sortOptions"
                  :key="sort.code"
                  type="button"
                  class="ui-select-opt"
                  :selected="selectedSortOption.code === sort.code"
                  :value="sort.name"
                  @click="onclickSort(sort)"
                >
                  <b class="ui-select-txt">{{ sort.name }}</b>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="qna-content">
        <ul class="dbs-list qna">
          <li v-for="post in replyForumList" :key="post._id" class="list-qna">
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
                      productCode: post.boardCode,
                      _id: post._id,
                      post: post,
                    },
                  }"
                  ><dt>
                    <strong>{{ post.title }}</strong>
                  </dt>
                  <dd>
                    {{ removeMdFormat(post.contents) }}
                  </dd></nuxt-link
                >
                <dd class="user-info mgt-15">
                  <i class="flag-qna">{{ post.boardCode }}</i
                  ><span>{{ convertDateFormat(post.regDate) }}</span
                  ><span>{{ post.userName }} ({{ post.userId }})</span
                  ><span>조회 {{ post.viewCount }}</span>
                </dd>
              </dl>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <div v-if="replyForumList.length > 0" class="paging mgb-70">
      <template v-if="nextCount > 0">
        <button
          type="button"
          class="btn-page-first disabled"
          title="처음으로"
          @click="onclickFirstPage"
        />
        <button
          type="button"
          class="btn-page-prev"
          title="이전"
          @click="onclickPrevPage"
        />
      </template>

      <!--      <a href="#" class="this-page">1</a>-->
      <a
        v-for="page in pages"
        :key="page"
        :class="{ 'this-page': selectedPage === page }"
        @click="onclickPage(page)"
        >{{ page + 1 }}</a
      >
      <template v-if="pages.length === 5">
        <button
          type="button"
          class="btn-page-next"
          title="다음"
          @click="onclickNextPage"
        />
        <button
          type="button"
          class="btn-page-last"
          title="마지막으로"
          @click="onclickEndPage"
        />
      </template>
    </div>
  </div>
</template>
<script lang="ts">
import { Vue, Component, namespace } from 'nuxt-property-decorator';
import * as removeMd from 'remove-markdown';
import { dateFormat } from '~/utils/commonFuncs';

import { IProduct, IFilterType } from '~/store/modules/forum';
import { SortOptions } from '~/store/modules/common';

const Forum = namespace('forum');

@Component
export default class MyReplyForumList extends Vue {
  @Forum.Action('getPostsByProduct') postsByProductAction!: (payload: {
    type: string;
    data: IProduct;
    params: any;
  }) => Promise<any>;

  isOpenSort: boolean = false;
  selectedSortOption: SortOptions = { code: '', name: '' };
  selectedCountOption: SortOptions = { code: '', name: '' };
  selectedPage: number = 1;
  countOptions!: SortOptions[];
  sortOptions!: SortOptions[];
  total!: number;
  pages: number[] = [];
  totalPages: number[] = [];
  selectedIndex: number = -1;
  isNotExistComments: boolean = false; // 답변이 없는 항목만 보기
  // isComplete: boolean | undefined = undefined;

  nextCount: number = 0;

  filterTypes!: IFilterType;
  selectedFilter!: string;

  get postCount() {
    console.log('[replyForumCount] ', this.$store.state.forum.replyForumCount);
    return this.$store.state.forum.replyForumCount;
  }

  get replyForumList() {
    console.log('[replyForumList] :: ', this.$store.state.forum.replyForumList);
    return this.$store.state.forum.replyForumList;
  }

  created() {
    this.filterTypes = this.$store.state.forum.filterTypes;
    this.selectedFilter = this.filterTypes.ALL;

    this.countOptions = this.$store.state.common.countOptions;
    this.sortOptions = this.$store.state.common.forumSortOptions;

    this.selectedCountOption = this.countOptions[0];
    this.selectedSortOption = this.sortOptions[0];
    this.setPages();
  }

  async onclickSort(sortOption: SortOptions): Promise<any> {
    this.selectedSortOption = sortOption;
    this.isOpenSort = !this.isOpenSort;

    await this.actionGetPosts();
    this.setPages();
  }

  setPages(): void {
    const pages: number[] = [];
    const totalSize: number = this.$store.state.forum.replyTotalSize;

    for (
      let i = 0;
      i < Math.ceil(totalSize / parseInt(this.selectedCountOption.code));
      i++
    ) {
      pages.push(i);
    }

    console.log('replyForumCount :: ', totalSize);
    console.log('pages :: ', pages);

    this.pages = pages;
    this.selectedPage = this.pages[0];
    // init fold
    this.selectedIndex = -1;
  }

  // onclickPage(page: number): void {
  //   this.selectedPage = page;
  //
  //   let skip: number = parseInt(
  //     (this.selectedPage - 1) * parseInt(this.selectedCountOption.code) +
  //       this.postsByProduct.length
  //   );
  //
  //   if (this.selectedPage === 0) {
  //     skip = 0;
  //   }
  //
  //   this.actionGetPosts(skip);
  // }

  async actionGetPosts(skip: number = 0): Promise<any> {
    const params = {
      skip,
      sort: this.selectedSortOption.code,
      limit: this.selectedCountOption.code,
      isNotExistComments: this.isNotExistComments,
      filterType: this.selectedFilter,
    };

    await this.postsByProductAction({
      type: 'reply',
      data: this.$store.state.forum.selectedProduct,
      params: {
        params,
      },
    });
  }

  async onclickComplete(): Promise<any> {
    if (this.selectedFilter === this.filterTypes.COMPLETE) {
      return;
    }

    if (this.isNotExistComments) {
      this.isNotExistComments = false;
    }

    this.selectedFilter = this.filterTypes.COMPLETE;
    await this.actionGetPosts();
    this.setPages();
  }

  async onclickProgress(): Promise<any> {
    if (this.selectedFilter === this.filterTypes.PROGRESS) {
      return;
    }

    this.selectedFilter = this.filterTypes.PROGRESS;
    await this.actionGetPosts();
    this.setPages();
  }

  async onclickAll(): Promise<any> {
    if (this.selectedFilter === this.filterTypes.ALL) {
      return;
    }

    if (this.isNotExistComments) {
      this.isNotExistComments = false;
    }

    this.selectedFilter = this.filterTypes.ALL;
    await this.actionGetPosts();
    this.setPages();
  }

  onclickPage(page: number): void {
    this.selectedPage = page;

    let skip: number = parseInt(
      (this.selectedPage - 1) * parseInt(this.selectedCountOption.code) +
        this.replyForumList.length
    );

    if (this.selectedPage === 0) {
      skip = 0;
    }

    this.actionGetPosts(skip);
  }

  removeMdFormat(contents: string): string {
    return removeMd(contents);
  }

  onclickFirstPage() {}

  onclickEndPage() {}

  onclickNextPage(): void {
    this.nextCount++;
    this.pages = this.totalPages.slice(
      5 * this.nextCount,
      5 * (this.nextCount + 1)
    );

    this.selectedPage = this.pages[0];

    console.log('onclickNextPage :: ', this.pages);
  }

  onclickPrevPage() {
    this.nextCount--;
    this.pages = this.totalPages.slice(
      5 * this.nextCount,
      5 * (this.nextCount + 1)
    );

    this.selectedPage = this.pages[0];
  }

  convertDateFormat(time): string {
    return dateFormat(time);
  }
}
</script>

<style scoped></style>
