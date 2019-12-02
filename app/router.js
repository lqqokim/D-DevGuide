import Vue from 'vue';
import Router from 'vue-router';

import Index from '@/pages/index.vue';
import Storage from '@/pages/Storage.vue';

/**
 * 제품 화면
 */
import ProductListPage from '@/pages/user/ProductList.vue';
import ProductDetailPage from '@/pages/user/ProductDetail.vue';
import ProductDocViewPage from '@/pages/user/ProductDocView.vue';
import ProductEditPage from '@/pages/user/ProductEdit.vue';
import ProductRegisterPage from '@/pages/user/ProductRegister.vue';

import ProductManagePage from '@/pages/admin/ProductManage.vue';
import ProductBranchManagePage from '@/pages/admin/ProductBranchManage.vue';
import ProductVerManagePage from '@/pages/admin/ProductVerManage.vue';
import ProductNoticeManagePage from '@/pages/admin/ProductNoticeManage.vue';

/**
 * 질문 답변
 */
import ForumRegisterPage from '@/pages/user/ForumRegister.vue';
import ForumListPage from '@/pages/user/ForumList.vue';
import ForumDetailPage from '@/pages/user/ForumDetail.vue';
import ForumSearchPage from '@/pages/user/ForumSearch.vue';

import ForumHomePage from '@/pages/user/ForumHome.vue';
import ForumAllPage from '@/pages/user/ForumAll.vue';
import ForumProductPage from '@/pages/user/ForumProduct.vue';
import ForumProductDetailPage from '@/pages/user/ForumProductDetail.vue';
import ForumMyPage from '@/pages/user/ForumMy.vue';
import ForumManagePage from '@/pages/admin/ForumManage.vue';

/**
 * 자료실
 */
import LibraryHomePage from '@/pages/user/LibraryHome.vue';

// 동영상
import LibraryVideoListPage from '~/pages/user/LibraryVideoList.vue';
import LibraryVideoDetailPage from '~/pages/user/LibraryVideoDetail.vue';
import LibraryVideoRegisterPage from '~/pages/user/LibraryVideoRegister.vue';
import LibraryVideoSeriesRegisterPage from '~/pages/user/LibraryVideoSeriesRegister.vue';
import LibraryVideoEditPage from '~/pages/user/LibraryVideoEdit.vue';
import LibraryVideoProductManagePage from '~/pages/admin/LibraryVideoProductManage.vue';
import LibraryVideoHomeManagePage from '~/pages/admin/LibraryVideoHomeManage.vue';

// 문서
import LibraryDocListPage from '~/pages/user/LibraryDocList.vue';
import LibraryDocDetailPage from '~/pages/user/LibraryDocDetail.vue';

import LibraryDocRegisterPage from '~/pages/user/LibraryDocRegister.vue';
import LibraryDocEditPage from '~/pages/user/LibraryDocEdit.vue';
import LibraryDocProductManagePage from '~/pages/admin/LibraryDocProductManage.vue';

// 다운로드
import LibraryDownloadListPage from '@/pages/user/LibraryDownloadList.vue';
import LibraryDownloadRegisterPage from '@/pages/user/LibraryDownloadRegister.vue';
import LibraryDownloadEditPage from '@/pages/user/LibraryDownloadEdit.vue';
// import LibraryDownloadProductManagePage from '@/pages/user/LibraryDownloadProductManage.vue';
// import LibraryDownloadHomeManagePage from '@/pages/user/LibraryDownloadHomeManagePage.vue';

/**
 * 관리자 화면
 */
import AdminVideoPage from '~/pages/admin/AdminVideo.vue';
import AdminDocumentPage from '~/pages/admin/AdminDocument.vue';
import AdminDownloadPage from '~/pages/admin/AdminDownload.vue';

/**
 * 프로젝트 메인, 마이페이지, 로그인
 */
import ProjectMainPage from '~/pages/user/Main.vue';
import LoginPage from '~/pages/user/Login.vue';
import UserInfoPage from '~/pages/user/UserInfo.vue';

/**
 * 에러 페이지
 */
import NotFoundPage from '~/pages/Error/NotFound.vue';

import { state as CommonState } from '@/store/modules/common';
import { state as UserState } from '@/store/modules/user';
import ForumProduct from '~/pages/user/ForumProduct.vue';

Vue.use(Router);

/**
 * [ 레이아웃 관련 규칙 ]
 * 1. useLeftMenu 와 lnbType 은 쌍으로 존재해야한다.
 * 2. lnbType: Viewer, Editing, Default
 * 2. pageType: Dev, Library, Forum
 * TODO 개발자 문서 쪽 트리 컴포넌트 사용 (LNB_EDITING 추가)
 * TODO LNB_DEFAULT 공통 컴포넌트 분리 (일단은 LNB_DEV, LNB_LIB, LNB_FORUM 로 진행)
 */

