/* eslint-disable */
import { ActionTree, MutationTree, GetterTree, ActionContext } from 'vuex';
import { RootState } from '@/store';

import Vue from 'vue';
const EventBus = new Vue();
export default EventBus;

interface RepositoryState {
  repository: Repository;
  treeData: Repository[];
  viewerText: string;
  editingViewerText: string;
  pageTitle: string;
  editingPageTitle: string;
  filePath: string;
  editingFilePath: string;
  currentRef: string;
  refType: string;
  tocArray: Array<any>;
  repositoryData: Array<any>;
  repositoryDocPathData: Array<any>;
  fileNameList: Array<string>;
  fileSize: number;
  editStatus: string;
  editingMenuTree: Array<any>;
  editingMenuTreeToJson: Array<any>;
}

export interface Repository {
  id: string;
  name: string;
  type: string;
  path: string;
  option: Object;
  children: Array<Repository>;
}

interface Response {
  config: object;
  data: any;
  headers: object;
  request: XMLHttpRequest;
  status: number;
  statusText: string;
}

export const state = (): RepositoryState => ({
  repository: {
    id: '',
    name: '',
    type: '',
    path: '',
    option: {},
    children: [],
  },
  treeData: [],
  viewerText: '',
  editingViewerText: '',
  pageTitle: '',
  editingPageTitle: '',
  filePath: '',
  editingFilePath: '',
  currentRef: 'master',
  refType: 'targetBranch',
  tocArray: [],
  repositoryData: [],
  repositoryDocPathData: [],
  fileNameList: [],
  fileSize: 0,
  editStatus: 'init',
  editingMenuTree: [],
  editingMenuTreeToJson: [],
});

export const namespaced: boolean = true;

export const getters: GetterTree<RepositoryState, RootState> = {};

export const mutations: MutationTree<RepositoryState> = {
  setTreeData(state, payload: []) {
    state.treeData = payload;
  },
  setEmptyTreeData(state) {
    state.treeData = [];
  },
  setViewerText(state, payload: string) {
    state.viewerText = payload;
  },
  setEditingViewerText(state, payload: string) {
    state.editingViewerText = payload;
  },
  setPageTitle(state, payLoad: string) {
    state.pageTitle = payLoad;
  },
  setEditingPageTitle(state, payLoad: string) {
    state.editingPageTitle = payLoad;
  },
  setFilePath(state, payLoad: string) {
    state.filePath = payLoad;
  },
  setEditingFilePath(state, payLoad: string) {
    state.editingFilePath = payLoad;
  },
  setCurrentRef(state, payLoad: Array<any>) {
    state.currentRef = payLoad[0];
    state.refType = payLoad[1];
  },
  setTocArray(state, payLoad: Array<any>) {
    state.tocArray = payLoad;
  },
  setRepositoryData(state, payLoad: Array<any>) {
    state.repositoryData = payLoad;
  },
  setRepositoryDocPathData(state, payLoad: Array<any>) {
    state.repositoryDocPathData = payLoad;
  },
  setFileNameList(state, payLoad: Array<string>) {
    state.fileNameList = payLoad;
  },
  setFileSize(state, payload: number) {
    state.fileSize = payload;
  },
  setEditStatus(state, payload: string) {
    state.editStatus = payload;
  },
  setEditingMenuTree(state, payload: Array<any>) {
    state.editingMenuTree = payload;
  },
  setEditingMenuTreeToJson(state, payload: Array<any>) {
    state.editingMenuTreeToJson = payload;
  },
  setInitialization(state, payload: any) {
    state.treeData = [];
    state.editingViewerText = '';
    state.editingMenuTree = [];
    state.editingPageTitle = '';
    state.editingFilePath = '';
    state.editingMenuTreeToJson = [];
    state.editStatus = 'none';
  },
};

