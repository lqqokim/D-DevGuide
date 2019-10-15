import Vue from 'vue';
import Router from 'vue-router';

import Index from '@/pages/index.vue';
import Storage from '@/pages/Storage.vue';

import ProductList from '@/pages/user/docs/ProductList';
import ProductDetail from '~/pages/user/docs/product.detail';
import ProductDocView from '@/pages/user/docs/ProductDocView';
import ProductEdit from '@/pages/user/docs/ProductEdit';
import ProductRegister from '@/pages/user/docs/ProductRegister';

import Register from '~/pages/user/qna/ForumRegister';
import ForumList from '@/pages/user/qna/ForumList';
import BoardDetail from '~/pages/user/qna/ForumDetail';

import VideoList from '@/pages/user/library/video/VideoList';
import VideoDetail from '@/pages/user/library/video/VideoDetail';
import DocumentList from '@/pages/user/library/document/DocumentList';
import DocumentDetail from '@/pages/user/library/document/DocumentDetail';
import DownloadList from '@/pages/user/library/download/DownloadList';

Vue.use(Router);

export function createRouter() {
  return new Router({
    mode: 'history',
    // base: 'DBS',
    routes: [...docsRoute, ...qnaRoute, ...storageRoute, ...testRoute],
  });
}

const docsRoute = [
  {
    // 제품 리스트 페이지
    path: '/docs',
    component: ProductList,
  },
  {
    // 제품 등록 페이지
    path: '/docs/register',
    component: ProductRegister,
  },
  {
    // 제품 상세 페이지 (진입시 문서 뷰 페이지로 변경)
    path: '/docs/:productId',
    name: 'detail',
    component: ProductDetail,
    props: { newsletterPopup: false },
  },
  {
    // 제품 문서 뷰 페이지
    path: '/docs/:productId/:pageType/:pageId',
    component: ProductDocView,
  },
  {
    // 제품 문서 뷰 편집 페이지
    path: '/docs/:productId/branch/:branchName/:pageType/:pageId',
    component: ProductEdit,
  },
  {
    // 제품 문서 뷰 편집 페이지
    path: '/docs/:productId/branch/:branchName/:pageType/:pageId',
    component: ProductEdit,
  },
];

const qnaRoute = [
  {
    // 질문답변 내 게시물 리스트 페이지 (질문답변 메인)
    path: '/qna/category/:categoryName',
    name: 'ForumList',
    component: ForumList,
  },
  {
    // 질문답변 게시물 상세 페이지
    path: '/qna/:productId/:rowId',
    component: ForumDetail,
  },
  {
    // 질문 등록 페이지
    path: '/qna/register',
    component: ForumRegister,
  },
];

const storageRoute = [
  {
    // 자료실 동양상 페이지
    path: '/library/video',
    component: VideoList,
  },
  {
    // 자료실 동영상 상세 페이지
    path: '/library/video/:videoId',
    component: VideoDetail,
  },
  {
    // 자료실 문서 페이지
    path: '/library/doc',
    component: DocumentList,
  },
  {
    // 자료실 문서 상세 페이지
    path: '/library/doc/:docId',
    component: DocumentDetail,
  },
  {
    // 자료실 다운로드 페이지
    path: '/library/download',
    component: DownloadList,
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
