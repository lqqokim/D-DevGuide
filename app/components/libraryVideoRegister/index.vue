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
      youtubeId: '',
      projectId: '2',
      productName: 'D_ERP',
      uploadDate: Date.now(),
      updateDate: Date.now(),
      playTime: 1010,
      viewCount: 500,

      empName: '김인수',
      depthPath: '플랫폼개발1팀',
      description: '더존 DEWS_UI 제픔관련 동영상 입니다.',

      isSeries: true,
      seriesTitle: 'DEWS/UI 데모 시리즈',
      series: [
        {
          videoTitle: 'DEWS/UI 첫번째',
          youtubeId: 'ttt',
          projectId: '2',
          productName: 'D_ERP',
          uploadDate: Date.now(),
          updateDate: Date.now(),
          playTime: 1010,
          viewCount: 500,

          empName: '김인수',
          depthPath: '플랫폼개발1팀',
          description: '더존 DEWS_UI 제픔관련 동영상 입니다.',

          isSeries: false,
        },
        {
          videoTitle: 'DEWS/UI 두번째',
          youtubeId: 'ttt',
          projectId: '2',
          productName: 'D_ERP',
          uploadDate: Date.now(),
          updateDate: Date.now(),
          playTime: 1010,
          viewCount: 500,

          empName: '김인수',
          depthPath: '플랫폼개발1팀',
          description: '더존 DEWS_UI 제픔관련 동영상 입니다.',

          isSeries: false,
        },
      ],
    });
  }

  registerSingle() {
    this.registerVideoAction({
      videoTitle: '더존 클라우드 시연 영상',
      youtubeId: 'ttt',
      projectId: '2',
      productName: 'D_ERP',
      uploadDate: Date.now(),
      updateDate: Date.now(),
      playTime: 1010,
      viewCount: 500,

      empName: '김인수',
      depthPath: '플랫폼개발1팀',
      description: '더존 DEWS_UI 제픔관련 동영상 입니다.',

      isSeries: false,
      series: [],
    });
  }
}
</script>

<style scoped></style>

<style scoped></style>
