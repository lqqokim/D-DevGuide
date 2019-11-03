<template>
  <div class="dbs-container txt-left mgt-50">
    <h1 class="tit">제품 정보 등록</h1>
    <form ref="test" action="post" @submit.prevent="onProductRegister">
      <div class="tbl-wrap mgt-10">
        <table class="tbl-write tbl-fixed">
          <colgroup>
            <col style="width: 20%;" />
            <col style="width: auto;" />
          </colgroup>
          <tbody>
            <tr>
              <!-- 수정 필요 -->
              <th scope="row">
                제품군<em class="required"
                  >*<span class="hide">필수입력항목</span></em
                >
              </th>
              <td>
                <div class="ui-select">
                  <select
                    v-model="productType"
                    title="품목형태"
                    class="off"
                    tabindex="-1"
                  >
                    <option value="0" selected="">전체</option>
                    <option value="1">품목1</option>
                    <option value="2">품목2</option>
                  </select>
                  <button
                    type="button"
                    class="ui-select-btn"
                    title="품목형태 선택"
                  >
                    전체
                  </button>
                  <!-- 셀렉트박스  선택시 ui-select-wrap에 on 추가하면 display block 됨 -->
                  <div class="ui-select-wrap">
                    <strong class="ui-select-tit" tabindex="0"
                      >품목 선택</strong
                    >
                    <div class="ui-select-options">
                      <button
                        type="button"
                        class="ui-select-opt selected"
                        value="품목1"
                      >
                        <b class="ui-select-txt">품목1</b>
                      </button>
                      <button type="button" class="ui-select-opt" value="품목2">
                        <b class="ui-select-txt">품목2</b>
                      </button>
                    </div>
                  </div>
                  <div class="dim-select"></div>
                </div>
              </td>
            </tr>
            <tr>
              <th scope="row">
                제품명<em class="required"
                  >*<span class="hide">필수입력항목</span></em
                >
              </th>
              <td>
                <input
                  v-model="productName"
                  type="text"
                  class="inp-base w-100p"
                  placeholder="해당 제품 링크내 삽입될 제품"
                />
              </td>
            </tr>
            <tr>
              <th scope="row">
                제품설명<em class="required"
                  >*<span class="hide">필수입력항목</span></em
                >
              </th>
              <td>
                <input
                  v-model="productDescription"
                  type="text"
                  class="inp-base w-100p"
                  placeholder="링크 버튼내 삽입될 간략한 설명"
                />
              </td>
            </tr>
            <tr>
              <th scope="row">
                프로젝트 ID<em class="required"
                  >*<span class="hide">필수입력항목</span></em
                >
              </th>
              <td>
                <input
                  v-model="projectId"
                  type="text"
                  class="inp-base w-100p"
                  placeholder="등록할 제품의 Git Project ID"
                />
                <p class="caution">
                  등록한 Git 프로젝트소스 내에 개발자 문서가 포함되어 있어야
                  합니다.
                </p>
              </td>
            </tr>
            <tr>
              <th scope="row">
                병합요청 대상 브랜치명<em class="required"
                  >*<span class="hide">필수입력항목</span></em
                >
              </th>
              <td>
                <input
                  v-model="targetBranch"
                  type="text"
                  class="inp-base w-100p"
                  placeholder="ex: dev"
                />
                <p class="caution">
                  병합할 대상브랜치에서 각 편집자가 작업한 내용들이 합쳐집니다.
                </p>
              </td>
            </tr>
            <tr>
              <th scope="row">
                제품 사용법 문서 경로<em class="required"
                  >*<span class="hide">필수입력항목</span></em
                >
              </th>
              <td>
                <input
                  v-model="manualDocPath"
                  type="text"
                  class="inp-base w-100p"
                  placeholder="등록할 프로젝트 Git의 문서폴더 경로(ex: path/to/dec)"
                />
                <p class="caution">
                  등록할 경로 밑에 마크다운 파일로 문서가 존재해야 한다.
                </p>
              </td>
            </tr>
            <tr>
              <th scope="row">제품 API 문서 경로</th>
              <td>
                <input
                  v-model="APIDocPath"
                  type="text"
                  class="inp-base w-100p"
                  placeholder="등록할 프로젝트 Git의 문서폴더 경로(ex: path/to/api)"
                />
                <p class="caution">
                  등록할 경로 밑에 마크다운 파일로 문서가 존재해야 한다. API가
                  필요없는 경우 공란으로 설정한다.
                </p>
              </td>
            </tr>
            <tr>
              <th scope="row">첨부파일 경로</th>
              <td>
                <input
                  v-model="attachmentFilePath"
                  type="text"
                  class="inp-base w-100p"
                  placeholder="등록할 프로젝트 Git의 문서폴더 경로(ex: path/to/doc_file)"
                />
                <p class="caution">
                  등록할 경로 밑에 마크다운 파일로 문서가 존재해야 한다. API가
                  필요없는 경우 공란으로 설정한다.
                </p>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="btn-wrap mgt-30">
        <button class="btn-main">등록</button>
      </div>
    </form>
  </div>
</template>
<script lang="ts">
import { Vue, Component, namespace } from 'nuxt-property-decorator';
import * as projects from '@/store/modules/projects';

const Projects = namespace('projects');

@Component
export default class ProductRegister extends Vue {
  productType: string = '';
  productName: string = '';
  productDescription: string = '';
  projectId: string = ''; // 이건 number 형태가 맞는 듯
  targetBranch: string = '';
  manualDocPath: string = '';
  APIDocPath: string = '';
  attachmentFilePath: string = '';

  @Projects.Action('setProduct') setProductAction;
  @Projects.Action('getProductList') getProductListAction;
  @Projects.Getter('wholeProductList') productList!: projects.Product;

  created() {
    this.getProductListAction({});
  }
  onProductRegister() {
    const self = this;

    // * 표시되어 있는 항목들의 입력 여부 체크
    // if (self.productType === '') {
    //   alert('제품군을 입력해주세요.');
    //   // self.$refs.productType.focus();
    // } else
    if (self.productName === '') {
      alert('제품명을 입력해주세요.');
    } else if (self.productDescription === '') {
      alert('제품설명을 입력해주세요.');
    } else if (self.projectId === '') {
      alert('프로젝트 아이디를 입력해주세요.');
    } else if (self.targetBranch === '') {
      alert('병합요청 대상 브랜치명을 입력해주세요.');
    } else if (self.manualDocPath === '') {
      alert('제품 사용법 문서 경로를 입력해주세요.');
    } else {
      const projectIdArray = [];
      if (self.productList.length > 0) {
        for (let idx = 0; idx < self.productList.length; idx++) {
          projectIdArray.push(self.productList[idx].projectId);
        }
      }
      if (projectIdArray.includes(self.projectId)) {
        alert('이미 등록되어 있는 프로젝트입니다.');
      } else {
        self.setProductAction({
          productType: self.productType,
          productName: self.productName,
          productDescription: self.productDescription,
          projectId: self.projectId,
          targetBranch: self.targetBranch,
          manualDocPath: self.manualDocPath,
          APIDocPath: self.APIDocPath,
          attachmentFilePath: self.attachmentFilePath,
        });
      }
    }
  }
}
</script>

<style scoped></style>
