<template>
  <div class="left-menu">
    <p class="tit-con-left">
      <strong>{{ $store.state.product.product.productName }}</strong>
    </p>
    <div class="branch-name">
      <p class="dbs-icon-button ico-left ico-contents branch ellipsis">
        {{ $route.params.branchName }}
      </p>
      <nuxt-link
        :to="{
          name: 'branchManagement',
          params: { productCode: $store.state.product.product.productCode },
        }"
        tag="i"
        class="ico-setting"
      ></nuxt-link>
    </div>
    <ul class="ui-navi">
      <nuxt-link
        :to="{
          name: 'editDocInit',
          params: {
            productCode: $route.params.productCode,
            pageType: 'Document',
            branchName: $route.params.branchName,
          },
        }"
        tag="li"
        :class="{ selected: $route.params.pageType === 'Document' }"
      >
        <a>Document</a>
      </nuxt-link>
      <nuxt-link
        v-show="$store.state.product.product.apiUse"
        :to="{
          name: 'editDocInit',
          params: {
            productCode: $route.params.productCode,
            pageType: 'API',
            branchName: $route.params.branchName,
          },
        }"
        tag="li"
        :class="{ selected: $route.params.pageType === 'API' }"
      >
        <a>API</a>
      </nuxt-link>
    </ul>
    <div class="line mgt-15 mgb-15"></div>
    <div class="btn-wrap-both mgt-15 mgb-10">
      <button
        type="button"
        class="dbs-icon-button ico-left small file"
        @click="createFolder"
      >
        새폴더
      </button>
      <button
        type="button"
        class="dbs-icon-button ico-left small document"
        @click="openGitPageSearchModal"
      >
        새페이지
      </button>
      <button
        type="button"
        class="dbs-icon-button ico-left small delete"
        style="margin-left: 2px; padding-right: 8px;"
        @click="removeNode"
      ></button>
      <!--<button @click="test">test</button>-->
    </div>
    <div class="menu-tree">
      <tree
        ref="tree"
        :data="$store.state.repository.editingMenuTree"
        :options="treeOptions"
        @node:dragging:start="dragStart"
        @node:dragging:finish="dragFinish"
        @node:clicked="clickTree"
      >
        <!--<div-->
        <!--v-if="node.states.path"-->
        <!--slot-scope="{ node }"-->
        <!--class="node-container"-->
        <!--@click="clickTree(node)"-->
        <!--&gt;-->
        <!--{{ node.text }}-->
        <!--</div>-->
        <!--<nuxt-link-->
        <!--v-if="node.states.path"-->
        <!--slot-scope="{ node }"-->
        <!--:to="{-->
        <!--name: 'editDoc',-->
        <!--params: {-->
        <!--productCode: $store.state.product.product.productCode,-->
        <!--branchName: $store.state.repository.currentRef,-->
        <!--pageType: $route.params.pageType,-->
        <!--pageTitle: node.text,-->
        <!--pageId: node.states.path,-->
        <!--},-->
        <!--}"-->
        <!--class="node-container"-->
        <!--@click.native="clickTree(node)"-->
        <!--&gt;-->
        <!--{{ node.text }}-->
        <!--</nuxt-link>-->
        <div slot-scope="{ node }" class="node-container">
          {{ node.text }}
        </div>
      </tree>
    </div>
    <!--<div class="btn-wrap-both mgt-10">-->
    <!--<button-->
    <!--type="button"-->
    <!--class="dbs-icon-button ico-left small delete"-->
    <!--@click="removeNode"-->
    <!--&gt;-->
    <!--삭제-->
    <!--</button>-->
    <!--<span class="fr">-->
    <!--<button-->
    <!--type="button"-->
    <!--class="dbs-icon-button arrow up"-->
    <!--@click="up"-->
    <!--&gt;</button>-->
    <!--<button type="button" class="dbs-icon-button arrow down"></button>-->
    <!--</span>-->
    <!--</div>-->
    <!-- 새 페이지 생성 다이얼로그 -->
    <modal-component
      :modal-title="createPageModalTitle"
      :modal-name="createPageModalName"
      :modal-height="createPageModalHeight"
      :modal-width="createPageModalWidth"
      @emit-confirm="createPageModalConfirm"
    >
      <create-page-modal
        slot="modalContent"
        ref="createPageModal"
        :new-page="true"
      ></create-page-modal>
    </modal-component>

    <!-- 문서명, git 마크다운 경로 수정 다이얼로그 -->
    <modal-component
      :modal-title="editInfoModalTitle"
      :modal-name="editInfoModalName"
      :modal-height="editInfoModalHeight"
      :modal-width="editInfoModalWidth"
      @emit-confirm="editInfoModalConfirm"
    >
      <create-page-modal
        slot="modalContent"
        ref="editInfoModal"
        :doc-name="$store.state.repository.editingPageTitle"
        :doc-path="$store.state.repository.editingFilePath"
        :new-page="false"
      ></create-page-modal>
    </modal-component>

    <!-- 새 페이지 생성 다이얼로그 안에서 신규 페이지 생성 다이얼로그 -->
    <modal-component
      :modal-title="gitFolderSearchModalTitle"
      :modal-name="gitFolderSearchModalName"
      :modal-height="gitFolderSearchModalHeight"
      :modal-width="gitFolderSearchModalWidth"
      @emit-confirm="gitFolderSearchModalConfirm"
    >
      <git-folder-search-modal
        slot="modalContent"
        ref="gitFolderSearchModal"
        :doc-path-flag="false"
      ></git-folder-search-modal>
    </modal-component>

    <!-- 새 페이지 생성 다이얼로그 안에서 기존 페이지 선택 다이얼로그 -->
    <modal-component
      :modal-title="gitPageSearchModalTitle"
      :modal-name="gitPageSearchModalName"
      :modal-height="gitPageSearchModalHeight"
      :modal-width="gitPageSearchModalWidth"
      @emit-confirm="gitPageSearchModalConfirm"
    >
      <git-page-search-modal
        slot="modalContent"
        ref="gitPageSearchModal"
        :doc-path-flag="false"
      ></git-page-search-modal>
    </modal-component>
  </div>
