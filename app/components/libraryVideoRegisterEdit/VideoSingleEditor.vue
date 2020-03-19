<template>
  <div class="movie-register-thumb single">
    <ul class="thumb-list">
      <template v-if="video.youtubeId">
        <li class="main-video">
          <div class="thumb">
            <img ref="image" :src="imagePath" alt="" />
            <!--            TODO playtime-->
            <!--            <em class="btn-time">{{ video.playTime }}</em>-->
          </div>
          <dl class="thumb-desc">
            <dt class="ellipsis">
              {{ video.videoTitle }}
            </dt>
            <dd>
              YouTube ID : {{ video.youtubeId }}
              <span class="administer"
                ><a class="font-accent-color" @click="removeVideo"
                  >삭제</a
                ></span
              >
            </dd>
          </dl>
        </li>
      </template>
      <template v-else>
        <li
          class="main-video"
          style="border: 1px solid #dbdbdb; width: 231px; height: 131px;"
        />
      </template>
    </ul>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Prop, Emit, Watch } from 'nuxt-property-decorator';
import { IVideo } from '@/store/modules/video';

@Component
export default class VideoSingleEditor extends Vue {
  @Prop() readonly video!: IVideo;

  description!: string;

  $refs!: {
    image: any;
  };

  get imagePath() {
    return `https://img.youtube.com/vi/${this.video.youtubeId}/${this.$store.state.video.ytbThumbnailQuality}.jpg`;
  }

  @Emit('remove-video')
  removeVideo() {
    return '';
  }
}
</script>
