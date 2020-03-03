import { ActionTree, MutationTree, GetterTree, ActionContext } from 'vuex';
import { RootState } from '@/store';
import { IAlert, ALERT_TYPE } from '~/store/modules/common';

export const namespaced: boolean = true;
const API_KEY = 'AIzaSyCrI0kwNS07VIBB006Rhu5WuI-9hZPoYD4';

export interface VideoState {
  videosByProduct: Array<IVideo>; // 자료실 메인화면 제품에 대한 동영상 목록
  selectedVideo: IVideo;
  selectedProduct: IProduct;
  products: Array<IProduct>;
  selectedManageProduct: IProduct;
  selectedManageProductStaffs: Array<IStaff>;
  selectedVideoSeries: Array<IVideo>; // 시리즈 내 동영상 목록
  selectedVideoInSeries: IVideo; // 시리즈 내 동영상 목록 진입시 사용
  managedVideos: Array<IVideo> | Array<string>;
  videoDefaultParams: ListParams;
  totalSize: number;
  videoAllByProduct: IVideo[];
  searchVideosResult: ISearchVideosResult[];
  ytbThumbnailQuality: string;
}

export interface ListParams {
  skip: number;
  limit: number;
  sort: string;
}

export interface IStaff {
  _id: string;
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
  managedVideos: IVideo[];
  staffs: Array<IStaff>;
}

export interface IVideo {
  _id: string;
  videoTitle: string; // 동영상 제목
  groupId?: string; // 시리즈 그룹 아이디
  youtubeId: string; // youtube ID
  productCode: string; // 제품 코드
  productName: string; // 제품명

  uploadDate: number; // 업로드날짜
  updateDate: number; // 수정한 날짜
  playTime: string; // 재생시간
  viewCount: number; // 조회수

  empId: string; // 등록한 직원 아이디
  empName: string; // 등록한 직원 이름
  deptPath: string; // 부서
  description?: string; // 동영상 설명

  isSeries: boolean; // single, series
  seriesTitle: string; // 시리즈의 타이틀
  series: Array<this>; // series 내 video 목록,
}

// 동영상 검색 결과
export interface ISearchVideosResult {
  productName: string;
  searchData: IVideo[];
}

interface IResponse {
  config: object;
  data: any;
  headers: object;
  request: XMLHttpRequest;
  status: number;
  statusText: string;
}

export interface IThumbnailQuality {
  maxresdefault: string;
  sddefault: string;
  hqdefault: string;
  default: string;
}

const ytbThumbnailQualityTypes: IThumbnailQuality = {
  maxresdefault: 'maxresdefault', // 최대 해상도 썸네일(1920x1080): 없는 경우가 있다.
  sddefault: 'sddefault', // 표준형 썸네일(640x480)
  hqdefault: 'hqdefault', // 고품질 썸네일(480x360)
  default: 'default', // 보통품질 썸네일(120x90)
};

export const state = (): VideoState => ({
  videosByProduct: [],
  selectedVideo: SELECTED_VIDEO(),
  selectedProduct: SELECTED_PRODUCT(),
  products: [],
  selectedManageProduct: SELECTED_MANAGE_PRODUCT(),
  selectedManageProductStaffs: [],
  selectedVideoSeries: [],
  selectedVideoInSeries: SELECTED_VIDEO(),
  managedVideos: [],
  videoDefaultParams: VIDE0_DEFAULT_PARAMS(),
  totalSize: 0,
  videoAllByProduct: [],
  searchVideosResult: [],
  ytbThumbnailQuality: ytbThumbnailQualityTypes.sddefault,
});

export const getters: GetterTree<VideoState, RootState> = {
  selectedVideo(state) {
    return state.selectedVideo;
  },
};

