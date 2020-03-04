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
import { Vue, Component, namespace } from 'nuxt-property-decorator';
import toMark from 'to-mark';
import { expandAll } from '~/utils/commonFuncs';
import ModalComponent from '@/components/common/modal/modalComponent.vue';
import CreatePageModal from '@/components/productEdit/CreatePageModal.vue';
import FileUploadModal from '@/components/productEdit/FileUploadModal.vue';
import * as repository from '@/store/modules/repository';
import * as commit from '@/store/modules/commit';
import * as product from '@/store/modules/product';
import { IAlert } from '@/store/modules/common';
import EventBus from '@/store/modules/repository.ts';

const Repository = namespace('repository');
const Commit = namespace('commit');
const Product = namespace('product');
const Common = namespace('common');

@Component({
  components: {
    ModalComponent,
    CreatePageModal,
    FileUploadModal,
  },
})
export default class ProductEdit extends Vue {
  @Repository.Action('getIndexMdFile') getIndexMdFileAction;
  @Repository.Action('getRepositoryFile') getRepositoryFileAction;
  @Repository.Action('getRepository') getRepositoryAction;
  @Repository.Action('getProjectInfo') getProjectInfoAction;
  @Repository.Action('convertImagePath') convertImagePathAction;
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
  @Product.Action('selectProduct') selectProductAction;
  viewerText!: string;
  mdData: string = ''; // 파일 트리 수정 내용 담는 변수

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

