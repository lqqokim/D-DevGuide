<template>
  <div class="dbs-container">
    <h1 class="tit-con mgt-50">동영상</h1>
    <div class="position-wrap">
      <h2 class="tit-con-small">
        {{ $store.state.video.selectedProduct.productName }}
      </h2>
    </div>
    <ul class="thumb-list mgt-10">
      <li v-for="video in $store.state.video.videosByProduct" :key="video._id">
        <nuxt-link
          :to="{
            name: 'videoDetail',
            params: {
              productName: video.productName,
              projectId: video.projectId,
              _id: video._id,
            },
          }"
        >
          <div class="thumb">
            <img
              :src="
                `https://img.youtube.com/vi/${
                  video.isSeries ? video.series[0].youtubeId : video.youtubeId
                }/maxresdefault.jpg`
              "
            />
          </div>
        </nuxt-link>
        <dl class="thumb-desc">
          <nuxt-link
            :to="{
              name: 'videoDetail',
              params: {
                productName: video.productName,
                _id: video._id,
              },
            }"
            tag="dt"
            >{{
              !video.isSeries ? video.videoTitle : video.seriesTitle
            }}</nuxt-link
          >
          <dd>
            {{ video.uploadDate }}
            <span class="name">{{ video.empName }}</span>
          </dd>
        </dl>
        <span class="thumb-info"
          ><span class="video-view"
            ><span class="txt">{{ video.playTime }}</span></span
          ><span class="bookmark"
            ><span class="txt">{{ video.viewCount }}</span></span
          ></span
        >
        <div>
          <nuxt-link
            :to="{
              name: 'videoEdit',
              params: {
                video: video,
                _id: video._id,
              },
            }"
            @click.native="onClickEdit(video)"
            >수정</nuxt-link
          >
          <a @click="onRemove(video)">삭제</a>
        </div>
      </li>
    </ul>
    <div class="line"></div>
  </div>
</template>
<script lang="ts">
import { Vue, Component, namespace } from 'nuxt-property-decorator';
import * as video from '@/store/modules/video';

const Video = namespace('video');

@Component
export default class VideoList extends Vue {
  @Video.Action('removeVideo') removeVideoAction!: (string) => void;
  @Video.Action('videoDetailById') videoDetailByIdAction!: (string) => void;

  onRemove(video: video.Video): void {
    this.removeVideoAction(video._id);
    alert(`${video._id} 삭제완료`);
  }

  onClickEdit(video: video.Video): void {
    // 성택한 video 상세정보 store 저장
    this.videoDetailByIdAction(video._id);
  }
}
</script>

<style></style>
