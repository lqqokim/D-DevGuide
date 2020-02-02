import { ActionTree, MutationTree, GetterTree, ActionContext } from 'vuex';
import { RootState } from '@/store';

interface ProductState {
  product: Product;
  productList: Product[];
  projectIdList: Array<number>;
}

interface Response {
  config: object;
  data: any;
  headers: object;
  request: XMLHttpRequest;
  status: number;
  statusText: string;
}

export interface Staff {
  _id?: string;
  empName: string;
  empId: string;
  writeAuthority: boolean;
  mergeAuthority: boolean;
}

export interface Product {
  _id?: string;
  productName: string; // 제품명
  productCode: string; // 제품코드
  description: string; // 제품설명
  apiUse: boolean; // api 섹션 사용 여부
  projectId: number; // gitlab 에 등록되어있는 프로젝트의 ID
  targetBranch: string; // 병합요청 대상 브랜치명
  manualDocPath: string; // 제품 사용법 문서 경로
  APIDocPath: string; // 제품 API 문서 경로
  staffs: Array<Staff>; // 관리자
}

export const state = (): ProductState => ({
  product: {
    productName: '',
    productCode: '',
    description: '',
    apiUse: false,
    projectId: 0,
    targetBranch: '',
    manualDocPath: '',
    APIDocPath: '',
    staffs: [],
  },
  productList: [],
  projectIdList: [],
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
  setCurrentProduct(state, payload: Product): void {
    state.product = payload;
  },
  setProductList(state, payload: Product[]) {
    state.productList = payload;
  },
  setProjectIdList(state, payload: Array<number>) {
    state.projectIdList = payload;
  },
};

export const actions: ActionTree<ProductState, RootState> = {
  async registerProduct(
    { commit, state, dispatch },
    payload: Product
  ): Promise<any> {
    try {
      const { data } = await this.$axios.post(
        'api/docs/product/productRegister',
        payload
      );

      console.log(data.data);
      console.log(state.productList);
      if (data.success && data.data) {
        await dispatch(
          'common/alert',
          {
            type: 'check',
            isShow: true,
            msg: '제품이 등록되었습니다.',
          },
          { root: true }
        );
      } else {
        await dispatch(
          'common/alert',
          {
            type: 'warning',
            isShow: true,
            msg: '제품이 등록되지 않았습니다.',
          },
          { root: true }
        );
      }
    } catch (err) {
      console.error(err);
    }
  },
  async updateProduct({ commit, dispatch }, payload: Product): Promise<any> {
    try {
      const { data } = await this.$axios.post(
        'api/docs/product/productUpdate/' + payload._id,
        payload
      );

      if (data.success && data.data) {
        await dispatch(
          'common/alert',
          {
            type: 'check',
            isShow: true,
            msg: '제품이 수정되었습니다.',
          },
          { root: true }
        );
      } else {
        await dispatch(
          'common/alert',
          {
            type: 'warning',
            isShow: true,
            msg: '제품이 수정되지 않았습니다.',
          },
          { root: true }
        );
      }
    } catch (err) {
      console.error(err);
    }
  },

  removeProduct({ commit, state, dispatch }, payload: Product): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        console.log(payload._id);
        const { data } = await this.$axios.delete(
          'api/docs/product/productRemove/' + payload._id
        );

        await dispatch('getProductList');
        resolve(data);
        // if (data.success && data.data) {
        //   // commit('products', data.data as Product);
        //   commit('selectedManageProduct', data.data[0]);
        // }
      } catch (e) {
        reject(e);
      }
    });
  },

  async selectProduct(
    { commit },
    payload: {
      productCode: string;
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
      const product: Response = await this.$axios.get(
        'api/docs/product/productSelect',
        {
          params: {
            selectedProjectId: productData.data.projectId,
          },
        }
      );
      commit('setCurrentProduct', product.data[0]);
    } catch (err) {
      console.error(err);
    }
  },

  async getProductList({ commit }): Promise<any> {
    try {
      const productList: Response = await this.$axios.get(
        'api/docs/product/productList'
      );
      commit('setProductList', productList.data);
    } catch (err) {
      console.error(err);
    }
  },
  async getProjectIdList(
    { commit },
    payload: { gitlabToken: string }
  ): Promise<any> {
    try {
      const projectList: Response = await this.$axios.get(
        'api/docs/product/getProjectIdList',
        { params: { gitlabToken: payload.gitlabToken } }
      );
      const projectIdList: Array<number> = [];
      projectList.data.forEach((project) => {
        projectIdList.push(project.id);
      });
      commit('setProjectIdList', projectIdList);
    } catch (err) {
      console.error(err);
    }
  },
};
