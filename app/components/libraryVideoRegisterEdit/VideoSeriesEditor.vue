<template>
  <div class="movie-register-thumb series">
    <ul class="thumb-list">
      <!--      <li v-if="video.youtubeId" class="main-video">-->
      <!--        <div class="thumb">-->
      <!--          <button type="button" class="dbs-icon-move vertical">-->
      <!--            위아래 이동-->
      <!--          </button>-->
      <!--          <img-->
      <!--            :src="-->
      <!--              `https://img.youtube.com/vi/${video.youtubeId}/maxresdefault.jpg`-->
      <!--            "-->
      <!--            alt=""-->
      <!--          />-->
      <!--        </div>-->
      <!--        <dl class="thumb-desc">-->
      <!--          &lt;!&ndash; TODO 두줄 이상인 경우 말줄임으로 나오게 해주세요 &ndash;&gt;-->
      <!--          <dt class="ellipsis">-->
      <!--            {{ video.tempSeriesVideoTitle }}-->
      <!--          </dt>-->
      <!--          <dd>-->
      <!--            YouTube ID : {{ video.youtubeId }}-->
      <!--            &lt;!&ndash; 관리자 일때 만 &ndash;&gt;-->
      <!--            <span class="administer"-->
      <!--              ><a class="font-accent-color" @click="removeVideo">삭제</a></span-->
      <!--            >-->
      <!--          </dd>-->
      <!--        </dl>-->
      <!--      </li>-->

      <template v-if="seriesVideos.length">
        <li
          v-for="(seriesVideo, index) in seriesVideos"
          :key="index"
          class="main-video"
        >
          <div class="thumb">
            <button type="button" class="dbs-icon-move vertical">
              위아래 이동
            </button>
            <img
              :src="
                `https://img.youtube.com/vi/${seriesVideo.youtubeId}/maxresdefault.jpg`
              "
              alt=""
            />
          </div>
          <dl class="thumb-desc">
            <!-- TODO 두줄 이상인 경우 말줄임으로 나오게 해주세요 -->
            <dt class="ellipsis">
              {{ seriesVideo.videoTitle }}
            </dt>
            <dd>
              YouTube ID : {{ seriesVideo.youtubeId }}
              <!-- 관리자 일때 만 -->
              <span class="administer"
                ><a class="font-accent-color" @click="removeVideoSeries(index)"
                  >삭제</a
                ></span
              >
            </dd>
          </dl>
        </li>
      </template>
    </ul>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Prop, Watch, Emit } from 'nuxt-property-decorator';
import { IVideo } from '@/store/modules/video';

@Component
export default class VideoSeriesEditor extends Vue {
  @Prop() readonly seriesVideos!: IVideo[];
  @Prop() readonly video!: IVideo;
  @Watch('seriesVideos', { immediate: true, deep: true })
  onVideoChange(val) {
    console.log('onVideoChange', val);
  }
  description!: string;

  @Emit('remove-video-series')
  removeVideoSeries(index: number) {
    return index;
  }
}
</script>
<style>
.border {
  border: gray dashed 2px;
  width: 231px;
  height: 131px;
}
</style>
