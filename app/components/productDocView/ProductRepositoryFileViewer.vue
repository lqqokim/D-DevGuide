<template>
  <div class="container-panel view-content">
    <div class="view-page-container">
      <div class="view-top">
        <p v-if="$store.state.repository.pageTitle" class="tit-con-text">
          {{ $store.state.repository.pageTitle }}
        </p>
        <div class="pst-button">
          <div class="srch-wrap-motion">
            <input ref="searchWordInput" type="text" @keydown="onClickSearch" />
            <div class="search" @click="onClickSearch"></div>
          </div>
          <ul v-if="isAuthoredStaff" class="view-icon">
            <li class="icon">
              <a class="btn-edit" @click="onClickEditBtn"></a>
            </li>
            <!-- 공유 버튼 -->
            <!--<li class="icon"><a href="" class="btn-share"></a></li>-->
            <!-- 인쇄 버튼 -->
            <!--<li class="icon"><a href="" class="btn-print"></a></li>-->
          </ul>
        </div>
      </div>
      <div class="view-detail">
        <div ref="viewerArea">
          <TuiEditorViewer
            ref="tuiViewer"
            :value="$store.state.repository.viewerText"
            height="100%"
            @input="$store.state.repository.viewerText"
            @load="onViewerLoad()"
          ></TuiEditorViewer>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import 'tui-editor/dist/tui-editor-contents.css';
import 'highlight.js/styles/github.css';
import { Vue, Component, namespace } from 'nuxt-property-decorator';
import { IAlert } from '@/store/modules/common';
import * as repository from '@/store/modules/repository';

const Common = namespace('common');
const Repository = namespace('repository');

@Component
export default class ProductRepositoryFileViewer extends Vue {
  @Common.Action('alert') alertAction!: (payload: IAlert) => Promise<any>;
  @Repository.Action('convertImagePath') convertImagePathAction;

  isAuthoredStaff: boolean = false;

  $refs!: {
    tuiViewer: any;
    viewerArea: any;
    searchWordInput: any;
  };

  created() {
    if (
      this.$store.state.user.user.authority !== 'M' &&
      this.$store.state.product.product.staffs.length > 0
    ) {
      this.$store.state.product.product.staffs.forEach((staff) => {
        if (
          (this.$route.name === 'detail' || this.$route.name === 'docView') &&
          staff.empId === this.$store.state.user.user.loginId
        ) {
          this.isAuthoredStaff = true;
        } else if (
          (this.$route.name === 'branchDocViewInit' ||
            this.$route.name === 'branchDocView') &&
          staff.empId === this.$store.state.user.user.loginId &&
          staff.writeAuthority
        ) {
          this.isAuthoredStaff = true;
        }
      });
    }
    if (
      this.$store.state.user.user.authority === 'A' ||
      this.$store.state.user.user.authority === 'S'
    )
      this.isAuthoredStaff = true;
  }

  onClickSearch(e) {
    // 애니메이션 효과 후에 페이지 이동하는 거 수정 필요할 듯
    if (
      this.$refs.searchWordInput.value !== '' &&
      ((e.type === 'keydown' && e.keyCode === 13) || e.type === 'click')
    ) {
      this.$router.push({
        name: 'devDocSearch',
        params: {
          searchWord: this.$refs.searchWordInput.value,
        },
      });
    }
  }

  onClickEditBtn() {
    if (this.$store.state.repository.refType !== 'branch') {
      this.$router.push({
        name: 'branchManagement',
        params: {
          productCode: this.$route.params.productCode,
        },
      });
    } else if (
      this.$store.state.repository.refType === 'branch' &&
      this.$route.name === 'branchDocView'
    ) {
      this.$router.push({
        name: 'editDoc',
        params: {
          productCode: this.$route.params.productCode,
          pageType: this.$route.params.pageType,
          branchName: this.$route.params.branchName,
          pageTitle: this.$route.params.pageTitle,
          pageId: this.$route.params.pageId,
        },
      });
    } else {
      this.$router.push({
        name: 'editDocInit',
        params: {
          productCode: this.$route.params.productCode,
          pageType: this.$route.params.pageType,
          branchName: this.$route.params.branchName,
        },
      });
    }
  }

