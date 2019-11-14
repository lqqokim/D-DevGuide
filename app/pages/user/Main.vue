<template>
  <div class="base-wrap">
    <div class="indx-top">
      <HeaderComp></HeaderComp>
      <div class="dbs-index-slider-wrap">
        <div class="indx-slider slide-01" style="display: block;">
          <div class="indx-slider-desc fl">
            <p class="slide-info">D-BUSINESS SCHOOL</p>
            <dl>
              <dt>
                <strong>국내 최초 경영교육</strong><br />시뮬레이션 프로그램
              </dt>
              <dd>
                실제 경영 사례에서 도출한 경영 문제와 시나리오를 기반으로
                문제해결을 시도하고 경쟁하는 롤플레잉 형태의 경영교육 시뮬레이션
                게임입니다.
              </dd>
            </dl>
            <div class="btn-wrap txt-left mgt-20">
              <button type="button" class="btn-main blue">
                자세히 보기
              </button>
            </div>
          </div>
          <a role="button" class="arrow prev"></a>
          <a role="button" class="arrow next"></a>
        </div>
        <div class="indx-slider slide-02">
          <div class="indx-slider-desc fl">
            <span class="info">D-BUSINESS SCHOOL</span>
            <dl>
              <dt>
                <strong>국내 최초 경영교육</strong><br />시뮬레이션 프로그램
              </dt>
              <dd>
                실제 경영 사례에서 도출한 경영 문제와 시나리오를 기반으로
                문제해결을 시도하고 경쟁하는 롤플레잉 형태의 경영교육 시뮬레이션
                게임입니다.
              </dd>
            </dl>
            <div class="btn-wrap txt-left mgt-20">
              <button type="button" class="btn-main blue">
                자세히 보기
              </button>
            </div>
          </div>
          <a role="button" class="arrow prev"></a>
          <a role="button" class="arrow next"></a>
        </div>
      </div>
      <div class="quick-folder">
        <ul>
          <li>
            <a href=""><strong>DEWS UI</strong>Project sub description</a>
          </li>
          <li>
            <a href=""><strong>DEWS J</strong>Project sub description</a>
          </li>
          <li>
            <a href=""><strong>DEWS FD</strong>Project sub description</a>
          </li>
          <li>
            <a href=""><strong>DEWS BD</strong>Project sub description</a>
          </li>
          <li>
            <a href=""><strong>DEWS Q</strong>Project sub description</a>
          </li>
          <li>
            <a href=""><strong>D_ERP</strong>Project sub description</a>
          </li>
        </ul>
      </div>
    </div>
    <section class="dbs-index-top">
      <div class="area-news-wrap">
        <div class="news-box">
          <p class="news-tit">새소식</p>
          <div class="news-rolling">
            <ol>
              <li>[DBS 정기 점검] DBS서비스 점검으로 인한 이용제한 안내</li>
            </ol>
            <span class="updated">2019.09.23</span>
          </div>
          <ul class="news-paging">
            <li class="news-paging-list">
              <a class="arrow-page left">이전</a>
            </li>
            <li class="news-paging-list">
              <a class="arrow-page right">다음</a>
            </li>
          </ul>
        </div>
      </div>
      <div class="dbs-indx-second">
        2번째 영역
      </div>
    </section>
    <section class="dbs-index-third">
      <div class="document illust01">
        <p class="info third">질문 / 답변</p>
        <dl>
          <dt>
            <strong>궁금한 내용은 개발자에게</strong><br />
            지금 만나보세요!
          </dt>
          <dd>
            오늘의 학습현황과 마이포럼 현황을 간단히 알려드릴게요!오늘의
            학습현황과 마이포럼 현황을 간단히 알려드릴게요! 오늘의 학습현황과
            마이포럼 현황을 간단히 알려드릴게요!
          </dd>
        </dl>
        <div class="btn-wrap mgt-20">
          <button type="button" class="btn-main blue">자세히 보기</button>
        </div>
      </div>
      <div class="document illust02">
        <p class="info third">개발자 문서</p>
        <dl>
          <dt>
            <strong>원하는 API는 DBS에서</strong><br />
            지금 만나보세요!
          </dt>
          <dd>
            오늘의 학습현황과 마이포럼 현황을 간단히 알려드릴게요!오늘의
            학습현황과 마이포럼 현황을 간단히 알려드릴게요! 오늘의 학습현황과
            마이포럼 현황을 간단히 알려드릴게요!
          </dd>
        </dl>
        <div class="btn-wrap mgt-20">
          <button type="button" class="btn-main blue">자세히 보기</button>
        </div>
      </div>
    </section>
    <section class="dbs-index-forth">
      <div class="forth-box-wrap">
        <div class="forth-box">
          <p class="info forth">LET'S DOWNLOAD</p>
          <dl>
            <dt><strong>문서를 다운받고</strong> 지식과 경험을 공유하세요!</dt>
            <dd>
              매일 1등이 바뀌는 명예의 전당! 김더존님은 몇 등인지 지금
              확인해보세요 1등이 바뀌는 명예의 전당! 김더존님은 몇 등인지
            </dd>
          </dl>
          <div class="btn-wrap mgt-20">
            <button type="button" class="btn-main line-blue">
              자세히 보기
            </button>
          </div>
        </div>
      </div>
    </section>
    <nuxt></nuxt>
    <FooterComp></FooterComp>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator';
import HeaderComp from '@/components/common/header/index.vue';
import FooterComp from '@/components/common/footer/index.vue';

@Component({
  components: {
    HeaderComp,
    FooterComp,
  },
  fetch(a) {
    // console.log('fetch', a);
  },
})
export default class CommonLayout extends Vue {}
</script>
<style lang="scss"></style>
