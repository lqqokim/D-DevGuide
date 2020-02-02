<template>
  <forum-home />
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
  <!--    <div class="dbs-container">-->
  <!--      &lt;!&ndash; search &ndash;&gt;-->
  <!--      <div class="srch-wrap-bar mgt-60 mgb-60">-->
  <!--        <div class="srch-wrap">-->
  <!--          <input-->
  <!--                  type="search"-->
  <!--                  class="m-srch-bar"-->
  <!--                  placeholder="모든 제품에 대한 사용법, API, 질문 등을 검색하세요"-->
  <!--          />-->
  <!--          <button type="button" class="btn-search">search</button>-->
  <!--        </div>-->
  <!--      </div>-->
  <!--      <div class="position-wrap">-->
  <!--        <h1 class="tit-h1 mgb-15">제품별 질문/답변</h1>-->
  <!--        <div class="pst-rbtn">-->
  <!--          <button type="button" class="btn-sub-large">-->
  <!--            질문 등록-->
  <!--          </button>-->
  <!--        </div>-->
  <!--      </div>-->
  <!--      <div class="box-gray-round mgb-60">-->
  <!--        <div class="dbs-visual-wrap qna">-->
  <!--          <a href="dews-ui.html" class="dbs-visual-list">-->
  <!--            <dl class="dews-ui">-->
  <!--              <dt>DEWS UI</dt>-->
  <!--              <dd>DEWS Front-end UI Framework</dd>-->
  <!--            </dl>-->
  <!--            <p class="icon"><span>UI</span></p>-->
  <!--          </a>-->
  <!--          <a href="dews-j.html" class="dbs-visual-list">-->
  <!--            <dl class="dews-j">-->
  <!--              <dt>DEWS J</dt>-->
  <!--              <dd>DEWS Front-end UI Framework</dd>-->
  <!--            </dl>-->
  <!--            <p class="icon"><span>J</span></p>-->
  <!--          </a>-->
  <!--          <a href="dews-fd.html" class="dbs-visual-list"-->
  <!--          ><dl class="dews-fd">-->
  <!--            <dt>DEWS FD</dt>-->
  <!--            <dd>Project Sub Description</dd>-->
  <!--          </dl>-->
  <!--            <p class="icon"><span>FD</span></p>-->
  <!--          </a>-->
  <!--          <a href="dews-bd.html" class="dbs-visual-list"-->
  <!--          ><dl class="dews-bd">-->
  <!--            <dt>DEWS BD</dt>-->
  <!--            <dd>Project Sub Description</dd>-->
  <!--          </dl>-->
  <!--            <p class="icon"><span>BD</span></p>-->
  <!--          </a>-->
  <!--        </div>-->
  <!--        <p><a role="button" class="arrow prev"></a></p>-->
  <!--        <p><a role="button" class="arrow next"></a></p>-->
  <!--      </div>-->
  <!--      <h1 class="tit-h1 mgb-15">질문/답변 현황</h1>-->
  <!--      <div class="qna-wrap mgb-40">-->
  <!--        <div class="qna-left-box">-->
  <!--          <p class="qna-no-answer">-->
  <!--            <strong>답변이 <br />등록되지 않은 질문</strong>-->
  <!--            <span class="qna-more"><a href="#more">더보기</a></span>-->
  <!--          </p>-->
  <!--        </div>-->
  <!--        <div class="qna-content">-->
  <!--          <ul class="dbs-list qna">-->
  <!--            <li class="list-qna">-->
  <!--              <div class="qna-list">-->
  <!--                <ul class="num">-->
  <!--                  <li><strong>10</strong>추천</li>-->
  <!--                  <li><strong>0</strong>답변</li>-->
  <!--                </ul>-->
  <!--                <dl class="text">-->
  <!--                  <a href="#11"-->
  <!--                  ><dt>-->
  <!--                    <strong-->
  <!--                    >CodePicker에서 코드 및 텍스트를 커스텀하게 설정할 수-->
  <!--                      있는 방법이 있나요?</strong-->
  <!--                    >-->
  <!--                  </dt>-->
  <!--                    <dd>-->
  <!--                      폼 패널 내부의 코드피커에서 코드와 텍스트를 변경하여-->
  <!--                      바인딩을 하고 싶습니다. 작성을 해보니 잘 되는 것 처럼-->
  <!--                      보이지만, 실제 동작시에는 이후 프로세스에 문제가 발생하고-->
  <!--                      있습니다. 어떻게 처리해야…-->
  <!--                    </dd></a-->
  <!--                  >-->
  <!--                  <dd class="user-info mgt-15">-->
  <!--                    <i class="flag-qna">FD</i><span>2시간전</span-->
  <!--                  ><span>김고객(customer01)</span><span>조회 14</span>-->
  <!--                  </dd>-->
  <!--                </dl>-->
  <!--              </div>-->
  <!--            </li>-->
  <!--            <li class="list-qna">-->
  <!--              <div class="qna-list">-->
  <!--                <ul class="num">-->
  <!--                  <li><strong>0</strong>추천</li>-->
  <!--                  <li><strong>5</strong>답변</li>-->
  <!--                </ul>-->
  <!--                <dl class="text">-->
  <!--                  <a href="#11"-->
  <!--                  ><dt>-->
  <!--                    <strong-->
  <!--                    >CodePicker에서 코드 및 텍스트를 커스텀하게 설정할 수-->
  <!--                      있는 방법이 있나요?</strong-->
  <!--                    >-->
  <!--                  </dt>-->
  <!--                    <dd>-->
  <!--                      폼 패널 내부의 코드피커에서 코드와 텍스트를 변경하여-->
  <!--                      바인딩을 하고 싶습니다. 작성을 해보니 잘 되는 것 처럼-->
  <!--                      보이지만, 실제 동작시에는 이후 프로세스에 문제가 발생하고-->
  <!--                      있습니다. 어떻게 처리해야…-->
  <!--                    </dd></a-->
  <!--                  >-->
  <!--                  <dd class="user-info mgt-15">-->
  <!--                    <i class="flag-qna">D</i><span>2시간전</span-->
  <!--                  ><span>김고객(customer01)</span><span>조회 14</span>-->
  <!--                  </dd>-->
  <!--                </dl>-->
  <!--              </div>-->
  <!--            </li>-->
  <!--            <li class="list-qna">-->
  <!--              <div class="qna-list">-->
  <!--                <ul class="num">-->
  <!--                  <li><strong>0</strong>추천</li>-->
  <!--                  <li><strong>0</strong>답변</li>-->
  <!--                </ul>-->
  <!--                <dl class="text">-->
  <!--                  <a href="#11"-->
  <!--                  ><dt>-->
  <!--                    <strong-->
  <!--                    >CodePicker에서 코드 및 텍스트를 커스텀하게 설정할 수-->
  <!--                      있는 방법이 있나요?</strong-->
  <!--                    >-->
  <!--                  </dt>-->
  <!--                    <dd>-->
  <!--                      폼 패널 내부의 코드피커에서 코드와 텍스트를 변경하여-->
  <!--                      바인딩을 하고 싶습니다. 작성을 해보니 잘 되는 것 처럼-->
  <!--                      보이지만, 실제 동작시에는 이후 프로세스에 문제가 발생하고-->
  <!--                      있습니다. 어떻게 처리해야…-->
  <!--                    </dd></a-->
  <!--                  >-->
  <!--                  <dd class="user-info mgt-15">-->
  <!--                    <i class="flag-qna">UI</i><span>2시간전</span-->
  <!--                  ><span>김고객(customer01)</span><span>조회 14</span>-->
  <!--                  </dd>-->
  <!--                </dl>-->
  <!--              </div>-->
  <!--            </li>-->
  <!--          </ul>-->
  <!--        </div>-->
  <!--      </div>-->
  <!--      <div class="qna-wrap mgb-40">-->
  <!--        <div class="qna-left-box mgt-30">-->
  <!--          <p class="qna-ing-answer">-->
  <!--            <strong>답변이 <br />진행중인 질문</strong>-->
  <!--            <span class="qna-more"><a href="#more">더보기</a></span>-->
  <!--          </p>-->
  <!--        </div>-->
  <!--        <div class="qna-content">-->
  <!--          <div class="sorting-qna">-->
  <!--            <div class="sorting-option">-->
  <!--              <div>-->
  <!--                <input id="sort1" checked="checked" type="radio" name="sort1" />-->
  <!--                <label for="sort1">DEWS /UI</label>-->
  <!--              </div>-->
  <!--              <div>-->
  <!--                <input id="sort2" type="radio" name="sort1" />-->
  <!--                <label for="sort2">DEWS / J</label>-->
  <!--              </div>-->
  <!--              <div class="process">-->
  <!--                <input id="sort3" type="radio" name="sort1" />-->
  <!--                <label for="sort3">DEWS / FD</label>-->
  <!--              </div>-->
  <!--              <div class="process">-->
  <!--                <input id="sort4" type="radio" name="sort1" />-->
  <!--                <label for="sort4">DEWS / BD</label>-->
  <!--              </div>-->
  <!--            </div>-->
  <!--          </div>-->
  <!--          <ul class="dbs-list qna">-->
  <!--            <li class="list-qna">-->
  <!--              <div class="qna-list">-->
  <!--                <ul class="num">-->
  <!--                  <li><strong>2</strong>추천</li>-->
  <!--                  <li><strong>1</strong>답변</li>-->
  <!--                </ul>-->
  <!--                <dl class="text">-->
  <!--                  <a href="#11"-->
  <!--                  ><dt>-->
  <!--                    <strong-->
  <!--                    >CodePicker에서 코드 및 텍스트를 커스텀하게 설정할 수-->
  <!--                      있는 방법이 있나요?</strong-->
  <!--                    >-->
  <!--                  </dt>-->
  <!--                    <dd>-->
  <!--                      폼 패널 내부의 코드피커에서 코드와 텍스트를 변경하여-->
  <!--                      바인딩을 하고 싶습니다. 작성을 해보니 잘 되는 것 처럼-->
  <!--                      보이지만, 실제 동작시에는 이후 프로세스에 문제가 발생하고-->
  <!--                      있습니다. 어떻게 처리해야…-->
  <!--                    </dd></a-->
  <!--                  >-->
  <!--                  <dd class="user-info mgt-15">-->
  <!--                    <span>2시간전</span><span>김고객(customer01)</span-->
  <!--                  ><span>조회 14</span>-->
  <!--                  </dd>-->
  <!--                </dl>-->
  <!--              </div>-->
  <!--            </li>-->
  <!--            <li class="list-qna">-->
  <!--              <div class="qna-list">-->
  <!--                <ul class="num">-->
  <!--                  <li><strong>0</strong>추천</li>-->
  <!--                  <li><strong>1</strong>답변</li>-->
  <!--                </ul>-->
  <!--                <dl class="text">-->
  <!--                  <a href="#11"-->
  <!--                  ><dt>-->
  <!--                    <strong-->
  <!--                    >CodePicker에서 코드 및 텍스트를 커스텀하게 설정할 수-->
  <!--                      있는 방법이 있나요?</strong-->
  <!--                    >-->
  <!--                  </dt>-->
  <!--                    <dd>-->
  <!--                      폼 패널 내부의 코드피커에서 코드와 텍스트를 변경하여-->
  <!--                      바인딩을 하고 싶습니다. 작성을 해보니 잘 되는 것 처럼-->
  <!--                      보이지만, 실제 동작시에는 이후 프로세스에 문제가 발생하고-->
  <!--                      있습니다. 어떻게 처리해야…-->
  <!--                    </dd></a-->
  <!--                  >-->
  <!--                  <dd class="user-info mgt-15">-->
  <!--                    <span>2시간전</span><span>김고객(customer01)</span-->
  <!--                  ><span>조회 14</span>-->
  <!--                  </dd>-->
  <!--                </dl>-->
  <!--              </div>-->
  <!--            </li>-->
  <!--            <li class="list-qna">-->
  <!--              <div class="qna-list">-->
  <!--                <ul class="num">-->
  <!--                  <li><strong>0</strong>추천</li>-->
  <!--                  <li><strong>1</strong>답변</li>-->
  <!--                </ul>-->
  <!--                <dl class="text">-->
  <!--                  <a href="#11"-->
  <!--                  ><dt>-->
  <!--                    <strong-->
  <!--                    >CodePicker에서 코드 및 텍스트를 커스텀하게 설정할 수-->
  <!--                      있는 방법이 있나요?</strong-->
  <!--                    >-->
  <!--                  </dt>-->
  <!--                    <dd>-->
  <!--                      폼 패널 내부의 코드피커에서 코드와 텍스트를 변경하여-->
  <!--                      바인딩을 하고 싶습니다. 작성을 해보니 잘 되는 것 처럼-->
  <!--                      보이지만, 실제 동작시에는 이후 프로세스에 문제가 발생하고-->
  <!--                      있습니다. 어떻게 처리해야…-->
  <!--                    </dd></a-->
  <!--                  >-->
  <!--                  <dd class="user-info mgt-15">-->
  <!--                    <span>2시간전</span><span>김고객(customer01)</span-->
  <!--                  ><span>조회 14</span>-->
  <!--                  </dd>-->
  <!--                </dl>-->
  <!--              </div>-->
  <!--            </li>-->
  <!--          </ul>-->
  <!--        </div>-->
  <!--      </div>-->
  <!--      <div class="qna-wrap mgb-80">-->
  <!--        <div class="qna-left-box mgt-30">-->
  <!--          <p class="qna-recommended">-->
  <!--            <strong>추천이 많은 <br />질문/답변</strong>-->
  <!--            <span class="qna-more"><a href="#more">더보기</a></span>-->
  <!--          </p>-->
  <!--        </div>-->
  <!--        <div class="qna-content">-->
  <!--          <div class="sorting-qna">-->
  <!--            <div class="sorting-option">-->
  <!--              <div>-->
  <!--                <input-->
  <!--                        id="sort11"-->
  <!--                        checked="checked"-->
  <!--                        type="radio"-->
  <!--                        name="sort2"-->
  <!--                />-->
  <!--                <label for="sort11">DEWS /UI</label>-->
  <!--              </div>-->
  <!--              <div>-->
  <!--                <input id="sort12" type="radio" name="sort2" />-->
  <!--                <label for="sort12">DEWS / J</label>-->
  <!--              </div>-->
  <!--              <div class="process">-->
  <!--                <input id="sort13" type="radio" name="sort2" />-->
  <!--                <label for="sort13">DEWS / FD</label>-->
  <!--              </div>-->
  <!--              <div class="process">-->
  <!--                <input id="sort14" type="radio" name="sort2" />-->
  <!--                <label for="sort14">DEWS / BD</label>-->
  <!--              </div>-->
  <!--            </div>-->
  <!--          </div>-->
  <!--          <ul class="dbs-list qna">-->
  <!--            <li class="list-qna">-->
  <!--              <div class="qna-list">-->
  <!--                <ul class="num">-->
  <!--                  <li><strong>2</strong>추천</li>-->
  <!--                  <li><strong>1</strong>답변</li>-->
  <!--                </ul>-->
  <!--                <dl class="text">-->
  <!--                  <a href="#11">-->
  <!--                    <dt>-->
  <!--                      <i class="flag-complete">완료</i>-->
  <!--                      <strong-->
  <!--                      >11CodePicker에서 코드 및 텍스트를 커스텀하게 설정할 수-->
  <!--                        있는 방법이 있나요?</strong-->
  <!--                      >-->
  <!--                    </dt>-->
  <!--                    <dd>-->
  <!--                      폼 패널 내부의 코드피커에서 코드와 텍스트를 변경하여-->
  <!--                      바인딩을 하고 싶습니다. 작성을 해보니 잘 되는 것 처럼-->
  <!--                      보이지만, 실제 동작시에는 이후 프로세스에 문제가 발생하고-->
  <!--                      있습니다. 어떻게 처리해야…-->
  <!--                    </dd></a-->
  <!--                  >-->
  <!--                  <dd class="user-info mgt-15">-->
  <!--                    <span>2시간전</span><span>김고객(customer01)</span-->
  <!--                  ><span>조회 14</span>-->
  <!--                  </dd>-->
  <!--                </dl>-->
  <!--              </div>-->
  <!--            </li>-->
  <!--            <li class="list-qna">-->
  <!--              <div class="qna-list">-->
  <!--                <ul class="num">-->
  <!--                  <li><strong>0</strong>추천</li>-->
  <!--                  <li><strong>1</strong>답변</li>-->
  <!--                </ul>-->
  <!--                <dl class="text">-->
  <!--                  <a href="#11"-->
  <!--                  ><dt>-->
  <!--                    <strong-->
  <!--                    >CodePicker에서 코드 및 텍스트를 커스텀하게 설정할 수-->
  <!--                      있는 방법이 있나요?</strong-->
  <!--                    >-->
  <!--                  </dt>-->
  <!--                    <dd>-->
  <!--                      폼 패널 내부의 코드피커에서 코드와 텍스트를 변경하여-->
  <!--                      바인딩을 하고 싶습니다. 작성을 해보니 잘 되는 것 처럼-->
  <!--                      보이지만, 실제 동작시에는 이후 프로세스에 문제가 발생하고-->
  <!--                      있습니다. 어떻게 처리해야…-->
  <!--                    </dd></a-->
  <!--                  >-->
  <!--                  <dd class="user-info mgt-15">-->
  <!--                    <span>2시간전</span><span>김고객(customer01)</span-->
  <!--                  ><span>조회 14</span>-->
  <!--                  </dd>-->
  <!--                </dl>-->
  <!--              </div>-->
  <!--            </li>-->
  <!--            <li class="list-qna">-->
  <!--              <div class="qna-list">-->
  <!--                <ul class="num">-->
  <!--                  <li><strong>0</strong>추천</li>-->
  <!--                  <li><strong>1</strong>답변</li>-->
  <!--                </ul>-->
  <!--                <dl class="text">-->
  <!--                  <a href="#11"-->
  <!--                  ><dt>-->
  <!--                    <strong-->
  <!--                    >CodePicker에서 코드 및 텍스트를 커스텀하게 설정할 수-->
  <!--                      있는 방법이 있나요?</strong-->
  <!--                    >-->
  <!--                  </dt>-->
  <!--                    <dd>-->
  <!--                      폼 패널 내부의 코드피커에서 코드와 텍스트를 변경하여-->
  <!--                      바인딩을 하고 싶습니다. 작성을 해보니 잘 되는 것 처럼-->
  <!--                      보이지만, 실제 동작시에는 이후 프로세스에 문제가 발생하고-->
  <!--                      있습니다. 어떻게 처리해야…-->
  <!--                    </dd></a-->
  <!--                  >-->
  <!--                  <dd class="user-info mgt-15">-->
  <!--                    <span>2시간전</span><span>김고객(customer01)</span-->
  <!--                  ><span>조회 14</span>-->
  <!--                  </dd>-->
  <!--                </dl>-->
  <!--              </div>-->
  <!--            </li>-->
  <!--          </ul>-->
  <!--        </div>-->
  <!--      </div>-->
  <!--      <div class="sky-qna">-->
  <!--        <div class="sky-wrap">-->
  <!--          <p class="sky-title">내 활동 현황</p>-->
  <!--          <ul class="sky-list">-->
  <!--            <li class="sky-content">-->
  <!--              <span>완료</span><span class="num">0</span>-->
  <!--            </li>-->
  <!--            <li class="sky-content">-->
  <!--              <span>진행</span><span class="num">3</span>-->
  <!--            </li>-->
  <!--            <li class="sky-content">-->
  <!--              <span>답변</span><span class="num">2</span>-->
  <!--            </li>-->
  <!--          </ul>-->
  <!--        </div>-->
  <!--        <div class="sky-wrap">-->
  <!--          <p class="sky-title">전체 질문답변 현황</p>-->
  <!--          <ul class="sky-list">-->
  <!--            <li class="sky-content">-->
  <!--              <span>전체</span><span class="num">9,123,456</span>-->
  <!--            </li>-->
  <!--            <li class="sky-content">-->
  <!--              <span>진행</span><span class="num">9,012,345</span>-->
  <!--            </li>-->
  <!--            <li class="sky-content">-->
  <!--              <span>완료</span><span class="num">123</span>-->
  <!--            </li>-->
  <!--          </ul>-->
  <!--        </div>-->
  <!--      </div>-->
  <!--    </div>-->
  <!--  </div>-->