// 페이지(banner) 타입
const PAGE_DEV = 'Dev';
const PAGE_LIB = 'Library';
const PAGE_FORUM = 'Forum';

// lnb 타입
const LNB_VIEWER = 'Viewer';
const LNB_EDITING = 'Editing';
// const LNB_DEFAULT = 'Default';

// lnb 타입 추가
const LNB_DEV = 'Dev';
const LNB_LIB = 'Library';
const LNB_FORUM = 'Forum';

const authRoute = [
  {
    path: '/',
    component: ProjectMainPage,
  },
  {
    path: '/login',
    component: LoginPage,
  },
  {
    path: '/myinfo',
    component: UserInfoPage,
    meta: {
      auth: true,
    },
  },
];

const docsRoute = [
  {
    // 제품 리스트 페이지
    path: '/docs',
    component: ProductListPage,
    meta: {
      pageType: PAGE_DEV,
    },
  },
  {
    // 제품 등록 페이지
    path: '/docs/register',
    meta: {
      pageType: PAGE_DEV,
      lnbType: LNB_DEV,
    },
    component: ProductRegisterPage,
  },
  {
    // 개발자 문서 > 문서관리 > 작업 브랜치 관리
    path: '/docs/manage/:productId/branch',
    name: 'branchManagement',
    meta: {
      useLeftMenu: true,
      pageType: PAGE_DEV,
      lnbType: LNB_DEV,
    },
    component: ProductBranchManagePage,
  },
  {
    // 개발자 문서 > 문서관리 > 버전 관리
    path: '/docs/manage/:projectId/version',
    meta: {
      useLeftMenu: true,
      pageType: PAGE_DEV,
      lnbType: LNB_DEV,
    },
    component: ProductVerManagePage,
  },
  {
    // 개발자 문서 > 문서관리 > 공지 사항 관리
    path: '/docs/manage/:projectId/notice',
    meta: {
      useLeftMenu: true,
      pageType: PAGE_DEV,
      lnbType: LNB_DEV,
    },
    component: ProductNoticeManagePage,
  },
  {
    // 개발자 문서 > 제품관리
    path: '/docs/manage/product',
    meta: {
      useLeftMenu: true,
      pageType: PAGE_DEV,
      lnbType: LNB_DEV,
    },
    component: ProductManagePage,
  },
  {
    // 제품 상세 페이지 (진입시 문서 뷰 페이지로 변경) (doc)
    path: '/docs/:productId',
    name: 'detail',
    meta: {
      pageType: PAGE_DEV,
      lnbType: LNB_VIEWER,
    },
    // component: ProductDetailPage,
    component: ProductDocViewPage,
    props: { newsletterPopup: false },
  },
  {
    // 제품 문서 뷰 - 작성 중 브랜치 (초기화면) (doc)
    path: '/docs/:productId/branch/:branchName',
    name: 'branchDocViewInit',
    meta: {
      useLeftMenu: true,
      pageType: PAGE_DEV,
      lnbType: LNB_VIEWER,
    },
    component: ProductDocViewPage,
  },
  {
    // 제품 문서 뷰 - 작성 중 브랜치 (doc)
    path: '/docs/:productId/branch/:branchName/:pageType/:pageId',
    name: 'branchDocView',
    meta: {
      useLeftMenu: true,
      pageType: PAGE_DEV,
      lnbType: LNB_VIEWER,
    },
    component: ProductDocViewPage,
  },
  {
    // 제품 문서 뷰 - 버전
    path: '/docs/:productId/version/:versionName/:pageType/:pageId',
    name: 'versionDocView',
    meta: {
      useLeftMenu: true,
      pageType: PAGE_DEV,
      lnbType: LNB_DEV,
    },
    component: ProductDocViewPage,
  },
  {
    // 제품 문서 뷰 페이지 (doc)
    path: '/docs/:productId/:pageType/:pageId',
    name: 'docView',
    meta: {
      useLeftMenu: true,
      pageType: PAGE_DEV,
      lnbType: LNB_VIEWER,
    },
    component: ProductDocViewPage,
  },
  {
    // 제품 문서 뷰 편집 페이지
    path: '/docs/:projectId/branch/:branchName/:pageType/:pageId',
    component: ProductEditPage,
  },
  {
    // 제품 문서 뷰 페이지
    path: '/docs/:projectId/:pageType/:pageId',
    component: ProductDocViewPage,
  },
];

