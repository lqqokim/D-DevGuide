<template>
  <div class="left-menu">
    <p class="tit-con-left">
      <strong v-if="$store.state.product.product">{{
        $store.state.product.product.productName
      }}</strong>
    </p>
    <div class="branch-name">
      <p class="dbs-icon-button ico-left ico-contents branch ellipsis">
        {{ $route.params.branchName }}
      </p>
      <nuxt-link
        :to="{
          name: 'branchManagement',
          params: { productCode: $route.params.productCode },
        }"
        tag="i"
        class="ico-setting"
        @click.native="moveToBranchManage"
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
        v-show="
          $store.state.product.product !== undefined &&
            $store.state.product.product.apiUse
        "
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
    </div>
    <div class="menu-tree">
      <tree
        v-if="editingMenuTreeData.length > 0"
        ref="tree"
        :data="editingMenuTreeData"
        :options="treeOptions"
        @node:dragging:start="dragStart"
        @node:dragging:finish="dragFinish"
        @node:clicked="clickTree"
        @node:editing:stop="editingStop"
        @tree:mounted="treeMounted"
      >
        <div slot-scope="{ node }" class="node-container">
          {{ node.text }}
        </div>
      </tree>
    </div>

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
        v-if="$store.state.product.product"
        slot="modalContent"
        ref="gitFolderSearchModal"
        :doc-path-flag="true"
        :project-id="$store.state.product.product.projectId"
        :current-ref="$store.state.repository.currentRef"
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
        :doc-path-flag="true"
        :current-ref="$store.state.repository.currentRef"
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
import * as product from '@/store/modules/product.ts';
import EventBus from '@/store/modules/repository.ts';
import { IAlert } from '@/store/modules/common';

