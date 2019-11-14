import { ActionTree, MutationTree, GetterTree, ActionContext } from 'vuex';
import { RootState } from '@/store';

export interface VideoState {
  videosByProduct: Array<Video>; // 자료실 메인화면 제품에 대한 동영상 목록
}

export interface SeriesVideo {
  _id: string;
  videoTitle: string; // 동영상 제목
  youtubeId: string; // youtube ID
  thumbnail: string; // thumbnail
  uploadDate: Date; // 업로드날짜
  updateDate: Date; // 수정한 날짜
  playTime: number; // 재생시간
  viewCount: number; // 조회수
}

export interface Video {
  _id: string; // 유니크 값
  videoTitle?: string; // 동영상 제목
  youtubeId: string; // youtube ID
  thumbnail: string; // thumbnail
  productType: string; // 제품군 이름

  uploadDate: Date; // 업로드한 날짜
  updateDate: Date; // 수정한 날짜
  playTime: number; // 재생시간
  viewCount: number; // 조회수

  empName: string; // 등록한 직원 이름
  depthPath: string; // 부서
  description: string; // 동영상 설명

  isSeries: boolean; // single, series
  seriesTitle?: string; // 시리즈의 타이틀
  series?: Array<SeriesVideo>; // series 내 video 목록
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
});

export const namespaced: boolean = true;

export const getters: GetterTree<VideoState, RootState> = {};

export const mutations: MutationTree<VideoState> = {
  setVideosByProduct(state, payload): void {
    state.videosByProduct = payload;
  },
};

export const actions: ActionTree<VideoState, RootState> = {
  async getVideosByProduct({ commit }, payload: string): Promise<any> {
    try {
      const videoListRes = await this.$axios.get(
        'api/library/video/list/' + payload
      );

      console.log('videoListRes :: ', videoListRes.data);
      commit('setVideosByProduct', videoListRes.data.data);
    } catch (e) {
      console.error(e);
    }
  },

  async registerVideo({ commit }, payload: Video): Promise<any> {
    try {
      const videoRegisterRes = await this.$axios.post(
        'api/library/video/register',
        payload
      );

      console.log('videoRegisterRes :: ', videoRegisterRes);
    } catch (e) {
      console.error(e);
    }
  },
};
