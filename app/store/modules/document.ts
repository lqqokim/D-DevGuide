import { ActionTree, MutationTree, GetterTree, ActionContext } from 'vuex';
import { RootState } from '@/store';
import { ALERT_TYPE } from '@/store/modules/common';

export const namespaced: boolean = true;

export interface DocState {
  docsByProduct: Array<IDocument>;
  selectedDoc: IDocument;
  selectedTemp: IDocument;
  selectedProduct: IProduct;
  products: Array<IProduct>;
  managedDocs: Array<IDocument>;
  docDefaultParams: ListParams;
  totalSize: number;
  docsAllByProduct: Array<IDocument>;
  searchDocsResult: ISearchDocsResult[];
}

export interface ListParams {
  skip: number;
  limit: number;
  sort: string;
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
  managedDocs: IDocument[];
  staffs: Array<IStaff>;
}

export interface TempDocument {
  _id: string;
  originDocName: string; // 등록시 문서명
  docName: string; // 변환된 문서명
  docPath: string; // 문서 경로
  thumbnailPath: string; // thumbnail 이미지 경로
  fileExt: string; // 파일 확장자

  uploadDate: number; // 업로드 날짜
  updateDate: number; // 수정한 날짜
  size: number; // 파일 크기
}

export interface IDocument {
  _id: string;
  docTitle: string; // 문서 제목
  originDocName: string; // 등록시 문서명
  docName: string; // 변환된 문서명
  docPath: string; // 문서 경로
  thumbnailPath: string; // thumbnail 이미지 경로
  fileExt: string; // 파일 확장자

  productCode: string; // 깃랩 프로젝트 ID
  productName: string; // 제품명

  uploadDate: number; // 업로드 날짜
  updateDate: number; // 수정한 날짜
  viewCount: number; // 조회수
  size: number; // 파일 크기

  empId: string; // 등록한 직원 아이디
  empName: string; // 등록한 직원 이름
  deptPath: string; // 부서
  description: string; // 문서 설명
}

// 문서 검색 결과
export interface ISearchDocsResult {
  productName: string;
  searchData: IDocument[];
}

interface IResponse {
  config: object;
  data: any;
  headers: object;
  request: XMLHttpRequest;
  status: number;
  statusText: string;
}

export const state = (): DocState => ({
  docsByProduct: [],
  selectedDoc: SELECTED_DOC(),
  selectedProduct: SELECTED_PRODUCT(),
  selectedTemp: SELECTED_TEMP_DOC(),
  products: [],
  managedDocs: [],
  docDefaultParams: DOC_DEFAULT_PARAMS(),
  totalSize: 0,
  docsAllByProduct: [],
  searchDocsResult: [],
});

export const getters: GetterTree<DocState, RootState> = {
  selectedDoc(state) {
    return state.selectedDoc;
  },
};

