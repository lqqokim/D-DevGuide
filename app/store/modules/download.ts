import { ActionTree, MutationTree, GetterTree, ActionContext } from 'vuex';
import { RootState } from '@/store';
import { ALERT_TYPE } from '@/store/modules/common';
import * as common from '@/store/modules/common';

export const namespaced: boolean = true;

export interface DownloadState {
  fileDefaultParams: ListParams;
  filesByProduct: Array<IFile>;
  selectedFile: IFile;
  selectedProduct: IProduct;
  products: Array<IProduct>;
  filesByAllProduct: Array<IFilterFile>;
  totalSize: number;
  managedFiles: Array<IFile>;
  filesByProducts: Array<IFilterFile>;
  searchDownloadsResult: ISearchDownloadsResult[];
}

export interface ListParams {
  params: {
    skip: number;
    limit: number;
    sort: string;
  };
}

export interface IFilterFile {
  productCode: string;
  productName: string;
  files: Array<IFile>;
}

export interface IStaff {
  _id?: string;
  empName: string;
  positionName: string;
  deptPath: string;
  empId: string;
}

export interface IProduct {
  _id?: string;
  index?: number;
  productName: string;
  productCode: string;
  description: string;
  managedFiles: IFile[];
  staffs: Array<IStaff>;
}

export interface IFile {
  _id?: string;
  fileTitle: string; // 문서 제목
  originFileName: string; // 등록시 문서명
  fileName: string; // 변환된 문서명
  filePath: string; // 문서 경로

  productCode: string; // 깃랩 프로젝트 ID
  productName: string; // 제품명

  uploadDate: number; // 업로드 날짜
  updateDate: number; // 수정한 날짜
  downloadCount: number; // 조회수
  size: number; // 파일 크기

  empId: string; // 등록한 직원 아이디
  empName: string; // 등록한 직원 이름
  deptPath: string; // 부서
  description: string; // 문서 설명
}

// 다운로드 검색 결과
export interface ISearchDownloadsResult {
  productName: string;
  searchData: IFile[];
}

interface IResponse {
  config: object;
  data: any;
  headers: object;
  request: XMLHttpRequest;
  status: number;
  statusText: string;
}

export const state = (): DownloadState => ({
  fileDefaultParams: FILE_DEFAULT_PARAMS(),
  filesByProduct: [],
  selectedFile: SELECTED_FILE(),
  selectedProduct: SELECTED_PRODUCT(),
  products: [],
  filesByAllProduct: [],
  totalSize: 0,
  managedFiles: [],
  filesByProducts: [],
  searchDownloadsResult: [],
});

export const getters: GetterTree<DownloadState, RootState> = {};

export const mutations: MutationTree<DownloadState> = {
  filesByProduct(state, payload): void {
    state.filesByProduct = payload;
  },
  registerProduct(state, payload): void {
    state.products.push(payload);
  },
  selectedProduct(state, payload): void {
    state.selectedProduct = payload;
  },
  products(state, payload: IProduct[]): void {
    state.products = payload;
  },
  initState(state, payload: string): void {
    if (payload === 'selectedFile') {
      state.selectedFile = SELECTED_FILE();
    }
  },
  filesByAllProduct(state, payload: IFilterFile[]): void {
    payload.map((item: IFilterFile) => {
      item.files = item.files.slice().splice(0, 6);
    });

    state.filesByAllProduct = payload;
  },
  selectedFile(state, payload: IFile): void {
    state.selectedFile = payload;
  },
  totalSize(state, payload): void {
    state.totalSize = payload;
  },
  managedFiles(state, payload: IFile[]): void {
    state.managedFiles = payload;
  },
  countIncrement(state) {
    state.selectedFile.downloadCount++;
  },
  // count(state, payload) {
  //   state.filesByProduct.map((file) => {
  //     if (file._id === payload._id) {
  //       file.downloadCount++;
  //     }
  //   });
  // },
  filesByProducts(state, payload): void {
    state.filesByProducts = payload;
  },
  searchDownloads(state, payload): void {
    const newSearchResult: Array<any> = [];
    const removeMd = require('remove-markdown');

    // 검색 결과 중복 제거
    const searchResults = payload.searchResults.filter((result, resultIdx) => {
      return (
        payload.searchResults.findIndex((compareResult) => {
          return compareResult._id === result._id;
        }) === resultIdx
      );
    });

    searchResults.forEach((searchResult) => {
      searchResult.fileTitle = searchResult.fileTitle
        .split(payload.searchWord)
        .join('<em>' + payload.searchWord + '</em>');
      searchResult.description = removeMd(searchResult.description);
      searchResult.description = searchResult.description
        .split(payload.searchWord)
        .join('<em>' + payload.searchWord + '</em>')
        .split('\n')
        .join('<br/>');
      let existedProductName: boolean = false;
      newSearchResult.forEach((result) => {
        if (result.productName === searchResult.productName) {
          result.searchData.push(searchResult);
          existedProductName = true;
        }
      });
      if (!existedProductName) {
        newSearchResult.push({
          productName: searchResult.productName,
          searchData: [searchResult],
        });
      }
    });

    state.searchDownloadsResult = newSearchResult;
  },
};