</template>

<script lang="ts">
import { Vue, Component, namespace, Watch } from 'nuxt-property-decorator';
import LiquorTree from 'liquor-tree';
import { expandAll } from '~/utils/commonFuncs';
import ModalComponent from '@/components/common/modal/modalComponent.vue';
import CreatePageModal from '@/components/productEdit/CreatePageModal.vue';
import GitFolderSearchModal from '@/components/productEdit/GitFolderSearchModal.vue';
import GitPageSearchModal from '@/components/productEdit/GitPageSearchModal.vue';
import * as commit from '@/store/modules/commit.ts';
import * as branch from '@/store/modules/branch.ts';
import EventBus from '@/store/modules/repository.ts';
import { IAlert } from '@/store/modules/common';

const Repository = namespace('repository');
const Commit = namespace('commit');
const Branch = namespace('branch');
const Common = namespace('common');

Vue.use(LiquorTree);

@Component({
  components: {
    ModalComponent,
    CreatePageModal,
    GitFolderSearchModal,
    GitPageSearchModal,
  },
})
export default class EditingMenu extends Vue {
  @Repository.Action('getIndexMdFile') getIndexMdFileAction;
  @Repository.Action('getRepositoryFile') getRepositoryFileAction;
  @Repository.Action('getFileContent') getFileContentAction;
  @Repository.Mutation('setEditingPageTitle') setEditingPageTitle;
  @Repository.Mutation('setEditingFilePath') setEditingFilePath;
  @Repository.Mutation('setEditingViewerText') setEditingViewerText;
  @Repository.Mutation('setEditStatus') setEditStatus;
  @Repository.Mutation('setEditingMenuTree') setEditingMenuTree;
  @Repository.Mutation('setEditingMenuTreeToJson') setEditingMenuTreeToJson;
  @Repository.Mutation('setInitialization') setInitialization;
  @Repository.Getter('getTree') getTree!: Array<any>;
  @Commit.Action('createCommit') createCommitAction;
  @Branch.Action('search') searchAction;
  @Common.Action('alert') alertAction!: (payload: IAlert) => Promise<any>;

  $refs!: {
    tree: any;
    gitFolderSearchModal: any;
    createPageModal: any;
    gitPageSearchModal: any;
    editInfoModal: any;
  };
  $modal!: any;

  // editingMenuTree!: Array<any>;
  selectedNode!: any;

