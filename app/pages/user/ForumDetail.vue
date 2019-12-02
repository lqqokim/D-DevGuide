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
          <div class="view-top">
            <h2 class="tit-con-qna">Search Place 연동 관련 질문</h2>
            <div class="register">
              <button type="button" class="btn-main blue small">
                답변하기
              </button>
            </div>
          </div>
          <div class="qna-content-panel question">
            <div class="qna-avatar">
              <div class="circle">Q</div>
              <div class="name"><span>작성자</span>evan0528@gmail.com</div>
              <div class="date">2019.10.18 15:12</div>
            </div>
            <div class="qna-detail-content mgt-15">
              <p>
                안녕하세요. PIVOT GRID 개발을 하고 있습니다.<br />
                http://help.realgrid.com/tutorial/pivotinstall/ 를 참고하여<br />
                개발을 하고있는데 첨부파일 우측상단처럼 에러가 뜨는
                상황입니다.<br />
                보시다시피 평가판용 pivot그리드를 새로 다운받았으며
                라이센스또한<br />
                새로 받아서 진행중입니다. 라이센스에 도메인은 localhost 로<br />
                하였습니다. 도움부탁드립니다.
              </p>
              <div class="mgt-15">
                <a href="" class="btn-down" role="button"
                  ><span>Search Place 연동관련_첨부파일.zip</span></a
                >
              </div>
            </div>
          </div>
          <div class="qna-content-panel answer">
            <div class="qna-avatar">
              <div class="circle">A</div>
              <div class="name"><span>작성자</span>evan0528@gmail.com</div>
              <div class="date">2019.10.18 15:12</div>
            </div>
            <div class="qna-detail-content mgt-15">
              <p>
                안녕하세요 DEWS UI 기술지원팀입니다.<br />
                주신 코드를 기반으로 제가 테스트 해보았을때 숫자 셀에 정상적으로
                천단위 콤마가 찍혀서 보입니다.<br />
                아래 코드를 참고하세요. 문제가 해결되지 않으면 아래 코드를
                기반으로 html로 간단한 샘플을 보내주시기 바랍니다.<br />
                감사합니다.
              </p>
            </div>
          </div>
          <div class="qna-content-panel answer">
            <div class="qna-avatar">
              <div class="circle">A</div>
              <div class="name"><span>작성자</span>evan0528@gmail.com</div>
              <div class="date">2019.10.18 15:12</div>
            </div>
            <div class="qna-detail-content mgt-15">
              <p>
                아.. 오른쪽에 위치한 라벨 영역을 말씀하시는거군요..<br />
                여기에는 넘버포맷을 지정할 수 없습니다.<br />
                요약데이터가 표시되는 영역에만 numberFormat이 적용됩니다.<br />
                문의하신 내용에 도움 못드려 죄송합니다.<br />
                감사합니다.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator';
import ForumDetail from '~/components/forumDetail/index.vue';

@Component({
  layout: 'TypeA',
  components: {
    ForumDetail,
  },
})
export default class extends Vue {}
</script>

<style lang="scss"></style>