export const actions: ActionTree<RepositoryState, RootState> = {
  async getIndexMdFile(
    { commit, state, dispatch },
    payload: {
      productCode: string;
      pageType: string;
      ref: string;
      refType: string;
      filePath: string;
      pageTitle: string;
    }
  ): Promise<any> {
    try {
      const productData: Response = await this.$axios.get(
        'api/docs/product/getProjectId',
        {
          params: {
            productCode: payload.productCode,
          },
        }
      );
      // path 에서 앞에 '/' 가 있으면 404 에러가 뜸
      let path =
        payload.pageType === undefined || payload.pageType === 'Document'
          ? productData.data.manualDocPath
          : productData.data.APIDocPath;
      if (path !== undefined && path.indexOf('/') === 0) {
        path = path.slice(1);
      }

      const fileData: Response = await this.$axios.get(
        'api/docs/repository/getRepositoryFileData',
        {
          params: {
            projectId: productData.data.projectId,
            filePath: path !== '' ? path + '/index.md' : 'index.md',
            ref: payload.ref,
          },
        }
      );

      const mdDatas = fileData.data.split(/\r\n|\n|\r/);

      const pageRegexp = /^([ ]*)- \[([^]+)\]\(([^)]+)\)\s*$/;
      const folderRegexp = /^([ ]*)- (.+)/;
      const spaceRegexp = /\s$/gi;
      //
      const treeData: Array<any> = [];
      let obj: object = {};

      mdDatas.forEach((mdData, mdIdx) => {
        if (spaceRegexp.exec(mdData) === null && mdData !== '') {
          const pageRegStr = pageRegexp.exec(mdData);
          const folderRegStr = folderRegexp.exec(mdData);
          let parentObj: object = {};
          if (pageRegStr !== null) {
            parentObj = appendChild(
              pageRegStr[1].length,
              obj,
              {
                title: pageRegStr[2],
                // path: pageRegStr[3],
                option: {
                  expanded: false,
                  path: pageRegStr[3],
                  selected: false,
                },
                type: 'page',
              },
              treeData
            );
          } else if (folderRegStr !== null) {
            parentObj = appendChild(
              folderRegStr[1].length,
              obj,
              {
                title: folderRegStr[2],
                option: {
                  expanded: false,
                  path: undefined,
                  selected: false,
                },
                // open: false,
                type: 'folder',
              },
              treeData
            );
          }
          obj = parentObj !== undefined ? parentObj : obj;
        }
        if (mdIdx === mdDatas.length - 1) treeData.push(obj);
      });
      if (payload.filePath === undefined) {
        const firstPage: any = findFirstPage(treeData[0]);
        await dispatch('getRepositoryFile', {
          productCode: payload.productCode,
          filePath: firstPage.option.path,
          ref: payload.ref,
          refType: payload.refType,
          pageTitle: firstPage.title,
        });
      }
      commit('setTreeData', treeData);
    } catch (err) {
      console.error(err.response.status);
    }
  },

  // async createFile({ commit, state, dispatch }): Promise<any> {
  //   try {
  //     await this.$axios.post('api/docs/repository/createFile');
  //   } catch (err) {
  //     console.error(err);
  //   }
  // },

  async getRepository(
    { commit, state, dispatch },
    payload: {
      productCode: string;
      filePath: string;
      ref: string;
      useDocPath: boolean;
    }
  ): Promise<any> {
    try {
      const productData: Response = await this.$axios.get(
        'api/docs/product/getProjectId',
        {
          params: {
            productCode: payload.productCode,
          },
        }
      );

      let repositoryPath = payload.useDocPath
        ? productData.data.manualDocPath
        : '';

      // path 에서 앞에 '/' 가 있으면 404 에러가 뜸
      if (repositoryPath !== '' && repositoryPath.indexOf('/') === 0) {
        repositoryPath = repositoryPath.slice(1);
      }

      const repositoryTree: Response = await this.$axios.get(
        'api/docs/repository/getRepositoryTree',
        {
          params: {
            projectId: productData.data.projectId,
            ref: payload.ref,
            path: repositoryPath,
          },
        }
      );

      const jsonMenuTree: Repository[] = [];

      if (repositoryTree.data.length > 0) {
        for (let i = 0; i < repositoryTree.data.length; i++) {
          const row = repositoryTree.data[i];
          const dataFolder = row.path;
          const arrFolder = dataFolder.split('/');

          row.data = {
            type: row.type,
            path: row.path,
          };

          if (row.type === 'blob') {
            row.data.visible = false;
          }

          // 폴더일 경우
          if (arrFolder.length > 1) {
            let folder = '';
            for (let f = 0; f < arrFolder.length - 1; f++) {
              if (f !== 0) {
                folder += '/';
              }
              folder += arrFolder[f];
            }

            // folder object
            const parentTree = nodeSearch(jsonMenuTree, folder);

            if (!parentTree) {
              jsonMenuTree.push(row);
            } else {
              if (parentTree.hasOwnProperty('children')) {
                parentTree.children.push(row);
              } else {
                parentTree.children = [row];
              }
            }
          } else {
            jsonMenuTree.push(row);
          }
        }
      }
      payload.useDocPath
        ? commit('setRepositoryDocPathData', jsonMenuTree)
        : commit('setRepositoryData', jsonMenuTree);
      // commit('setTreeData', jsonMenuTree);
    } catch (err) {
      console.error(err);
    }
  },
  async getRepositoryFile(
    { commit, state },
    payload: {
      productCode: string;
      filePath: string;
      ref: string;
      refType: string;
      pageTitle: string;
    }
  ): Promise<any> {
    try {
      const productData: Response = await this.$axios.get(
        'api/docs/product/getProjectId',
        {
          params: {
            productCode: payload.productCode,
          },
        }
      );

      const fileData: Response = await this.$axios.get(
        'api/docs/repository/getRepositoryFileData',
        {
          params: {
            projectId: productData.data.projectId,
            filePath: payload.filePath,
            ref: payload.ref,
          },
        }
      );

      for (let idx = 0; idx < state.treeData.length; idx++) {
        const selectedPage = findSelectedPage(
          state.treeData[idx],
          payload.pageTitle,
          payload.filePath
        );
        if (selectedPage !== undefined) {
          break;
        }
      }

      commit('setViewerText', fileData.data);
      commit('setPageTitle', payload.pageTitle);
      commit('setFilePath', payload.filePath);
      commit('setCurrentRef', [payload.ref, payload.refType]);

      // TODO tocArray 를 store 에 담아서 뿌려주기!
      const tocArray = makeTOC(state.viewerText);
      commit('setTocArray', tocArray);
    } catch (err) {
      console.error(err);
    }
  },
  async getFileContent(
    { commit, state },
    payload: {
      productCode: string;
      filePath: string;
      ref: string;
    }
  ): Promise<any> {
    try {
      const productData: Response = await this.$axios.get(
        'api/docs/product/getProjectId',
        {
          params: {
            productCode: payload.productCode,
          },
        }
      );

      const fileData: Response = await this.$axios.get(
        'api/docs/repository/getRepositoryFileData',
        {
          params: {
            projectId: productData.data.projectId,
            filePath: payload.filePath,
            ref: payload.ref,
          },
        }
      );

      commit('setEditingViewerText', fileData.data);
    } catch (err) {
      console.error(err);
    }
  },
  async getFileNameList(
    { commit, state },
    payload: {
      projectId: number;
      branchName: string;
      path: string;
    }
  ): Promise<any> {
    try {
      const fileNameListData: Response = await this.$axios.get(
        'api/docs/repository/getFileNameList',
        {
          params: {
            projectId: payload.projectId,
            ref: payload.branchName,
            path: payload.path,
          },
        }
      );
      let fileNameList: Array<string> = [];
      if (
        fileNameListData.data !== undefined &&
        fileNameListData.data.length > 0
      ) {
        fileNameListData.data.forEach((fileData) => {
          fileData.type === 'blob' ? fileNameList.push(fileData.name) : '';
        });
      }

      commit('setFileNameList', fileNameList);
    } catch (err) {
      console.error(err);
    }
  },
  async getFileSize(
    { commit, state, dispatch },
    payload: {
      projectId: number;
      ref: string;
      repositoryData: Array<any>;
    }
  ): Promise<any> {
    try {
      const blobArr: Array<any> = [];
      setFileSize(payload.repositoryData, blobArr);
      const promiseArr: Array<any> = [];

      if (blobArr.length > 0) {
        blobArr.forEach(async (blobData) => {
          promiseArr.push(
            this.$axios.get('api/docs/repository/getFileSize', {
              params: {
                projectId: payload.projectId,
                ref: payload.ref,
                filePath: blobData.data.path,
              },
            })
          );
        });
      }
      await Promise.all(promiseArr).then((res) => {
        blobArr.forEach((blobData, index) => {
          blobData.data.size = Math.round(res[index].data.size / 1024);
        });
      });
    } catch (e) {
      console.error(e);
    }
  },
  getFileSizeTest(
    { commit, state, dispatch },
    payload: {
      projectId: number;
      ref: string;
      children: Array<any>;
    }
  ): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        const blobArr: Array<any> = [];
        // setFileSize(payload.repositoryData, blobArr);
        payload.children.forEach(async (child) => {
          if (child.states.type === 'blob') {
            const fileData: Response = await this.$axios.get(
              'api/docs/repository/getFileSize',
              {
                params: {
                  projectId: payload.projectId,
                  ref: payload.ref,
                  filePath: child.states.path,
                },
              }
            );

            child.states.size = Math.round(fileData.data.size / 1024);
          }
        });

        // const promiseArr: Array<any> = [];
        //
        // if (blobArr.length > 0) {
        //   blobArr.forEach(async (blobData) => {
        //     promiseArr.push(
        //       this.$axios.get('api/docs/repository/getFileSize', {
        //         params: {
        //           projectId: payload.projectId,
        //           ref: payload.ref,
        //           filePath: blobData.states.path,
        //         },
        //       })
        //     );
        //   });
        // }
        // await Promise.all(promiseArr).then((res) => {
        //   blobArr.forEach((blobData, index) => {
        //     blobData.states.size = Math.round(res[index].data.size / 1024);
        //   });
        // });
        resolve(payload.children);
      } catch (e) {
        reject(e);
        // console.error(e);
      }
    });
  },
  uploadFile(
    { commit, state, dispatch },
    payload: {
      projectId: string;
      branchName: string;
      file: File;
      gitlabToken: string;
      uploadPath: string;
    }
  ): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        const fileData = new FormData();
        fileData.append('file', payload.file);
        fileData.append('branchName', payload.branchName);
        fileData.append('projectId', payload.projectId);
        fileData.append('uploadPath', payload.uploadPath);
        const uploadFileData: Response = await this.$axios.post(
          'api/docs/repository/upload',
          fileData
        );

        const { data } = await this.$axios.get(
          'api/docs/product/getProjectInfo',
          {
            params: {
              gitlabToken: payload.gitlabToken,
              projectId: payload.projectId,
            },
          }
        );
        resolve(data);
      } catch (e) {
        reject(e);
        // console.error(e);
      }
    });
  },
  getProjectInfo(
    { commit, state, dispatch },
    payload: {
      projectId: string;
      gitlabToken: string;
    }
  ): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        const { data } = await this.$axios.get(
          'api/docs/product/getProjectInfo',
          {
            params: {
              gitlabToken: payload.gitlabToken,
              projectId: payload.projectId,
            },
          }
        );
        resolve(data);
      } catch (e) {
        reject(e);
        // console.error(e);
      }
    });
  },
};

