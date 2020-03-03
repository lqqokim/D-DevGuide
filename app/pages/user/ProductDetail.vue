<template>
  <div class="base-wrap not-scroll">
    <!-- 동영상 선택 S-->
    <div class="dbs-dialog-wrap w-826" style="display: none; height: 668px;">
      <div class="dialog-wrap">
        <div class="dbs-dialog-title">
          <h1 class="tit-dialog">동영상 선택</h1>
          <a class="pst-closed" role="button">닫기</a>
        </div>
        <div class="dbs-dialog">
          <p class="tit-con-small mgb-10">DEWS/UI</p>
          <div class="dbs-dialog-box" style="height: 444px;">
            <div class="dbs-dialog-scroll">
              <ul class="thumb-list choice x-small">
                <li>
                  <!-- checkbox가 check 되었을 시 thumb 클래스에 on 추가 -->
                  <div class="thumb">
                    <div class="dbs-checkbox-wrapper">
                      <input
                        id="mvCheck1"
                        type="checkbox"
                        name="movieCheck1"
                        checked
                      />
                      <label for="mvCheck1" class="dbs-checkbox"></label>
                    </div>
                    <img src="../../assets/images/mov_02.jpg" alt="" />
                  </div>
                  <dl class="thumb-desc">
                    <dt>DEWS/UI 기초 교육 시리즈</dt>
                    <dd>3일전<span class="hit">조회 300</span></dd>
                  </dl>
                </li>
                <li>
                  <div class="thumb">
                    <div class="dbs-checkbox-wrapper">
                      <input
                        id="mvCheck2"
                        type="checkbox"
                        name="movieCheck1"
                        checked
                      />
                      <label for="mvCheck2" class="dbs-checkbox"></label>
                    </div>
                    <img src="../../assets/images/mov_03.jpg" alt="" />
                    <em class="btn-time">1:30:41</em>
                  </div>
                  <dl class="thumb-desc">
                    <dt>DEWS 플랫폼 CM - UI편</dt>
                    <dd>3일전<span class="hit">조회 300</span></dd>
                  </dl>
                </li>
                <li>
                  <div class="thumb">
                    <div class="dbs-checkbox-wrapper">
                      <input id="mvCheck3" type="checkbox" name="movieCheck1" />
                      <label for="mvCheck3" class="dbs-checkbox"></label>
                    </div>
                    <img src="../../assets/images/mov_04.jpg" alt="" />
                    <em class="btn-time">10:23</em>
                  </div>
                  <dl class="thumb-desc">
                    <dt>2019 DEWS/UI 세미나 자료</dt>
                    <dd>3일전<span class="hit">조회 300</span></dd>
                  </dl>
                </li>
                <li>
                  <div class="thumb">
                    <div class="dbs-checkbox-wrapper">
                      <input id="mvCheck4" type="checkbox" name="movieCheck1" />
                      <label for="mvCheck4" class="dbs-checkbox"></label>
                    </div>
                    <img src="../../assets/images/mov_05.jpg" alt="" />
                    <em class="btn-time">1:30:41</em>
                  </div>
                  <dl class="thumb-desc">
                    <dt>DEWS/UI 고급자 교육 시리즈</dt>
                    <dd>3일전<span class="hit">조회 300</span></dd>
                  </dl>
                </li>
                <li>
                  <div class="thumb">
                    <div class="dbs-checkbox-wrapper">
                      <input id="mvCheck5" type="checkbox" name="movieCheck1" />
                      <label for="mvCheck5" class="dbs-checkbox"></label>
                    </div>
                    <img src="../../assets/images/mov_03.jpg" alt="" />
                    <em class="btn-time">1:30:41</em>
                  </div>
                  <dl class="thumb-desc">
                    <dt>DEWS 플랫폼 CM - UI편</dt>
                    <dd>2019-11-21<span class="hit">조회 300</span></dd>
                  </dl>
                </li>
                <li>
                  <div class="thumb">
                    <div class="dbs-checkbox-wrapper">
                      <input id="mvCheck6" type="checkbox" name="movieCheck1" />
                      <label for="mvCheck6" class="dbs-checkbox"></label>
                    </div>
                    <img src="../../assets/images/mov_04.jpg" alt="" />
                    <em class="btn-time">10:23</em>
                  </div>
                  <dl class="thumb-desc">
                    <dt>2019 DEWS/UI 세미나 자료</dt>
                    <dd>3일전<span class="hit">조회 300</span></dd>
                  </dl>
                </li>
              </ul>
              <div class="btn-wrap">
                <button type="button" class="btn-main small">더보기</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="dbs-dialog-footer">
        <div class="btn-wrap">
          <button type="button" class="dbs-icon-button text">
            확인
          </button>
          <button type="button" class="dbs-icon-button text">
            취소
          </button>
        </div>
      </div>
    </div>
    <!-- 문서 선택 S -->
    <div class="dbs-dialog-wrap w-826" style="display: none; height: 668px;">
      <div class="dialog-wrap">
        <div class="dbs-dialog-title">
          <h1 class="tit-dialog">문서 선택</h1>
          <a class="pst-closed" role="button">닫기</a>
        </div>
        <div class="dbs-dialog">
          <p class="tit-con-small mgb-10">DEWS/UI</p>
          <div class="dbs-dialog-box" style="height: 444px;">
            <div class="dbs-dialog-scroll">
              <ul class="thumb-list choice x-small-document">
                <li>
                  <!-- checkbox가 check 되었을 시 thumb 클래스에 on 추가 -->
                  <div class="thumb">
                    <div class="dbs-checkbox-wrapper">
                      <input
                        id="mvCheck11"
                        type="checkbox"
                        name="movieCheck01"
                        checked
                      />
                      <label for="mvCheck11" class="dbs-checkbox"></label>
                    </div>
                    <img src="../../assets/images/ex_doc_01.png" alt="" />
                  </div>
                  <dl class="thumb-desc">
                    <dt>
                      <i class="icon-doc pptx">PPTX</i>DEWS/UI 기초 교육 시리즈
                    </dt>
                    <dd>2019-11-21<span class="hit">조회 300</span></dd>
                  </dl>
                </li>
                <li>
                  <div class="thumb">
                    <div class="dbs-checkbox-wrapper">
                      <input
                        id="mvCheck12"
                        type="checkbox"
                        name="movieCheck01"
                        checked
                      />
                      <label for="mvCheck12" class="dbs-checkbox"></label>
                    </div>
                    <img src="../../assets/images/ex_doc_02.png" alt="" />
                  </div>
                  <dl class="thumb-desc">
                    <dt>
                      <i class="icon-doc docx">DOCX</i>DEWS 플랫폼 CM - UI편
                    </dt>
                    <dd>3일전<span class="hit">조회 300</span></dd>
                  </dl>
                </li>
                <li>
                  <div class="thumb">
                    <div class="dbs-checkbox-wrapper">
                      <input
                        id="mvCheck13"
                        type="checkbox"
                        name="movieCheck01"
                      />
                      <label for="mvCheck13" class="dbs-checkbox"></label>
                    </div>
                    <img src="../../assets/images/ex_doc_01.png" alt="" />
                  </div>
                  <dl class="thumb-desc">
                    <dt>
                      <i class="icon-doc xlsx">XLSX</i>2019 DEWS/UI 세미나 자료
                    </dt>
                    <dd>2019-11-21<span class="hit">조회 300</span></dd>
                  </dl>
                </li>
                <li>
                  <div class="thumb">
                    <div class="dbs-checkbox-wrapper">
                      <input
                        id="mvCheck14"
                        type="checkbox"
                        name="movieCheck01"
                      />
                      <label for="mvCheck14" class="dbs-checkbox"></label>
                    </div>
                    <img src="../../assets/images/ex_doc_01.png" alt="" />
                  </div>
                  <dl class="thumb-desc">
                    <dt>
                      <i class="icon-doc pdf">PDF</i>DEWS/UI 고급자 교육 시리즈
                    </dt>
                    <dd>2019-11-21<span class="hit">조회 300</span></dd>
                  </dl>
                </li>
                <li>
                  <div class="thumb">
                    <div class="dbs-checkbox-wrapper">
                      <input
                        id="mvCheck15"
                        type="checkbox"
                        name="movieCheck01"
                      />
                      <label for="mvCheck15" class="dbs-checkbox"></label>
                    </div>
                    <img src="../../assets/images/ex_doc_02.png" alt="" />
                  </div>
                  <dl class="thumb-desc">
                    <dt>
                      <i class="icon-doc hwp">HWP</i>DEWS 플랫폼 CM - UI편
                    </dt>
                    <dd>1달전<span class="hit">조회 300</span></dd>
                  </dl>
                </li>
                <li>
                  <div class="thumb">
                    <div class="dbs-checkbox-wrapper">
                      <input
                        id="mvCheck16"
                        type="checkbox"
                        name="movieCheck01"
                      />
                      <label for="mvCheck16" class="dbs-checkbox"></label>
                    </div>
                    <img src="../../assets/images/ex_doc_02.png" alt="" />
                  </div>
                  <dl class="thumb-desc">
                    <dt>
                      <i class="icon-doc pdf">PDF</i>2019 DEWS/UI 세미나 자료
                    </dt>
                    <dd>2019-11-21<span class="hit">조회 300</span></dd>
                  </dl>
                </li>
              </ul>
              <div class="btn-wrap">
                <button type="button" class="btn-main small">더보기</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="dbs-dialog-footer">
        <div class="btn-wrap">
          <button type="button" class="dbs-icon-button text">
            확인
          </button>
          <button type="button" class="dbs-icon-button text">
            취소
          </button>
        </div>
      </div>
    </div>
    <!-- 다운로드 선택 S -->
    <div class="dbs-dialog-wrap w-826" style="display: none; height: 684px;">
      <div class="dialog-wrap">
        <div class="dbs-dialog-title">
          <h1 class="tit-dialog">다운로드 선택</h1>
          <a class="pst-closed" role="button">닫기</a>
        </div>
        <div class="dbs-dialog">
          <p class="tit-con-small mgb-10">DEWS/UI</p>
          <div class="dbs-dialog-box overflow-y" style="height: 460px;">
            <ul class="thumb-list choice download">
              <li>
                <div class="download-text">
                  <div class="dbs-checkbox-wrapper">
                    <input id="mvCheck21" type="checkbox" name="movieCheck02" />
                    <label for="mvCheck21" class="dbs-checkbox"></label>
                  </div>
                  <dl class="thumb-desc">
                    <dt>DEWS Back-end Framework v1.0 (Compressed)</dt>
                    <dd>
                      <span>Search Place 연동관련_첨부파일.zip</span
                      ><span class="hit">16KB</span
                      ><span class="hit">다운로드 320</span>
                    </dd>
                  </dl>
                </div>
              </li>
              <li>
                <div class="download-text">
                  <div class="dbs-checkbox-wrapper">
                    <input id="mvCheck22" type="checkbox" name="movieCheck02" />
                    <label for="mvCheck22" class="dbs-checkbox"></label>
                  </div>
                  <dl class="thumb-desc">
                    <dt>
                      DEWS Back-end Framework v1.0 (Compressed) DEWS Back-end
                      Framework v1.0 (Compressed) 제목이 긴 경우 입니다 제목이
                      긴 경우 입니다.
                    </dt>
                    <dd>
                      <span>Search Place 연동관련_첨부파일.zip</span
                      ><span class="hit">16KB</span
                      ><span class="hit">다운로드 320</span>
                    </dd>
                  </dl>
                </div>
              </li>
              <li>
                <div class="download-text">
                  <div class="dbs-checkbox-wrapper">
                    <input id="mvCheck23" type="checkbox" name="movieCheck02" />
                    <label for="mvCheck23" class="dbs-checkbox"></label>
                  </div>
                  <dl class="thumb-desc">
                    <dt>DEWS Back-end Framework v1.0 (Compressed)</dt>
                    <dd>
                      <span>Search Place 연동관련_첨부파일.zip</span
                      ><span class="hit">16KB</span
                      ><span class="hit">다운로드 320</span>
                    </dd>
                  </dl>
                </div>
              </li>
              <li>
                <div class="download-text">
                  <div class="dbs-checkbox-wrapper">
                    <input id="mvCheck24" type="checkbox" name="movieCheck02" />
                    <label for="mvCheck24" class="dbs-checkbox"></label>
                  </div>
                  <dl class="thumb-desc">
                    <dt>DEWS Back-end Framework v1.0 (Compressed)</dt>
                    <dd>
                      <span>Search Place 연동관련_첨부파일.zip</span
                      ><span class="hit">16KB</span
                      ><span class="hit">다운로드 320</span>
                    </dd>
                  </dl>
                </div>
              </li>
              <li>
                <div class="download-text">
                  <div class="dbs-checkbox-wrapper">
                    <input id="mvCheck25" type="checkbox" name="movieCheck02" />
                    <label for="mvCheck25" class="dbs-checkbox"></label>
                  </div>
                  <dl class="thumb-desc">
                    <dt>
                      DEWS Back-end Framework v1.0 (Compressed) DEWS Back-end
                      Framework v1.0 (Compressed) 제목이 긴 경우 입니다 제목이
                      긴 경우 입니다.
                    </dt>
                    <dd>
                      <span>Search Place 연동관련_첨부파일.zip</span
                      ><span class="hit">16KB</span
                      ><span class="hit">다운로드 320</span>
                    </dd>
                  </dl>
                </div>
              </li>
            </ul>
            <div class="btn-wrap">
              <button type="button" class="btn-main small">더보기</button>
            </div>
          </div>
        </div>
      </div>
      <div class="dbs-dialog-footer">
        <div class="btn-wrap">
          <button type="button" class="dbs-icon-button text">
            확인
          </button>
          <button type="button" class="dbs-icon-button text">
            취소
          </button>
        </div>
      </div>
    </div>
    <!-- 그룹웨어 사용자 검색 S-->
    <div class="dbs-dialog-wrap w-700" style="display: none; height: 673px;">
      <div class="dialog-wrap">
        <div class="dbs-dialog-title">
          <h1 class="tit-dialog">그룹웨어 사용자 검색</h1>
          <a class="pst-closed" role="button">닫기</a>
        </div>
        <div class="dbs-dialog">
          <div class="dbs-dialog-form mgb-10">
            <div class="ui-select w-170">
              <select title="품목형태" class="off" tabindex="-1">
                <option value="0" selected="">master</option>
                <option value="1">품목1</option>
                <option value="2">품목2</option>
              </select>
              <button type="button" class="ui-select-btn" title="전체">
                전체
              </button>
              <div class="ui-select-wrap">
                <div class="ui-select-options">
                  <button
                    type="button"
                    class="ui-select-opt selected"
                    value="이름"
                  >
                    <b class="ui-select-txt">이름</b>
                  </button>
                  <button type="button" class="ui-select-opt" value="직급">
                    <b class="ui-select-txt">직급</b>
                  </button>
                  <button type="button" class="ui-select-opt" value="부서">
                    <b class="ui-select-txt">부서</b>
                  </button>
                  <button type="button" class="ui-select-opt" value="아이디">
                    <b class="ui-select-txt">아이디</b>
                  </button>
                </div>
              </div>
            </div>
            <div class="srch-wrap-bar-dialog">
              <div class="srch-wrap">
                <input type="search" class="m-srch-bar" />
                <button type="button" class="btn-search small">
                  search
                </button>
              </div>
            </div>
          </div>
          <div class="tbl-wrap" style="height: 448px;">
            <table class="tbl-write-ver tbl-fixed">
              <colgroup>
                <col style="width: auto;" />
                <col style="width: auto;" />
                <col style="width: 40%;" />
                <col style="width: auto;" />
              </colgroup>
              <thead>
                <tr>
                  <th>이름</th>
                  <th>직급</th>
                  <th>부서</th>
                  <th>아이디</th>
                </tr>
              </thead>
              <tbody>
                <!-- TO DO 결과가 없을 때-->
                <!--<tr>-->
                <!--<td colspan="4">-->
                <!--<p class="no-result">검색결과가 없습니다.</p>-->
                <!--</td>-->
                <!--</tr>-->
                <tr>
                  <td>노휘겸</td>
                  <td>수석연구원</td>
                  <td class="txt-left">ERP개발본부 > 플랫폼개발1팀 > 팀장</td>
                  <td class="txt-left">Whistle</td>
                </tr>
                <tr>
                  <td>김인수</td>
                  <td>연구원</td>
                  <td class="txt-left">ERP개발본부 > 플랫폼개발1팀</td>
                  <td class="txt-left">kis</td>
                </tr>
                <tr>
                  <td>안예솔</td>
                  <td>연구원</td>
                  <td class="txt-left">ERP개발본부 > 플랫폼개발1팀</td>
                  <td class="txt-left">ays</td>
                </tr>
                <tr>
                  <td>김인수</td>
                  <td>연구원</td>
                  <td class="txt-left">ERP개발본부 > 플랫폼개발1팀</td>
                  <td class="txt-left">kis</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div class="dbs-dialog-footer">
        <div class="btn-wrap">
          <button type="button" class="dbs-icon-button text">
            확인
          </button>
          <button type="button" class="dbs-icon-button text">
            취소
          </button>
        </div>
      </div>
    </div>
    <!-- Git폴더 탐색기 1 -->
    <div class="dbs-dialog-wrap w-700" style="display: none; height: 673px;">
      <div class="dialog-wrap">
        <div class="dbs-dialog-title">
          <h1 class="tit-dialog">Git 폴더 탐색기</h1>
          <a class="pst-closed" role="button">닫기</a>
        </div>
        <div class="dbs-dialog">
          <div class="gray-info-box">
            <div class="box-desc">
              <ul class="bul-round-box">
                <li><span>프로젝트 ID</span> dews 15</li>
              </ul>
            </div>
            <div class="box-desc">
              <ul class="bul-round-box">
                <li><span>브랜치</span> master</li>
              </ul>
            </div>
          </div>
          <div class="dialog-menu-tree mgt-20" style="height: 407px;">
            <tree
              :data="treeData"
              :options="treeOptions"
              @node:dragging:start="logDragStart"
              @node:dragging:finish="logDragFinish"
            />
          </div>
        </div>
      </div>
      <!-- button 영역 -->
      <div class="dbs-dialog-footer">
        <div class="btn-wrap">
          <button type="button" class="dbs-icon-button text">
            확인
          </button>
          <button type="button" class="dbs-icon-button text">
            취소
          </button>
        </div>
      </div>
    </div>
    <!-- 병합요청 S -->
    <div class="dbs-dialog-wrap w-700" style="display: none; height: 445px;">
      <div class="dialog-wrap">
        <div class="dbs-dialog-title">
          <h1 class="tit-dialog">병합 요청</h1>
          <a class="pst-closed" role="button">닫기</a>
        </div>
        <div class="dbs-dialog">
          <div class="gray-info-box">
            <p>
              <span class="font-accent-color">DEWS/UI</span>제품의 기준 브랜치인
              <strong>master</strong> 브랜치에
              <strong>BizboxBizboxIntegrations</strong> 브랜치의 병합을
              요청합니다.
            </p>
          </div>
          <div class="dialog-form mgt-20">
            <p>
              <label>제목</label>
              <input type="text" class="inp-base" />
            </p>
            <p class="mgt-5">
              <label>설명</label>
              <textarea style="resize: none; height: 120px;"></textarea>
            </p>
          </div>
        </div>
      </div>
      <!-- button 영역 -->
      <div class="dbs-dialog-footer">
        <div class="btn-wrap">
          <button type="button" class="dbs-icon-button text">
            확인
          </button>
          <button type="button" class="dbs-icon-button text">
            취소
          </button>
        </div>
      </div>
    </div>
    <!-- Git폴더 탐색기 2 -->
    <div class="dbs-dialog-wrap w-700" style="display: none; height: 673px;">
      <div class="dialog-wrap">
        <div class="dbs-dialog-title">
          <h1 class="tit-dialog">Git 폴더 탐색기</h1>
          <a class="pst-closed" role="button">닫기</a>
        </div>
        <div class="dbs-dialog">
          <div class="gray-info-box mgb-20">
            <div class="box-desc">
              <ul class="bul-round-box">
                <li><span>프로젝트 ID</span> dews 15</li>
                <li><span>기본경로</span> /docs</li>
              </ul>
            </div>
            <div class="box-desc">
              <ul class="bul-round-box">
                <li><span>브랜치</span> master</li>
              </ul>
            </div>
          </div>
          <div class="dialog-form mgb-10">
            <p class="fr">
              <input type="text" placeholder="directoryName" class="inp-base" />
              <button
                type="button"
                class="dbs-icon-button ico-left small confirm"
              >
                확인
              </button>
              <!-- TO DO 폴더 일때-->
              <!--<button type="button" class="dbs-icon-button ico-left small file">-->
              <!--새폴더-->
              <!--</button>-->
            </p>
            <!--<p>-->
            <!--<label>브랜치 명</label>-->
            <!--<input type="text" placeholder="/docs" class="inp-base" />-->
            <!--</p>-->
          </div>
          <div class="dialog-menu-tree" style="height: 340px;">
            <tree
              :data="treeData"
              :options="treeOptions"
              @node:dragging:start="logDragStart"
              @node:dragging:finish="logDragFinish"
            />
          </div>
        </div>
      </div>
      <!-- button 영역 -->
      <div class="dbs-dialog-footer">
        <div class="btn-wrap">
          <button type="button" class="dbs-icon-button text">
            확인
          </button>
          <button type="button" class="dbs-icon-button text">
            취소
          </button>
        </div>
      </div>
    </div>
    <!-- 새페이지 생성  -->
    <div class="dbs-dialog-wrap w-700" style="display: none; height: 537px;">
      <div class="dialog-wrap">
        <div class="dbs-dialog-title">
          <h1 class="tit-dialog">새 페이지 생성</h1>
          <a class="pst-closed" role="button">닫기</a>
        </div>
        <div class="dbs-dialog">
          <div class="gray-info-box mgb-20">
            <div class="box-desc">
              <ul class="bul-round-box">
                <li><span>프로젝트 ID</span> dews 15</li>
                <li><span>기본경로</span> /docs</li>
              </ul>
            </div>
            <div class="box-desc">
              <ul class="bul-round-box">
                <li><span>브랜치</span> master</li>
              </ul>
            </div>
          </div>
          <div class="dialog-form">
            <p>
              <label>문서 제목</label>
              <input type="text" placeholder="시작하기" class="inp-base" />
            </p>
          </div>
          <div class="white-info-box mgt-10">
            <div class="radio-button-wrap">
              <p>
                <input
                  id="uiChk1_1"
                  type="radio"
                  name="uiCheck1"
                  class="dews-ui-radio"
                />
                <label for="uiChk1_1" class="dews-radio">신규페이지 생성</label>
              </p>
              <div class="dialog-form mgt-20">
                <p>
                  <label>경로</label>
                  <input type="text" placeholder="/docs" class="inp-base" />
                  <button type="button" class="dbs-icon-button file"></button>
                </p>
                <p>
                  <label>파일명</label>
                  <input
                    type="text"
                    placeholder="newpage.md"
                    class="inp-base status-success"
                  />
                </p>
              </div>
              <p class="mgt-20">
                <input
                  id="uiChk1_2"
                  type="radio"
                  name="uiCheck1"
                  class="dews-ui-radio"
                />
                <label for="uiChk1_2" class="dews-radio">기존페이지 사용</label>
              </p>
              <div class="dialog-form mgt-20">
                <p>
                  <label>경로</label>
                  <input type="text" class="inp-base" disabled />
                  <button
                    type="button"
                    class="dbs-icon-button file"
                    disabled
                  ></button>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- button 영역 -->
      <div class="dbs-dialog-footer">
        <div class="btn-wrap">
          <button type="button" class="dbs-icon-button text">
            확인
          </button>
          <button type="button" class="dbs-icon-button text">
            취소
          </button>
        </div>
      </div>
    </div>
    <!-- Git파일 탐색기 1 -->
    <div class="dbs-dialog-wrap w-700" style="display: none; height: 673px;">
      <div class="dialog-wrap">
        <div class="dbs-dialog-title">
          <h1 class="tit-dialog">Git 폴더 탐색기</h1>
          <a class="pst-closed" role="button">닫기</a>
        </div>
        <div class="dbs-dialog">
          <div class="gray-info-box mgb-20">
            <div class="box-desc">
              <ul class="bul-round-box">
                <li><span>프로젝트 ID</span> dews 15</li>
                <li><span>기본경로</span> /docs</li>
              </ul>
            </div>
            <div class="box-desc">
              <ul class="bul-round-box">
                <li><span>브랜치</span> master</li>
              </ul>
            </div>
          </div>
          <div class="dialog-flex" style="height: 376px;">
            <div class="dialog-menu-tree">
              <tree
                :data="treeData"
                :options="treeOptions"
                @node:dragging:start="logDragStart"
                @node:dragging:finish="logDragFinish"
              />
            </div>
            <div class="menu-file">
              <div class="tbl-wrap bdr-bot-none">
                <table class="tbl-write-ver no-line tbl-fixed">
                  <colgroup>
                    <col style="width: auto;" />
                    <col style="width: 20%;" />
                  </colgroup>
                  <thead>
                    <tr>
                      <th class="txt-left">파일명</th>
                      <th>용량</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td class="txt-left">
                        <div class="radio-button-wrap">
                          <input
                            id="uiChk11_1"
                            type="radio"
                            name="uiCheck11"
                            class="dews-ui-radio"
                          />
                          <label for="uiChk11_1" class="dews-radio"
                            >index.md
                          </label>
                        </div>
                      </td>
                      <td class="txt-data">123KB</td>
                    </tr>
                    <tr>
                      <td class="txt-left">
                        <div class="radio-button-wrap">
                          <input
                            id="uiChk11_2"
                            type="radio"
                            name="uiCheck11"
                            class="dews-ui-radio"
                          />
                          <label for="uiChk11_2" class="dews-radio"
                            ><span class="file-name" data-filetype=".md"
                              ><em
                                >Search PlaceGetstaredSearch
                                PlaceGetstaredSearch PlaceGetstaredSearch
                                PlaceGetstared.md</em
                              >
                            </span></label
                          >
                        </div>
                      </td>
                      <td class="txt-data">12KB</td>
                    </tr>
                    <tr>
                      <td class="txt-left">
                        <div class="radio-button-wrap">
                          <input
                            id="uiChk11_3"
                            type="radio"
                            name="uiCheck11"
                            class="dews-ui-radio"
                          />
                          <label for="uiChk11_3" class="dews-radio"
                            >getstared.md
                          </label>
                        </div>
                      </td>
                      <td class="txt-data">124KB</td>
                    </tr>
                    <tr>
                      <td class="txt-left">
                        <div class="radio-button-wrap">
                          <input
                            id="uiChk11_4"
                            type="radio"
                            name="uiCheck11"
                            class="dews-ui-radio"
                          />
                          <label for="uiChk11_4" class="dews-radio"
                            >getstared.md
                          </label>
                        </div>
                      </td>
                      <td class="txt-data">12KB</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- button 영역 -->
      <div class="dbs-dialog-footer">
        <div class="btn-wrap">
          <button type="button" class="dbs-icon-button text">
            확인
          </button>
          <button type="button" class="dbs-icon-button text">
            취소
          </button>
        </div>
      </div>
    </div>
    <!-- Git파일 탐색기 -->
    <div class="dbs-dialog-wrap w-700" style="display: block; height: 673px;">
      <div class="dialog-wrap">
        <div class="dbs-dialog-title">
          <h1 class="tit-dialog">Git 폴더 탐색기</h1>
          <a class="pst-closed" role="button">닫기</a>
        </div>
        <div class="dbs-dialog">
          <div class="gray-info-box mgb-20">
            <div class="box-desc">
              <ul class="bul-round-box">
                <li><span>프로젝트 ID</span> dews 15</li>
                <li><span>기본경로</span> /docs</li>
              </ul>
            </div>
            <div class="box-desc">
              <ul class="bul-round-box">
                <li><span>브랜치</span> master</li>
              </ul>
            </div>
          </div>
          <div class="dialog-form mgb-10">
            <p class="fr">
              <button
                type="button"
                class="dbs-icon-button ico-left small upload"
              >
                업로드
              </button>
            </p>
          </div>
          <div class="dialog-flex" style="height: 336px;">
            <div class="dialog-menu-tree">
              <tree
                :data="treeData"
                :options="treeOptions"
                @node:dragging:start="logDragStart"
                @node:dragging:finish="logDragFinish"
              />
            </div>
            <div class="menu-file">
              <div class="tbl-wrap bdr-bot-none">
                <table class="tbl-write-ver no-line tbl-fixed">
                  <colgroup>
                    <col style="width: auto;" />
                    <col style="width: 20%;" />
                  </colgroup>
                  <thead>
                    <tr>
                      <th class="txt-left">파일명</th>
                      <th>용량</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td class="txt-left">
                        <div class="dbs-checkbox-wrapper">
                          <input
                            id="uiCheck1"
                            type="checkbox"
                            name="uiCheck1"
                          />
                          <label for="uiCheck1" class="dbs-checkbox"
                            >index.md</label
                          >
                        </div>
                      </td>
                      <td class="txt-data">123KB</td>
                    </tr>
                    <tr>
                      <td class="txt-left">
                        <div class="dbs-checkbox-wrapper">
                          <input
                            id="uiCheck2"
                            type="checkbox"
                            name="uiCheck3"
                          />
                          <label for="uiCheck2" class="dbs-checkbox">
                            <span class="file-name" data-filetype=".md"
                              ><em
                                >Search PlaceGetstaredSearch
                                PlaceGetstaredSearch PlaceGetstaredSearch
                                PlaceGetstared.md</em
                              ></span
                            ></label
                          >
                        </div>
                      </td>
                      <td class="txt-data">12KB</td>
                    </tr>
                    <tr>
                      <td class="txt-left">
                        <div class="dbs-checkbox-wrapper">
                          <input
                            id="uiCheck3"
                            type="checkbox"
                            name="uiCheck1"
                          />
                          <label for="uiCheck3" class="dbs-checkbox"
                            >getstared.md</label
                          >
                        </div>
                      </td>
                      <td class="txt-data">124KB</td>
                    </tr>
                    <tr>
                      <td class="txt-left">
                        <div class="dbs-checkbox-wrapper">
                          <input
                            id="uiCheck4"
                            type="checkbox"
                            name="uiCheck1"
                          />
                          <label for="uiCheck4" class="dbs-checkbox"
                            >getstared.md</label
                          >
                        </div>
                      </td>
                      <td class="txt-data">12KB</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- button 영역 -->
      <div class="dbs-dialog-footer">
        <div class="btn-wrap">
          <button type="button" class="dbs-icon-button text">
            확인
          </button>
          <button type="button" class="dbs-icon-button text">
            취소
          </button>
        </div>
      </div>
    </div>
    <!-- 새 브랜치 작성 S-->
    <div class="dbs-dialog-wrap w-700" style="display: none; height: 320px;">
      <div class="dialog-wrap">
        <div class="dbs-dialog-title">
          <h1 class="tit-dialog">새 브랜치 작성</h1>
          <a class="pst-closed" role="button">닫기</a>
        </div>
        <div class="dbs-dialog">
          <div class="gray-info-box mgb-20">
            <p>
              <span class="font-accent-color">DEWS/UI</span>제품의 기준 브랜치인
              <strong>master</strong> 브랜치에서 새로운 브랜치를 생성합니다.<br />
              브랜치 명은 영문으로 작성해주세요.
            </p>
          </div>
          <div class="dialog-form">
            <p>
              <label>브랜치 명</label>
              <input type="text" placeholder="/docs" class="inp-base" />
            </p>
          </div>
        </div>
      </div>
      <!-- button 영역 -->
      <div class="dbs-dialog-footer">
        <div class="btn-wrap">
          <button type="button" class="dbs-icon-button text">
            확인
          </button>
          <button type="button" class="dbs-icon-button text">
            취소
          </button>
        </div>
      </div>
    </div>
    <div class="dbs-overlay"></div>
  </div>