export const mutations: MutationTree<DocState> = {
  docsByProduct(state, payload): void {
    state.docsByProduct = payload;
  },
  selectedProduct(state, payload): void {
    state.selectedProduct = payload;
  },
  selectedDoc(state, payload): void {
    state.selectedDoc = payload;
  },
  selectedTemp(state, payload): void {
    state.selectedTemp = payload;
  },
  products(state, payload: IProduct[]): void {
    state.products = payload;
  },
  registerProduct(state, payload): void {
    state.products.push(payload);
  },
  initState(state, payload: string): void {
    if (payload === 'selectedDoc') {
      state.selectedDoc = SELECTED_DOC();
    } else if (payload === 'selectedTemp') {
      state.selectedTemp = SELECTED_TEMP_DOC();
    }
  },
  removeDoc(state, payload: string): void {
    state.docsByProduct = state.docsByProduct.filter((doc: IDocument) => {
      return doc._id !== payload;
    });
  },
  managedDocs(state, payload: IDocument[]): void {
    state.managedDocs = payload;
  },
  totalSize(state, payload): void {
    state.totalSize = payload;
  },
  docsAllByProduct(state, payload): void {
    state.docsAllByProduct = payload;
  },
  countIncrement(state) {
    state.selectedDoc.viewCount++;
  },
  searchDocsResult(state, payload): void {
    const newSearchResult: Array<any> = [];

    payload.searchResults.forEach((searchResult) => {
      // searchResult.docTitle = searchResult.docTitle
      //   .split(payload.searchWord)
      //   .join('<em>' + payload.searchWord + '</em>');
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

    state.searchDocsResult = newSearchResult;
  },
};

export const actions: ActionTree<DocState, RootState> = {
  registerProduct({ commit, dispatch }, payload: IProduct): Promise<any> {
    // if (payload && payload._id) {
    //   delete payload._id;
    // }

    return new Promise(async (resolve, reject) => {
      try {
        const { data } = await this.$axios.post(
          'api/library/document/product',
          payload
        );

        await dispatch('docProducts');
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
          'api/library/document/product/update/' + payload._id,
          payload
        );

        // await dispatch('docProducts');
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
        'api/library/document/products',
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

  async searchDocs({ commit }, payload: { searchWord: string }): Promise<any> {
    try {
      const { data } = await this.$axios.get(
        'api/library/document/searchDocs',
        { params: { searchWord: payload.searchWord } }
      );

      if (data.success && data.data) {
        await commit('searchDocsResult', {
          searchResults: data.data,
          searchWord: payload.searchWord,
        });
      }
    } catch (e) {
      console.error(e);
    }
  },

  async updateDocCount({ commit, state }, payload: string) {
    try {
      const { data } = await this.$axios.post(
        'api/library/document/count/' + payload
      );

      console.log('[updateDocCount] ', data);

      if (data.success) {
        // commit('countIncrement');
      }
    } catch (e) {
      console.error(e);
    }
  },

  async docsAllByProduct({ commit }, payload: string): Promise<any> {
    try {
      const { data } = await this.$axios.get(
        'api/library/document/all/' + payload
      );

      if (data.success && data.data) {
        commit('docsAllByProduct', data.data as IDocument[]);
      }
    } catch (e) {
      console.error(e);
    }
  },

  async productByCode({ commit }, payload: string): Promise<any> {
    try {
      const { data } = await this.$axios.get(
        'api/library/document/product/' + payload
      );

      if (data.success && data.data) {
        commit('selectedProduct', data.data as IProduct);
      }
    } catch (e) {
      console.error(e);
    }
  },

  async updateDoc(
    { commit, rootState, state, dispatch },
    payload: {
      isChange: boolean;
      data: IDocument;
      file: any;
    }
  ): Promise<any> {
    let res;

    try {
      if (!payload.isChange) {
        res = await this.$axios.post(
          'api/library/document/update/' + state.selectedDoc._id,
          {
            data: payload.data,
          }
        );

        console.log('updateDoc :: ', payload);
      } else {
        const formData = new FormData();
        formData.append('file', payload.file.files[0]);
        formData.append('data', JSON.stringify(state.selectedDoc));

        res = await this.$axios.post('api/library/document/register', formData);

        dispatch('getDocsByProduct', {
          data: state.selectedProduct,
        });
      }

      if (res.data.success && res.data.data) {
        dispatch('getDocsByProduct', {
          data: state.selectedProduct,
        });
        await dispatch(
          'common/alert',
          {
            type: ALERT_TYPE.CHECK,
            isShow: true,
            msg: '문서가 수정되었습니다.',
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
          type: ALERT_TYPE.WARN,
          isShow: true,
          msg: e,
        },
        { root: true }
      );
    }
  },

  async updateManagedDoc(
    { commit, dispatch },
    payload: { productId: string; managedDocs: Array<IDocument> }
  ): Promise<any> {
    try {
      const { data } = await this.$axios.post(
        'api/library/document/updateManagedDoc/' + payload.productId,
        payload.managedDocs
      );

      if (data.success && data.data) {
        await dispatch('docProducts');
      }
    } catch (e) {
      console.error(e);
    }
  },

  // async registerProduct({ commit }, payload: IProduct): Promise<any> {
  //   try {
  //     const { data } = await this.$axios.post(
  //       'api/library/document/product',
  //       payload
  //     );
  //
  //     // console.log('registerProduct video :: ', data);
  //
  //     if (data.success && data.data) {
  //       commit('registerProduct', data.data as IProduct);
  //     }
  //   } catch (e) {
  //     console.error(e);
  //   }
  // },

  async docProducts({ commit, state }): Promise<any> {
    try {
      const { data } = await this.$axios.get('api/library/document/products');
      // console.log('docProducts :: ', data);

      if (data.success && data.data) {
        commit('products', data.data as IProduct[]);

        if (!state.selectedProduct._id) {
          commit('selectedProduct', data.data[0]);
        }
      }
    } catch (e) {
      console.error(e);
    }
  },

  async docDetail({ commit }, payload: string): Promise<any> {
    console.log('docDetail :: ', payload);
    try {
      const { data } = await this.$axios.get('api/library/document/' + payload);
      console.log('selectedDoc :: ', data);

      if (data.success && data.data) {
        commit('selectedDoc', data.data as Document);
      }
    } catch (e) {
      console.error(e);
    }
  },

  async getDocsByProduct(
    { commit, state },
    payload: { data: IProduct; params: ListParams }
  ): Promise<any> {
    if (payload.data) {
      commit('selectedProduct', payload.data);

      try {
        const { data }: IResponse = await this.$axios.get(
          'api/library/document/list/' + payload.data.productCode,
          {
            params: payload.params ? payload.params : state.docDefaultParams,
          }
        );

        const res: { result: Array<IDocument>; total: number } = data.data;

        if (data.success && res) {
          await commit('docsByProduct', res.result);
          await commit('managedDocs', res.result.slice().splice(0, 5));
          await commit('totalSize', res.total);
        }
      } catch (e) {
        console.error(e);
      }
    }
  },

  async createDoc(
    { commit, state, rootState, dispatch },
    payload: {
      data: IDocument;
      file: any;
    }
  ): Promise<any> {
    try {
      console.log('createDoc payload', rootState);
      payload.data.empId = rootState.user.user.loginId;
      payload.data.empName = rootState.user.user.name;
      payload.data.deptPath = rootState.user.user.deptPath.split('|')[3];

      // payload.data.empId = 'kis4204';
      // payload.data.empName = '김인수A';
      // payload.data.deptPath = '플랫폼개발1팀';

      const formData = new FormData();
      formData.append('file', payload.file.files[0]);
      formData.append('data', JSON.stringify(payload.data));

      const { data } = await this.$axios.post(
        'api/library/document/register',
        formData
      );

      console.log('createDoc :: ', data.data);

      if (data.success && data.data) {
        dispatch('getDocsByProduct', {
          data: state.selectedProduct,
        });

        await dispatch(
          'common/alert',
          {
            type: ALERT_TYPE.CHECK,
            isShow: true,
            msg: '문서가 등록되었습니다.',
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

  async previewDoc({ commit }, payload: any): Promise<any> {
    const formData = new FormData();
    formData.append('name', payload.name);
    formData.append('file', payload.files[0]);

    try {
      const { data } = await this.$axios.post(
        'api/library/document/preview',
        formData
      );

      if (data.success && data.data) {
        console.log('Preview 업로드 완료 :: ', data.data);
        // commit('selectedDoc', data.data);
        commit('selectedTemp', data.data);
      } else {
        console.error(data.msg);
      }
    } catch (e) {
      console.error(e);
    }
  },

  async removeDoc({ commit, state, dispatch }, payload: string): Promise<any> {
    try {
      const { data } = await this.$axios.post(
        'api/library/document/remove/' + payload,
        {
          productCode: state.selectedProduct.productCode,
        }
      );

      if (data.success && data.data.ok === 1) {
        // console.log('removeDoc ', data);
        await dispatch('getDocsByProduct', {
          data: state.selectedProduct,
        });
        await dispatch(
          'common/alert',
          {
            type: ALERT_TYPE.CHECK,
            isShow: true,
            msg: '문서가 삭제되었습니다.',
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
};

const DOC_DEFAULT_PARAMS = (): ListParams => {
  return {
    limit: 5,
    skip: 0,
    sort: '-uploadDate',
  };
};

const SELECTED_DOC = (): IDocument => {
  return {
    _id: '',
    docTitle: '',
    originDocName: '',
    docName: '',
    docPath: '',
    thumbnailPath: '',
    fileExt: '',

    productCode: '',
    productName: '',

    uploadDate: 0,
    updateDate: 0,
    viewCount: 0,
    size: 0,

    empId: '',
    empName: '',
    deptPath: '',
    description: '',
  };
};

const SELECTED_TEMP_DOC = (): IDocument => {
  return {
    _id: '',
    docTitle: '',
    originDocName: '',
    docName: '',
    docPath: '',
    thumbnailPath: '',
    fileExt: '',

    productCode: '',
    productName: '',

    uploadDate: 0,
    updateDate: 0,
    viewCount: 0,
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
    managedDocs: [],
    staffs: [],
  };
};
