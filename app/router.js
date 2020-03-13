import Vue from 'vue';
import Router from 'vue-router';
import axios from 'axios';
import { store as $store } from '@/store';
import DialogPage from '@/pages/user/Dialog.vue';

/********************************************************
 import 개발자 문서 페이지
 ********************************************************/
import ProductListPage from '@/pages/user/ProductList.vue';
import ProductDetailPage from '@/pages/user/ProductDetail.vue';
import ProductDocViewPage from '@/pages/user/ProductDocView.vue';
import ProductEditPage from '@/pages/user/ProductEdit.vue';

import ProductManagePage from '@/pages/admin/ProductManage.vue';
import ProductBranchManagePage from '@/pages/admin/ProductBranchManage.vue';
import ProductVerManagePage from '@/pages/admin/ProductVerManage.vue';
import ProductNoticeManagePage from '@/pages/admin/ProductNoticeManage.vue';
import ProductSearchPage from '@/pages/user/ProductSearch.vue';

import ProductBranchChangeHistoryPage from '@/pages/admin/ProductBranchChangeHistory';
import ProductBranchComparePage from '@/pages/admin/ProductBranchCompare';

/********************************************************
 import 질문 답변 페이지
 ********************************************************/
import ForumRegisterEditPage from '@/pages/user/ForumRegisterEdit.vue';
import ForumHomePage from '@/pages/user/ForumHome.vue';
import ForumListPage from '@/pages/user/ForumList.vue';
import ForumProductDetailPage from '@/pages/user/ForumProductDetail.vue';
import ForumMyPage from '@/pages/user/ForumMy.vue';
import ForumProductManagePage from '@/pages/admin/ForumProductManage.vue';
import ForumSearchPage from '@/pages/user/ForumSearch.vue';

/********************************************************
 import 자료실 페이지 
 ********************************************************/
import LibraryHomePage from '@/pages/user/LibraryHome.vue';
import LibrarySearchPage from '@/pages/user/LibrarySearch.vue';

// 자료실 > 동영상 페이지
import LibraryVideoListPage from '@/pages/user/LibraryVideoList.vue';
import LibraryVideoDetailPage from '@/pages/user/LibraryVideoDetail.vue';
import LibraryVideoRegisterEditPage from '@/pages/user/LibraryVideoRegisterEdit.vue';
import LibraryVideoProductManagePage from '@/pages/admin/LibraryVideoProductManage.vue';
import LibraryVideoHomeManagePage from '@/pages/admin/LibraryVideoHomeManage.vue';

// 지료실 > 문서 페이지
import LibraryDocListPage from '@/pages/user/LibraryDocList.vue';
import LibraryDocDetailPage from '@/pages/user/LibraryDocDetail.vue';

import LibraryDocRegisterEditPage from '@/pages/user/LibraryDocRegisterEdit.vue';
import LibraryDocProductManagePage from '@/pages/admin/LibraryDocProductManage.vue';
import LibraryDocHomeManagePage from '@/pages/admin/LibraryDocHomeManage.vue';

// 자료실 > 다운로드 페이지
import LibraryDownloadListPage from '@/pages/user/LibraryDownloadList.vue';
import LibraryDownloadRegisterEditPage from '@/pages/user/LibraryDownloadRegisterEdit.vue';
import LibraryDownloadProductManagePage from '@/pages/admin/LibraryDownloadProductManage.vue';
import LibraryDownloadHomeManagePage from '@/pages/admin/LibraryDownloadHomeManage.vue';

/********************************************************
 import 프로젝트 메인, 마이페이지, 로그인
 ********************************************************/
import ProjectMainPage from '~/pages/user/Main.vue';
import LoginPage from '~/pages/user/Login.vue';
import MyInfoPage from '~/pages/user/MyInfo.vue';

/********************************************************
 import 공통 페이지
 ********************************************************/
import NotFoundPage from '@/pages/Error/NotFound.vue';
import BrowserNoticePage from '@/pages/user/BrowserNotice.vue';
import ClausePage from '@/pages/user/Clause.vue';

