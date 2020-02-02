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
  <!--            <h2 class="tit-con-text">문서<span>등록/수정</span></h2>-->
  <!--          </div>-->
  <!--          &lt;!&ndash; 단독일 때&ndash;&gt;-->
  <!--          <div class="gray-info-box mgb-20">-->
  <!--            <ul class="box-notice">-->
  <!--              <li>-->
  <!--                &lt;!&ndash; TO DO select box 선택 작업 &ndash;&gt;-->
  <!--                <div class="ui-select w-170">-->
  <!--                  <select title="품목형태" class="off" tabindex="-1">-->
  <!--                    <option value="0" selected="">master</option>-->
  <!--                    <option value="1">품목1</option>-->
  <!--                    <option value="2">품목2</option>-->
  <!--                  </select>-->
  <!--                  <button-->
  <!--                    type="button"-->
  <!--                    class="ui-select-btn"-->
  <!--                    title="품목형태 선택"-->
  <!--                  >-->
  <!--                    전체-->
  <!--                  </button>-->
  <!--                  &lt;!&ndash; 셀렉트박스  선택시 ui-select-wrap에 on 추가하면 display block 됨 &ndash;&gt;-->
  <!--                  <div class="ui-select-wrap">-->
  <!--                    <strong class="ui-select-tit" tabindex="0"-->
  <!--                      >품목 선택</strong-->
  <!--                    >-->
  <!--                    <div class="ui-select-options">-->
  <!--                      <button-->
  <!--                        type="button"-->
  <!--                        class="ui-select-opt selected"-->
  <!--                        value="품목1"-->
  <!--                      >-->
  <!--                        <b class="ui-select-txt">품목1</b>-->
  <!--                      </button>-->
  <!--                      <button type="button" class="ui-select-opt" value="품목2">-->
  <!--                        <b class="ui-select-txt">품목2</b>-->
  <!--                      </button>-->
  <!--                    </div>-->
  <!--                  </div>-->
  <!--                </div>-->
  <!--                <input type="text" class="inp-base w-680" placeholder="제목" />-->
  <!--              </li>-->
  <!--              <li>-->
  <!--                <label class="txt-right w-170" style="display: inline-block;"-->
  <!--                  >문서파일</label-->
  <!--                >-->
  <!--                <input-->
  <!--                  type="text"-->
  <!--                  class="inp-base"-->
  <!--                  style="width: 648px;"-->
  <!--                  placeholder="문서 파일 추가"-->
  <!--                />-->
  <!--                <button type="button" class="dbs-icon-button file"></button>-->
  <!--              </li>-->
  <!--            </ul>-->
  <!--          </div>-->
  <!--          <div class="movie-register-wrap mgb-20">-->
  <!--            <div class="movie-register-thumb document">-->
  <!--              <ul class="thumb-list">-->
  <!--                <li class="main-document">-->
  <!--                  &lt;!&ndash; To do 파일 등록 전 &ndash;&gt;-->
  <!--                  <p class="base-document-info">문서 파일을 드래그하여 추가</p>-->
  <!--                  &lt;!&ndash; To do 파일 등록수정 &ndash;&gt;-->
  <!--                  &lt;!&ndash;<div class="thumb">&ndash;&gt;-->
  <!--                  &lt;!&ndash;<img src="../../assets/images/mov_05.jpg" alt="" />&ndash;&gt;-->
  <!--                  &lt;!&ndash;</div>&ndash;&gt;-->
  <!--                  &lt;!&ndash;<dl class="thumb-desc">&ndash;&gt;-->
  <!--                  &lt;!&ndash;<dt class="ellipsis">&ndash;&gt;-->
  <!--                  &lt;!&ndash;DEWS/UI 컴포넌트 소개&ndash;&gt;-->
  <!--                  &lt;!&ndash;</dt>&ndash;&gt;-->
  <!--                  &lt;!&ndash;<dd>&ndash;&gt;-->
  <!--                  &lt;!&ndash;YouTube ID : badfasdb&ndash;&gt;-->
  <!--                  &lt;!&ndash;<span class="administer"&ndash;&gt;-->
  <!--                  &lt;!&ndash;&gt;<a href="#admin" class="font-accent-color"&ndash;&gt;-->
  <!--                  &lt;!&ndash;&gt;삭제</a&ndash;&gt;-->
  <!--                  &lt;!&ndash;&gt;</span&ndash;&gt;-->
  <!--                  &lt;!&ndash;&gt;&ndash;&gt;-->
  <!--                  &lt;!&ndash;</dd>&ndash;&gt;-->
  <!--                  &lt;!&ndash;</dl>&ndash;&gt;-->
  <!--                </li>-->
  <!--              </ul>-->
  <!--              &lt;!&ndash;<p class="drag-info">문서 파일을 드래그하여 추가</p>&ndash;&gt;-->
  <!--              &lt;!&ndash;<ul class="thumb-list">&ndash;&gt;-->
  <!--              &lt;!&ndash;<li class="drag-info">문서 파일을 드래그하여 추가</li>&ndash;&gt;-->
  <!--              &lt;!&ndash;</ul>&ndash;&gt;-->
  <!--            </div>-->
  <!--            <div class="movie-register-toastui">-->
  <!--              <TuiEditor></TuiEditor>-->
  <!--            </div>-->
  <!--          </div>-->
  <!--          <div class="btn-wrap mgb-80">-->
  <!--            <button-->
  <!--              type="button"-->
  <!--              class="dbs-icon-button ico-left small confirm"-->
  <!--            >-->
  <!--              확인-->
  <!--            </button>-->
  <!--            <button type="button" class="dbs-icon-button ico-left small cancel">-->
  <!--              취소-->
  <!--            </button>-->
  <!--          </div>-->
  <!--        </div>-->
  <!--      </div>-->
  <!--    </div>-->
  <!--  </div>-->
  <library-doc-register-edit></library-doc-register-edit>
</template>
<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator';
import LibraryDocRegisterEdit from '~/components/libraryDocRegisterEdit/index.vue';

@Component({
  layout: 'default',
  components: {
    LibraryDocRegisterEdit,
  },
  async fetch({ store, params }) {
    try {
      if (!store.state.document.producs) {
        await store.dispatch('document/docProducts');
      }

      // set selectedProduct by productCode
      await store.dispatch('document/productByCode', params.productCode);

      // init selectedDoc, selectedTemp
      await store.commit('document/initState', 'selectedDoc');
      await store.commit('document/initState', 'selectedTemp');

      if (params.editType === 'edit') {
        if (!params.doc) {
          await store.dispatch('document/docDetail', params._id);
        } else {
          await store.commit('document/selectedDoc', params.doc);
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
