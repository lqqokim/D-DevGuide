import { ActionTree, MutationTree, GetterTree, ActionContext } from 'vuex';
import { RootState } from '@/store';
import * as common from '~/store/modules/common';
import { ALERT_TYPE } from '~/store/modules/common';

export interface ForumState {
  forumDefaultListParams: ListParams;
  products: IProduct[];
  selectedProduct: IProduct;
  selectedPost: IPost;
  postsByProduct: IPost[];
  replyForumList: IPost[];
  totalSize: number;
  replyTotalSize: number; // 내 질문/답변 답변한 post
  filterTypes: IFilterType;
  searchPostsResult: ISearchPostResult[];
  myForumCount: {
    isSet: boolean;
    totalCount: number;
    completeCount: number;
    progressCount: number;
  };
  replyForumCount: {
    isSet: boolean;
    totalCount: number;
    completeCount: number;
    progressCount: number;
  };
  notExistCommentPosts: IPost[];
  inProgressCommentPosts: IPost[];
  manyLikeCountPosts: IPost[];
  postTypes: PostType;
  activityCondition: IActivityCondition;
}

export interface IActivityCondition {
  myActivity: IMyActivity;
  allActivity: IAllActivity;
}

export interface IMyActivity {
  complete: number;
  inProgress: number;
  commentCount: number;
}

export interface IAllActivity {
  all: number;
  inProgress: number;
  complete: number;
}

export interface PostType {
  NOT_COMMENT: string;
  IN_PROGRESS: string;
  MANY_LIKE: string;
}

export interface IFilterType {
  ALL: string;
  COMPLETE: string;
  PROGRESS: string;
}

// 제품 생성시에 자동으로 함께 생성된다.
export interface IBoard {
  _id: string;
  boardName: string; // 게시판 이름(제품명)
  boardCode: string; // 게시판 코드(제품 코드)
  posts: Array<IPost>; // 질문 글 목록
  regDate: number; // 게시판 생성 날짜
  editDate?: number; // 게시판 수정 날짜 (ex. 제품명 변경)
  index: number; // 게시판 index
}

export interface IFile {
  _id: string;
  originFileName: string; // 원본 파일명
  fileName: string; // 변경된 파일명(_id)
  filePath: string; // 파일 경로
}

// 질문 검색 결과
export interface ISearchPostResult {
  boardName: string;
  searchData: IPost[];
}

// 질믄
export interface IPost {
  _id: string;
  title: string; // 글 제목
  contents: string; // 글 내용
  boardName: string; // 게시판 이름(제품명)
  boardCode: string; // 게시판 코드(제품 코드)
  regDate: number; // 등록 날짜
  editDate: number; // 수정 날짜

  userId: string; // 등록한 사용자 아이디
  userName: string; // 등록한 사용자 이름
  deptPath: string; // 등록한 사용자 팀명
  authority: string; // 등록한 사용자 권한

  viewCount: number; // 조회수
  commentCount: number; // 답변수
  like: number; // 추천수
  likeUsers: string[]; // 좋아요한 사용자
  dislikeUsers: string[]; // 싫어요한 사용자
  isComplete: boolean; // 답변 완료 여부
  isSubCommentEditing?: boolean; // 서브 댓글 입력 에디팅모드 관련

  subComments: Array<IComment>;
  comments: Array<IComment>;
  files: Array<IFile>;
}

// Post 의 서브스키마
export interface IComment {
  _id: string;
  userId: string; // 댓글 등록 사용자 아이디
  userName: string; // 댓글 등록 사용자 이름
  authority: string; // 댓글 등록 사용자 권한
  deptPath: string; // 등록한 사용자 팀명
  isStaff?: boolean; // 스태프 여부
  isChoose: boolean; // 답변 채택 여부

  regDate: number; // 댓글 등록 일자
  editDate: number; // 댓글 수정 일자

  contents: string; // 댓글 내용
  comments: Array<this>;
  isEditing?: boolean;
}

export interface ListParams {
  params: {
    skip: number;
    limit: number;
    sort: string;
    isNotExistComments: boolean;
    filterType: string;
  };
}

export interface IStaff {
  _id: string;
  empName: string;
  positionName: string;
  deptPath: string;
  empId: string;
}

