import { ActionTree, MutationTree, GetterTree, ActionContext } from 'vuex';
import { RootState } from '@/store';
import { UserState } from '~/store/modules/user';
// import { Product } from '~/store/modules/projects';

export const namespaced: boolean = true;

export interface DocState {
  docsByProduct: Array<Document>;
  selectedDoc: Document;
  selectedTemp: Document;
  selectedProduct: Product;
  products: Array<Product>;
}

export interface Staff {
  _id?: string;
  empName: string;
  positionName: string;
  deptPath: string;
  empId: string;
}

export interface Product {
  _id?: string;
  productName: string;
  productCode: string;
  description: string;
  staff: Array<Staff>;
}

export interface TempDocument {
  _id: string;
  originDocName: string; // 등록시 문서명
  docName: string; // 변환된 문서명
  docPath: string; // 문서 경로
  thumbnailPath: string; // thumbnail 이미지 경로

  uploadDate: number; // 업로드 날짜
  updateDate: number; // 수정한 날짜
  size: number; // 파일 크기
}

export interface Document {
  _id: string;
  docTitle: string; // 문서 제목
  originDocName: string; // 등록시 문서명
  docName: string; // 변환된 문서명
  docPath: string; // 문서 경로
  thumbnailPath: string; // thumbnail 이미지 경로

  projectId: string; // 깃랩 프로젝트 ID
  productName: string; // 제품명

  uploadDate: number; // 업로드 날짜
  updateDate: number; // 수정한 날짜
  viewCount: number; // 조회수
  size: number; // 파일 크기

  empName: string; // 등록한 직원 이름
  deptPath: string; // 부서
  description: string; // 문서 설명
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
  products(state, payload: Product[]): void {
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
    state.docsByProduct = state.docsByProduct.filter((doc: Document) => {
      return doc._id !== payload;
    });

    console.log('state.docsByProduct ', state.docsByProduct);
  },
};

export const actions: ActionTree<DocState, RootState> = {
  async updateDoc({ commit, rootState, state }, payload: any): Promise<any> {
    let formData;
    let request;
    const selectedDoc = Object.assign({}, state.selectedDoc);
    delete selectedDoc._id;

    selectedDoc.docTitle = payload.data.docTitle;
    selectedDoc.description = payload.data.description;

    console.log('state.selectedDoc :: ', selectedDoc);
    console.log('payload :: ', payload);

    if (payload.isChange) {
      formData = new FormData();
      formData.append('name', payload.file.name);
      formData.append('file', payload.file.files[0]);
      formData.append('data', JSON.stringify(state.selectedDoc));

      request = {
        formData,
      };
    } else {
      request = {
        data: selectedDoc,
      };
    }

    console.log('requestBody :: ', request);

    try {
      const { data } = await this.$axios.post(
        'api/library/document/update/' + state.selectedDoc._id,
        request
      );

      console.log('updateDoc : ', data);

      if (data.success && data.data) {
        console.log('updateDoc : ', data.data);
      }
    } catch (e) {
      console.error(e);
    }
  },

  async registerProduct({ commit }, payload: Product): Promise<any> {
    try {
      const { data } = await this.$axios.post(
        'api/library/document/product',
        payload
      );

      console.log('registerProduct video :: ', data);

      if (data.success && data.data) {
        commit('registerProduct', data.data as Product);
      }
    } catch (e) {
      console.error(e);
    }
  },

  async docProducts({ commit }): Promise<any> {
    try {
      const { data } = await this.$axios.get('api/library/document/products');
      // console.log('docProducts :: ', data);

      if (data.success && data.data) {
        commit('products', data.data as Product[]);
      }
    } catch (e) {
      console.error(e);
    }
  },

  async docDetail({ commit }, payload: string): Promise<any> {
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

  async getDocsByProduct({ commit }, payload: Product): Promise<any> {
    if (payload) {
      // console.log('payload :: ', payload);
      commit('selectedProduct', payload);

      try {
        const { data }: IResponse = await this.$axios.post(
          'api/library/document/list/product',
          {
            productName: payload.productName,
          }
        );

        console.log('getDocsByProduct :: ', data.data);

        if (data.success && data.data) {
          commit('docsByProduct', data.data);
        }
      } catch (e) {
        console.error(e);
      }
    }
  },

  async registerDoc({ commit, state, rootState }, payload: any): Promise<any> {
    const formData = new FormData();
    formData.append('name', payload.file.name);
    formData.append('file', payload.file.files[0]);

    // @ts-ignore
    payload.data.empName = rootState.user.user.name;
    // @ts-ignore
    payload.data.deptPath = rootState.user.user.deptPath;

    console.log('registerDoc payload : ', payload);

    formData.append('data', JSON.stringify(payload.data));

    try {
      const { data } = await this.$axios.post(
        'api/library/document/register',
        formData
      );

      if (data.success && data.data) {
        console.log('Document 등록완료 :: ', data.data);
      } else {
        console.error(data.msg);
      }
    } catch (e) {
      console.error(e);
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
        commit('selectedDoc', data.data);
      } else {
        console.error(data.msg);
      }
    } catch (e) {
      console.error(e);
    }
  },

  async removeDoc({ commit, state }, payload: string): Promise<any> {
    try {
      const { data } = await this.$axios.post(
        'api/library/document/remove/' + payload,
        {
          projectId: state.selectedProduct._id,
        }
      );

      if (data.success) {
        commit('removeDoc', payload);
      } else {
        console.error(data.msg);
      }
    } catch (e) {
      console.error(e);
    }
  },
};

const SELECTED_DOC = (): Document => {
  return {
    _id: '',
    docTitle: '',
    originDocName: '',
    docName: '',
    docPath: '',
    thumbnailPath: '',

    projectId: '',
    productName: '',

    uploadDate: 0,
    updateDate: 0,
    viewCount: 0,
    size: 0,

    empName: '',
    deptPath: '',
    description: '',
  };
};

const SELECTED_TEMP_DOC = (): Document => {
  return {
    _id: '',
    docTitle: '',
    originDocName: '',
    docName: '',
    docPath: '',
    thumbnailPath: '',

    projectId: '',
    productName: '',

    uploadDate: 0,
    updateDate: 0,
    viewCount: 0,
    size: 0,

    empName: '',
    deptPath: '',
    description: '',
  };
};

const SELECTED_PRODUCT = (): Product => {
  return {
    _id: '',
    productName: '',
    productCode: '',
    description: '',
    staff: [],
  };
};