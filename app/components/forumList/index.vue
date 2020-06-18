<template>
  <div class="container-panel">
    <div class="view-top">
      <h1 class="tit-con-text">
        {{ $store.state.forum.selectedProduct.productName }}
      </h1>
      <div class="pst-button">
        <div class="srch-wrap-motion">
          <input
            type="text"
            required="required"
            @input="inputWord"
            @keydown="searchRequest"
          />
          <!--          <input type="search" required="required" />-->
          <div class="search"></div>
        </div>
        <!--
              <div class="srch">
                <div class="srch-wrap-bar-small">
                  <div class="srch-wrap">
                    <input type="search" class="m-srch-bar" />
                    <button type="button" class="btn-search small">
                      search
                    </button>
                  </div>
                </div>
              </div>
              -->
      </div>
      <div class="register">
        <button
          type="button"
          class="btn-main blue small"
          @click="onclickForumRegister"
        >
          질문 등록
        </button>
      </div>
    </div>
    <div class="qna-wrap mgb-25">
      <div class="sorting-qna">
        <div class="sorting-option">
          <div>
            <input
              id="sort1"
              type="radio"
              name="sort"
              :checked="selectedFilter === filterTypes.ALL"
              @click="onclickAll"
            />
            <label for="sort1">전체</label>
          </div>
          <div>
            <input
              id="sort2"
              type="radio"
              name="sort"
              :checked="selectedFilter === filterTypes.COMPLETE"
              @click="onclickComplete"
            />
            <label for="sort2">완료됨</label>
          </div>
          <div class="process">
            <input
              id="sort3"
              type="radio"
              name="sort"
              :checked="selectedFilter === filterTypes.PROGRESS"
              @click="onclickProgress"
            />
            <label for="sort3">진행중</label>
            <span
              v-if="selectedFilter === filterTypes.PROGRESS"
              class="dbs-checkbox-wrapper"
            >
              <input
                id="uiCheck1"
                type="checkbox"
                name="uiCheck1"
                :checked="isNotExistComments"
                @click="onclickCheckComments"
              />
              <label for="uiCheck1" class="dbs-checkbox"
                >답변이 없는 항목만 보기</label
              >
            </span>
          </div>
        </div>
        <div class="sorting-list">
          <div class="ui-select small">
            <select title="정렬형태" class="off" tabindex="-1">
              <option
                v-for="count in countOptions"
                :key="count.code"
                :value="count.name"
                :selected="selectedCountOption.code === count.code"
                >{{ count.name }}</option
              >
            </select>
            <button
              type="button"
              class="ui-select-btn"
              :class="{ on: isOpenCount }"
              title="정렬형태 선택"
              @click="isOpenCount = !isOpenCount"
            >
              {{ selectedCountOption.name }}
            </button>

            <div class="ui-select-wrap" :class="{ on: isOpenCount }">
              <strong class="ui-select-tit" tabindex="0">목록순서</strong>
              <div class="ui-select-options">
                <button
                  v-for="count in countOptions"
                  :key="count.code"
                  type="button"
                  class="ui-select-opt"
                  :selected="selectedCountOption.code === count.code"
                  :value="count.name"
                  @click="onclickCount(count)"
                >
                  <b class="ui-select-txt">{{ count.name }}</b>
                </button>
              </div>
            </div>
          </div>
          <div class="ui-select small">
            <select title="정렬형태" class="off" tabindex="-1">
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
          <li v-for="post in postsByProduct" :key="post._id" class="list-qna">
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
                  <dd
                    class="contents-dim"
                    v-html="removeMdFormat(post.contents)"
                  />
                  <!--                  <TuiEditorViewer :value="post.contents" />-->
                </nuxt-link>
                <dd class="user-info mgt-15">
                  <!--                  <span v-if="isNew(post.regDate)"-->
                  <!--                    >{{ dayDiff(post.regDate) }} 일전</span-->
                  <!--                  ><span v-else>-->
                  <!--                    {{ convertDateFormat(post.regDate) }}-->
                  <!--                  </span>-->
                  <i
                    v-if="$route.params.productCode === 'ALL'"
                    class="flag-qna"
                    >{{ post.boardCode }}</i
                  >
                  <span>
                    {{ convertDateFormat(post.regDate) }}
                  </span>
                  <span>{{ post.userName }}({{ post.userId }})</span
                  ><span>조회 {{ post.viewCount }}</span>
                </dd>
              </dl>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <div v-if="postsByProduct.length > 0" class="paging mgb-80">
      <template>
        <button
          type="button"
          class="btn-page-first"
          :class="{ disabled: !(nextCount > 0) }"
          title="처음으로"
          @click="onclickFirstPage(!(nextCount > 0))"
        />
        <button
          type="button"
          class="btn-page-prev"
          :class="{ disabled: !(nextCount > 0) }"
          title="이전"
          @click="onclickPrevPage(!(nextCount > 0))"
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
      <template>
        <button
          type="button"
          class="btn-page-next"
          :class="{ disabled: pages.length !== 5 }"
          title="다음"
          @click="onclickNextPage(pages.length !== 5)"
        />
        <button
          type="button"
          class="btn-page-last"
          :class="{ disabled: pages.length !== 5 }"
          title="마지막으로"
          @click="onclickEndPage(pages.length !== 5)"
        />
      </template>
    </div>
  </div>