</template>
<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator';
import ForumHome from '~/components/forumHome/index.vue';

@Component({
  layout: 'default',
  components: {
    ForumHome,
  },
  async fetch({ store }) {
    const filterTypes = store.state.forum.filterTypes;

    if (store.state.user.user.loginId) {
      await store.dispatch('forum/activityCondition');
    }

    try {
      await store.dispatch('forum/forumProducts');

      // 답변이 등록되지 않은 질문
      await store.dispatch('forum/forumHomePosts', {
        type: 'notExistCommentPosts',
        productCode: 'ALL',
        params: {
          ...store.state.forum.forumDefaultListParams.params,
          limit: 3,
          isNotExistComments: true,
        },
      });

      // 답변이 진행중인 질문
      await store.dispatch('forum/forumHomePosts', {
        type: 'inProgressCommentPosts',
        productCode: store.state.forum.products[0].productCode,
        params: {
          ...store.state.forum.forumDefaultListParams.params,
          limit: 3,
          filterType: filterTypes.PROGRESS,
        },
      });

      // 추천이 많은 짊문/답변
      await store.dispatch('forum/forumHomePosts', {
        type: 'manyLikeCountPosts',
        productCode: store.state.forum.products[0].productCode,
        params: {
          ...store.state.forum.forumDefaultListParams.params,
          limit: 3,
          sort: '-like',
        },
      });
    } catch (e) {}
  },
})
export default class extends Vue {}
</script>

<style lang="scss"></style>
