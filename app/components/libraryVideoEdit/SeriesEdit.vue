<template>
  <div>
    시리즈 수정

    <button @click="onClickUp">UP</button>
    <button @click="onClickDown">DOWN</button>
    <button @click="onClickUpdate">수정하기</button>

    <ul class="thumb-list mgt-10">
      <li
        v-for="(video, index) in $store.state.video.selectedVideo.series"
        :key="video._id"
        ref="videoRef"
        class="videoSelect"
        @click="onClickVideo(video, index)"
      >
        <a>
          <div class="thumb">
            <img
              :src="
                `https://img.youtube.com/vi/${video.youtubeId}/maxresdefault.jpg`
              "
            />
          </div>
        </a>

        <dl class="thumb-desc">
          {{ video.videoTitle }}
          <dd>
            {{ video.uploadDate }}
            <span class="name">{{ video.empName }}</span>
          </dd>
        </dl>
        <span class="thumb-info"
          ><span class="video-view"
            ><span class="txt">{{ video.playTime }}</span></span
          ><span class="bookmark"
            ><span class="txt">{{ video.viewCounts }}</span></span
          ></span
        >
        <div>
          <a @click="onRemove(video)">삭제</a>
        </div>
      </li>
    </ul>
  </div>
</template>
<script lang="ts">
import { Vue, Component, namespace, Watch } from 'nuxt-property-decorator';
import * as video from '@/store/modules/video';

const Video = namespace('video');

@Component
export default class SeriesEdit extends Vue {
  $refs!: {
    videoRef: HTMLFormElement;
    bar: HTMLFormElement;
  };

  @Video.Mutation('selectedVideo') selectedVideoMutation!: (
    arg0: video.Video
  ) => void;
  selectedSeriesVideo!: video.Video;

  onRemove(video): void {
    console.log('onRemove ', video);
  }

  onClickVideo(video, index: number): void {
    this.$refs.videoRef.map((el: HTMLElement) => {
      if (el.classList.contains('selected')) {
        el.classList.remove('selected');
      }
    });

    this.$refs.videoRef[index].classList.add('selected');
    this.selectedSeriesVideo = video;
  }

  onClickUp(): void {
    const selectedVideo: video.Video = this.$store.state.video.selectedVideo;
    const series: Array<video.Video> = selectedVideo.series;

    const selectedIndex: number = series.indexOf(this.selectedSeriesVideo);
    const selectedSeriesVideo: video.Video = series[selectedIndex - 1];
    series[selectedIndex - 1] = this.selectedSeriesVideo;
    series[selectedIndex] = selectedSeriesVideo;

    console.log('up series :: ', selectedVideo);
    this.selectedVideoMutation(selectedVideo);
  }

  onClickDown(): void {
    const selectedVideo: video.Video = this.$store.state.video.selectedVideo;
    const series: Array<video.Video> = selectedVideo.series;

    const selectedIndex: number = series.indexOf(this.selectedSeriesVideo);
    const selectedSeriesVideo: video.Video = series[selectedIndex + 1];
    series[selectedIndex + 1] = this.selectedSeriesVideo;
    series[selectedIndex] = selectedSeriesVideo;

    console.log('down series :: ', selectedVideo);
    this.selectedVideoMutation(selectedVideo);
  }

  onClickUpdate(): void {}
}
</script>

<style scoped>
.videoSelect:hover {
  background-color: #00b7ff;
}

.videoSelect.selected {
  background-color: #00b7ff;
}
</style>
