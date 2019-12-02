<template>
  <div class="container-panel">
    <div class="view-top mgb-15">
      <h2 class="tit-con-text">동영상 {{ $route.params.productName }}</h2>
    </div>
    <div class="player-container">
      <div class="movie-area mgb-20">
        <iframe
          width="560"
          height="315"
          :src="`https://www.youtube.com/embed/${video.youtubeId}`"
          frameborder="0"
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
        ></iframe>
      </div>
      <div class="movie-clip-info">
        <div class="movie-title-area">
          <h3 class="tit-video mgb-10">
            {{ video.videoTitle }}
          </h3>
          <span class="fr">
            <button type="button" class="dbs-icon-button ico-left small prev">
              이전
            </button>
            <button type="button" class="dbs-icon-button ico-left small next">
              다음
            </button>
          </span>
        </div>
        <div class="movie-info mgb-20">
          <div class="user-info">
            <span>{{ formatDate(video.uploadDate) }}</span>
            <span class="hit">{{ video.viewCount }}</span>
            <span>{{ video.empName }}({{ video.deptPath }})</span>
          </div>
          <!-- 관리자 일때 만 -->
          <div class="administer">
            <a href="#modify">수정</a
            ><a href="#admin" class="font-accent-color">관리</a>
          </div>
        </div>
        <div class="movie-body">
          <div class="tit-video-desc mgt-20 mgb-40">
            {{ video.description }}
          </div>
          <!-- TO  DO 시리즈 일때 : movie-aside -->
          <div class="movie-aside">
            <h3 class="tit-con-sub mgb-10">시리즈 내 다른 동영상</h3>
            <div class="scrollbar-box">
              <ul class="thumb-list small">
                <li>
                  <div class="thumb">
                    <img src="../../assets/images/mov_01.jpg" alt="" />
                    <em class="btn-time">10:23</em>
                  </div>
                  <dl class="thumb-desc">
                    <!-- TO DO 두줄 이상인 경우 말줄임으로 나오게 해주세요 -->
                    <dt>
                      <i class="icon-new">N</i>2019-11-23 DEWS/UI 세미나 영상
                      제목이 긴 경우
                    </dt>
                    <dd>3일전<span class="hit">조회 300</span></dd>
                  </dl>
                </li>
                <li>
                  <div class="thumb">
                    <img src="../../assets/images/mov_02.jpg" alt="" />
                  </div>
                  <dl class="thumb-desc">
                    <dt>DEWS/UI 기초 교육 시리즈</dt>
                    <dd>2019-09-24<span class="hit">조회 1039</span></dd>
                  </dl>
                </li>
                <li>
                  <div class="thumb">
                    <img src="../../assets/images/mov_03.jpg" alt="" />
                    <em class="btn-time">1:30:41</em>
                  </div>
                  <dl class="thumb-desc">
                    <dt>DEWS 플랫폼 CM - UI편</dt>
                    <dd>2019-09-24<span class="hit">조회 1039</span></dd>
                  </dl>
                </li>
                <li>
                  <div class="thumb">
                    <img src="../../assets/images/mov_04.jpg" alt="" />
                    <em class="btn-time">10:23</em>
                  </div>
                  <dl class="thumb-desc">
                    <dt>2019 DEWS/UI 세미나 자료</dt>
                    <dd>2019-09-24<span class="hit">조회 1039</span></dd>
                  </dl>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="topic-button-wrap mgb-40">
      <span class="fr"
        ><button type="button" class="dbs-icon-button ico-left small list">
          목록
        </button>
      </span>
    </div>
    <h1 class="tit-con-sub mgb-15">DEWS/UI의 다른 동영상</h1>
    <div class="box-gray-round mgb-80">
      <ul class="thumb-list small recommend-clip-area">
        <li>
          <div class="thumb">
            <img src="../../assets/images/mov_01.jpg" alt="" />
            <em class="btn-time">10:23</em>
          </div>
          <dl class="thumb-desc">
            <!-- TO DO 두줄 이상인 경우 말줄임으로 나오게 해주세요 -->
            <dt>
              <i class="icon-new">N</i>2019-11-23 DEWS/UI 세미나 영상 제목이 긴
              경우
            </dt>
            <dd>3일전<span class="hit">조회 300</span></dd>
          </dl>
        </li>
        <li>
          <div class="thumb">
            <img src="../../assets/images/mov_02.jpg" alt="" />
          </div>
          <dl class="thumb-desc">
            <dt>DEWS/UI 기초 교육 시리즈</dt>
            <dd>2019-09-24<span class="hit">조회 1039</span></dd>
          </dl>
        </li>
        <li>
          <div class="thumb">
            <img src="../../assets/images/mov_03.jpg" alt="" />
            <em class="btn-time">1:30:41</em>
          </div>
          <dl class="thumb-desc">
            <dt>DEWS 플랫폼 CM - UI편</dt>
            <dd>2019-09-24<span class="hit">조회 1039</span></dd>
          </dl>
        </li>
        <li>
          <div class="thumb">
            <img src="../../assets/images/mov_04.jpg" alt="" />
            <em class="btn-time">10:23</em>
          </div>
          <dl class="thumb-desc">
            <dt>2019 DEWS/UI 세미나 자료</dt>
            <dd>2019-09-24<span class="hit">조회 1039</span></dd>
          </dl>
        </li>
      </ul>
      <p><a role="button" class="arrow prev"></a></p>
      <p><a role="button" class="arrow next"></a></p>
    </div>
  </div>
</template>
<script lang="ts">
import { Vue, Component, namespace } from 'nuxt-property-decorator';
import * as video from '@/store/modules/video';

const Video = namespace('video');

@Component
export default class LibraryVideoDetail extends Vue {
  // @Video.Action('videoDetailById') videoDetailByIdAction!: (string) => void;
  @Video.Getter('selectedVideo') video!: video.Video;

  // async created() {
  //   // 선택한 영상에 대한 상세 정보 조회
  //   await this.videoDetailByIdAction(this.$route.params._id);
  // }
  formatDate(date) {
    const d = new Date(date);
    let month = '' + (d.getMonth() + 1);
    let day = '' + d.getDate();
    const year = d.getFullYear();
    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;
    return [year, month, day].join('-');
  }
}
</script>

<style lang="scss"></style>