  createPageModalTitle: string = '새 페이지 생성';
  createPageModalName: string = 'createPageModal';
  createPageModalHeight: string = '537px';
  createPageModalWidth: string = '700px';

  gitFolderSearchModalTitle: string = 'Git 폴더 탐색기';
  gitFolderSearchModalName: string = 'gitFolderSearchModal';
  gitFolderSearchModalHeight: string = '673px';
  gitFolderSearchModalWidth: string = '700px';

  gitPageSearchModalTitle: string = 'Git 파일 탐색기';
  gitPageSearchModalName: string = 'gitPageSearchModal';
  gitPageSearchModalHeight: string = '673px';
  gitPageSearchModalWidth: string = '700px';

  editInfoModalTitle: string = '문서명 및 git 마크다운 경로 수정';
  editInfoModalName: string = 'editInfoModal';
  editInfoModalHeight: string = '537px';
  editInfoModalWidth: string = '700px';

  dialogType!: string;

  treeOptions = {
    propertyNames: {
      text: 'title',
      children: 'children',
      state: 'option',
      data: 'path',
    },
    dnd: true,
  };

  clickTree(node) {
    if (node.states.path) {
      // this.$store.state.repository.viewerText !==
      // this.$store.state.repository.editingViewerText ||
      // this.$store.state.repository.pageTitle !==
      // this.$store.state.repository.editingPageTitle ||
      // this.$store.state.repository.filePath !==
      // this.$store.state.repository.editingFilePath ||
      if (
        this.$store.state.repository.editStatus === 'update' ||
        this.$store.state.repository.editStatus === 'create' ||
        this.$store.state.repository.editingMenuTreeToJson.length === 1
      ) {
        EventBus.$emit('commitFiles', node.text, node.states.path);
      } else {
        this.$router.push({
          name: 'editDoc',
          params: {
            productCode: this.$store.state.product.product.productCode,
            branchName: this.$store.state.repository.currentRef,
            pageType: this.$route.params.pageType,
            pageTitle: node.text,
            pageId: node.states.path,
          },
        });
      }
    }
    node.select();
    this.selectedNode = node;
  }

  // test() {
  //   this.$refs.tree.tree.model.unshift();
  //   console.log(this.$refs.tree.tree.model.unshift);
  // }

  @Watch('$store.state.repository.editingPageTitle')
  changePageTitle() {
    if (
      this.$store.state.repository.editStatus !== 'cancel' &&
      this.$store.state.repository.editStatus !== 'init'
    ) {
      const selectedNode = this.$refs.tree.selected()[0];
      selectedNode.text = this.$store.state.repository.editingPageTitle;
      this.setEditingMenuTreeToJson(this.$refs.tree.toJSON());
      this.setEditStatus('update');
    }
  }

  @Watch('$store.state.repository.editingFilePath')
  changeFilePath() {
    if (
      this.$store.state.repository.editStatus !== 'cancel' &&
      this.$store.state.repository.editStatus !== 'init'
    ) {
      const selectedNode = this.$refs.tree.selected()[0];
      selectedNode.states.path = this.$store.state.repository.editingFilePath;
      this.setEditingMenuTreeToJson(this.$refs.tree.toJSON());
      this.setEditStatus('update');
    } else {
      this.setEditStatus('init');
    }
  }

  @Watch('$store.state.repository.editStatus')
  changeEditStatus(value) {
    if (value === 'cancel') {
      this.selectedNode = this.$refs.tree.selected()[0];
      this.$refs.tree.tree
        .setModel(this.$store.state.repository.editingMenuTree)
        .then(() => {
          this.$refs.tree.selected()[0].unselect();

          const selectNode = this.$refs.tree.find({
            text: this.selectedNode.text,
            state: { path: this.selectedNode.states.path },
          });

          selectNode.select();
          this.selectedNode = selectNode[0];
        });
    }
  }

  beforeDestroy() {
    this.setInitialization();
  }