const Repository = namespace('repository');
const Commit = namespace('commit');
const Branch = namespace('branch');
const Product = namespace('product');
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
  @Product.Action('selectProduct') selectProductAction;
  @Common.Action('alert') alertAction!: (payload: IAlert) => Promise<any>;

  $refs!: {
    tree: any;
    gitFolderSearchModal: any;
    createPageModal: any;
    gitPageSearchModal: any;
    editInfoModal: any;
  };
  $modal!: any;

  editingMenuTreeData: Array<any> = [];

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

  // 트리 클릭 시
  clickTree(node) {
    if (node.states.path) {
      // page 일 경우
      if (
        this.$store.state.repository.editStatus === 'update' ||
        this.$store.state.repository.editStatus === 'create'
      ) {
        // 문서 관련 수정 중인 내용이 있을 때 commit 여부를 물어봄
        EventBus.$emit('commitFiles', node.text, node.states.path);
      } else if (
        this.$store.state.repository.editingMenuTreeToJson.length === 1
      ) {
        // 트리 수정 내용이 있을 때 commit 여부를 물어봄
        EventBus.$emit('commitFiles', node.text, node.states.path, true);
      } else {
        // 트리, 문서 관련 수정 내용이 없을 때
        const routerName = node.states.path.includes('.md')
          ? 'editDoc'
          : 'editSampleDoc';
        this.$router.push({
          name: routerName,
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

  // git 마크다운 경로 수정 시
  @Watch('$store.state.repository.editingFilePath')
  async changeFilePath() {
    if (
      this.$store.state.repository.editStatus !== 'cancel' &&
      this.$store.state.repository.editStatus !== 'init' &&
      this.$store.state.repository.editStatus !== 'create'
    ) {
      // 트리, 문서에 수정 내역을 넣어주고 status 를 update 로 바꿈
      const selectedNode = this.$refs.tree.selected()[0];
      selectedNode.states.path = this.$store.state.repository.editingFilePath;
      await this.setEditingMenuTreeToJson(this.$refs.tree.toJSON());
      await this.setEditStatus('update');
      // } else if (this.$store.state.repository.editStatus === 'init') {
      //   // 현재 status 가 init 일 때
      //   await this.setEditStatus('init');
    }
  }

  // 문서명 수정 시
  @Watch('$store.state.repository.editingPageTitle')
  changePageTitle() {
    if (
      this.$store.state.repository.editStatus !== 'cancel' &&
      this.$store.state.repository.editStatus !== 'init' &&
      this.$store.state.repository.editStatus !== 'create'
    ) {
      // 트리, 문서에 수정 내역을 넣어주고 status 를 update 로 바꿈
      const selectedNode = this.$refs.tree.selected()[0];
      selectedNode.text = this.$store.state.repository.editingPageTitle;
      this.setEditingMenuTreeToJson(this.$refs.tree.toJSON());
      this.setEditStatus('update');
    }
  }

  // status 변경 시
  @Watch('$store.state.repository.editStatus')
  changeEditStatus(value) {
    // 취소 버튼 클릭 시 원래내용대로 돌림
    if (value === 'cancel') {
      // this.selectedNode = this.$refs.tree.selected()[0];
      this.$refs.tree.tree
        .setModel(this.$store.state.repository.editingMenuTree)
        .then(() => {
          const selectNode = this.$refs.tree.find({
            text: this.selectedNode.text,
            state: { path: this.selectedNode.states.path },
          });
          if (selectNode.length > 0) {
            this.$refs.tree.selected()[0].unselect();
            selectNode.select();
            this.selectedNode = selectNode[0];
          }

          this.setEditStatus('init');
          return true;
        });
    }
  }

  // 페이지를 벗어나면 커밋되지 않은 수정 내용 초기화
  beforeDestroy() {
    this.setInitialization();
  }

  // 톱니바퀴 아이콘을 클릭하여 브랜치관리 페이지로 이동 시 EditingMenu 컴포넌트 강제 삭제
  moveToBranchManage() {
    this.$destroy();
  }

  async created() {
    if (!this.$store.state.user.user.gitlabToken) {
      return;
    }

    try {
      await this.selectProductAction({
        productCode: this.$route.params.productCode,
      });

      // treeData 가 없거나 문서 수정 초기 화면으로 들어왔을 경우 index.md 파일 로드
      if (
        this.$store.state.repository.treeData === undefined ||
        this.$store.state.repository.treeData.length === 0 ||
        (this.$route.params.branchName !== undefined &&
          this.$route.params.pageId === undefined)
      ) {
        await this.getIndexMdFileAction({
          productCode: this.$route.params.productCode,
          pageType: this.$route.params.pageType,
          ref: this.$route.params.branchName,
          refType: 'branch',
          filePath: this.$route.params.pageId,
          pageTitle: this.$route.params.pageTitle,
          gitlabToken: this.$store.state.user.user.gitlabToken,
        });
      }

      // 문서 수정 초기 화면이 아닐 때 선택한 문서 정보 로드
      if (this.$route.params.pageId !== undefined) {
        const pageId =
          this.$route.name === 'editDoc'
            ? this.$route.params.pageId + '.md'
            : this.$route.params.pageId + '.html';
        await this.getRepositoryFileAction({
          productCode: this.$route.params.productCode,
          ref: this.$route.params.branchName,
          refType: 'branch',
          filePath: pageId,
          pageTitle: this.$route.params.pageTitle,
        });
      }
      // EditingMenuTree 의 내용은 제일 상단에 프로젝트 이름을 넣어야하므로 아래 함수 실행
      await this.makeEditingMenuTree();
    } catch (e) {
      console.error(e);
    }
  }

  // 트리가 그려지고 난 후 실행되는 이벤트
  treeMounted() {
    // 트리에 프로젝트 이름만 존재하게 되면 selected 된 node 가 없기 때문에 프로젝트 이름에 포커싱
    if (this.$refs.tree.selected()[0] === undefined) {
      this.$refs.tree.tree.model[0].select();
    }
    this.selectedNode = this.$refs.tree.selected()[0];
  }

  // 메뉴 트리 순서 변경 start
  dragStart(targetNode): void {
    if (targetNode.id !== this.selectedNode.id) {
      // 순서를 바꾸려는 node 가 현재 선택된 node 와 다를 때 현재 선택된 node 에 다시 포커스를 줌
      targetNode.unselect();
      this.selectedNode.select();
    } else {
      // 순서를 바꾸려는 node 가 현재 선택된 node 와 같을 때
      targetNode.select();
      this.selectedNode = targetNode;
    }
  }

  // 메뉴 트리 순서 변경 end
  dragFinish(targetNode): void {
    if (targetNode.id !== this.selectedNode.id) {
      // 순서를 바꾸려는 node 가 현재 선택된 node 와 다를 때 현재 선택된 node 에 다시 포커스를 줌
      targetNode.unselect();
      this.selectedNode.select();
    } else {
      // 순서를 바꾸려는 node 가 현재 선택된 node 와 같을 때
      targetNode.select();
      this.selectedNode = targetNode;
    }
    // 메뉴 트리의 순서가 변경되었기 때문에 status 를 update 로 변경, 수정된 메뉴 트리 내용을 담아줌
    this.setEditStatus('update');
    this.setEditingMenuTreeToJson(this.$refs.tree.toJSON());
  }

  // 새 폴더 만들기
  editingStop(node) {
    if (node.text !== '') {
      // 메뉴 트리에 폴더가 생성되었기 떄문에 status 를 update 로 변경, 수정된 메뉴 트리 내용을 담아줌
      this.setEditStatus('update');
      this.setEditingMenuTreeToJson(this.$refs.tree.toJSON());
    } else {
      // 폴더 명에 입력한 내용이 없을 경우 삭제
      node.remove();
    }
  }

  // 새페이지 버튼 클릭
  openGitPageSearchModal() {
    if (
      this.$store.state.repository.editStatus === 'create' ||
      this.$store.state.repository.editStatus === 'update'
    ) {
      // 문서 관련 수정 중인 내용이 있을 때 commit 여부를 물어봄
      EventBus.$emit(
        'commitFiles',
        this.$store.state.repository.editingPageTitle,
        this.$store.state.repository.editingFilePath
      );
    } else if (
      this.$store.state.repository.editingMenuTreeToJson.length === 1
    ) {
      // 트리 수정 내용이 있을 때 commit 여부를 물어봄
      EventBus.$emit(
        'commitFiles',
        this.$store.state.repository.editingPageTitle,
        this.$store.state.repository.editingFilePath,
        true
      );
    } else {
      // 트리, 문서 관련 수정 내용이 없을 때 새 페이지 다이얼로그 출력
      this.dialogType = 'createPage';
      this.$modal.show(this.createPageModalName);
    }
  }

  // 새폴더 버튼 클릭
  createFolder() {
    if (
      this.$store.state.repository.editStatus === 'create' ||
      this.$store.state.repository.editStatus === 'update'
    ) {
      // 문서 관련 수정 중인 내용이 있을 때 commit 여부를 물어봄
      EventBus.$emit(
        'commitFiles',
        this.$store.state.repository.editingPageTitle,
        this.$store.state.repository.editingFilePath
      );
    } else if (
      this.$store.state.repository.editingMenuTreeToJson.length === 1
    ) {
      // 트리 수정 내용이 있을 때 commit 여부를 물어봄
      EventBus.$emit(
        'commitFiles',
        this.$store.state.repository.editingPageTitle,
        this.$store.state.repository.editingFilePath,
        true
      );
    } else {
      // 트리, 문서 관련 수정 내용이 없을 때
      const appendNode = this.$refs.tree.append(this.$refs.tree.selected()[0], {
        text: '',
      });
      appendNode.startEditing(); // 수정모드
    }
  }

  // 삭제 버튼 클릭
  removeNode() {
    if (!this.$refs.tree.selected()[0]) {
      this.alertAction({
        type: 'warning',
        isShow: true,
        msg: '삭제할 요소를 선택해주세요.',
      }).then(() => {});
    } else {
      this.alertAction({
        type: 'question',
        isShow: true,
        msg: '선택하신 요소를 삭제하시겠습니까?',
      }).then((res) => {
        if (res.ok) {
          const selectedNode = this.$refs.tree.selected()[0];

          // 최상단에 있는 프로젝트 이름은 삭제 불가능
          if (
            selectedNode.parent === null &&
            selectedNode.text === this.$store.state.product.product.productName
          ) {
            this.alertAction({
              type: 'warning',
              isShow: true,
              msg: '프로젝트 이름은 삭제가 불가능합니다.',
            }).then(() => {});
            return;
          }

          // 하위 요소가 있는 node 는 삭제 불가능
          if (selectedNode.children.length > 0) {
            this.alertAction({
              type: 'warning',
              isShow: true,
              msg: '하위 요소가 존재하는 요소는 삭제가 불가능합니다.',
            }).then(() => {});
            return;
          }

          // 삭제 후 가장 가까운 페이지가 있는 node 로 포커스 이동
          if (
            !this.findAdjacentPage(selectedNode.prev(), 'prev') &&
            !this.findAdjacentPage(selectedNode.next(), 'next') &&
            selectedNode.parent !== null
          ) {
            if (selectedNode.parent.states.path !== undefined) {
              selectedNode.parent.select(true);
            } else if (
              !this.findAdjacentPage(selectedNode.parent.prev(), 'prev')
            ) {
              this.findAdjacentPage(selectedNode.parent.next(), 'next');
            }
          }
          selectedNode.remove();
          this.setEditingMenuTreeToJson(this.$refs.tree.toJSON());
          this.setEditStatus('update');
          if (this.$refs.tree.selected()[0] === undefined) {
            this.setInitialization();
            this.$refs.tree.tree.model[0].select();
          } else {
            const routerName = this.$refs.tree
              .selected()[0]
              .states.path.includes('.md')
              ? 'editDoc'
              : 'editSampleDoc';
            this.$router.push({
              name: routerName,
              params: {
                productCode: this.$route.params.productCode,
                pageType: this.$route.params.pageType,
                branchName: this.$route.params.branchName,
                pageTitle: this.$refs.tree.selected()[0].text,
                pageId: this.$refs.tree.selected()[0].states.path,
              },
            });
          }
        }
      });
    }
  }

  // node 삭제 후 가장 근접한 페이지 node 에 포커스 이동
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

  // 새페이지 생성 다이얼로그에서 확인 버튼 클릭 시
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
        this.$refs.tree.selected()[0].unselect();
        appendNode.select(true);
        this.setEditingViewerText();

        try {
          // 현재 수정중인 파일의 path 와 새로 선택한 파일의 path 가 다를 경우 파일 정보를 불러옴
          if (
            this.$store.state.repository.editingFilePath !== createPageData[1]
          ) {
            this.getFileContentAction({
              productCode: this.$route.params.productCode,
              filePath: createPageData[1],
              ref: this.$route.params.branchName,
            });
          }
          this.setEditingFilePath(createPageData[1]);
          appendNode.states.path = createPageData[1];
          appendNode.states.type = 'blob';
          this.setEditStatus('update');
        } catch (e) {
          console.error(e);
        }
        this.$modal.hide(this.createPageModalName);
      } else {
        // 신규 페이지 생성
        this.$refs.tree.selected()[0].unselect();
        appendNode.select(true);

        // Document Section 일 경우 manualDocPath 를 앞에 붙여주고 API Section 일 경우 APIDocPath 를 앞에 붙여줌
        let prefixFilePath =
          this.$route.params.pageType === 'Document'
            ? this.$store.state.product.product.manualDocPath
            : this.$store.state.product.product.APIDocPath;

        // 기본 경로가 없을 경우를 제외하고는 경로 뒤에 '/' 를 붙여주어야 함
        prefixFilePath =
          prefixFilePath !== '' ? prefixFilePath + '/' : prefixFilePath;

        // 경로를 직접 입력하였을 경우에는 createPageData[1] 과 createPageData[2] 를 붙여줌
        // 경로 입력을 하지 않았을 경우에는 앞에서 만들어놓은 prefixFilePath 와 createPageData[2] 를 붙여줌
        let filePath =
          createPageData[1] !== ''
            ? createPageData[1] + '/' + createPageData[2]
            : prefixFilePath + createPageData[2];

        // // 파일명에 .md 안붙였을 경우
        // filePath = filePath.slice(-3) !== '.md' ? filePath + '.md' : filePath;

        // 경로 앞에 '/'가 있으면 gitlab 에 있는 파일을 불러오지 못 함
        filePath = filePath.indexOf('/') === 0 ? filePath.slice(1) : filePath;

        this.setEditingFilePath(filePath);

        this.setEditingViewerText('');

        appendNode.states.path = filePath;
        appendNode.states.type = 'blob';
        this.setEditStatus('create');
        this.$modal.hide(this.createPageModalName);
      }

      this.setEditingMenuTreeToJson(this.$refs.tree.toJSON());
    } else {
      this.$modal.hide(this.createPageModalName);
    }
  }

  // 문서명 및 git 마크다운 경로 수정 다이얼로그에서 확인 클릭 시
  async editInfoModalConfirm(clickConfirmBtn) {
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

      // this.setEditingPageTitle(editInfoData[0]);
      // 기존페이지 사용
      if (editInfoData.length === 2) {
        try {
          if (
            this.$store.state.repository.editingFilePath !== editInfoData[1]
          ) {
            await this.getFileContentAction({
              productCode: this.$route.params.productCode,
              filePath: editInfoData[1],
              ref: this.$route.params.branchName,
            });
            this.setEditingPageTitle(editInfoData[0]);

            this.setEditingFilePath(editInfoData[1]);
          } else {
            this.setEditingPageTitle(editInfoData[0]);
          }

          this.setEditStatus('update');
        } catch (e) {
          console.error(e);
        }
        this.$modal.hide(this.editInfoModalName);
      } else {
        this.setEditingPageTitle(editInfoData[0]);
        // 새 페이지 생성
        let prefixFilePath =
          this.$route.params.pageType === 'Document'
            ? this.$store.state.product.product.manualDocPath
            : this.$store.state.product.product.APIDocPath;

        prefixFilePath =
          prefixFilePath !== '' ? prefixFilePath + '/' : prefixFilePath;

        let filePath =
          editInfoData[1] !== ''
            ? editInfoData[1] + '/' + editInfoData[2]
            : prefixFilePath + editInfoData[2];

        // // 파일명에 .md 안붙였을 경우
        // filePath = filePath.slice(-3) !== '.md' ? filePath + '.md' : filePath;

        // 경로 앞에 '/'가 있으면 gitlab 에 있는 파일을 불러오지 못 함
        filePath = filePath.indexOf('/') === 0 ? filePath.slice(1) : filePath;

        this.setEditingFilePath(filePath);

        this.setEditingViewerText('');
        this.setEditStatus('create');

        this.$modal.hide(this.editInfoModalName);
      }
    } else {
      this.$modal.hide(this.editInfoModalName);
    }
  }

  // git 폴더 선택 다이얼로그에서 확인 버튼 클릭 시
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

  // git 파일 선택 다이얼로그에서 확인 버튼 클릭 시
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

  // pageType 변경 시
  @Watch('$route.params.pageType')
  onChangePageType(value) {
    if (
      value === undefined ||
      this.$route.name === 'detail' ||
      this.$route.name === 'branchDocViewInit'
    ) {
      return;
    }
    this.setInitialization();
    this.getIndexMdFileAction({
      productCode: this.$route.params.productCode,
      pageType: value,
      ref: this.$route.params.branchName,
      refType: 'branch',
      gitlabToken: this.$store.state.user.user.gitlabToken,
    }).then((res) => {
      this.makeEditingMenuTree().then(() => {
        // 데이터 재설정
        this.$refs.tree.tree.setModel(
          this.$store.state.repository.editingMenuTree
        );

        if (this.$refs.tree.selected()[0] === undefined) {
          this.$refs.tree.tree.model[0].select();
        }
        this.selectedNode = this.$refs.tree.selected()[0];
      });
    });
  }

  // 현재 작성중인 branch 문서 페이지에서 문서 수정 페이지로 들어왔을 때
  @Watch('$route.name')
  onChangeRouteName(value, oldValue) {
    if (
      (oldValue === 'branchDocViewInit' || oldValue === 'branchDocView') &&
      value === 'editDoc'
    ) {
      this.makeEditingMenuTree().then(() => {
        // 데이터 재설정
        this.$refs.tree.tree.setModel(
          this.$store.state.repository.editingMenuTree
        );
      });
    }
  }

  // EditingMenuTree 는 최상단에 프로젝트 이름을 추가해야 함
  async makeEditingMenuTree() {
    await this.selectProductAction({
      productCode: this.$route.params.productCode,
    });
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

    // 전체 node 펼치기
    if (editingMenuTree.length > 0) {
      editingMenuTree.forEach((data) => {
        expandAll(data);
      });
    }
    this.editingMenuTreeData = editingMenuTree;
    await this.setEditingMenuTree(editingMenuTree);
  }

  // 뒤로가기, 앞으로가기 했을 때 좌측 메뉴 트리 포커스 문제 때문에 추가한 코드
  @Watch('$route.params.pageTitle')
  onChangePageTitle() {
    if (
      this.$route.name !== 'editDoc' &&
      this.$route.name !== 'editSampleDoc'
    ) {
      return;
    }
    if (
      this.$refs.tree.selected()[0].text !== this.$route.params.pageTitle ||
      (this.$route.name === 'editDoc' &&
        this.$refs.tree.selected()[0].states.path !==
          this.$route.params.pageId + '.md') ||
      (this.$route.name === 'editSampleDoc' &&
        this.$refs.tree.selected()[0].states.path !==
          this.$route.params.pageId + '.html')
    ) {
      this.$refs.tree.selected()[0].unselect();

      const findPath =
        this.$route.name === 'editDoc'
          ? this.$route.params.pageId + '.md'
          : this.$route.params.pageId + '.html';

      const selectNode = this.$refs.tree.find({
        text: this.$route.params.pageTitle,
        state: { path: findPath },
      });

      selectNode.select();
      this.selectedNode = selectNode[0];
    }
  }
}
</script>

<style scoped></style>