Vue.use(Router);
/********************************************************
 Axios Request Interceptors
 ********************************************************/

// const instance = axios.create({
//   baseURL: process.env.BASE_URL,
//   timeout: 10000,
//   params: {}, // do not remove this, its added to add params later in the config
// });
//
// console.log('instance :: ', instance);
//
// this.$axios.interceptors.request.use(
//   (config) => {
//     config.headers.Authorization = 'asdasd';
//     alert('test');
//     console.log(`request ${config}`);
//     // Do something before request is sent
//     return config;
//   },
//   function(error) {
//     // Do something with request error
//     return Promise.reject(error);
//   }
// );

/********************************************************
 Axios Response Interceptors
 : 에러 코드에 대한 처리
 ********************************************************/
// axios.interceptors.response.use(
//   (response) => {
//     console.log(`response ${response}`);
//     return response;
//   },
//   function(error) {
//     console.log('interceptors error :: ', error);
//     // Do something with response error
//     if (error.response.status === 401) {
//       // console.log('unauthorized, logging out ...');
//       // auth.logout();
//       // router.replace('/auth/login');
//     }
//     return Promise.reject(error.response);
//   }
// );

// Add a response interceptor
// axios.interceptors.response.use(
//   (response) => {
//     // console.log(response.data)
//     // Do something with response data
//
//     const token = sessionStorage.getItem('KEY');
//     console.log('token', token);
//
//     return response;
//   },
//   function(error) {
//     // Do something with response error
//     // error status가 있는것은 code로 처리하고 view에서 생성한 에러 따로 처리하는부분은 !e.response 일때
//     switch (error.response.status) {
//       case 401:
//         $store.dispatch('common/alert', {
//           type: 'error',
//           isShow: true,
//           msg: `인증 오류입니다(${error.response.status}:${error.message})`,
//         });
//         break;
//
//       case 500:
//         $store.dispatch('common/alert', {
//           type: 'error',
//           isShow: true,
//           msg: `서버에러 입니다(${error.response.status}:${error.message}) 관리자에게 문의해주세요.`,
//         });
//
//         break;
//       default:
//         $store.dispatch('common/alert', {
//           type: 'error',
//           isShow: true,
//           msg: `인증 오류입니다(${error.response.status}:${error.message})`,
//         });
//
//         break;
//     }
//
//     return Promise.reject(error);
//   }
// );

// const instance = axios.create({
//   baseURL: process.env.BASE_URL,
//   timeout: 10000,
//   params: {}, // do not remove this, its added to add params later in the config
// });
//
// Vue.prototype.$axios = axios;
//
// // Add a request interceptor
// const DEBUG = process.env.NODE_ENV === 'development';
//
// axios.interceptors.request.use(
//   (config) => {
//     /** In dev, intercepts request and logs it into console for dev */
//     if (DEBUG) {
//       console.info('✉️ ', config);
//     }
//     return config;
//   },
//   (error) => {
//     if (DEBUG) {
//       console.error('✉️ ', error);
//     }
//     return Promise.reject(error);
//   }
// );
//
// axios.interceptors.request.use(
//   (config) => {
//     config.headers.genericKey = 'someGenericValue';
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

// const instance = axios.create();
// instance.interceptors.response.use(
//   (response) => {
//     console.log(`response ${response}`);
//     return response;
//   },
//   (error) => {
//     console.log(`error ${error}`);
//     return Promise.reject(error);
//   }
// );

/********************************************************
 Layout 관련 정의
 1. useLeftMenu 와 lnbType 은 쌍으로 존재해야한다.
 2. lnbType: Viewer, Editing, Default
 3. pageType: Dev, Library, Forum
 ********************************************************/

// 페이지(banner) 타입
const PAGE_DEV = 'Dev';
const PAGE_LIB = 'Library';
const PAGE_FORUM = 'Forum';

