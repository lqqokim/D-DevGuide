<template>
  <div class="movie-register-thumb single">
    <ul class="thumb-list">
      <template v-if="video.youtubeId">
        <li class="main-video">
          <div class="thumb">
            <img
              ref="image"
              :src="
                `https://img.youtube.com/vi/${video.youtubeId}/maxresdefault.jpg`
              "
              alt=""
            />
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
        ></li>
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
  @Watch('video', { immediate: true, deep: true })
  onVideoChange(val, oldVal) {
    // console.log('onVideoChange', val);
  }
  description!: string;

  $refs!: {
    image: any;
  };

  @Emit('remove-video')
  removeVideo() {
    return '';
  }
}
</script>
