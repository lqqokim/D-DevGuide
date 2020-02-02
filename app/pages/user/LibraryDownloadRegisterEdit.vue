<template>
  <!--  <div class="dbs-container-wrap">-->
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
  <!--              <li class="nav-item depth-1 folder">-->
  <!--                <a href="#" class="nav-text">문서</a>-->
  <!--              </li>-->
  <!--              <li class="nav-item depth-1 folder selected">-->
  <!--                <a href="#" class="nav-text">다운로드</a>-->
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
  <!--            </ul>-->
  <!--          </div>-->
  <!--        </div>-->
  <!--        &lt;!&ndash; // 좌측메뉴 E &ndash;&gt;-->
  <!--        <div class="container-panel">-->
  <!--          <div class="view-top mgb-15">-->
  <!--            <h1 class="tit-con-text"><strong>다운로드</strong>등록/수정</h1>-->
  <!--          </div>-->
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
  <!--                  <div class="dim-select"></div>-->
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
  <!--                  disabled-->
  <!--                />-->
  <!--                <button-->
  <!--                  type="button"-->
  <!--                  class="dbs-icon-button file"-->
  <!--                  disabled-->
  <!--                ></button>-->
  <!--              </li>-->
  <!--            </ul>-->
  <!--          </div>-->
  <!--          <div class="movie-register-wrap mgb-10">-->
  <!--            <div class="movie-register-toastui">-->
  <!--              <TuiEditor height="500px"></TuiEditor>-->
  <!--            </div>-->
  <!--          </div>-->
  <!--          <div class="bg-gray add-file mgb-20">-->
  <!--            <button type="button" class="btn-attachment multi">-->
  <!--              Search Place 연동관련_첨부파일.zip<span class="capacity"-->
  <!--                >16KB</span-->
  <!--              ><span class="closed"></span>-->
  <!--            </button>-->
  <!--            <button type="button" class="btn-attachment multi">-->
  <!--              머지된 컬럼에 대하여 값 edit 시 전체 row에 적용_첨부파일.zip<span-->
  <!--                class="capacity"-->
  <!--                >5KB</span-->
  <!--              ><span class="closed"></span>-->
  <!--            </button>-->
  <!--            <button type="button" class="btn-attachment multi">-->
  <!--              celDynamicStyles에서 criteria 로 특정 컬럼만-->
  <!--              제외_첨부파일.zip<span class="capacity">16KB</span-->
  <!--              ><span class="closed"></span>-->
  <!--            </button>-->
  <!--            <button type="button" class="btn-attachment multi">-->
  <!--              첨부파일.zip<span class="capacity">16KB</span-->
  <!--              ><span class="closed"></span>-->
  <!--            </button>-->
  <!--            <button type="button" class="btn-attachment multi">-->
  <!--              celDynamicStyles_첨부파일.zip<span class="capacity">16KB</span-->
  <!--              ><span class="closed"></span>-->
  <!--            </button>-->
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
  <library-download-register-edit></library-download-register-edit>
</template>
<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator';
import libraryDownloadRegisterEdit from '@/components/libraryDownloadRegisterEdit/index.vue';

@Component({
  layout: 'default',
  components: {
    libraryDownloadRegisterEdit,
  },
  async fetch({ store, params }) {
    console.log('fetch :: ', params);
    try {
      if (!store.state.download.producs) {
        await store.dispatch('download/fileProducts');
      }

      if (!params.product) {
        await store.dispatch('download/productByCode', params.productCode);
      } else {
        await store.commit('download/selectedProduct', params.product);
      }

      await store.commit('download/initState', 'selectedFile');

      if (params.editType === 'edit') {
        if (!params.file) {
          await store.dispatch('download/fileDetailById', params._id);
        } else {
          await store.commit('download/selectedFile', params.file);
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
