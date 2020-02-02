<template>
  <div class="container-panel view-content">
    <div class="view-page-container">
      <div class="view-top">
        <p v-if="$store.state.repository.pageTitle" class="tit-con-text">
          {{ $store.state.repository.pageTitle }}
        </p>
        <div class="pst-button">
          <div class="srch-wrap-motion">
            <input ref="searchWordInput" type="text" />
            <div class="search" @click="onClickSearch"></div>
          </div>
          <ul v-if="isAuthoredStaff" class="view-icon">
            <li class="icon">
              <a class="btn-edit" @click="onClickEditBtn"></a>
              <!--<nuxt-link-->
              <!--v-if="$store.state.repository.refType !== 'branch'"-->
              <!--:to="{-->
              <!--name: 'branchManagement',-->
              <!--params: {-->
              <!--productCode: $route.params.productCode,-->
              <!--},-->
              <!--}"-->
              <!--tag="a"-->
              <!--class="btn-edit"-->
              <!--&gt;</nuxt-link>-->
              <!--<nuxt-link-->
              <!--v-else-if="-->
              <!--$store.state.repository.refType === 'branch' &&-->
              <!--$route.name === 'branchDocView'-->
              <!--"-->
              <!--:to="{-->
              <!--name: 'editDoc',-->
              <!--params: {-->
              <!--productCode: $route.params.productCode,-->
              <!--pageType: $route.params.pageType,-->
              <!--branchName: $route.params.branchName,-->
              <!--pageTitle: $route.params.pageTitle,-->
              <!--pageId: $route.params.pageId,-->
              <!--},-->
              <!--}"-->
              <!--tag="a"-->
              <!--class="btn-edit"-->
              <!--&gt;</nuxt-link>-->
              <!--<nuxt-link-->
              <!--v-else-->
              <!--:to="{-->
              <!--name: 'editDocInit',-->
              <!--params: {-->
              <!--productCode: $route.params.productCode,-->
              <!--pageType: 'Document',-->
              <!--branchName: $route.params.branchName,-->
              <!--},-->
              <!--}"-->
              <!--tag="a"-->
              <!--class="btn-edit"-->
              <!--&gt;</nuxt-link>-->
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
import $ from 'jquery';
import { Vue, Component, namespace } from 'nuxt-property-decorator';
import { IAlert } from '@/store/modules/common';

const Common = namespace('common');

