<template>
  <div class="container-panel">
    <div class="view-top mgb-20">
      <p class="tit-con-text">문서 수정</p>
    </div>
    <div class="gray-info-box document mgb-20">
      <ul class="bul-round-box">
        <li>
          <span>문서명</span>{{ $store.state.repository.editingPageTitle }}
        </li>
        <li>
          <span>git 마크다운 경로</span
          >{{ $store.state.repository.editingFilePath }}
        </li>
      </ul>
      <button
        type="button"
        class="dbs-icon-button ico-left small modify"
        @click="openGitPageSearchModal"
      >
        수정
      </button>
    </div>
    <div class="movie-register-toastui mgb-20">
      <TuiEditor
        ref="editorArea"
        :option="editorOptions"
        :value="this.$store.state.repository.editingViewerText"
        height="500px"
        mode="wysiwyg"
        @load="onEditorLoad"
        @focus="onEditorFocus"
        @change="onEditorChange"
      ></TuiEditor>
    </div>
    <div class="btn-wrap mgb-80">
      <button
        type="button"
        class="dbs-icon-button ico-left small confirm"
        @click="createCommit"
      >
        확인
      </button>
      <button
        type="button"
        class="dbs-icon-button ico-left small cancel"
        @click="onClickEditCancel"
      >
        취소
      </button>
    </div>
    <!--<div class="ui-tab small mgb-60">-->
    <!--<div class="ui-tab-btns" role="tablist">-->
    <!--<a href="#tab1" class="ui-tab-btn active"><i>HTML</i></a>-->
    <!--<a href="#tab2" class="ui-tab-btn"><i>Javascript</i></a>-->
    <!--<a href="#tab3" class="ui-tab-btn"><i>Result</i></a>-->
    <!--<div class="pst-rbtn">-->
    <!--<button type="button" class="dbs-icon-button ico-left small copy">-->
    <!--복사-->
    <!--</button>-->
    <!--</div>-->
    <!--</div>-->
    <!--<div class="ui-tab-pnls">-->
    <!--<section id="tab1" class="ui-tab-pnl active" role="tabpanel">-->
    <!--<pre><code>HTML 코드 들어갑니다</code></pre>-->
    <!--</section>-->
    <!--<section id="tab2" class="ui-tab-pnl" role="tabpanel">-->
    <!--<pre><code>Javascript 코드 들어갑니다.</code></pre>-->
    <!--</section>-->
    <!--<section id="tab3" class="ui-tab-pnl" role="tabpanel">-->
    <!--<pre><code>결과 내용 들어갑니다.</code></pre>-->
    <!--</section>-->
    <!--</div>-->
    <!--</div>-->
    <!-- 파일 업로드 버튼 클릭 시 파일 선택 다이얼로그 -->
    <modal-component
      :modal-title="fileUploadModalTitle"
      :modal-name="fileUploadModalName"
      :modal-height="fileUploadModalHeight"
      :modal-width="fileUploadModalWidth"
      @emit-confirm="fileUploadModalConfirm"
    >
      <file-upload-modal
        slot="modalContent"
        ref="fileUploadModal"
      ></file-upload-modal>
    </modal-component>
  </div>
</template>
<script lang="ts">
import { Vue, Component, namespace, Watch } from 'nuxt-property-decorator';
import util from 'tui-code-snippet';
import toMark from 'to-mark';
import { expandAll } from '~/utils/commonFuncs';
import ModalComponent from '@/components/common/modal/modalComponent.vue';
import CreatePageModal from '@/components/productEdit/CreatePageModal.vue';
import FileUploadModal from '@/components/productEdit/FileUploadModal.vue';
import * as repository from '@/store/modules/repository';
import * as commit from '@/store/modules/commit';
import { IAlert } from '@/store/modules/common';
import EventBus from '@/store/modules/repository.ts';

const Repository = namespace('repository');
const Commit = namespace('commit');
const Common = namespace('common');

@Component({
  components: {
    ModalComponent,
    CreatePageModal,
    FileUploadModal,
  },
})
export default class ProductEdit extends Vue {
  // editingViewerText!: string;
  viewerText!: string;
  mdData: string = ''; // 파일 트리 수정 내용 담는 변수

  $modal!: any;
  pnlsData: Array<any> = [];
  btnsData: Array<any> = [];