const forumRoute = [
  {
    // 질문답변 > 홈
    path: '/qna',
    name: 'Forum',
    meta: {
      pageType: PAGE_FORUM,
    },
    component: ForumHomePage,
  },
  {
    // 질문답변 > 제품 별 질문 / 답변 > 전체
    path: '/qna/all',
    meta: {
      useLeftMenu: true,
      pageType: PAGE_FORUM,
      lnbType: LNB_FORUM,
    },
    component: ForumAllPage,
  },
  {
    // 질문답변 > 질문 작성
    path: '/qna/register',
    meta: {
      useLeftMenu: true,
      pageType: PAGE_FORUM,
      lnbType: LNB_FORUM,
    },
    component: ForumRegisterPage,
  },
  {
    // 질문답변 > 내 질문 / 답변
    path: '/qna/my',
    meta: {
      useLeftMenu: true,
      pageType: PAGE_FORUM,
      lnbType: LNB_FORUM,
    },
    component: ForumMyPage,
  },
  {
    // 질문답변 > 제품관리
    path: '/qna/manage',
    meta: {
      useLeftMenu: true,
      pageType: PAGE_FORUM,
      lnbType: LNB_FORUM,
    },
    component: ForumManagePage,
  },
  {
    // 질문답변 > 제품 별 질문 / 답변
    path: '/qna/:productName',
    meta: {
      useLeftMenu: true,
      pageType: PAGE_FORUM,
      lnbType: LNB_FORUM,
    },
    component: ForumProductPage,
  },
  {
    // 질문답변 > 질문 보기
    path: '/qna/:productName/:postId',
    meta: {
      useLeftMenu: true,
      pageType: PAGE_FORUM,
      lnbType: LNB_FORUM,
    },
    component: ForumProductDetailPage,
  },

  // {
  //   // 질문답변 > 통합검색 페이지
  //   path: '/qna/search',
  //   component: ForumSearchPage,
  // },
  // {
  //   // 질문답변 > 내 게시물 리스트 페이지 (질문답변 메인)
  //   path: '/qna/:categoryName',
  //   name: 'ForumList',
  //   component: ForumListPage,
  // },
  // {
  //   // 질문답변 > 게시물 상세 페이지
  //   path: '/qna/:projectId/:rowId',
  //   component: ForumDetailPage,
  // },
];

