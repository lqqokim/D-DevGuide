import { ActionTree, MutationTree, GetterTree, ActionContext } from 'vuex';
import { RootState } from '@/store';

interface ProductState {
  product: Product;
  productList: [];
}

export interface Product {
  productType: string; // 제품군
  productName: string; // 제품명
  productDescription: string; // 제품설명
  projectId: string; // gitlab 에 등록되어있는 프로젝트의 ID
  targetBranch: string; // 병합요청 대상 브랜치명
  manualDocPath: string; // 제품 사용법 문서 경로
  APIDocPath: string; // 제품 API 문서 경로
  attachmentFilePath: string; // 첨부파일경로
}

export const state = (): ProductState => ({
  product: {
    productType: '',
    productName: '',
    productDescription: '',
    projectId: '',
    targetBranch: '',
    manualDocPath: '',
    APIDocPath: '',
    attachmentFilePath: '',
  },
  productList: [],
});

export const namespaced: boolean = true;

export const getters: GetterTree<ProductState, RootState> = {
  getCurrentProduct(state) {
    return state.product;
  },
  wholeProductList(state) {
    return state.productList;
  },
};

export const mutations: MutationTree<ProductState> = {
  setCurrentProduct(state, payload: Product) {
    state.product = payload;
  },
  setProductList(state, payload: []) {
    state.productList = payload;
  },
};

export const actions: ActionTree<ProductState, RootState> = {
  async setProduct(
    { commit },
    payload: {
      productType: string;
      productName: string;
      productDescription: string;
      projectId: string;
      targetBranch: string;
      manualDocPath: string;
      APIDocPath: string;
      attachmentFilePath: string;
    }
  ) {
    try {
      await this.$axios
        .post('api/productRegister', {
          productType: payload.productType,
          productName: payload.productName,
          productDescription: payload.productDescription,
          projectId: payload.projectId,
          targetBranch: payload.targetBranch,
          manualDocPath: payload.manualDocPath,
          APIDocPath: payload.APIDocPath,
          attachmentFilePath: payload.attachmentFilePath,
        })
        .then((res) => {
          this.$router.push('/docs');
        });
    } catch (err) {
      console.error(err);
    }
  },
  async getProductList({ commit }) {
    try {
      await this.$axios.get('api/productList').then((res) => {
        commit('setProductList', res.data);
      });
    } catch (err) {
      console.error(err);
    }
  },
};