  editorOptions: object = {
    exts: ['colorSyntax'],
    toolbarItems: [
      'heading',
      'bold',
      'italic',
      'strike',
      'divider',
      'hr',
      'quote',
      'divider',
      'ul',
      'ol',
      'task',
      'indent',
      'outdent',
      'divider',
      'table',
      'image',
      'link',
      'divider',
      'code',
      'codeblock',
      'divider',
    ],
  };

  @Repository.Action('getIndexMdFile') getIndexMdFileAction;
  @Repository.Action('getRepositoryFile') getRepositoryFileAction;
  @Repository.Action('getProjectInfo') getProjectInfoAction;
  @Repository.Mutation('setEditingPageTitle') setEditingPageTitle;
  @Repository.Mutation('setEditingFilePath') setEditingFilePath;
  @Repository.Mutation('setEditingViewerText') setEditingViewerText;
  @Repository.Mutation('setPageTitle') setPageTitle;
  @Repository.Mutation('setFilePath') setFilePath;
  @Repository.Mutation('setViewerText') setViewerText;
  @Repository.Mutation('setEditStatus') setEditStatus;
  @Repository.Mutation('setEditingMenuTreeToJson') setEditingMenuTreeToJson;
  @Repository.Mutation('setEditingMenuTree') setEditingMenuTree;
  @Commit.Action('createCommit') createCommitAction;
  @Common.Action('alert') alertAction!: (payload: IAlert) => Promise<any>;

  $refs!: {
    editorArea: any;
    fileUploadModal: any;
  };

  editInfoModalName: string = 'editInfoModal';

  fileUploadModalTitle: string = '파일 첨부';
  fileUploadModalName: string = 'fileUploadModal';
  fileUploadModalHeight: string = '673px';
  fileUploadModalWidth: string = '700px';

  fileUploadModalConfirm(clickConfirmBtn) {
    const fileUploadModalData = this.$refs.fileUploadModal.getData();

    if (clickConfirmBtn) {
      this.getProjectInfoAction({
        projectId: this.$store.state.product.product.projectId,
        gitlabToken: this.$store.state.user.user.gitlabToken,
      }).then((res) => {
        this.insertDownloadLink(res.data.name, fileUploadModalData);
        this.$modal.hide(this.fileUploadModalName);
      });
    } else {
      this.$modal.hide(this.fileUploadModalName);
    }
  }

  insertDownloadLink(projectName, filePath) {
    const content = this.$refs.editorArea.invoke('getMarkdown');
    const splitFilePath: Array<string> = filePath.split('/');
    const fileName = splitFilePath[splitFilePath.length - 1];
    if (filePath !== '') {
      this.$refs.editorArea.invoke(
        'setMarkdown',
        content +
          '\n[' +
          fileName +
          '](' +
          'http://10.110.15.133/prototypes/' +
          projectName +
          '/raw/' +
          this.$store.state.repository.currentRef +
          '/' +
          filePath +
          '?inline=false)'
      );
      // } else {
      //   fileName = responseData.file_path.split('/')[1];
      //   this.$refs.editorArea.invoke(
      //     'setMarkdown',
      //     content +
      //       '\n[' +
      //       fileName +
      //       '](' +
      //       'http://10.36.13.89/prototypes/gitlab-test/raw/' +
      //       responseData.branch +
      //       '/' +
      //       responseData.file_path +
      //       '?inline=false)'
      //   );
    }
  }

