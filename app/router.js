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
import LibraryHomePage from '@/pages/user/LibraryHome';

// 동영상
import LibraryVideoListPage from '~/pages/user/LibraryVideoList';
import LibraryVideoDetailPage from '~/pages/user/LibraryVideoDetail';
import LibraryVideoRegisterPage from '~/pages/user/LibraryVideoRegister';
import LibraryVideoEditPage from '~/pages/user/LibraryVideoEdit';
import LibraryVideoProductManagePage from '~/pages/admin/LibraryVideoProductManage';
import LibraryVideoHomeManagePage from '~/pages/admin/LibraryVideoHomeManage';

// 문서
import LibraryDocumentListPage from '@/pages/user/LibraryDocumentList.vue';
import LibraryDocumentAllPage from '~/pages/user/LibraryDocumentAll';
import LibraryDocumentDetailPage from '@/pages/user/LibraryDocumentDetail.vue';

// 다운로드
import LibraryDownloadListPage from '@/pages/user/LibraryDownloadList.vue';
import LibraryDownloadAllPage from '~/pages/user/LibraryDownloadAll';

/**
 * 관리자 화면
 */
import AdminVideoPage from '~/pages/admin/AdminVideo';
import AdminDocumentPage from '~/pages/admin/AdminDocument';
import AdminDownloadPage from '~/pages/admin/AdminDownload';

/**
 * 프로젝트 메인, 마이페이지, 로그인
 */
import ProjectMainPage from '~/pages/user/Main';
import LoginPage from '~/pages/user/Login';
import UserInfoPage from '~/pages/user/UserInfo';

/**
 * 에러 페이지
 */
import NotFoundPage from '~/pages/Error/NotFound';

import { state as CommonState } from '@/store/modules/common';
import { state as UserState } from '@/store/modules/user';
import ForumProduct from '~/pages/user/ForumProduct';

Vue.use(Router);

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
  },
  {
    // 제품 등록 페이지
    path: '/docs/register',
    component: ProductRegisterPage,
  },
  {
    // 제품 상세 페이지 (진입시 문서 뷰 페이지로 변경)
    path: '/docs/:productId',
    name: 'detail',
    component: ProductDetailPage,
    props: { newsletterPopup: false },
  },
  {
    // 제품 문서 뷰 페이지
    path: '/docs/:productId/:pageType/:pageId',
    component: ProductDocViewPage,
  },
  {
    // 제품 문서 뷰 편집 페이지
    path: '/docs/:productId/branch/:branchName/:pageType/:pageId',
    component: ProductEditPage,
  },
  /****************************************
   [제품 화면] 19.11.11
   기획 변경에 따른 라우터 추가
   ****************************************/
  {
    // 개발자 문서 > 제품관리
    path: '/docs/manage/product',
    component: ProductManagePage,
  },
  {
    // 개발자 문서 > 문서관리 > 작업 브랜치 관리
    path: '/docs/manage/:productId/branch',
    component: ProductBranchManagePage,
  },
  {
    // 개발자 문서 > 문서관리 > 버전 관리
    path: '/docs/manage/:productId/version',
    component: ProductVerManagePage,
  },
  {
    // 개발자 문서 > 문서관리 > 공지 사항 관리
    path: '/docs/manage/:productId/notice',
    component: ProductNoticeManagePage,
  },
];

const forumRoute = [
  {
    // 질문답변 내 게시물 리스트 페이지 (질문답변 메인)
    path: '/qna/:categoryName',
    name: 'ForumList',
    component: ForumListPage,
  },
  {
    // 질문답변 게시물 상세 페이지
    path: '/qna/:productId/:rowId',
    component: ForumDetailPage,
  },
  {
    // 질문답변 통합검색 페이지
    path: '/qna/search',
    component: ForumSearchPage,
  },
  {
    // 질문 등록 페이지
    path: '/qna/register',
    component: ForumRegisterPage,
  },
  /****************************************
   [질문 / 답변 화면] 19.11.11
   기획 변경에 따른 라우터 추가
   ****************************************/
  {
    // 질문답변 > 홈
    path: '/qna',
    name: 'Forum',
    component: ForumHomePage,
  },
  {
    // 질문답변 > 제품별 질문답변 > 전체
    path: '/qna/all',
    component: ForumAllPage,
  },
  {
    // 질문답변 > 제품별 질문답변
    path: '/qna/:productId',
    component: ForumProductPage,
  },
  {
    // 질문답변 > 제품별 질문답변 > 질문 보기
    path: '/qna/:productId/:rowId',
    component: ForumProductDetailPage,
  },
  {
    // 질문답변 > 내 질문답변
    path: '/qna/my',
    component: ForumMyPage,
  },
  {
    // 질문답변 > 제품관리
    path: '/qna/manage',
    component: ForumManagePage,
  },
];

const libraryRoute = [
  {
    // 자료실 문서 카테고리 메인 페이지
    path: '/library/doc',
    component: LibraryDocumentListPage,
  },
  {
    // 자료실 문서 전체목록 페이지
    path: '/library/doc/all',
    component: LibraryDocumentAllPage,
  },
  {
    // 자료실 문서 상세 페이지
    path: '/library/doc/:docId',
    component: LibraryDocumentDetailPage,
  },
  {
    // 자료실 다운로드 카테고리 메인 페이지
    path: '/library/download',
    component: LibraryDownloadListPage,
  },
  {
    // 자료실 다운로드 전체목록 페이지
    path: '/library/download/all',
    component: LibraryDownloadAllPage,
  },
  /****************************************
   [자료실 화면] 19.11.13
   기획 변경에 따른 라우터 추가
   ****************************************/
  {
    // 자료실 홈 페이지
    path: '/library',
    component: LibraryHomePage,
  },
  {
    // 자료실 > 동영상 > 리스트 페이지
    path: '/library/video/:productType',
    component: LibraryVideoListPage,
  },
  {
    // 자료실 > 동영상 > 등록 페이지
    path: '/library/video/register/:productType',
    component: LibraryVideoRegisterPage,
  },
  {
    // 자료실 > 동영상 > 상세 페이지
    path: '/library/video/:productType/:_id',
    component: LibraryVideoDetailPage,
  },
  {
    // 자료실 > 동영상 > 수정 페이지
    path: '/library/video/edit/:_id',
    component: LibraryVideoEditPage,
  },
  {
    // 자료실 동영상 제품 관리 페이지
    path: '/library/video/manage/product',
    component: LibraryVideoProductManagePage,
  },
  {
    // 자료실 동영상 홈화면 관리 페이지
    path: '/library/video/manage/home',
    component: LibraryVideoHomeManagePage,
  },
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

// const apiRootPath = 'http://localhost:3000/api';
// Vue.prototype.$apiRootPath = apiRootPath;
// Vue.prototype.$axios = axios;
// axios.defaults.baseURL = apiRootPath;
