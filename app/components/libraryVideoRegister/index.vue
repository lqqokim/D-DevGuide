<template>
  <div>
    자료실 동영상 등록 페이지

    <input type="button" value="시리즈 추가하기" @click="registerSeries" />
    <input type="button" value="싱글 추가하기" @click="registerSingle" />
  </div>
</template>
<script lang="ts">
import { Vue, Component, namespace, Action } from 'nuxt-property-decorator';
import * as video from '@/store/modules/video';

const Video = namespace('video');

@Component
export default class LibraryVideoProductManage extends Vue {
  @Video.Action('registerVideo') registerVideoAction!: any;

  registerSeries() {
    this.registerVideoAction({
      videoTitle: '',
      youtubeId: '=W12SW11SQ1DFFGF1123123=',
      thumbnail: '=12=31-E=1E-DD1KLOKOPSKDPLAD=',
      productType: 'DEWS_UI',
      uploadDate: new Date(),
      updateDate: new Date(),
      playTime: 1010,
      viewCount: 500,

      empName: '김인수',
      depthPath: '플랫폼개발1팀',
      description: '더존 DEWS_UI 제픔관련 동영상 입니다.',

      isSeries: true,
      seriesTitle: 'DEWS/UI 모음',
      series: [
        {
          videoTitle: 'DEWS_UI 첫번째 영상',
          youtubeId: '=W12SW11SQ1DFFGF1123123=',
          thumbnail: '=12=31-E=1E-DD1KLOKOPSKDPLAD=',
          uploadDate: new Date(),
          updateDate: new Date(),
          playTime: 1010,
          viewCount: 500,
        },
        {
          videoTitle: 'DEWS_UI 두번째 영상',
          youtubeId: '=W12SW11SQ1DFFGF1123123=',
          thumbnail: '=12=31-E=1E-DD1KLOKOPSKDPLAD=',
          uploadDate: new Date(),
          updateDate: new Date(),
          playTime: 2020,
          viewCount: 202,
        },
      ],
    });
  }

  registerSingle() {
    this.registerVideoAction({
      videoTitle: '세미나 영상',
      youtubeId: '=W12SW11SQ1DFFGF1123123=',
      thumbnail: '=12=31-E=1E-DD1KLOKOPSKDPLAD=',
      productType: 'DEWS_UI',
      uploadDate: new Date(),
      updateDate: new Date(),
      playTime: 1010,
      viewCount: 500,

      empName: '김인수',
      depthPath: '플랫폼개발1팀',
      description: '더존 세미나 동영상 입니다.',

      isSeries: false,
      seriesTitle: 'D_ERP 영상',
      series: [],
    });
  }
}
</script>

<style scoped></style>

<style scoped></style>
