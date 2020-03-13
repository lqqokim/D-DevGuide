import { ActionTree, MutationTree, GetterTree, ActionContext } from 'vuex';
import { RootState } from '@/store';
import * as common from '@/store/modules/common';
const ALERT_TYPE = common.ALERT_TYPE;
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
    { commit, dispatch, state },
    payload: { searchWord: string; productCode?: string; params?: ListParams }
  ): Promise<any> {
    const path = 'api/library/download/searchDownloads';
    let searchPath: string = path;

    // 특수문자가 포함되어있을 경우 특수문자 앞에 \ 를 붙여주어야 함
    const regex = /[~!@#$%^&*()_+|<>?:{}]/gi;
    let matchSearchWord = payload.searchWord.match(regex);
    let searchWordParam = payload.searchWord;

    if (matchSearchWord !== null && matchSearchWord.length > 0) {
      matchSearchWord = matchSearchWord.filter((item, idx, array) => {
        return array.indexOf(item) === idx;
      });
      for (let idx = 0; idx < matchSearchWord.length; idx++) {
        searchWordParam = searchWordParam
          .split(matchSearchWord[idx])
          .join('\\' + matchSearchWord[idx]);
      }
    }

    let params = {
      searchWord: searchWordParam,
    };

    if (payload.productCode !== undefined) {
      searchPath = path + '/' + payload.productCode;

      params = {
        searchWord: searchWordParam,
        ...payload.params!.params,
      };
    }

    try {
      const { data } = await this.$axios.get(searchPath, {
        params,
      });

      // console.log('searchDownloads :: ', data);

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
      // await dispatch('selectedProduct', state.selectedProduct); // for remove downloadList searchWord
      await dispatch('getFilesByProduct', {
        data: state.selectedProduct,
      });
    }
  },

  async updateDownloadCount({ commit, state }, payload: IFile) {
    commit('selectedFile', payload);

    try {
      const { data } = await this.$axios.post(
        'api/library/download/count/' + payload._id
      );

      // console.log('[updateDownloadCount] ', data);

      if (data.success) {
        commit('countIncrement');
        // commit('count', payload);
      }
    } catch (e) {
      console.error(e);
    }
  },

  async registerProduct({ commit, dispatch }, payload: IProduct): Promise<any> {
    try {
      // Loading Alert
      dispatch(
        'common/alert',
        {
          type: ALERT_TYPE.LOADING,
          isShow: true,
          msg: '제품을 등록중입니다.',
        },
        { root: true }
      );

      const { data } = await this.$axios.post(
        'api/library/download/product',
        payload
      );

      if (data.success && data.data) {
        await dispatch(
          'common/alert',
          {
            type: ALERT_TYPE.CHECK,
            isShow: true,
            msg: '제품이 등록되었습니다.',
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

      await dispatch('fileProducts');
    } catch (e) {
      await dispatch(
        'common/alert',
        {
          type: ALERT_TYPE.ERROR,
          isShow: true,
          msg: `[${e.response.status}] ${e.response.data.msg}`,
        },
        { root: true }
      );
    }
  },

  // 제품 정보 수정
  async updateProduct({ commit, dispatch }, payload: IProduct): Promise<any> {
    try {
      // Loading Alert
      dispatch(
        'common/alert',
        {
          type: ALERT_TYPE.LOADING,
          isShow: true,
          msg: '제품을 수정중입니다.',
        },
        { root: true }
      );

      const currentProductData = await this.$axios.get(
        'api/library/download/getCurrentProductData',
        {
          params: {
            _id: payload._id,
          },
        }
      );

      if (currentProductData.data.productCode !== payload.productCode) {
        await this.$axios.post('api/library/download/updateFileProductCode', {
          prevProductCode: currentProductData.data.productCode,
          changingProductCode: payload.productCode,
        });
      }

      if (currentProductData.data.productName !== payload.productName) {
        await this.$axios.post('api/library/download/updateFileProductName', {
          prevProductName: currentProductData.data.productName,
          changingProductName: payload.productName,
        });
      }

      const { data } = await this.$axios.post(
        'api/library/download/product/update/' + payload._id,
        payload
      );

      // console.log('updateProduct :: ', data);

      if (data.success && data.data) {
        await dispatch(
          'common/alert',
          {
            type: ALERT_TYPE.CHECK,
            isShow: true,
            msg: '제품정보가 수정되었습니다.',
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

      await dispatch('fileProducts');
    } catch (e) {
      await dispatch(
        'common/alert',
        {
          type: ALERT_TYPE.ERROR,
          isShow: true,
          msg: `[${e.response.status}] ${e.response.data.msg}`,
        },
        { root: true }
      );
    }
  },

  // 제품 목록 수정
  async updateProducts(
    { commit, dispatch },
    payload: IProduct[]
  ): Promise<any> {
    if (!payload.length) {
      return;
    }

    // managedFiles _id 추출 (for request large )
    payload.map((product) => {
      // @ts-ignore
      product.managedFiles = product.managedFiles.map(
        (file: IFile) => file._id
      );
    });

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
          msg: `[${e.response.status}] ${e.response.data.msg}`,
        },
        { root: true }
      );
    }
  },

  async removeProduct(
    { commit, state, dispatch },
    payload: IProduct
  ): Promise<any> {
    try {
      // Loading Alert
      dispatch(
        'common/alert',
        {
          type: ALERT_TYPE.LOADING,
          isShow: true,
          msg: '제품을 삭제중입니다.',
        },
        { root: true }
      );

      const { data } = await this.$axios.delete(
        'api/library/download/remove/product/' + payload._id
      );

      if (data.success) {
        await dispatch(
          'common/alert',
          {
            type: ALERT_TYPE.CHECK,
            isShow: true,
            msg: '제품이 삭제되었습니다.',
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

      await dispatch('fileProducts');
    } catch (e) {
      await dispatch(
        'common/alert',
        {
          type: ALERT_TYPE.ERROR,
          isShow: true,
          msg: `[${e.response.status}] ${e.response.data.msg}`,
        },
        { root: true }
      );
    }
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

      // console.log('getFilesByProduct : ', data);

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
    // Loading Alert
    dispatch(
      'common/alert',
      {
        type: ALERT_TYPE.LOADING,
        isShow: true,
        msg: '파일을 등록중입니다.',
      },
      { root: true }
    );

    payload.data.empId = rootState.user.user.loginId;
    payload.data.empName = rootState.user.user.name;
    // eslint-disable-next-line standard/computed-property-even-spacing
    const deptPathSplit = rootState.user.user.deptPath.split('|');
    payload.data.deptPath = deptPathSplit[deptPathSplit.length - 2];

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
          msg: `[${e.response.status}] ${e.response.data.msg}`,
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
      // Loading Alert
      dispatch(
        'common/alert',
        {
          type: ALERT_TYPE.LOADING,
          isShow: true,
          msg: '다운로드 파일정보를 수정중입니다.',
        },
        { root: true }
      );

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

      // console.log('updateFile :: ', payload);

      if (res.data.success && res.data.data) {
        await dispatch(
          'common/alert',
          {
            type: ALERT_TYPE.CHECK,
            isShow: true,
            msg: '다운로드 파일정보가 수정되었습니다.',
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
          msg: `[${e.response.status}] ${e.response.data.msg}`,
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

  async deleteFile({ commit, state, dispatch }, payload: IFile): Promise<any> {
    try {
      // Loading Alert
      dispatch(
        'common/alert',
        {
          type: ALERT_TYPE.LOADING,
          isShow: true,
          msg: '파일을 삭제중입니다.',
        },
        { root: true }
      );

      const { data } = await this.$axios.post(
        'api/library/download/remove/' + payload._id,
        {
          productCode: payload.productCode,
          file: payload,
        }
      );

      // console.log('deleteFile :: ', data);

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
          msg: `[${e.response.status}] ${e.response.data.msg}`,
        },
        { root: true }
      );
    }
  },

  async fileDetailById({ commit, dispatch }, payload: string): Promise<any> {
    try {
      const { data } = await this.$axios.post('/api/download/file/' + payload);

      // console.log('fileDetailById :: ', data);

      if (data.success && data.data) {
        await commit('selectedFile', data.data as IFile);
      }
    } catch (e) {
      await dispatch(
        'common/alert',
        {
          type: ALERT_TYPE.ERROR,
          isShow: true,
          msg: `[${e.response.status}] ${e.response.data.msg}`,
        },
        { root: true }
      );
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