  created() {
    const treeData = this.$store.state.repository.treeData.slice();
    const editingMenuTree = [
      {
        title: this.$store.state.product.product.productName,
        option: {
          expanded: true,
          selected: false,
          path: undefined,
        },
        type: 'folder',
        children: treeData,
      },
    ];
    if (this.$route.params.pageId === undefined) {
      this.getIndexMdFileAction({
        productCode: this.$route.params.productCode,
        pageType: this.$route.params.pageType,
        ref: this.$route.params.branchName,
        refType: 'branch',
        filePath: this.$route.params.pageId,
        pageTitle: this.$route.params.pageTitle,
      });
    } else {
      this.getRepositoryFileAction({
        productCode: this.$route.params.productCode,
        ref: this.$route.params.branchName,
        refType: 'branch',
        filePath: this.$route.params.pageId + '.md',
        pageTitle: this.$route.params.pageTitle,
      });
    }
    if (editingMenuTree.length > 0) {
      editingMenuTree.forEach((data) => {
        expandAll(data);
      });
    }
    this.setEditingMenuTree(editingMenuTree);
  }

  mounted() {
    setTimeout(() => {
      this.selectedNode = this.$refs.tree.selected()[0];
    });
  }

  dragStart(targetNode): void {
    if (targetNode.id !== this.selectedNode.id) {
      targetNode.unselect();
      this.selectedNode.select();
    } else {
      targetNode.select();
      this.selectedNode = targetNode;
    }
  }

  dragFinish(targetNode): void {
    if (targetNode.id !== this.selectedNode.id) {
      targetNode.unselect();
      this.selectedNode.select();
    } else {
      targetNode.select();
      this.selectedNode = targetNode;
    }
    this.setEditStatus('update');
    this.setEditingMenuTreeToJson(this.$refs.tree.toJSON());
  }

  // 새페이지 버튼 클릭
  openGitPageSearchModal() {
    this.dialogType = 'createPage';
    this.$modal.show(this.createPageModalName);
  }

  // 새폴더 버튼 클릭
  createFolder() {
    const appendNode = this.$refs.tree.append(this.$refs.tree.selected()[0], {
      text: '',
    });
    appendNode.startEditing();
  }

  // 삭제 버튼 클릭
  removeNode() {
    const selectedNode = this.$refs.tree.selected()[0];
    if (selectedNode.children.length > 0) {
      this.alertAction({
        type: 'warning',
        isShow: true,
        msg: '하위 요소가 존재하는 요소는 삭제가 불가능합니다.',
      }).then(() => {});
      return;
    }

    if (
      !this.findAdjacentPage(selectedNode.prev(), 'prev') &&
      !this.findAdjacentPage(selectedNode.next(), 'next') &&
      selectedNode.parent !== null
    ) {
      if (selectedNode.parent.states.path !== undefined) {
        selectedNode.parent.select(true);
      } else if (!this.findAdjacentPage(selectedNode.parent.prev(), 'prev')) {
        this.findAdjacentPage(selectedNode.parent.next(), 'next');
      }
    }
    // TODO 화면에 띄울 페이지가 더 이상 없을 때의 처리 필요
    selectedNode.remove();
    this.$router.push({
      name: 'editDoc',
      params: {
        productCode: this.$route.params.productCode,
        pageType: this.$route.params.pageType,
        branchName: this.$route.params.branchName,
        pageTitle: this.$refs.tree.selected()[0].text,
        pageId: this.$refs.tree.selected()[0].states.path,
      },
    });
  }

  findAdjacentPage(node, prevOrNext) {
    if (node === null) {
      return false;
    }
    if (node.states.path !== undefined) {
      node.select(true);
      return true;
    } else if (node.children.length > 0) {
      let findNode: boolean | undefined = false;
      node.children.forEach((childNode) => {
        if (!findNode) {
          findNode = this.findAdjacentPage(childNode, prevOrNext);
        }
      });
      return findNode;
    } else {
      prevOrNext === 'prev'
        ? this.findAdjacentPage(node.prev(), prevOrNext)
        : this.findAdjacentPage(node.next(), prevOrNext);
    }
  }

