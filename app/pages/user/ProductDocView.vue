<template>
  <div class="dbs-container-wrap">
    <div class="viewer-wrap">
      <div class="dbs-top-image-wrap guide">
        <div class="dbs-top-image">
          <dl>
            <dt>개발자 가이드</dt>
            <dd>
              개발자가이드 서브 텍스트입니다. <br />
              개발자 가이드 서브 텍스트입니다 서브 텍스트입니다.
            </dd>
          </dl>
        </div>
      </div>
    </div>
    <div class="dbs-container mgb-0">
      <div class="qna-wrap">
        <div class="qna-menu">
          <p class="tit-con-left">DEWS UI</p>
          <ul class="ui-navi">
            <li class="selected"><a href="#">Document</a></li>
            <li class=""><a href="#">API</a></li>
          </ul>
          <div class="ui-tab-left-pnl">
            <ul>
              <li class="nav-item depth-1 folder"><a href="#">버튼</a></li>
              <li class="nav-item depth-1 folder">
                <a href="#">폼컨트롤러</a>
              </li>
              <li class="nav-item depth-1 folder"><a href="#">컨테이너</a></li>
              <li class="nav-item depth-1 folder">
                <a href="#" class="selected">데이터</a>
                <ul class="nav-container depth-2">
                  <li class="nav-item folder depth-2">
                    <a href="#" class="selected">그리드</a>
                    <ul class="nav-container depth-3">
                      <li class="nav-item page depth-3">
                        <a href="#" class="selected">그리드 사용법</a>
                      </li>
                      <li class="nav-item page depth-3">
                        <a href="#">에디터 사용법</a>
                      </li>
                      <li class="nav-item page depth-3">
                        <a href="#">포맷 사용법</a>
                      </li>
                      <li class="nav-item page depth-3">
                        <a href="#">그리드 이벤트</a>
                      </li>
                    </ul>
                  </li>
                  <li class="nav-item page depth-2"><a href="#">트리뷰</a></li>
                  <li class="nav-item page depth-2">
                    <a href="#">데이터소스</a>
                  </li>
                  <li class="nav-item page depth-2"><a href="#">차트</a></li>
                </ul>
              </li>
              <li class="nav-item depth-1 folder"><a href="#">기타</a></li>
              <li class="nav-item depth-1 folder">
                <a href="#">데이터 통신</a>
              </li>
              <li class="nav-item depth-1 folder"><a href="#">메인 기능</a></li>
            </ul>
          </div>
        </div>
        <div class="view-content">
          <div class="view-page-container">
            <div class="view-top">
              <p class="tit-con-qna">그리드 사용법</p>
              <div class="pst-button">
                <div class="srch">
                  <div class="srch-wrap-bar-small">
                    <div class="srch-wrap">
                      <input type="search" class="m-srch-bar" />
                      <button type="button" class="btn-search small">
                        search
                      </button>
                    </div>
                  </div>
                </div>
                <ul class="view-icon">
                  <li class="icon"><a href="" class="btn-edit"></a></li>
                  <li class="icon"><a href="" class="btn-share"></a></li>
                  <li class="icon"><a href="" class="btn-print"></a></li>
                </ul>
              </div>
              <div class="register">
                <button type="button" class="btn-main blue small">
                  등록하기
                </button>
              </div>
            </div>
            <div class="view-detail">
              <h1 class="tit-con-sub">그리드</h1>
              <p class="paragraph">
                그리드는 각 필드에 행 단위의 데이터가 저장되어 표 형태로
                보여지는 컨트롤입니다. 각 행에는 텍스트뿐만 아니라 다양한
                컨트롤들이 들어갈 수 있습니다.<br />
                <span class="p-caution"
                  >※ 사용가능한 컨트롤은 <a href="">그리드-에디터 사용법</a> 을
                  참고하시기 바랍니다.</span
                >
              </p>
              <h1 class="tit-con-sub">초기화 방법</h1>
              <p class="paragraph">
                <code>div</code> 태그에 <code>dews-ui-grid</code>클래스를
                지정하여 사용합니다.
              </p>
              <ul class="para-list">
                <li>HTML 초기화</li>
                <li>스크립트 초기화</li>
              </ul>
              <h1 class="tit-con-sub">사용방법</h1>
            </div>
          </div>
          <div class="view-page-side">
            <div class="view-page-side-content">
              <h1 class="tit-con-view">목차</h1>
              <div class="view-page-side-section">
                <ul>
                  <li class="selected"><a href="#">그리드</a></li>
                  <li>
                    <a href="#"><span>초기화 방법</span></a>
                    <ul class="bul-round mgt-5">
                      <li><a href="#">HTML 초기화</a></li>
                      <li class="selected"><a href="#">스크립트 초기화</a></li>
                    </ul>
                  </li>
                  <li>
                    <a href="#"><span>사용방법</span></a>
                    <ul class="bul-round mgt-5">
                      <li><a href="#">HTML</a></li>
                      <li><a href="#">Javascript</a></li>
                      <li><a href="#">Result</a></li>
                    </ul>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="side-button"></div>
  </div>
</template>
<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator';
import ProductDocView from '~/components/productDocView/index.vue';

@Component({
  layout: 'TypeA',
  components: {
    ProductDocView,
  },
})
export default class extends Vue {}
</script>

<style lang="scss"></style>