export const actions: ActionTree<DownloadState, RootState> = {
  async searchDownloads(
    { commit },
    payload: { searchWord: string; productCode?: string; params?: ListParams }
  ): Promise<any> {
    const path = 'api/library/download/searchDownloads';
    let searchPath: string = path;
    let params = {
      searchWord: payload.searchWord,
    };

    if (payload.productCode !== undefined) {
      searchPath = path + '/' + payload.productCode;

      params = {
        searchWord: payload.searchWord,
        ...payload.params!.params,
      };
    }

    try {
      const { data } = await this.$axios.get(searchPath, {
        params,
      });

      console.log('searchDownloads :: ', data);

      if (data.success && data.data) {
        // 다운로드 내 검색
        if (payload.productCode !== undefined) {
          await commit('filesByProduct', data.data.result);
          await commit('totalSize', data.data.total);
        }
        // 통합검색 다운로드 결과
        else {
          await commit('searchDownloads', {
            searchResults: data.data,
            searchWord: payload.searchWord,
          });
        }
      }
    } catch (e) {
      console.error(e);
    }
  },

  async updateDownloadCount({ commit, state }, payload: IFile) {
    commit('selectedFile', payload);

    try {
      const { data } = await this.$axios.post(
        'api/library/download/count/' + payload._id
      );

      console.log('[updateDownloadCount] ', data);

      if (data.success) {
        commit('countIncrement');
        // commit('count', payload);
      }
    } catch (e) {
      console.error(e);
    }
  },

  registerProduct({ commit, dispatch }, payload: IProduct): Promise<any> {
    // if (payload && payload._id) {
    //   delete payload._id;
    // }

    return new Promise(async (resolve, reject) => {
      try {
        const { data } = await this.$axios.post(
          'api/library/download/product',
          payload
        );

        await dispatch('fileProducts');
        resolve(data);
      } catch (e) {
        reject(e);
      }
    });
  },

  // 제품 정보 수정
  updateProduct({ commit, dispatch }, payload: IProduct): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        const { data } = await this.$axios.post(
          'api/library/download/product/update/' + payload._id,
          payload
        );

        // await dispatch('fileProducts');
        resolve(data);
      } catch (e) {
        reject(e);
      }
    });
  },

  // 제품 목록 수정
  async updateProducts(
    { commit, dispatch },
    payload: IProduct[]
  ): Promise<any> {
    try {
      const { data } = await this.$axios.put(
        'api/library/download/products',
        payload
      );

      if (data.success && data.data) {
        await dispatch(
          'common/alert',
          {
            type: ALERT_TYPE.CHECK,
            isShow: true,
            msg: '제품 순서가 변경되었습니다.',
          },
          { root: true }
        );
      }
    } catch (e) {}
  },

  removeProduct({ commit, state, dispatch }, payload: IProduct): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        const { data } = await this.$axios.delete(
          'api/library/download/remove/product/' + payload._id
        );

        await dispatch('fileProducts');
        resolve(data);
      } catch (e) {
        reject(e);
      }
    });
  },

  // async registerProduct({ commit }, payload: IProduct): Promise<any> {
  //   try {
  //     const { data } = await this.$axios.post(
  //       'api/library/download/product',
  //       payload
  //     );
  //
  //     console.log('[download] registerProduct :: ', data);
  //
  //     if (data.success && data.data) {
  //       commit('registerProduct', data.data as IProduct);
  //     }
  //   } catch (e) {
  //     console.error(e);
  //   }
  // },

  async fileProducts({ commit }): Promise<any> {
    try {
      const { data } = await this.$axios.get('api/library/download/products');

      if (data.success && data.data) {
        commit('products', data.data as IProduct[]);
      }
    } catch (e) {
      console.error(e);
    }
  },

  async productByCode({ commit }, payload: string): Promise<any> {
    try {
      const { data } = await this.$axios.get(
        'api/library/download/product/' + payload
      );

      if (data.success && data.data) {
        commit('selectedProduct', data.data as IProduct);
      }
    } catch (e) {
      console.error(e);
    }
  },

  async getFilesByProduct(
    { commit, state },
    payload: { data: IProduct; params: ListParams }
  ): Promise<any> {
    try {
      const { data } = await this.$axios.get(
        'api/library/download/list/' + payload.data.productCode,
        payload.params ? payload.params : state.fileDefaultParams
      );

      console.log('getFilesByProduct : ', data);

      if (data.success && data.data) {
        commit('filesByProduct', data.data.result);
        // commit('managedFiles', data.data.slice().splice(0, 6));
        commit('totalSize', data.data.total);
      }
    } catch (e) {
      console.error(e);
    }
  },

  async filesByProducts({ commit }): Promise<any> {
    try {
      const { data } = await this.$axios.post(
        'api/library/download/listByAllProduct'
      );

      if (data.success && data.data) {
        await commit('filesByAllProduct', data.data);
      }
    } catch (e) {
      console.error(e);
    }
  },

  async createFile(
    { commit, dispatch, rootState },
    payload: {
      data: IFile;
      file: any;
    }
  ): Promise<any> {
    payload.data.empId = rootState.user.user.loginId;
    payload.data.empName = rootState.user.user.name;
    payload.data.deptPath = rootState.user.user.deptPath.split('|')[3];

    // payload.data.empId = 'kis4204';
    // payload.data.empName = '김인수A';
    // payload.data.deptPath = '플랫폼개발1팀';

    const formData = new FormData();
    formData.append('file', payload.file.files[0]);
    formData.append('data', JSON.stringify(payload.data));

    try {
      const { data } = await this.$axios.post(
        'api/library/download/register',
        formData
      );

      if (data.success && data.data) {
        await dispatch(
          'common/alert',
          {
            type: ALERT_TYPE.CHECK,
            isShow: true,
            msg: '파일이 등록되었습니다.',
          },
          { root: true }
        );
      } else {
        await dispatch(
          'common/alert',
          {
            type: ALERT_TYPE.WARN,
            isShow: true,
            msg: data.msg,
          },
          { root: true }
        );
      }
    } catch (e) {
      await dispatch(
        'common/alert',
        {
          type: ALERT_TYPE.ERROR,
          isShow: true,
          msg: e,
        },
        { root: true }
      );
    }
  },

  async updateFile(
    { commit, dispatch, rootState },
    payload: {
      isChange: boolean;
      data: IFile;
      file: any;
    }
  ): Promise<any> {
    let res;

    try {
      if (!payload.isChange) {
        res = await this.$axios.post(
          'api/library/download/update/' + payload.data._id,
          {
            data: payload.data,
          }
        );
      } else {
        const formData = new FormData();
        formData.append('file', payload.file.files[0]);
        formData.append('data', JSON.stringify(payload.data));

        res = await this.$axios.post('api/library/download/register', formData);
      }

      console.log('updateFile :: ', payload);

      if (res.data.success && res.data.data) {
        await dispatch(
          'common/alert',
          {
            type: ALERT_TYPE.CHECK,
            isShow: true,
            msg: '답변이 수정되었습니다.',
          },
          { root: true }
        );
      } else {
        await dispatch(
          'common/alert',
          {
            type: ALERT_TYPE.WARN,
            isShow: true,
            msg: res.data.msg,
          },
          { root: true }
        );
      }
    } catch (e) {
      await dispatch(
        'common/alert',
        {
          type: ALERT_TYPE.ERROR,
          isShow: true,
          msg: e,
        },
        { root: true }
      );
    }
  },

  async updateManagedFiles(
    { commit, dispatch },
    payload: { productId: string; managedFiles: Array<IFile> }
  ): Promise<any> {
    try {
      const { data } = await this.$axios.post(
        'api/library/download/updateManagedFile/' + payload.productId,
        payload.managedFiles
      );

      if (data.success && data.data) {
        await dispatch('fileProducts');
      }
    } catch (e) {
      console.error(e);
    }
  },

  async deleteFile({ commit, state, dispatch }, payload: string): Promise<any> {
    try {
      const { data } = await this.$axios.delete(
        'api/library/download/remove/' + payload
      );

      console.log('deleteFile :: ', data);

      if (data.success && data.data.ok === 1) {
        dispatch('getFilesByProduct', {
          data: state.selectedProduct,
        });

        await dispatch(
          'common/alert',
          {
            type: ALERT_TYPE.CHECK,
            isShow: true,
            msg: '파일이 삭제되었습니다.',
          },
          { root: true }
        );
      } else {
        await dispatch(
          'common/alert',
          {
            type: ALERT_TYPE.WARN,
            isShow: true,
            msg: data.msg,
          },
          { root: true }
        );
      }
    } catch (e) {
      await dispatch(
        'common/alert',
        {
          type: ALERT_TYPE.ERROR,
          isShow: true,
          msg: e,
        },
        { root: true }
      );
    }
  },

  async fileDetailById({ commit }, payload: string): Promise<any> {
    try {
      const { data } = await this.$axios.post('/api/download/file/' + payload);

      console.log('fileDetailById :: ', data);

      if (data.success && data.data) {
        commit('selectedFile', data.data as IFile);
      }
    } catch (e) {
      console.error(e);
    }
  },
};

const FILE_DEFAULT_PARAMS = (): ListParams => {
  return {
    params: {
      skip: 0,
      limit: parseInt(common.state().countOptions[0].code),
      sort: '-uploadDate',
    },
  };
};

const SELECTED_FILE = (): IFile => {
  return {
    _id: '',
    fileTitle: '',
    originFileName: '',
    fileName: '',
    filePath: '',

    productCode: '',
    productName: '',

    uploadDate: 0,
    updateDate: 0,
    downloadCount: 0,
    size: 0,

    empId: '',
    empName: '',
    deptPath: '',
    description: '',
  };
};

const SELECTED_PRODUCT = (): IProduct => {
  return {
    _id: '',
    productName: '',
    productCode: '',
    description: '',
    managedFiles: [],
    staffs: [],
  };
};
