<template>
  <div class="container-panel">
    <div class="view-top mgb-15">
      <h1 class="tit-con-text">
        동영상 <span>{{ $store.state.video.selectedProduct.productName }}</span>
      </h1>
    </div>
    <div class="player-container">
      <div class="movie-area mgb-20">
        <iframe
          width="560"
          height="315"
          :src="`https://www.youtube.com/embed/${video.youtubeId}?autoplay=1`"
          frameborder="0"
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
        ></iframe>
      </div>
      <div class="movie-clip-info">
        <div class="movie-title-area">
          <h3 class="tit-video mgb-10">
            {{ video.videoTitle }}
          </h3>
          <span v-if="video.isSeries || video.series.length > 0" class="fr">
            <button
              type="button"
              class="dbs-icon-button ico-left small prev"
              :disabled="selectedVideoIdx === 0"
              @click="onclickPrev"
            >
              이전
            </button>
            <button
              type="button"
              class="dbs-icon-button ico-left small next"
              :disabled="
                selectedVideoIdx ===
                  this.$store.state.video.selectedVideoSeries.length - 1
              "
              @click="onclickNext"
            >
              다음
            </button>
          </span>
        </div>
        <div class="movie-info mgb-20">
          <div class="user-info">
            <span>{{ convertDateFormat(video.uploadDate) }}</span>
            <span class="hit">조회 {{ video.viewCount }}</span>
            <span v-if="isCheckEmp() || isAdmin()"
              >{{ video.empName }}({{ video.deptPath }})</span
            >
          </div>
          <!-- 작성자 / 제품관리자 / 관리자-->
          <div
            v-if="isCheckWriter(video) || isStaff(video) || isAdmin()"
            class="administer"
          >
            <nuxt-link
              :to="{
                name: 'videoEdit',
                params: {
                  productCode: $store.state.video.selectedProduct.productCode,
                  editType: 'edit',
                  type: video.isSeries ? 'series' : 'single',
                  // TODO 확인필요 191216 video._id
                  _id: video.isSeries ? video.groupId : video._id,
                  video: $store.state.video.selectedVideo, // for pure selectedVideo
                },
              }"
              >수정</nuxt-link
            ><a class="font-accent-color" @click="removeVideo">삭제</a>
          </div>
        </div>
        <div class="movie-body">
          <!--          <div ref="descVideoDetail" class="tit-video-desc mgt-20 mgb-40"></div>-->
          <TuiEditorViewer :value="video.description" />
          <!-- TO  DO 시리즈 일때 : movie-aside -->
          <div v-if="video.isSeries" class="movie-aside">
            <h3 class="tit-con-sub mgb-10">시리즈 내 다른 동영상</h3>
            <div class="scrollbar-box">
              <ul class="thumb-list small">
                <li v-for="video in videosInSeries" :key="video._id">
                  <div class="thumb" @click="onclickVideoInSeries(video)">
                    <img :src="imagePath(video)" alt="" />
                    <em v-if="video.playTime" class="btn-time">{{
                      video.playTime
                    }}</em>
                  </div>
                  <dl class="thumb-desc">
                    <!-- TODO 두줄 이상인 경우 말줄임으로 나오게 해주세요 -->
                    <dt class="title-dim">
                      <i v-if="isNew(video.uploadDate)" class="icon-new">N</i
                      >{{ video.videoTitle }}
                    </dt>
                    <dd>
                      <!--                      <template v-if="isNew(video.updateDate)">-->
                      <!--                        {{ dayDiff(video.uploadDate) }} 일전-->
                      <!--                      </template>-->
                      <template>
                        {{ convertDateFormat(video.uploadDate) }}
                      </template>
                      <span class="hit">조회 {{ video.viewCount }}</span>
                    </dd>
                  </dl>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="topic-button-wrap mgb-40">
      <span class="fr"
        ><button
          type="button"
          class="dbs-icon-button ico-left small list"
          @click="redirectVideos"
        >
          목록
        </button>
      </span>
    </div>
    <h1 class="tit-con-sub mgb-15">
      {{ $store.state.video.selectedProduct.productName }}의 다른 동영상
    </h1>
    <div class="box-gray-round mgb-80">
      <ul class="thumb-list small recommend-clip-area">
        <li v-for="video in localVideoAllByProduct" :key="video._id">
          <nuxt-link
            :to="{
              name: 'videoDetail',
              params: {
                productCode: video.productCode,
                _id: video.isSeries ? video.series[0]._id : video._id,
                video: video,
              },
            }"
          >
            <div class="thumb">
              <img
                :src="
                  `https://img.youtube.com/vi/${
                    video.isSeries ? video.series[0].youtubeId : video.youtubeId
                  }/${$store.state.video.ytbThumbnailQuality}.jpg`
                "
                alt=""
              />
              <em v-if="video.playTime" class="btn-time">{{
                video.playTime
              }}</em>
              <div v-if="video.isSeries" class="play">
                <span class="count">{{ video.series.length }}</span>
                <em class="icon-playlist" />
              </div>
            </div>
          </nuxt-link>

          <dl class="thumb-desc">
            <!-- TODO 두줄 이상인 경우 말줄임으로 나오게 해주세요 -->
            <dt class="title-dim">
              <i v-if="isNew(video.uploadDate)" class="icon-new">N</i
              >{{ video.isSeries ? video.seriesTitle : video.videoTitle }}
            </dt>
            <dd>
              <!--              <template v-if="isNew(video.updateDate)">-->
              <!--                {{ dayDiff(video.uploadDate) }} 일전-->
              <!--              </template>-->
              <template>
                {{ convertDateFormat(video.uploadDate) }}
              </template>
              <span class="hit">조회 {{ video.viewCount }}</span>
            </dd>
          </dl>
        </li>
      </ul>
      <p v-if="count">
        <a role="button" class="arrow prev" @click="count--" />
      </p>
      <p v-if="count !== videoAllByProduct.length - 4">
        <a role="button" class="arrow next" @click="count++" />
      </p>
    </div>
  </div>