  mounted() {
    // commit file 을 한 곳에서 처리하기 위한 이벤트
    EventBus.$on('commitFiles', (pageTitleParam, filePathParam) => {
      this.alertAction({
        type: 'question',
        isShow: true,
        msg: '수정중이던 내용을 commit 하시겠습니까?',
      }).then(async (result) => {
        if (result.ok) {
          const actionArr: Array<any> = [
            {
              action: this.$store.state.repository.editStatus,
              file_path: this.$store.state.repository.editingFilePath,
              content: this.$store.state.repository.editingViewerText,
            },
          ];
          // 문서명 또는 마크다운 경로를 수정한 경우 (index.md 파일도 함께 commit 되어야함)
          if (
            this.$store.state.repository.editingMenuTreeToJson !== undefined &&
            this.$store.state.repository.editingMenuTreeToJson.length === 1
          ) {
            const indexPath: string =
              this.$route.params.pageType === 'Document'
                ? this.$store.state.product.product.manualDocPath
                : this.$store.state.product.product.APIDocPath;

            const editedMenuTree = this.$store.state.repository
              .editingMenuTreeToJson[0].children;

            editedMenuTree.forEach((editedData) => {
              this.jsonToMd(editedData, 1);
            });
            actionArr.push({
              action: 'update',
              file_path: indexPath + '/index.md',
              content: this.mdData,
            });
          }

          await this.createCommitAction({
            productCode: this.$route.params.productCode,
            branchName: this.$route.params.branchName,
            commitMessage: 'commit',
            gitlabToken: this.$store.state.user.user.gitlabToken,
            actions: actionArr,
          });

          await this.getIndexMdFileAction({
            productCode: this.$route.params.productCode,
            pageType: this.$route.params.pageType,
            ref: this.$route.params.branchName,
            refType: 'branch',
            filePath: pageTitleParam,
            pageTitle: filePathParam,
          });

          const editingMenuTree = [
            {
              title: this.$store.state.product.product.productName,
              option: {
                expanded: true,
                selected: false,
                path: undefined,
              },
              type: 'folder',
              children: this.$store.state.repository.treeData.slice(),
            },
          ];

          if (editingMenuTree.length > 0) {
            editingMenuTree.forEach((data) => {
              expandAll(data);
            });
          }
          this.setEditingMenuTree(editingMenuTree);

          this.setFilePath(this.$store.state.repository.editingFilePath);
          this.setPageTitle(this.$store.state.repository.editingPageTitle);
          this.setViewerText(this.$store.state.repository.editingViewerText);
          this.setEditStatus('init');
          // this.$router.go(0); // 새로고침
        } else {
          this.setEditStatus('cancel');
        }
        this.$router.push({
          name: 'editDoc',
          params: {
            productCode: this.$route.params.productCode,
            pageType: this.$route.params.pageType,
            branchName: this.$route.params.branchName,
            pageTitle: pageTitleParam,
            pageId: filePathParam,
          },
        });
        this.setEditingMenuTreeToJson([]);
        this.mdData = '';
      });
    });

    const tuiEditor = this.$refs.editorArea.editor.getUI().getToolbar();
    const multiCodeBlockButton = document.createElement('button');
    const fileUploadButton = document.createElement('button');
    multiCodeBlockButton.setAttribute(
      'class',
      'tui-italic tui-toolbar-icons test'
    );
    fileUploadButton.setAttribute('class', 'tui-fileUpload tui-toolbar-icons');
    tuiEditor.addButton({
      name: 'multiCodeBlock',
      command: 'multiCodeBlock',
      tooltip: 'Insert Multi codeBlock',
      className: 'tui-italic tui-toolbar-icons test',
      $el: document.getElementsByClassName(
        'tui-italic tui-toolbar-icons test'
      )[0],
    });
    tuiEditor.addButton({
      name: 'fileUpload',
      command: 'fileUpload',
      tooltip: 'file upload',
      className: 'tui-fileUpload tui-toolbar-icons',
      $el: document.getElementsByClassName(
        'tui-fileUpload tui-toolbar-icons'
      )[0],
    });
  }

  created() {
    this.viewerText = this.$store.state.repository.viewerText;
    this.setEditingViewerText(this.$store.state.repository.viewerText);
    this.setEditingPageTitle(this.$store.state.repository.pageTitle);
    this.setEditingFilePath(this.$store.state.repository.filePath);
    if (this.$store.state.repository.editStatus !== 'cancel') {
      this.setEditStatus('init');
    }
  }

  jsonToMd(jsonData, depth) {
    let data: string = '';
    for (let space = 1; space < depth; space++) {
      data += '  ';
    }
    data += '- ';
    if (jsonData.state.path === undefined) {
      data += jsonData.text + '\n';
    } else {
      data += '[' + jsonData.text + '](' + jsonData.state.path + ')' + '\n';
    }
    this.mdData += data;
    if (jsonData.children) {
      depth++;
      jsonData.children.forEach((child) => {
        return this.jsonToMd(child, depth);
      });
    }
  }

