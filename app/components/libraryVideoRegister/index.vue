<template>
  <div class="container-panel">
    <div class="view-top mgb-15">
      <h2 class="tit-con-text">동영상 등록/수정</h2>
    </div>

    <video-editor :category="$route.params"></video-editor>

    <div class="btn-wrap mgb-80">
      <button type="button" class="dbs-icon-button ico-left small confirm">
        확인
      </button>
      <button type="button" class="dbs-icon-button ico-left small cancel">
        취소
      </button>
    </div>
  </div>

  <!--  <div>-->
  <!--    자료실 동영상 등록 페이지-->

  <!--    <input type="button" value="시리즈 추가하기" @click="registerSeries" />-->
  <!--    <input type="button" value="싱글 추가하기" @click="registerSingle" />-->
  <!--  </div>-->
</template>
<script lang="ts">
import { Vue, Component, namespace } from 'nuxt-property-decorator';
import VideoEditor from '@/components/libraryHome/video/VideoEditor.vue';
import * as video from '@/store/modules/video';

const Video = namespace('video');

@Component({
  components: {
    VideoEditor,
  },
})
export default class LibraryVideoProductManage extends Vue {
  @Video.Action('registerVideo') registerVideoAction!: any;

  isOpenSelectBox: boolean = false;
  selectedCategoryCode: string = '';
  selectedCategoryName: string = '';

  mounted() {
    console.log('mounted 1 :: ', this.$route.params);
  }

  updated() {
    console.log('updated 1 :: ', this.$route.params);
  }

  created() {
    console.log('created 1 :: ', this.$route.params);
    this.selectedCategoryCode = this.$route.params.productCode;
    this.selectedCategoryName = this.$route.params.productName;
  }

  onclickCategory(product: any): void {
    this.selectedCategoryCode = product.productCode;
    this.selectedCategoryName = product.productName;
    this.isOpenSelectBox = false;
  }

  registerSeries() {
    this.registerVideoAction({
      videoTitle: '',
      youtubeId: '',
      productName: 'D_ERP',
      productCode: 'ERP',
      uploadDate: Date.now(),
      updateDate: Date.now(),
      playTime: 1010,
      viewCount: 500,

      empName: '김인수',
      deptPath: '플랫폼개발1팀',
      description: '더존 DEWS_UI 제픔관련 동영상 입니다.',

      isSeries: true,
      seriesTitle: 'DEWS/UI 데모 시리즈',
      series: [
        {
          videoTitle: 'DEWS/UI 첫번째',
          youtubeId: 'ttt',
          groupId: '',
          productCode: 'ERP',
          productName: 'D_ERP',
          uploadDate: Date.now(),
          updateDate: Date.now(),
          playTime: 1010,
          viewCount: 500,

          empName: '김인수',
          deptPath: '플랫폼개발1팀',
          description: '더존 DEWS_UI 제픔관련 동영상 입니다.',

          isSeries: true,
        },
        {
          videoTitle: 'DEWS/UI 두번째',
          youtubeId: 'ttt',
          groupId: '',
          productCode: 'ERP',
          productName: 'D_ERP',
          uploadDate: Date.now(),
          updateDate: Date.now(),
          playTime: 1010,
          viewCount: 500,

          empName: '김인수',
          deptPath: '플랫폼개발1팀',
          description: '더존 DEWS_UI 제픔관련 동영상 입니다.',

          isSeries: true,
        },
      ],
    });
  }

  registerSingle() {
    this.registerVideoAction({
      videoTitle: '더존 클라우드 시연 영상',
      youtubeId: 'ttt',
      productCode: 'ERP',
      productName: 'D_ERP',
      uploadDate: Date.now(),
      updateDate: Date.now(),
      playTime: 1010,
      viewCount: 500,

      empName: '김인수',
      deptPath: '플랫폼개발1팀',
      description: '더존 DEWS_UI 제픔관련 동영상 입니다.',

      isSeries: false,
      series: [],
    });
  }
}
</script>

<style scoped></style>
