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
                  <li class="nav-item depth-2 page">
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
                  <li class="nav-item depth-2 page selected">
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
            <p class="tit-con-qna">동영상 홈 화면 관리</p>
          </div>
          <div class="video-top">
            <p class="tit-con-sub">DEWS/UI</p>
            <div class="pst-button">
              <button
                type="button"
                class="dbs-icon-button ico-left small horizontal"
              >
                이동
              </button>
              <button type="button" class="dbs-icon-button ico-left small plus">
                추가
              </button>
            </div>
          </div>
          <!-- TD DO 이동 버튼 클릭시 moving 클래스 추가 -->
          <ul class="thumb-list x-small moving mgt-20 mgb-60">
            <li class="mgl-0">
              <div class="thumb">
                <button type="button" class="dbs-icon-move horizontal">
                  좌우 이동
                </button>
                <img src="../../assets/images/mov_01.jpg" alt="" />
                <em class="btn-time">10:23</em>
                <div class="play">
                  <span class="count">12</span>
                  <em class="icon-playlist"></em>
                </div>
              </div>
              <dl class="thumb-desc">
                <!-- TO DO 두줄 이상인 경우 말줄임으로 나오게 해주세요 -->
                <dt>
                  2019-11-23 DEWS/UI 세미나 영상 제목이 긴 경우
                </dt>
                <dd>
                  3일전<span class="administer"
                    ><a href="#admin" class="font-accent-color">관리</a></span
                  >
                </dd>
              </dl>
            </li>
            <li>
              <div class="thumb">
                <button type="button" class="dbs-icon-move horizontal">
                  좌우 이동
                </button>
                <img src="../../assets/images/mov_02.jpg" alt="" />
              </div>
              <dl class="thumb-desc">
                <dt>DEWS/UI 기초 교육 시리즈</dt>
                <dd>
                  2019-11-21<span class="administer"
                    ><a href="#admin" class="font-accent-color">관리</a></span
                  >
                </dd>
              </dl>
            </li>
            <li>
              <div class="thumb">
                <button type="button" class="dbs-icon-move horizontal">
                  좌우 이동
                </button>
                <img src="../../assets/images/mov_03.jpg" alt="" />
                <em class="btn-time">1:30:41</em>
              </div>
              <dl class="thumb-desc">
                <dt>DEWS 플랫폼 CM - UI편</dt>
                <dd>
                  2019-11-21<span class="administer"
                    ><a href="#admin" class="font-accent-color">관리</a></span
                  >
                </dd>
              </dl>
            </li>
            <li>
              <div class="thumb">
                <button type="button" class="dbs-icon-move horizontal">
                  좌우 이동
                </button>
                <img src="../../assets/images/mov_04.jpg" alt="" />
                <em class="btn-time">10:23</em>
              </div>
              <dl class="thumb-desc">
                <dt>2019 DEWS/UI 세미나 자료</dt>
                <dd>
                  2019-11-21<span class="administer"
                    ><a href="#admin" class="font-accent-color">관리</a></span
                  >
                </dd>
              </dl>
            </li>
            <li>
              <div class="thumb">
                <button type="button" class="dbs-icon-move horizontal">
                  좌우 이동
                </button>
                <img src="../../assets/images/mov_05.jpg" alt="" />
                <em class="btn-time">1:30:41</em>
              </div>
              <dl class="thumb-desc">
                <dt>DEWS/UI 고급자 교육 시리즈</dt>
                <dd>
                  2019-11-21<span class="administer"
                    ><a href="#admin" class="font-accent-color">관리</a></span
                  >
                </dd>
              </dl>
            </li>
          </ul>
          <div class="video-top">
            <p class="tit-con-sub">DEWS/FD</p>
            <div class="pst-button">
              <button
                type="button"
                class="dbs-icon-button ico-left small horizontal"
              >
                이동
              </button>
              <button type="button" class="dbs-icon-button ico-left small plus">
                추가
              </button>
            </div>
          </div>
          <ul class="thumb-list x-small mgt-20 mgb-60">
            <li class="mgl-0">
              <div class="thumb">
                <img src="../../assets/images/mov_02.jpg" alt="" />
              </div>
              <dl class="thumb-desc">
                <dt>DEWS/UI 기초 교육 시리즈</dt>
                <dd>
                  2019-11-21<span class="administer"
                    ><a href="#admin" class="font-accent-color">관리</a></span
                  >
                </dd>
              </dl>
            </li>
            <li>
              <div class="thumb">
                <img src="../../assets/images/mov_03.jpg" alt="" />
                <em class="btn-time">1:30:41</em>
              </div>
              <dl class="thumb-desc">
                <dt>DEWS 플랫폼 CM - UI편</dt>
                <dd>
                  2019-11-21<span class="administer"
                    ><a href="#admin" class="font-accent-color">관리</a></span
                  >
                </dd>
              </dl>
            </li>
            <li>
              <div class="thumb">
                <img src="../../assets/images/mov_01.jpg" alt="" />
                <em class="btn-time">10:23</em>
                <div class="play">
                  <span class="count">12</span>
                  <em class="icon-playlist"></em>
                </div>
              </div>
              <dl class="thumb-desc">
                <!-- TO DO 두줄 이상인 경우 말줄임으로 나오게 해주세요 -->
                <dt>
                  2019-11-23 DEWS/UI 세미나 영상 제목이 긴 경우
                </dt>
                <dd>
                  3일전<span class="administer"
                    ><a href="#admin" class="font-accent-color">관리</a></span
                  >
                </dd>
              </dl>
            </li>
            <li>
              <div class="thumb">
                <img src="../../assets/images/mov_04.jpg" alt="" />
                <em class="btn-time">10:23</em>
              </div>
              <dl class="thumb-desc">
                <dt>2019 DEWS/UI 세미나 자료</dt>
                <dd>
                  2019-11-21<span class="administer"
                    ><a href="#admin" class="font-accent-color">관리</a></span
                  >
                </dd>
              </dl>
            </li>
            <li>
              <div class="thumb">
                <img src="../../assets/images/mov_05.jpg" alt="" />
                <em class="btn-time">1:30:41</em>
              </div>
              <dl class="thumb-desc">
                <dt>DEWS/UI 고급자 교육 시리즈</dt>
                <dd>
                  2019-11-21<span class="administer"
                    ><a href="#admin" class="font-accent-color">관리</a></span
                  >
                </dd>
              </dl>
            </li>
          </ul>
          <div class="video-top">
            <p class="tit-con-sub">DEWS/BD</p>
            <div class="pst-button">
              <button
                type="button"
                class="dbs-icon-button ico-left small horizontal"
              >
                이동
              </button>
              <button type="button" class="dbs-icon-button ico-left small plus">
                추가
              </button>
            </div>
          </div>
          <ul class="thumb-list x-small mgt-20 mgb-80">
            <li class="mgl-0">
              <div class="thumb">
                <img src="../../assets/images/mov_01.jpg" alt="" />
                <em class="btn-time">10:23</em>
                <div class="play">
                  <span class="count">12</span>
                  <em class="icon-playlist"></em>
                </div>
              </div>
              <dl class="thumb-desc">
                <!-- TO DO 두줄 이상인 경우 말줄임으로 나오게 해주세요 -->
                <dt>
                  2019-11-23 DEWS/UI 세미나 영상 제목이 긴 경우
                </dt>
                <dd>
                  3일전<span class="administer"
                    ><a href="#admin" class="font-accent-color">관리</a></span
                  >
                </dd>
              </dl>
            </li>
            <li>
              <div class="thumb">
                <img src="../../assets/images/mov_02.jpg" alt="" />
              </div>
              <dl class="thumb-desc">
                <dt>DEWS/UI 기초 교육 시리즈</dt>
                <dd>
                  2019-11-21<span class="administer"
                    ><a href="#admin" class="font-accent-color">관리</a></span
                  >
                </dd>
              </dl>
            </li>
            <li>
              <div class="thumb">
                <img src="../../assets/images/mov_03.jpg" alt="" />
                <em class="btn-time">1:30:41</em>
              </div>
              <dl class="thumb-desc">
                <dt>DEWS 플랫폼 CM - UI편</dt>
                <dd>
                  2019-11-21<span class="administer"
                    ><a href="#admin" class="font-accent-color">관리</a></span
                  >
                </dd>
              </dl>
            </li>
            <li>
              <div class="thumb">
                <img src="../../assets/images/mov_04.jpg" alt="" />
                <em class="btn-time">10:23</em>
              </div>
              <dl class="thumb-desc">
                <dt>2019 DEWS/UI 세미나 자료</dt>
                <dd>
                  2019-11-21<span class="administer"
                    ><a href="#admin" class="font-accent-color">관리</a></span
                  >
                </dd>
              </dl>
            </li>
            <li>
              <div class="thumb">
                <img src="../../assets/images/mov_05.jpg" alt="" />
                <em class="btn-time">1:30:41</em>
              </div>
              <dl class="thumb-desc">
                <dt>DEWS/UI 고급자 교육 시리즈</dt>
                <dd>
                  2019-11-21<span class="administer"
                    ><a href="#admin" class="font-accent-color">관리</a></span
                  >
                </dd>
              </dl>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <!-- TODO :dialog dbs-dialog-wrap display: block; base-wrap 클래스에 not_scroll 추가, dbs-overlay div 추가 -->
    <div class="dbs-dialog-wrap medium">
      <div class="dbs-dialog">
        <h1 class="dbs-dialog-title tit-video mgb-20">동영상 선택</h1>
        <p class="tit-con-small mgb-10">DEWS/UI</p>
        <div class="dbs-dialog-box">
          <div class="dbs-dialog-scroll">
            <ul class="thumb-list x-small mgb-30">
              <li>
                <div class="thumb">
                  <img src="../../assets/images/mov_02.jpg" alt="" />
                </div>
                <dl class="thumb-desc">
                  <dt>DEWS/UI 기초 교육 시리즈</dt>
                  <dd>
                    2019-11-21<span class="administer"
                      ><a href="#admin" class="font-accent-color">관리</a></span
                    >
                  </dd>
                </dl>
              </li>
              <li>
                <div class="thumb">
                  <img src="../../assets/images/mov_03.jpg" alt="" />
                  <em class="btn-time">1:30:41</em>
                </div>
                <dl class="thumb-desc">
                  <dt>DEWS 플랫폼 CM - UI편</dt>
                  <dd>
                    2019-11-21<span class="administer"
                      ><a href="#admin" class="font-accent-color">관리</a></span
                    >
                  </dd>
                </dl>
              </li>
              <li>
                <div class="thumb">
                  <img src="../../assets/images/mov_04.jpg" alt="" />
                  <em class="btn-time">10:23</em>
                </div>
                <dl class="thumb-desc">
                  <dt>2019 DEWS/UI 세미나 자료</dt>
                  <dd>
                    2019-11-21<span class="administer"
                      ><a href="#admin" class="font-accent-color">관리</a></span
                    >
                  </dd>
                </dl>
              </li>
              <li>
                <div class="thumb">
                  <img src="../../assets/images/mov_05.jpg" alt="" />
                  <em class="btn-time">1:30:41</em>
                </div>
                <dl class="thumb-desc">
                  <dt>DEWS/UI 고급자 교육 시리즈</dt>
                  <dd>
                    2019-11-21<span class="administer"
                      ><a href="#admin" class="font-accent-color">관리</a></span
                    >
                  </dd>
                </dl>
              </li>
              <li>
                <div class="thumb">
                  <img src="../../assets/images/mov_03.jpg" alt="" />
                  <em class="btn-time">1:30:41</em>
                </div>
                <dl class="thumb-desc">
                  <dt>DEWS 플랫폼 CM - UI편</dt>
                  <dd>
                    2019-11-21<span class="administer"
                      ><a href="#admin" class="font-accent-color">관리</a></span
                    >
                  </dd>
                </dl>
              </li>
              <li>
                <div class="thumb">
                  <img src="../../assets/images/mov_04.jpg" alt="" />
                  <em class="btn-time">10:23</em>
                </div>
                <dl class="thumb-desc">
                  <dt>2019 DEWS/UI 세미나 자료</dt>
                  <dd>
                    2019-11-21<span class="administer"
                      ><a href="#admin" class="font-accent-color">관리</a></span
                    >
                  </dd>
                </dl>
              </li>
            </ul>
            <div class="btn-wrap">
              <button type="button" class="btn-main small">더보기</button>
            </div>
          </div>
        </div>
      </div>
      <div class="dbs-dialog-footer">
        <div class="btn-wrap">
          <button type="button" class="dbs-icon-button ico-left small confirm">
            확인
          </button>
          <button type="button" class="dbs-icon-button ico-left small cancel">
            취소
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator';
import VideoHomeManage from '~/components/libraryVideoHomeManage/index.vue';

@Component({
  layout: 'TypeA',
  components: {
    VideoHomeManage,
  },
})
export default class extends Vue {
  created() {
    console.log('홈 화면 관리');
  }
}
</script>

<style lang="scss"></style>