</template>
<script lang="ts">
import { Vue, Component, namespace, Watch } from 'nuxt-property-decorator';
import marked from 'marked';
import { dateFormat } from '~/utils/commonFuncs';
import { IVideo, IStaff } from '@/store/modules/video';
import { IUser } from '@/store/modules/user';
import { IAlert } from '~/store/modules/common';

const Video = namespace('video');
const Common = namespace('common');

@Component
export default class LibraryVideoDetail extends Vue {
  @Common.Action('alert') alertAction!: (payload: IAlert) => Promise<any>;
  @Video.Action('updateVideoCount') updateVideoCountAction!: (
    _id: string
  ) => Promise<any>;
  @Video.Action('removeVideo') removeVideoAction!: (
    _id: string
  ) => Promise<any>;
  @Video.Mutation('selectedVideo') selectedVideoMutation!: (
    video: IVideo
  ) => Promise<any>;

  // 선택된 동영상 변경 감지
  @Watch('video', { immediate: false, deep: true })
  onVideoChange(val: IVideo) {
    // history pushState for url change
    this.historyPush(val._id as string);
  }

  // 선택된 동영상이 변경될시, pushState 로 url 변경
  historyPush(_id: string) {
    // @ts-ignore
    history.pushState(
      {},
      'nextVideo',
      '/video/' + this.$route.params.productCode + '/' + _id
    );
  }

  $refs!: {
    descVideoDetail: any;
  };

  selectedVideoIdx!: number;
  count: number = 0;
  videoAllByProduct: IVideo[] = [];

  get user(): IUser {
    return this.$store.state.user.user;
  }

  get localVideoAllByProduct(): IVideo[] {
    return this.videoAllByProduct
      .filter((video) => {
        if (this.video.isSeries && this.video.groupId) {
          return video._id !== this.video.groupId;
        } else {
          return video._id !== this.video._id;
        }
      })
      .slice(this.count, 4 + this.count);
  }

  // 선택된 동영상
  get video(): IVideo {
    let selectedVideo: IVideo = this.$store.state.video.selectedVideo;
    // const currentId: string = this.$route.params._id;

    // 선택해서 들어온 영상이 시리즈 그룹일 경우 시리즈의 첫번째 동영상
    if (selectedVideo.isSeries && !selectedVideo.youtubeId) {
      // selectedSeriesVideoIdx
      this.selectedVideoIdx = selectedVideo.series.findIndex(
        (video: IVideo) => {
          return video._id === selectedVideo.series[0]._id;
        }
      );

      // selectedSeriesVideo
      selectedVideo = selectedVideo.series[this.selectedVideoIdx];
    }

    return selectedVideo;
  }