export interface IProduct {
  _id?: string;
  index?: number;
  productName: string;
  productCode: string;
  description: string;
  staffs: Array<IStaff>;
}
export const state = (): ForumState => ({
  forumDefaultListParams: FORUM_DEFAULT_LIST_PARAMS(),
  products: [],
  selectedProduct: SELECTED_PRODUCT(),
  selectedPost: SELECTED_POST(),
  postsByProduct: [],
  replyForumList: [],
  totalSize: 0,
  replyTotalSize: 0,
  filterTypes: {
    ALL: 'All',
    COMPLETE: 'Complete',
    PROGRESS: 'Progress',
  },
  searchPostsResult: [],
  myForumCount: MY_FORUM_COUNT(),
  replyForumCount: MY_FORUM_COUNT(),
  notExistCommentPosts: [],
  inProgressCommentPosts: [],
  manyLikeCountPosts: [],
  postTypes: POST_TYPES(),
  activityCondition: ACTIVITY_CONDITION(),
});

export const namespaced: boolean = true;
export const getters: GetterTree<ForumState, RootState> = {};

export const mutations: MutationTree<ForumState> = {
  products(state, payload: Array<IProduct>): void {
    state.products = payload;
  },
  selectedProduct(state, payload: IProduct): void {
    state.selectedProduct = payload;
  },
  initState(state, payload: string): void {
    if (payload === 'selectedPost') {
      state.selectedPost = SELECTED_POST();
    }
  },
  postsByProduct(state, payload): void {
    state.postsByProduct = payload;
  },
  replyForumList(state, payload): void {
    state.replyForumList = payload;
  },
  totalSize(state, payload): void {
    state.totalSize = payload;
  },
  replyTotalSize(state, payload): void {
    state.replyTotalSize = payload;
  },
  selectedPost(state, payload: IPost): void {
    payload.comments.map((comment: IComment) => {
      comment.isEditing = false;
    });

    state.selectedPost = payload;
  },
  countIncrement(state): void {
    if (state.selectedPost) {
      state.selectedPost.viewCount++;
    }
  },
  changeLikeCount(state, payload): void {
    if (payload.type === 'plus') {
      state.selectedPost.like++;
      state.selectedPost.likeUsers.push(payload.userId);

      const idx: number = state.selectedPost.dislikeUsers.findIndex(
        (userId: string) => {
          return userId === payload.userId;
        }
      );

      if (state.selectedPost.dislikeUsers.includes(payload.userId)) {
        state.selectedPost.dislikeUsers.splice(idx, 1);
      }
    } else {
      state.selectedPost.like--;
      state.selectedPost.dislikeUsers.push(payload.userId);

      const likeUserIdx: number = state.selectedPost.likeUsers.findIndex(
        (userId: string) => {
          return userId === payload.userId;
        }
      );

      if (likeUserIdx > -1) {
        state.selectedPost.likeUsers.splice(likeUserIdx, 1);
      }
    }
  },
  postComment(state, payload): void {
    state.selectedPost.comments.push(payload);
  },
  postSubComment(state, payload): void {
    state.selectedPost.subComments.push(payload);
  },
  searchPostsResult(state, payload): void {
    const newSearchResult: Array<any> = [];
    const removeMd = require('remove-markdown');

    // 검색 결과 중복 제거
    const searchResults = payload.searchResults.filter((result, resultIdx) => {
      return (
        payload.searchResults.findIndex((compareResult) => {
          return compareResult._id === result._id;
        }) === resultIdx
      );
    });

    searchResults.forEach((searchResult) => {
      searchResult.title = searchResult.title
        .split(payload.searchWord)
        .join('<em>' + payload.searchWord + '</em>');
      searchResult.contents = removeMd(searchResult.contents);

      searchResult.contents = searchResult.contents
        .split(payload.searchWord)
        .join('<em>' + payload.searchWord + '</em>')
        .split('\n')
        .join('<br/>');
      let existedProductName: boolean = false;
      newSearchResult.forEach((result) => {
        if (result.boardName === searchResult.boardName) {
          result.searchData.push(searchResult);
          existedProductName = true;
        }
      });
      if (!existedProductName) {
        newSearchResult.push({
          boardName: searchResult.boardName,
          searchData: [searchResult],
        });
      }
    });

    state.searchPostsResult = newSearchResult;
  },
  deleteComment(state, payload): void {
    state.selectedPost.comments.splice(
      state.selectedPost.comments.indexOf(payload),
      1
    );
  },
  deletePostSubComment(state, payload: IComment): void {
    state.selectedPost.subComments.splice(
      state.selectedPost.subComments.indexOf(payload),
      1
    );
  },
  commentEditMode(
    state,
    payload: {
      comment: IComment;
      type: string;
    }
  ): void {
    const selectedPost: IPost = state.selectedPost;
    const idx: number = selectedPost.comments.findIndex((comment: IComment) => {
      return payload.comment._id === comment._id;
    });

    selectedPost.comments[idx].isEditing = payload.type === 'edit';
    state.selectedPost = Object.assign({}, selectedPost);
    console.log('commentEditMode :: ', state.selectedPost);
  },
  registerProduct(state, payload: IProduct): void {
    state.products.push(payload);
  },
  postSubCommentEditMode(state, payload: string): void {
    const selectedPost: IPost = state.selectedPost;
    selectedPost.isSubCommentEditing = payload === 'edit';
    state.selectedPost = Object.assign({}, selectedPost);
  },
  myForumCount(state, payload): void {
    state.myForumCount = payload;
  },
  replyForumCount(state, payload): void {
    state.replyForumCount = payload;
  },
  forumHomePosts(
    state,
    payload: {
      posts: IPost[];
      type: PostType[keyof PostType];
    }
  ) {
    state[payload.type] = payload.posts;
  },
  activityCondition(state, payload): void {
    state.activityCondition = payload;
  },
};

