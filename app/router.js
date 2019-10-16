import Vue from 'vue';
import Router from 'vue-router';

import Index from '@/pages/index.vue';
import Storage from '@/pages/Storage.vue';

import ProductListPage from '@/pages/user/ProductList.vue';
import ProductDetailPage from '@/pages/user/ProductDetail.vue';
import ProductDocViewPage from '@/pages/user/ProductDocView.vue';
import ProductEditPage from '@/pages/user/ProductEdit.vue';
import ProductRegisterPage from '@/pages/user/ProductRegister.vue';

import ForumRegisterPage from '@/pages/user/ForumRegister.vue';
import ForumListPage from '@/pages/user/ForumList.vue';
import ForumDetailPage from '@/pages/user/ForumDetail.vue';

import LibraryVideoListPage from '@/pages/user/LibraryVideoList.vue';
import LibraryVideoDetailPage from '@/pages/user/LibraryVideoDetail.vue';
import LibraryDocumentListPage from '@/pages/user/LibraryDocumentList.vue';
import LibraryDocumentDetailPage from '@/pages/user/LibraryDocumentDetail.vue';
import LibraryDownloadListPage from '@/pages/user/LibraryDownloadList.vue';

Vue.use(Router);

export function createRouter() {
  return new Router({
    mode: 'history',
    // base: 'DBS',
    routes: [...docsRoute, ...forumRoute, ...libraryRoute, ...testRoute],
  });
}

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
    // 질문 등록 페이지
    path: '/qna/register',
    component: ForumRegisterPage,
  },
];

const libraryRoute = [
  {
    // 자료실 동양상 페이지
    path: '/library/video',
    component: LibraryVideoListPage,
  },
  {
    // 자료실 동영상 상세 페이지
    path: '/library/video/:videoId',
    component: LibraryVideoDetailPage,
  },
  {
    // 자료실 문서 페이지
    path: '/library/doc',
    component: LibraryDocumentListPage,
  },
  {
    // 자료실 문서 상세 페이지
    path: '/library/doc/:docId',
    component: LibraryDocumentDetailPage,
  },
  {
    // 자료실 다운로드 페이지
    path: '/library/download',
    component: LibraryDownloadListPage,
  },
];

const testRoute = [
  {
    path: '/',
    component: Index,
  },
  {
    name: 'storage',
    path: '/storage',
    component: Storage,
  },
];

// const apiRootPath = 'http://localhost:3000/api';
// Vue.prototype.$apiRootPath = apiRootPath;
// Vue.prototype.$axios = axios;
// axios.defaults.baseURL = apiRootPath;
