<template>
  <div class="container-panel">
    <div class="view-top mgb-15">
      <h1 class="tit-con-text">동영상<span>등록/수정</span></h1>
    </div>
    <div class="gray-info-box mgb-20">
      <ul class="box-notice">
        <li>
          <div class="ui-select w-170">
            <select title="품목형태" class="off" tabindex="-1">
              <option
                v-for="product in $store.state.video.products"
                :key="product._id"
                :value="product.productName"
                :selected="selectedCategory.productCode === product.productCode"
                >{{ product.productName }}</option
              >
            </select>
            <button
              type="button"
              class="ui-select-btn"
              :class="{ on: isOpenSelectBox }"
              title="품목형태 선택"
              @click="isOpenSelectBox = !isOpenSelectBox"
            >
              {{ selectedCategory.productName }}
            </button>
            <!-- 셀렉트박스 선택시 ui-select-wrap 에 on 추가하면 display block 됨 -->
            <div class="ui-select-wrap" :class="{ on: isOpenSelectBox }">
              <strong class="ui-select-tit" tabindex="0">품목 선택</strong>
              <div class="ui-select-options">
                <button
                  v-for="product in $store.state.video.products"
                  :key="product._id"
                  type="button"
                  class="ui-select-opt"
                  :selected="
                    product.productCode === selectedCategory.productCode
                  "
                  :value="product.productName"
                  @click="onclickCategory(product)"
                >
                  <b class="ui-select-txt">{{ product.productName }}</b>
                </button>
              </div>
            </div>
          </div>
          <input
            v-model="video.videoTitle"
            type="text"
            class="inp-base w-680"
            placeholder="제목"
            @blur="onfocusoutInput"
          />
        </li>
        <li>
          <input
            v-if="$route.params.type === 'series'"
            v-model="tempSeriesVideoTitle"
            type="text"
            placeholder="시리즈 항목 제목"
            class="inp-base"
            style="width: 170px;"
          />
          <label v-else class="txt-right w-170" style="display: inline-block;"
            >YouTube</label
          >
          <input
            v-model="video.youtubeId"
            type="text"
            :placeholder="
              video.isSeries ? '시리즈 YouTube ID 입력' : 'YouTube ID 입력'
            "
            class="inp-base"
            style="width: 510px;"
            @blur="onfocusoutInput"
          />
          <button
            type="button"
            class="dbs-icon-button ico-left small preview"
            @click="
              openVideoPage(
                video.youtubeId &&
                  `https://www.youtube.com/watch?v=${video.youtubeId}`
              )
            "
          >
            미리보기
          </button>
          <button
            v-if="$route.params.type === 'series'"
            type="button"
            class="dbs-icon-button ico-left small plus"
            @click="onclickAddSeries"
          >
            추가
          </button>
        </li>
      </ul>
    </div>

    <!--    <component :is="editorLoader"></component>-->
    <div class="movie-register-wrap mgb-20">
      <video-single-editor
        v-if="$route.params.type === 'single'"
        ref="singleEditorComp"
        :video="videoProp"
        @remove-video="removeVideo"
      />
      <video-series-editor
        v-else
        ref="seriesEditorComp"
        :video="videoProp"
        :series-videos="seriesVideos"
        @remove-video-series="removeVideoSeries"
      />
      <div class="movie-register-toastui">
        <TuiEditor
          ref="tui"
          mode="wysiwyg"
          :height="$route.params.type === 'series' ? '448px' : '300px'"
          :value="video.description"
        />
      </div>
    </div>

    <div class="btn-wrap mgb-80">
      <button
        type="button"
        class="dbs-icon-button ico-left small confirm"
        @click="onclickSave"
      >
        확인
      </button>
      <button
        type="button"
        class="dbs-icon-button ico-left small cancel"
        @click="onclickCancel"
      >
        취소
      </button>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, namespace, Vue } from 'nuxt-property-decorator';
import TurndownService from 'turndown';

import VideoSingleEditor from '@/components/libraryVideoRegisterEdit/VideoSingleEditor.vue';
import VideoSeriesEditor from '@/components/libraryVideoRegisterEdit/VideoSeriesEditor.vue';
// import * as video from '@/store/modules/video';
import { IVideo } from '@/store/modules/video';
import { IAlert } from '~/store/modules/common';

const Common = namespace('common');
const API_KEY = 'AIzaSyCrI0kwNS07VIBB006Rhu5WuI-9hZPoYD4';

interface Category {
  productName: string;
  productCode: string;
}