  // 새페이지 생성
  createPageModalConfirm(clickConfirmBtn) {
    const createPageData = this.$refs.createPageModal.getData();

    if (clickConfirmBtn) {
      if (createPageData[0] === '') {
        this.alertAction({
          type: 'warning',
          isShow: true,
          msg: '문서 제목을 입력해주세요.',
        }).then(() => {});
        return;
      }
      // 기존 페이지 사용
      if (createPageData.length === 2 && createPageData[1] === '') {
        this.alertAction({
          type: 'warning',
          isShow: true,
          msg: '사용할 기존 페이지를 선택해주세요.',
        }).then(() => {});
        return;
      } else if (createPageData.length === 3 && createPageData[2] === '') {
        // 신규 페이지 생성
        this.alertAction({
          type: 'warning',
          isShow: true,
          msg: '새로 생성할 페이지의 이름을 입력해주세요.',
        }).then(() => {});
        return;
      }
      const appendNode = this.$refs.tree.append(this.$refs.tree.selected()[0], {
        text: createPageData[0],
      });
      // 기존 페이지 사용
      this.setEditingPageTitle(createPageData[0]);
      if (createPageData.length === 2) {
        // appendNode.states.path = createPageData[1];
        this.$refs.tree.selected()[0].unselect();
        appendNode.select(true);
        this.setEditingFilePath();
        this.setEditingViewerText();
        if (
          this.$store.state.repository.editingFilePath !== createPageData[1]
        ) {
          this.getFileContentAction({
            productCode: this.$route.params.productCode,
            filePath: createPageData[1],
            ref: this.$route.params.branchName,
          });
          this.setEditingFilePath(createPageData[1]);
        }
        // this.$router.push({
        //   name: 'editDoc',
        //   params: {
        //     productCode: this.$route.params.productCode,
        //     pageType: this.$route.params.pageType,
        //     branchName: this.$route.params.branchName,
        //     pageTitle: appendNode.text,
        //     pageId: appendNode.states.path,
        //   },
        // });
        this.setEditStatus('create');
        this.$modal.hide(this.createPageModalName);
      } else {
        // 신규 페이지 생성
        this.$refs.tree.selected()[0].unselect();
        appendNode.select(true);

        this.setEditingFilePath(
          createPageData[1] !== ''
            ? createPageData[1] + '/' + createPageData[2]
            : createPageData[2]
        );

        this.setEditingViewerText('');

        this.setEditStatus('create');
        this.$modal.hide(this.createPageModalName);
        // appendNode.states.path =
        //   createPageData[1] !== ''
        //     ? createPageData[1] + '/' + createPageData[2]
        //     : createPageData[2];
        // this.createCommitAction({
        //   productCode: this.$store.state.product.product.productCode,
        //   branchName: this.$store.state.repository.currentRef,
        //   commitMessage: 'create new md File',
        //   actions: [
        //     {
        //       action: 'create',
        //       file_path: appendNode.states.path,
        //       content: '',
        //     },
        //   ],
        //   gitlabToken: this.$store.state.user.user.gitlabToken,
        // }).then((res) => {
        //   this.$refs.tree.selected()[0].unselect();
        //   appendNode.select(true);
        //   this.$router.push({
        //     name: 'editDoc',
        //     params: {
        //       productCode: this.$route.params.productCode,
        //       pageType: this.$route.params.pageType,
        //       branchName: this.$route.params.branchName,
        //       pageTitle: appendNode.text,
        //       pageId: appendNode.states.path,
        //     },
        //   });
        //   this.$modal.hide(this.createPageModalName);
        // });
      }
    } else {
      this.$modal.hide(this.createPageModalName);
    }
  }

