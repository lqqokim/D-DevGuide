<template>
  <forum-my />
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
  <!--      <div class="content-wrap">-->
  <!--        &lt;!&ndash; 좌측메뉴 S &ndash;&gt;-->
  <!--        <div class="left-menu">-->
  <!--          <p class="tit-con-left"><strong>질문/답변</strong></p>-->
  <!--          <div class="ui-accordion-left-pnl">-->
  <!--            <ul>-->
  <!--              <li class="nav-item depth-1 page selected">-->
  <!--                <a href="#" class="nav-text">내 질문 / 답변</a>-->
  <!--              </li>-->
  <!--              <li class="nav-item depth-1 folder selected">-->
  <!--                <a href="#" class="nav-text">제품별 질문 / 답변</a>-->
  <!--                <ul class="nav-container depth-2" style="display: block;">-->
  <!--                  <li class="nav-item depth-2 page">-->
  <!--                    <a href="#" class="nav-text">전체</a>-->
  <!--                  </li>-->
  <!--                  <li class="nav-item depth-2 page">-->
  <!--                    <a href="#" class="nav-text">DEWS/UI</a>-->
  <!--                  </li>-->
  <!--                  <li class="nav-item depth-2 page">-->
  <!--                    <a href="#" class="nav-text">DEWS J</a>-->
  <!--                  </li>-->
  <!--                  <li class="nav-item depth-2 page">-->
  <!--                    <a href="#" class="nav-text">DEWS Q</a>-->
  <!--                  </li>-->
  <!--                </ul>-->
  <!--              </li>-->
  <!--              <li class="nav-item depth-1 page">-->
  <!--                <a href="#" class="nav-text">제품관리</a>-->
  <!--              </li>-->
  <!--            </ul>-->
  <!--          </div>-->
  <!--        </div>-->
  <!--        &lt;!&ndash; // 좌측메뉴 E &ndash;&gt;-->
  <!--        <div class="container-panel">-->
  <!--          <div class="view-top mgb-20">-->
  <!--            <h1 class="tit-con-text">내 질문 / 답변</h1>-->
  <!--          </div>-->
  <!--          <h2 class="tit-con-small">내가 작성한 질문</h2>-->
  <!--          <div class="qna-wrap mgb-25">-->
  <!--            <div class="sorting-qna">-->
  <!--              <div class="sorting-option">-->
  <!--                <div>-->
  <!--                  <input-->
  <!--                    id="sort1"-->
  <!--                    checked="checked"-->
  <!--                    type="radio"-->
  <!--                    name="sort"-->
  <!--                  />-->
  <!--                  <label for="sort1">전체 <em>5</em></label>-->
  <!--                </div>-->
  <!--                <div>-->
  <!--                  <input id="sort2" type="radio" name="sort" />-->
  <!--                  <label for="sort2">완료됨 <em>2</em></label>-->
  <!--                </div>-->
  <!--                <div class="process">-->
  <!--                  <input id="sort3" type="radio" name="sort" />-->
  <!--                  <label for="sort3">진행중 <em>3</em></label>-->
  <!--                </div>-->
  <!--              </div>-->
  <!--              <div class="sorting-list">-->
  <!--                <div class="ui-select small">-->
  <!--                  <select title="품목형태" class="off" tabindex="-1">-->
  <!--                    <option value="0" selected="">최신순</option>-->
  <!--                    <option value="1">최신순</option>-->
  <!--                    <option value="2">추천순</option>-->
  <!--                  </select>-->
  <!--                  <button type="button" class="ui-select-btn">-->
  <!--                    최신순-->
  <!--                  </button>-->
  <!--                  &lt;!&ndash; 셀렉트박스  선택시 ui-select-wrap에 on 추가하면 display block 됨 &ndash;&gt;-->
  <!--                  <div class="ui-select-wrap">-->
  <!--                    <strong class="ui-select-tit" tabindex="0">목록순서</strong>-->
  <!--                    <div class="ui-select-options">-->
  <!--                      <button-->
  <!--                        type="button"-->
  <!--                        class="ui-select-opt selected"-->
  <!--                        value="최신순"-->
  <!--                      >-->
  <!--                        <b class="ui-select-txt">최신순</b>-->
  <!--                      </button>-->
  <!--                      <button-->
  <!--                        type="button"-->
  <!--                        class="ui-select-opt"-->
  <!--                        value="추천순"-->
  <!--                      >-->
  <!--                        <b class="ui-select-txt">추천순</b>-->
  <!--                      </button>-->
  <!--                    </div>-->
  <!--                  </div>-->
  <!--                </div>-->
  <!--              </div>-->
  <!--            </div>-->
  <!--            <div class="qna-content">-->
  <!--              <ul class="dbs-list qna">-->
  <!--                <li class="list-qna">-->
  <!--                  <div class="qna-list">-->
  <!--                    <ul class="num">-->
  <!--                      <li><strong>10</strong>추천</li>-->
  <!--                      <li><strong>0</strong>답변</li>-->
  <!--                    </ul>-->
  <!--                    <dl class="text">-->
  <!--                      <a href="#11"-->
  <!--                        ><dt>-->
  <!--                          <strong-->
  <!--                            >CodePicker에서 코드 및 텍스트를 커스텀하게 설정할-->
  <!--                            수 있는 방법이 있나요?</strong-->
  <!--                          >-->
  <!--                        </dt>-->
  <!--                        <dd>-->
  <!--                          폼 패널 내부의 코드피커에서 코드와 텍스트를 변경하여-->
  <!--                          바인딩을 하고 싶습니다. 작성을 해보니 잘 되는 것 처럼-->
  <!--                          보이지만, 실제 동작시에는 이후 프로세스에 문제가-->
  <!--                          발생하고 있습니다. 어떻게 처리해야…-->
  <!--                        </dd></a-->
  <!--                      >-->
  <!--                      <dd class="user-info mgt-15">-->
  <!--                        <i class="flag-qna">FD</i><span>2시간전</span-->
  <!--                        ><span>김고객(customer01)</span><span>조회 14</span>-->
  <!--                      </dd>-->
  <!--                    </dl>-->
  <!--                  </div>-->
  <!--                </li>-->
  <!--                <li class="list-qna">-->
  <!--                  <div class="qna-list">-->
  <!--                    <ul class="num">-->
  <!--                      <li><strong>0</strong>추천</li>-->
  <!--                      <li><strong>5</strong>답변</li>-->
  <!--                    </ul>-->
  <!--                    <dl class="text">-->
  <!--                      <a href="#11"-->
  <!--                        ><dt>-->
  <!--                          <strong-->
  <!--                            >CodePicker에서 코드 및 텍스트를 커스텀하게 설정할-->
  <!--                            수 있는 방법이 있나요?</strong-->
  <!--                          >-->
  <!--                        </dt>-->
  <!--                        <dd>-->
  <!--                          폼 패널 내부의 코드피커에서 코드와 텍스트를 변경하여-->
  <!--                          바인딩을 하고 싶습니다. 작성을 해보니 잘 되는 것 처럼-->
  <!--                          보이지만, 실제 동작시에는 이후 프로세스에 문제가-->
  <!--                          발생하고 있습니다. 어떻게 처리해야…-->
  <!--                        </dd></a-->
  <!--                      >-->
  <!--                      <dd class="user-info mgt-15">-->
  <!--                        <i class="flag-qna">UI</i><span>2시간전</span-->
  <!--                        ><span>김고객(customer01)</span><span>조회 14</span>-->
  <!--                      </dd>-->
  <!--                    </dl>-->
  <!--                  </div>-->
  <!--                </li>-->
  <!--                <li class="list-qna">-->
  <!--                  <div class="qna-list">-->
  <!--                    <ul class="num">-->
  <!--                      <li><strong>0</strong>추천</li>-->
  <!--                      <li><strong>0</strong>답변</li>-->
  <!--                    </ul>-->
  <!--                    <dl class="text">-->
  <!--                      <a href="#11"-->
  <!--                        ><dt>-->
  <!--                          <strong-->
  <!--                            >CodePicker에서 코드 및 텍스트를 커스텀하게 설정할-->
  <!--                            수 있는 방법이 있나요?</strong-->
  <!--                          >-->
  <!--                        </dt>-->
  <!--                        <dd>-->
  <!--                          폼 패널 내부의 코드피커에서 코드와 텍스트를 변경하여-->
  <!--                          바인딩을 하고 싶습니다. 작성을 해보니 잘 되는 것 처럼-->
  <!--                          보이지만, 실제 동작시에는 이후 프로세스에 문제가-->
  <!--                          발생하고 있습니다. 어떻게 처리해야…-->
  <!--                        </dd></a-->
  <!--                      >-->
  <!--                      <dd class="user-info mgt-15">-->
  <!--                        <i class="flag-qna">D</i><span>2시간전</span-->
  <!--                        ><span>김고객(customer01)</span><span>조회 14</span>-->
  <!--                      </dd>-->
  <!--                    </dl>-->
  <!--                  </div>-->
  <!--                </li>-->
  <!--                <li class="list-qna">-->
  <!--                  <div class="qna-list">-->
  <!--                    <ul class="num">-->
  <!--                      <li><strong>10</strong>추천</li>-->
  <!--                      <li><strong>0</strong>답변</li>-->
  <!--                    </ul>-->
  <!--                    <dl class="text">-->
  <!--                      <a href="#11"-->
  <!--                        ><dt>-->
  <!--                          <strong-->
  <!--                            >CodePicker에서 코드 및 텍스트를 커스텀하게 설정할-->
  <!--                            수 있는 방법이 있나요?</strong-->
  <!--                          >-->
  <!--                        </dt>-->
  <!--                        <dd>-->
  <!--                          폼 패널 내부의 코드피커에서 코드와 텍스트를 변경하여-->
  <!--                          바인딩을 하고 싶습니다. 작성을 해보니 잘 되는 것 처럼-->
  <!--                          보이지만, 실제 동작시에는 이후 프로세스에 문제가-->
  <!--                          발생하고 있습니다. 어떻게 처리해야…-->
  <!--                        </dd></a-->
  <!--                      >-->
  <!--                      <dd class="user-info mgt-15">-->
  <!--                        <i class="flag-qna">FD</i><span>2시간전</span-->
  <!--                        ><span>김고객(customer01)</span><span>조회 14</span>-->
  <!--                      </dd>-->
  <!--                    </dl>-->
  <!--                  </div>-->
  <!--                </li>-->
  <!--                <li class="list-qna">-->
  <!--                  <div class="qna-list">-->
  <!--                    <ul class="num">-->
  <!--                      <li><strong>0</strong>추천</li>-->
  <!--                      <li><strong>5</strong>답변</li>-->
  <!--                    </ul>-->
  <!--                    <dl class="text">-->
  <!--                      <a href="#11"-->
  <!--                        ><dt>-->
  <!--                          <strong-->
  <!--                            >CodePicker에서 코드 및 텍스트를 커스텀하게 설정할-->
  <!--                            수 있는 방법이 있나요?</strong-->
  <!--                          >-->
  <!--                        </dt>-->
  <!--                        <dd>-->
  <!--                          폼 패널 내부의 코드피커에서 코드와 텍스트를 변경하여-->
  <!--                          바인딩을 하고 싶습니다. 작성을 해보니 잘 되는 것 처럼-->
  <!--                          보이지만, 실제 동작시에는 이후 프로세스에 문제가-->
  <!--                          발생하고 있습니다. 어떻게 처리해야…-->
  <!--                        </dd></a-->
  <!--                      >-->
  <!--                      <dd class="user-info mgt-15">-->
  <!--                        <i class="flag-qna">UI</i><span>2시간전</span-->
  <!--                        ><span>김고객(customer01)</span><span>조회 14</span>-->
  <!--                      </dd>-->
  <!--                    </dl>-->
  <!--                  </div>-->
  <!--                </li>-->
  <!--              </ul>-->
  <!--            </div>-->
  <!--          </div>-->
  <!--          <div class="paging mgb-70">-->
  <!--            <button-->
  <!--              type="button"-->
  <!--              class="btn-page-first disabled"-->
  <!--              title="처음으로"-->
  <!--            ></button>-->
  <!--            <button type="button" class="btn-page-prev" title="이전"></button>-->
  <!--            <a href="#" class="this-page">1</a>-->
  <!--            <a href="#">2</a>-->
  <!--            <a href="#">3</a>-->
  <!--            <a href="#">4</a>-->
  <!--            <a href="#">5</a>-->
  <!--            <button type="button" class="btn-page-next" title="다음"></button>-->
  <!--            <button-->
  <!--              type="button"-->
  <!--              class="btn-page-last"-->
  <!--              title="마지막으로"-->
  <!--            ></button>-->
  <!--          </div>-->
  <!--          <h2 class="tit-con-small">내가 답변한 질문</h2>-->
  <!--          <div class="qna-wrap mgb-25">-->
  <!--            <div class="sorting-qna">-->
  <!--              <div class="sorting-option">-->
  <!--                <div>-->
  <!--                  <input-->
  <!--                    id="sort11"-->
  <!--                    checked="checked"-->
  <!--                    type="radio"-->
  <!--                    name="sort02"-->
  <!--                  />-->
  <!--                  <label for="sort11">전체 <em>5</em></label>-->
  <!--                </div>-->
  <!--                <div>-->
  <!--                  <input id="sort12" type="radio" name="sort02" />-->
  <!--                  <label for="sort12">완료됨 <em>2</em></label>-->
  <!--                </div>-->
  <!--                <div class="process">-->
  <!--                  <input id="sort13" type="radio" name="sort02" />-->
  <!--                  <label for="sort13">진행중 <em>3</em></label>-->
  <!--                </div>-->
  <!--              </div>-->
  <!--              <div class="sorting-list">-->
  <!--                <div class="ui-select small">-->
  <!--                  <select title="품목형태" class="off" tabindex="-1">-->
  <!--                    <option value="0" selected="">최신순</option>-->
  <!--                    <option value="1">최신순</option>-->
  <!--                    <option value="2">추천순</option>-->
  <!--                  </select>-->
  <!--                  <button type="button" class="ui-select-btn">-->
  <!--                    최신순-->
  <!--                  </button>-->
  <!--                  &lt;!&ndash; 셀렉트박스  선택시 ui-select-wrap에 on 추가하면 display block 됨 &ndash;&gt;-->
  <!--                  <div class="ui-select-wrap">-->
  <!--                    <strong class="ui-select-tit" tabindex="0">목록순서</strong>-->
  <!--                    <div class="ui-select-options">-->
  <!--                      <button-->
  <!--                        type="button"-->
  <!--                        class="ui-select-opt selected"-->
  <!--                        value="최신순"-->
  <!--                      >-->
  <!--                        <b class="ui-select-txt">최신순</b>-->
  <!--                      </button>-->
  <!--                      <button-->
  <!--                        type="button"-->
  <!--                        class="ui-select-opt"-->
  <!--                        value="추천순"-->
  <!--                      >-->
  <!--                        <b class="ui-select-txt">추천순</b>-->
  <!--                      </button>-->
  <!--                    </div>-->
  <!--                  </div>-->
  <!--                </div>-->
  <!--              </div>-->
  <!--            </div>-->
  <!--            <div class="qna-content">-->
  <!--              <ul class="dbs-list qna">-->
  <!--                <li class="list-qna">-->
  <!--                  <div class="qna-list">-->
  <!--                    <ul class="num">-->
  <!--                      <li><strong>10</strong>추천</li>-->
  <!--                      <li><strong>0</strong>답변</li>-->
  <!--                    </ul>-->
  <!--                    <dl class="text">-->
  <!--                      <a href="#11"-->
  <!--                        ><dt>-->
  <!--                          <strong-->
  <!--                            >CodePicker에서 코드 및 텍스트를 커스텀하게 설정할-->
  <!--                            수 있는 방법이 있나요?</strong-->
  <!--                          >-->
  <!--                        </dt>-->
  <!--                        <dd>-->
  <!--                          폼 패널 내부의 코드피커에서 코드와 텍스트를 변경하여-->
  <!--                          바인딩을 하고 싶습니다. 작성을 해보니 잘 되는 것 처럼-->
  <!--                          보이지만, 실제 동작시에는 이후 프로세스에 문제가-->
  <!--                          발생하고 있습니다. 어떻게 처리해야…-->
  <!--                        </dd></a-->
  <!--                      >-->
  <!--                      <dd class="user-info mgt-15">-->
  <!--                        <i class="flag-qna">FD</i><span>2시간전</span-->
  <!--                        ><span>김고객(customer01)</span><span>조회 14</span>-->
  <!--                      </dd>-->
  <!--                    </dl>-->
  <!--                  </div>-->
  <!--                </li>-->
  <!--                <li class="list-qna">-->
  <!--                  <div class="qna-list">-->
  <!--                    <ul class="num">-->
  <!--                      <li><strong>0</strong>추천</li>-->
  <!--                      <li><strong>5</strong>답변</li>-->
  <!--                    </ul>-->
  <!--                    <dl class="text">-->
  <!--                      <a href="#11"-->
  <!--                        ><dt>-->
  <!--                          <strong-->
  <!--                            >CodePicker에서 코드 및 텍스트를 커스텀하게 설정할-->
  <!--                            수 있는 방법이 있나요?</strong-->
  <!--                          >-->
  <!--                        </dt>-->
  <!--                        <dd>-->
  <!--                          폼 패널 내부의 코드피커에서 코드와 텍스트를 변경하여-->
  <!--                          바인딩을 하고 싶습니다. 작성을 해보니 잘 되는 것 처럼-->
  <!--                          보이지만, 실제 동작시에는 이후 프로세스에 문제가-->
  <!--                          발생하고 있습니다. 어떻게 처리해야…-->
  <!--                        </dd></a-->
  <!--                      >-->
  <!--                      <dd class="user-info mgt-15">-->
  <!--                        <i class="flag-qna">UI</i><span>2시간전</span-->
  <!--                        ><span>김고객(customer01)</span><span>조회 14</span>-->
  <!--                      </dd>-->
  <!--                    </dl>-->
  <!--                  </div>-->
  <!--                </li>-->
  <!--                <li class="list-qna">-->
  <!--                  <div class="qna-list">-->
  <!--                    <ul class="num">-->
  <!--                      <li><strong>0</strong>추천</li>-->
  <!--                      <li><strong>0</strong>답변</li>-->
  <!--                    </ul>-->
  <!--                    <dl class="text">-->
  <!--                      <a href="#11"-->
  <!--                        ><dt>-->
  <!--                          <strong-->
  <!--                            >CodePicker에서 코드 및 텍스트를 커스텀하게 설정할-->
  <!--                            수 있는 방법이 있나요?</strong-->
  <!--                          >-->
  <!--                        </dt>-->
  <!--                        <dd>-->
  <!--                          폼 패널 내부의 코드피커에서 코드와 텍스트를 변경하여-->
  <!--                          바인딩을 하고 싶습니다. 작성을 해보니 잘 되는 것 처럼-->
  <!--                          보이지만, 실제 동작시에는 이후 프로세스에 문제가-->
  <!--                          발생하고 있습니다. 어떻게 처리해야…-->
  <!--                        </dd></a-->
  <!--                      >-->
  <!--                      <dd class="user-info mgt-15">-->
  <!--                        <i class="flag-qna">D</i><span>2시간전</span-->
  <!--                        ><span>김고객(customer01)</span><span>조회 14</span>-->
  <!--                      </dd>-->
  <!--                    </dl>-->
  <!--                  </div>-->
  <!--                </li>-->
  <!--                <li class="list-qna">-->
  <!--                  <div class="qna-list">-->
  <!--                    <ul class="num">-->
  <!--                      <li><strong>10</strong>추천</li>-->
  <!--                      <li><strong>0</strong>답변</li>-->
  <!--                    </ul>-->
  <!--                    <dl class="text">-->
  <!--                      <a href="#11"-->
  <!--                        ><dt>-->
  <!--                          <strong-->
  <!--                            >CodePicker에서 코드 및 텍스트를 커스텀하게 설정할-->
  <!--                            수 있는 방법이 있나요?</strong-->
  <!--                          >-->
  <!--                        </dt>-->
  <!--                        <dd>-->
  <!--                          폼 패널 내부의 코드피커에서 코드와 텍스트를 변경하여-->
  <!--                          바인딩을 하고 싶습니다. 작성을 해보니 잘 되는 것 처럼-->
  <!--                          보이지만, 실제 동작시에는 이후 프로세스에 문제가-->
  <!--                          발생하고 있습니다. 어떻게 처리해야…-->
  <!--                        </dd></a-->
  <!--                      >-->
  <!--                      <dd class="user-info mgt-15">-->
  <!--                        <i class="flag-qna">FD</i><span>2시간전</span-->
  <!--                        ><span>김고객(customer01)</span><span>조회 14</span>-->
  <!--                      </dd>-->
  <!--                    </dl>-->
  <!--                  </div>-->
  <!--                </li>-->
  <!--                <li class="list-qna">-->
  <!--                  <div class="qna-list">-->
  <!--                    <ul class="num">-->
  <!--                      <li><strong>0</strong>추천</li>-->
  <!--                      <li><strong>5</strong>답변</li>-->
  <!--                    </ul>-->
  <!--                    <dl class="text">-->
  <!--                      <a href="#11"-->
  <!--                        ><dt>-->
  <!--                          <strong-->
  <!--                            >CodePicker에서 코드 및 텍스트를 커스텀하게 설정할-->
  <!--                            수 있는 방법이 있나요?</strong-->
  <!--                          >-->
  <!--                        </dt>-->
  <!--                        <dd>-->
  <!--                          폼 패널 내부의 코드피커에서 코드와 텍스트를 변경하여-->
  <!--                          바인딩을 하고 싶습니다. 작성을 해보니 잘 되는 것 처럼-->
  <!--                          보이지만, 실제 동작시에는 이후 프로세스에 문제가-->
  <!--                          발생하고 있습니다. 어떻게 처리해야…-->
  <!--                        </dd></a-->
  <!--                      >-->
  <!--                      <dd class="user-info mgt-15">-->
  <!--                        <i class="flag-qna">UI</i><span>2시간전</span-->
  <!--                        ><span>김고객(customer01)</span><span>조회 14</span>-->
  <!--                      </dd>-->
  <!--                    </dl>-->
  <!--                  </div>-->
  <!--                </li>-->
  <!--              </ul>-->
  <!--            </div>-->
  <!--          </div>-->
  <!--          <div class="paging mgb-70">-->
  <!--            <button-->
  <!--              type="button"-->
  <!--              class="btn-page-first disabled"-->
  <!--              title="처음으로"-->
  <!--            ></button>-->
  <!--            <button type="button" class="btn-page-prev" title="이전"></button>-->
  <!--            <a href="#" class="this-page">1</a>-->
  <!--            <a href="#">2</a>-->
  <!--            <a href="#">3</a>-->
  <!--            <a href="#">4</a>-->
  <!--            <a href="#">5</a>-->
  <!--            <button type="button" class="btn-page-next" title="다음"></button>-->
  <!--            <button-->
  <!--              type="button"-->
  <!--              class="btn-page-last"-->
  <!--              title="마지막으로"-->
  <!--            ></button>-->
  <!--          </div>-->
  <!--        </div>-->
  <!--      </div>-->
  <!--    </div>-->
  <!--  </div>-->
</template>
<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator';
import ForumMy from '~/components/forumMy/index.vue';

@Component({
  layout: 'default',
  components: {
    ForumMy,
  },
  async fetch({ store }) {
    try {
      await store.dispatch('forum/getPostsByProduct', {
        type: 'write',
      });

      await store.dispatch('forum/getPostsByProduct', {
        type: 'reply',
      });
    } catch (e) {}
  },
})
export default class extends Vue {}
</script>

<style lang="scss"></style>
