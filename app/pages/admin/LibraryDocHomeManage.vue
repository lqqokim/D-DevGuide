<template>
  <doc-home-manage v-if="$store.state.user.user._id" />
  <!--  <div class="dbs-container-wrap">-->
  <!--    <div class="viewer-wrap">-->
  <!--      <div class="dbs-top-image-wrap movie">-->
  <!--        <div class="dbs-top-image">-->
  <!--          <dl>-->
  <!--            <dt>자료실</dt>-->
  <!--            <dd>-->
  <!--              DEWS 플랫폼에 포함된 제품들을 이용하여 개발을 진행할 때 도움이 될-->
  <!--              수 있는 <br />-->
  <!--              동영상, 문서 , 파일 자료들을 제공합니다.-->
  <!--            </dd>-->
  <!--          </dl>-->
  <!--        </div>-->
  <!--      </div>-->
  <!--    </div>-->
  <!--    <div class="dbs-container">-->
  <!--      <div class="content-wrap">-->
  <!--        &lt;!&ndash; 좌측메뉴 S &ndash;&gt;-->
  <!--        <div class="left-menu">-->
  <!--          <p class="tit-con-left"><strong>자료실</strong></p>-->
  <!--          <div class="ui-accordion-left-pnl">-->
  <!--            <ul>-->
  <!--              <li class="nav-item depth-1 folder">-->
  <!--                <a href="#" class="nav-text">동영상</a>-->
  <!--              </li>-->
  <!--              <li class="nav-item depth-1 folder selected">-->
  <!--                <a href="#" class="nav-text">문서</a>-->
  <!--                <ul class="nav-container depth-2" style="display: block;">-->
  <!--                  <li class="nav-item depth-2 page">-->
  <!--                    <a href="#" class="nav-text">전체</a>-->
  <!--                  </li>-->
  <!--                  <li class="nav-item depth-2 page selected">-->
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
  <!--                  <li class="nav-item depth-2 page">-->
  <!--                    <a href="#" class="nav-text">홈 화면 관리</a>-->
  <!--                  </li>-->
  <!--                </ul>-->
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
  <!--            <h1 class="tit-con-text">문서<span>홈 화면 관리</span></h1>-->
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
  <!--          <ul class="thumb-list x-document moving mgt-20 mgb-60">-->
  <!--            <li class="mgl-0">-->
  <!--              <div class="thumb">-->
  <!--                <button type="button" class="dbs-icon-move horizontal">-->
  <!--                  좌우 이동-->
  <!--                </button>-->
  <!--                <img src="../../assets/images/mov_01.jpg" alt="" />-->
  <!--              </div>-->
  <!--              <dl class="thumb-desc">-->
  <!--                &lt;!&ndash; TO DO 두줄 이상인 경우 말줄임으로 나오게 해주세요 &ndash;&gt;-->
  <!--                <dt>-->
  <!--                  <i class="icon-doc pptx">PPTX</i>DEWS/UI 발표 자료 제목이 긴-->
  <!--                  경우-->
  <!--                </dt>-->
  <!--                <dd>-->
  <!--                  3일전<span class="administer"-->
  <!--                    ><a href="#admin" class="font-accent-color">삭제</a></span-->
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
  <!--                <dt>-->
  <!--                  <i class="icon-doc docx">DOCX</i>DEWS/FD Git 자료 사용 매뉴얼-->
  <!--                </dt>-->
  <!--                <dd>-->
  <!--                  2019-11-21<span class="administer"-->
  <!--                    ><a href="#admin" class="font-accent-color">삭제</a></span-->
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
  <!--              </div>-->
  <!--              <dl class="thumb-desc">-->
  <!--                <dt><i class="icon-doc xlsx">XLSX</i>기초 데이터 설정 예시</dt>-->
  <!--                <dd>-->
  <!--                  2019-11-21<span class="administer"-->
  <!--                    ><a href="#admin" class="font-accent-color">삭제</a></span-->
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
  <!--              </div>-->
  <!--              <dl class="thumb-desc">-->
  <!--                <dt><i class="icon-doc pdf">PDF</i>DEWS/UI 가이드</dt>-->
  <!--                <dd>-->
  <!--                  2019-11-21<span class="administer"-->
  <!--                    ><a href="#admin" class="font-accent-color">삭제</a></span-->
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
  <!--              </div>-->
  <!--              <dl class="thumb-desc">-->
  <!--                <dt><i class="icon-doc hwp">HWP</i>기초 데이터 설정 예시</dt>-->
  <!--                <dd>-->
  <!--                  2019-11-21<span class="administer"-->
  <!--                    ><a href="#admin" class="font-accent-color">삭제</a></span-->
  <!--                  >-->
  <!--                </dd>-->
  <!--              </dl>-->
  <!--            </li>-->
  <!--          </ul>-->
  <!--          <div class="video-top">-->
  <!--            <p class="tit-con-sub">DEWS/J</p>-->
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
  <!--          <ul class="thumb-list x-document mgb-60">-->
  <!--            <li class="mgl-0">-->
  <!--              <div class="thumb">-->
  <!--                <button type="button" class="dbs-icon-move horizontal">-->
  <!--                  좌우 이동-->
  <!--                </button>-->
  <!--                <img src="../../assets/images/mov_01.jpg" alt="" />-->
  <!--              </div>-->
  <!--              <dl class="thumb-desc">-->
  <!--                &lt;!&ndash; TO DO 두줄 이상인 경우 말줄임으로 나오게 해주세요 &ndash;&gt;-->
  <!--                <dt>-->
  <!--                  <i class="icon-doc pptx">PPTX</i>DEWS/UI 발표 자료 제목이 긴-->
  <!--                  경우-->
  <!--                </dt>-->
  <!--                <dd>-->
  <!--                  3일전<span class="administer"-->
  <!--                    ><a href="#admin" class="font-accent-color">삭제</a></span-->
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
  <!--                <dt>-->
  <!--                  <i class="icon-doc docx">DOCX</i>DEWS/FD Git 자료 사용 매뉴얼-->
  <!--                </dt>-->
  <!--                <dd>-->
  <!--                  2019-11-21<span class="administer"-->
  <!--                    ><a href="#admin" class="font-accent-color">삭제</a></span-->
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
  <!--              </div>-->
  <!--              <dl class="thumb-desc">-->
  <!--                <dt><i class="icon-doc xlsx">XLSX</i>기초 데이터 설정 예시</dt>-->
  <!--                <dd>-->
  <!--                  2019-11-21<span class="administer"-->
  <!--                    ><a href="#admin" class="font-accent-color">삭제</a></span-->
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
  <!--              </div>-->
  <!--              <dl class="thumb-desc">-->
  <!--                <dt><i class="icon-doc pdf">PDF</i>DEWS/UI 가이드</dt>-->
  <!--                <dd>-->
  <!--                  2019-11-21<span class="administer"-->
  <!--                    ><a href="#admin" class="font-accent-color">삭제</a></span-->
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
  <!--              </div>-->
  <!--              <dl class="thumb-desc">-->
  <!--                <dt><i class="icon-doc hwp">HWP</i>기초 데이터 설정 예시</dt>-->
  <!--                <dd>-->
  <!--                  2019-11-21<span class="administer"-->
  <!--                    ><a href="#admin" class="font-accent-color">삭제</a></span-->
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
  <!--          <ul class="thumb-list x-document mgb-60">-->
  <!--            <li class="mgl-0">-->
  <!--              <div class="thumb">-->
  <!--                <button type="button" class="dbs-icon-move horizontal">-->
  <!--                  좌우 이동-->
  <!--                </button>-->
  <!--                <img src="../../assets/images/mov_01.jpg" alt="" />-->
  <!--              </div>-->
  <!--              <dl class="thumb-desc">-->
  <!--                &lt;!&ndash; TO DO 두줄 이상인 경우 말줄임으로 나오게 해주세요 &ndash;&gt;-->
  <!--                <dt>-->
  <!--                  <i class="icon-doc pptx">PPTX</i>DEWS/UI 발표 자료 제목이 긴-->
  <!--                  경우-->
  <!--                </dt>-->
  <!--                <dd>-->
  <!--                  3일전<span class="administer"-->
  <!--                    ><a href="#admin" class="font-accent-color">삭제</a></span-->
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
  <!--                <dt>-->
  <!--                  <i class="icon-doc docx">DOCX</i>DEWS/FD Git 자료 사용 매뉴얼-->
  <!--                </dt>-->
  <!--                <dd>-->
  <!--                  2019-11-21<span class="administer"-->
  <!--                    ><a href="#admin" class="font-accent-color">삭제</a></span-->
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
  <!--              </div>-->
  <!--              <dl class="thumb-desc">-->
  <!--                <dt><i class="icon-doc xlsx">XLSX</i>기초 데이터 설정 예시</dt>-->
  <!--                <dd>-->
  <!--                  2019-11-21<span class="administer"-->
  <!--                    ><a href="#admin" class="font-accent-color">삭제</a></span-->
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
  <!--              </div>-->
  <!--              <dl class="thumb-desc">-->
  <!--                <dt><i class="icon-doc pdf">PDF</i>DEWS/UI 가이드</dt>-->
  <!--                <dd>-->
  <!--                  2019-11-21<span class="administer"-->
  <!--                    ><a href="#admin" class="font-accent-color">삭제</a></span-->
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
  <!--              </div>-->
  <!--              <dl class="thumb-desc">-->
  <!--                <dt><i class="icon-doc hwp">HWP</i>기초 데이터 설정 예시</dt>-->
  <!--                <dd>-->
  <!--                  2019-11-21<span class="administer"-->
  <!--                    ><a href="#admin" class="font-accent-color">삭제</a></span-->
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
  <!--          <ul class="thumb-list x-document mgb-80">-->
  <!--            <li class="mgl-0">-->
  <!--              <div class="thumb">-->
  <!--                <button type="button" class="dbs-icon-move horizontal">-->
  <!--                  좌우 이동-->
  <!--                </button>-->
  <!--                <img src="../../assets/images/mov_01.jpg" alt="" />-->
  <!--              </div>-->
  <!--              <dl class="thumb-desc">-->
  <!--                &lt;!&ndash; TO DO 두줄 이상인 경우 말줄임으로 나오게 해주세요 &ndash;&gt;-->
  <!--                <dt>-->
  <!--                  <i class="icon-doc pptx">PPTX</i>DEWS/UI 발표 자료 제목이 긴-->
  <!--                  경우-->
  <!--                </dt>-->
  <!--                <dd>-->
  <!--                  3일전<span class="administer"-->
  <!--                    ><a href="#admin" class="font-accent-color">삭제</a></span-->
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
  <!--                <dt>-->
  <!--                  <i class="icon-doc docx">DOCX</i>DEWS/FD Git 자료 사용 매뉴얼-->
  <!--                </dt>-->
  <!--                <dd>-->
  <!--                  2019-11-21<span class="administer"-->
  <!--                    ><a href="#admin" class="font-accent-color">삭제</a></span-->
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
  <!--              </div>-->
  <!--              <dl class="thumb-desc">-->
  <!--                <dt><i class="icon-doc xlsx">XLSX</i>기초 데이터 설정 예시</dt>-->
  <!--                <dd>-->
  <!--                  2019-11-21<span class="administer"-->
  <!--                    ><a href="#admin" class="font-accent-color">삭제</a></span-->
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
  <!--              </div>-->
  <!--              <dl class="thumb-desc">-->
  <!--                <dt><i class="icon-doc pdf">PDF</i>DEWS/UI 가이드</dt>-->
  <!--                <dd>-->
  <!--                  2019-11-21<span class="administer"-->
  <!--                    ><a href="#admin" class="font-accent-color">삭제</a></span-->
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
  <!--              </div>-->
  <!--              <dl class="thumb-desc">-->
  <!--                <dt><i class="icon-doc hwp">HWP</i>기초 데이터 설정 예시</dt>-->
  <!--                <dd>-->
  <!--                  2019-11-21<span class="administer"-->
  <!--                    ><a href="#admin" class="font-accent-color">삭제</a></span-->
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
import DocHomeManage from '~/components/libraryDocHomeManage/index.vue';

@Component({
  layout: 'default',
  components: {
    DocHomeManage,
  },
  async fetch({ store }) {
    try {
      // 제품 목록을 조회
      await store.dispatch('document/docProducts');
    } catch (e) {
      console.error(e);
    }
  },
})
export default class extends Vue {}
</script>

<style lang="scss"></style>
