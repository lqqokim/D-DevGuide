import { ActionTree, MutationTree, GetterTree, ActionContext } from 'vuex';
import { RootState } from '@/store';
// import { Product } from '@/store/modules/projects';

export const namespaced: boolean = true;

export interface VideoState {
  videosByProduct: Array<Video>; // 자료실 메인화면 제품에 대한 동영상 목록
  selectedVideo: Video;
  selectedProduct: Product;
  products: Array<Product>;
  selectedManageProduct: Product;
  selectedManageProductStaffs: Array<Staff>;
  seriesVideos: Array<Video>; // 시리즈 내 동영상 목록
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

export interface Video {
  _id: string;
  videoTitle?: string; // 동영상 제목
  groupId?: string; // 시리즈 그룹 아이디
  youtubeId: string; // youtube ID
  productCode: string; // 제품 코드
  productName: string; // 제품명

  uploadDate: number; // 업로드날짜
  updateDate: number; // 수정한 날짜
  playTime: number; // 재생시간
  viewCount: number; // 조회수

  empName: string; // 등록한 직원 이름
  deptPath: string; // 부서
  description?: string; // 동영상 설명

  isSeries: boolean; // single, series
  seriesTitle: string; // 시리즈의 타이틀
  series: Array<this>; // series 내 video 목록
}

interface IResponse {
  config: object;
  data: any;
  headers: object;
  request: XMLHttpRequest;
  status: number;
  statusText: string;
}

export const state = (): VideoState => ({
  videosByProduct: [],
  selectedVideo: SELECTED_VIDEO(),
  selectedProduct: SELECTED_PRODUCT(),
  products: [],
  selectedManageProduct: SELECTED_MANAGE_PRODUCT(),
  selectedManageProductStaffs: [],
  seriesVideos: [],
});

export const getters: GetterTree<VideoState, RootState> = {
  selectedVideo(state) {
    return state.selectedVideo;
  },
};

export const mutations: MutationTree<VideoState> = {
  videosByProduct(state, payload: Video[]): void {
    state.videosByProduct = payload;
  },
  selectedProduct(state, payload: Product): void {
    state.selectedProduct = payload;
  },
  selectedVideo(state, payload: Video): void {
    console.log('selectedVideo mu : ', payload);
    state.selectedVideo = payload;
  },
  products(state, payload: Array<Product>): void {
    state.products = payload;
  },
  registerProduct(state, payload: Product): void {
    state.products.push(payload);
  },
  selectedManageProduct(state, payload): void {
    state.selectedManageProduct = Object.assign({}, payload);
  },
  selectedManageProductStaffs(state, payload): void {
    state.selectedManageProductStaffs = payload.slice();
  },
  removeSelectedManageProductStaff(state, payload): void {
    state.selectedManageProductStaffs = state.selectedManageProductStaffs.filter(
      (staff) => {
        return staff._id !== payload._id;
      }
    );
  },
  seriesVideos(state, payload): void {
    state.seriesVideos = payload.f;
  },
  initState(state, payload: string): void {
    if (payload === 'selectedVideo') {
      state.selectedVideo = SELECTED_VIDEO();
    }
  },
};

export const actions: ActionTree<VideoState, RootState> = {
  async registerProduct({ commit }, payload: Product): Promise<any> {
    if (payload && payload._id) {
      delete payload._id;
    }

    try {
      const { data } = await this.$axios.post(
        'api/library/video/product',
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

  async removeProduct({ commit, state }): Promise<any> {
    try {
      const { data } = await this.$axios.delete(
        'api/library/video/remove/product/' +
          state.selectedManageProduct.productCode
      );

      console.log('removeProduct video :: ', data);

      if (data.success && data.data) {
        commit('products', data.data as Product);
        commit('selectedManageProduct', data.data[0]);
      }
    } catch (e) {
      console.error(e);
    }
  },

  async videoProducts({ commit }): Promise<any> {
    try {
      const { data } = await this.$axios.get('api/library/video/products');

      if (data.success && data.data) {
        commit('products', data.data as Product[]);
      }
    } catch (e) {
      console.error(e);
    }
  },

  async getVideosByProduct({ commit }, payload: Product | any): Promise<any> {
    if (payload) {
      commit('selectedProduct', payload);

      try {
        const { data } = await this.$axios.get(
          'api/library/video/list/product/' + payload.productCode
        );

        // console.log('getVideosByProduct :: ', data);

        if (data.success && data.data) {
          commit('videosByProduct', data.data);
        }
      } catch (e) {
        console.error(e);
      }
    }
  },

  async videoDetailById({ commit }, payload: string): Promise<any> {
    try {
      const { data } = await this.$axios.get('api/library/video/' + payload);

      if (data.success && data.data) {
        let selectedVideo;
        if (data.data.isSeries) {
          selectedVideo = data.data.series[0];
          commit('seriesVideos', data.data.series[0]);
        } else {
          selectedVideo = data.data;
        }

        commit('selectedVideo', selectedVideo as Video);
      }
    } catch (e) {
      console.error(e);
    }
  },

  async registerVideo({ commit }, payload: Video): Promise<any> {
    try {
      const { data } = await this.$axios.post(
        'api/library/video/register',
        payload
      );

      console.log('videoRegisterRes :: ', data);
    } catch (e) {
      console.error(e);
    }
  },

  async removeVideo({ commit, state }, payload: string): Promise<any> {
    try {
      const { data } = await this.$axios.post(
        'api/library/video/remove/' + payload,
        {
          productCode: state.selectedProduct.productCode,
        }
      );

      if (data.success && data.data) {
        commit('videosByProduct', data.data);
      } else {
        console.error(data.msg);
      }
    } catch (e) {
      console.error(e);
    }
  },

  async registerStaffs({ commit, state }, payload: Array<Staff>): Promise<any> {
    try {
      const { data } = await this.$axios.post(
        'api/library/video/register/staffs/' +
          state.selectedManageProduct.productCode,
        state.selectedManageProductStaffs
      );

      console.log('registerStaffs ', data.data);

      if (data.success && data.data) {
        // commit('videosByProduct', data.data);
      } else {
        console.error(data.msg);
      }
    } catch (e) {
      console.error(e);
    }
  },

  // async removeStaff({ commit, state }, payload: Staff): Promise<any> {
  //   if (!payload._id) {
  //     commit('removeSelectedManageProductStaff', payload);
  //     return;
  //   }
  //
  //   try {
  //     const { data } = await this.$axios.post(
  //       'api/library/video/remove/staff/' +
  //         state.selectedManageProduct.productCode +
  //         '/' +
  //         payload._id
  //     );
  //
  //     console.log('removeStaff ', data.data);
  //
  //     if (data.success && data.data) {
  //       commit('removeSelectedManageProductStaff', payload);
  //     } else {
  //       console.error(data.msg);
  //     }
  //   } catch (e) {
  //     console.error(e);
  //   }
  // },
};

const SELECTED_VIDEO = (): Video => {
  return {
    _id: '',
    videoTitle: '',
    youtubeId: '',
    productCode: '',
    productName: '',

    uploadDate: 0,
    updateDate: 0,
    playTime: 0,
    viewCount: 0,

    empName: '',
    deptPath: '',
    description: '',

    isSeries: false,
    seriesTitle: '',
    series: [],
  };
};

const SELECTED_MANAGE_PRODUCT = (): Product => {
  return {
    productName: '',
    productCode: '',
    description: '',
    staff: [],
  };
};

const SELECTED_PRODUCT = (): Product => {
  return {
    productName: '',
    productCode: '',
    description: '',
    staff: [],
  };
};