  // 시리즈 내 동영상 목록
  get videosInSeries(): Array<IVideo> {
    const selectedVideo: IVideo = this.video;
    let videosInSeries: Array<IVideo> = [];

    if (selectedVideo.isSeries && selectedVideo.groupId) {
      const series: Array<
        IVideo
      > = this.$store.state.video.selectedVideoSeries.slice();

      const selectedSeriesVideoIdx = series.findIndex((video: IVideo) => {
        return video._id === selectedVideo._id;
      });

      series.splice(selectedSeriesVideoIdx, 1);
      videosInSeries = series;
    }

    return videosInSeries;
  }

  // 제품 내 동영상 목록
  get videosByProduct(): Array<IVideo> {
    // 제품 내 다른 동영상 목록
    const videosByProduct: Array<
      IVideo
    > = this.$store.state.video.videosByProduct.slice();

    const idx: number = videosByProduct.findIndex((item: IVideo) => {
      return item._id === this.video._id;
    });
    videosByProduct.splice(idx, 1);

    return videosByProduct;
  }

  created() {
    this.videoAllByProduct = this.$store.state.video.videoAllByProduct.slice();
    this.updateVideoCountAction(this.video._id);
  }

  // 동영상 Thumbnail
  imagePath(video): string {
    return `https://img.youtube.com/vi/${video.youtubeId}/${this.$store.state.video.ytbThumbnailQuality}.jpg`;
  }

  // 직원 여부
  isCheckEmp(): boolean {
    return this.user.authority === 'E';
  }

  // 작성자 여부
  isCheckWriter(video: IVideo): boolean {
    return this.user.loginId === video.empId;
  }

  // 관리자 여부
  isAdmin(): boolean {
    return this.user.authority === 'S';
  }

  // 제품 스태프 여부
  isStaff(video: IVideo): boolean {
    if (
      this.user.loginId &&
      this.$store.state.download.selectedProduct.staffs !== undefined &&
      (this.user.authority === 'E' || this.user.authority === 'S')
    ) {
      return this.$store.state.download.selectedProduct.staffs.some(
        (staff: IStaff) => {
          return staff.empId === video.empId;
        }
      );
    } else {
      return false;
    }
  }

  // 시리즈내 다른 동영상 목록 동영상 클릭
  async onclickVideoInSeries(video: IVideo): Promise<any> {
    await this.updateVideoCountAction(video._id);
    video.viewCount++;
    await this.selectedVideoMutation(video);
  }

  // 동영상 삭제
  removeVideo(): void {
    const msg: string = this.video.isSeries
      ? '시리즈 내 모든 영상이 삭제됩니다. 삭제하시겠습니까?'
      : '동영상을 삭제하시겠습니까?';

    const videoId: string = this.video.groupId
      ? this.video.groupId
      : this.video._id;

    this.alertAction({
      type: 'question',
      isShow: true,
      msg,
    }).then(async (result) => {
      if (result.ok) {
        await this.removeVideoAction(videoId);
        this.redirectVideos();
      }
    });
  }

  // 동영상 리스트 페이지 이동
  redirectVideos(): void {
    this.$router.push({
      name: 'videoList',
      params: {
        productCode: this.$route.params.productCode,
        product: this.$store.state.video.selectedProduct,
      },
    });
  }

  // 동영상 다음 버튼 클릭
  onclickNext(): void {
    this.selectedVideoIdx++;
    this.selectedVideoSeriesCount(this.selectedVideoIdx);
  }

  // 동영상 이전 버튼 클릭
  onclickPrev(): void {
    this.selectedVideoIdx--;
    this.selectedVideoSeriesCount(this.selectedVideoIdx);
  }

  async selectedVideoSeriesCount(selectedVideoIdx): Promise<any> {
    const selectedVideoSeries = this.$store.state.video.selectedVideoSeries;

    // 동영상 조회수 증가
    await this.updateVideoCountAction(
      selectedVideoSeries[selectedVideoIdx]._id
    );

    selectedVideoSeries[selectedVideoIdx].viewCount++;

    // 다음 동영상 정보로 변경
    await this.selectedVideoMutation(
      this.$store.state.video.selectedVideoSeries[selectedVideoIdx]
    );
  }

  // 7일 이내에 등록했을 경우 New 표시
  isNew(updateDate: number): boolean {
    const standard = 1000 * 3600 * 24;
    return (Date.now() - updateDate) / standard < 7;
  }

  convertDateFormat(time): string {
    return dateFormat(time);
  }
}
</script>

<style scoped>
.thumb {
  cursor: pointer;
}
</style>