// lnb 타입
const LNB_VIEWER = 'Viewer';
const LNB_EDITING = 'Editing';

// lnb 타입 추가
const LNB_DEV = 'Dev';
const LNB_LIB = 'Library';
const LNB_FORUM = 'Forum';

/********************************************************
 공통화면 관련 라우터 정의
 ********************************************************/
const commonRoute = [
  {
    path: '/',
    component: ProjectMainPage,
  },
  {
    path: '/browser',
    name: 'browserNotice',
    component: BrowserNoticePage,
  },
  // {
  //   // 공통_메세지박스  페이지
  //   path: '/common/dialog',
  //   component: DialogPage,
  // },
  {
    // 정책 및 약관
    path: '/clause',
    name: 'clause',
    component: ClausePage,
  },
  {
    // 개인정보처리방침
    path: '/policy',
    name: 'policy',
    component: ClausePage,
  },
];
/********************************************************
                  인증관련 라우터 정의
 ********************************************************/
const authRoute = [
  {
    path: '/login',
    name: 'login',
    component: LoginPage,
  },
  {
    path: '/myInfo',
    component: MyInfoPage,
    meta: {
      authRequired: true,
    },
  },
];
/********************************************************
                개발자 문서 관련 라우터 정의
 ********************************************************/
const docsRoute = [
  {
    // 제품 리스트 페이지
    path: '/docs',
    name: 'list',
    meta: {
      pageType: PAGE_DEV,
    },
    component: ProductListPage,
  },
  {
    // 개발자 문서 통합검색 페이지
    path: '/docs/search/:searchWord',
    name: 'devDocSearch',
    meta: {
      pageType: PAGE_DEV,
    },
    component: ProductSearchPage,
  },
  // {
  //   // 다이얼로그 페이지
  //   path: '/docs/dialog',
  //   component: ProductDetailPage,
  // },
  {
    // 개발자 문서 > 제품관리
    path: '/docs/manage/product',
    name: 'productManagement',
    meta: {
      useLeftMenu: true,
      pageType: PAGE_DEV,
      lnbType: LNB_DEV,
      authRequired: true,
      gitlabTokenRequired: true,
    },
    component: ProductManagePage,
  },
  {
    // 제품 상세 페이지 (진입시 문서 뷰 페이지로 변경) (doc)
    path: '/docs/:productCode/:pageType',
    name: 'detail',
    meta: {
      useLeftMenu: true,
      pageType: PAGE_DEV,
      lnbType: LNB_VIEWER,
    },
    // component: ProductDetailPage,
    component: ProductDocViewPage,
    props: { newsletterPopup: false },
  },
  {
    // 개발자 문서 > 문서관리 > 작업 브랜치 관리
    path: '/docs/manage/:productCode/branch',
    name: 'branchManagement',
    meta: {
      useLeftMenu: true,
      pageType: PAGE_DEV,
      lnbType: LNB_DEV,
      authRequired: true,
      gitlabTokenRequired: true,
    },
    component: ProductBranchManagePage,
  },
  {
    // 개발자 문서 > 문서관리 > 버전 관리
    path: '/docs/manage/:productCode/version',
    name: 'versionManagement',
    meta: {
      useLeftMenu: true,
      pageType: PAGE_DEV,
      lnbType: LNB_DEV,
      authRequired: true,
      gitlabTokenRequired: true,
    },
    component: ProductVerManagePage,
  },
  {
    // 개발자 문서 > 문서관리 > 공지 사항 관리
    path: '/docs/manage/:productCode/notice',
    name: 'noticeManagement',
    meta: {
      useLeftMenu: true,
      pageType: PAGE_DEV,
      lnbType: LNB_DEV,
      authRequired: true,
      gitlabTokenRequired: true,
    },
    component: ProductNoticeManagePage,
  },
  {
    // 개발자 문서 > 문서관리 > 작업 브랜치 관리 > 브랜치비교
    path: '/docs/manage/:productCode/branch/:branchName/compare',
    name: 'branchCompare',
    meta: {
      useLeftMenu: true,
      pageType: PAGE_DEV,
      lnbType: LNB_DEV,
      authRequired: true,
      gitlabTokenRequired: true,
    },
    component: ProductBranchComparePage,
  },
  {
    // 개발자 문서 > 문서관리 > 작업 브랜치 관리 > 브랜치비교
    path:
      '/docs/manage/:productCode/branch/:branchName/:mergeRequestIId/compare',
    name: 'mergeRequestCompare',
    meta: {
      useLeftMenu: true,
      pageType: PAGE_DEV,
      lnbType: LNB_DEV,
      authRequired: true,
      gitlabTokenRequired: true,
    },
    component: ProductBranchComparePage,
  },
  {
    // 개발자 문서 > 문서관리 > 작업 브랜치 관리 > 변경 내역
    path: '/docs/manage/:productCode/branch/:branchName/changeHistory',
    name: 'branchChangeHistory',
    meta: {
      useLeftMenu: true,
      pageType: PAGE_DEV,
      lnbType: LNB_DEV,
      authRequired: true,
      gitlabTokenRequired: true,
    },
    component: ProductBranchChangeHistoryPage,
  },
  {
    // 제품 문서 뷰 - 작성 중 브랜치 (초기화면) (doc)
    path: '/docs/:productCode/:pageType/branch/:branchName',
    name: 'branchDocViewInit',
    meta: {
      useLeftMenu: true,
      pageType: PAGE_DEV,
      lnbType: LNB_VIEWER,
      authRequired: true,
      gitlabTokenRequired: true,
    },
    component: ProductDocViewPage,
  },
  {
    // 제품 문서 뷰 - 작성 중 브랜치 (doc)
    path: '/docs/:productCode/:pageType/branch/:branchName/:pageTitle/:pageId*',
    name: 'branchDocView',
    meta: {
      useLeftMenu: true,
      pageType: PAGE_DEV,
      lnbType: LNB_VIEWER,
      authRequired: true,
      gitlabTokenRequired: true,
    },
    component: ProductDocViewPage,
  },
  {
    // 제품 문서 뷰 - 버전 (초기화면)
    path: '/docs/:productCode/:pageType/version/:versionName',
    name: 'versionDocViewInit',
    meta: {
      useLeftMenu: true,
      pageType: PAGE_DEV,
      lnbType: LNB_VIEWER,
    },
    component: ProductDocViewPage,
  },
  {
    // 제품 문서 뷰 - 버전
    path:
      '/docs/:productCode/:pageType/version/:versionName/:pageTitle/:pageId*',
    name: 'versionDocView',
    meta: {
      useLeftMenu: true,
      pageType: PAGE_DEV,
      lnbType: LNB_VIEWER,
    },
    component: ProductDocViewPage,
  },
  {
    // 제품 문서 뷰 편집 페이지
    path: '/docs/:productCode/:pageType/edit/:branchName',
    name: 'editDocInit',
    meta: {
      useLeftMenu: true,
      pageType: PAGE_DEV,
      lnbType: LNB_EDITING,
      authRequired: true,
      gitlabTokenRequired: true,
    },
    component: ProductEditPage,
  },
  {
    // 제품 문서 뷰 편집 페이지
    path: '/docs/:productCode/:pageType/edit/:branchName/:pageTitle/:pageId*',
    name: 'editDoc',
    meta: {
      useLeftMenu: true,
      pageType: PAGE_DEV,
      lnbType: LNB_EDITING,
      authRequired: true,
      gitlabTokenRequired: true,
    },
    component: ProductEditPage,
  },
  {
    // 제품 문서 뷰 편집 페이지
    path:
      '/docs/:productCode/:pageType/editSample/:branchName/:pageTitle/:pageId*',
    name: 'editSampleDoc',
    meta: {
      useLeftMenu: true,
      pageType: PAGE_DEV,
      lnbType: LNB_EDITING,
      authRequired: true,
      gitlabTokenRequired: true,
    },
    component: ProductEditPage,
  },
  {
    // 제품 문서 뷰 페이지 (doc)
    path: '/docs/:productCode/:pageType/:pageTitle/:pageId*',
    name: 'docView',
    meta: {
      useLeftMenu: true,
      pageType: PAGE_DEV,
      lnbType: LNB_VIEWER,
    },
    component: ProductDocViewPage,
  },
];