  // TODO 버그찾아보기
  // 확인 버튼 클릭 시
  createCommit() {
    // this.$emit('commit');
    if (
      this.$store.state.repository.viewerText ===
        this.$refs.editorArea.invoke('getMarkdown') &&
      this.$store.state.repository.pageTitle ===
        this.$store.state.repository.editingPageTitle &&
      this.$store.state.repository.filePath ===
        this.$store.state.repository.editingFilePath
    ) {
      this.alertAction({
        type: 'warning',
        isShow: true,
        msg: '수정중인 내용이 없습니다.',
      }).then((result) => {
        if (result.ok) {
          console.log('confirm');
        }
      });
    } else {
      // console.log('emit 들어오는 곳');
      EventBus.$emit(
        'commitFiles',
        this.$store.state.repository.editingPageTitle,
        this.$store.state.repository.editingFilePath
      );

      // console.log('왜여기로들어옴?');
      // return 'update';
      // this.alertAction({
      //   type: 'question',
      //   isShow: true,
      //   msg: '수정중이던 내용을 commit 하시겠습니까?',
      // }).then(async (result) => {
      //   if (result.ok) {
      //     const actionArr: Array<any> = [
      //       {
      //         action: this.$store.state.repository.editStatus,
      //         file_path: this.$store.state.repository.editingFilePath,
      //         content: this.$refs.editorArea.invoke('getMarkdown'),
      //       },
      //     ];
      //     // 문서명 또는 마크다운 경로를 수정한 경우 (index.md 파일도 함께 commit 되어야함)
      //     if (this.$store.state.repository.editingMenuTreeToJson.length === 1) {
      //       const indexPath: string =
      //         this.$route.params.pageType === 'Document'
      //           ? this.$store.state.product.product.manualDocPath
      //           : this.$store.state.product.product.APIDocPath;
      //
      //       const editedMenuTree = this.$store.state.repository
      //         .editingMenuTreeToJson[0].children;
      //       editedMenuTree.forEach((editedData) => {
      //         this.jsonToMd(editedData, 1);
      //       });
      //       actionArr.push({
      //         action: 'update',
      //         file_path: indexPath + '/index.md',
      //         content: this.mdData,
      //       });
      //     }
      //
      //     await this.createCommitAction({
      //       productCode: this.$route.params.productCode,
      //       branchName: this.$route.params.branchName,
      //       commitMessage: 'commit',
      //       gitlabToken: this.$store.state.user.user.gitlabToken,
      //       actions: actionArr,
      //     });
      //
      //     this.$router.push({
      //       name: 'editDoc',
      //       params: {
      //         productCode: this.$route.params.productCode,
      //         pageType: this.$route.params.pageType,
      //         branchName: this.$route.params.branchName,
      //         pageTitle: this.$store.state.repository.editingPageTitle,
      //         pageId: this.$store.state.repository.editingFilePath,
      //       },
      //     });
      //     this.$refs.editorArea.editor.moveCursorToStart();
      //     this.setEditingMenuTreeToJson([]);
      //     this.mdData = '';
      //     this.setEditStatus('none');
      //   }
      // });
      this.$refs.editorArea.editor.moveCursorToStart();
    }
  }

  // @Watch('$store.state.repository.editStatus')
  // changeStatus(val) {
  //   console.log('-----');
  //   console.log(val);
  // }

  // 취소 버튼 클릭 시
  onClickEditCancel() {
    this.alertAction({
      type: 'question',
      isShow: true,
      msg: '수정중이던 내용을 취소하시겠습니까?',
    }).then((result) => {
      if (result.ok) {
        this.setEditStatus('cancel');
        this.$refs.editorArea.invoke(
          'setMarkdown',
          this.$store.state.repository.viewerText
        );
        this.$refs.editorArea.editor.moveCursorToStart();
        this.setEditingViewerText(this.$store.state.repository.viewerText);
        this.setEditingPageTitle(this.$store.state.repository.pageTitle);
        this.setEditingFilePath(this.$store.state.repository.filePath);
        this.setEditingMenuTreeToJson([]);
      }
    });
  }

  openGitPageSearchModal() {
    this.$modal.show(this.editInfoModalName);
  }

  onEditorFocus() {
    if (this.$store.state.repository.editStatus === 'init') {
      this.setEditStatus('none');
    }
    // console.log('on editor focus', this.$store.state.repository.editStatus);
    this.$refs.editorArea.$el
      .querySelectorAll('.ui-tab-btn')
      .forEach((titleBtn) => {
        titleBtn.addEventListener('click', (e) => {
          titleButtonClick(e.target);
        });
      });
  }