@Component
export default class ProductRepositoryFileViewer extends Vue {
  @Common.Action('alert') alertAction!: (payload: IAlert) => Promise<any>;

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
        if (staff.empId === this.$store.state.user.user.loginId) {
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

  onClickSearch() {
    // 애니메이션 효과 후에 페이지 이동하는 거 수정 필요할 듯
    if (this.$refs.searchWordInput.value !== '') {
      this.$router.push({
        name: 'devDocSearch',
        params: {
          searchWord: this.$refs.searchWordInput.value,
        },
      });
    }
  }

  onClickEditBtn() {
    if (this.$store.state.user.user.gitlabToken === undefined) {
      // this.alertAction({
      //   type: 'warning',
      //   isShow: true,
      //   msg: 'gitlab 토큰을 등록해주세요.',
      // }).then((result) => {
      //   if (result.ok) {
      //     // 마이페이지로 이동
      //   }
      // });
    }
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
          pageType: 'Document',
          branchName: this.$route.params.branchName,
        },
      });
    }
  }

  onViewerLoad() {
    const toastUIViewer = this.$refs.tuiViewer;
    const viewerArea = this.$refs.viewerArea;
    setTimeout(function() {
      const editor = toastUIViewer.editor;
      editor.preview.refresh = function(markdown) {
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
                replaceText = '<section class="tab">';
                let k = 0; // 다중 코드 블럭에서 각 코드 블럭에 순서를 매기기 위한 변수
                for (
                  let codeblockIndex = 0;
                  codeblockIndex < codeblocks.length;
                  codeblockIndex++
                ) {
                  const codeblock = codeblocks[codeblockIndex];
                  const language = codeblock.split('\n')[0];
                  let tabTitle = language.split('```')[1].trim();
                  const onClass = codeblockIndex === 0 ? ' on' : ''; // 첫 번째 탭 타이틀에 on class 추가
                  tabTitle = tabTitle === '' ? 'codeblock' : tabTitle; // ``` 다음에 아무것도 안썼을 경우 탭 타이틀을 codeblock 으로 출력
                  replaceText +=
                    '<input type="button" class="titleBtn' +
                    onClass +
                    '" value="' +
                    tabTitle +
                    '" data-tabnum="tab_' +
                    tabIndex +
                    '" data-value="' +
                    k++ +
                    '" @click="titleButtonClick(this)">';
                }
              }
              markdown = markdown.replace(
                '<!-- tabs:start -->',
                replaceText + '<article class="multiTab">'
              );
              markdown = markdown.replace(
                '<!-- tabs:end -->',
                '</article></section>'
              );
            }
            let html = this.convertor.toHTMLWithCodeHightlight(markdown);
            const tabHTMLReg = /<section class="tab"((.|\n)*?)<\/section>/g;
            const tabHTMLArray = html.match(tabHTMLReg);
            if (tabHTMLArray !== null && tabHTMLArray.length > 0) {
              $.each(tabHTMLArray, function(tabIndex, tabHTML) {
                const nonHidePreTag = tabHTML.replace(
                  '<pre>',
                  '<pre class="tab_' + tabIndex.toString() + '">'
                );
                const hidePreTag = nonHidePreTag
                  .split('<pre>')
                  .join('<pre class="tab_' + tabIndex.toString() + ' hide">');
                html = html.replace(tabHTML, hidePreTag);
              });
            }
            html = html
              .split('</section><br data-tomark-pass="">')
              .join('</section>');
            html = html
              .split('</section>')
              .join('</section><br data-tomark-pass="">');
            this.render(html);
            const langResults = viewerArea.querySelectorAll('.lang-result');
            if (langResults.length > 0) {
              for (let idx = 0; idx < langResults.length; idx++) {
                const preClass = langResults[idx].parentNode.getAttribute(
                  'class'
                );
                const src = langResults[idx].parentNode.textContent;
                const iframeNode =
                  '<div class="' +
                  preClass +
                  '"><iframe width="300" height="300" src="' +
                  src +
                  '"></iframe></div>';
                langResults[idx].parentNode.insertAdjacentHTML(
                  'afterend',
                  iframeNode
                );
                langResults[idx].parentNode.remove();
              }
            }
            // $('.titleBtn')
            //   .off('click')
            //   .on('click', function() {
            //     titleButtonClick(this);
            //   });
            const titleBtns = viewerArea.querySelectorAll('.titleBtn');
            for (
              let titleBtnIdx = 0;
              titleBtnIdx < titleBtns.length;
              titleBtnIdx++
            ) {
              titleBtns[titleBtnIdx].onclick = function() {
                const clickTabNum = this.getAttribute('data-tabnum'); // 에디터 전체에서 몇 번째 다중 코드 블럭인지 판단하는 변수
                const clickValue = this.getAttribute('data-value'); // 몇 번째 탭 타이틀을 선택했는지 판단하는 변수
                let contentArea; // 코드 블럭 영역
                // 위즈윅 모드, 프리뷰 모드에서 각각 구조가 달라서 따로 처리해주어야 함
                if (this.parentNode.querySelector('.multiTab')) {
                  contentArea = this.parentNode
                    .querySelector('.multiTab')
                    .querySelectorAll('.' + clickTabNum);
                } else {
                  contentArea = this.parentNode.parentNode
                    .querySelector('.multiTab')
                    .querySelectorAll('.' + clickTabNum);
                }

                contentArea.forEach((content, index) => {
                  index.toString() === clickValue
                    ? content.setAttribute('class', clickTabNum)
                    : content.setAttribute('class', clickTabNum + ' hide');
                });
                this.parentNode
                  .querySelector('.on')
                  .setAttribute('class', 'titleBtn');
                this.setAttribute('class', 'titleBtn on');
              };
            }
          }
        }
      };
    });
  }

  // popupBranch() {
  //   var self = this
  //   if (self.$store.state.branchName === '') {
  //     this.$modal.show('branch-modal')
  //   } else {
  //     if (this.action === 'delete') {
  //       this.deleteFile()
  //     } else {
  //       // this.$emit('show-editor', self.filePath, true)
  //       this.$router.push({name: 'TUIEditor', params: { filePath: this.filePath }})
  //     }
  //   }
  // }

  // selectBranch() {
  //   console.error('viewer modal return select branch :: ', this.$store.state.branchName)
  //   this.$router.push({name: 'TUIEditor', params: { filePath: this.filePath }})
  // }

  // updateViewer() {
  //   console.error('Viewer clickUpdate!!')
  //   this.action = ''
  //   this.popupBranch()
  // }

  // deleteViewer() {
  //   this.action = 'delete'
  //   this.popupBranch()
  // }

  // deleteFile() {
  //   var self = this
  //
  //   this.$http.get('../gitlab/deleteCommit', { params: { projectId: 5, branchName: self.$store.state.branchName, action: self.action, filePath: self.filePath } }).then(response => {
  //     self.viewerText = ''
  //     alert(self.action + ' 성공!!')
  //     self.$EventBus.$emit('searchTree')
  //   }).catch(err => {
  //     console.error(self.action + ' commit error :: ', err)
  //   })
  // }

  // watch: {
  //   $route(to, from) {
  //     // 경로 변경에 반응하여...
  //     this.filePath = this.$route.params.filePath;
  //     this.getFileData();
  //   },
  // },

  // created() {
  //   const self = this;
  //   if (self.$route.params.filePath) {
  //     self.filePath = self.$route.params.filePath;
  //     self.getFileData();
  //   }
  //   self.$EventBus
  //     .$off('sendViewerFilePath')
  //     .$on('sendViewerFilePath', function(filePath) {
  //       self.filePath = filePath;
  //       self.getFileData();
  //     });
  //
  //   self.$EventBus.$off('readFile').$on('readFile', function(filePath) {
  //     console.log('readFile Event 들어왔어!!!');
  //     self.filePath = filePath;
  //     self.getFileData();
  //   });
  // }
}
</script>

<style scoped></style>