  // replaceImageText(convertImageArr, markdown) {
  //   console.log(str);
  //   for
  //   const splitStr = str.split('](');
  //
  //   const uploadFilePath = splitStr[1].split(')')[0];
  //   const fileType = uploadFilePath.split('.');
  //   console.log(fileType[fileType.length - 1]);
  //   if (
  //           fileType[fileType.length - 1] === 'JPG' ||
  //           fileType[fileType.length - 1] === 'PNG' ||
  //           fileType[fileType.length - 1] === 'png' ||
  //           fileType[fileType.length - 1] === 'jpg'
  //   ) {
  //     console.log('들어와');
  //     const altStr = splitStr[0].split('[')[1];
  //
  //     await convertImagePathAction({
  //       productCode: currentProductCode,
  //       ref: refName,
  //       filePath: uploadFilePath.slice(1),
  //     }).then((res) => {
  //       const replaceText =
  //               '![' +
  //               altStr +
  //               '](data:image/jpeg' +
  //               ';base64,' +
  //               res.content +
  //               ')';
  //       console.log(replaceText);
  //       markdown = markdown.replace(str, replaceText);
  //     });
  //     console.log(markdown);
  //   }
  // }

  onViewerLoad() {
    const toastUIViewer = this.$refs.tuiViewer;
    const viewerArea = this.$refs.viewerArea;
    const viewerText = this.$store.state.repository.viewerText;
    const convertImagePathAction = this.convertImagePathAction;
    const currentProductCode = this.$store.state.product.product.productCode;
    const refName = this.$store.state.repository.currentRef;
    setTimeout(function() {
      const editor = toastUIViewer.editor;
      editor.preview.refresh = async function(markdown) {
        // git 에서 받아온 이미지를 화면에 보여지도록 변환하는 코드
        const gitImageFileReg = /\[((.|\n)*?)\)/g;
        const gitImageArray = markdown.match(gitImageFileReg);
        if (gitImageArray !== null && gitImageArray.length > 0) {
          for (let idx = 0; idx < gitImageArray.length; idx++) {
            if (gitImageArray[idx].includes('](/')) {
              const splitStr = gitImageArray[idx].split('](');

              const uploadFilePath = splitStr[1].split(')')[0];
              const fileType = uploadFilePath.split('.');
              if (
                fileType[fileType.length - 1].toLowerCase() === 'png' ||
                fileType[fileType.length - 1].toLowerCase() === 'jpg'
              ) {
                const altStr = splitStr[0].split('[')[1];
                const fileFormat =
                  fileType[fileType.length - 1].toLowerCase() === 'jpg'
                    ? 'jpeg'
                    : 'png';

                await convertImagePathAction({
                  productCode: currentProductCode,
                  ref: refName,
                  filePath: uploadFilePath.slice(1),
                }).then((res) => {
                  const replaceText =
                    '![GitImage__' +
                    altStr +
                    '](data:image/' +
                    fileFormat +
                    ';base64,' +
                    res.content +
                    ')';
                  markdown = markdown.replace(gitImageArray[idx], replaceText);
                });
              }
            }
          }
        }
        if (!markdown.includes('<!-- tabs:start -->')) {
          this.render(this.convertor.toHTMLWithCodeHightlight(markdown));
        } else {
          // 다중 코드 블럭 탭이 있을 경우 viewer 에 다중 코드 블럭 탭을 화면에 보여주기 위한 코드
          const tabReg = /<!-- tabs:start -->((.|\n)*?)<!-- tabs:end -->/g; // tabs:start, tabs:end 사이에 있는 모든 코드를 가져오기 위한 정규식
          const cbReg = /```((.|\n)*?)```/g; // 코드 블럭 내부의 내용을 가져오기 위한 정규식
          const tabs = markdown.match(tabReg);
          let replaceText = '';
          if (tabs !== null && tabs.length > 0) {
            for (let tabIndex = 0; tabIndex < tabs.length; tabIndex++) {
              const tab = tabs[tabIndex];
              const codeblocks = tab.match(cbReg);
              if (codeblocks !== null && codeblocks.length > 0) {
                replaceText =
                  '<section class="ui-tab small" data-tabnum="tab_' +
                  tabIndex +
                  '">';
                // replaceText = '';
                let k = 0; // 다중 코드 블럭에서 각 코드 블럭에 순서를 매기기 위한 변수
                for (
                  let codeblockIndex = 0;
                  codeblockIndex < codeblocks.length;
                  codeblockIndex++
                ) {
                  const codeblock = codeblocks[codeblockIndex];
                  const language = codeblock.split('\n')[0];
                  let tabTitle = language.split('```')[1].trim();
                  const activeClass = codeblockIndex === 0 ? ' active' : ''; // 첫 번째 탭 타이틀에 on class 추가
                  tabTitle = tabTitle === '' ? 'codeblock' : tabTitle; // ``` 다음에 아무것도 안썼을 경우 탭 타이틀을 codeblock 으로 출력
                  replaceText +=
                    '<input class="ui-tab-btn' +
                    activeClass +
                    '" value="' +
                    tabTitle +
                    '" data-tabnum="tab_' +
                    tabIndex +
                    '" data-value="' +
                    k++ +
                    '" @click="titleButtonClick(this)">';
                }
                replaceText += '</section>';
              }
              markdown = markdown.replace('<!-- tabs:start -->', replaceText);
              markdown = markdown.replace(
                '<!-- tabs:end -->',
                '<section style="display: none;"><article></article></section>'
              );
            }
            let html = this.convertor.toHTMLWithCodeHightlight(markdown);
            const tabHTMLReg = /<section class="ui-tab small"((.|\n)*?)<\/article><\/section>/g;
            const tabHTMLArray = html.match(tabHTMLReg);
            if (tabHTMLArray !== null && tabHTMLArray.length > 0) {
              tabHTMLArray.forEach((tabHTML, tabIndex) => {
                const nonHidePreTag = tabHTML.replace(
                  '<pre>',
                  '<pre data-multiTab class="tab_' +
                    tabIndex.toString() +
                    ' ui-tab-pnl active">'
                );
                const hidePreTag = nonHidePreTag
                  .split('<pre>')
                  .join(
                    '<pre data-multiTab class="tab_' +
                      tabIndex.toString() +
                      ' ui-tab-pnl">'
                  );
                html = html.replace(tabHTML, hidePreTag);
              });
              // $.each(tabHTMLArray, function(tabIndex, tabHTML) {
              //   const nonHidePreTag = tabHTML.replace(
              //     '<pre>',
              //     '<pre data-multiTab class="tab_' +
              //       tabIndex.toString() +
              //       ' ui-tab-pnl active">'
              //   );
              //   const hidePreTag = nonHidePreTag
              //     .split('<pre>')
              //     .join(
              //       '<pre data-multiTab class="tab_' +
              //         tabIndex.toString() +
              //         ' ui-tab-pnl">'
              //     );
              //   html = html.replace(tabHTML, hidePreTag);
              // });
            }
            this.render(html);
            // const langResults = viewerArea.querySelectorAll('.lang-result');
            // if (langResults.length > 0) {
            //   for (let idx = 0; idx < langResults.length; idx++) {
            //     const preClass = langResults[idx].parentNode.getAttribute(
            //       'class'
            //     );
            //     const src = langResults[idx].parentNode.textContent;
            //     const iframeNode =
            //       '<div class="' +
            //       preClass +
            //       '"><iframe width="300" height="300" src="' +
            //       src +
            //       '"></iframe></div>';
            //     langResults[idx].parentNode.insertAdjacentHTML(
            //       'afterend',
            //       iframeNode
            //     );
            //     langResults[idx].parentNode.remove();
            //   }
            // }

            const titleBtns = toastUIViewer.$el.querySelectorAll('.ui-tab-btn');
            for (
              let titleBtnIdx = 0;
              titleBtnIdx < titleBtns.length;
              titleBtnIdx++
            ) {
              titleBtns[titleBtnIdx].onclick = function() {
                const clickTabNum = this.getAttribute('data-tabnum'); // 에디터 전체에서 몇 번째 다중 코드 블럭인지 판단하는 변수
                const clickValue = this.getAttribute('data-value'); // 몇 번째 탭 타이틀을 선택했는지 판단하는 변수

                const tabPnls = toastUIViewer.$el.querySelectorAll(
                  '.' + clickTabNum
                );
                for (let idx = 0; idx < tabPnls.length; idx++) {
                  tabPnls[idx].classList.remove('active');
                  if (idx === Number(clickValue)) {
                    tabPnls[idx].classList.add('active');
                  }
                }

                this.parentNode
                  .querySelector('.active')
                  .setAttribute('class', 'ui-tab-btn');
                this.setAttribute('class', 'ui-tab-btn active');
              };
            }
          }
        }
      };
      editor.setMarkdown(viewerText);
    });
  }
}
</script>

<style scoped></style>
