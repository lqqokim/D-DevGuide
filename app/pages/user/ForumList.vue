<template>
  <div class="dbs-container-wrap">
    <div class="viewer-wrap">
      <div class="dbs-top-image-wrap qna">
        <div class="dbs-top-image">
          <dl>
            <dt>질문 / 답변</dt>
            <dd>
              질문답변 서브 텍스트입니다. <br />
              질문답변 서브 텍스트입니다 서브 텍스트입니다.
            </dd>
          </dl>
        </div>
      </div>
    </div>
    <div class="dbs-container mgb-0">
      <div class="content-wrap">
        <div class="left-menu">
          <p class="tit-con-left">질문 / 답변</p>
          <div class="ui-accordion-left-pnl">
            <ul>
              <li class="nav-item depth-1"><a href="#">나의 문의내역</a></li>
              <li class="nav-item depth-1 folder">
                <a href="#">나의 문의내역2</a>
              </li>
              <li class="nav-item depth-1 folder">
                <a href="#" class="selected">제품별 통합질문</a>
                <ul class="nav-container depth-2">
                  <li class="nav-item page depth-2">
                    <a href="#" class="selected">DEWS UI</a>
                  </li>
                  <li class="nav-item page depth-2">
                    <a href="#">DEWS J</a>
                  </li>
                  <li class="nav-item page depth-2">
                    <a href="#">DEWS Q</a>
                  </li>
                  <li class="nav-item page depth-2">
                    <a href="#">DEWS Frontend Designer</a>
                  </li>
                  <li class="nav-item page depth-2">
                    <a href="#">DEWS Backend Designer</a>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
        <div class="container-panel">
          <div class="view-top bdr-bot-none">
            <h2 class="tit-con-qna">DEWS UI</h2>
            <div class="pst-button">
              <div class="srch">
                <button type="button" class="btn-search small">
                  search
                </button>
              </div>
            </div>
            <div class="register">
              <button type="button" class="btn-main blue small">
                질문 등록하기
              </button>
            </div>
          </div>
          <div class="tbl-wrap">
            <table class="tbl-base">
              <colgroup>
                <col style="width: auto;" />
                <col style="width: 100px;" />
                <col style="width: 180px;" />
                <col style="width: 70px;" />
              </colgroup>
              <thead>
                <tr>
                  <th scope="col">질문</th>
                  <th scope="col">시용자</th>
                  <th scope="col">작성일</th>
                  <th scope="col">답변</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td class="txt-left">
                    <a href="">그리드에 대한 질문드립니다.</a>
                  </td>
                  <td class="txt-center">evan0528</td>
                  <td class="txt-center">2019.08.15 15:12</td>
                  <td class="txt-center">3</td>
                </tr>
                <tr>
                  <td class="txt-left">
                    <a href="">Search Place 연동 관련 질문</a>
                  </td>
                  <td class="txt-center">evan0528</td>
                  <td class="txt-center">2019.08.05 12:50</td>
                  <td class="txt-center">8</td>
                </tr>
                <tr>
                  <td class="txt-left">
                    <a href=""
                      >iOS환경에서 오픈메인 탭 페이지가 GET/POST 데이터를
                      변조하는지 궁금합니다.</a
                    >
                  </td>
                  <td class="txt-center">evan0528</td>
                  <td class="txt-center">2019.08.02 15:12</td>
                  <td class="txt-center">5</td>
                </tr>
                <tr>
                  <td class="txt-left">
                    <a href="">안드로이드에서 사이트 스타일 깨지는 문제</a>
                  </td>
                  <td class="txt-center">evan0528</td>
                  <td class="txt-center">2019.08.02 12:50</td>
                  <td class="txt-center">2</td>
                </tr>
                <tr>
                  <td class="txt-left">
                    <a href=""
                      >간편결제 연동 과정에서 curl을 어떻게 설정해줘야 하는지
                      궁금합니다.</a
                    >
                  </td>
                  <td class="txt-center">evan0528</td>
                  <td class="txt-center">2019.08.01 15:12</td>
                  <td class="txt-center">0</td>
                </tr>
                <tr>
                  <td class="txt-left">
                    <a href="">그리드에 대한 질문드립니다.</a>
                  </td>
                  <td class="txt-center">evan0528</td>
                  <td class="txt-center">2019.08.15 15:12</td>
                  <td class="txt-center">3</td>
                </tr>
                <tr>
                  <td class="txt-left">
                    <a href=""
                      >iOS환경에서 오픈메인 탭 페이지가 GET/POST 데이터를
                      변조하는지 궁금합니다.</a
                    >
                  </td>
                  <td class="txt-center">evan0528</td>
                  <td class="txt-center">2019.08.02 15:12</td>
                  <td class="txt-center">5</td>
                </tr>
                <tr>
                  <td class="txt-left">
                    <a href="">안드로이드에서 사이트 스타일 깨지는 문제</a>
                  </td>
                  <td class="txt-center">evan0528</td>
                  <td class="txt-center">2019.08.02 12:50</td>
                  <td class="txt-center">2</td>
                </tr>
                <tr>
                  <td class="txt-left">
                    <a href=""
                      >간편결제 연동 과정에서 curl을 어떻게 설정해줘야 하는지
                      궁금합니다.</a
                    >
                  </td>
                  <td class="txt-center">evan0528</td>
                  <td class="txt-center">2019.08.01 15:12</td>
                  <td class="txt-center">0</td>
                </tr>
                <tr>
                  <td class="txt-left">
                    <a href="">그리드에 대한 질문드립니다.</a>
                  </td>
                  <td class="txt-center">evan0528</td>
                  <td class="txt-center">2019.08.15 15:12</td>
                  <td class="txt-center">3</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="btn-wrap mgt-30 mgb-60">
            <button class="btn-main small">더보기</button>
          </div>
        </div>
      </div>
    </div>
    <div class="side-button"></div>
  </div>
</template>
<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator';
import ForumList from '~/components/forumList/index.vue';

@Component({
  layout: 'TypeA',
  components: {
    ForumList,
  },
})
export default class extends Vue {}
</script>
<style lang="scss"></style>