/********************************************************
                  질문답변 관련 라우터 정의
 ********************************************************/
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
    // 질문답변 > 제품 관리
    path: '/qna/manage/product',
    name: 'forumProductManage',
    meta: {
      useLeftMenu: true,
      pageType: PAGE_FORUM,
      lnbType: LNB_FORUM,
      authRequired: true,
    },
    component: ForumProductManagePage,
  },
  {
    // 질문답변 > 내 질문 / 답변
    path: '/qna/my',
    name: 'forumMy',
    meta: {
      useLeftMenu: true,
      pageType: PAGE_FORUM,
      lnbType: LNB_FORUM,
      authRequired: true,
    },
    component: ForumMyPage,
  },
  {
    // 질문답변 > 통합검색 페이지 ( 제플린: 자료실_02통합검색_질문답변 )
    path: '/qna/search/:searchWord',
    name: 'qnaSearch',
    meta: {
      pageType: PAGE_FORUM,
    },
    component: ForumSearchPage,
  },
  {
    // 질문답변 > 제품 별 질문 리스트
    path: '/qna/:productCode',
    name: 'forumList',
    meta: {
      useLeftMenu: true,
      pageType: PAGE_FORUM,
      lnbType: LNB_FORUM,
    },
    component: ForumListPage,
  },
  {
    // 질문답변 > 질문 보기
    path: '/qna/:productCode/post/:_id',
    name: 'postDetail',
    meta: {
      useLeftMenu: true,
      pageType: PAGE_FORUM,
      lnbType: LNB_FORUM,
    },
    component: ForumProductDetailPage,
  },
  {
    // 질문답변 > 질문등록
    path: '/qna/:editType/:productCode',
    name: 'forumRegister',
    meta: {
      useLeftMenu: true,
      pageType: PAGE_FORUM,
      lnbType: LNB_FORUM,
      authRequired: true,
    },
    component: ForumRegisterEditPage,
    // beforeEnter: pageCheck,
  },
  {
    // 질문답변 > 질문수정
    path: '/qna/:editType/:productCode/:_id',
    name: 'forumEdit',
    meta: {
      useLeftMenu: true,
      pageType: PAGE_FORUM,
      lnbType: LNB_FORUM,
      authRequired: true,
    },
    component: ForumRegisterEditPage,
  },
];

