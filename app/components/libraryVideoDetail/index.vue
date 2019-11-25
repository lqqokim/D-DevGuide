<template>
  <div class="dbs-container-wrap">
    <div class="viewer-wrap">
      <div class="dbs-top-image-wrap movie">
        <div class="dbs-top-image">
          <dl>
            <dt>동영상</dt>
            <dd>
              동영상 서브 텍스트입니다. <br />
              동영상 서브 텍스트입니다 서브 텍스트입니다.
            </dd>
          </dl>
        </div>
      </div>
    </div>
    <div class="dbs-container">
      <h1 class="tit-con mgt-50">{{ video.productName }}</h1>
      <div class="player-container">
        <div class="video-player">
          <div class="video-area">
            <iframe
              width="865"
              height="500"
              :src="`https://www.youtube.com/embed/${video.youtubeId}`"
              frameborder="0"
              allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen
            ></iframe>
          </div>
          <div class="video-clip-info">
            <h3 class="tit-video">
              {{ video.videoTitle }}
            </h3>
            <div class="tit-info">
              <span class="thumb-info"
                ><span class="video-view"
                  ><span class="txt">{{ video.playTime }}</span></span
                ><span class="bookmark"
                  ><span class="txt">{{ video.viewCount }}</span></span
                ></span
              >
              <span class="date">{{ video.uploadDate }}</span>
            </div>
            <div class="line mgt-20"></div>
            <div class="video-content">
              <div class="video-avatar">
                <img
                  src="http://dbs.douzone.com/images/icon/ico_profile_1.svg"
                />
              </div>
              <div class="video-detail">
                <dl class="tit">
                  <dt>
                    <strong>{{ video.empName }} | {{ video.depthPath }}</strong
                    ><span>2019.08.15 15:12</span>
                  </dt>
                  <dd class="desc">
                    {{ video.description }}
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
        <div class="video-aside">
          <h4 class="tit-video-small">관련 동영상</h4>
          <ul class="photo-row-list">
            <li>
              <div class="inner">
                <a href="" class="thumb">
                  <img
                    alt=""
                    width="120"
                    height="80"
                    src="https://i.ytimg.com/vi/hxnrBY1bRtw/hqdefault.jpg?sqp=-oaymwEYCKgBEF5IVfKriqkDCwgBFQAAiEIYAXAB&amp;rs=AOn4CLDCG-x3I2Kqo8bIAer53-1U49VBPw"
                  />
                </a>
                <dl>
                  <dt>기업을 위한 통합경영관리 프로그램</dt>
                  <dd>더존</dd>
                  <dd>
                    <span class="video-view"><span class="txt">298</span></span
                    ><span class="bookmark"><span class="txt">34</span></span>
                  </dd>
                </dl>
              </div>
            </li>
            <li>
              <div class="inner">
                <a href="" class="thumb">
                  <img
                    alt=""
                    width="120"
                    height="80"
                    src="https://i.ytimg.com/vi/huF9H9SHAGA/hqdefault.jpg?sqp=-oaymwEYCKgBEF5IVfKriqkDCwgBFQAAiEIYAXAB&rs=AOn4CLDy-YHOafrn2uGsNH79yMdw7Oc77A"
                  />
                </a>
                <dl>
                  <dt>D_ERP DICS 소개 프로그램</dt>
                  <dd>더존</dd>
                  <dd>
                    <span class="video-view"><span class="txt">298</span></span
                    ><span class="bookmark"><span class="txt">34</span></span>
                  </dd>
                </dl>
              </div>
            </li>
            <li>
              <div class="inner">
                <a href="" class="thumb">
                  <img
                    alt=""
                    width="120"
                    height="80"
                    src="https://i.ytimg.com/vi/Z9_-4d3LDw0/hqdefault.jpg?sqp=-oaymwEYCKgBEF5IVfKriqkDCwgBFQAAiEIYAXAB&rs=AOn4CLCFuflEnm2bWvFxH7KfKIhX2kOuQw"
                  />
                </a>
                <dl>
                  <dt>더존 IT그룹 홍보CF</dt>
                  <dd>더존</dd>
                  <dd>
                    <span class="video-view"><span class="txt">50</span></span
                    ><span class="bookmark"><span class="txt">3</span></span>
                  </dd>
                </dl>
              </div>
            </li>
            <li>
              <div class="inner">
                <a href="" class="thumb">
                  <img
                    alt=""
                    width="120"
                    height="80"
                    src="https://i.ytimg.com/vi/hxnrBY1bRtw/hqdefault.jpg?sqp=-oaymwEYCKgBEF5IVfKriqkDCwgBFQAAiEIYAXAB&amp;rs=AOn4CLDCG-x3I2Kqo8bIAer53-1U49VBPw"
                  />
                </a>
                <dl>
                  <dt>더존 ERP iU 도입사례_ 싸이버로지텍 편</dt>
                  <dd>더존</dd>
                  <dd>
                    <span class="video-view"
                      ><span class="txt">2,008</span></span
                    ><span class="bookmark"><span class="txt">34</span></span>
                  </dd>
                </dl>
              </div>
            </li>
          </ul>
          <div class="line mgt-20 mgb-20"></div>
          <h4 class="tit-video-small">추천 동영상</h4>
          <ul class="photo-row-list">
            <li>
              <div class="inner">
                <a href="" class="thumb">
                  <img
                    alt=""
                    width="120"
                    height="80"
                    src="https://i.ytimg.com/vi/hxnrBY1bRtw/hqdefault.jpg?sqp=-oaymwEYCKgBEF5IVfKriqkDCwgBFQAAiEIYAXAB&amp;rs=AOn4CLDCG-x3I2Kqo8bIAer53-1U49VBPw"
                  />
                </a>
                <dl>
                  <dt>기업을 위한 통합경영관리 프로그램</dt>
                  <dd>더존</dd>
                  <dd>
                    <span class="video-view"><span class="txt">298</span></span
                    ><span class="bookmark"><span class="txt">34</span></span>
                  </dd>
                </dl>
              </div>
            </li>
            <li>
              <div class="inner">
                <a href="" class="thumb">
                  <img
                    alt=""
                    width="120"
                    height="80"
                    src="https://i.ytimg.com/vi/huF9H9SHAGA/hqdefault.jpg?sqp=-oaymwEYCKgBEF5IVfKriqkDCwgBFQAAiEIYAXAB&rs=AOn4CLDy-YHOafrn2uGsNH79yMdw7Oc77A"
                  />
                </a>
                <dl>
                  <dt>D_ERP DICS 소개 프로그램</dt>
                  <dd>더존</dd>
                  <dd>
                    <span class="video-view"><span class="txt">298</span></span
                    ><span class="bookmark"><span class="txt">34</span></span>
                  </dd>
                </dl>
              </div>
            </li>
            <li>
              <div class="inner">
                <a href="" class="thumb">
                  <img
                    alt=""
                    width="120"
                    height="80"
                    src="https://i.ytimg.com/vi/Z9_-4d3LDw0/hqdefault.jpg?sqp=-oaymwEYCKgBEF5IVfKriqkDCwgBFQAAiEIYAXAB&rs=AOn4CLCFuflEnm2bWvFxH7KfKIhX2kOuQw"
                  />
                </a>
                <dl>
                  <dt>더존 IT그룹 홍보CF</dt>
                  <dd>더존</dd>
                  <dd>
                    <span class="video-view"><span class="txt">50</span></span
                    ><span class="bookmark"><span class="txt">3</span></span>
                  </dd>
                </dl>
              </div>
            </li>
            <li>
              <div class="inner">
                <a href="" class="thumb">
                  <img
                    alt=""
                    width="120"
                    height="80"
                    src="https://i.ytimg.com/vi/hxnrBY1bRtw/hqdefault.jpg?sqp=-oaymwEYCKgBEF5IVfKriqkDCwgBFQAAiEIYAXAB&amp;rs=AOn4CLDCG-x3I2Kqo8bIAer53-1U49VBPw"
                  />
                </a>
                <dl>
                  <dt>더존 ERP iU 도입사례_ 싸이버로지텍 편</dt>
                  <dd>더존</dd>
                  <dd>
                    <span class="video-view"
                      ><span class="txt">2,008</span></span
                    ><span class="bookmark"><span class="txt">34</span></span>
                  </dd>
                </dl>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="side-button"></div>
  </div>
</template>
<script lang="ts">
import { Vue, Component, namespace } from 'nuxt-property-decorator';
import * as video from '@/store/modules/video';

const Video = namespace('video');

@Component
export default class LibraryVideoDetail extends Vue {
  @Video.Action('videoDetailById') videoDetailByIdAction!: (string) => void;
  @Video.Getter('selectedVideo') video!: video.Video;

  async created() {
    // 선택한 영상에 대한 상세 정보 조회
    await this.videoDetailByIdAction(this.$route.params._id);
  }
}
</script>

<style lang="scss"></style>