// _id: string;
// userId: string; // 댓글 등록 사용자 아이디
// userName: string; // 댓글 등록 사용자 이름
// authority: string; // 댓글 등록 사용자 권한
// deptPath: string; // 등록한 사용자 팀명
// isStaff?: string; // 스태프 여부
//
// regDate: number; // 댓글 등록 일자
// editDate: number; // 댓글 수정 일자
//
// contents: string; // 댓글 내용
// comments: Array<this>;

export const actions: ActionTree<ForumState, RootState> = {
  async activityCondition({ commit, state, rootState }): Promise<any> {
    try {
      if (rootState.user.user.loginId) {
        const { data } = await this.$axios.post('api/forum/condition', {
          userId: rootState.user.user.loginId,
        });

        console.log('activityCondition :: ', data);

        if (data.success && data.data) {
          commit('activityCondition', data.data);
        }
      }
    } catch (e) {}
  },

  async removePostSubDocument(
    { commit, state, dispatch },
    payload: IComment
  ): Promise<any> {
    try {
      const { data } = await this.$axios.delete(
        'api/forum/post/' +
          state.selectedPost._id +
          '/subComment/' +
          payload._id
      );

      console.log('removePostSubDocument :: ', data);

      if (data.success && data.data) {
        await commit('deletePostSubComment', payload);
        await dispatch(
          'common/alert',
          {
            type: ALERT_TYPE.CHECK,
            isShow: true,
            msg: '댓글이 삭제되었습니다.',
          },
          { root: true }
        );
      } else {
        await dispatch(
          'common/alert',
          {
            type: ALERT_TYPE.WARN,
            isShow: true,
            msg: data.msg,
          },
          { root: true }
        );
      }
    } catch (e) {
      await dispatch(
        'common/alert',
        {
          type: ALERT_TYPE.ERROR,
          isShow: true,
          msg: e,
        },
        { root: true }
      );
    }
  },

  async createPostSubComment(
    { commit, dispatch, state, rootState },
    payload: IComment
  ): Promise<any> {
    const request = {
      userId: rootState.user.user.loginId,
      userName: rootState.user.user.name,
      authority: rootState.user.user.authority,
      deptPath: rootState.user.user.deptPath.split('|')[3],
      contents: payload,
      comments: [],
      isChoose: false,
      isStaff: state.selectedProduct.staffs.some((staff: IStaff) => {
        return staff.empId === rootState.user.user.loginId;
      }),
    };

    // request.userId = 'kis4204';
    // request.userName = '김인수A';
    // request.deptPath = '플랫폼개발1팀';
    // request.authority = 'E';

    try {
      const { data } = await this.$axios.post(
        'api/forum/register/' + state.selectedPost._id + '/subComment',
        request
      );

      if (data.success && data.data) {
        await commit(
          'postSubComment',
          data.data.subComments[data.data.subComments.length - 1]
        );
        await commit('postSubCommentEditMode', 'cancel');
        await dispatch(
          'common/alert',
          {
            type: ALERT_TYPE.CHECK,
            isShow: true,
            msg: '댓글이 추가되었습니다.',
          },
          { root: true }
        );
      } else {
        await dispatch(
          'common/alert',
          {
            type: ALERT_TYPE.WARN,
            isShow: true,
            msg: data.msg,
          },
          { root: true }
        );
      }
    } catch (e) {
      await dispatch(
        'common/alert',
        {
          type: ALERT_TYPE.ERROR,
          isShow: true,
          msg: e,
        },
        { root: true }
      );
    }
  },

  removeProduct({ commit, state, dispatch }, payload: IProduct): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        const { data } = await this.$axios.delete(
          'api/forum/remove/product/' + payload.productCode
        );

        console.log('removeProduct :: ', data);

        await dispatch('forumProducts');
        resolve(data);
      } catch (e) {
        reject(e);
      }
    });
  },

  // 제품 정보 수정
  updateProduct({ commit, dispatch }, payload: IProduct): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        const { data } = await this.$axios.post(
          'api/forum/product/update/' + payload._id,
          payload
        );

        // console.log('updateProduct :: ', data);

        // await dispatch('forumProducts');
        resolve(data);
      } catch (e) {
        reject(e);
      }
    });
  },

  // 제품 목록 수정
  async updateProducts(
    { commit, dispatch },
    payload: IProduct[]
  ): Promise<any> {
    try {
      const { data } = await this.$axios.put('api/forum/products', payload);

      if (data.success && data.data) {
        await dispatch(
          'common/alert',
          {
            type: ALERT_TYPE.CHECK,
            isShow: true,
            msg: '제품 순서가 변경되었습니다.',
          },
          { root: true }
        );
      }
    } catch (e) {}
  },

  registerProduct({ commit, dispatch }, payload: IProduct): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        const { data } = await this.$axios.post('api/forum/product', payload);

        await dispatch('forumProducts');
        resolve(data);
      } catch (e) {
        reject(e);
      }
    });
  },

  async searchPosts(
    { commit },
    payload: { searchWord: string; productCode?: string; params?: ListParams }
  ): Promise<any> {
    const path = 'api/forum/searchPosts';
    let searchPath: string = path;
    let params = {
      searchWord: payload.searchWord,
    };

    if (payload.productCode !== undefined) {
      searchPath = path + '/' + payload.productCode;

      params = {
        searchWord: payload.searchWord,
        ...payload.params!.params,
      };
    }

    try {
      const { data } = await this.$axios.get(searchPath, {
        params,
      });

      console.log('searchPosts :: ', data);

      if (data.success && data.data) {
        // 질문답변 내 검색
        if (payload.productCode !== undefined) {
          await commit('postsByProduct', data.data.result);
          await commit('totalSize', data.data.total);
        }
        // 통합검색 질문답변 결과
        else {
          await commit('searchPostsResult', {
            searchResults: data.data.result,
            searchWord: payload.searchWord,
          });
        }
      }
    } catch (e) {
      console.error(e);
    }
  },

  async updateComment(
    { commit, dispatch, state },
    payload: {
      comment: IComment;
      chooseType: true;
    }
  ) {
    try {
      const { data } = await this.$axios.put(
        'api/forum/update/comment/' + payload.comment._id,
        payload.comment
      );

      console.log('[updateComment] ', data);

      if (data.success && data.data) {
        // 답변 내용에 수정
        if (!payload.chooseType) {
          // toast editor hide
          await commit('commentEditMode', {
            comment: payload.comment,
            type: 'cancel',
          });

          await dispatch(
            'common/alert',
            {
              type: ALERT_TYPE.CHECK,
              isShow: true,
              msg: '답변이 수정되었습니다.',
            },
            { root: true }
          );
        }
        // 답변 채택
        else if (payload.comment.isChoose) {
          await dispatch(
            'common/alert',
            {
              type: ALERT_TYPE.CHECK,
              isShow: true,
              msg: '답변이 채택되었습니다.',
            },
            { root: true }
          );
        }
        // 답변 채택 취소
        else {
          await dispatch(
            'common/alert',
            {
              type: ALERT_TYPE.CHECK,
              isShow: true,
              msg: '답변 채택이 취소되었습니다.',
            },
            { root: true }
          );
        }
      } else {
        await dispatch(
          'common/alert',
          {
            type: ALERT_TYPE.WARN,
            isShow: true,
            msg: data.msg,
          },
          { root: true }
        );
      }
    } catch (e) {
      await dispatch(
        'common/alert',
        {
          type: ALERT_TYPE.ERROR,
          isShow: true,
          msg: e,
        },
        { root: true }
      );
    }
  },

  async createComment(
    { commit, dispatch, state, rootState },
    payload: string
  ): Promise<any> {
    const request = {
      postId: state.selectedPost._id,
      userId: rootState.user.user.loginId,
      userName: rootState.user.user.name,
      authority: rootState.user.user.authority,
      deptPath: rootState.user.user.deptPath.split('|')[3],
      // userId: 'kis4204',
      // userName: '김인수A',
      // authority: 'E',
      // deptPath: '플랫폼개발1팀',
      contents: payload,
      comments: [],
      isChoose: false,
      isStaff: state.selectedProduct.staffs.some((staff: IStaff) => {
        return staff.empId === rootState.user.user.loginId;
      }),
    };

    try {
      const { data } = await this.$axios.post(
        'api/forum/register/post/' + state.selectedPost._id + '/comment',
        request
      );

      if (data.success && data.data) {
        await commit('postComment', data.data);
        await dispatch(
          'common/alert',
          {
            type: ALERT_TYPE.CHECK,
            isShow: true,
            msg: '답변이 등록되었습니다.',
          },
          { root: true }
        );
      } else {
        await dispatch(
          'common/alert',
          {
            type: ALERT_TYPE.WARN,
            isShow: true,
            msg: data.msg,
          },
          { root: true }
        );
      }
    } catch (e) {
      await dispatch(
        'common/alert',
        {
          type: ALERT_TYPE.ERROR,
          isShow: true,
          msg: e,
        },
        { root: true }
      );
    }
  },

  async updateLikeCount({ commit, state, rootState }, payload: string) {
    const req = {
      type: payload,
      userId: rootState.user.user.loginId,
      post: state.selectedPost,
    };

    try {
      const { data } = await this.$axios.post(
        'api/forum/like/' + state.selectedPost._id,
        req
      );

      console.log('[updateLikeCount] ', data);

      if (data.success && data.data) {
        // commit('changeLikeCount', req);
        await commit('selectedPost', data.data as IPost);
      }
    } catch (e) {
      console.error(e);
    }
  },

  async updateViewCount({ commit, state }) {
    try {
      const { data } = await this.$axios.post(
        'api/forum/count/' + state.selectedPost._id
      );

      // console.log('[updateViewCount] ', data);

      if (data.success) {
        await commit('countIncrement');
      }
    } catch (e) {
      console.error(e);
    }
  },

  async postDetail({ commit, state }, payload: string): Promise<any> {
    try {
      const { data } = await this.$axios.get('api/forum/post/' + payload);

      if (data.success && data.data) {
        await commit('selectedPost', data.data as IPost);
      }
    } catch (e) {
      console.error(e);
    }
  },

  async forumHomePosts(
    { commit, state },
    payload: {
      type: string;
      productCode: string;
      params: ListParams;
    }
  ): Promise<any> {
    console.log('payload productCode :: ', payload.productCode);

    try {
      const { data } = await this.$axios.get(
        'api/forum/list/' + payload.productCode,
        {
          params: payload.params,
        }
      );

      console.log('forumHomePosts : ', data);

      if (data.success && data.data) {
        await commit('forumHomePosts', {
          posts: data.data.result,
          type: payload.type,
        });
      }
    } catch (e) {
      console.error(e);
    }
  },

  async getPostsByProduct(
    { commit, state, rootState },
    payload: {
      type: string;
      data: IProduct;
      params: ListParams;
      filter: {
        userId?: string;
        comments?: any;
      };
    }
  ): Promise<any> {
    try {
      // 내 질문/답변
      if (
        payload.type &&
        (payload.type === 'reply' || payload.type === 'write')
      ) {
        const { data } = await this.$axios.post('api/forum/list/my', {
          userId: rootState.user.user.loginId,
          type: payload.type,
          params: payload.params
            ? payload.params
            : state.forumDefaultListParams,
        });

        if (data.success && data.data) {
          // 내 질문/답변 > 내가 답변한 질문
          if (payload.type === 'write') {
            await commit('postsByProduct', data.data.result);
            if (!state.myForumCount.isSet) {
              await commit('myForumCount', data.data.count);
            }
            await commit('totalSize', data.data.total);
          }
          // 내 질문/답변 > 내가 답변한 질문
          else {
            await commit('replyForumList', data.data.result);
            if (!state.replyForumCount.isSet) {
              await commit('replyForumCount', data.data.count);
            }
            await commit('replyTotalSize', data.data.total);
          }
          // commit('managedFiles', data.data.slice().splice(0, 6));
        }
      } else {
        const { data } = await this.$axios.get(
          'api/forum/list/' + payload.data.productCode,
          payload.params ? payload.params : state.forumDefaultListParams
        );

        console.log('getPostsByProduct : ', data);

        if (data.success && data.data) {
          await commit('postsByProduct', data.data.result);
          // commit('managedFiles', data.data.slice().splice(0, 6));
          await commit('totalSize', data.data.total);
        }
      }
    } catch (e) {
      console.error(e);
    }
  },

  async forumProducts({ commit }): Promise<any> {
    try {
      const { data } = await this.$axios.get('api/forum/products');

      if (data.success && data.data) {
        await commit('products', data.data as IProduct[]);
      }
    } catch (e) {
      console.error(e);
    }
  },

  async productByCode({ commit }, payload: string): Promise<any> {
    try {
      const { data } = await this.$axios.get('api/forum/product/' + payload);

      if (data.success && data.data) {
        await commit('selectedProduct', data.data as IProduct);
      }
    } catch (e) {
      console.error(e);
    }
  },

  async deleteComment(
    { commit, dispatch, state },
    payload: IComment
  ): Promise<any> {
    try {
      const { data } = await this.$axios.delete(
        'api/forum/post/' + state.selectedPost._id + '/comment/' + payload._id
      );

      console.log('deleteComment', data);

      if (data.success && data.data) {
        await commit('deleteComment', payload);
        await dispatch(
          'common/alert',
          {
            type: ALERT_TYPE.CHECK,
            isShow: true,
            msg: '댓글이 삭제되었습니다.',
          },
          { root: true }
        );
      } else {
        await dispatch(
          'common/alert',
          {
            type: ALERT_TYPE.WARN,
            isShow: true,
            msg: data.msg,
          },
          { root: true }
        );
      }
    } catch (e) {
      await dispatch(
        'common/alert',
        {
          type: ALERT_TYPE.ERROR,
          isShow: true,
          msg: e,
        },
        { root: true }
      );
    }
  },

  async deletePost({ state, dispatch }): Promise<any> {
    try {
      const { data } = await this.$axios.delete(
        'api/forum/' +
          state.selectedPost.boardCode +
          '/' +
          state.selectedPost._id
      );

      if (data.success && data.data) {
        await dispatch(
          'common/alert',
          {
            type: ALERT_TYPE.CHECK,
            isShow: true,
            msg: '질문이 삭제되었습니다.',
          },
          { root: true }
        );
      } else {
        await dispatch(
          'common/alert',
          {
            type: ALERT_TYPE.WARN,
            isShow: true,
            msg: data.msg,
          },
          { root: true }
        );
      }
    } catch (e) {
      await dispatch(
        'common/alert',
        {
          type: ALERT_TYPE.ERROR,
          isShow: true,
          msg: e,
        },
        { root: true }
      );
    }
  },

  async postComplete({ commit, dispatch }, payload: IPost) {
    try {
      const { data } = await this.$axios.post(
        'api/forum/update/post/' + payload._id,
        payload
      );

      if (data.success && data.data) {
        await dispatch(
          'common/alert',
          {
            type: ALERT_TYPE.CHECK,
            isShow: true,
            msg: '질문이 완료처리되었습니다.',
          },
          { root: true }
        );
      } else {
        await dispatch(
          'common/alert',
          {
            type: ALERT_TYPE.WARN,
            isShow: true,
            msg: data.msg,
          },
          { root: true }
        );
      }
    } catch (e) {
      await dispatch(
        'common/alert',
        {
          type: ALERT_TYPE.ERROR,
          isShow: true,
          msg: e,
        },
        { root: true }
      );
    }
  },

  async updatePost(
    { commit, dispatch, rootState },
    payload: {
      isChangeFile?: boolean;
      data: IPost;
      file: any;
    }
  ): Promise<any> {
    try {
      const { data } = await this.$axios.post(
        'api/forum/update/post/' + payload.data._id,
        payload.data
      );

      if (data.success && data.data) {
        await commit('selectedPost', data.data as IPost);
        await dispatch(
          'common/alert',
          {
            type: ALERT_TYPE.CHECK,
            isShow: true,
            msg: '질문이 수정되었습니다.',
          },
          { root: true }
        );
      } else {
        await dispatch(
          'common/alert',
          {
            type: ALERT_TYPE.WARN,
            isShow: true,
            msg: data.msg,
          },
          { root: true }
        );
      }
    } catch (e) {
      await dispatch(
        'common/alert',
        {
          type: ALERT_TYPE.CHECK,
          isShow: true,
          msg: e,
        },
        { root: true }
      );
    }
  },

  async createPost(
    { commit, dispatch, rootState },
    payload: {
      isChangeFile?: boolean;
      data: IPost;
      file: any;
    }
  ): Promise<any> {
    payload.data.hasOwnProperty('_id') && delete payload.data._id;
    payload.data.userId = rootState.user.user.loginId;
    payload.data.userName = rootState.user.user.name;
    payload.data.deptPath = rootState.user.user.deptPath.split('|')[3];
    payload.data.authority = rootState.user.user.authority;

    // payload.data.userId = 'kis4204';
    // payload.data.userName = '김인수A';
    // payload.data.deptPath = '플랫폼개발1팀';
    // payload.data.authority = 'E';

    // const formData = new FormData();
    // formData.append('file', payload.file.files[0]);
    // formData.append('data', JSON.stringify(payload.data));

    try {
      const { data } = await this.$axios.post(
        'api/forum/register/post/' + payload.data.boardCode,
        payload.data
      );

      console.log('createPost :: ', data);

      if (data.success && data.data) {
        await commit('selectedPost', data.data);
        await dispatch(
          'common/alert',
          {
            type: ALERT_TYPE.CHECK,
            isShow: true,
            msg: '질문이 등록되었습니다.',
          },
          { root: true }
        );
      } else {
        await dispatch(
          'common/alert',
          {
            type: ALERT_TYPE.WARN,
            isShow: true,
            msg: data.msg,
          },
          { root: true }
        );
      }
    } catch (e) {
      await dispatch(
        'common/alert',
        {
          type: ALERT_TYPE.ERROR,
          isShow: true,
          msg: e,
        },
        { root: true }
      );
    }
  },
};