</template>
<script lang="ts">
import { Vue, Component, namespace } from 'nuxt-property-decorator';
import * as removeMd from 'remove-markdown';
import { dateFormat } from '~/utils/commonFuncs';
import { IProduct, IFilterType, ListParams } from '~/store/modules/forum';
import { IAlert, SortOptions } from '~/store/modules/common';

const Forum = namespace('forum');
const Common = namespace('common');

@Component
export default class ForumList extends Vue {
  @Common.Action('alert') alertAction!: (payload: IAlert) => Promise<any>;
  @Forum.Action('getPostsByProduct') postsByProductAction!: (payload: {
    data: IProduct;
    params: any;
  }) => Promise<any>;
  @Forum.Action('searchPosts') searchPostsAction!: (payload: {
    searchWord: string;
    productCode: string;
    params: any;
  }) => Promise<any>;

  //   searchWord: params.searchWord,
  // });  await store.dispatch('forum/searchPosts', {

  isOpenSort: boolean = false;
  isOpenCount: boolean = false;
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

  $refs!: {
    contentRef: any;
  };

  searchWord: string = '';

  inputWord(e): void {
    this.searchWord = e.target.value;
  }

  async searchRequest(e): Promise<any> {
    // if (
    //   ((e.type === 'keydown' && e.keyCode === 13) || e.type === 'click') &&
    //   this.searchWord !== ''
    // )
    if ((e.type === 'keydown' && e.keyCode === 13) || e.type === 'click') {
      await this.actionGetSearchPosts();
      this.setPages();
    }
  }

  async actionGetSearchPosts(skip: number = 0): Promise<any> {
    const params = {
      skip,
      sort: this.selectedSortOption.code,
      limit: this.selectedCountOption.code,
      isNotExistComments: this.isNotExistComments,
      filterType: this.selectedFilter,
    };

    await this.searchPostsAction({
      searchWord: this.searchWord,
      productCode: this.$store.state.forum.selectedProduct.productCode,
      params: {
        params,
      },
    });
  }

  get postsByProduct() {
    return this.$store.state.forum.postsByProduct;
  }

  async created(): Promise<any> {
    const filterTypes = this.$store.state.forum.filterTypes;
    const routeParams = this.$route.params;
    // console.log('this.$route.params', this.$route.params);

    this.filterTypes = filterTypes;
    this.selectedFilter = filterTypes.ALL;

    this.countOptions = this.$store.state.common.countOptions;
    this.sortOptions = this.$store.state.common.forumSortOptions;

    this.selectedCountOption = this.countOptions[0];
    this.selectedSortOption = this.sortOptions[0];

    // 질문답변 메인화면에서 더보기로 질문목록 이동
    if (routeParams.postType) {
      const postTypes = this.$store.state.forum.postTypes;

      if (routeParams.postType === postTypes.NOT_COMMENT) {
        this.selectedFilter = filterTypes.PROGRESS;
        this.isNotExistComments = true;
      } else if (routeParams.postType === postTypes.IN_PROGRESS) {
        this.selectedFilter = filterTypes.PROGRESS;
      } else if (routeParams.postType === postTypes.MANY_LIKE) {
        this.selectedSortOption = this.sortOptions[1]; // -like
      }

      await this.actionGetPosts();

      // this.isNotExistComments = false;
      // this.selectedFilter = filterTypes.ALL;
      // this.selectedSortOption = this.sortOptions[0];
    }

    // 초기 page number 설정
    this.setPages();
  }

  onclickFirstPage(isDisabled: boolean) {
    if (isDisabled) return false;

    // 목록 하단 page number 설정
    this.nextCount = 0;
    this.pages = this.totalPages.slice(
      5 * this.nextCount,
      5 * (this.nextCount + 1)
    );

    // select first page
    this.selectedPage = this.totalPages[0];
    this.onclickPage(this.selectedPage);
  }

  onclickEndPage(isDisabled: boolean) {
    if (isDisabled) return false;

    // 목록 하단 page number 설정
    this.nextCount = Math.floor(this.totalPages.length / 5);
    this.pages = this.totalPages.slice(
      5 * this.nextCount,
      5 * (this.nextCount + 1)
    );

    // 마지막 페이지 선택
    this.selectedPage = this.totalPages[this.totalPages.length - 1];
    this.onclickPage(this.selectedPage);
  }

