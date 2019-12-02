import { ActionTree, MutationTree, GetterTree, ActionContext } from 'vuex';
import { RootState } from '@/store';

export const namespaced: boolean = true;

export interface DownloadState {
  filesByProduct: Array<File>;
  selectedFile: File;
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

export interface File {
  _id?: string;
  fileTitle: string; // 문서 제목
  originFileName: string; // 등록시 문서명
  fileName: string; // 변환된 문서명
  filePath: string; // 문서 경로

  projectId: string; // 깃랩 프로젝트 ID
  productName: string; // 제품명

  uploadDate: number; // 업로드 날짜
  updateDate: number; // 수정한 날짜
  downloadCount: number; // 조회수
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

export const state = (): DownloadState => ({
  filesByProduct: [],
  selectedFile: SELECTED_FILE(),
  selectedProduct: SELECTED_PRODUCT(),
  products: [],
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
  products(state, payload: Product[]): void {
    state.products = payload;
  },
  initState(state, payload: string): void {
    if (payload === 'selectedFile') {
      state.selectedFile = SELECTED_FILE();
    }
  },
};

export const actions: ActionTree<DownloadState, RootState> = {
  async registerProduct({ commit }, payload: Product): Promise<any> {
    try {
      const { data } = await this.$axios.post(
        'api/library/download/product',
        payload
      );

      console.log('[download] registerProduct :: ', data);

      if (data.success && data.data) {
        commit('registerProduct', data.data as Product);
      }
    } catch (e) {
      console.error(e);
    }
  },
  async downloadProducts({ commit }): Promise<any> {
    try {
      const { data } = await this.$axios.get('api/library/download/products');

      if (data.success && data.data) {
        commit('products', data.data as Product[]);
      }
    } catch (e) {
      console.error(e);
    }
  },
  async registerFile({ commit }, payload: any): Promise<any> {
    console.log('download action :: ', payload);

    const formData = new FormData();
    formData.append('name', payload.file.name);
    formData.append('file', payload.file.files[0]);
    formData.append('data', JSON.stringify(payload.data));

    try {
      const { data } = await this.$axios.post(
        'api/library/download/register',
        formData
      );

      console.log('datadatadata ', data);

      if (data.success && data.data) {
        console.log('[Download] 등록완료 :: ', data.data);
      } else {
        console.error(data.msg);
      }
    } catch (e) {
      console.error(e);
    }
  },
};

const SELECTED_FILE = (): File => {
  return {
    _id: '',
    fileTitle: '',
    originFileName: '',
    fileName: '',
    filePath: '',

    projectId: '',
    productName: '',

    uploadDate: 0,
    updateDate: 0,
    downloadCount: 0,
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
