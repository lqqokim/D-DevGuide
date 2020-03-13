<template>
  <div class="dbs-dialog">
    <p class="tit-con-small mgb-10">
      {{ $store.state.video.selectedProduct.productName }}
    </p>
    <div class="dbs-dialog-box overflow-y" style="height: 444px;">
      <ul class="thumb-list choice x-small">
        <li v-for="(video, index) in localVideosByProduct" :key="video._id">
          <!-- checkbox가 check 되었을 시 thumb 클래스에 on 추가 -->
          <div class="thumb" @click.prevent="clickVideo($event, video)">
            <div class="dbs-checkbox-wrapper">
              <input
                :id="'mvCheck' + index"
                type="checkbox"
                :name="'movieCheck' + index"
                :checked="checkManagedVideo(video._id)"
              />
              <label :for="'mvCheck' + index" class="dbs-checkbox"></label>
            </div>
            <img :src="imagePath(video)" alt="" />
            <em v-if="video.playTime" class="btn-time">{{ video.playTime }}</em>
            <div v-if="video.isSeries" class="play">
              <span class="count">{{ video.series.length }}</span>
              <em class="icon-playlist"></em>
            </div>
          </div>
          <dl class="thumb-desc">
            <dt>
              {{ !video.isSeries ? video.videoTitle : video.seriesTitle }}
            </dt>
            <dd>
              <template>
                {{ convertDateFormat(video.uploadDate) }}
              </template>
              <span class="hit">조회 {{ video.viewCount }}</span>
            </dd>
          </dl>
        </li>
      </ul>
      <div v-if="isViewMore" class="btn-wrap">
        <button type="button" class="btn-main small" @click="onclickMoreView">
          더보기
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, namespace } from 'nuxt-property-decorator';
import { dateFormat } from '~/utils/commonFuncs';
import { IVideo, ListParams } from '@/store/modules/video';
import { IAlert } from '@/store/modules/common';

const Video = namespace('video');
const Common = namespace('common');

@Component
export default class VideoManageModal extends Vue {
  @Video.Action('getVideosByProduct') videosByProductAction!: (payload: {
    data: IVideo;
    params: ListParams;
  }) => void;
  @Video.Action('removeVideo') removeVideoAction!: (
    _id: string
  ) => Promise<any>;
  @Common.Action('alert') alertAction!: (payload: IAlert) => Promise<any>;

  private readonly LIMIT: number = 8;

  get localVideosByProduct(): IVideo[] {
    return this.videosByProduct;
  }

  videosByProduct: IVideo[] = [];
  selectedVideos: IVideo[] = [];

  isViewMore: boolean = true;
  countMore: number = 1;
  total!: number;

  created() {
    this.total = this.$store.state.video.totalSize;
    this.videosByProduct = this.$store.state.video.videosByProduct;

    if (this.total <= this.LIMIT) {
      this.isViewMore = false;
    }

    this.selectedVideos = this.$store.state.video.selectedProduct.managedVideos.slice();
  }

  imagePath(video): string {
    return `https://img.youtube.com/vi/${
      video.isSeries ? video.series[0].youtubeId : video.youtubeId
    }/${this.$store.state.video.ytbThumbnailQuality}.jpg`;
  }

  async onclickMoreView(): Promise<any> {
    this.countMore++;

    const params: ListParams = {
      skip: this.localVideosByProduct.length,
      limit: 8,
      sort: '-uploadDate',
    };

    await this.videosByProductAction({
      data: this.$store.state.video.selectedProduct,
      params,
    });

    this.videosByProduct = this.localVideosByProduct.concat(
      this.$store.state.video.videosByProduct
    );

    // 마지막 페이지일 경우 더보기 버튼 hide
    if (this.total - this.localVideosByProduct.length <= 0) {
      this.isViewMore = false;
    }
    // if (Math.ceil(this.total / this.LIMIT) === this.countMore) {
    //   this.isViewMore = false;
    // }
  }

  convertDateFormat(time): string {
    return dateFormat(time);
  }

  checkManagedVideo(id) {
    let isManaged = false;
    this.$store.state.video.selectedProduct.managedVideos.forEach(
      (managedVideo) => {
        if (!isManaged) {
          isManaged = managedVideo._id === id;
        }
      }
    );
    return isManaged;
  }

  clickVideo(e, video) {
    let inputTag!: any;

    if (e.target.tagName === 'INPUT') {
      inputTag = e.target;
    } else if (e.target.tagName === 'LABEL') {
      inputTag = e.target.previousElementSibling;
    } else if (e.target.tagName === 'SPAN' || e.target.tagName === 'EM') {
      inputTag = e.target.parentNode.parentNode.children[0].children[0];
    } else {
      inputTag = e.target.parentNode.children[0].children[0];
    }

    if (!inputTag.checked) {
      if (this.selectedVideos.length === 5) {
        this.alertAction({
          type: 'warning',
          isShow: true,
          msg: '동영상 선택은 최대 5개까지 할 수 있습니다.',
        }).then(() => {});
      } else {
        this.selectedVideos.push(video);
        inputTag.checked = true;
      }
    } else {
      inputTag.checked = false;
      this.selectedVideos = this.selectedVideos.filter((selectedVideo) => {
        return selectedVideo._id !== video._id;
      });
    }
  }

  getData() {
    return this.selectedVideos;
  }
}
</script>

<style scoped></style>
