<template>
  <forum-list />
  <!--  <div class="dbs-container-wrap">-->
  <!--    <div class="dbs-top-image-wrap qna">-->
  <!--      <div class="dbs-top-image">-->
  <!--        <dl>-->
  <!--          <dt>질문 / 답변</dt>-->
  <!--          <dd>-->
  <!--            DEWS 플랫폼에 포함된 제품들을 이용한 개발 시 발생하는 이슈들에 대한-->
  <!--            <br />궁금증을 해결하실 수 있도록 지원해 드립니다.-->
  <!--          </dd>-->
  <!--        </dl>-->
  <!--      </div>-->
  <!--    </div>-->
  <!--    <div class="dbs-container mgb-0">-->
  <!--      <div class="content-wrap">-->
  <!--        <div class="left-menu">-->
  <!--          <p class="tit-con-left"><strong>개발자 문서 관리</strong></p>-->
  <!--          <div class="ui-accordion-left-pnl">-->
  <!--            <ul>-->
  <!--              <li class="nav-item depth-1 folder selected">-->
  <!--                <a href="#" class="nav-text">문서관리</a>-->
  <!--                <ul class="nav-container depth-2" style="display: block;">-->
  <!--                  <li class="nav-item depth-2 folder selected">-->
  <!--                    <a href="#" class="nav-text">DEWS/UI</a>-->
  <!--                    <ul class="nav-container depth-3" style="display: block;">-->
  <!--                      <li class="nav-item depth-3 page">-->
  <!--                        <a href="#" class="nav-text">작업 브랜치 관리</a>-->
  <!--                      </li>-->
  <!--                      <li class="nav-item depth-3 page selected">-->
  <!--                        <a href="#" class="nav-text">버전 관리</a>-->
  <!--                      </li>-->
  <!--                      <li class="nav-item depth-3 page">-->
  <!--                        <a href="#" class="nav-text">공지사항 관리</a>-->
  <!--                      </li>-->
  <!--                    </ul>-->
  <!--                  </li>-->
  <!--                  <li class="nav-item depth-2 folder selected">-->
  <!--                    <a href="#" class="nav-text">DEWS J</a>-->
  <!--                    <ul class="nav-container depth-3" style="display: block;">-->
  <!--                      <li class="nav-item depth-3 page">-->
  <!--                        <a href="#" class="nav-text">작업 브랜치 관리</a>-->
  <!--                      </li>-->
  <!--                      <li class="nav-item depth-3 page">-->
  <!--                        <a href="#" class="nav-text">버전 관리</a>-->
  <!--                      </li>-->
  <!--                      <li class="nav-item depth-3 page">-->
  <!--                        <a href="#" class="nav-text">공지사항 관리</a>-->
  <!--                      </li>-->
  <!--                    </ul>-->
  <!--                  </li>-->
  <!--                  <li class="nav-item depth-2 folder selected">-->
  <!--                    <a href="#" class="nav-text">DEWS Q</a>-->
  <!--                    <ul class="nav-container depth-3" style="display: block;">-->
  <!--                      <li class="nav-item depth-3 page">-->
  <!--                        <a href="#" class="nav-text">작업 브랜치 관리</a>-->
  <!--                      </li>-->
  <!--                      <li class="nav-item depth-3 page">-->
  <!--                        <a href="#" class="nav-text">버전 관리</a>-->
  <!--                      </li>-->
  <!--                      <li class="nav-item depth-3 page">-->
  <!--                        <a href="#" class="nav-text">공지사항 관리</a>-->
  <!--                      </li>-->
  <!--                    </ul>-->
  <!--                  </li>-->
  <!--                </ul>-->
  <!--              </li>-->
  <!--              <li class="nav-item depth-1 page selected">-->
  <!--                <a href="#" class="nav-text">제품관리</a>-->
  <!--              </li>-->
  <!--            </ul>-->
  <!--          </div>-->
  <!--        </div>-->
  <!--        <div class="container-panel">-->
  <!--          <div class="view-top bdr-bot-none">-->
  <!--            <h1 class="tit-con-text">DEWS UI</h1>-->
  <!--            <div class="pst-button">-->
  <!--              <div class="srch">-->
  <!--                <button type="button" class="btn-search small">-->
  <!--                  search-->
  <!--                </button>-->
  <!--              </div>-->
  <!--            </div>-->
  <!--            <div class="register">-->
  <!--              <button type="button" class="btn-main blue small">-->
  <!--                질문 등록하기-->
  <!--              </button>-->
  <!--            </div>-->
  <!--          </div>-->
  <!--          <div class="tbl-wrap">-->
  <!--            <table class="tbl-base">-->
  <!--              <colgroup>-->
  <!--                <col style="width: auto;" />-->
  <!--                <col style="width: 100px;" />-->
  <!--                <col style="width: 180px;" />-->
  <!--                <col style="width: 70px;" />-->
  <!--              </colgroup>-->
  <!--              <thead>-->
  <!--                <tr>-->
  <!--                  <th scope="col">질문</th>-->
  <!--                  <th scope="col">시용자</th>-->
  <!--                  <th scope="col">작성일</th>-->
  <!--                  <th scope="col">답변</th>-->
  <!--                </tr>-->
  <!--              </thead>-->
  <!--              <tbody>-->
  <!--                <tr>-->
  <!--                  <td class="txt-left">-->
  <!--                    <a href="">그리드에 대한 질문드립니다.</a>-->
  <!--                  </td>-->
  <!--                  <td class="txt-center">evan0528</td>-->
  <!--                  <td class="txt-center">2019.08.15 15:12</td>-->
  <!--                  <td class="txt-center">3</td>-->
  <!--                </tr>-->
  <!--                <tr>-->
  <!--                  <td class="txt-left">-->
  <!--                    <a href="">Search Place 연동 관련 질문</a>-->
  <!--                  </td>-->
  <!--                  <td class="txt-center">evan0528</td>-->
  <!--                  <td class="txt-center">2019.08.05 12:50</td>-->
  <!--                  <td class="txt-center">8</td>-->
  <!--                </tr>-->
  <!--                <tr>-->
  <!--                  <td class="txt-left">-->
  <!--                    <a href=""-->
  <!--                      >iOS환경에서 오픈메인 탭 페이지가 GET/POST 데이터를-->
  <!--                      변조하는지 궁금합니다.</a-->
  <!--                    >-->
  <!--                  </td>-->
  <!--                  <td class="txt-center">evan0528</td>-->
  <!--                  <td class="txt-center">2019.08.02 15:12</td>-->
  <!--                  <td class="txt-center">5</td>-->
  <!--                </tr>-->
  <!--                <tr>-->
  <!--                  <td class="txt-left">-->
  <!--                    <a href="">안드로이드에서 사이트 스타일 깨지는 문제</a>-->
  <!--                  </td>-->
  <!--                  <td class="txt-center">evan0528</td>-->
  <!--                  <td class="txt-center">2019.08.02 12:50</td>-->
  <!--                  <td class="txt-center">2</td>-->
  <!--                </tr>-->
  <!--                <tr>-->
  <!--                  <td class="txt-left">-->
  <!--                    <a href=""-->
  <!--                      >간편결제 연동 과정에서 curl을 어떻게 설정해줘야 하는지-->
  <!--                      궁금합니다.</a-->
  <!--                    >-->
  <!--                  </td>-->
  <!--                  <td class="txt-center">evan0528</td>-->
  <!--                  <td class="txt-center">2019.08.01 15:12</td>-->
  <!--                  <td class="txt-center">0</td>-->
  <!--                </tr>-->
  <!--                <tr>-->
  <!--                  <td class="txt-left">-->
  <!--                    <a href="">그리드에 대한 질문드립니다.</a>-->
  <!--                  </td>-->
  <!--                  <td class="txt-center">evan0528</td>-->
  <!--                  <td class="txt-center">2019.08.15 15:12</td>-->
  <!--                  <td class="txt-center">3</td>-->
  <!--                </tr>-->
  <!--                <tr>-->
  <!--                  <td class="txt-left">-->
  <!--                    <a href=""-->
  <!--                      >iOS환경에서 오픈메인 탭 페이지가 GET/POST 데이터를-->
  <!--                      변조하는지 궁금합니다.</a-->
  <!--                    >-->
  <!--                  </td>-->
  <!--                  <td class="txt-center">evan0528</td>-->
  <!--                  <td class="txt-center">2019.08.02 15:12</td>-->
  <!--                  <td class="txt-center">5</td>-->
  <!--                </tr>-->
  <!--                <tr>-->
  <!--                  <td class="txt-left">-->
  <!--                    <a href="">안드로이드에서 사이트 스타일 깨지는 문제</a>-->
  <!--                  </td>-->
  <!--                  <td class="txt-center">evan0528</td>-->
  <!--                  <td class="txt-center">2019.08.02 12:50</td>-->
  <!--                  <td class="txt-center">2</td>-->
  <!--                </tr>-->
  <!--                <tr>-->
  <!--                  <td class="txt-left">-->
  <!--                    <a href=""-->
  <!--                      >간편결제 연동 과정에서 curl을 어떻게 설정해줘야 하는지-->
  <!--                      궁금합니다.</a-->
  <!--                    >-->
  <!--                  </td>-->
  <!--                  <td class="txt-center">evan0528</td>-->
  <!--                  <td class="txt-center">2019.08.01 15:12</td>-->
  <!--                  <td class="txt-center">0</td>-->
  <!--                </tr>-->
  <!--                <tr>-->
  <!--                  <td class="txt-left">-->
  <!--                    <a href="">그리드에 대한 질문드립니다.</a>-->
  <!--                  </td>-->
  <!--                  <td class="txt-center">evan0528</td>-->
  <!--                  <td class="txt-center">2019.08.15 15:12</td>-->
  <!--                  <td class="txt-center">3</td>-->
  <!--                </tr>-->
  <!--              </tbody>-->
  <!--            </table>-->
  <!--          </div>-->
  <!--          <div class="btn-wrap mgt-30 mgb-60">-->
  <!--            <button class="btn-main small">더보기</button>-->
  <!--          </div>-->
  <!--        </div>-->
  <!--      </div>-->
  <!--    </div>-->
  <!--  </div>-->
</template>
<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator';
import ForumList from '~/components/forumList/index.vue';

@Component({
  layout: 'default',
  components: {
    ForumList,
  },
  async fetch({ store, params }) {
    try {
      if (params.productCode === 'ALL') {
        await store.commit('forum/selectedProduct', {
          productCode: 'ALL',
          productName: '전체',
          staffs: [],
        });

        if (params.postType === undefined) {
          await store.dispatch('forum/getPostsByProduct', {
            data: store.state.forum.selectedProduct,
          });
        }

        return;
      }

      if (!params.product) {
        await store.dispatch('forum/productByCode', params.productCode);
      } else {
        await store.commit('forum/selectedProduct', params.product);
      }

      await store.dispatch('forum/getPostsByProduct', {
        data: store.state.forum.selectedProduct,
      });
    } catch (e) {}
  },
})
export default class extends Vue {}
</script>
<style lang="scss"></style>