const FORUM_DEFAULT_LIST_PARAMS = () => {
  return {
    params: {
      skip: 0,
      limit: parseInt(common.state().countOptions[0].code),
      sort: '-regDate',
      isNotExistComments: false,
      filterType: 'All',
    },
  };
};

// @ts-ignore
const SELECTED_PRODUCT = (): IProduct => {
  return {
    _id: '',
    productName: '',
    productCode: '',
    description: '',
    staffs: [],
  };
};

// @ts-ignore
const SELECTED_POST = (): IPost => {
  return {
    _id: '',
    title: '',
    contents: '',
    boardName: '',
    boardCode: '',
    regDate: 0,
    editDate: 0,
    userId: '',
    userName: '',
    deptPath: '',
    authority: '',

    viewCount: 0,
    commentCount: 0,
    like: 0,
    likeUsers: [],
    dislikeUsers: [],
    isComplete: false,
    isSubCommentEditing: false,

    subComments: [],
    comments: [],
    files: [],
  };
};

// @ts-ignore
const MY_FORUM_COUNT = () => {
  return {
    isSet: false,
    totalCount: 0,
    completeCount: 0,
    progressCount: 0,
  };
};

const POST_TYPES = (): PostType => {
  return {
    NOT_COMMENT: 'notComment',
    IN_PROGRESS: 'inProgress',
    MANY_LIKE: 'manyLike',
  };
};

const ACTIVITY_CONDITION = (): IActivityCondition => {
  return {
    myActivity: {
      complete: 0,
      inProgress: 0,
      commentCount: 0,
    },
    allActivity: {
      all: 0,
      inProgress: 0,
      complete: 0,
    },
  };
};
