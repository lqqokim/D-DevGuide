<template>
  <video-home-manage v-if="$store.state.user.user._id" />
  <!--  <div class="dbs-container-wrap">-->
  <!--    <div class="dbs-top-image-wrap movie">-->
  <!--      <div class="dbs-top-image">-->
  <!--        <dl>-->
  <!--          <dt>자료실</dt>-->
  <!--          <dd>-->
  <!--            DEWS 플랫폼에 포함된 제품들을 이용하여 개발을 진행할 때 도움이 될 수-->
  <!--            있는 <br />-->
  <!--            동영상, 문서 , 파일 자료들을 제공합니다.-->
  <!--          </dd>-->
  <!--        </dl>-->
  <!--      </div>-->
  <!--    </div>-->
  <!--    <div class="dbs-container">-->
  <!--      <div class="content-wrap">-->
  <!--        &lt;!&ndash; 좌측메뉴 S &ndash;&gt;-->
  <!--        <div class="left-menu">-->
  <!--          <p class="tit-con-left"><strong>자료실</strong></p>-->
  <!--          <div class="ui-accordion-left-pnl">-->
  <!--            <ul>-->
  <!--              <li class="nav-item depth-1 folder selected">-->
  <!--                <a href="#" class="nav-text">동영상</a>-->
  <!--                <ul class="nav-container depth-2" style="display: block;">-->
  <!--                  <li class="nav-item depth-2 page">-->
  <!--                    <a href="#" class="nav-text">전체</a>-->
  <!--                  </li>-->
  <!--                  <li class="nav-item depth-2 page">-->
  <!--                    <a href="#" class="nav-text">DEWS/UI</a>-->
  <!--                  </li>-->
  <!--                  <li class="nav-item depth-2 page">-->
  <!--                    <a href="#" class="nav-text">DEWS J</a>-->
  <!--                  </li>-->
  <!--                  <li class="nav-item depth-2 page">-->
  <!--                    <a href="#" class="nav-text">DEWS/FD</a>-->
  <!--                  </li>-->
  <!--                  <li class="nav-item depth-2 page">-->
  <!--                    <a href="#" class="nav-text">DEWS/BC</a>-->
  <!--                  </li>-->
  <!--                  <li class="nav-item depth-2 page">-->
  <!--                    <a href="#" class="nav-text">제품 관리</a>-->
  <!--                  </li>-->
  <!--                  <li class="nav-item depth-2 page selected">-->
  <!--                    <a href="#" class="nav-text">홈 화면 관리</a>-->
  <!--                  </li>-->
  <!--                </ul>-->
  <!--              </li>-->
  <!--              <li class="nav-item depth-1 folder">-->
  <!--                <a href="#" class="nav-text">문서</a>-->
  <!--              </li>-->
  <!--              <li class="nav-item depth-1 folder">-->
  <!--                <a href="#" class="nav-text">다운로드</a>-->
  <!--              </li>-->
  <!--            </ul>-->
  <!--          </div>-->
  <!--        </div>-->
  <!--        &lt;!&ndash; // 좌측메뉴 E &ndash;&gt;-->
  <!--        <div class="container-panel">-->
  <!--          <div class="view-top mgb-15">-->
  <!--            <h1 class="tit-con-text">동영상<span>홈 화면 관리</span></h1>-->
  <!--          </div>-->
  <!--          <div class="video-top">-->
  <!--            <p class="tit-con-sub">DEWS/UI</p>-->
  <!--            <div class="pst-button">-->
  <!--              <button-->
  <!--                type="button"-->
  <!--                class="dbs-icon-button ico-left small horizontal"-->
  <!--              >-->
  <!--                이동-->
  <!--              </button>-->
  <!--              <button type="button" class="dbs-icon-button ico-left small plus">-->
  <!--                추가-->
  <!--              </button>-->
  <!--            </div>-->
  <!--          </div>-->
  <!--          &lt;!&ndash; TD DO 이동 버튼 클릭시 moving 클래스 추가 &ndash;&gt;-->
  <!--          <ul class="thumb-list x-small moving mgt-20 mgb-60">-->
  <!--            <li class="mgl-0">-->
  <!--              <div class="thumb">-->
  <!--                <button type="button" class="dbs-icon-move horizontal">-->
  <!--                  좌우 이동-->
  <!--                </button>-->
  <!--                <img src="../../assets/images/mov_01.jpg" alt="" />-->
  <!--                <em class="btn-time">10:23</em>-->
  <!--                <div class="play">-->
  <!--                  <span class="count">12</span>-->
  <!--                  <em class="icon-playlist"></em>-->
  <!--                </div>-->
  <!--              </div>-->
  <!--              <dl class="thumb-desc">-->
  <!--                &lt;!&ndash; TO DO 두줄 이상인 경우 말줄임으로 나오게 해주세요 &ndash;&gt;-->
  <!--                <dt>-->
  <!--                  2019-11-23 DEWS/UI 세미나 영상 제목이 긴 경우-->
  <!--                </dt>-->
  <!--                <dd>-->
  <!--                  3일전<span class="administer"-->
  <!--                    ><a href="#admin" class="font-accent-color">관리</a></span-->
  <!--                  >-->
  <!--                </dd>-->
  <!--              </dl>-->
  <!--            </li>-->
  <!--            <li>-->
  <!--              <div class="thumb">-->
  <!--                <button type="button" class="dbs-icon-move horizontal">-->
  <!--                  좌우 이동-->
  <!--                </button>-->
  <!--                <img src="../../assets/images/mov_02.jpg" alt="" />-->
  <!--              </div>-->
  <!--              <dl class="thumb-desc">-->
  <!--                <dt>DEWS/UI 기초 교육 시리즈</dt>-->
  <!--                <dd>-->
  <!--                  2019-11-21<span class="administer"-->
  <!--                    ><a href="#admin" class="font-accent-color">관리</a></span-->
  <!--                  >-->
  <!--                </dd>-->
  <!--              </dl>-->
  <!--            </li>-->
  <!--            <li>-->
  <!--              <div class="thumb">-->
  <!--                <button type="button" class="dbs-icon-move horizontal">-->
  <!--                  좌우 이동-->
  <!--                </button>-->
  <!--                <img src="../../assets/images/mov_03.jpg" alt="" />-->
  <!--                <em class="btn-time">1:30:41</em>-->
  <!--              </div>-->
  <!--              <dl class="thumb-desc">-->
  <!--                <dt>DEWS 플랫폼 CM - UI편</dt>-->
  <!--                <dd>-->
  <!--                  2019-11-21<span class="administer"-->
  <!--                    ><a href="#admin" class="font-accent-color">관리</a></span-->
  <!--                  >-->
  <!--                </dd>-->
  <!--              </dl>-->
  <!--            </li>-->
  <!--            <li>-->
  <!--              <div class="thumb">-->
  <!--                <button type="button" class="dbs-icon-move horizontal">-->
  <!--                  좌우 이동-->
  <!--                </button>-->
  <!--                <img src="../../assets/images/mov_04.jpg" alt="" />-->
  <!--                <em class="btn-time">10:23</em>-->
  <!--              </div>-->
  <!--              <dl class="thumb-desc">-->
  <!--                <dt>2019 DEWS/UI 세미나 자료</dt>-->
  <!--                <dd>-->
  <!--                  2019-11-21<span class="administer"-->
  <!--                    ><a href="#admin" class="font-accent-color">관리</a></span-->
  <!--                  >-->
  <!--                </dd>-->
  <!--              </dl>-->
  <!--            </li>-->
  <!--            <li>-->
  <!--              <div class="thumb">-->
  <!--                <button type="button" class="dbs-icon-move horizontal">-->
  <!--                  좌우 이동-->
  <!--                </button>-->
  <!--                <img src="../../assets/images/mov_05.jpg" alt="" />-->
  <!--                <em class="btn-time">1:30:41</em>-->
  <!--              </div>-->
  <!--              <dl class="thumb-desc">-->
  <!--                <dt>DEWS/UI 고급자 교육 시리즈</dt>-->
  <!--                <dd>-->
  <!--                  2019-11-21<span class="administer"-->
  <!--                    ><a href="#admin" class="font-accent-color">관리</a></span-->
  <!--                  >-->
  <!--                </dd>-->
  <!--              </dl>-->
  <!--            </li>-->
  <!--          </ul>-->
  <!--          <div class="video-top">-->
  <!--            <p class="tit-con-sub">DEWS/FD</p>-->
  <!--            <div class="pst-button">-->
  <!--              <button-->
  <!--                type="button"-->
  <!--                class="dbs-icon-button ico-left small horizontal"-->
  <!--              >-->
  <!--                이동-->
  <!--              </button>-->
  <!--              <button type="button" class="dbs-icon-button ico-left small plus">-->
  <!--                추가-->
  <!--              </button>-->
  <!--            </div>-->
  <!--          </div>-->
  <!--          <ul class="thumb-list x-small mgt-20 mgb-60">-->
  <!--            <li class="mgl-0">-->
  <!--              <div class="thumb">-->
  <!--                <img src="../../assets/images/mov_02.jpg" alt="" />-->
  <!--              </div>-->
  <!--              <dl class="thumb-desc">-->
  <!--                <dt>DEWS/UI 기초 교육 시리즈</dt>-->
  <!--                <dd>-->
  <!--                  2019-11-21<span class="administer"-->
  <!--                    ><a href="#admin" class="font-accent-color">관리</a></span-->
  <!--                  >-->
  <!--                </dd>-->
  <!--              </dl>-->
  <!--            </li>-->
  <!--            <li>-->
  <!--              <div class="thumb">-->
  <!--                <img src="../../assets/images/mov_03.jpg" alt="" />-->
  <!--                <em class="btn-time">1:30:41</em>-->
  <!--              </div>-->
  <!--              <dl class="thumb-desc">-->
  <!--                <dt>DEWS 플랫폼 CM - UI편</dt>-->
  <!--                <dd>-->
  <!--                  2019-11-21<span class="administer"-->
  <!--                    ><a href="#admin" class="font-accent-color">관리</a></span-->
  <!--                  >-->
  <!--                </dd>-->
  <!--              </dl>-->
  <!--            </li>-->
  <!--            <li>-->
  <!--              <div class="thumb">-->
  <!--                <img src="../../assets/images/mov_01.jpg" alt="" />-->
  <!--                <em class="btn-time">10:23</em>-->
  <!--                <div class="play">-->
  <!--                  <span class="count">12</span>-->
  <!--                  <em class="icon-playlist"></em>-->
  <!--                </div>-->
  <!--              </div>-->
  <!--              <dl class="thumb-desc">-->
  <!--                &lt;!&ndash; TO DO 두줄 이상인 경우 말줄임으로 나오게 해주세요 &ndash;&gt;-->
  <!--                <dt>-->
  <!--                  2019-11-23 DEWS/UI 세미나 영상 제목이 긴 경우-->
  <!--                </dt>-->
  <!--                <dd>-->
  <!--                  3일전<span class="administer"-->
  <!--                    ><a href="#admin" class="font-accent-color">관리</a></span-->
  <!--                  >-->
  <!--                </dd>-->
  <!--              </dl>-->
  <!--            </li>-->
  <!--            <li>-->
  <!--              <div class="thumb">-->
  <!--                <img src="../../assets/images/mov_04.jpg" alt="" />-->
  <!--                <em class="btn-time">10:23</em>-->
  <!--              </div>-->
  <!--              <dl class="thumb-desc">-->
  <!--                <dt>2019 DEWS/UI 세미나 자료</dt>-->
  <!--                <dd>-->
  <!--                  2019-11-21<span class="administer"-->
  <!--                    ><a href="#admin" class="font-accent-color">관리</a></span-->
  <!--                  >-->
  <!--                </dd>-->
  <!--              </dl>-->
  <!--            </li>-->
  <!--            <li>-->
  <!--              <div class="thumb">-->
  <!--                <img src="../../assets/images/mov_05.jpg" alt="" />-->
  <!--                <em class="btn-time">1:30:41</em>-->
  <!--              </div>-->
  <!--              <dl class="thumb-desc">-->
  <!--                <dt>DEWS/UI 고급자 교육 시리즈</dt>-->
  <!--                <dd>-->
  <!--                  2019-11-21<span class="administer"-->
  <!--                    ><a href="#admin" class="font-accent-color">관리</a></span-->
  <!--                  >-->
  <!--                </dd>-->
  <!--              </dl>-->
  <!--            </li>-->
  <!--          </ul>-->
  <!--          <div class="video-top">-->
  <!--            <p class="tit-con-sub">DEWS/BD</p>-->
  <!--            <div class="pst-button">-->
  <!--              <button-->
  <!--                type="button"-->
  <!--                class="dbs-icon-button ico-left small horizontal"-->
  <!--              >-->
  <!--                이동-->
  <!--              </button>-->
  <!--              <button type="button" class="dbs-icon-button ico-left small plus">-->
  <!--                추가-->
  <!--              </button>-->
  <!--            </div>-->
  <!--          </div>-->
  <!--          <ul class="thumb-list x-small mgt-20 mgb-80">-->
  <!--            <li class="mgl-0">-->
  <!--              <div class="thumb">-->
  <!--                <img src="../../assets/images/mov_01.jpg" alt="" />-->
  <!--                <em class="btn-time">10:23</em>-->
  <!--                <div class="play">-->
  <!--                  <span class="count">12</span>-->
  <!--                  <em class="icon-playlist"></em>-->
  <!--                </div>-->
  <!--              </div>-->
  <!--              <dl class="thumb-desc">-->
  <!--                &lt;!&ndash; TO DO 두줄 이상인 경우 말줄임으로 나오게 해주세요 &ndash;&gt;-->
  <!--                <dt>-->
  <!--                  2019-11-23 DEWS/UI 세미나 영상 제목이 긴 경우-->
  <!--                </dt>-->
  <!--                <dd>-->
  <!--                  3일전<span class="administer"-->
  <!--                    ><a href="#admin" class="font-accent-color">관리</a></span-->
  <!--                  >-->
  <!--                </dd>-->
  <!--              </dl>-->
  <!--            </li>-->
  <!--            <li>-->
  <!--              <div class="thumb">-->
  <!--                <img src="../../assets/images/mov_02.jpg" alt="" />-->
  <!--              </div>-->
  <!--              <dl class="thumb-desc">-->
  <!--                <dt>DEWS/UI 기초 교육 시리즈</dt>-->
  <!--                <dd>-->
  <!--                  2019-11-21<span class="administer"-->
  <!--                    ><a href="#admin" class="font-accent-color">관리</a></span-->
  <!--                  >-->
  <!--                </dd>-->
  <!--              </dl>-->
  <!--            </li>-->
  <!--            <li>-->
  <!--              <div class="thumb">-->
  <!--                <img src="../../assets/images/mov_03.jpg" alt="" />-->
  <!--                <em class="btn-time">1:30:41</em>-->
  <!--              </div>-->
  <!--              <dl class="thumb-desc">-->
  <!--                <dt>DEWS 플랫폼 CM - UI편</dt>-->
  <!--                <dd>-->
  <!--                  2019-11-21<span class="administer"-->
  <!--                    ><a href="#admin" class="font-accent-color">관리</a></span-->
  <!--                  >-->
  <!--                </dd>-->
  <!--              </dl>-->
  <!--            </li>-->
  <!--            <li>-->
  <!--              <div class="thumb">-->
  <!--                <img src="../../assets/images/mov_04.jpg" alt="" />-->
  <!--                <em class="btn-time">10:23</em>-->
  <!--              </div>-->
  <!--              <dl class="thumb-desc">-->
  <!--                <dt>2019 DEWS/UI 세미나 자료</dt>-->
  <!--                <dd>-->
  <!--                  2019-11-21<span class="administer"-->
  <!--                    ><a href="#admin" class="font-accent-color">관리</a></span-->
  <!--                  >-->
  <!--                </dd>-->
  <!--              </dl>-->
  <!--            </li>-->
  <!--            <li>-->
  <!--              <div class="thumb">-->
  <!--                <img src="../../assets/images/mov_05.jpg" alt="" />-->
  <!--                <em class="btn-time">1:30:41</em>-->
  <!--              </div>-->
  <!--              <dl class="thumb-desc">-->
  <!--                <dt>DEWS/UI 고급자 교육 시리즈</dt>-->
  <!--                <dd>-->
  <!--                  2019-11-21<span class="administer"-->
  <!--                    ><a href="#admin" class="font-accent-color">관리</a></span-->
  <!--                  >-->
  <!--                </dd>-->
  <!--              </dl>-->
  <!--            </li>-->
  <!--          </ul>-->
  <!--        </div>-->
  <!--      </div>-->
  <!--    </div>-->
  <!--  </div>-->
</template>
<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator';
import VideoHomeManage from '~/components/libraryVideoHomeManage/index.vue';

@Component({
  layout: 'default',
  components: {
    VideoHomeManage,
  },
  async fetch({ store }): Promise<any> {
    try {
      // 제품 목록을 조회
      await store.dispatch('video/videoProducts');
    } catch (e) {
      console.error(e);
    }
  },
})
export default class extends Vue {}
</script>

<style lang="scss"></style>