  editInfoModalConfirm(clickConfirmBtn) {
    const editInfoData = this.$refs.editInfoModal.getData();
    if (clickConfirmBtn) {
      if (editInfoData[0] === '') {
        this.alertAction({
          type: 'warning',
          isShow: true,
          msg: '문서 제목을 입력해주세요.',
        }).then(() => {});
        return;
      }
      // 기존 페이지 사용
      if (editInfoData.length === 2 && editInfoData[1] === '') {
        this.alertAction({
          type: 'warning',
          isShow: true,
          msg: '사용할 기존 페이지를 선택해주세요.',
        }).then(() => {});
        return;
      } else if (editInfoData.length === 3 && editInfoData[2] === '') {
        // 신규 페이지 생성
        this.alertAction({
          type: 'warning',
          isShow: true,
          msg: '새로 생성할 페이지의 이름을 입력해주세요.',
        }).then(() => {});
        return;
      }

      // const selectedNode = this.$refs.tree.selected()[0];
      // selectedNode.text = editInfoData[0];
      this.setEditingPageTitle(editInfoData[0]);
      // 기존페이지 사용
      if (editInfoData.length === 2) {
        // selectedNode.states.path = editInfoData[1];
        if (this.$store.state.repository.editingFilePath !== editInfoData[1]) {
          this.getFileContentAction({
            productCode: this.$route.params.productCode,
            filePath: editInfoData[1],
            ref: this.$route.params.branchName,
          });
          this.setEditingFilePath(editInfoData[1]);
        }
        // this.$router.push({
        //   name: 'editDoc',
        //   params: {
        //     productCode: this.$route.params.productCode,
        //     pageType: this.$route.params.pageType,
        //     branchName: this.$route.params.branchName,
        //     pageTitle: selectedNode.text,
        //     pageId: selectedNode.states.path,
        //   },
        // });
        this.setEditStatus('update');
        this.$modal.hide(this.editInfoModalName);
      } else {
        // 새 페이지 생성
        // selectedNode.states.path =
        //   editInfoData[1] !== ''
        //     ? editInfoData[1] + '/' + editInfoData[2]
        //     : editInfoData[2];
        this.setEditingFilePath(
          editInfoData[1] !== ''
            ? editInfoData[1] + '/' + editInfoData[2]
            : editInfoData[2]
        );

        this.setEditingViewerText('');
        this.setEditStatus('update');

        this.$modal.hide(this.editInfoModalName);

        // this.createCommitAction({
        //   productCode: this.$store.state.product.product.productCode,
        //   branchName: this.$store.state.repository.currentRef,
        //   commitMessage: 'create new md File',
        //   actions: [
        //     {
        //       action: 'create',
        //       file_path: selectedNode.states.path,
        //       content: '',
        //     },
        //   ],
        //   gitlabToken: this.$store.state.user.user.gitlabToken,
        // }).then((res) => {
        //   this.$router.push({
        //     name: 'editDoc',
        //     params: {
        //       productCode: this.$route.params.productCode,
        //       pageType: this.$route.params.pageType,
        //       branchName: this.$route.params.branchName,
        //       pageTitle: selectedNode.text,
        //       pageId: selectedNode.states.path,
        //     },
        //   });
        //   this.$modal.hide(this.editInfoModalName);
        // });
      }
    } else {
      this.$modal.hide(this.editInfoModalName);
    }
  }

  gitFolderSearchModalConfirm(clickConfirmBtn) {
    const folderPath = this.$refs.gitFolderSearchModal.getData();
    if (clickConfirmBtn && folderPath === undefined) {
      this.alertAction({
        type: 'warning',
        isShow: true,
        msg: '폴더를 선택해주세요.',
      }).then(() => {});
      return;
    }
    if (clickConfirmBtn) {
      this.$refs.createPageModal !== undefined
        ? this.$refs.createPageModal.setFolderPath(folderPath.states.path)
        : this.$refs.editInfoModal.setFolderPath(folderPath.states.path);
    }
    this.$modal.hide(this.gitFolderSearchModalName);
  }

  gitPageSearchModalConfirm(clickConfirmBtn) {
    const filePath = this.$refs.gitPageSearchModal.getData();
    if (clickConfirmBtn && filePath === '') {
      this.alertAction({
        type: 'warning',
        isShow: true,
        msg: '파일을 선택해주세요.',
      }).then(() => {});
      return;
    }
    if (clickConfirmBtn) {
      this.$refs.createPageModal !== undefined
        ? this.$refs.createPageModal.setFilePath(filePath)
        : this.$refs.editInfoModal.setFilePath(filePath);
    }
    this.$modal.hide(this.gitPageSearchModalName);
  }

  @Watch('$route.params.pageType')
  onChangePageType(value) {
    this.getIndexMdFileAction({
      productCode: this.$route.params.productCode,
      pageType: value,
      ref: this.$route.params.branchName,
      refType: 'branch',
      gitlabToken: this.$store.state.user.user.gitlabToken,
    }).then((res) => {
      const treeData = this.$store.state.repository.treeData.slice();
      const editingMenuTree = [
        {
          title: this.$store.state.product.product.productName,
          option: {
            expanded: true,
            selected: false,
            path: undefined,
          },
          type: 'folder',
          children: treeData,
        },
      ];
      if (editingMenuTree.length > 0) {
        editingMenuTree.forEach((data) => {
          expandAll(data);
        });
      }
      this.setEditingMenuTree(editingMenuTree);
      // 데이터 재설정
      this.$refs.tree.tree.setModel(
        this.$store.state.repository.editingMenuTree
      );
    });
  }
}
</script>

<style scoped></style>
