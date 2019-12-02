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
                  <li class="nav-item depth-2 page">
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
              <li class="nav-item depth-1 page selected">
                <a href="#" class="nav-text">제품관리</a>
              </li>
            </ul>
          </div>
        </div>
        <div class="container-panel">
          <div class="view-top">
            <h2 class="tit-con-text">제품관리</h2>
            <div class="pst-rbtn">
              <button type="button" class="btn-sub-large">
                추가
              </button>
              <button type="button" class="btn-sub-large">
                삭제
              </button>
            </div>
          </div>
          <div class="product-manage-wrap mgb-80">
            <div class="left-proc-menu">
              <div class="dbs-visual-wrap manage">
                <a href="dews-ui.html" class="dbs-visual-list">
                  <dl class="dews-ui">
                    <dt>DEWS UI</dt>
                    <dd>DEWS Front-end UI Framework</dd>
                  </dl>
                  <p class="icon"><span>UI</span></p>
                  <p class="btn-move">이동</p>
                </a>
                <a href="dews-j.html" class="dbs-visual-list">
                  <dl class="dews-j">
                    <dt>DEWS J</dt>
                    <dd>DEWS Front-end UI Framework</dd>
                  </dl>
                  <p class="icon"><span>J</span></p>
                  <p class="btn-move">이동</p>
                </a>
                <a href="dews-fd.html" class="dbs-visual-list"
                  ><dl class="dews-fd">
                    <dt>DEWS FD</dt>
                    <dd>Project Sub Description</dd>
                  </dl>
                  <p class="icon"><span>FD</span></p>
                  <p class="btn-move">이동</p></a
                >
                <a href="dews-bd.html" class="dbs-visual-list"
                  ><dl class="dews-bd">
                    <dt>DEWS BD</dt>
                    <dd>Project Sub Description</dd>
                  </dl>
                  <p class="icon"><span>BD</span></p>
                  <p class="btn-move">이동</p></a
                >
                <a href="dews-ui.html" class="dbs-visual-list">
                  <dl class="dews-ui">
                    <dt>DEWS UI</dt>
                    <dd>DEWS Front-end UI Framework</dd>
                  </dl>
                  <p class="icon"><span>UI</span></p>
                  <p class="btn-move">이동</p>
                </a>
              </div>
            </div>
            <div class="right-proc-content">
              <h2 class="tit-con-icon-title icon-title dews">제품정보</h2>
              <div class="tbl-wrap mgb-60">
                <table class="tbl-write tbl-fixed">
                  <colgroup>
                    <col style="width: 154px;" />
                    <col style="width: auto;" />
                  </colgroup>
                  <tbody>
                    <tr>
                      <th scope="row">제품명</th>
                      <td>
                        <input
                          type="text"
                          class="inp-base w-100p"
                          placeholder="DEWS/UI"
                        />
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">제품코드</th>
                      <td>
                        <input
                          type="text"
                          class="inp-base w-100p"
                          placeholder="UI"
                        />
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">제품설명</th>
                      <td>
                        <input
                          type="text"
                          class="inp-base w-100p"
                          placeholder="DEWS Front-end UI Framework"
                        />
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div class="position-wrap">
                <h2 class="tit-con-icon-title icon-title manager">
                  관리자 정보
                </h2>
                <div class="pst-rbtn">
                  <button
                    type="button"
                    class="dbs-icon-button ico-left small plus"
                  >
                    추가
                  </button>
                </div>
              </div>
              <div class="tbl-wrap mgb-20">
                <table class="tbl-write-ver tbl-fixed">
                  <colgroup>
                    <col style="width: auto;" />
                    <col style="width: 95px;" />
                  </colgroup>
                  <thead>
                    <tr>
                      <th>이름(아이디)</th>
                      <th>삭제</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>노휘겸(whistle)</td>
                      <td>삭제</td>
                    </tr>
                    <tr>
                      <td>정일영(jiy)</td>
                      <td>삭제</td>
                    </tr>
                    <tr>
                      <td>전병철(jbc)</td>
                      <td>삭제</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div class="gray-info-box mgt-10 mgb-20">
                <p>
                  직원 사용자 중 스태프로 추가된 사람에 한해 질문의 완료 처리
                  가능하며 작성한 답변에
                  <span class="badge-staff">STAFF</span> 배지가 출력됩니다.
                </p>
              </div>
              <div class="btn-wrap-sub">
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
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator';
import ForumManage from '~/components/forumManage/index.vue';

@Component({
  layout: 'TypeA',
  components: {
    ForumManage,
  },
})
export default class extends Vue {}
</script>

<style lang="scss"></style>
