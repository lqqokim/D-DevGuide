<template>
  <div class="dbs-container-wrap">
    <div class="viewer-wrap">
      <div class="dbs-top-image-wrap movie">
        <div class="dbs-top-image">
          <dl>
            <dt>자료실</dt>
            <dd>
              DEWS 플랫폼에 포함된 제품들을 이용하여 최적화된 개발을 <br />
              진행할 수 있도록 개발가이드 및 API 문서를 제공합니다.
            </dd>
          </dl>
        </div>
      </div>
    </div>
    <div class="dbs-container">
      <div class="content-wrap">
        <!-- 좌측메뉴 S -->
        <div class="left-menu">
          <p class="tit-con-left"><strong>자료실</strong></p>
          <div class="ui-accordion-left-pnl">
            <ul>
              <li class="nav-item depth-1 folder selected">
                <a href="#" class="nav-text">동영상</a>
                <ul class="nav-container depth-2" style="display: block;">
                  <li class="nav-item depth-2 page">
                    <a href="#" class="nav-text">전체</a>
                  </li>
                  <li class="nav-item depth-2 page selected">
                    <a href="#" class="nav-text">DEWS/UI</a>
                  </li>
                  <li class="nav-item depth-2 page">
                    <a href="#" class="nav-text">DEWS J</a>
                  </li>
                  <li class="nav-item depth-2 page">
                    <a href="#" class="nav-text">DEWS/FD</a>
                  </li>
                  <li class="nav-item depth-2 page">
                    <a href="#" class="nav-text">DEWS/BC</a>
                  </li>
                  <li class="nav-item depth-2 page">
                    <a href="#" class="nav-text">제품 관리</a>
                  </li>
                  <li class="nav-item depth-2 page">
                    <a href="#" class="nav-text">홈 화면 관리</a>
                  </li>
                </ul>
              </li>
              <li class="nav-item depth-1 folder">
                <a href="#" class="nav-text">문서</a>
              </li>
              <li class="nav-item depth-1 folder">
                <a href="#" class="nav-text">다운로드</a>
              </li>
            </ul>
          </div>
        </div>
        <!-- // 좌측메뉴 E -->
        <div class="container-panel">
          <div class="view-top mgb-15">
            <h2 class="tit-con-text">동영상 등록 수정</h2>
          </div>
          <div class="gray-info-box mgb-20">
            <ul class="box-notice">
              <li>
                <!-- TO DO select box 선택 작업 -->
                <div class="ui-select w-170">
                  <select title="품목형태" class="off" tabindex="-1">
                    <option value="0" selected="">master</option>
                    <option value="1">품목1</option>
                    <option value="2">품목2</option>
                  </select>
                  <button
                    type="button"
                    class="ui-select-btn"
                    title="품목형태 선택"
                  >
                    전체
                  </button>
                  <!-- 셀렉트박스  선택시 ui-select-wrap에 on 추가하면 display block 됨 -->
                  <div class="ui-select-wrap">
                    <strong class="ui-select-tit" tabindex="0"
                      >품목 선택</strong
                    >
                    <div class="ui-select-options">
                      <button
                        type="button"
                        class="ui-select-opt selected"
                        value="품목1"
                      >
                        <b class="ui-select-txt">품목1</b>
                      </button>
                      <button type="button" class="ui-select-opt" value="품목2">
                        <b class="ui-select-txt">품목2</b>
                      </button>
                    </div>
                  </div>
                </div>
                <input type="text" class="inp-base w-680" placeholder="제목" />
              </li>
              <li>
                <label class="txt-right w-170" style="display: inline-block;"
                  >YouTube</label
                >
                <input
                  type="text"
                  placeholder="YouTube ID 입력"
                  class="inp-base"
                  style="width: 585px;"
                />
                <button
                  type="button"
                  class="dbs-icon-button ico-left small preview"
                >
                  미리보기
                </button>
              </li>
            </ul>
          </div>
          <div class="movie-register-wrap mgb-20">
            <div class="movie-register-thumb">
              <ul class="thumb-list">
                <li class="main-video">
                  <div class="thumb">
                    <img src="../../assets/images/mov_01.jpg" alt="" />
                  </div>
                  <dl class="thumb-desc">
                    <!-- TO DO 두줄 이상인 경우 말줄임으로 나오게 해주세요 -->
                    <dt>
                      2019-11-23 DEWS/UI 세미나 영상 제목이 긴 경우
                    </dt>
                    <dd>
                      YouTube ID : badfasdb
                      <!-- 관리자 일때 만 --><span class="administer"
                        ><a href="#admin" class="font-accent-color"
                          >삭제</a
                        ></span
                      >
                    </dd>
                  </dl>
                </li>
              </ul>
            </div>
            <div class="movie-register-toastui">
              <TuiEditor></TuiEditor>
            </div>
          </div>
          <div class="btn-wrap mgb-80">
            <button
              type="button"
              class="dbs-icon-button ico-left small confirm"
            >
              확인
            </button>
            <button type="button" class="dbs-icon-button ico-left small cancel">
              취소
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!--    <library-video-series-register></library-video-series-register>-->
</template>
<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator';
import LibraryVideoSeriesRegister from '~/components/libraryVideoSeriesRegister/index.vue';

@Component({
  layout: 'default',
  components: {
    LibraryVideoSeriesRegister,
  },
})
export default class extends Vue {}
</script>

<style lang="scss"></style>
