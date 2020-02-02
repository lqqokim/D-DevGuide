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
  <!--          <div class="view-top">-->
  <!--            <h1 class="tit-con-text">문서<span>DEWS/FD</span></h1>-->
  <!--            <div class="register">-->
  <!--              <button type="button" class="btn-main blue small">-->
  <!--                추가-->
  <!--              </button>-->
  <!--            </div>-->
  <!--          </div>-->
  <!--          <ul class="thumb-list medium mgt-20">-->
  <!--            <li class="main-document">-->
  <!--              <div class="thumb">-->
  <!--                <img src="../../assets/images/mov_05.jpg" alt="" />-->
  <!--                <span class="btn-type btn-word">워드</span>-->
  <!--              </div>-->
  <!--              <dl class="thumb-desc">-->
  <!--                &lt;!&ndash; TO DO 두줄 이상인 경우 말줄임으로 나오게 해주세요 &ndash;&gt;-->
  <!--                <dt>-->
  <!--                  <i class="icon-new">N</i>2019-11-23 DEWS/UI 세미나 발표 자료-->
  <!--                  제목이 긴 경우-->
  <!--                </dt>-->
  <!--                <dd>2019-09-24<span class="hit">조회 1039</span></dd>-->
  <!--                <dd>-->
  <!--                  노휘겸(플랫폼개발1팀)-->
  <!--                  &lt;!&ndash; 관리자 일때 만 &ndash;&gt;<span class="administer"-->
  <!--                    ><a href="#modify">수정</a-->
  <!--                    ><a href="#admin" class="font-accent-color">삭제</a></span-->
  <!--                  >-->
  <!--                </dd>-->
  <!--              </dl>-->
  <!--            </li>-->
  <!--            <li class="main-document">-->
  <!--              <div class="thumb">-->
  <!--                <img src="../../assets/images/mov_05.jpg" alt="" />-->
  <!--                <span class="btn-type btn-hwp">한글</span>-->
  <!--              </div>-->
  <!--              <dl class="thumb-desc">-->
  <!--                <dt>2019-11-23 DEWS/UI 세미나 발표 자료 제목이 긴 경우</dt>-->
  <!--                <dd>2019-09-24<span class="hit">조회 1039</span></dd>-->
  <!--                <dd>-->
  <!--                  노휘겸(플랫폼개발1팀)-->
  <!--                  &lt;!&ndash; 관리자 일때 만 &ndash;&gt;<span class="administer"-->
  <!--                    ><a href="#modify">수정</a-->
  <!--                    ><a href="#admin" class="font-accent-color">삭제</a></span-->
  <!--                  >-->
  <!--                </dd>-->
  <!--              </dl>-->
  <!--            </li>-->
  <!--            <li class="main-document">-->
  <!--              <div class="thumb">-->
  <!--                <img src="../../assets/images/mov_05.jpg" alt="" />-->
  <!--                <span class="btn-type btn-pdf">PDF</span>-->
  <!--              </div>-->
  <!--              <dl class="thumb-desc">-->
  <!--                <dt>DEWS/FD Git 사용 매뉴얼</dt>-->
  <!--                <dd>2019-09-24<span class="hit">조회 1039</span></dd>-->
  <!--                <dd>-->
  <!--                  노휘겸(플랫폼개발1팀)-->
  <!--                  &lt;!&ndash; 관리자 일때 만 &ndash;&gt;<span class="administer"-->
  <!--                    ><a href="#modify">수정</a-->
  <!--                    ><a href="#admin" class="font-accent-color">삭제</a></span-->
  <!--                  >-->
  <!--                </dd>-->
  <!--              </dl>-->
  <!--            </li>-->
  <!--            <li class="main-document">-->
  <!--              <div class="thumb">-->
  <!--                <img src="../../assets/images/mov_05.jpg" alt="" />-->
  <!--                <span class="btn-type btn-pdf">PDF</span>-->
  <!--              </div>-->
  <!--              <dl class="thumb-desc">-->
  <!--                <dt>기초 데이터 설정 예시</dt>-->
  <!--                <dd>2019-09-24<span class="hit">조회 1039</span></dd>-->
  <!--                <dd>-->
  <!--                  노휘겸(플랫폼개발1팀)-->
  <!--                  &lt;!&ndash; 관리자 일때 만 &ndash;&gt;<span class="administer"-->
  <!--                    ><a href="#modify">수정</a-->
  <!--                    ><a href="#admin" class="font-accent-color">삭제</a></span-->
  <!--                  >-->
  <!--                </dd>-->
  <!--              </dl>-->
  <!--            </li>-->
  <!--            <li class="main-document">-->
  <!--              <div class="thumb">-->
  <!--                <img src="../../assets/images/mov_05.jpg" alt="" />-->
  <!--                <span class="btn-type btn-ppt">PPT</span>-->
  <!--              </div>-->
  <!--              <dl class="thumb-desc">-->
  <!--                <dt>-->
  <!--                  <i class="icon-new">N</i>2019-11-23 DEWS/UI 세미나 발표 자료-->
  <!--                  제목이 긴 경우-->
  <!--                </dt>-->
  <!--                <dd>2019-09-24<span class="hit">조회 1039</span></dd>-->
  <!--                <dd>-->
  <!--                  노휘겸(플랫폼개발1팀)-->
  <!--                  &lt;!&ndash; 관리자 일때 만 &ndash;&gt;<span class="administer"-->
  <!--                    ><a href="#modify">수정</a-->
  <!--                    ><a href="#admin" class="font-accent-color">삭제</a></span-->
  <!--                  >-->
  <!--                </dd>-->
  <!--              </dl>-->
  <!--            </li>-->
  <!--            <li class="main-document">-->
  <!--              <div class="thumb">-->
  <!--                <img src="../../assets/images/mov_05.jpg" alt="" />-->
  <!--                <span class="btn-type btn-excel">엑셀</span>-->
  <!--              </div>-->
  <!--              <dl class="thumb-desc">-->
  <!--                <dt>DEWS Front Designer 초기 설정</dt>-->
  <!--                <dd>2019-09-24<span class="hit">조회 1039</span></dd>-->
  <!--                <dd>-->
  <!--                  노휘겸(플랫폼개발1팀)-->
  <!--                  &lt;!&ndash; 관리자 일때 만 &ndash;&gt;<span class="administer"-->
  <!--                    ><a href="#modify">수정</a-->
  <!--                    ><a href="#admin" class="font-accent-color">삭제</a></span-->
  <!--                  >-->
  <!--                </dd>-->
  <!--              </dl>-->
  <!--            </li>-->
  <!--            <li class="main-document">-->
  <!--              <div class="thumb">-->
  <!--                <img src="../../assets/images/mov_05.jpg" alt="" />-->
  <!--                <span class="btn-type btn-word">워드</span>-->
  <!--              </div>-->
  <!--              <dl class="thumb-desc">-->
  <!--                <dt>DEWS/FD Git 사용 매뉴얼</dt>-->
  <!--                <dd>2019-09-24<span class="hit">조회 1039</span></dd>-->
  <!--                <dd>-->
  <!--                  노휘겸(플랫폼개발1팀)-->
  <!--                  &lt;!&ndash; 관리자 일때 만 &ndash;&gt;<span class="administer"-->
  <!--                    ><a href="#modify">수정</a-->
  <!--                    ><a href="#admin" class="font-accent-color">삭제</a></span-->
  <!--                  >-->
  <!--                </dd>-->
  <!--              </dl>-->
  <!--            </li>-->
  <!--            <li class="main-document">-->
  <!--              <div class="thumb">-->
  <!--                <img src="../../assets/images/mov_05.jpg" alt="" />-->
  <!--                <span class="btn-type btn-hwp">한글</span>-->
  <!--              </div>-->
  <!--              <dl class="thumb-desc">-->
  <!--                <dt>기초 데이터 설정 예시</dt>-->
  <!--                <dd>2019-09-24<span class="hit">조회 1039</span></dd>-->
  <!--                <dd>-->
  <!--                  노휘겸(플랫폼개발1팀)-->
  <!--                  &lt;!&ndash; 관리자 일때 만 &ndash;&gt;<span class="administer"-->
  <!--                    ><a href="#modify">수정</a-->
  <!--                    ><a href="#admin" class="font-accent-color">삭제</a></span-->
  <!--                  >-->
  <!--                </dd>-->
  <!--              </dl>-->
  <!--            </li>-->
  <!--          </ul>-->
  <!--          <div class="btn-wrap mgb-80">-->
  <!--            <button type="button" class="btn-main small">더보기</button>-->
  <!--          </div>-->
  <!--        </div>-->
  <!--      </div>-->
  <!--    </div>-->
  <!--  </div>-->
  <library-doc-list></library-doc-list>
</template>
<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator';
import LibraryDocList from '@/components/libraryDocList/index.vue';

@Component({
  layout: 'default',
  components: {
    LibraryDocList,
  },
  async fetch({ params, store }) {
    try {
      if (!params.product) {
        // 제품코드로 제품정보 조회
        await store.dispatch('document/productByCode', params.productCode);
      } else {
        await store.commit('document/selectedProduct', params.product);
      }

      // 제품에 대한 문서 목록 조회
      await store.dispatch('document/getDocsByProduct', {
        data: store.state.document.selectedProduct,
      });
    } catch (e) {
      console.error(e);
    }
  },
})
export default class extends Vue {}
</script>

<style lang="scss"></style>