/********************************************************
 자료실 관련 라우터 정의
 ********************************************************/
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
  {
    // 자료실 > 통합검색 페이지 ( 제플린: 자료_03통합검색_자료실 )
    path: '/library/search/:searchWord',
    name: 'librarySearch',
    meta: {
      pageType: PAGE_LIB,
    },
    component: LibrarySearchPage,
  },
  /********************************************************
   (1) 자료실 > 동영상
   ********************************************************/
  {
    // 자료실 > 동영상 > 제품 관리 페이지
    path: '/video/manage/product',
    name: 'videoProductManage',
    meta: {
      useLeftMenu: true,
      pageType: PAGE_LIB,
      lnbType: LNB_LIB,
      authRequired: true,
    },
    component: LibraryVideoProductManagePage,
  },
  {
    // 자료실 > 동영상 > 홈화면 관리 페이지
    path: '/video/manage/home',
    name: 'videoHomeManage',
    meta: {
      useLeftMenu: true,
      pageType: PAGE_LIB,
      lnbType: LNB_LIB,
      authRequired: true,
    },
    component: LibraryVideoHomeManagePage,
  },
  {
    // 자료실 > 동영상 > 리스트 페이지
    path: '/video/:productCode',
    name: 'videoList',
    meta: {
      useLeftMenu: true,
      pageType: PAGE_LIB,
      lnbType: LNB_LIB,
    },
    component: LibraryVideoListPage,
  },
  {
    // 자료실 > 동영상 > 등록 페이지
    path: '/video/:editType/:type/:productCode',
    name: 'videoRegister',
    meta: {
      useLeftMenu: true,
      pageType: PAGE_LIB,
      lnbType: LNB_LIB,
      authRequired: true,
    },
    component: LibraryVideoRegisterEditPage,
  },
  {
    // 자료실 > 동영상 > 수정 페이지
    path: '/video/:editType/:type/:productCode/:_id',
    name: 'videoEdit',
    meta: {
      useLeftMenu: true,
      pageType: PAGE_LIB,
      lnbType: LNB_LIB,
      authRequired: true,
    },
    component: LibraryVideoRegisterEditPage,
  },

  {
    // 자료실 > 동영상 > 상세 페이지
    path: '/video/:productCode/:_id',
    name: 'videoDetail',
    meta: {
      useLeftMenu: true,
      pageType: PAGE_LIB,
      lnbType: LNB_LIB,
    },
    component: LibraryVideoDetailPage,
    // newsletterPopup: false,
  },
  /********************************************************
   (2) 자료실 > 문서
   ********************************************************/
  {
    // 자료실 > 문서 > 제품 관리 ( 제플린: 자료실_05문서제품관리 )
    path: '/doc/manage/product',
    name: 'docProductManage',
    meta: {
      useLeftMenu: true,
      pageType: PAGE_LIB,
      lnbType: LNB_LIB,
      authRequired: true,
    },
    component: LibraryDocProductManagePage,
  },
  {
    // 자료실 > 문서 > 홈화면 관리 ( 제플린: 자료실_06문서홈화면관리 )
    path: '/doc/manage/home',
    name: 'docHomeManage',
    meta: {
      useLeftMenu: true,
      pageType: PAGE_LIB,
      lnbType: LNB_LIB,
      authRequired: true,
    },
    component: LibraryDocHomeManagePage,
  },
  {
    // 자료실 > 문서 > 리스트 페이지 ( 제플린: 자료실_01문서리스트 )
    path: '/doc/:productCode',
    name: 'docList',
    meta: {
      useLeftMenu: true,
      pageType: PAGE_LIB,
      lnbType: LNB_LIB,
    },
    component: LibraryDocListPage,
  },
  {
    // 자료실 > 문서 > 상세 페이지 ( 제플린: 자료실_02문서상세 )
    path: '/doc/detail/:productCode/:_id',
    name: 'docDetail',
    meta: {
      useLeftMenu: true,
      pageType: PAGE_LIB,
      lnbType: LNB_LIB,
    },
    component: LibraryDocDetailPage,
  },
  {
    // 자료실 > 문서 > 등록 페이지 ( 제플린: 자료실_03문서등록/수정 )
    path: '/doc/:editType/:productCode',
    name: 'docRegister',
    meta: {
      useLeftMenu: true,
      pageType: PAGE_LIB,
      lnbType: LNB_LIB,
      authRequired: true,
    },
    component: LibraryDocRegisterEditPage,
  },
  {
    // 자료실 > 문서 > 수정 페이지 ( 제플린: 자료실_03문서등록/수정 )
    path: '/doc/:editType/:productCode/:_id',
    name: 'docEdit',
    meta: {
      useLeftMenu: true,
      pageType: PAGE_LIB,
      lnbType: LNB_LIB,
      authRequired: true,
    },
    component: LibraryDocRegisterEditPage,
  },
  /********************************************************
   3. 자료실 > 다운로드
   ********************************************************/
  {
    // 다운로드 > 제품 관리 ( 제플린: 자료실_03다운로드제품관리 )
    path: '/download/manage/product',
    name: 'downloadProductManage',
    meta: {
      useLeftMenu: true,
      pageType: PAGE_LIB,
      lnbType: LNB_LIB,
      authRequired: true,
    },
    component: LibraryDownloadProductManagePage,
  },
  {
    // 다운로드 > 홈화면 관리 ( 제플린: 자료실_04다운로드홈화면관리)
    path: '/download/manage/home',
    name: 'downloadHomeManage',
    meta: {
      useLeftMenu: true,
      pageType: PAGE_LIB,
      lnbType: LNB_LIB,
      authRequired: true,
    },
    component: LibraryDownloadHomeManagePage,
  },
  {
    // 다운로드 > 리스트 / 상세 ( 제플린: 자료실_01다운로드리스트 )
    path: '/download/:productCode',
    name: 'downloadList',
    meta: {
      useLeftMenu: true,
      pageType: PAGE_LIB,
      lnbType: LNB_LIB,
    },
    component: LibraryDownloadListPage,
  },
  {
    // 다운로드 > 등록 ( 제플린: 자료실_02다운로드등록/수정 )
    path: '/download/:editType/:productCode',
    name: 'downloadRegister',
    meta: {
      useLeftMenu: true,
      pageType: PAGE_LIB,
      lnbType: LNB_LIB,
      authRequired: true,
    },
    component: LibraryDownloadRegisterEditPage,
  },
  {
    // 다운로드 > 수정 ( 제플린: 자료실_02다운로드등록/수정 )
    path: '/download/:editType/:productCode/:_id',
    name: 'downloadEdit',
    meta: {
      useLeftMenu: true,
      pageType: PAGE_LIB,
      lnbType: LNB_LIB,
      authRequired: true,
    },
    component: LibraryDownloadRegisterEditPage,
  },
];

