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

      <template v-if="localSeriesVideos.length">
        <!--        <draggable-->
        <!--          v-model="localSeriesVideos"-->
        <!--          :options="{-->
        <!--            group: 'productCode',-->
        <!--            handle: '.dbs-icon-move',-->
        <!--            animation: 300,-->
        <!--          }"-->
        <!--          @change="draggableChange"-->
        <!--        >-->
        <draggable
          v-model="localSeriesVideos"
          group="_id"
          handle=".dbs-icon-move"
          animation="300"
          @change="draggableChange"
        >
          <li
            v-for="(seriesVideo, index) in localSeriesVideos"
            :key="index"
            class="main-video"
          >
            <div class="thumb" style="cursor: auto;">
              <button
                type="button"
                class="dbs-icon-move vertical"
                style="cursor: move;"
              >
                위아래 이동
              </button>
              <img :src="imagePath(seriesVideo)" alt="" />
              <em v-if="seriesVideo.playTime" class="btn-time">{{
                seriesVideo.playTime
              }}</em>
            </div>
            <dl class="thumb-desc">
              <!-- TODO 두줄 이상인 경우 말줄임으로 나오게 해주세요 -->
              <dt class="ellipsis">
                {{ seriesVideo.videoTitle }}
              </dt>
              <dd>
                <p>YouTube ID : {{ seriesVideo.youtubeId }}</p>
                <!-- 관리자 일때 만 -->
                <span class="administer"
                  ><a
                    class="font-accent-color"
                    @click="removeVideoSeries(index)"
                    >삭제</a
                  ></span
                >
              </dd>
            </dl>
          </li>
        </draggable>
      </template>
    </ul>
  </div>
</template>
<script lang="ts">
import draggable from 'vuedraggable';
import { Component, Vue, Prop, Watch, Emit } from 'nuxt-property-decorator';
import { IVideo } from '@/store/modules/video';

@Component({
  components: {
    draggable,
  },
})
export default class VideoSeriesEditor extends Vue {
  @Prop() readonly seriesVideos!: IVideo[];
  @Prop() readonly video!: IVideo;
  @Watch('seriesVideos', { immediate: true, deep: true })
  onSeriesVideosChange(val) {
    // console.log('onSeriesVideosChange', val);
    this.localSeriesVideos = val;
  }
  description!: string;

  localSeriesVideos: IVideo[] = [];

  imagePath(video) {
    return `https://img.youtube.com/vi/${video.youtubeId}/${this.$store.state.video.ytbThumbnailQuality}.jpg`;
  }

  @Emit('change-series-videos')
  draggableChange(e) {
    return this.localSeriesVideos;
  }

  @Emit('remove-video-series')
  removeVideoSeries(index: number) {
    return index;
  }
}
</script>
<style lang="css" scoped>
ul.thumb-list > div {
  margin: 0 30px 0 30px;
}
</style>
