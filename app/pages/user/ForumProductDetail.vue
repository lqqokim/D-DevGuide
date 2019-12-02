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
    <div class="dbs-container">
      <div class="content-wrap">
        <!-- 좌측메뉴 S -->
        <div class="left-menu">
          <p class="tit-con-left"><strong>질문/답변</strong></p>
          <div class="ui-accordion-left-pnl">
            <ul>
              <li class="nav-item depth-1 page">
                <a href="#" class="nav-text">내 질문 / 답변</a>
              </li>
              <li class="nav-item depth-1 folder selected">
                <a href="#" class="nav-text">제품별 질문 / 답변</a>
                <ul class="nav-container depth-2" style="display: block;">
                  <li class="nav-item depth-2 page">
                    <a href="#" class="nav-text">전체</a>
                  </li>
                  <li class="nav-item depth-2 page selected">
                    <a href="#" class="nav-text">DEWS/UI</a>
                  </li>
                  <li class="nav-item depth-2 page">
                    <a href="#" class="nav-text">DEWS J</a>
                  </li>
                  <li class="nav-item depth-2 page">
                    <a href="#" class="nav-text">DEWS Q</a>
                  </li>
                </ul>
              </li>
              <li class="nav-item depth-1 page">
                <a href="#" class="nav-text">제품관리</a>
              </li>
            </ul>
          </div>
        </div>
        <!-- // 좌측메뉴 E -->
        <div class="container-panel">
          <div class="view-top">
            <p class="tit-con-qna">DEWS / UI</p>
          </div>
          <div class="topic-row">
            <div class="topic-wrap">
              <div class="topic-avatar">
                <div class="avatar-circle qna-circle question">Q</div>
                <div class="avatar-circle result-circle finish">완료</div>
              </div>
              <div class="topic-body">
                <dl>
                  <dt class="topic-title">
                    CodePicker에서 코드 및 텍스트를 커스텀하게 설정할 수 있는
                    방법이 코드 및 텍스트를 커스텀하게 설정할 수 있는 방법이
                    있나요?
                  </dt>
                  <dd class="user-info mgt-15 mgb-30">
                    <span>2시간전</span><span>김고객(customer01)</span
                    ><span>조회 14</span>
                  </dd>
                  <dd class="qna-desc mgb-20">
                    폼 패널 내부의 코드 피커에서 코드와 텍스트를 변경하여
                    바인딩을 하고 싶습니다. 작성을 해보니 잘 되는 것 처럼
                    보이지만, 실제 동작 시에는 이후 프로세스에 문제가 발생하고
                    있습니다. 어떻게 처리해야할까요? 코드 피커에서 코드와
                    텍스트를 변경하여 바인딩을 하고 싶습니다. 작성을 해보니 작
                    되는 것 처럼 보이지만, 실제 동작 시에는 이후 프로세스에
                    문제가 발생하고 있습니다. 어떻게 처리해야할까요? 폼 패널
                    내부의 코드 피커에서 코드와 텍스트를 변경하여 바인딩을 하고
                    싶습니다. 작성을 해보니 작 되는 것 처럼 보이지만, 실제 동작
                    시에는 이후 프로세스에 문제가 발생하고 있습니다. 어떻게
                    처리해야할까요?
                  </dd>
                </dl>
                <button type="button" class="btn-attachment single mgb-20">
                  Search Place 연동관련_첨부파일.zip
                </button>
                <div class="comment-box mgt-20">
                  <p class="user-info mgb-5">
                    <span>2시간전</span><span>김고객(customer01)</span
                    ><span>조회 14</span>
                  </p>
                  <div class="comment qna-desc">
                    <div class="comment-desc">
                      코드 피커에서 코드와 텍스트를 변경하여 바인딩을 하고
                      싶습니다. 다른작성자의 코멘트입니다. 댓글이 긴 경우 두줄로
                      줄바꿈 합니다. 삭제버튼 위치는 고정입니다. 코드 피커에서
                      코드와 텍스트를 변경하여 바인딩을 하고 싶습니다.
                      다른작성자의 코멘트입니다. 댓글이 긴 경우 두줄로
                      줄바꿈합니다.
                    </div>
                    <a role="button" class="comment-delete">삭제</a>
                  </div>
                </div>
                <a role="button" class="comment-tool plus">
                  댓글추가
                </a>
              </div>
            </div>
            <div class="topic-button-wrap mgb-30">
              <span class="fr">
                <button
                  type="button"
                  class="dbs-icon-button ico-left small confirm-line"
                >
                  완료처리
                </button>
                <button
                  type="button"
                  class="dbs-icon-button ico-left small modify"
                >
                  수정</button
                ><button
                  type="button"
                  class="dbs-icon-button ico-left small delete"
                >
                  삭제
                </button>
              </span>
            </div>
          </div>
          <div class="view-top mgb-20">
            <h1 class="tit-con-small">
              답변 <span class="font-accent-color">2</span>
            </h1>
          </div>
          <div class="topic-row">
            <div class="topic-wrap">
              <div class="topic-avatar">
                <div class="avatar-circle qna-circle answer">A</div>
                <div class="avatar-circle result-circle progress">완료</div>
              </div>
              <div class="topic-body">
                <dl>
                  <dd class="user-info mgt-10 mgb-10">
                    <i class="badge-staff">STAFF</i
                    ><span>UI기술지원팀(dewsui01)</span
                    ><span>2019.11.15 15:12</span>
                  </dd>
                  <dd class="qna-desc mgb-15">
                    안녕하세요 DEWS UI 기술지원팀입니다. 주신 코드를 기반으로
                    제가 테스트 해보았을때 숫자 셀에 정상적으로 천단위 콤마가
                    찍혀서 보입니다. 아래 코드를 참고하세요. 문제가 해결되지
                    않으면 아래 코드를 기반으로 html로 간단한 샘플을 보내주시기
                    바랍니다. 감사합니다.
                  </dd>
                </dl>
                <pre>코드 블럭 영역입니다.</pre>
                <div class="comment-box mgt-20">
                  <p class="user-info mgb-5">
                    <span>2시간전</span><span>김고객(customer01)</span
                    ><span>조회 14</span>
                  </p>
                  <div class="comment qna-desc">
                    <div class="comment-desc">
                      코드 피커에서 코드와 텍스트를 변경하여 바인딩을 하고
                      싶습니다. 다른작성자의 코멘트입니다.
                    </div>
                    <a role="button" class="comment-delete">삭제</a>
                  </div>
                </div>
                <a role="button" class="comment-tool plus">
                  댓글추가
                </a>
              </div>
            </div>
            <div class="topic-button-wrap mgb-30">
              <span class="fr">
                <button
                  type="button"
                  class="dbs-icon-button ico-left small dislike"
                >
                  채택취소
                </button>
              </span>
            </div>
          </div>
          <div class="topic-row">
            <div class="topic-wrap">
              <div class="topic-avatar">
                <div class="avatar-circle qna-circle answer">A</div>
              </div>
              <div class="topic-body">
                <dl>
                  <dd class="user-info mgt-10 mgb-10">
                    <span>김답변(answer02)</span><span>2019.11.15 15:12</span>
                  </dd>
                  <dd class="qna-desc mgb-15">
                    안녕하세요. <br />주신 코드를 기반으로 제가 테스트
                    해보았을때 숫자 셀에 정상적으로 천단위 콤마가 찍혀서
                    보입니다. 아래 코드를 참고하세요. 문제가 해결되지 않으면
                    아래 코드를 기반으로 html로 간단한 샘플을 보내주시기
                    바랍니다. 감사합니다.
                  </dd>
                </dl>
                <div class="comment-box mgt-20">
                  <p class="user-info mgb-5">
                    <span>2시간전</span><span>김고객(customer01)</span
                    ><span>조회 14</span>
                  </p>
                  <div class="comment qna-desc">
                    <div class="comment-desc">
                      아.. 오른쪽에 위치한 라벨 영역을 말씀하시는거군요..
                      여기에는 넘버포맷을 지정할 수 없습니다.
                    </div>
                    <a role="button" class="comment-delete">삭제</a>
                  </div>
                </div>
                <p class="comment-tool">댓글 작성</p>
                <TuiEditor></TuiEditor>
                <div class="topic-button-wrap mgb-20">
                  <span class="fr">
                    <button
                      type="button"
                      class="dbs-icon-button ico-left small confirm"
                    >
                      확인
                    </button>
                    <button
                      type="button"
                      class="dbs-icon-button ico-left small cancel"
                    >
                      취소
                    </button>
                  </span>
                </div>
              </div>
            </div>
            <div class="topic-button-wrap mgb-30">
              <div class="fr">
                <button
                  type="button"
                  class="dbs-icon-button ico-left small like"
                >
                  채택하기
                </button>
              </div>
            </div>
          </div>
          <div class="tit-con-small mgb-10">답변작성</div>
          <TuiEditor></TuiEditor>
          <div class="bg-gray add-file mgt-10">
            <button type="button" class="btn-attachment multi">
              Search Place 연동관련_첨부파일.zip<span class="capacity"
                >16KB</span
              ><span class="closed"></span>
            </button>
            <button type="button" class="btn-attachment multi">
              머지된 컬럼에 대하여 값 edit 시 전체 row에 적용_첨부파일.zip<span
                >5KB</span
              ><span class="closed"></span>
            </button>
            <button type="button" class="btn-attachment multi">
              celDynamicStyles에서 criteria 로 특정 컬럼만
              제외_첨부파일.zip<span class="capacity">16KB</span
              ><span class="closed"></span>
            </button>
            <button type="button" class="btn-attachment multi">
              첨부파일.zip<span class="capacity">16KB</span
              ><span class="closed"></span>
            </button>
            <button type="button" class="btn-attachment multi">
              celDynamicStyles_첨부파일.zip<span class="capacity">16KB</span
              ><span class="closed"></span>
            </button>
          </div>
          <div class="topic-button-wrap mgb-55">
            <span class="fl">
              <button
                type="button"
                class="dbs-icon-button ico-left small upload"
              >
                파일첨부
              </button>
            </span>
            <span class="fr">
              <button
                type="button"
                class="dbs-icon-button ico-left small confirm"
              >
                확인
              </button>
              <button
                type="button"
                class="dbs-icon-button ico-left small cancel"
              >
                취소
              </button>
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator';
import ForumProductDetail from '~/components/forumProductDetail/index.vue';

@Component({
  layout: 'TypeA',
  components: {
    ForumProductDetail,
  },
})
export default class extends Vue {}
</script>

<style lang="scss"></style>
