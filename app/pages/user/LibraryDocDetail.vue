<template>
  <!--  <div class="dbs-container-wrap">-->
  <!--    <div class="viewer-wrap">-->
  <!--      <div class="dbs-top-image-wrap movie">-->
  <!--        <div class="dbs-top-image">-->
  <!--          <dl>-->
  <!--            <dt>자료실</dt>-->
  <!--            <dd>-->
  <!--              DEWS 플랫폼에 포함된 제품들을 이용하여 개발을 진행할 때 도움이 될-->
  <!--              수 있는<br />-->
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
  <!--            <h2 class="tit-con-text">문서<span>DEWS/UI</span></h2>-->
  <!--          </div>-->
  <!--          <div class="player-container">-->
  <!--            <div class="document-area mgb-20">-->
  <!--              문서 영역-->
  <!--            </div>-->
  <!--            <div class="movie-clip-info">-->
  <!--              <div class="movie-title-area">-->
  <!--                <h3 class="tit-video mgb-10">-->
  <!--                  DEWS Studio 세미나 발표 자료-->
  <!--                </h3>-->
  <!--                <span class="fr">-->
  <!--                  <button-->
  <!--                    type="button"-->
  <!--                    class="dbs-icon-button ico-left small prev"-->
  <!--                  >-->
  <!--                    이전-->
  <!--                  </button>-->
  <!--                  <button-->
  <!--                    type="button"-->
  <!--                    class="dbs-icon-button ico-left small next"-->
  <!--                  >-->
  <!--                    다음-->
  <!--                  </button>-->
  <!--                </span>-->
  <!--              </div>-->
  <!--              <div class="movie-info mgb-20">-->
  <!--                <div class="user-info">-->
  <!--                  <span>3일전</span> <span class="hit">조회 300</span-->
  <!--                  ><span>문서형태 PPTX</span>-->
  <!--                  <span>노휘겸(플랫폼개발1팀)</span>-->
  <!--                </div>-->
  <!--                &lt;!&ndash; 관리자 일때 만 &ndash;&gt;-->
  <!--                <div class="administer">-->
  <!--                  <a href="#modify">수정</a-->
  <!--                  ><a href="#admin" class="font-accent-color">삭제</a>-->
  <!--                </div>-->
  <!--              </div>-->
  <!--              <div class="movie-body">-->
  <!--                <div class="tit-video-desc mgt-20 mgb-40">-->
  <!--                  <p>-->
  <!--                    2019년 11월 12일에 진행된 Dews Studio 세미나에서 DEWS/FD-->
  <!--                    세션 발표자료입니다.-->
  <!--                  </p>-->
  <!--                  <p>-->
  <!--                    내부회계관리제도 운영위원회에서 공지한 내부회계관리제도 설계-->
  <!--                    및 운영에 관한 개념체계 등 관련 파일입니다.-->
  <!--                  </p>-->
  <!--                  <p>-->
  <!--                    D_ERP DICS 내부회계관리솔루션 소개영상(2)<br />-->
  <!--                    [바로보기] <br />http://reurl.kr/1AA2EC0ERF-->
  <!--                    <br />[다운로드]<br />-->
  <!--                    http://reurl.kr/1AA2EC12YP-->
  <!--                  </p>-->
  <!--                </div>-->
  <!--              </div>-->
  <!--            </div>-->
  <!--          </div>-->
  <!--          <div class="topic-button-wrap mgb-40">-->
  <!--            <span class="fr"-->
  <!--              ><button-->
  <!--                type="button"-->
  <!--                class="dbs-icon-button ico-left small list"-->
  <!--              >-->
  <!--                목록-->
  <!--              </button>-->
  <!--            </span>-->
  <!--          </div>-->
  <!--          <h1 class="tit-con-sub mgb-15">DEWS/FD의 다른 문서</h1>-->
  <!--          <div class="box-gray-round mgb-80">-->
  <!--            <ul class="thumb-list s-document recommend-clip-area">-->
  <!--              <li>-->
  <!--                <div class="thumb">-->
  <!--                  <img src="../../assets/images/mov_01.jpg" alt="" />-->
  <!--                  <span class="btn-type btn-word">워드</span>-->
  <!--                </div>-->
  <!--                <dl class="thumb-desc">-->
  <!--                  &lt;!&ndash; TO DO 두줄 이상인 경우 말줄임으로 나오게 해주세요 &ndash;&gt;-->
  <!--                  <dt>-->
  <!--                    2019-11-23 DEWS/UI 세미나 영상 제목이 긴 경우-->
  <!--                  </dt>-->
  <!--                  <dd>3일전<span class="hit">조회 300</span></dd>-->
  <!--                  <dd>-->
  <!--                    노휘겸(플랫폼개발1팀)-->
  <!--                    <span class="administer"-->
  <!--                      ><a href="#modify">수정</a-->
  <!--                      ><a href="#admin" class="font-accent-color">삭제</a></span-->
  <!--                    >-->
  <!--                  </dd>-->
  <!--                </dl>-->
  <!--              </li>-->
  <!--              <li>-->
  <!--                <div class="thumb">-->
  <!--                  <img src="../../assets/images/mov_02.jpg" alt="" />-->
  <!--                  <span class="btn-type btn-hwp">한글</span>-->
  <!--                </div>-->
  <!--                <dl class="thumb-desc">-->
  <!--                  <dt>DEWS/UI 기초 교육 시리즈</dt>-->
  <!--                  <dd>2019-09-24<span class="hit">조회 1039</span></dd>-->
  <!--                </dl>-->
  <!--              </li>-->
  <!--              <li>-->
  <!--                <div class="thumb">-->
  <!--                  <img src="../../assets/images/mov_03.jpg" alt="" />-->
  <!--                  <span class="btn-type btn-ppt">PPT</span>-->
  <!--                </div>-->
  <!--                <dl class="thumb-desc">-->
  <!--                  <dt>DEWS 플랫폼 CM - UI편</dt>-->
  <!--                  <dd>2019-09-24<span class="hit">조회 1039</span></dd>-->
  <!--                </dl>-->
  <!--              </li>-->
  <!--              <li>-->
  <!--                <div class="thumb">-->
  <!--                  <img src="../../assets/images/mov_04.jpg" alt="" />-->
  <!--                  <span class="btn-type btn-excel">엑셀</span>-->
  <!--                </div>-->
  <!--                <dl class="thumb-desc">-->
  <!--                  <dt>2019 DEWS/UI 세미나 자료</dt>-->
  <!--                  <dd>2019-09-24<span class="hit">조회 1039</span></dd>-->
  <!--                </dl>-->
  <!--              </li>-->
  <!--            </ul>-->
  <!--            <p><a role="button" class="arrow prev"></a></p>-->
  <!--            <p><a role="button" class="arrow next"></a></p>-->
  <!--          </div>-->
  <!--        </div>-->
  <!--      </div>-->
  <!--    </div>-->
  <!--  </div>-->
  <library-doc-detail></library-doc-detail>
</template>
<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator';
import LibraryDocDetail from '@/components/libraryDocDetail/index.vue';

@Component({
  layout: 'default',
  components: {
    LibraryDocDetail,
  },
  async fetch({ store, params }) {
    try {
      // set selectedProduct by productCode
      await store.dispatch('document/productByCode', params.productCode);
      await store.dispatch('document/docsAllByProduct', params.productCode);

      if (!params.doc) {
        await store.dispatch('document/updateDocCount', params._id);
        await store.dispatch('document/docDetail', params._id);
      } else {
        await store.dispatch('document/updateDocCount', params._id);
        await store.commit('document/selectedDoc', params.doc);
        await store.commit('document/countIncrement');
      }
    } catch (e) {
      console.error(e);
    }
  },
})
export default class extends Vue {}
</script>
<!--@Doc.Action('docDetailById') docDetailByIdAction!: (arg0: string) => void;-->
<style lang="scss"></style>
