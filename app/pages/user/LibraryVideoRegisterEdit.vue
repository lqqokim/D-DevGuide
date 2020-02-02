<template>
  <library-video-register-edit></library-video-register-edit>
  <!--<div class="dbs-container-wrap">-->
  <!--<div class="dbs-top-image-wrap movie">-->
  <!--<div class="dbs-top-image">-->
  <!--<dl>-->
  <!--<dt>자료실</dt>-->
  <!--<dd>-->
  <!--DEWS 플랫폼에 포함된 제품들을 이용하여 개발을 진행할 때 도움이 될-->
  <!--수 있는 <br />-->
  <!--동영상, 문서 , 파일 자료들을 제공합니다.-->
  <!--</dd>-->
  <!--</dl>-->
  <!--</div>-->
  <!--</div>-->
  <!--<div class="dbs-container">-->
  <!--<div class="content-wrap">-->
  <!--&lt;!&ndash; 좌측메뉴 S &ndash;&gt;-->
  <!--<div class="left-menu">-->
  <!--<p class="tit-con-left"><strong>자료실</strong></p>-->
  <!--<div class="ui-accordion-left-pnl">-->
  <!--<ul>-->
  <!--<li class="nav-item depth-1 folder selected">-->
  <!--<a href="#" class="nav-text">동영상</a>-->
  <!--<ul class="nav-container depth-2" style="display: block;">-->
  <!--<li class="nav-item depth-2 page">-->
  <!--<a href="#" class="nav-text">전체</a>-->
  <!--</li>-->
  <!--<li class="nav-item depth-2 page selected">-->
  <!--<a href="#" class="nav-text">DEWS/UI</a>-->
  <!--</li>-->
  <!--<li class="nav-item depth-2 page">-->
  <!--<a href="#" class="nav-text">DEWS J</a>-->
  <!--</li>-->
  <!--<li class="nav-item depth-2 page">-->
  <!--<a href="#" class="nav-text">DEWS/FD</a>-->
  <!--</li>-->
  <!--<li class="nav-item depth-2 page">-->
  <!--<a href="#" class="nav-text">DEWS/BC</a>-->
  <!--</li>-->
  <!--<li class="nav-item depth-2 page">-->
  <!--<a href="#" class="nav-text">제품 관리</a>-->
  <!--</li>-->
  <!--<li class="nav-item depth-2 page">-->
  <!--<a href="#" class="nav-text">홈 화면 관리</a>-->
  <!--</li>-->
  <!--</ul>-->
  <!--</li>-->
  <!--<li class="nav-item depth-1 folder">-->
  <!--<a href="#" class="nav-text">문서</a>-->
  <!--</li>-->
  <!--<li class="nav-item depth-1 folder">-->
  <!--<a href="#" class="nav-text">다운로드</a>-->
  <!--</li>-->
  <!--</ul>-->
  <!--</div>-->
  <!--</div>-->
  <!--&lt;!&ndash; // 좌측메뉴 E &ndash;&gt;-->
  <!--<div class="container-panel">-->
  <!--<div class="view-top mgb-15">-->
  <!--<h2 class="tit-con-text"><strong>동영상</strong>등록/수정</h2>-->
  <!--</div>-->
  <!--&lt;!&ndash; 단독일 때&ndash;&gt;-->
  <!--<div class="gray-info-box mgb-20" style="display: none;">-->
  <!--<ul class="box-notice">-->
  <!--<li>-->
  <!--&lt;!&ndash; TO DO select box 선택 작업 &ndash;&gt;-->
  <!--<div class="ui-select w-170">-->
  <!--<select title="품목형태" class="off" tabindex="-1">-->
  <!--<option value="0" selected="">master</option>-->
  <!--<option value="1">품목1</option>-->
  <!--<option value="2">품목2</option>-->
  <!--</select>-->
  <!--<button-->
  <!--type="button"-->
  <!--class="ui-select-btn"-->
  <!--title="품목형태 선택"-->
  <!--&gt;-->
  <!--전체-->
  <!--</button>-->
  <!--&lt;!&ndash; 셀렉트박스  선택시 ui-select-wrap에 on 추가하면 display block 됨 &ndash;&gt;-->
  <!--<div class="ui-select-wrap">-->
  <!--<strong class="ui-select-tit" tabindex="0"-->
  <!--&gt;품목 선택</strong-->
  <!--&gt;-->
  <!--<div class="ui-select-options">-->
  <!--<button-->
  <!--type="button"-->
  <!--class="ui-select-opt selected"-->
  <!--value="품목1"-->
  <!--&gt;-->
  <!--<b class="ui-select-txt">품목1</b>-->
  <!--</button>-->
  <!--<button type="button" class="ui-select-opt" value="품목2">-->
  <!--<b class="ui-select-txt">품목2</b>-->
  <!--</button>-->
  <!--</div>-->
  <!--</div>-->
  <!--</div>-->
  <!--<input type="text" class="inp-base w-680" placeholder="제목" />-->
  <!--</li>-->
  <!--<li>-->
  <!--<label class="txt-right w-170" style="display: inline-block;"-->
  <!--&gt;YouTube</label-->
  <!--&gt;-->
  <!--<input-->
  <!--type="text"-->
  <!--placeholder="YouTube ID 입력"-->
  <!--class="inp-base"-->
  <!--style="width: 585px;"-->
  <!--/>-->
  <!--<button-->
  <!--type="button"-->
  <!--class="dbs-icon-button ico-left small preview"-->
  <!--&gt;-->
  <!--미리보기-->
  <!--</button>-->
  <!--</li>-->
  <!--</ul>-->
  <!--</div>-->
  <!--<div class="movie-register-wrap mgb-20" style="display: none;">-->
  <!--<div class="movie-register-thumb single">-->
  <!--<ul class="thumb-list">-->
  <!--<li class="main-video">-->
  <!--<div class="thumb">-->
  <!--<img src="../../assets/images/mov_01.jpg" alt="" />-->
  <!--</div>-->
  <!--<dl class="thumb-desc">-->
  <!--<dt class="ellipsis">-->
  <!--2019-11-23 DEWS/UI 세미나 영상 제목이 긴 경우-->
  <!--</dt>-->
  <!--<dd>-->
  <!--YouTube ID : badfasdb-->
  <!--<span class="administer"-->
  <!--&gt;<a href="#admin" class="font-accent-color"-->
  <!--&gt;삭제</a-->
  <!--&gt;</span-->
  <!--&gt;-->
  <!--</dd>-->
  <!--</dl>-->
  <!--</li>-->
  <!--</ul>-->
  <!--</div>-->
  <!--<div class="movie-register-toastui">-->
  <!--<TuiEditor></TuiEditor>-->
  <!--</div>-->
  <!--</div>-->
  <!--&lt;!&ndash; 시리즈일 때&ndash;&gt;-->
  <!--<div class="gray-info-box mgb-20">-->
  <!--<ul class="box-notice">-->
  <!--<li>-->
  <!--&lt;!&ndash; TO DO select box 선택 작업 &ndash;&gt;-->
  <!--<div class="ui-select w-170">-->
  <!--<select title="품목형태" class="off" tabindex="-1">-->
  <!--<option value="0" selected="">master</option>-->
  <!--<option value="1">품목1</option>-->
  <!--<option value="2">품목2</option>-->
  <!--</select>-->
  <!--<button-->
  <!--type="button"-->
  <!--class="ui-select-btn"-->
  <!--title="품목형태 선택"-->
  <!--&gt;-->
  <!--전체-->
  <!--</button>-->
  <!--&lt;!&ndash; 셀렉트박스  선택시 ui-select-wrap에 on 추가하면 display block 됨 &ndash;&gt;-->
  <!--<div class="ui-select-wrap">-->
  <!--<strong class="ui-select-tit" tabindex="0"-->
  <!--&gt;품목 선택</strong-->
  <!--&gt;-->
  <!--<div class="ui-select-options">-->
  <!--<button-->
  <!--type="button"-->
  <!--class="ui-select-opt selected"-->
  <!--value="품목1"-->
  <!--&gt;-->
  <!--<b class="ui-select-txt">품목1</b>-->
  <!--</button>-->
  <!--<button type="button" class="ui-select-opt" value="품목2">-->
  <!--<b class="ui-select-txt">품목2</b>-->
  <!--</button>-->
  <!--</div>-->
  <!--</div>-->
  <!--</div>-->
  <!--<input type="text" class="inp-base w-680" placeholder="제목" />-->
  <!--</li>-->
  <!--<li>-->
  <!--<input-->
  <!--type="text"-->
  <!--placeholder="시리즈 항목 제목"-->
  <!--class="inp-base"-->
  <!--style="width: 170px;"-->
  <!--/>-->
  <!--<input-->
  <!--type="text"-->
  <!--placeholder="YouTube ID 입력"-->
  <!--class="inp-base"-->
  <!--style="width: 510px;"-->
  <!--/>-->
  <!--<button-->
  <!--type="button"-->
  <!--class="dbs-icon-button ico-left small preview"-->
  <!--&gt;-->
  <!--미리보기-->
  <!--</button>-->
  <!--<button-->
  <!--type="button"-->
  <!--class="dbs-icon-button ico-left small plus"-->
  <!--&gt;-->
  <!--추가-->
  <!--</button>-->
  <!--</li>-->
  <!--</ul>-->
  <!--</div>-->
  <!--<div class="movie-register-wrap mgb-20">-->
  <!--<div class="movie-register-thumb series">-->
  <!--<ul class="thumb-list">-->
  <!--<li class="main-video">-->
  <!--<div class="thumb">-->
  <!--<button type="button" class="dbs-icon-move vertical">-->
  <!--위아래 이동-->
  <!--</button>-->
  <!--<img src="../../assets/images/mov_01.jpg" alt="" />-->
  <!--</div>-->
  <!--<dl class="thumb-desc">-->
  <!--&lt;!&ndash; TO DO 두줄 이상인 경우 말줄임으로 나오게 해주세요 &ndash;&gt;-->
  <!--<dt class="ellipsis">-->
  <!--2019-11-23 DEWS/UI 세미나 영상 제목이 긴 경우-->
  <!--</dt>-->
  <!--<dd>-->
  <!--YouTube ID : badfasdb-->
  <!--&lt;!&ndash; 관리자 일때 만 &ndash;&gt;<span class="administer"-->
  <!--&gt;<a href="#admin" class="font-accent-color"-->
  <!--&gt;삭제</a-->
  <!--&gt;</span-->
  <!--&gt;-->
  <!--</dd>-->
  <!--</dl>-->
  <!--</li>-->
  <!--<li class="main-video">-->
  <!--<div class="thumb">-->
  <!--<button type="button" class="dbs-icon-move vertical">-->
  <!--위아래 이동-->
  <!--</button>-->
  <!--<img src="../../assets/images/mov_01.jpg" alt="" />-->
  <!--</div>-->
  <!--<dl class="thumb-desc">-->
  <!--&lt;!&ndash; TO DO 두줄 이상인 경우 말줄임으로 나오게 해주세요 &ndash;&gt;-->
  <!--<dt class="ellipsis">-->
  <!--2019-11-23 DEWS/UI 세미나 영상 제목이 긴 경우-->
  <!--</dt>-->
  <!--<dd>-->
  <!--YouTube ID : badfasdb-->
  <!--&lt;!&ndash; 관리자 일때 만 &ndash;&gt;<span class="administer"-->
  <!--&gt;<a href="#admin" class="font-accent-color"-->
  <!--&gt;삭제</a-->
  <!--&gt;</span-->
  <!--&gt;-->
  <!--</dd>-->
  <!--</dl>-->
  <!--</li>-->
  <!--<li class="main-video">-->
  <!--<div class="thumb">-->
  <!--<button type="button" class="dbs-icon-move vertical">-->
  <!--위아래 이동-->
  <!--</button>-->
  <!--<img src="../../assets/images/mov_01.jpg" alt="" />-->
  <!--</div>-->
  <!--<dl class="thumb-desc">-->
  <!--&lt;!&ndash; TO DO 두줄 이상인 경우 말줄임으로 나오게 해주세요 &ndash;&gt;-->
  <!--<dt class="ellipsis">-->
  <!--2019-11-23 DEWS/UI 세미나 영상 제목이 긴 경우-->
  <!--</dt>-->
  <!--<dd>-->
  <!--YouTube ID : badfasdb-->
  <!--&lt;!&ndash; 관리자 일때 만 &ndash;&gt;<span class="administer"-->
  <!--&gt;<a href="#admin" class="font-accent-color"-->
  <!--&gt;삭제</a-->
  <!--&gt;</span-->
  <!--&gt;-->
  <!--</dd>-->
  <!--</dl>-->
  <!--</li>-->
  <!--</ul>-->
  <!--</div>-->
  <!--<div class="movie-register-toastui">-->
  <!--<TuiEditor height="448px"></TuiEditor>-->
  <!--</div>-->
  <!--</div>-->
  <!--<div class="btn-wrap mgb-80">-->
  <!--<button-->
  <!--type="button"-->
  <!--class="dbs-icon-button ico-left small confirm"-->
  <!--&gt;-->
  <!--확인-->
  <!--</button>-->
  <!--<button type="button" class="dbs-icon-button ico-left small cancel">-->
  <!--취소-->
  <!--</button>-->
  <!--</div>-->
  <!--</div>-->
  <!--</div>-->
  <!--</div>-->
  <!--</div>-->
</template>
<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator';
import LibraryVideoRegisterEdit from '~/components/libraryVideoRegisterEdit/index.vue';

@Component({
  layout: 'default',
  components: {
    LibraryVideoRegisterEdit,
  },
  async fetch({ store, params }) {
    try {
      if (!store.state.video.products) {
        await store.dispatch('video/videoProducts');
      }

      // set selectedProduct by productCode
      await store.dispatch('video/productByCode', params.productCode);

      // init selectedVideo
      await store.commit('video/initState', 'selectedVideo');

      // init selectedVideoSeries
      await store.commit('video/initState', 'selectedVideoSeries');

      // set selectedVideo
      if (params.editType === 'edit') {
        if (!params.video) {
          await store.dispatch('video/videoDetailById', params._id);
        } else {
          await store.commit('video/selectedVideo', params.video);

          if (
            store.state.video.selectedVideo.isSeries &&
            !store.state.video.selectedVideo.groupId
          ) {
            await store.commit(
              'video/selectedVideoSeries',
              store.state.video.selectedVideo.series
            );
          }
        }
      }
    } catch (e) {
      console.error(e);
    }
  },
})
export default class extends Vue {}
</script>

<style lang="scss"></style>
