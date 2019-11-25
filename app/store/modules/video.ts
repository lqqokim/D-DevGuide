import { ActionTree, MutationTree, GetterTree, ActionContext } from 'vuex';
import { RootState } from '@/store';
import { Product } from '@/store/modules/projects';

export const namespaced: boolean = true;

export interface VideoState {
  videosByProduct: Array<Video>; // 자료실 메인화면 제품에 대한 동영상 목록
  selectedVideo: Video;
  selectedProduct: Product;
}

export interface Video {
  _id: string;
  videoTitle?: string; // 동영상 제목
  youtubeId: string; // youtube ID
  projectId: string; // 깃랩 프로젝트 ID
  productName: string; // 제품명

  uploadDate: number; // 업로드날짜
  updateDate: number; // 수정한 날짜
  playTime: number; // 재생시간
  viewCount: number; // 조회수

  empName: string; // 등록한 직원 이름
  depthPath: string; // 부서
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
});

export const getters: GetterTree<VideoState, RootState> = {
  selectedVideo(state) {
    if (state.selectedVideo.isSeries) {
      return state.selectedVideo.series[0];
    } else {
      return state.selectedVideo;
    }
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
    console.log('payload :: ', payload);
    state.selectedVideo = payload;
  },
};

export const actions: ActionTree<VideoState, RootState> = {
  async getVideosByProduct({ commit }, payload: Product | any): Promise<any> {
    if (payload) {
      commit('selectedProduct', payload);

      try {
        const { data } = await this.$axios.get(
          'api/library/video/list/product/' + payload.projectId
        );

        console.log('getVideosByProduct :: ', data);

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
        console.log('selectedVideo :: ', data);
        commit('selectedVideo', data.data as Video);
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
          projectId: state.selectedProduct.projectId,
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
};

const SELECTED_VIDEO = (): Video => {
  return {
    _id: '',
    videoTitle: '',
    youtubeId: '',
    projectId: '',
    productName: '',

    uploadDate: 0,
    updateDate: 0,
    playTime: 0,
    viewCount: 0,

    empName: '',
    depthPath: '',
    description: '',

    isSeries: false,
    seriesTitle: '',
    series: [],
  };
};

const SELECTED_PRODUCT = (): Product => {
  return {
    productType: '',
    productName: '',
    productDescription: '',
    projectId: '',
    targetBranch: '',
    manualDocPath: '',
    APIDocPath: '',
    attachmentFilePath: '',
  };
};