  $modal!: any;

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
      if (fileUploadModalData.length === 0) {
        this.alertAction({
          type: 'warning',
          isShow: true,
          msg: '첨부할 파일을 한 개 이상 선택해주세요.',
        }).then(() => {});
      } else {
        fileUploadModalData.forEach((filePath) => {
          this.getProjectInfoAction({
            projectId: this.$store.state.product.product.projectId,
            gitlabToken: this.$store.state.user.user.gitlabToken,
          }).then((res) => {
            this.insertDownloadLink(res.data.name, filePath);
            this.$modal.hide(this.fileUploadModalName);
          });
        });
      }
    } else {
      this.$modal.hide(this.fileUploadModalName);
    }
  }

  insertDownloadLink(projectName, filePath) {
    const splitFilePath: Array<string> = filePath.split('/');
    const fileName = splitFilePath[splitFilePath.length - 1];
    const tuiEditor = this.$refs.editorArea.editor;
    if (filePath !== '') {
      const data = {
        url: filePath.charAt(0) === '/' ? filePath : '/' + filePath,
        linkText: fileName,
      };
      if (tuiEditor.currentMode === 'wysiwyg') {
        const wwe = tuiEditor.wwEditor;
        tuiEditor.commandManager._wwCommand.get('AddLink').exec(wwe, data);
      } else {
        const mde = tuiEditor.mdEditor;
        tuiEditor.commandManager._mdCommand.get('AddLink').exec(mde, data);
      }
    }
  }

  created() {
    if (!this.$store.state.user.user.gitlabToken) {
      return;
    }

    this.selectProductAction({
      productCode: this.$route.params.productCode,
    });

    if (
      this.$store.state.repository.treeData === undefined ||
      this.$store.state.repository.treeData.length === 0 ||
      (this.$route.params.branchName !== undefined &&
        this.$route.params.pageId === undefined)
    ) {
      this.getIndexMdFileAction({
        productCode: this.$route.params.productCode,
        pageType: this.$route.params.pageType,
        ref: this.$route.params.branchName,
        refType: 'branch',
        filePath: this.$route.params.pageId,
        pageTitle: this.$route.params.pageTitle,
        gitlabToken: this.$store.state.user.user.gitlabToken,
      }).then(() => {
        this.viewerText = this.$store.state.repository.viewerText;
        this.setEditingViewerText(this.$store.state.repository.viewerText);
        this.setEditingPageTitle(this.$store.state.repository.pageTitle);
        this.setEditingFilePath(this.$store.state.repository.filePath);
        if (this.$store.state.repository.editStatus !== 'cancel') {
          this.setEditStatus('init');
        }
      });
    }
    if (this.$route.params.pageId) {
      this.getRepositoryFileAction({
        productCode: this.$route.params.productCode,
        filePath: this.$route.params.pageId + '.md',
        ref: this.$route.params.branchName,
        refType: 'branch',
        pageTitle: this.$route.params.pageTitle,
        gitlabToken: this.$store.state.user.user.gitlabToken,
      }).then(() => {
        this.viewerText = this.$store.state.repository.viewerText;
        this.setEditingViewerText(this.$store.state.repository.viewerText);
        this.setEditingPageTitle(this.$store.state.repository.pageTitle);
        this.setEditingFilePath(this.$store.state.repository.filePath);
        if (this.$store.state.repository.editStatus !== 'cancel') {
          this.setEditStatus('init');
        }
      });
    }

    this.getRepositoryAction({
      productCode: this.$route.params.productCode,
      ref: this.$route.params.branchName,
      gitlabToken: this.$store.state.user.user.gitlabToken,
    });

    this.getRepositoryAction({
      productCode: this.$route.params.productCode,
      ref: this.$route.params.branchName,
      useDocPath: true,
      gitlabToken: this.$store.state.user.user.gitlabToken,
      pageType: this.$route.params.pageType,
    });

    // this.viewerText = this.$store.state.repository.viewerText;
    // this.setEditingViewerText(this.$store.state.repository.viewerText);
    // this.setEditingPageTitle(this.$store.state.repository.pageTitle);
    // this.setEditingFilePath(this.$store.state.repository.filePath);
    // if (this.$store.state.repository.editStatus !== 'cancel') {
    //   this.setEditStatus('init');
    // }
  }

  mounted() {
    // commit file 을 한 곳에서 처리하기 위한 이벤트
    EventBus.$on(
      'commitFiles',
      (pageTitleParam, filePathParam, changeEditingMenu) => {
        this.alertAction({
          type: 'question',
          isShow: true,
          msg: '수정중이던 내용을 commit 하시겠습니까?',
        }).then(async (result) => {
          if (result.ok) {
            const actionArr: Array<any> = [];
            if (!changeEditingMenu) {
              actionArr.push({
                action: this.$store.state.repository.editStatus,
                file_path: this.$store.state.repository.editingFilePath,
                content: this.$store.state.repository.editingViewerText,
              });
            }
            // 문서명 또는 마크다운 경로를 수정한 경우 (index.md 파일도 함께 commit 되어야함)
            if (
              this.$store.state.repository.editingMenuTreeToJson !==
                undefined &&
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
            await this.setEditingMenuTreeToJson([]);
          } else {
            await this.setEditStatus('cancel');
            this.$refs.editorArea.invoke(
              'setMarkdown',
              this.$store.state.repository.viewerText
            );
            this.$refs.editorArea.editor.moveCursorToStart();
            this.setEditingViewerText(this.$store.state.repository.viewerText);
            this.setEditingPageTitle(this.$store.state.repository.pageTitle);
            this.setEditingFilePath(this.$store.state.repository.filePath);
            await this.setEditingMenuTreeToJson([]);
          }
          await this.setEditingMenuTreeToJson([]);
          this.mdData = '';
          await this.$router.push({
            name: 'editDoc',
            params: {
              productCode: this.$route.params.productCode,
              pageType: this.$route.params.pageType,
              branchName: this.$route.params.branchName,
              pageTitle: pageTitleParam,
              pageId: filePathParam,
            },
          });
        });
      }
    );

    const tuiEditor = this.$refs.editorArea.editor.getUI().getToolbar();
    const multiCodeBlockButton = document.createElement('button');
    const fileUploadButton = document.createElement('button');
    multiCodeBlockButton.setAttribute(
      'class',
      'tui-multiCodeBlock tui-toolbar-icons'
    );
    fileUploadButton.setAttribute('class', 'tui-fileUpload tui-toolbar-icons');
    tuiEditor.addButton({
      name: 'multiCodeBlock',
      command: 'multiCodeBlock',
      tooltip: 'Insert Multi codeBlock',
      className: 'tui-multiCodeBlock tui-toolbar-icons',
      $el: document.getElementsByClassName(
        'tui-multiCodeBlock tui-toolbar-icons'
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

  beforeDestroy() {
    EventBus.$off('commitFiles');
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

  // 확인 버튼 클릭 시
  createCommit() {
    if (
      this.$store.state.repository.editStatus === 'update' ||
      this.$store.state.repository.editStatus === 'create'
    ) {
      EventBus.$emit(
        'commitFiles',
        this.$store.state.repository.editingPageTitle,
        this.$store.state.repository.editingFilePath
      );
      this.$refs.editorArea.editor.moveCursorToStart();
    } else if (
      this.$store.state.repository.editingMenuTreeToJson.length === 1
    ) {
      EventBus.$emit(
        'commitFiles',
        this.$store.state.repository.editingPageTitle,
        this.$store.state.repository.editingFilePath,
        true
      );
      this.$refs.editorArea.editor.moveCursorToStart();
    } else {
      this.alertAction({
        type: 'warning',
        isShow: true,
        msg: '수정중인 내용이 없습니다.',
      }).then(() => {});
    }
  }

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
    this.$refs.editorArea.$el
      .querySelectorAll('.ui-tab-btn')
      .forEach((titleBtn) => {
        titleBtn.addEventListener('click', (e) => {
          titleButtonClick(e.target, this.$refs.editorArea);
        });
      });
  }

  onEditorChange() {
    if (
      this.$store.state.repository.editStatus !== 'init' &&
      this.$store.state.repository.editStatus !== 'create'
    ) {
      this.setEditStatus('update');
    }
    this.setEditingViewerText(this.$refs.editorArea.invoke('getMarkdown'));
    if (this.$refs.editorArea.editor.currentMode === 'wysiwyg') {
      const uiTabPnl = this.$refs.editorArea.$el.querySelectorAll(
        '.ui-tab-pnl'
      );
      for (let idx = 0; idx < uiTabPnl.length; idx++) {
        if (uiTabPnl[idx].previousElementSibling.tagName === 'DIV') {
          uiTabPnl[idx].previousElementSibling.remove();
        }
      }
      this.$refs.editorArea.$el
        .querySelectorAll('.ui-tab-btn')
        .forEach((titleBtn) => {
          titleBtn.addEventListener('click', (e) => {
            titleButtonClick(e.target, this.$refs.editorArea);
          });
        });
    }
  }

  onEditorLoad() {
    // Editor 가 완전히 load 되고 나서 실행되는 함수
    const tuiEditor = this.$refs.editorArea;
    const modal = this.$modal;
    const fileUploadModalName = this.fileUploadModalName;
    const viewerText = this.$store.state.repository.viewerText;
    const convertImagePathAction = this.convertImagePathAction;
    const currentProductCode = this.$store.state.product.product.productCode;
    const refName = this.$store.state.repository.currentRef;
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
              '<section class="ui-tab small" data-tabnum="tab_' +
              tabNum +
              '" role="tablist">' +
              '<input class="ui-tab-btn active" data-tabnum="tab_' +
              tabNum +
              '" data-value="0" data-tomark-pass="" role="button" value="javascript"/>' +
              '<input class="ui-tab-btn" data-tabnum="tab_' +
              tabNum +
              '" data-value="1" data-tomark-pass="" role="button" value="html"/>' +
              '<input class="ui-tab-btn" data-tabnum="tab_' +
              tabNum +
              '" data-value="2" data-tomark-pass="" role="button" value="result"/>' +
              '</section>' +
              '<pre data-multiTab data-te-codeblock class="tab_' +
              tabNum +
              ' lang-javascript ui-tab-pnl active" data-language="javascript"></pre>' +
              // '<section class="ui-tab-pnl" data-tomark-pass="" role="tabpanel">' +
              '<pre data-multiTab data-te-codeblock class="tab_' +
              tabNum +
              ' lang-html ui-tab-pnl" data-language="html"></pre>' +
              // '<section class="ui-tab-pnl" data-tomark-pass="" role="tabpanel">' +
              '<pre data-multiTab data-te-codeblock class="tab_' +
              tabNum +
              ' lang-result ui-tab-pnl" data-language="result"></pre>' +
              '<section style="display: none;"><article></article></section>';
            const result = md.render(html);
            tuiEditor.editor.wwEditor.getEditor().insertHTML(result);
            tuiEditor.$el
              .querySelectorAll('.ui-tab-btn')
              .forEach((titleBtn) => {
                titleBtn.addEventListener('click', (e) => {
                  titleButtonClick(e.target, tuiEditor);
                });
              });
            // // html 변수 안에 url을 넣으면 a 태그가 생겨서 text 값으로 삽입
            // $('pre.tab_' + tabNum + '.lang-result').text(
            //   'https://www.youtube.com/embed/XGSy3_Czz8k'
            // );
          },
        }
      );
      // commandManager 를 이용하여 정의해놓은 command 추가
      tuiEditor.editor.commandManager.addCommand(mdMultiCodeBlockCommand);
      tuiEditor.editor.commandManager.addCommand(wwMultiCodeBlockCommand);

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
      // // previewStyle 이 vertical 일 때 preview 에 다중 코드 블럭 탭 UI 를 출력시키기 위해 이벤트 확장
      // const eventManager = tuiEditor.editor.eventManager;
      // eventManager.listen('contentChangedFromMarkdown', function() {
      //   const lastestMarkdownValue = tuiEditor.invoke('getHtml');
      //   if (tuiEditor.editor.preview.isVisible()) {
      //     tuiEditor.editor.preview.lazyRunner.run(
      //       'refresh',
      //       lastestMarkdownValue
      //     );
      //     if (
      //       lastestMarkdownValue.includes(
      //         '<div class="ui-tab small" data-tomark-pass="">'
      //       )
      //     ) {
      //       setTimeout(function() {
      //         // if ($('.lang-result').length > 0) {
      //         //   $.each($('.lang-result'), function(idx, value) {
      //         //     var preClass = $(value)
      //         //       .parent('pre')
      //         //       .attr('class');
      //         //     var src = $(value).text();
      //         //     $(value)
      //         //       .parent('pre')
      //         //       .before(
      //         //         '<div class="' +
      //         //           preClass +
      //         //           '"><iframe width="300" height="300" src="' +
      //         //           src +
      //         //           '"></iframe></div>'
      //         //       );
      //         //     $(value)
      //         //       .parent('pre')
      //         //       .remove();
      //         //   });
      //         // }
      //         tuiEditor.$el
      //           .querySelectorAll('.ui-tab-btn')
      //           .forEach((titleBtn) => {
      //             titleBtn.addEventListener('click', (e) => {
      //               titleButtonClick(e.target, tuiEditor);
      //             });
      //           });
      //       }, 900);
      //     }
      //   }
      // });
      // previewStyle 이 tab 일 때 preview 에 다중 코드 블럭 탭 UI 를 출력시키기 위해 refresh 함수 확장
      tuiEditor.editor.preview.refresh = async function(markdown) {
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
        this.render(this.convertor.toHTMLWithCodeHightlight(markdown));
        if (!markdown.includes('<!-- tabs:start -->')) {
          this.render(this.convertor.toHTMLWithCodeHightlight(markdown));
        } else {
          tuiEditor.editor.preview.setHTML(tuiEditor.invoke('getHtml'));
          // this.render(this.convertor.toHTMLWithCodeHightlight(markdown));
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
              titleButtonClick(e.target, tuiEditor);
            });
          });
        }
        const tuiPreviewArea = tuiEditor.$el.querySelector('.te-preview');
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
                '<section class="ui-tab small" data-tabnum="tab_' +
                tabIndex +
                '" role="tablist">';
              let k: number = 0; // 다중 코드 블럭에서 각 코드 블럭에 순서를 매기기 위한 변수
              codeBlocks.forEach((codeBlock, codeBlockIndex) => {
                const language = codeBlock.split('\n')[0];
                let tabTitle = language.split('```')[1].trim();
                const activeClass = codeBlockIndex === 0 ? ' active' : ''; // 첫 번째 탭 타이틀에 active class 추가
                tabTitle = tabTitle === '' ? 'codeblock' : tabTitle; // ``` 다음에 아무것도 안썼을 경우 탭 타이틀을 codeblock 으로 출력
                replaceText +=
                  '<input class="ui-tab-btn' +
                  activeClass +
                  '" data-tabnum="tab_' +
                  tabIndex +
                  '" data-value="' +
                  k++ +
                  '" role="button" value="' +
                  tabTitle +
                  '"/>';
              });
            }
            string = string.replace(
              '<!-- tabs:start -->',
              replaceText + '</section>'
            );
            string = string.replace(
              '<!-- tabs:end -->',
              '<section style="display: none;"><article></article></section><br/>'
            );
          });
        }
        let html = this._markdownToHtml(string);
        html = this.eventManager.emitReduce(
          'convertorAfterMarkdownToHtmlConverted',
          html
        );
        // TODO 만약에 markdown to wysywyg 시 개행 문제가 있으면 여기서 br 을 다 없애버려서 나는 거니까 여기서 처리해야함
        html = this._removeBrToMarkPassAttributeInCode(html);
        const tabHTMLReg = /<section class="ui-tab small"((.|\n)*?)<\/article><\/section>/g;
        const tabHTMLArray = html.match(tabHTMLReg);
        if (tabHTMLArray !== null && tabHTMLArray.length > 0) {
          tabHTMLArray.forEach((tabHTML, tabIndex) => {
            let insertSectionTag = tabHTML.replace(
              '<pre>',
              '<pre data-multiTab class="tab_' +
                tabIndex +
                ' ui-tab-pnl active">'
            );
            insertSectionTag = insertSectionTag
              .split('<pre>')
              .join(
                '<pre data-multiTab class="tab_' + tabIndex + ' ui-tab-pnl">'
              );
            html = html.replace(tabHTML, insertSectionTag);
          });
        }
        tuiEditor.$el.querySelectorAll('.ui-tab-btn').forEach((titleBtn) => {
          titleBtn.addEventListener('click', (e) => {
            titleButtonClick(e.target, tuiEditor);
          });
        });
        html = decodeURI(html);
        return html;
      };

      // wysiwyg 을 markdown 으로 변환할 때
      convertor.toMarkdown = function(html, toMarkOptions) {
        html = html
          .split('</section><pre><code data-multitab=""')
          .join('</section>tabs:start<pre><code data-multitab=""');

        // 마지막 section tag 를 찾아서 tabs:end 를 넣어줌
        html = html
          .split('<section style="display: none;"></section>')
          .join('tabs:end');
        html = html
          .split(
            '<section style="display: none;" data-tomark-pass=""><article data-tomark-pass=""></article></section>'
          )
          .join('tabs:end');
        html = html.split('<section></section>').join('tabs:end');

        const removeBtns = /<section class="ui-tab small((.|\n)*?)\/section>/g;

        const tabTitleBtns = html.match(removeBtns);
        if (tabTitleBtns !== null && tabTitleBtns.length > 0) {
          tabTitleBtns.forEach((tabTitleBtn) => {
            html = html.split(tabTitleBtn).join('');
          });
        }

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
            line = line.replace('tabs:end', '<!-- tabs:end -->\n');
          }
          resultArray[index] = line;
        });
        return resultArray.join('\n');
      };
      tuiEditor.invoke('setMarkdown', viewerText);
      tuiEditor.$el.querySelectorAll('.ui-tab-btn').forEach((titleBtn) => {
        titleBtn.addEventListener('click', (e) => {
          titleButtonClick(e.target, tuiEditor);
        });
      });
      tuiEditor.editor.moveCursorToStart();
    }, 100);
  }
}
function titleButtonClick(titleBtn, tuiEditor) {
  const clickTabNum = titleBtn.dataset.tabnum; // 에디터 전체에서 몇 번째 다중 코드 블럭인지 판단하는 변수
  const clickValue = titleBtn.dataset.value; // 몇 번째 탭 타이틀을 선택했는지 판단하는 변수
  const btnParentNode = titleBtn.parentNode;

  let tuiEditorArea = tuiEditor.$el.querySelector('.te-ww-container');
  if (tuiEditor.editor.currentMode === 'markdown') {
    tuiEditorArea = tuiEditor.$el.querySelector('.te-preview');
  }
  const tabPnls = tuiEditorArea.querySelectorAll('.' + clickTabNum);

  for (let idx = 0; idx < tabPnls.length; idx++) {
    tabPnls[idx].classList.remove('active');
    // // 엔터 연속 두 번 누르면 개행이 생겨서 그거 없애려고 추가한 코드
    // if (tabPnls[idx].previousElementSibling.tagName === 'DIV') {
    //   tabPnls[idx].previousElementSibling.remove();
    // }
    if (idx === Number(clickValue)) {
      tabPnls[idx].classList.add('active');
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
}
</script>

<style scoped>
.tui-editor-contents pre input[type='text'] {
  max-width: 811px;
}
</style>