/********************************************************
  라우터 관리 객체
 ********************************************************/
const router = new Router({
  mode: 'history',
  base: decodeURI('/'),
  routes: [
    ...commonRoute,
    ...authRoute,
    ...docsRoute,
    ...forumRoute,
    ...libraryRoute,
    {
      path: '*',
      name: 'error',
      component: NotFoundPage,
    },
  ],
  scrollBehavior(to, from, savedPosition) {
    return { x: 0, y: 0 };
  },
  // fallback: false,
});

/********************************************************
  인증관련 페이지 Navigation Guard [vue persist 사용]
 ********************************************************/
router.beforeEach(async (to, from, next) => {
  let userState = $store.state.user.user;
  const sessionToken = sessionStorage.getItem('KEY');
  console.log('sessionToken :: ', sessionToken);
  const sessionState = sessionStorage.getItem('vuex');
  console.log('sessionState :: ', sessionState);

  console.log(axios);

  if (sessionToken && !userState._id) {
    try {
      const { data } = await axios.post('api/auth/token', {
        token: sessionToken,
      });

      if (data.res) {
        next();
      }
      console.log('datadata :: ', data);

      $store.commit('user/SET_USER_INFO', data.data);
    } catch (e) {
      console.log('ff :: ', e);
    }
  }

  // sessionStates 존재하지만, store 에 유저정보가 없는 경우
  if (sessionState && !userState._id) {
    console.log('in :: ', JSON.parse(sessionStorage.getItem('vuex')).user.user);
    await $store.commit(
      'user/SET_USER_INFO',
      JSON.parse(sessionStorage.getItem('vuex')).user.user
    );

    userState = $store.state.user.user;
  }

  // 인증 요구되는 페이지이지만 사용자 토큰이 존재하지 않는 경우
  if (!sessionToken && to.meta.authRequired) {
    $store
      .dispatch('common/alert', {
        type: 'warning',
        isShow: true,
        msg: '로그인이 필요한 페이지입니다.',
      })
      .then((result) => {
        if (result.ok) {
          // DBS 고객 로그인 화면으로 이동
          location.href = '/html/Login.html';
        } else {
          next({
            path: from.path,
          });
        }
      });
  }
  // 깃랩토큰이 필요한 페이지이지만 깃랩토큰이 존재하지 않는 경우
  else if (to.meta.gitlabTokenRequired && !userState.gitlabToken) {
    $store
      .dispatch('common/alert', {
        type: 'warning',
        isShow: true,
        msg: 'Gitlab Token 이 필요한 페이지입니다.',
      })
      .then((result) => {
        if (result.ok) {
          next({
            path: '/myInfo',
          });
        } else {
          next({
            path: from.path,
          });
        }
      });
  }

  let nextParams;
  if (to.fullPath.includes('%2F')) {
    nextParams = to.fullPath.replace('%2F', '/');
  }
  if (to.fullPath.includes('.md')) {
    nextParams = to.fullPath.replace('.md', '');
  }
  if (to.fullPath.includes('.html')) {
    nextParams = to.fullPath.replace('.html', '');
  }
  if (nextParams) {
    next(nextParams);
  }

  return next();
});