const libraryRoute = [
  {
    // 자료실 홈 페이지
    path: '/library',
    name: 'library',
    meta: {
      pageType: PAGE_LIB,
    },
    component: LibraryHomePage,
    // newsletterPopup: false,
  },
  /*******************************************
   자료실 > 문서
   *******************************************/
  {
    // 자료실 > 문서 > 제품 관리 페이지
    path: '/doc/manage/product',
    meta: {
      useLeftMenu: true,
      pageType: PAGE_LIB,
      lnbType: LNB_LIB,
    },
    component: LibraryDocProductManagePage,
  },
  {
    // 자료실 > 문서 > 리스트 페이지
    path: '/doc/list/:productName',
    name: 'docList',
    meta: {
      useLeftMenu: true,
      pageType: PAGE_LIB,
      lnbType: LNB_LIB,
    },
    component: LibraryDocListPage,
  },
  {
    // 자료실 문서 등록 페이지
    path: '/doc/register/:productName',
    name: 'docRegister',
    meta: {
      useLeftMenu: true,
      pageType: PAGE_LIB,
      lnbType: LNB_LIB,
    },
    component: LibraryDocRegisterPage,
  },
  {
    // 자료실 > 문서 > 수정 페이지
    path: '/doc/edit/:productName/:docName',
    name: 'docEdit',
    meta: {
      useLeftMenu: true,
      pageType: PAGE_LIB,
      lnbType: LNB_LIB,
    },
    component: LibraryDocEditPage,
  },
  {
    // 자료실 > 문서 > 상세 페이지
    path: '/doc/:productName/:docName',
    name: 'docDetail',
    meta: {
      useLeftMenu: true,
      pageType: PAGE_LIB,
      lnbType: LNB_LIB,
    },
    component: LibraryDocDetailPage,
    props: true,
  },
  /*******************************************
   자료실 > 동영상
   *******************************************/
  {
    // 자료실 > 동영상 > 리스트 페이지
    path: '/video/list/:productName/:productCode',
    name: 'videoList',
    meta: {
      useLeftMenu: true,
      pageType: PAGE_LIB,
      lnbType: LNB_LIB,
    },
    component: LibraryVideoListPage,
  },
  {
    // 자료실 > 동영상 > 단독 등록 페이지
    path: '/video/register/:productName/:productCode',
    name: 'registerVideo',
    meta: {
      useLeftMenu: true,
      pageType: PAGE_LIB,
      lnbType: LNB_LIB,
    },
    component: LibraryVideoRegisterPage,
  },
  {
    // 자료실 > 동영상 > 시리즈 등록 페이지
    path: '/video/register/series/:productName/:productCode',
    name: 'registerVideoSeries',
    meta: {
      useLeftMenu: true,
      pageType: PAGE_LIB,
      lnbType: LNB_LIB,
    },
    component: LibraryVideoSeriesRegisterPage,
  },
  {
    // 자료실 > 동영상 > 수정 페이지
    path: '/video/edit/:_id',
    name: 'videoEdit',
    meta: {
      useLeftMenu: true,
      pageType: PAGE_LIB,
      lnbType: LNB_LIB,
    },
    component: LibraryVideoEditPage,
  },
  {
    // 자료실 > 동영상 > 제품 관리 페이지
    path: '/video/manage/product',
    meta: {
      useLeftMenu: true,
      pageType: PAGE_LIB,
      lnbType: LNB_LIB,
    },
    component: LibraryVideoProductManagePage,
  },
  {
    // 자료실 > 동영상 > 홈화면 관리 페이지
    path: '/video/manage/home',
    meta: {
      useLeftMenu: true,
      pageType: PAGE_LIB,
      lnbType: LNB_LIB,
    },
    component: LibraryVideoHomeManagePage,
  },
  {
    // 자료실 > 동영상 > 상세 페이지
    path: '/video/:productName/:productCode/:_id',
    name: 'videoDetail',
    meta: {
      useLeftMenu: true,
      pageType: PAGE_LIB,
      lnbType: LNB_LIB,
    },
    component: LibraryVideoDetailPage,
    props: true,
    // newsletterPopup: false,
  },
  /*******************************************
   자료실 > 다운로드
   *******************************************/
  {
    // 다운로드 > 리스트 / 상세
    path: '/download/list/:productName',
    meta: {
      useLeftMenu: true,
      pageType: PAGE_LIB,
    },
    component: LibraryDownloadListPage,
  },
  {
    // 다운로드 > 등록
    path: '/download/register/:productName',
    name: 'downloadRegister',
    meta: {
      useLeftMenu: true,
      pageType: PAGE_LIB,
      lnbType: LNB_LIB,
    },
    component: LibraryDownloadRegisterPage,
  },
  {
    // 다운로드 > 수정
    path: '/download/edit/:productName/:docName',
    name: 'downloadEdit',
    meta: {
      useLeftMenu: true,
      pageType: PAGE_LIB,
      lnbType: LNB_LIB,
    },
    component: LibraryDownloadEditPage,
  },
  // {
  //   // 다운로드 > 제품 관리
  //   path: '/download/manage/product',
  //   meta: {
  //     useLeftMenu: true,
  //     pageType: PAGE_LIB,
  //     lnbType: LNB_LIB,
  //   },
  //   component: LibraryDownloadProductManagePage,
  // },
  // {
  //   // 다운로드 > 홈화면 관리 페이지
  //   path: '/download/manage/home',
  //   meta: {
  //     useLeftMenu: true,
  //     pageType: PAGE_LIB,
  //     lnbType: LNB_LIB,
  //   },
  //   component: LibraryDownloadHomeManagePage,
  // },
];

const adminRoute = [
  {
    // 관리자 동양상 페이지
    path: '/admin/video',
    component: AdminVideoPage,
  },
  {
    // 관리자 문서 페이지
    path: '/admin/document',
    component: AdminDocumentPage,
  },
  {
    // 관리자 다운로드 페이지
    path: '/admin/download',
    component: AdminDownloadPage,
  },
];

const testRoute = [
  // {
  //   path: '/',
  //   component: Index,
  // },
  {
    name: 'storage',
    path: '/storage',
    component: Storage,
  },
  {
    name: 'error',
    path: '*',
    component: NotFoundPage,
  },
];

const router = new Router({
  mode: 'history',
  // base: 'DBS',
  routes: [
    ...authRoute,
    ...docsRoute,
    ...forumRoute,
    ...libraryRoute,
    ...adminRoute,
    ...testRoute,
  ],
});

// router.beforeEach((to, from, next) => {
//   console.log('[beforeEach UserState]', UserState().user);
//
//   if (CommonState().authPages.includes(to.path)) {
//     if (!UserState().user.authority) {
//       next('/');
//       return;
//     }
//   }
//   next();
// });

export function createRouter() {
  return router;
}

/**
 * vue-router
 * 1. path, query 매칭
 * 2. name, params 매칭
 */

// const apiRootPath = 'http://localhost:3000/api';
// Vue.prototype.$apiRootPath = apiRootPath;
// Vue.prototype.$axios = axios;
// axios.defaults.baseURL = apiRootPath;