export const mutations: MutationTree<VideoState> = {
  videosByProduct(state, payload: IVideo[]): void {
    state.videosByProduct = payload;
  },
  selectedProduct(state, payload: IProduct): void {
    state.selectedProduct = payload;
  },
  selectedVideo(state, payload: IVideo): void {
    if (payload.isSeries && !payload.youtubeId) {
      state.selectedVideoInSeries = Object.assign({}, payload);
    }

    state.selectedVideo = Object.assign({}, payload);
  },
  products(state, payload: Array<IProduct>): void {
    state.products = payload;
  },
  registerProduct(state, payload: IProduct): void {
    state.products.push(payload);
  },
  selectedManageProduct(state, payload: IProduct): void {
    state.selectedManageProduct = Object.assign({}, payload);
  },
  selectedManageProductStaffs(state, payload): void {
    state.selectedManageProductStaffs = payload;
  },
  removeSelectedManageProductStaff(state, payload): void {
    state.selectedManageProductStaffs = state.selectedManageProductStaffs.filter(
      (staff) => {
        return staff._id !== payload._id;
      }
    );
  },
  selectedVideoSeries(state, payload): void {
    state.selectedVideoSeries = payload;
  },
  initState(state, payload: string): void {
    if (payload === 'selectedVideo') {
      state.selectedVideo = SELECTED_VIDEO();
    } else if (payload === 'selectedVideoSeries') {
      state.selectedVideoSeries = [];
    }
  },
  managedVideos(state, payload): void {
    state.managedVideos = payload;
  },
  totalSize(state, payload): void {
    state.totalSize = payload;
  },
  videoAllByProduct(state, payload): void {
    state.videoAllByProduct = payload;
  },
  countIncrement(state) {
    if (state.selectedVideo) {
      if (state.selectedVideo.isSeries && !state.selectedVideo.groupId) {
        state.selectedVideo.series[0].viewCount++;
      } else {
        state.selectedVideo.viewCount++;
      }
    }
  },
  searchVideosResult(state, payload): void {
    const newSearchResult: Array<any> = [];

    payload.searchResults.forEach((searchResult) => {
      // if (searchResult.isSeries) {
      //   searchResult.seriesTitle = searchResult.seriesTitle
      //     .split(payload.searchWord)
      //     .join('<em>' + payload.searchWord + '</em>');
      // } else {
      //   searchResult.videoTitle = searchResult.videoTitle
      //     .split(payload.searchWord)
      //     .join('<em>' + payload.searchWord + '</em>');
      // }
      // searchResult.description = searchResult.description
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

    state.searchVideosResult = newSearchResult;
  },
};

export const actions: ActionTree<VideoState, RootState> = {
  async updateVideoCount({ commit, state }, payload: string) {
    try {
      const { data } = await this.$axios.post(
        'api/library/video/count/' + payload
      );

      // console.log('[updateVideoCount] ', data);

      if (data.success) {
        commit('countIncrement');
      }
    } catch (e) {
      console.error(e);
    }
  },

  async videoAllByProduct({ commit }, payload: string): Promise<any> {
    try {
      const { data } = await this.$axios.get(
        'api/library/video/all/' + payload
      );

      if (data.success && data.data) {
        commit('videoAllByProduct', data.data as IVideo[]);
      }
    } catch (e) {
      console.error(e);
    }
  },

  async updateManagedVideos(
    { commit, dispatch },
    payload: { productId: string; managedVideos: Array<IVideo> }
  ): Promise<any> {
    try {
      const { data } = await this.$axios.post(
        'api/library/video/updateManagedVideo/' + payload.productId,
        payload.managedVideos
      );

      if (data.success && data.data) {
        await dispatch('videoProducts');
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
        'api/library/video/product',
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

      await dispatch('videoProducts');
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

      const { data } = await this.$axios.post(
        'api/library/video/product/update/' + payload._id,
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

      await dispatch('videoProducts');
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

  // 제품 목록 수정
  async updateProducts(
    { commit, dispatch },
    payload: IProduct[]
  ): Promise<any> {
    if (!payload.length) {
      return;
    }

    // managedVideo _id 추출 (for request large )
    payload.map((product) => {
      // @ts-ignore
      product.managedVideos = product.managedVideos.map(
        (video: IVideo) => video._id
      );
    });

    try {
      const { data } = await this.$axios.put(
        'api/library/video/products',
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
          msg: e,
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
        'api/library/video/remove/product/' + payload._id
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

      await dispatch('videoProducts');
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

  async videoProducts({ commit, state }): Promise<any> {
    try {
      const { data } = await this.$axios.get('api/library/video/products');

      if (data.success && data.data) {
        await commit('products', data.data as IProduct[]);

        if (!state.selectedProduct._id) {
          commit('selectedProduct', data.data[0]);
        }
      }
    } catch (e) {
      console.error(e);
    }
  },

  async productByCode({ commit }, payload: string): Promise<any> {
    try {
      const { data } = await this.$axios.get(
        'api/library/video/product/' + payload
      );

      if (data.success && data.data) {
        commit('selectedProduct', data.data as IProduct);
      }
    } catch (e) {
      console.error(e);
    }
  },

  async searchVideos(
    { commit, dispatch },
    payload: { searchWord: string }
  ): Promise<any> {
    try {
      // Loading Alert
      dispatch(
        'common/alert',
        {
          type: ALERT_TYPE.LOADING,
          isShow: true,
          msg: '검색 중입니다.',
        },
        { root: true }
      );

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

      const { data } = await this.$axios.get('api/library/video/searchVideos', {
        params: { searchWord: searchWordParam },
      });

      if (data.success && data.data) {
        await commit('searchVideosResult', {
          searchResults: data.data,
          searchWord: payload.searchWord,
        });
      }
    } catch (e) {
      console.error(e);
    }
  },

  async getVideosByProduct(
    { commit, state },
    payload: { data: IProduct; params: ListParams }
  ): Promise<any> {
    if (payload.data) {
      commit('selectedProduct', payload.data);

      try {
        const { data } = await this.$axios.get(
          'api/library/video/list/' + payload.data.productCode,
          {
            params: payload.params ? payload.params : state.videoDefaultParams,
          }
        );

        // console.log('getVideosByProduct :: ', data);

        if (data.success && data.data) {
          await commit('videosByProduct', data.data.result);
          await commit('managedVideos', data.data.result.slice().splice(0, 5));
          await commit('totalSize', data.data.total);
        }
      } catch (e) {
        console.error(e);
      }
    }
  },

  async videoDetailById({ commit, dispatch }, payload: string): Promise<any> {
    try {
      const { data } = await this.$axios.get('api/library/video/' + payload);

      if (data.success && data.data) {
        await commit('selectedVideo', data.data as IVideo);

        if (data.data.isSeries && !data.data.youtubeId) {
          await commit('selectedVideoSeries', data.data.series);
        }
      }
    } catch (e) {
      console.error(e);
    }
  },

  async createVideo(
    { commit, dispatch, state, rootState },
    payload: IVideo
  ): Promise<any> {
    const deptPathSplit = rootState.user.user.deptPath.split('|');
    const request: IVideo = {
      _id: '',
      videoTitle: payload.videoTitle,
      youtubeId: payload.isSeries ? '' : payload.youtubeId,
      productName: payload.productName,
      productCode: payload.productCode,
      uploadDate: 0,
      updateDate: 0,
      playTime: '',
      viewCount: 0,

      empId: rootState.user.user.loginId,
      empName: rootState.user.user.name,
      deptPath: deptPathSplit[deptPathSplit.length - 2],
      description: payload.description,

      isSeries: payload.isSeries,
      seriesTitle: payload.isSeries ? payload.seriesTitle : '',
      series: payload.isSeries ? payload.series : [],
    };

    if (!payload.isSeries) {
      await playTime(request.youtubeId).then((res) => {
        request.playTime = res;
      });
    } else {
      // request.series.map(async (video) => {
      //   await playTime(video.youtubeId).then((res) => {
      //     video.playTime = res;
      //   });
      // });
    }

    // if (payload.isSeries) {
    //   request.series.map((video: Video) => {
    //     video.productName = request.productName;
    //     video.productCode = request.productCode;
    //     video.uploadDate = request.uploadDate;
    //     video.updateDate = request.updateDate;
    //     video.playTime = request.playTime;
    //     video.viewCount = request.viewCount;
    //     video.empId = request.empId;
    //     video.empName = request.empName;
    //     video.deptPath = request.deptPath;
    //     video.isSeries = true;
    //     video.seriesTitle = request.seriesTitle;
    //     video.description = request.description;
    //     // groupId
    //   });
    // }

    // return new Promise(async (resolve, reject) => {
    //   try {
    //     const { data } = await this.$axios.post(
    //       'api/library/video/register',
    //       request
    //     );
    //
    //     resolve(data);
    //   } catch (e) {
    //     reject(e);
    //   }
    // });

    try {
      // Loading Alert
      dispatch(
        'common/alert',
        {
          type: ALERT_TYPE.LOADING,
          isShow: true,
          msg: '동영상을 등록중입니다.',
        },
        { root: true }
      );

      const { data } = await this.$axios.post(
        'api/library/video/register',
        request
      );

      if (data.success && data.data) {
        await dispatch(
          'common/alert',
          {
            type: ALERT_TYPE.CHECK,
            isShow: true,
            msg: '동영상 등록이 완료되었습니다.',
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

  async updateVideo({ commit, dispatch }, payload: IVideo): Promise<any> {
    try {
      // Loading Alert
      dispatch(
        'common/alert',
        {
          type: ALERT_TYPE.LOADING,
          isShow: true,
          msg: '동영상을 수정중입니다.',
        },
        { root: true }
      );

      const data = await this.$axios.$post(
        'api/library/video/update/' + payload._id,
        payload
      );

      // console.log('updateVideo :: ', data.data);

      if (data.success && data.data) {
        await dispatch(
          'common/alert',
          {
            type: ALERT_TYPE.CHECK,
            isShow: true,
            msg: '동영상 수정이 완료되었습니다.',
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

  async removeVideo(
    { commit, state, dispatch },
    payload: string
  ): Promise<any> {
    try {
      // Loading Alert
      dispatch(
        'common/alert',
        {
          type: ALERT_TYPE.LOADING,
          isShow: true,
          msg: '동영상을 삭제중입니다.',
        },
        { root: true }
      );

      const { data } = await this.$axios.post(
        'api/library/video/remove/' + payload,
        {
          productCode: state.selectedProduct.productCode,
        }
      );

      // commit('videosByProduct', data.data);

      if (data.success && data.data) {
        await dispatch('getVideosByProduct', {
          data: state.selectedProduct,
        });
        await dispatch(
          'common/alert',
          {
            type: ALERT_TYPE.CHECK,
            isShow: true,
            msg: '동영상이 삭제되었습니다.',
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

  async registerStaffs(
    { commit, state },
    IProduct: Array<IStaff>
  ): Promise<any> {
    try {
      const { data } = await this.$axios.post(
        'api/library/video/register/staffs/' +
          state.selectedManageProduct.productCode,
        state.selectedManageProductStaffs
      );

      // console.log('registerStaffs ', data.data);

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

const playTime = function(youtubeId): Promise<any> {
  return fetch(
    `https://www.googleapis.com/youtube/v3/videos?id=${youtubeId}&part=contentDetails&key=${API_KEY}`
  )
    .then((res) => res.json())
    .then((res) => {
      if (res.items.length) {
        return YTDurationToSeconds(res.items[0].contentDetails.duration);
      } else {
        return '';
      }
    });
};

function YTDurationToSeconds(duration) {
  let match = duration.match(/PT(\d+H)?(\d+M)?(\d+S)?/);

  match = match.slice(1).map(function(x) {
    if (x != null) {
      return x.replace(/\D/, '');
    }
  });

  const hours = parseInt(match[0]) || 0;
  const minutes = parseInt(match[1]) || 0;
  const seconds = parseInt(match[2]) || 0;

  // console.log(hours, minutes, seconds);
  let result = '';
  if (hours) {
    result = result + hours.toString() + ':';
  }

  if (minutes) {
    result = result + minutes.toString() + ':';
  } else {
    result = result + '00:';
  }

  if (seconds) {
    result = result + seconds.toString();
  } else {
    result = result + '00';
  }

  // return hours * 3600 + minutes * 60 + seconds;
  return result;
}

const SELECTED_VIDEO = (): IVideo => {
  return {
    _id: '',
    videoTitle: '',
    youtubeId: '',
    productCode: '',
    productName: '',

    uploadDate: 0,
    updateDate: 0,
    playTime: '',
    viewCount: 0,

    empId: '',
    empName: '',
    deptPath: '',
    description: '',

    isSeries: false,
    seriesTitle: '',
    series: [],
  };
};

const SELECTED_MANAGE_PRODUCT = (): IProduct => {
  return {
    _id: '',
    productName: '',
    productCode: '',
    description: '',
    managedVideos: [],
    staffs: [],
  };
};

const SELECTED_PRODUCT = (): IProduct => {
  return {
    _id: '',
    productName: '',
    productCode: '',
    description: '',
    managedVideos: [],
    staffs: [],
  };
};

const VIDE0_DEFAULT_PARAMS = (): ListParams => {
  return {
    limit: 5,
    skip: 0,
    sort: '-uploadDate',
  };
};
