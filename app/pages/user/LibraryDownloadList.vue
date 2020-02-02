<template>
  <download-list></download-list>
  <!--    <div class="dbs-container-wrap">-->
  <!--        <div class="dbs-top-image-wrap movie">-->
  <!--          <div class="dbs-top-image">-->
  <!--            <dl>-->
  <!--              <dt>자료실</dt>-->
  <!--              <dd>-->
  <!--                DEWS 플랫폼에 포함된 제품들을 이용하여 개발을 진행할 때 도움이 될-->
  <!--                수 있는 <br />-->
  <!--                동영상, 문서 , 파일 자료들을 제공합니다.-->
  <!--              </dd>-->
  <!--            </dl>-->
  <!--          </div>-->
  <!--      </div>-->
  <!--      <div class="dbs-container">-->
  <!--        <div class="content-wrap">-->
  <!--          &lt;!&ndash; 좌측메뉴 S &ndash;&gt;-->
  <!--          <div class="left-menu">-->
  <!--            <p class="tit-con-left"><strong>자료실</strong></p>-->
  <!--            <div class="ui-accordion-left-pnl">-->
  <!--              <ul>-->
  <!--                <li class="nav-item depth-1 folder">-->
  <!--                  <a href="#" class="nav-text">동영상</a>-->
  <!--                </li>-->
  <!--                <li class="nav-item depth-1 folder">-->
  <!--                  <a href="#" class="nav-text">문서</a>-->
  <!--                </li>-->
  <!--                <li class="nav-item depth-1 folder selected">-->
  <!--                  <a href="#" class="nav-text">다운로드</a>-->
  <!--                  <ul class="nav-container depth-2" style="display: block;">-->
  <!--                    <li class="nav-item depth-2 page">-->
  <!--                      <a href="#" class="nav-text">전체</a>-->
  <!--                    </li>-->
  <!--                    <li class="nav-item depth-2 page selected">-->
  <!--                      <a href="#" class="nav-text">DEWS/UI</a>-->
  <!--                    </li>-->
  <!--                    <li class="nav-item depth-2 page">-->
  <!--                      <a href="#" class="nav-text">DEWS J</a>-->
  <!--                    </li>-->
  <!--                    <li class="nav-item depth-2 page">-->
  <!--                      <a href="#" class="nav-text">DEWS/FD</a>-->
  <!--                    </li>-->
  <!--                    <li class="nav-item depth-2 page">-->
  <!--                      <a href="#" class="nav-text">DEWS/BC</a>-->
  <!--                    </li>-->
  <!--                    <li class="nav-item depth-2 page">-->
  <!--                      <a href="#" class="nav-text">제품 관리</a>-->
  <!--                    </li>-->
  <!--                    <li class="nav-item depth-2 page">-->
  <!--                      <a href="#" class="nav-text">홈 화면 관리</a>-->
  <!--                    </li>-->
  <!--                  </ul>-->
  <!--                </li>-->
  <!--              </ul>-->
  <!--            </div>-->
  <!--          </div>-->
  <!--          &lt;!&ndash; // 좌측메뉴 E &ndash;&gt;-->
  <!--          <div class="container-panel">-->
  <!--            <div class="view-top">-->
  <!--              <h1 class="tit-con-text">다운로드 DEWS/UI</h1>-->
  <!--              <div class="pst-button">-->
  <!--                <div class="srch">-->
  <!--                  <div class="srch-wrap-bar-small">-->
  <!--                    <div class="srch-wrap">-->
  <!--                      <input type="search" class="m-srch-bar" />-->
  <!--                      <button type="button" class="btn-search small">-->
  <!--                        search-->
  <!--                      </button>-->
  <!--                    </div>-->
  <!--                  </div>-->
  <!--                </div>-->
  <!--              </div>-->
  <!--              <div class="register">-->
  <!--                <button type="button" class="btn-main blue small">-->
  <!--                  추가-->
  <!--                </button>-->
  <!--              </div>-->
  <!--            </div>-->
  <!--            <div class="qna-wrap mgb-25">-->
  <!--              <div class="sorting-qna flex-end">-->
  <!--                <div class="sorting-list">-->
  <!--                  <div class="ui-select small">-->
  <!--                    <select title="품목형태" class="off" tabindex="-1">-->
  <!--                      <option value="0" selected="">최신순</option>-->
  <!--                      <option value="1">최신순</option>-->
  <!--                      <option value="2">추천순</option>-->
  <!--                    </select>-->
  <!--                    <button type="button" class="ui-select-btn">-->
  <!--                      5개씩 보기-->
  <!--                    </button>-->
  <!--                    &lt;!&ndash; 셀렉트박스  선택시 ui-select-wrap에 on 추가하면 display block 됨 &ndash;&gt;-->
  <!--                    <div class="ui-select-wrap">-->
  <!--                      <strong class="ui-select-tit" tabindex="0">목록순서</strong>-->
  <!--                      <div class="ui-select-options">-->
  <!--                        <button-->
  <!--                          type="button"-->
  <!--                          class="ui-select-opt selected"-->
  <!--                          value="5개씩 보기"-->
  <!--                        >-->
  <!--                          <b class="ui-select-txt">5개씩 보기</b>-->
  <!--                        </button>-->
  <!--                        <button-->
  <!--                          type="button"-->
  <!--                          class="ui-select-opt"-->
  <!--                          value="10개씩 보기"-->
  <!--                        >-->
  <!--                          <b class="ui-select-txt">10개씩 보기</b>-->
  <!--                        </button>-->
  <!--                        <button-->
  <!--                          type="button"-->
  <!--                          class="ui-select-opt selected"-->
  <!--                          value="15개씩 보기"-->
  <!--                        >-->
  <!--                          <b class="ui-select-txt">15개씩 보기</b>-->
  <!--                        </button>-->
  <!--                        <button-->
  <!--                          type="button"-->
  <!--                          class="ui-select-opt"-->
  <!--                          value="20개씩 보기"-->
  <!--                        >-->
  <!--                          <b class="ui-select-txt">20개씩 보기</b>-->
  <!--                        </button>-->
  <!--                      </div>-->
  <!--                    </div>-->
  <!--                  </div>-->
  <!--                  <div class="ui-select small">-->
  <!--                    <select title="품목형태" class="off" tabindex="-1">-->
  <!--                      <option value="0" selected="">최신순</option>-->
  <!--                      <option value="1">최신순</option>-->
  <!--                      <option value="2">추천순</option>-->
  <!--                    </select>-->
  <!--                    <button type="button" class="ui-select-btn">-->
  <!--                      최신순-->
  <!--                    </button>-->
  <!--                    &lt;!&ndash; 셀렉트박스  선택시 ui-select-wrap에 on 추가하면 display block 됨 &ndash;&gt;-->
  <!--                    <div class="ui-select-wrap">-->
  <!--                      <strong class="ui-select-tit" tabindex="0">목록순서</strong>-->
  <!--                      <div class="ui-select-options">-->
  <!--                        <button-->
  <!--                          type="button"-->
  <!--                          class="ui-select-opt selected"-->
  <!--                          value="최신순"-->
  <!--                        >-->
  <!--                          <b class="ui-select-txt">최신순</b>-->
  <!--                        </button>-->
  <!--                        <button-->
  <!--                          type="button"-->
  <!--                          class="ui-select-opt"-->
  <!--                          value="추천순"-->
  <!--                        >-->
  <!--                          <b class="ui-select-txt">추천순</b>-->
  <!--                        </button>-->
  <!--                      </div>-->
  <!--                    </div>-->
  <!--                  </div>-->
  <!--                </div>-->
  <!--              </div>-->
  <!--              <div class="qna-content">-->
  <!--                <ul class="dbs-list">-->
  <!--                  <li class="list-row">-->
  <!--                    <div class="library-download">-->
  <!--                      <dl class="text">-->
  <!--                        <a href="#11"-->
  <!--                          ><dt>-->
  <!--                            <strong-->
  <!--                              >DEWS Back-end Framework v1.0 (Compressed) DEWS-->
  <!--                              Back-end Framework v1.0 (Compressed) 제목이 긴 경우-->
  <!--                              입니다 제목이 긴 경우 입니다.</strong-->
  <!--                            >-->
  <!--                          </dt>-->
  <!--                          <dd>-->
  <!--                            DEWS/J Back-end Framework v1.0의 전체 바이너리 파일-->
  <!--                            입니다 내용이 길어진 경우 내용이 내용이 길어졌을 경우-->
  <!--                            입니다.<span class="more">더보기</span>-->
  <!--                          </dd>-->
  <!--                        </a>-->
  <!--                      </dl>-->
  <!--                      <p class="download-control">-->
  <!--                        <button-->
  <!--                          type="button"-->
  <!--                          class="dbs-icon-button ico-left small delete"-->
  <!--                        >-->
  <!--                          삭제-->
  <!--                        </button>-->
  <!--                      </p>-->
  <!--                    </div>-->
  <!--                    <div class="user-info mgt-15">-->
  <!--                      <span>2019-11-28</span><span>노휘겸(플랫폼개발1팀)</span>-->
  <!--                      <span>다운로드 320</span>-->
  <!--                      <span class="administer">-->
  <!--                        <a href="#modify">수정</a>-->
  <!--                        <a href="#admin" class="font-accent-color">삭제</a>-->
  <!--                      </span>-->
  <!--                    </div>-->
  <!--                  </li>-->
  <!--                  <li class="list-row">-->
  <!--                    <div class="library-download">-->
  <!--                      <dl class="text">-->
  <!--                        <a href="#11"-->
  <!--                          ><dt>-->
  <!--                            <strong-->
  <!--                              >DEWS Back-end Framework v1.0 (Compressed) DEWS-->
  <!--                              Back-end Framework v1.0 (Compressed) 제목이 긴 경우-->
  <!--                              입니다 제목이 긴 경우 입니다.</strong-->
  <!--                            >-->
  <!--                          </dt>-->
  <!--                          <dd>-->
  <!--                            DEWS/J Back-end Framework v1.0의 전체 바이너리 파일-->
  <!--                            입니다. 원하는 경로에 압축을 해제하고, 설정파일을-->
  <!--                            열어주세요. DEWS/J Back-end Framework v1.0의 전체-->
  <!--                            바이너리 파일 입니다. 설정파일을 열어주세요. DEWS/J-->
  <!--                            Back-end Framework v1.0의 전체 바이너리 파일 입니다.-->
  <!--                            DEWS/J Back-end Framew ork v1.0의 전체 바이너리 파일-->
  <!--                            입니다 전체 바이너리 파일 파일입니다. 원하는 경로에-->
  <!--                            압축을 해제하고 설정파일을 열어주세요.설정파일을-->
  <!--                            열어주세요 주세요요요. 더보기를 클릭하면 모든 내용을-->
  <!--                            전부 보여 줍니다, 접기를 클릭하면 내용이 한줄로-->
  <!--                            접힙니다.<span class="more">접기</span>-->
  <!--                          </dd>-->
  <!--                        </a>-->
  <!--                      </dl>-->
  <!--                      <p class="download-control">-->
  <!--                        <button-->
  <!--                          type="button"-->
  <!--                          class="dbs-icon-button ico-left small delete"-->
  <!--                        >-->
  <!--                          삭제-->
  <!--                        </button>-->
  <!--                      </p>-->
  <!--                    </div>-->
  <!--                    <div class="user-info mgt-15">-->
  <!--                      <span>2019-11-28</span><span>노휘겸(플랫폼개발1팀)</span>-->
  <!--                      <span>다운로드 320</span>-->
  <!--                      <span class="administer">-->
  <!--                        <a href="#modify">수정</a>-->
  <!--                        <a href="#admin" class="font-accent-color">삭제</a>-->
  <!--                      </span>-->
  <!--                    </div>-->
  <!--                  </li>-->
  <!--                  <li class="list-row">-->
  <!--                    <div class="library-download">-->
  <!--                      <dl class="text">-->
  <!--                        <a href="#11"-->
  <!--                          ><dt>-->
  <!--                            <strong-->
  <!--                              >DEWS Back-end Framework v1.0 (Compressed) DEWS-->
  <!--                              Back-end Framework v1.0v1.0v1.0 (Compressed)</strong-->
  <!--                            >-->
  <!--                          </dt>-->
  <!--                          <dd>-->
  <!--                            DEWS/J Back-end Framework v1.0의 전체 바이너리 파일-->
  <!--                            입니다 바이너리 파일 입니다 전체 바이너리 파일-->
  <!--                            입니다.<span class="more">더보기</span>-->
  <!--                          </dd>-->
  <!--                        </a>-->
  <!--                      </dl>-->
  <!--                      <p class="download-control">-->
  <!--                        <button-->
  <!--                          type="button"-->
  <!--                          class="dbs-icon-button ico-left small delete"-->
  <!--                        >-->
  <!--                          삭제-->
  <!--                        </button>-->
  <!--                      </p>-->
  <!--                    </div>-->
  <!--                    <div class="user-info mgt-15">-->
  <!--                      <span>2019-11-28</span><span>노휘겸(플랫폼개발1팀)</span>-->
  <!--                      <span>다운로드 320</span>-->
  <!--                      <span class="administer">-->
  <!--                        <a href="#modify">수정</a>-->
  <!--                        <a href="#admin" class="font-accent-color">삭제</a>-->
  <!--                      </span>-->
  <!--                    </div>-->
  <!--                  </li>-->
  <!--                  <li class="list-row">-->
  <!--                    <div class="library-download">-->
  <!--                      <dl class="text">-->
  <!--                        <a href="#11"-->
  <!--                          ><dt>-->
  <!--                            <strong-->
  <!--                              >DEWS Back-end Framework v1.0 (Compressed)</strong-->
  <!--                            >-->
  <!--                          </dt>-->
  <!--                          <dd>-->
  <!--                            DEWS/J Back-end Framework v1.0의 전체 바이너리 파일-->
  <!--                            입니다.<span class="more">더보기</span>-->
  <!--                          </dd>-->
  <!--                        </a>-->
  <!--                      </dl>-->
  <!--                      <p class="download-control">-->
  <!--                        <button-->
  <!--                          type="button"-->
  <!--                          class="dbs-icon-button ico-left small delete"-->
  <!--                        >-->
  <!--                          삭제-->
  <!--                        </button>-->
  <!--                      </p>-->
  <!--                    </div>-->
  <!--                    <div class="user-info mgt-15">-->
  <!--                      <span>2019-11-28</span><span>노휘겸(플랫폼개발1팀)</span>-->
  <!--                      <span>다운로드 320</span>-->
  <!--                      <span class="administer">-->
  <!--                        <a href="#modify">수정</a>-->
  <!--                        <a href="#admin" class="font-accent-color">삭제</a>-->
  <!--                      </span>-->
  <!--                    </div>-->
  <!--                  </li>-->
  <!--                  <li class="list-row">-->
  <!--                    <div class="library-download">-->
  <!--                      <dl class="text">-->
  <!--                        <a href="#11"-->
  <!--                          ><dt>-->
  <!--                            <strong-->
  <!--                              >DEWS Back-end Framework v1.0 (Compressed)</strong-->
  <!--                            >-->
  <!--                          </dt>-->
  <!--                          <dd>-->
  <!--                            DEWS/J Back-end Framework v1.0의 전체 바이너리 파일-->
  <!--                            입니다.<span class="more">더보기</span>-->
  <!--                          </dd>-->
  <!--                        </a>-->
  <!--                      </dl>-->
  <!--                      <p class="download-control">-->
  <!--                        <button-->
  <!--                          type="button"-->
  <!--                          class="dbs-icon-button ico-left small delete"-->
  <!--                        >-->
  <!--                          삭제-->
  <!--                        </button>-->
  <!--                      </p>-->
  <!--                    </div>-->
  <!--                    <div class="user-info mgt-15">-->
  <!--                      <span>2019-11-28</span><span>노휘겸(플랫폼개발1팀)</span>-->
  <!--                      <span>다운로드 320</span>-->
  <!--                      <span class="administer">-->
  <!--                        <a href="#modify">수정</a>-->
  <!--                        <a href="#admin" class="font-accent-color">삭제</a>-->
  <!--                      </span>-->
  <!--                    </div>-->
  <!--                  </li>-->
  <!--                </ul>-->
  <!--              </div>-->
  <!--            </div>-->
  <!--            <div class="paging mgb-80">-->
  <!--              <button-->
  <!--                type="button"-->
  <!--                class="btn-page-first disabled"-->
  <!--                title="처음으로"-->
  <!--              ></button>-->
  <!--              <button type="button" class="btn-page-prev" title="이전"></button>-->
  <!--              <a href="#" class="this-page">1</a>-->
  <!--              <a href="#">2</a>-->
  <!--              <a href="#">3</a>-->
  <!--              <a href="#">4</a>-->
  <!--              <a href="#">5</a>-->
  <!--              <button type="button" class="btn-page-next" title="다음"></button>-->
  <!--              <button-->
  <!--                type="button"-->
  <!--                class="btn-page-last"-->
  <!--                title="마지막으로"-->
  <!--              ></button>-->
  <!--            </div>-->
  <!--          </div>-->
  <!--        </div>-->
  <!--      </div>-->
  <!--    </div>-->
</template>
<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator';
import DownloadList from '~/components/libraryDownloadList/index.vue';

@Component({
  layout: 'default',
  components: {
    DownloadList,
  },
  async fetch({ params, store }) {
    try {
      if (!params.product) {
        // 제품코드로 제품정보 조회
        await store.dispatch('download/productByCode', params.productCode);
      } else {
        await store.commit('download/selectedProduct', params.product);
      }

      await store.dispatch('download/getFilesByProduct', {
        data: store.state.download.selectedProduct,
      });
    } catch (e) {}
  },
})
export default class extends Vue {}
</script>

<style lang="scss"></style>