export function createRouter() {
  return router;
}

/********************************************************
 인증관련 페이지 Navigation Guard [기존 방식]
 ********************************************************/
// let isSSR = false; // ssr 일때 !sessionToken 에 대한 케이스 타지않기위한 flag
//
// router.beforeEach(async (to, from, next) => {
//   let user = $store.state.user;
//   const userToken = user.userToken; // store 에 저장된 token
//   let sessionToken = null; // sessionStorage 에 저장된 token
//   // console.log('userToken ', userToken);
//
//   if (process.client) {
//     console.info('CSR');
//     sessionToken = sessionStorage.getItem('KEY');
//     // console.log('sessionToken ', sessionToken);
//     if (sessionToken && !userToken) {
//       await $store.dispatch('user/encryptToken', sessionToken);
//       // console.log('stateToken ', $store.state.user.userToken);
//       user = $store.state.user;
//     }
//   }
//
//   if (process.server) {
//     isSSR = true;
//   }
//
//   // 인증 요구되는 페이지이지만 사용자 토큰이 존재하지 않는 경우
//   if (!isSSR && !sessionToken && to.meta.authRequired) {
//     $store
//       .dispatch('common/alert', {
//         type: 'warning',
//         isShow: true,
//         msg: '로그인이 필요한 페이지입니다.',
//       })
//       .then((result) => {
//         if (result.ok) {
//           // DBS 고객 로그인 화면으로 이동
//           location.href = '/html/Login.html';
//         } else {
//           next({
//             path: from.path,
//           });
//         }
//       });
//   }
//   // 깃랩토큰이 필요한 페이지이지만 깃랩토큰이 존재하지 않는 경우
//   else if (
//     !isSSR &&
//     to.meta.gitlabTokenRequired &&
//     (user.user.gitlabToken === '' || user.user.gitlabToken === undefined)
//   ) {
//     $store
//       .dispatch('common/alert', {
//         type: 'warning',
//         isShow: true,
//         msg: 'Gitlab Token 이 필요한 페이지입니다.',
//       })
//       .then((result) => {
//         if (result.ok) {
//           next({
//             path: '/myInfo',
//           });
//         } else {
//           next({
//             path: from.path,
//           });
//         }
//       });
//   }
//
//   let nextParams;
//   if (to.fullPath.includes('%2F')) {
//     nextParams = to.fullPath.replace('%2F', '/');
//   }
//   if (to.fullPath.includes('.md')) {
//     nextParams = to.fullPath.replace('.md', '');
//   }
//   if (to.fullPath.includes('.html')) {
//     nextParams = to.fullPath.replace('.html', '');
//   }
//   if (nextParams) {
//     next(nextParams);
//   } else {
//     next();
//   }
// });

/**
 * vue-router
 * 1. path, query 매칭
 * 2. name, params 매칭
 */

// const apiRootPath = 'http://localhost:3000/api';
// Vue.prototype.$apiRootPath = apiRootPath;
// Vue.prototype.$axios = axios;
// axios.defaults.baseURL = apiRootPath;