  onclickNextPage(isDisabled: boolean) {
    if (isDisabled) return false;

    // 목록 하단 page number 설정
    this.nextCount++;
    this.pages = this.totalPages.slice(
      5 * this.nextCount,
      5 * (this.nextCount + 1)
    );

    this.selectedPage = this.pages[0];
    this.onclickPage(this.selectedPage);
  }

  onclickPrevPage(isDisabled: boolean) {
    if (isDisabled) return false;

    // 목록 하단 page number 설정
    this.nextCount--;
    this.pages = this.totalPages.slice(
      5 * this.nextCount,
      5 * (this.nextCount + 1)
    );

    this.selectedPage = this.pages[0];
    this.onclickPage(this.selectedPage);
  }

  removeMdFormat(contents: string): string {
    return removeMd(contents)
      .split('\n')
      .join('<br/>');
  }

  setPages(): void {
    const pages: number[] = [];
    const totalSize: number = this.$store.state.forum.totalSize;

    for (
      let i = 0;
      i < Math.ceil(totalSize / parseInt(this.selectedCountOption.code));
      i++
    ) {
      pages.push(i);
    }

    this.totalPages = pages;
    this.pages = this.totalPages.slice(0, 5);
    this.selectedPage = this.pages[0];
    // init fold
    this.selectedIndex = -1;
  }

  async onclickSort(sortOption: SortOptions): Promise<any> {
    this.selectedSortOption = sortOption;
    this.isOpenSort = !this.isOpenSort;

    if (this.searchWord !== '') {
      await this.actionGetSearchPosts();
      this.setPages();
      return;
    }

    await this.actionGetPosts();
    this.setPages();
  }

  async onclickCount(countOption: SortOptions): Promise<any> {
    this.selectedCountOption = countOption;
    this.isOpenCount = !this.isOpenCount;

    if (this.searchWord !== '') {
      await this.actionGetSearchPosts();
      this.setPages();
      return;
    }

    await this.actionGetPosts();
    this.setPages();
  }

  onclickPage(page: number): void {
    this.selectedPage = page;

    let skip: number = parseInt(
      (this.selectedPage - 1) * parseInt(this.selectedCountOption.code) +
        this.postsByProduct.length
    );

    if (this.selectedPage === 0) {
      skip = 0;
    }

    if (this.searchWord !== '') {
      this.actionGetSearchPosts(skip);
      return;
    }

    this.actionGetPosts(skip);
  }

  async onclickCheckComments(): Promise<any> {
    this.isNotExistComments = !this.isNotExistComments;

    if (this.searchWord !== '') {
      await this.actionGetSearchPosts();
      this.setPages();
      return;
    }

    await this.actionGetPosts();
    this.setPages();
  }

  async onclickComplete(): Promise<any> {
    if (this.selectedFilter === this.filterTypes.COMPLETE) {
      return;
    }

    if (this.isNotExistComments) {
      this.isNotExistComments = false;
    }

    this.selectedFilter = this.filterTypes.COMPLETE;

    if (this.searchWord !== '') {
      await this.actionGetSearchPosts();
      this.setPages();
      return;
    }

    await this.actionGetPosts();
    this.setPages();
  }

  async onclickProgress(): Promise<any> {
    if (this.selectedFilter === this.filterTypes.PROGRESS) {
      return;
    }

    this.selectedFilter = this.filterTypes.PROGRESS;

    if (this.searchWord !== '') {
      await this.actionGetSearchPosts();
      this.setPages();
      return;
    }

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

    // 검색어 존재할 경우
    if (this.searchWord !== '') {
      await this.actionGetSearchPosts();
      this.setPages();
      return;
    }

    await this.actionGetPosts();
    this.setPages();
  }

  async actionGetPosts(skip: number = 0): Promise<any> {
    const params = {
      skip,
      sort: this.selectedSortOption.code,
      limit: this.selectedCountOption.code,
      isNotExistComments: this.isNotExistComments,
      filterType: this.selectedFilter,
    };

    await this.postsByProductAction({
      data: this.$store.state.forum.selectedProduct,
      params: {
        params,
      },
    });
  }

  onclickForumRegister(): void {
    if (!this.$store.state.forum.products.length) {
      this.alertAction({
        type: 'warning',
        isShow: true,
        msg: '제품을 먼저 등록해주세요.',
      });

      // return;
    }

    // // 로그인 하지 않았을 경우, 로그인 화면으로 이동
    // if (!this.$store.state.user.user.loginId) {
    //   this.$router.push({
    //     name: 'login',
    //   });
    // }
    // 로그인 했을 경우, 질문등록 화면 이동
    // else {
    this.$router.push({
      name: 'forumRegister',
      params: {
        productCode: this.$route.params.productCode,
        editType: 'register',
      },
    });
    // }
  }

  convertDateFormat(time): string {
    return dateFormat(time);
  }
}
</script>
<style scoped></style>
