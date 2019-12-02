<template>
  <!-- // 좌측메뉴 E -->
  <div class="container-panel">
    <div class="view-top">
      <p class="tit-con-qna">동영상 {{ $route.params.productName }}</p>
      <div class="register">
        <button
          type="button"
          class="btn-main blue small"
          @click="
            $router.push({
              name: 'registerVideo',
              params: {
                productCode: $store.state.video.selectedProduct.productCode,
                productName: $store.state.video.selectedProduct.productName,
              },
            })
          "
        >
          추가
        </button>
        <button
          type="button"
          class="btn-main blue small"
          @click="
            $router.push({
              name: 'registerVideoSeries',
              params: {
                productCode: $store.state.video.selectedProduct.productCode,
                productName: $store.state.video.selectedProduct.productName,
              },
            })
          "
        >
          시리즈 추가
        </button>
      </div>
    </div>
    <ul class="thumb-list video mgt-20 mgb-60">
      <li v-for="video in $store.state.video.videosByProduct" :key="video._id">
        <div class="thumb">
          <img
            :src="
              `https://img.youtube.com/vi/${
                video.isSeries ? video.series[0].youtubeId : video.youtubeId
              }/maxresdefault.jpg`
            "
            alt=""
          />
          <em class="btn-time">{{ video.playTime }}</em>
          <div v-if="video.isSeries" class="play">
            <span class="count">{{ video.series.length }}</span>
            <em class="icon-playlist"></em>
          </div>
        </div>
        <dl class="thumb-desc">
          <!-- TO DO 두줄 이상인 경우 말줄임으로 나오게 해주세요 -->
          <dt>
            <i class="icon-new">N</i>
            {{ !video.isSeries ? video.videoTitle : video.seriesTitle }}
          </dt>
          <dd>
            {{ formatDate(video.uploadDate)
            }}<span class="hit"> {{ video.viewCount }}</span>
          </dd>
          <dd>
            {{ video.empName }} ({{ video.deptPath }})
            <!-- 관리자 일때 만 --><span class="administer"
              ><a href="#modify">수정</a
              ><a href="#admin" class="font-accent-color">관리</a></span
            >
          </dd>
        </dl>
      </li>
    </ul>
    <div class="btn-wrap mgb-80">
      <button type="button" class="btn-main small">더보기</button>
    </div>
  </div>
</template>
<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator';
import VideoList from './VideoList.vue';

@Component({
  components: {
    VideoList,
  },
})
export default class LibraryVideoList extends Vue {
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

<style scoped></style>