</template>
<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator';
// import ProductDetail from '@/components/productDetail/index.vue';

@Component
// ({
//   layout: 'login',
//   components: {
//     ProductDetail,
//   },
// })
// export default class extends Vue {}
export default class extends Vue {
  treeData = getTreeData();

  treeOptions = {
    propertyNames: {
      text: 'MY_TEXT',
      children: 'KIDS',
      state: 'OPTIONS',
    },
    dnd: true,
  };

  logDragStart(node): void {
    // console.log('Start dragging: ' + node.text);
  }

  logDragFinish(targetNode, distinationNode): void {
    // console.log(`Stop dragging: [TARGET]${targetNode.text}`);
  }
}

function getTreeData() {
  return [
    {
      MY_TEXT: 'DEWS/UI',
      OPTIONS: { expanded: true },
      KIDS: [
        {
          MY_TEXT: '시작하기',
          OPTIONS: { checked: true, draggable: false, expanded: true },
          KIDS: [
            {
              MY_TEXT: '환경설정',
              OPTIONS: { expanded: false },
            },
          ],
        },
      ],
    },
    {
      MY_TEXT: '따라하기',
      KIDS: [
        {
          MY_TEXT: 'Hello World',
          OPTIONS: { checked: true },
          KIDS: [
            {
              MY_TEXT: '기본 CRUD 개발',
              OPTIONS: { checked: true },
              KIDS: [
                {
                  MY_TEXT: 'Structural Design Patterns',
                  OPTIONS: { checked: true },
                  KIDS: [
                    {
                      MY_TEXT: '111 Structural Design Patterns',
                      OPTIONS: { checked: true },
                      KIDS: [
                        {
                          MY_TEXT: '222 Structural  Patterns',
                          OPTIONS: { checked: true },
                          KIDS: [
                            {
                              MY_TEXT: '333 Structural  Patterns',
                              OPTIONS: { checked: true },
                              KIDS: [
                                {
                                  MY_TEXT: '444 Structural  Patterns',
                                  OPTIONS: { checked: true, expanded: true },
                                  KIDS: [
                                    {
                                      MY_TEXT: '555 Design Patterns',
                                    },
                                    { MY_TEXT: '555 Structural  Patterns' },
                                  ],
                                },
                              ],
                            },
                          ],
                        },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
  ];
}
</script>

<style lang="scss"></style>
