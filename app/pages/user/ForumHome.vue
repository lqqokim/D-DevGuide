<template>
  <div class="dbs-container-wrap">
    <div class="viewer-wrap">
      <div class="dbs-top-image-wrap qna">
        <div class="dbs-top-image">
          <dl>
            <dt><strong>질문 / 답변</strong></dt>
            <dd>
              DEWS 플랫폼에 포함된 제품들을 이용한 개발 시 발생하는 이슈들에
              대한 <br />궁금증을 해결하실 수 있도록 지원해 드립니다.
            </dd>
          </dl>
        </div>
      </div>
    </div>
    <div class="dbs-container">
      <!-- search -->
      <div class="srch-wrap-bar mgt-60 mgb-60">
        <div class="srch-wrap">
          <input
            type="search"
            class="m-srch-bar"
            placeholder="모든 제품에 대한 사용법, API, 질문 등을 검색하세요"
          />
          <button type="button" class="btn-search">search</button>
        </div>
      </div>
      <div class="position-wrap">
        <h1 class="tit-h1 mgb-15">제품별 질문/답변</h1>
        <div class="pst-rbtn">
          <button type="button" class="btn-sub-large">
            질문 등록
          </button>
        </div>
      </div>
      <div class="box-gray-round mgb-60">
        <div class="dbs-visual-wrap qna">
          <a href="dews-ui.html" class="dbs-visual-list">
            <dl class="dews-ui">
              <dt>DEWS UI</dt>
              <dd>DEWS Front-end UI Framework</dd>
            </dl>
            <p class="icon"><span>UI</span></p>
          </a>
          <a href="dews-j.html" class="dbs-visual-list">
            <dl class="dews-j">
              <dt>DEWS J</dt>
              <dd>DEWS Front-end UI Framework</dd>
            </dl>
            <p class="icon"><span>J</span></p>
          </a>
          <a href="dews-fd.html" class="dbs-visual-list"
            ><dl class="dews-fd">
              <dt>DEWS FD</dt>
              <dd>Project Sub Description</dd>
            </dl>
            <p class="icon"><span>FD</span></p>
          </a>
          <a href="dews-bd.html" class="dbs-visual-list"
            ><dl class="dews-bd">
              <dt>DEWS BD</dt>
              <dd>Project Sub Description</dd>
            </dl>
            <p class="icon"><span>BD</span></p>
          </a>
        </div>
        <p><a role="button" class="arrow prev"></a></p>
        <p><a role="button" class="arrow next"></a></p>
      </div>
      <h1 class="tit-h1 mgb-15">질문/답변 현황</h1>
      <div class="qna-wrap mgb-40">
        <div class="qna-left-box">
          <p class="qna-no-answer">
            <strong>답변이 <br />등록되지 않은 질문</strong>
            <span class="qna-more"><a href="#more">더보기</a></span>
          </p>
        </div>
        <div class="qna-content">
          <ul class="dbs-list qna">
            <li class="list-qna">
              <div class="qna-list">
                <ul class="num">
                  <li><strong>10</strong>추천</li>
                  <li><strong>0</strong>답변</li>
                </ul>
                <dl class="text">
                  <a href="#11"
                    ><dt>
                      <strong
                        >CodePicker에서 코드 및 텍스트를 커스텀하게 설정할 수
                        있는 방법이 있나요?</strong
                      >
                    </dt>
                    <dd>
                      폼 패널 내부의 코드피커에서 코드와 텍스트를 변경하여
                      바인딩을 하고 싶습니다. 작성을 해보니 잘 되는 것 처럼
                      보이지만, 실제 동작시에는 이후 프로세스에 문제가 발생하고
                      있습니다. 어떻게 처리해야…
                    </dd></a
                  >
                  <dd class="user-info">
                    <i class="flag-qna">FD</i><span>2시간전</span
                    ><span>김고객(customer01)</span><span>조회 14</span>
                  </dd>
                </dl>
              </div>
            </li>
            <li class="list-qna">
              <div class="qna-list">
                <ul class="num">
                  <li><strong>0</strong>추천</li>
                  <li><strong>5</strong>답변</li>
                </ul>
                <dl class="text">
                  <a href="#11"
                    ><dt>
                      <strong
                        >CodePicker에서 코드 및 텍스트를 커스텀하게 설정할 수
                        있는 방법이 있나요?</strong
                      >
                    </dt>
                    <dd>
                      폼 패널 내부의 코드피커에서 코드와 텍스트를 변경하여
                      바인딩을 하고 싶습니다. 작성을 해보니 잘 되는 것 처럼
                      보이지만, 실제 동작시에는 이후 프로세스에 문제가 발생하고
                      있습니다. 어떻게 처리해야…
                    </dd></a
                  >
                  <dd class="user-info">
                    <i class="flag-qna">D</i><span>2시간전</span
                    ><span>김고객(customer01)</span><span>조회 14</span>
                  </dd>
                </dl>
              </div>
            </li>
            <li class="list-qna">
              <div class="qna-list">
                <ul class="num">
                  <li><strong>0</strong>추천</li>
                  <li><strong>0</strong>답변</li>
                </ul>
                <dl class="text">
                  <a href="#11"
                    ><dt>
                      <strong
                        >CodePicker에서 코드 및 텍스트를 커스텀하게 설정할 수
                        있는 방법이 있나요?</strong
                      >
                    </dt>
                    <dd>
                      폼 패널 내부의 코드피커에서 코드와 텍스트를 변경하여
                      바인딩을 하고 싶습니다. 작성을 해보니 잘 되는 것 처럼
                      보이지만, 실제 동작시에는 이후 프로세스에 문제가 발생하고
                      있습니다. 어떻게 처리해야…
                    </dd></a
                  >
                  <dd class="user-info">
                    <i class="flag-qna">UI</i><span>2시간전</span
                    ><span>김고객(customer01)</span><span>조회 14</span>
                  </dd>
                </dl>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div class="qna-wrap mgb-40">
        <div class="qna-left-box mgt-30">
          <p class="qna-ing-answer">
            <strong>답변이 <br />진행중인 질문</strong>
            <span class="qna-more"><a href="#more">더보기</a></span>
          </p>
        </div>
        <div class="qna-content">
          <div class="ui-tab qna">
            <div class="ui-tab-btns" role="tablist">
              <a href="#" class="ui-tab-btn active" data-tab="1"
                ><i>DEWS UI</i></a
              >
              <a href="#" class="ui-tab-btn" data-tab="2"><i>DEWS J</i></a>
              <a href="#" class="ui-tab-btn" data-tab="3"><i>DEWS FD</i></a>
              <a href="#" class="ui-tab-btn" data-tab="4"><i>DEWS BD</i></a>
            </div>
            <div class="ui-tab-pnls">
              <section id="tab1" class="ui-tab-pnl active" role="tabpanel">
                <ul class="dbs-list qna">
                  <li class="list-qna">
                    <div class="qna-list">
                      <ul class="num">
                        <li><strong>2</strong>추천</li>
                        <li><strong>1</strong>답변</li>
                      </ul>
                      <dl class="text">
                        <a href="#11"
                          ><dt>
                            <strong
                              >CodePicker에서 코드 및 텍스트를 커스텀하게 설정할
                              수 있는 방법이 있나요?</strong
                            >
                          </dt>
                          <dd>
                            폼 패널 내부의 코드피커에서 코드와 텍스트를 변경하여
                            바인딩을 하고 싶습니다. 작성을 해보니 잘 되는 것
                            처럼 보이지만, 실제 동작시에는 이후 프로세스에
                            문제가 발생하고 있습니다. 어떻게 처리해야…
                          </dd></a
                        >
                        <dd class="user-info">
                          <span>2시간전</span><span>김고객(customer01)</span
                          ><span>조회 14</span>
                        </dd>
                      </dl>
                    </div>
                  </li>
                  <li class="list-qna">
                    <div class="qna-list">
                      <ul class="num">
                        <li><strong>0</strong>추천</li>
                        <li><strong>1</strong>답변</li>
                      </ul>
                      <dl class="text">
                        <a href="#11"
                          ><dt>
                            <strong
                              >CodePicker에서 코드 및 텍스트를 커스텀하게 설정할
                              수 있는 방법이 있나요?</strong
                            >
                          </dt>
                          <dd>
                            폼 패널 내부의 코드피커에서 코드와 텍스트를 변경하여
                            바인딩을 하고 싶습니다. 작성을 해보니 잘 되는 것
                            처럼 보이지만, 실제 동작시에는 이후 프로세스에
                            문제가 발생하고 있습니다. 어떻게 처리해야…
                          </dd></a
                        >
                        <dd class="user-info">
                          <span>2시간전</span><span>김고객(customer01)</span
                          ><span>조회 14</span>
                        </dd>
                      </dl>
                    </div>
                  </li>
                  <li class="list-qna">
                    <div class="qna-list">
                      <ul class="num">
                        <li><strong>0</strong>추천</li>
                        <li><strong>1</strong>답변</li>
                      </ul>
                      <dl class="text">
                        <a href="#11"
                          ><dt>
                            <strong
                              >CodePicker에서 코드 및 텍스트를 커스텀하게 설정할
                              수 있는 방법이 있나요?</strong
                            >
                          </dt>
                          <dd>
                            폼 패널 내부의 코드피커에서 코드와 텍스트를 변경하여
                            바인딩을 하고 싶습니다. 작성을 해보니 잘 되는 것
                            처럼 보이지만, 실제 동작시에는 이후 프로세스에
                            문제가 발생하고 있습니다. 어떻게 처리해야…
                          </dd></a
                        >
                        <dd class="user-info">
                          <span>2시간전</span><span>김고객(customer01)</span
                          ><span>조회 14</span>
                        </dd>
                      </dl>
                    </div>
                  </li>
                </ul>
              </section>
              <section id="tab2" class="ui-tab-pnl" role="tabpanel">
                <ul class="dbs-list qna">
                  <li class="list-qna">
                    <div class="qna-list">
                      <ul class="num">
                        <li><strong>2</strong>추천</li>
                        <li><strong>1</strong>답변</li>
                      </ul>
                      <dl class="text">
                        <a href="#11"
                          ><dt>
                            <strong
                              >CodePicker에서 코드 및 텍스트를 커스텀하게 설정할
                              수 있는 방법이 있나요?</strong
                            >
                          </dt>
                          <dd>
                            폼 패널 내부의 코드피커에서 코드와 텍스트를 변경하여
                            바인딩을 하고 싶습니다. 작성을 해보니 잘 되는 것
                            처럼 보이지만, 실제 동작시에는 이후 프로세스에
                            문제가 발생하고 있습니다. 어떻게 처리해야…
                          </dd></a
                        >
                        <dd class="user-info">
                          <span>2시간전</span><span>김고객(customer01)</span
                          ><span>조회 14</span>
                        </dd>
                      </dl>
                    </div>
                  </li>
                  <li class="list-qna">
                    <div class="qna-list">
                      <ul class="num">
                        <li><strong>0</strong>추천</li>
                        <li><strong>1</strong>답변</li>
                      </ul>
                      <dl class="text">
                        <a href="#11"
                          ><dt>
                            <strong
                              >CodePicker에서 코드 및 텍스트를 커스텀하게 설정할
                              수 있는 방법이 있나요?</strong
                            >
                          </dt>
                          <dd>
                            폼 패널 내부의 코드피커에서 코드와 텍스트를 변경하여
                            바인딩을 하고 싶습니다. 작성을 해보니 잘 되는 것
                            처럼 보이지만, 실제 동작시에는 이후 프로세스에
                            문제가 발생하고 있습니다. 어떻게 처리해야…
                          </dd></a
                        >
                        <dd class="user-info">
                          <span>2시간전</span><span>김고객(customer01)</span
                          ><span>조회 14</span>
                        </dd>
                      </dl>
                    </div>
                  </li>
                  <li class="list-qna">
                    <div class="qna-list">
                      <ul class="num">
                        <li><strong>0</strong>추천</li>
                        <li><strong>1</strong>답변</li>
                      </ul>
                      <dl class="text">
                        <a href="#11"
                          ><dt>
                            <strong
                              >CodePicker에서 코드 및 텍스트를 커스텀하게 설정할
                              수 있는 방법이 있나요?</strong
                            >
                          </dt>
                          <dd>
                            폼 패널 내부의 코드피커에서 코드와 텍스트를 변경하여
                            바인딩을 하고 싶습니다. 작성을 해보니 잘 되는 것
                            처럼 보이지만, 실제 동작시에는 이후 프로세스에
                            문제가 발생하고 있습니다. 어떻게 처리해야…
                          </dd></a
                        >
                        <dd class="user-info">
                          <span>2시간전</span><span>김고객(customer01)</span
                          ><span>조회 14</span>
                        </dd>
                      </dl>
                    </div>
                  </li>
                </ul>
              </section>
              <section id="tab3" class="ui-tab-pnl" role="tabpanel">
                <ul class="dbs-list qna">
                  <li class="list-qna">
                    <div class="qna-list">
                      <ul class="num">
                        <li><strong>2</strong>추천</li>
                        <li><strong>1</strong>답변</li>
                      </ul>
                      <dl class="text">
                        <a href="#11"
                          ><dt>
                            <strong
                              >CodePicker에서 코드 및 텍스트를 커스텀하게 설정할
                              수 있는 방법이 있나요?</strong
                            >
                          </dt>
                          <dd>
                            폼 패널 내부의 코드피커에서 코드와 텍스트를 변경하여
                            바인딩을 하고 싶습니다. 작성을 해보니 잘 되는 것
                            처럼 보이지만, 실제 동작시에는 이후 프로세스에
                            문제가 발생하고 있습니다. 어떻게 처리해야…
                          </dd></a
                        >
                        <dd class="user-info">
                          <span>2시간전</span><span>김고객(customer01)</span
                          ><span>조회 14</span>
                        </dd>
                      </dl>
                    </div>
                  </li>
                  <li class="list-qna">
                    <div class="qna-list">
                      <ul class="num">
                        <li><strong>0</strong>추천</li>
                        <li><strong>1</strong>답변</li>
                      </ul>
                      <dl class="text">
                        <a href="#11"
                          ><dt>
                            <strong
                              >CodePicker에서 코드 및 텍스트를 커스텀하게 설정할
                              수 있는 방법이 있나요?</strong
                            >
                          </dt>
                          <dd>
                            폼 패널 내부의 코드피커에서 코드와 텍스트를 변경하여
                            바인딩을 하고 싶습니다. 작성을 해보니 잘 되는 것
                            처럼 보이지만, 실제 동작시에는 이후 프로세스에
                            문제가 발생하고 있습니다. 어떻게 처리해야…
                          </dd></a
                        >
                        <dd class="user-info">
                          <span>2시간전</span><span>김고객(customer01)</span
                          ><span>조회 14</span>
                        </dd>
                      </dl>
                    </div>
                  </li>
                  <li class="list-qna">
                    <div class="qna-list">
                      <ul class="num">
                        <li><strong>0</strong>추천</li>
                        <li><strong>1</strong>답변</li>
                      </ul>
                      <dl class="text">
                        <a href="#11"
                          ><dt>
                            <strong
                              >CodePicker에서 코드 및 텍스트를 커스텀하게 설정할
                              수 있는 방법이 있나요?</strong
                            >
                          </dt>
                          <dd>
                            폼 패널 내부의 코드피커에서 코드와 텍스트를 변경하여
                            바인딩을 하고 싶습니다. 작성을 해보니 잘 되는 것
                            처럼 보이지만, 실제 동작시에는 이후 프로세스에
                            문제가 발생하고 있습니다. 어떻게 처리해야…
                          </dd></a
                        >
                        <dd class="user-info">
                          <span>2시간전</span><span>김고객(customer01)</span
                          ><span>조회 14</span>
                        </dd>
                      </dl>
                    </div>
                  </li>
                </ul>
              </section>
              <section id="tab4" class="ui-tab-pnl" role="tabpanel">
                <ul class="dbs-list qna">
                  <li class="list-qna">
                    <div class="qna-list">
                      <ul class="num">
                        <li><strong>2</strong>추천</li>
                        <li><strong>1</strong>답변</li>
                      </ul>
                      <dl class="text">
                        <a href="#11"
                          ><dt>
                            <strong
                              >CodePicker에서 코드 및 텍스트를 커스텀하게 설정할
                              수 있는 방법이 있나요?</strong
                            >
                          </dt>
                          <dd>
                            폼 패널 내부의 코드피커에서 코드와 텍스트를 변경하여
                            바인딩을 하고 싶습니다. 작성을 해보니 잘 되는 것
                            처럼 보이지만, 실제 동작시에는 이후 프로세스에
                            문제가 발생하고 있습니다. 어떻게 처리해야…
                          </dd></a
                        >
                        <dd class="user-info">
                          <span>2시간전</span><span>김고객(customer01)</span
                          ><span>조회 14</span>
                        </dd>
                      </dl>
                    </div>
                  </li>
                  <li class="list-qna">
                    <div class="qna-list">
                      <ul class="num">
                        <li><strong>0</strong>추천</li>
                        <li><strong>1</strong>답변</li>
                      </ul>
                      <dl class="text">
                        <a href="#11"
                          ><dt>
                            <strong
                              >CodePicker에서 코드 및 텍스트를 커스텀하게 설정할
                              수 있는 방법이 있나요?</strong
                            >
                          </dt>
                          <dd>
                            폼 패널 내부의 코드피커에서 코드와 텍스트를 변경하여
                            바인딩을 하고 싶습니다. 작성을 해보니 잘 되는 것
                            처럼 보이지만, 실제 동작시에는 이후 프로세스에
                            문제가 발생하고 있습니다. 어떻게 처리해야…
                          </dd></a
                        >
                        <dd class="user-info">
                          <span>2시간전</span><span>김고객(customer01)</span
                          ><span>조회 14</span>
                        </dd>
                      </dl>
                    </div>
                  </li>
                  <li class="list-qna">
                    <div class="qna-list">
                      <ul class="num">
                        <li><strong>0</strong>추천</li>
                        <li><strong>1</strong>답변</li>
                      </ul>
                      <dl class="text">
                        <a href="#11"
                          ><dt>
                            <strong
                              >CodePicker에서 코드 및 텍스트를 커스텀하게 설정할
                              수 있는 방법이 있나요?</strong
                            >
                          </dt>
                          <dd>
                            폼 패널 내부의 코드피커에서 코드와 텍스트를 변경하여
                            바인딩을 하고 싶습니다. 작성을 해보니 잘 되는 것
                            처럼 보이지만, 실제 동작시에는 이후 프로세스에
                            문제가 발생하고 있습니다. 어떻게 처리해야…
                          </dd></a
                        >
                        <dd class="user-info">
                          <span>2시간전</span><span>김고객(customer01)</span
                          ><span>조회 14</span>
                        </dd>
                      </dl>
                    </div>
                  </li>
                </ul>
              </section>
            </div>
          </div>
        </div>
      </div>
      <div class="qna-wrap mgb-80">
        <div class="qna-left-box mgt-30">
          <p class="qna-recommended">
            <strong>추천이 많은 <br />질문/답변</strong>
            <span class="qna-more"><a href="#more">더보기</a></span>
          </p>
        </div>
        <div class="qna-content">
          <div class="ui-tab qna">
            <div class="ui-tab-btns" role="tablist">
              <a href="#" class="ui-tab-btn active" data-tab="11"
                ><i>DEWS UI</i></a
              >
              <a href="#" class="ui-tab-btn" data-tab="12"><i>DEWS J</i></a>
              <a href="#" class="ui-tab-btn" data-tab="13"><i>DEWS FD</i></a>
              <a href="#" class="ui-tab-btn" data-tab="14"><i>DEWS BD</i></a>
            </div>
            <div class="ui-tab-pnls">
              <section id="tab11" class="ui-tab-pnl active" role="tabpanel">
                <ul class="dbs-list qna">
                  <li class="list-qna">
                    <div class="qna-list">
                      <ul class="num">
                        <li><strong>2</strong>추천</li>
                        <li><strong>1</strong>답변</li>
                      </ul>
                      <dl class="text">
                        <a href="#11"
                          ><dt>
                            <strong
                              >CodePicker에서 코드 및 텍스트를 커스텀하게 설정할
                              수 있는 방법이 있나요?</strong
                            >
                          </dt>
                          <dd>
                            폼 패널 내부의 코드피커에서 코드와 텍스트를 변경하여
                            바인딩을 하고 싶습니다. 작성을 해보니 잘 되는 것
                            처럼 보이지만, 실제 동작시에는 이후 프로세스에
                            문제가 발생하고 있습니다. 어떻게 처리해야…
                          </dd></a
                        >
                        <dd class="user-info">
                          <span>2시간전</span><span>김고객(customer01)</span
                          ><span>조회 14</span>
                        </dd>
                      </dl>
                    </div>
                  </li>
                  <li class="list-qna">
                    <div class="qna-list">
                      <ul class="num">
                        <li><strong>0</strong>추천</li>
                        <li><strong>1</strong>답변</li>
                      </ul>
                      <dl class="text">
                        <a href="#11"
                          ><dt>
                            <strong
                              >CodePicker에서 코드 및 텍스트를 커스텀하게 설정할
                              수 있는 방법이 있나요?</strong
                            >
                          </dt>
                          <dd>
                            폼 패널 내부의 코드피커에서 코드와 텍스트를 변경하여
                            바인딩을 하고 싶습니다. 작성을 해보니 잘 되는 것
                            처럼 보이지만, 실제 동작시에는 이후 프로세스에
                            문제가 발생하고 있습니다. 어떻게 처리해야…
                          </dd></a
                        >
                        <dd class="user-info">
                          <span>2시간전</span><span>김고객(customer01)</span
                          ><span>조회 14</span>
                        </dd>
                      </dl>
                    </div>
                  </li>
                  <li class="list-qna">
                    <div class="qna-list">
                      <ul class="num">
                        <li><strong>0</strong>추천</li>
                        <li><strong>1</strong>답변</li>
                      </ul>
                      <dl class="text">
                        <a href="#11"
                          ><dt>
                            <strong
                              >CodePicker에서 코드 및 텍스트를 커스텀하게 설정할
                              수 있는 방법이 있나요?</strong
                            >
                          </dt>
                          <dd>
                            폼 패널 내부의 코드피커에서 코드와 텍스트를 변경하여
                            바인딩을 하고 싶습니다. 작성을 해보니 잘 되는 것
                            처럼 보이지만, 실제 동작시에는 이후 프로세스에
                            문제가 발생하고 있습니다. 어떻게 처리해야…
                          </dd></a
                        >
                        <dd class="user-info">
                          <span>2시간전</span><span>김고객(customer01)</span
                          ><span>조회 14</span>
                        </dd>
                      </dl>
                    </div>
                  </li>
                </ul>
              </section>
              <section id="tab12" class="ui-tab-pnl" role="tabpanel">
                <ul class="dbs-list qna">
                  <li class="list-qna">
                    <div class="qna-list">
                      <ul class="num">
                        <li><strong>2</strong>추천</li>
                        <li><strong>1</strong>답변</li>
                      </ul>
                      <dl class="text">
                        <a href="#11"
                          ><dt>
                            <strong
                              >CodePicker에서 코드 및 텍스트를 커스텀하게 설정할
                              수 있는 방법이 있나요?</strong
                            >
                          </dt>
                          <dd>
                            폼 패널 내부의 코드피커에서 코드와 텍스트를 변경하여
                            바인딩을 하고 싶습니다. 작성을 해보니 잘 되는 것
                            처럼 보이지만, 실제 동작시에는 이후 프로세스에
                            문제가 발생하고 있습니다. 어떻게 처리해야…
                          </dd></a
                        >
                        <dd class="user-info">
                          <span>2시간전</span><span>김고객(customer01)</span
                          ><span>조회 14</span>
                        </dd>
                      </dl>
                    </div>
                  </li>
                  <li class="list-qna">
                    <div class="qna-list">
                      <ul class="num">
                        <li><strong>0</strong>추천</li>
                        <li><strong>1</strong>답변</li>
                      </ul>
                      <dl class="text">
                        <a href="#11"
                          ><dt>
                            <strong
                              >CodePicker에서 코드 및 텍스트를 커스텀하게 설정할
                              수 있는 방법이 있나요?</strong
                            >
                          </dt>
                          <dd>
                            폼 패널 내부의 코드피커에서 코드와 텍스트를 변경하여
                            바인딩을 하고 싶습니다. 작성을 해보니 잘 되는 것
                            처럼 보이지만, 실제 동작시에는 이후 프로세스에
                            문제가 발생하고 있습니다. 어떻게 처리해야…
                          </dd></a
                        >
                        <dd class="user-info">
                          <span>2시간전</span><span>김고객(customer01)</span
                          ><span>조회 14</span>
                        </dd>
                      </dl>
                    </div>
                  </li>
                  <li class="list-qna">
                    <div class="qna-list">
                      <ul class="num">
                        <li><strong>0</strong>추천</li>
                        <li><strong>1</strong>답변</li>
                      </ul>
                      <dl class="text">
                        <a href="#11"
                          ><dt>
                            <strong
                              >CodePicker에서 코드 및 텍스트를 커스텀하게 설정할
                              수 있는 방법이 있나요?</strong
                            >
                          </dt>
                          <dd>
                            폼 패널 내부의 코드피커에서 코드와 텍스트를 변경하여
                            바인딩을 하고 싶습니다. 작성을 해보니 잘 되는 것
                            처럼 보이지만, 실제 동작시에는 이후 프로세스에
                            문제가 발생하고 있습니다. 어떻게 처리해야…
                          </dd></a
                        >
                        <dd class="user-info">
                          <span>2시간전</span><span>김고객(customer01)</span
                          ><span>조회 14</span>
                        </dd>
                      </dl>
                    </div>
                  </li>
                </ul>
              </section>
              <section id="tab13" class="ui-tab-pnl" role="tabpanel">
                <ul class="dbs-list qna">
                  <li class="list-qna">
                    <div class="qna-list">
                      <ul class="num">
                        <li><strong>2</strong>추천</li>
                        <li><strong>1</strong>답변</li>
                      </ul>
                      <dl class="text">
                        <a href="#11"
                          ><dt>
                            <strong
                              >CodePicker에서 코드 및 텍스트를 커스텀하게 설정할
                              수 있는 방법이 있나요?</strong
                            >
                          </dt>
                          <dd>
                            폼 패널 내부의 코드피커에서 코드와 텍스트를 변경하여
                            바인딩을 하고 싶습니다. 작성을 해보니 잘 되는 것
                            처럼 보이지만, 실제 동작시에는 이후 프로세스에
                            문제가 발생하고 있습니다. 어떻게 처리해야…
                          </dd></a
                        >
                        <dd class="user-info">
                          <span>2시간전</span><span>김고객(customer01)</span
                          ><span>조회 14</span>
                        </dd>
                      </dl>
                    </div>
                  </li>
                  <li class="list-qna">
                    <div class="qna-list">
                      <ul class="num">
                        <li><strong>0</strong>추천</li>
                        <li><strong>1</strong>답변</li>
                      </ul>
                      <dl class="text">
                        <a href="#11"
                          ><dt>
                            <strong
                              >CodePicker에서 코드 및 텍스트를 커스텀하게 설정할
                              수 있는 방법이 있나요?</strong
                            >
                          </dt>
                          <dd>
                            폼 패널 내부의 코드피커에서 코드와 텍스트를 변경하여
                            바인딩을 하고 싶습니다. 작성을 해보니 잘 되는 것
                            처럼 보이지만, 실제 동작시에는 이후 프로세스에
                            문제가 발생하고 있습니다. 어떻게 처리해야…
                          </dd></a
                        >
                        <dd class="user-info">
                          <span>2시간전</span><span>김고객(customer01)</span
                          ><span>조회 14</span>
                        </dd>
                      </dl>
                    </div>
                  </li>
                  <li class="list-qna">
                    <div class="qna-list">
                      <ul class="num">
                        <li><strong>0</strong>추천</li>
                        <li><strong>1</strong>답변</li>
                      </ul>
                      <dl class="text">
                        <a href="#11"
                          ><dt>
                            <strong
                              >CodePicker에서 코드 및 텍스트를 커스텀하게 설정할
                              수 있는 방법이 있나요?</strong
                            >
                          </dt>
                          <dd>
                            폼 패널 내부의 코드피커에서 코드와 텍스트를 변경하여
                            바인딩을 하고 싶습니다. 작성을 해보니 잘 되는 것
                            처럼 보이지만, 실제 동작시에는 이후 프로세스에
                            문제가 발생하고 있습니다. 어떻게 처리해야…
                          </dd></a
                        >
                        <dd class="user-info">
                          <span>2시간전</span><span>김고객(customer01)</span
                          ><span>조회 14</span>
                        </dd>
                      </dl>
                    </div>
                  </li>
                </ul>
              </section>
              <section id="tab14" class="ui-tab-pnl" role="tabpanel">
                <ul class="dbs-list qna">
                  <li class="list-qna">
                    <div class="qna-list">
                      <ul class="num">
                        <li><strong>2</strong>추천</li>
                        <li><strong>1</strong>답변</li>
                      </ul>
                      <dl class="text">
                        <a href="#11"
                          ><dt>
                            <strong
                              >CodePicker에서 코드 및 텍스트를 커스텀하게 설정할
                              수 있는 방법이 있나요?</strong
                            >
                          </dt>
                          <dd>
                            폼 패널 내부의 코드피커에서 코드와 텍스트를 변경하여
                            바인딩을 하고 싶습니다. 작성을 해보니 잘 되는 것
                            처럼 보이지만, 실제 동작시에는 이후 프로세스에
                            문제가 발생하고 있습니다. 어떻게 처리해야…
                          </dd></a
                        >
                        <dd class="user-info">
                          <span>2시간전</span><span>김고객(customer01)</span
                          ><span>조회 14</span>
                        </dd>
                      </dl>
                    </div>
                  </li>
                  <li class="list-qna">
                    <div class="qna-list">
                      <ul class="num">
                        <li><strong>0</strong>추천</li>
                        <li><strong>1</strong>답변</li>
                      </ul>
                      <dl class="text">
                        <a href="#11"
                          ><dt>
                            <strong
                              >CodePicker에서 코드 및 텍스트를 커스텀하게 설정할
                              수 있는 방법이 있나요?</strong
                            >
                          </dt>
                          <dd>
                            폼 패널 내부의 코드피커에서 코드와 텍스트를 변경하여
                            바인딩을 하고 싶습니다. 작성을 해보니 잘 되는 것
                            처럼 보이지만, 실제 동작시에는 이후 프로세스에
                            문제가 발생하고 있습니다. 어떻게 처리해야…
                          </dd></a
                        >
                        <dd class="user-info">
                          <span>2시간전</span><span>김고객(customer01)</span
                          ><span>조회 14</span>
                        </dd>
                      </dl>
                    </div>
                  </li>
                  <li class="list-qna">
                    <div class="qna-list">
                      <ul class="num">
                        <li><strong>0</strong>추천</li>
                        <li><strong>1</strong>답변</li>
                      </ul>
                      <dl class="text">
                        <a href="#11"
                          ><dt>
                            <strong
                              >CodePicker에서 코드 및 텍스트를 커스텀하게 설정할
                              수 있는 방법이 있나요?</strong
                            >
                          </dt>
                          <dd>
                            폼 패널 내부의 코드피커에서 코드와 텍스트를 변경하여
                            바인딩을 하고 싶습니다. 작성을 해보니 잘 되는 것
                            처럼 보이지만, 실제 동작시에는 이후 프로세스에
                            문제가 발생하고 있습니다. 어떻게 처리해야…
                          </dd></a
                        >
                        <dd class="user-info">
                          <span>2시간전</span><span>김고객(customer01)</span
                          ><span>조회 14</span>
                        </dd>
                      </dl>
                    </div>
                  </li>
                </ul>
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator';
import ForumHome from '~/components/forumHome/index.vue';

@Component({
  layout: 'TypeA',
  components: {
    ForumHome,
  },
})
export default class extends Vue {}
</script>

<style lang="scss"></style>