function setFileSize(treeData, blobArr: Array<any>) {
  if (treeData.length > 0) {
    treeData.forEach((data) => {
      if (data.data.type === 'blob') {
        blobArr.push(data);
      }
      if (data.children) {
        setFileSize(data.children, blobArr);
      }
    });
  }
}

function nodeSearch(treeNodes, searchID): any {
  if (typeof treeNodes !== 'undefined') {
    for (let nodeIdx = 0; nodeIdx <= treeNodes.length - 1; nodeIdx++) {
      const currentNode = treeNodes[nodeIdx];
      const currentId = currentNode.path;
      const currentChildren = currentNode.children;

      if (currentId === searchID) {
        return currentNode;
      } else if (currentNode.hasOwnProperty('children')) {
        const foundDescendant = nodeSearch(currentChildren, searchID);
        if (foundDescendant) {
          return foundDescendant;
        }
      }
    }
  }
  return false;
}

function makeTOC(content) {
  const tocArray: Array<any> = [];
  content.split('\n').forEach((lineData) => {
    // if (lineData.split('###### ').length > 1) {
    //   tocArray.push({ type: 'h6', content: lineData.split('###### ')[1] });
    // } else if (lineData.split('##### ').length > 1) {
    //   tocArray.push({ type: 'h5', content: lineData.split('##### ')[1] });
    // } else if (lineData.split('#### ').length > 1) {
    //   tocArray.push({ type: 'h4', content: lineData.split('#### ')[1] });
    // } else if (lineData.split('### ').length > 1) {
    //   tocArray.push({ type: 'h3', content: lineData.split('### ')[1] });
    // } else
    if (lineData.split('## ').length > 1 && lineData.split('## ')[0] === '') {
      tocArray.push({ type: 'h2', content: lineData.split('## ')[1] });
    } else if (
      lineData.split('# ').length > 1 &&
      lineData.split('# ')[0] === ''
    ) {
      tocArray.push({ type: 'h1', content: lineData.split('# ')[1] });
    }
  });
  return tocArray;
}