interface VideoProp {
  youtubeId: string;
  videoTitle: string;
  description: string;
  tempSeriesVideoTitle?: string;
  series?: IVideo[];
}

const Video = namespace('video');

@Component({
  components: {
    VideoSingleEditor,
    VideoSeriesEditor,
  },
})
export default class LibraryVideoRegisterEdit extends Vue {
  @Common.Action('alert') alertAction!: (payload: IAlert) => Promise<any>;
  @Video.Action('createVideo') createVideoAction!: (
    video: IVideo
  ) => Promise<any>;
  @Video.Action('updateVideo') updateVideoAction!: (
    video: IVideo
  ) => Promise<any>;

  $refs!: {
    singleEditorComp: any;
    seriesEditorComp: any;
    tui: any;
  };

  isOpenSelectBox: boolean = false;
  selectedCategory: Category = {
    productName: '',
    productCode: '',
  };

  tempSeriesVideoTitle: string = '';
  videoProp: VideoProp = {
    videoTitle: '',
    youtubeId: '',
    description: '',
    // for series
    tempSeriesVideoTitle: '',
  };

  seriesVideos: any[] = [];

  get video() {
    return this.$store.state.video.selectedVideo;
  }

  // 초기 데이터 세팅
  created() {
    const selectedProduct = this.$store.state.video.selectedProduct;
    if (selectedProduct._id) {
      this.selectedCategory.productName = selectedProduct.productName;
      this.selectedCategory.productCode = selectedProduct.productCode;
    }

    // 등록일 경우 단독, 시리즈 여부 설정
    if (this.$route.params.editType === 'register') {
      this.video.isSeries = this.$route.params.type === 'series';
    } else if (
      this.$route.params.editType === 'edit' &&
      this.video &&
      this.video.isSeries
    ) {
      this.video.youtubeId = '';
    }

    // 단독, 시리즈에 따른 초기 하위 Editor 에 videoProp 전달
    this.videoProp.youtubeId = this.video.isSeries ? '' : this.video.youtubeId;
    this.videoProp.videoTitle = this.video.isSeries
      ? this.video.seriesTitle
      : this.video.videoTitle;
    this.videoProp.description = this.video.description;
    this.seriesVideos = this.video.isSeries
      ? this.$store.state.video.selectedVideoSeries
      : [];

    console.log(
      'seriesVideos!!! :: ',
      this.$store.state.video.selectedVideoSeries
    );
  }

  onfocusoutInput(): void {
    // 시리즈 등록시에는 blur event x
    if (this.$route.params.type === 'series') return;
    this.videoProp.youtubeId = this.video.youtubeId;
    this.videoProp.videoTitle = this.video.videoTitle;
    this.videoProp.tempSeriesVideoTitle = this.tempSeriesVideoTitle;
  }

  onclickCategory(product: any): void {
    this.selectedCategory.productCode = product.productCode;
    this.selectedCategory.productName = product.productName;
    this.isOpenSelectBox = false;
  }

  openVideoPage(url: string | undefined): void | any {
    if (!url) {
      this.alertAction({
        type: 'warning',
        isShow: true,
        msg: '미리보기 할 YoutubeId가 없습니다.',
      });

      return;
    }

    window.open(url, '_blank');
  }

  removeVideo(): void {
    this.video.youtubeId = '';
    this.videoProp.youtubeId = '';
  }

  removeVideoSeries(index: number): void {
    this.seriesVideos.splice(index, 1);
  }

  onclickSave(): void {
    if (!this.video.videoTitle) {
      this.alertAction({
        type: 'warning',
        isShow: true,
        msg: '동영상 제목을 입력해주세요.',
      });

      return;
    }

    this.video.description = this.$refs.tui.invoke('getValue'); // get tui-editor md
    this.video.productName = this.selectedCategory.productName;
    this.video.productCode = this.selectedCategory.productCode;

    // 싱글 동영상 등록/수정시에 YoutubeID를 추가하지 않은 경우
    if (this.$route.params.type !== 'series' && !this.video.youtubeId) {
      this.alertAction({
        type: 'warning',
        isShow: true,
        msg: 'YoutubeID를 추가해주세요.',
      });

      return;
    }

    // 시리즈 동영상 등록/수정시에 YoutubeID를 추가하지 않은 경우
    if (this.$route.params.type === 'series' && !this.seriesVideos.length) {
      this.alertAction({
        type: 'warning',
        isShow: true,
        msg: 'YoutubeID를 추가해주세요.',
      });

      return;
    }

    if (this.$route.params.type === 'series') {
      this.video.youtubeId = '';
      this.video.series = this.seriesVideos;
      this.video.seriesTitle = this.video.videoTitle;
    }

    if (this.video._id) {
      this.onUpdateVideo();
    } else {
      this.onCreateVideo();
    }
  }

