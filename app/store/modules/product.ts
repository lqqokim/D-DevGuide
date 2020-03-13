import { ActionTree, MutationTree, GetterTree, ActionContext } from 'vuex';
import { RootState } from '@/store';
import { ALERT_TYPE } from '~/store/modules/common';

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
  index?: number;
  productName: string; // 제품명
  productCode: string; // 제품코드
  description: string; // 제품설명
  apiUse: boolean; // api 섹션 사용 여부
  projectId: string; // gitlab 에 등록되어있는 프로젝트의 ID
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
    projectId: '',
    targetBranch: '',
    manualDocPath: '',
    APIDocPath: '',
    staffs: [],
    _id: '',
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

      let manualDocPath = payload.manualDocPath;
      if (manualDocPath.charAt(0) === '/') {
        payload.manualDocPath = manualDocPath.substring(
          1,
          manualDocPath.length
        );
      }
      manualDocPath = payload.manualDocPath;
      if (manualDocPath.charAt(manualDocPath.length - 1) === '/') {
        payload.manualDocPath = manualDocPath.substring(
          0,
          manualDocPath.length - 1
        );
      }

      let apiDocPath = payload.APIDocPath;
      if (apiDocPath.charAt(0) === '/') {
        payload.APIDocPath = apiDocPath.substring(1, apiDocPath.length);
      }
      apiDocPath = payload.APIDocPath;
      if (apiDocPath.charAt(apiDocPath.length - 1) === '/') {
        payload.APIDocPath = apiDocPath.substring(0, apiDocPath.length - 1);
      }

      const { data } = await this.$axios.post(
        'api/docs/product/productRegister',
        payload
      );

      // 문서 기본 경로에 index.md 파일 생성
      await this.$axios.post('api/docs/repository/createFile', {
        projectId: payload.projectId,
        filePath:
          payload.manualDocPath === ''
            ? 'index.md'
            : payload.manualDocPath + '/index.md',
        ref: payload.targetBranch,
        commitMessage: 'create index markdown file',
      });

      // API 기본 경로에 index.md 파일 생성
      if (payload.apiUse && payload.manualDocPath !== payload.APIDocPath) {
        await this.$axios.post('api/docs/repository/createFile', {
          projectId: payload.projectId,
          filePath:
            payload.APIDocPath === ''
              ? 'index.md'
              : payload.APIDocPath + '/index.md',
          ref: payload.targetBranch,
          commitMessage: 'create index markdown file',
        });
      }

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
      await dispatch('getProductList');
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
      // error 가 나면 이후 코드를 실행하지 않기 위해 throw error 를 해줌
      throw new Error(e.response.data.msg);
    }
  },
  async updateProduct({ commit, dispatch }, payload: Product): Promise<any> {
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

      let manualDocPath = payload.manualDocPath;
      if (manualDocPath.charAt(0) === '/') {
        payload.manualDocPath = manualDocPath.substring(
          1,
          manualDocPath.length
        );
      }
      manualDocPath = payload.manualDocPath;

      if (manualDocPath.charAt(manualDocPath.length - 1) === '/') {
        payload.manualDocPath = manualDocPath.substring(
          0,
          manualDocPath.length - 1
        );
      }
      let apiDocPath = payload.APIDocPath;
      if (apiDocPath.charAt(0) === '/') {
        payload.APIDocPath = apiDocPath.substring(1, apiDocPath.length);
      }
      apiDocPath = payload.APIDocPath;
      if (apiDocPath.charAt(apiDocPath.length - 1) === '/') {
        payload.APIDocPath = apiDocPath.substring(0, apiDocPath.length - 1);
      }

      const currentProductData = await this.$axios.get(
        'api/docs/product/getCurrentProductData',
        {
          params: {
            _id: payload._id,
          },
        }
      );

      // productCode 가 변경되었을 때 version, notice 의 productCode 도 함께 수정
      if (currentProductData.data.productCode !== payload.productCode) {
        await this.$axios.post('api/docs/version/updateVersion', {
          prevProductCode: currentProductData.data.productCode,
          changingProductCode: payload.productCode,
        });

        await this.$axios.post('api/docs/notice/updateNotice', {
          prevProductCode: currentProductData.data.productCode,
          changingProductCode: payload.productCode,
        });
      }

      const { data } = await this.$axios.post(
        'api/docs/product/productUpdate/' + payload._id,
        payload
      );

      // 문서 기본 경로에 index.md 파일 생성
      await this.$axios.post('api/docs/repository/createFile', {
        projectId: payload.projectId,
        filePath:
          payload.manualDocPath === ''
            ? 'index.md'
            : payload.manualDocPath + '/index.md',
        ref: payload.targetBranch,
        commitMessage: 'create index markdown file',
      });

      // API 기본 경로에 index.md 파일 생성
      if (payload.apiUse && payload.manualDocPath !== payload.APIDocPath) {
        await this.$axios.post('api/docs/repository/createFile', {
          projectId: payload.projectId,
          filePath:
            payload.APIDocPath === ''
              ? 'index.md'
              : payload.APIDocPath + '/index.md',
          ref: payload.targetBranch,
          commitMessage: 'create index markdown file',
        });
      }

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
      await dispatch('getProductList');
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
      // error 가 나면 이후 코드를 실행하지 않기 위해 throw error 를 해줌
      throw new Error(e.response.data.msg);
    }
  },

  // 제품 목록 수정
  async updateProductsIndex(
    { commit, dispatch },
    payload: Product[]
  ): Promise<any> {
    try {
      const { data } = await this.$axios.put(
        'api/docs/product/updateProductsIndex',
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

  removeProduct({ commit, state, dispatch }, payload: Product): Promise<any> {
    return new Promise(async (resolve, reject) => {
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
          'api/docs/product/productRemove/' + payload._id
        );

        await dispatch('getProductList');

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
        resolve(data);
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
        // error 가 나면 이후 코드를 실행하지 않기 위해 throw error 를 해줌
        throw new Error(e.response.data.msg);
        // reject(e);
      }
    });
  },

  async selectProduct(
    { commit, dispatch },
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
      // error 가 나면 이후 코드를 실행하지 않기 위해 throw error 를 해줌
      throw new Error(e.response.data.msg);
    }
  },

  async getProductList({ commit, dispatch }): Promise<any> {
    try {
      const { data } = await this.$axios.get('api/docs/product/productList');

      if (data.success && data.data) {
        await commit('setProductList', data.data);
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
      // error 가 나면 이후 코드를 실행하지 않기 위해 throw error 를 해줌
      throw new Error(e.response.data.msg);
    }
  },
  // async getProjectIdList(
  //   { commit },
  //   payload: { gitlabToken: string }
  // ): Promise<any> {
  //   try {
  //     const { data } = await this.$axios.get(
  //       'api/docs/product/getProjectIdList',
  //       { params: { gitlabToken: payload.gitlabToken } }
  //     );
  //     const projectIdList: Array<number> = [];
  //
  //     data.data.forEach((project) => {
  //       projectIdList.push(project.id);
  //     });
  //     commit('setProjectIdList', projectIdList);
  //   } catch (e) {
  //     console.error(e);
  //   }
  // },
  checkProjectInfo(
    { commit, dispatch },
    payload: { gitlabToken: string; projectId: string }
  ): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        if (!payload.gitlabToken) {
          return;
        }

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
        dispatch(
          'common/alert',
          {
            type: ALERT_TYPE.ERROR,
            isShow: true,
            msg: `[${e.response.status}] ${e.response.data.msg}`,
          },
          { root: true }
        );
        reject(e);
      }
    });
  },
};