function appendChild(spaceLength, parent, childData, treeData) {
  if (spaceLength - 2 > 0) {
    // 2 depth 이상일 때 재귀함수
    if (parent.children === undefined) {
      parent.children = [];
      appendChild(spaceLength - 2, parent.children, childData, treeData);
    } else {
      appendChild(
        spaceLength - 2,
        parent.children[parent.children.length - 1],
        childData,
        treeData
      );
    }
  } else if (spaceLength - 2 === 0) {
    // 2 depth 이상일 때 data 삽입
    if (parent.children === undefined) {
      parent.children = [];
    }
    parent.children.push(childData);
  } else if (spaceLength === 0) {
    // 1 depth 일 때
    if (Object.keys(parent).length !== 0) {
      treeData.push(parent);
      parent = {};
    }
    parent = childData;
    return parent;
  }
}

function findFirstPage(parent): any {
  if (parent.type === 'folder') {
    parent.option.expanded = true;

    if (parent.children.length > 0) {
      return findFirstPage(parent.children[0]);
    } else {
      return findFirstPage(parent.children);
    }
  } else {
    parent.option.selected = true;
    return parent;
  }
}

function findSelectedPage(parent, pageTitle, filePath): any {
  if (pageTitle === parent.title && filePath === parent.option.path) {
    parent.option.selected = true;
    return parent;
  } else if (parent.children && parent.children.length > 0) {
    for (let childIdx = 0; childIdx < parent.children.length; childIdx++) {
      const findResult = findSelectedPage(
        parent.children[childIdx],
        pageTitle,
        filePath
      );
      if (findResult !== undefined) {
        parent.option.expanded = true;
        return findResult;
      }
    }
  } else {
    return undefined;
  }
}