  onEditorChange() {
    // console.log('on editor change', this.$store.state.repository.editStatus);
    // this.setEditStatus('update');
    if (this.$store.state.repository.editStatus !== 'init') {
      this.setEditStatus('update');
    }
    this.setEditingViewerText(this.$refs.editorArea.invoke('getMarkdown'));
    // TODO null일 때 다시 원래 데이터를 넣어주어야 함
    // null 일 떄에는 엔터쳐서 사라지는 경우임!!!
    const pnls = this.$refs.editorArea.$el.querySelectorAll('.ui-tab-pnls');
    if (pnls !== null && pnls.length > 0) {
      pnls.forEach((pnl) => {
        if (pnl.previousElementSibling === null) {
          pnl.remove();
        }
      });
    }
    const btns = this.$refs.editorArea.$el.querySelectorAll('.ui-tab-btns');
    if (btns !== null && btns.length > 0) {
      btns.forEach((btn) => {
        if (btn.nextElementSibling === null) {
          btn.remove();
        }
      });
    }
    this.pnlsData = Array.prototype.slice.call(pnls);
    this.btnsData = Array.prototype.slice.call(btns);
  }

  onEditorLoad() {
    // Editor 가 완전히 load 되고 나서 실행되는 함수
    const tuiEditor = this.$refs.editorArea;
    const modal = this.$modal;
    const fileUploadModalName = this.fileUploadModalName;
    const md = require('markdown-it')({
      html: true,
      linkify: true,
      typographer: true,
    });
    setTimeout(function() {
      // setTimeout 이 없으면 editor 가 찾아지지 않음
      // 마크다운에서 다중 코드 블럭 탭 버튼 클릭 시 발생하는 command 정의
      const mdMultiCodeBlockCommand = tuiEditor.editor.commandManager.constructor.command(
        '',
        {
          name: 'multiCodeBlock',
          type: 0,
          exec: () => {
            tuiEditor.invoke(
              'insertText',
              '<!-- tabs:start -->\n\n' +
                '``` javascript\n\n' +
                '```\n' +
                '``` html\n\n' +
                '```\n' +
                '``` result\n' +
                'https://www.youtube.com/embed/XGSy3_Czz8k\n' +
                '```\n\n' +
                '<!-- tabs:end -->\n\n'
            );
          },
        }
      );

      // 위즈윅에서 다중 코드 블럭 탭 버튼 클릭 시 발생하는 command 정의
      const wwMultiCodeBlockCommand = tuiEditor.editor.commandManager.constructor.command(
        '',
        {
          name: 'multiCodeBlock',
          type: 1,
          exec: () => {
            const tabNum = tuiEditor.$el.querySelectorAll('.ui-tab.small')
              .length;
            const html =
              '<p></p>' +
              '<div class="ui-tab small"><div class="ui-tab-btns" data-tabnum="tab_' +
              tabNum +
              '" role="tablist">' +
              '<a class="ui-tab-btn active" data-tabnum="tab_' +
              tabNum +
              '" data-value="0" data-tomark-pass=""><i>JavaScript</i></a>' +
              '<a class="ui-tab-btn" data-tabnum="tab_' +
              tabNum +
              '" data-value="1" data-tomark-pass=""><i>HTML</i></a>' +
              '<a class="ui-tab-btn" data-tabnum="tab_' +
              tabNum +
              '" data-value="2" data-tomark-pass=""><i>Result</i></a></div>' +
              '<div class="ui-tab-pnls" data-tabnum="tab_' +
              tabNum +
              '">' +
              '<section class="ui-tab-pnl active" data-tomark-pass="" role="tabpanel">' +
              '<pre data-te-codeblock class="tab_' +
              tabNum +
              ' lang-javascript" data-language="javascript"></pre></section>' +
              '<section class="ui-tab-pnl" data-tomark-pass="" role="tabpanel">' +
              '<pre data-te-codeblock class="tab_' +
              tabNum +
              ' lang-html" data-language="html"></pre></section>' +
              '<section class="ui-tab-pnl" data-tomark-pass="" role="tabpanel">' +
              '<pre data-te-codeblock class="tab_' +
              tabNum +
              ' lang-result" data-language="result"></pre></section>' +
              '</div></div>' +
              '';
            const result = md.render(html);
            tuiEditor.editor.wwEditor.getEditor().insertHTML(result);
            // 첫 번째로 만드는 다중 코드 블럭 탭일 경우 개행을 없애줘야 함
            // if (tabNum === 0) {
            //   tuiEditor.$el
            //     .querySelector('div.ui-tab.small.mgb-60')
            //     .previousElementSibling.remove();
            // }
            tuiEditor.$el
              .querySelectorAll('.ui-tab-btn')
              .forEach((titleBtn) => {
                titleBtn.addEventListener('click', (e) => {
                  titleButtonClick(e.target);
                });
              });
            // // html 변수 안에 url을 넣으면 a 태그가 생겨서 text 값으로 삽입
            // $('pre.tab_' + tabNum + '.lang-result').text(
            //   'https://www.youtube.com/embed/XGSy3_Czz8k'
            // );
          },
        }
      );
      //   // commandManager 를 이용하여 정의해놓은 command 추가
      tuiEditor.editor.commandManager.addCommand(mdMultiCodeBlockCommand);
      tuiEditor.editor.commandManager.addCommand(wwMultiCodeBlockCommand);
      //
      // 파일 업로드 버튼 클릭 시
      const mdFileUploadCommand = tuiEditor.editor.commandManager.constructor.command(
        '',
        {
          name: 'fileUpload',
          type: 2, // markdown 과 wysiwyg 모드의 동작이 같으므로 type 을 2로 지정
          exec: () => {
            modal.show(fileUploadModalName);
          },
        }
      );

      tuiEditor.editor.commandManager.addCommand(mdFileUploadCommand);
      //
      // previewStyle 이 vertical 일 때 preview 에 다중 코드 블럭 탭 UI 를 출력시키기 위해 이벤트 확장
      const eventManager = tuiEditor.editor.eventManager;
      eventManager.listen('contentChangedFromMarkdown', function() {
        const lastestMarkdownValue = tuiEditor.invoke('getHtml');
        if (tuiEditor.editor.preview.isVisible()) {
          tuiEditor.editor.preview.lazyRunner.run(
            'refresh',
            lastestMarkdownValue
          );
          if (
            lastestMarkdownValue.includes(
              '<div class="ui-tab small" data-tomark-pass="">'
            )
          ) {
            setTimeout(function() {
              // if ($('.lang-result').length > 0) {
              //   $.each($('.lang-result'), function(idx, value) {
              //     var preClass = $(value)
              //       .parent('pre')
              //       .attr('class');
              //     var src = $(value).text();
              //     $(value)
              //       .parent('pre')
              //       .before(
              //         '<div class="' +
              //           preClass +
              //           '"><iframe width="300" height="300" src="' +
              //           src +
              //           '"></iframe></div>'
              //       );
              //     $(value)
              //       .parent('pre')
              //       .remove();
              //   });
              // }
              tuiEditor.$el
                .querySelectorAll('.ui-tab-btn')
                .forEach((titleBtn) => {
                  titleBtn.addEventListener('click', (e) => {
                    titleButtonClick(e.target);
                  });
                });
            }, 900);
          }
        }
      });
      // previewStyle 이 tab 일 때 preview 에 다중 코드 블럭 탭 UI 를 출력시키기 위해 refresh 함수 확장
      tuiEditor.editor.preview.refresh = function(markdown) {
        if (!markdown.includes('<!-- tabs:start -->')) {
          this.render(this.convertor.toHTMLWithCodeHightlight(markdown));
        } else {
          tuiEditor.editor.preview.setHTML(tuiEditor.invoke('getHtml'));
          // 프리뷰에서 result 영역이 url 이 아닌 iframe 이 출력되도록 바꿔주는 코드
          // if ($('.lang-result').length > 0) {
          // $.each($('.lang-result'), function(idx, value) {
          //   var preClass = $(value)
          //     .parent('pre')
          //     .attr('class');
          //   var src = $(value).text();
          //   $(value)
          //     .parent('pre')
          //     .before(
          //       '<div class="' +
          //         preClass +
          //         '"><iframe width="300" height="300" src="' +
          //         src +
          //         '"></iframe></div>'
          //     );
          //   $(value)
          //     .parent('pre')
          //     .remove();
          // });
          // }

          tuiEditor.$el.querySelectorAll('.ui-tab-btn').forEach((titleBtn) => {
            titleBtn.addEventListener('click', (e) => {
              titleButtonClick(e.target);
            });
          });
        }
      };

      // convertor 의 toHTML, toMarkdown 을 확장하기 위하여 convertor 생성
      const convertor = tuiEditor.editor.convertor;

      // markdown 을 wysiwyg 으로 변환할 때
      convertor.toHTML = function(string) {
        const tabReg = /<!-- tabs:start -->((.|\n)*?)<!-- tabs:end -->/g; // tabs:start, tabs:end 사이에 있는 모든 코드를 가져오기 위한 정규식
        const cbReg = /```((.|\n)*?)```/g; // 코드 블럭 내부의 내용을 가져오기 위한 정규식
        const tabs = string.match(tabReg);
        let replaceText: string = '';
        if (tabs !== null && tabs.length > 0) {
          tabs.forEach((tab, tabIndex) => {
            const codeBlocks = tab.match(cbReg);
            if (codeBlocks !== null && codeBlocks.length > 0) {
              replaceText =
                '<div class="ui-tab small"><div class="ui-tab-btns" data-tabnum="tab_' +
                tabIndex +
                '" role="tablist">';
              let k: number = 0; // 다중 코드 블럭에서 각 코드 블럭에 순서를 매기기 위한 변수
              codeBlocks.forEach((codeBlock, codeBlockIndex) => {
                const language = codeBlock.split('\n')[0];
                let tabTitle = language.split('```')[1].trim();
                const activeClass = codeBlockIndex === 0 ? ' active' : ''; // 첫 번째 탭 타이틀에 active class 추가
                tabTitle = tabTitle === '' ? 'codeblock' : tabTitle; // ``` 다음에 아무것도 안썼을 경우 탭 타이틀을 codeblock 으로 출력
                replaceText +=
                  '<a class="ui-tab-btn' +
                  activeClass +
                  '" data-tabnum="tab_' +
                  tabIndex +
                  '" data-value="' +
                  k++ +
                  '"><i>' +
                  tabTitle +
                  '</i></a>';
              });
            }
            string = string.replace(
              '<!-- tabs:start -->',
              replaceText +
                '</div><div class="ui-tab-pnls" data-tabnum="tab_' +
                tabIndex +
                '">'
            );
            string = string.replace('<!-- tabs:end -->', '</div></div><br>');
          });
        }
        let html = this._markdownToHtml(string);
        html = this.eventManager.emitReduce(
          'convertorAfterMarkdownToHtmlConverted',
          html
        );
        // TODO 만약에 markdown to wysywyg 시 개행 문제가 있으면 여기서 br 을 다 없애버려서 나는 거니까 여기서 처리해야함
        html = this._removeBrToMarkPassAttributeInCode(html);
        const tabHTMLReg = /<div class="ui-tab small"((.|\n)*?)<\/div><\/div>/g;
        const tabHTMLArray = html.match(tabHTMLReg);
        if (tabHTMLArray !== null && tabHTMLArray.length > 0) {
          tabHTMLArray.forEach((tabHTML, tabIndex) => {
            let insertSectionTag = tabHTML.replace(
              '<pre>',
              '<section class="ui-tab-pnl active" role="tabpanel"><pre class="tab_' +
                tabIndex +
                '">'
            );
            insertSectionTag = insertSectionTag
              .split('<pre>')
              .join(
                '<section class="ui-tab-pnl" role="tabpanel"><pre class="tab_' +
                  tabIndex +
                  '">'
              );
            insertSectionTag = insertSectionTag
              .split('</pre>')
              .join('</pre></section>');
            html = html.replace(tabHTML, insertSectionTag);
          });
        }
        tuiEditor.$el.querySelectorAll('.ui-tab-btn').forEach((titleBtn) => {
          titleBtn.addEventListener('click', (e) => {
            titleButtonClick(e.target);
          });
        });
        return html;
      };

      // wysiwyg 을 markdown 으로 변환할 때
      convertor.toMarkdown = function(html, toMarkOptions) {
        const removeATagReg = /<a class="ui-tab-btn((.|\n)*?)\/a>/g;
        const tabTitleBtns = html.match(removeATagReg);
        if (tabTitleBtns !== null && tabTitleBtns.length > 0) {
          tabTitleBtns.forEach((tabTitleBtn) => {
            html = html.split(tabTitleBtn).join('');
          });
        }

        const findFirstSectionTagReg = /<br>(?:<br>)?<section class="ui-tab-pnl((.|\n)*?)role="tabpanel">/g;
        const firstSectionTags = html.match(findFirstSectionTagReg);
        const removeSectionTagReg = /<section class="ui-tab-pnl((.|\n)*?)role="tabpanel">/g;
        const sectionTags = html.match(removeSectionTagReg);
        // 첫 번째 section tag 를 찾아서 tabs:start 를 넣어줌
        if (firstSectionTags !== null && firstSectionTags.length > 0) {
          firstSectionTags.forEach((firstSection) => {
            html = html.split(firstSection).join('tabs:start');
          });
        }

        // 마지막 section tag 를 찾아서 tabs:end 를 넣어줌
        html = html.split('</section><br>').join('tabs:end');

        // section tag 를 없애줌
        if (sectionTags !== null && sectionTags.length > 0) {
          sectionTags.forEach((sectionTag) => {
            html = html.split(sectionTag).join('');
          });
        }

        // section tag 를 없애줌
        html = html.split('</section>').join('');

        const resultArray: Array<any> = [];
        html = this.eventManager.emitReduce(
          'convertorBeforeHtmlToMarkdownConverted',
          html
        );
        let markdown = toMark(
          this._appendAttributeForBrIfNeed(html),
          toMarkOptions
        );
        markdown = this.eventManager.emitReduce(
          'convertorAfterHtmlToMarkdownConverted',
          markdown
        );
        markdown.split('\n').forEach((line, index) => {
          const FIND_TABLE_RX = /^\|[^|]*\|/gi;
          const FIND_CODE_RX = /`[^`]*<br>[^`]*`/gi;
          if (!FIND_CODE_RX.test(line) && !FIND_TABLE_RX.test(line)) {
            line = line.replace(/<br>/gi, '<br>\n');
          }
          // 위에서 주석을 추가하여도 변환 과정에서 주석이 사라지기 때문에 마지막에 넣어주어야 함
          if (line.includes('tabs:start') && line.includes('tabs:end')) {
            line = line.replace(/(\s*)/g, '');
            line = line.replace('tabs:start', '\n<!-- tabs:start -->');
            line = line.replace('tabs:end', '<!-- tabs:end -->\n');
          } else if (line.includes('tabs:start')) {
            line = line.replace('tabs:start', '<!-- tabs:start -->');
          } else if (line.includes('tabs:end')) {
            line = line.replace('tabs:end', '<!-- tabs:end -->');
          }
          resultArray[index] = line;
        });
        return resultArray.join('\n');
      };
    }, 100);
  }
}
function titleButtonClick(titleBtn) {
  const clickTabNum = titleBtn.parentNode.dataset.tabnum; // 에디터 전체에서 몇 번째 다중 코드 블럭인지 판단하는 변수
  const clickValue = titleBtn.parentNode.dataset.value; // 몇 번째 탭 타이틀을 선택했는지 판단하는 변수
  const btnParentNode = titleBtn.parentNode.parentNode;
  const pnlParentNode = titleBtn.parentNode.parentNode.nextElementSibling;
  // let contentArea; // 코드 블럭 영역
  // 위즈윅 모드, 프리뷰 모드에서 각각 구조가 달라서 따로 처리해주어야 함
  // console.log(clickTabNum);
  // console.log(clickValue);
  // console.log(titleBtn.parentNode.parentNode.nextElementSibling);
  // console.log(titleBtn.parentNode.parentNode.nextElementSibling.children);
  if (pnlParentNode.dataset.tabnum === clickTabNum) {
    const childrenPnlNode = pnlParentNode.children;
    for (let idx = 0; idx < childrenPnlNode.length; idx++) {
      childrenPnlNode[idx].classList.remove('active');
      if (idx === Number(clickValue)) {
        childrenPnlNode[idx].classList.add('active');
      }
    }
  }

  if (btnParentNode.dataset.tabnum === clickTabNum) {
    const childrenBtnNode = btnParentNode.children;
    for (let idx = 0; idx < childrenBtnNode.length; idx++) {
      childrenBtnNode[idx].classList.remove('active');
      if (idx === Number(clickValue)) {
        childrenBtnNode[idx].classList.add('active');
      }
    }
  }
  // if ($(self).siblings('article.multiTab').length === 0) {
  //   contentArea = $(self)
  //     .parent('div')
  //     .siblings('article.multiTab')
  //     .find('.' + clickTabNum);
  // } else {
  //   contentArea = $(self)
  //     .siblings('article.multiTab')
  //     .find('.' + clickTabNum);
  // }
  // contentArea.addClass('hide');
  // contentArea.eq(clickValue).removeClass('hide');
  // $(self)
  //   .siblings('input')
  //   .removeClass('on');
  // $(self).addClass('on');
}
</script>

<style scoped>
.tui-editor-contents pre input[type='text'] {
  max-width: 811px;
}
</style>
