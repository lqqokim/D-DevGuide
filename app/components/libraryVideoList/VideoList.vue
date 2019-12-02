<template>
  <div>
    <h1 class="tit-h1">동영상</h1>
    <div class="view-top pdb-0">
      <div class="sorting-qna">
        <div class="sorting-option">
          <div
            v-for="(product, index) in $store.state.video.products"
            :key="product._id"
          >
            <input
              :id="product._id"
              :checked="index === 0"
              type="radio"
              name="sort"
            />
            <label :for="product._id" @click="onclickProduct(product)">{{
              product.productName
            }}</label>
          </div>
        </div>
        <nuxt-link
          :to="{
            name: 'videoList',
            params: {
              productName: $store.state.video.selectedProduct.productName,
              productCode: $store.state.video.selectedProduct.productCode,
            },
          }"
          class="qna-more"
          >더보기</nuxt-link
        >
      </div>
    </div>

    <ul class="thumb-list mgt-20 mgb-60">
      <li
        v-for="video in $store.state.video.videosByProduct"
        :key="video._id"
        class="main-video"
      >
        <nuxt-link
          :to="{
            name: 'videoDetail',
            params: {
              productName: video.productName,
              productCode: video.productCode,
              _id: video._id,
            },
          }"
          tag="div"
          class="thumb"
        >
          <img
            :src="
              `https://img.youtube.com/vi/${
                video.isSeries ? video.series[0].youtubeId : video.youtubeId
              }/maxresdefault.jpg`
            "
            alt=""
          />
        </nuxt-link>
        <nuxt-link
          :to="{
            name: 'videoDetail',
            params: {
              productName: video.productName,
              productCode: video.productCode,
              _id: video._id,
            },
          }"
          tag="dl"
          class="thumb-desc"
        >
          <!-- TO DO 두줄 이상인 경우 말줄임으로 나오게 해주세요 -->
          <dt>
            <i class="icon-new">N</i
            >{{ !video.isSeries ? video.videoTitle : video.seriesTitle }}
          </dt>
          <dd>{{ formatDate(video.uploadDate) }}</dd>
        </nuxt-link>
      </li>
    </ul>
  </div>

  <!--  <div class="dbs-container">-->
  <!--    <h1 class="tit-con mgt-50">동영상</h1>-->
  <!--    <div class="position-wrap">-->
  <!--      <h2 class="tit-con-small">-->
  <!--        {{ $store.state.video.selectedProduct.productName }}-->
  <!--      </h2>-->
  <!--    </div>-->
  <!--    <ul class="thumb-list mgt-10">-->
  <!--      <li v-for="video in $store.state.video.videosByProduct" :key="video._id">-->
  <!--        <nuxt-link-->
  <!--          :to="{-->
  <!--            name: 'videoDetail',-->
  <!--            params: {-->
  <!--              productName: video.productName,-->
  <!--              projectId: video.projectId,-->
  <!--              _id: video._id,-->
  <!--            },-->
  <!--          }"-->
  <!--        >-->
  <!--          <div class="thumb">-->
  <!--            <img-->
  <!--              :src="-->
  <!--                `https://img.youtube.com/vi/${-->
  <!--                  video.isSeries ? video.series[0].youtubeId : video.youtubeId-->
  <!--                }/maxresdefault.jpg`-->
  <!--              "-->
  <!--            />-->
  <!--          </div>-->
  <!--        </nuxt-link>-->
  <!--        <dl class="thumb-desc">-->
  <!--          <nuxt-link-->
  <!--            :to="{-->
  <!--              name: 'videoDetail',-->
  <!--              params: {-->
  <!--                productName: video.productName,-->
  <!--                _id: video._id,-->
  <!--              },-->
  <!--            }"-->
  <!--            tag="dt"-->
  <!--            >{{-->
  <!--              !video.isSeries ? video.videoTitle : video.seriesTitle-->
  <!--            }}</nuxt-link-->
  <!--          >-->
  <!--          <dd>-->
  <!--            {{ video.uploadDate }}-->
  <!--            <span class="name">{{ video.empName }}</span>-->
  <!--          </dd>-->
  <!--        </dl>-->
  <!--        <span class="thumb-info"-->
  <!--          ><span class="video-view"-->
  <!--            ><span class="txt">{{ video.playTime }}</span></span-->
  <!--          ><span class="bookmark"-->
  <!--            ><span class="txt">{{ video.viewCount }}</span></span-->
  <!--          ></span-->
  <!--        >-->
  <!--        <div>-->
  <!--          <nuxt-link-->
  <!--            :to="{-->
  <!--              name: 'videoEdit',-->
  <!--              params: {-->
  <!--                video: video,-->
  <!--                _id: video._id,-->
  <!--              },-->
  <!--            }"-->
  <!--            @click.native="onClickEdit(video)"-->
  <!--            >수정</nuxt-link-->
  <!--          >-->
  <!--          <a @click="onRemove(video)">삭제</a>-->
  <!--        </div>-->
  <!--      </li>-->
  <!--    </ul>-->
  <!--    <div class="line"></div>-->
  <!--  </div>-->
</template>
<script lang="ts">
import { Vue, Component, namespace } from 'nuxt-property-decorator';
import * as video from '@/store/modules/video';

const Video = namespace('video');

@Component
export default class VideoList extends Vue {
  @Video.Action('removeVideo') removeVideoAction!: (string) => void;
  @Video.Action('videoDetailById') videoDetailByIdAction!: (string) => void;

  @Video.Action('getVideosByProduct') videosByProductAction!: (string) => void;

  onRemove(video: video.Video): void {
    this.removeVideoAction(video._id);
    alert(`${video._id} 삭제완료`);
  }

  onClickEdit(video: video.Video): void {
    // 성택한 video 상세정보 store 저장
    this.videoDetailByIdAction(video._id);
  }

  onclickProduct(product: video.Product): void {
    this.videosByProductAction(product);
  }

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

<style></style>