  async onclickAddSeries(): Promise<any> {
    if (!this.video.youtubeId) {
      this.alertAction({
        type: 'warning',
        isShow: true,
        msg: 'youtubeId를 입력해주세요.',
      });

      return;
    }

    if (!this.tempSeriesVideoTitle) {
      this.alertAction({
        type: 'warning',
        isShow: true,
        msg: '시리즈 항목 제목을 입력해주세요.',
      });

      return;
    }

    try {
      const playTime = await this.playTime(this.video.youtubeId);
      // add series video
      this.seriesVideos.push({
        youtubeId: this.video.youtubeId,
        description: this.video.description,
        videoTitle: this.tempSeriesVideoTitle,
        playTime,
      });
    } catch (e) {
      console.error(e);
    }

    // init videoProp
    this.videoProp.youtubeId = '';
    this.videoProp.tempSeriesVideoTitle = '';
    //
    // init input value
    this.video.youtubeId = '';
    this.tempSeriesVideoTitle = '';
  }

  onCreateVideo(): void {
    const msgByVideoType: string =
      this.$route.params.type === 'series' ? '시리즈' : '';

    this.alertAction({
      type: 'question',
      isShow: true,
      msg: `${this.selectedCategory.productName} 에 ${msgByVideoType} 동영상을 등록하시겠습니까?`,
    }).then(async (result) => {
      if (result.ok) {
        await this.createVideoAction(this.video);
        this.redirect();
      }
    });
  }

  onUpdateVideo(): void {
    const msgByVideoType: string =
      this.$route.params.type === 'series' ? '시리즈' : '';

    this.alertAction({
      type: 'question',
      isShow: true,
      msg: `${msgByVideoType} 동영상 정보를 수정하시겠습니까?`,
    }).then(async (result) => {
      if (result.ok) {
        await this.updateVideoAction(this.video);
        this.redirect();
      }
    });
  }

  redirect(): void {
    this.$router.push({
      name: 'videoList',
      params: {
        productCode: this.$route.params.productCode,
        product: this.$store.state.video.selectedProduct,
      },
    });
  }

  onclickCancel(): void {
    const msgByVideoType: string =
      this.$route.params.type === 'series' ? '시리즈' : '';
    const msg: string =
      this.$route.params.editType === 'edit'
        ? `${msgByVideoType} 동영상 정보 수정을 취소하시겠습니까?`
        : `${msgByVideoType} 동영상 등록을 취소하시겠습니까?`;

    this.alertAction({
      type: 'question',
      isShow: true,
      msg,
    }).then((result) => {
      if (result.ok) {
        this.redirect();
      }
    });
  }

  playTime(youtubeId): Promise<any> {
    return fetch(
      `https://www.googleapis.com/youtube/v3/videos?id=${youtubeId}&part=contentDetails&key=${API_KEY}`
    )
      .then((res) => res.json())
      .then((res) => {
        if (res.items.length) {
          return this.YTDurationToSeconds(res.items[0].contentDetails.duration);
        } else {
          return '';
        }
      });
  }

  YTDurationToSeconds(duration) {
    let match = duration.match(/PT(\d+H)?(\d+M)?(\d+S)?/);

    match = match.slice(1).map(function(x) {
      if (x != null) {
        return x.replace(/\D/, '');
      }
    });

    const hours = parseInt(match[0]) || 0;
    const minutes = parseInt(match[1]) || 0;
    const seconds = parseInt(match[2]) || 0;

    console.log(hours, minutes, seconds);
    let result = '';
    if (hours) {
      result = result + hours.toString() + ':';
    }

    if (minutes) {
      result = result + minutes.toString() + ':';
    }

    if (seconds) {
      result = result + seconds.toString();
    }

    // return hours * 3600 + minutes * 60 + seconds;
    return result;
  }

  // @change="onEditorChange"
  // onEditorChange(): void {
  //   const ts = new TurndownService();
  //   const markdown = ts.turndown(this.$refs.tui.invoke('getHtml'));
  // }

  // get editorLoader() {
  //   console.log('editorLoader ', this.$route.meta.editType);
  //
  //   return () => {
  //     import(
  //       `@/components/libraryHome/video/${this.$route.meta.editType}Editor.vue`
  //     );
  //   };
  // }
  //
}
</script>

<style scoped></style>
