<template>
  <div>
    <h1 class="tit-h1">동영상</h1>
    <div class="view-top pdb-0">
      <div class="sorting-qna">
        <div class="sorting-option">
          <div
            v-for="product in $store.state.video.products"
            :key="product.productCode"
          >
            <input
              :id="product.productCode + '_video'"
              :checked="selectedProduct.productCode === product.productCode"
              type="radio"
              name="sort-video"
            />
            <label
              :for="product.productCode + '_video'"
              @click="onclickProduct(product)"
              >{{ product.productName }}</label
            >
          </div>
        </div>
        <nuxt-link
          :to="{
            name: 'videoList',
            params: {
              productCode: $store.state.video.selectedProduct.productCode,
              product: $store.state.video.selectedProduct,
            },
          }"
          class="qna-more"
          >더보기</nuxt-link
        >
      </div>
    </div>

    <ul class="thumb-list mgt-20 mgb-60">
      <li
        v-for="video in selectedProduct.managedVideos"
        :key="video._id"
        class="main-video"
      >
        <div class="thumb" @click="onclickVideoDetail(video)">
          <img
            :src="
              `https://img.youtube.com/vi/${
                video.isSeries ? video.series[0].youtubeId : video.youtubeId
              }/maxresdefault.jpg`
            "
            alt=""
          />
          <em v-if="video.playTime" class="btn-time">{{ video.playTime }}</em>
          <div v-if="video.isSeries" class="play">
            <span class="count">{{ video.series.length }}</span>
            <em class="icon-playlist"></em>
          </div>
        </div>
        <nuxt-link
          :to="{
            name: 'videoDetail',
            params: {
              productCode: video.productCode,
              _id: video.isSeries ? video.series[0]._id : video._id,
              video: video,
            },
          }"
          tag="dl"
          class="thumb-desc"
        >
          <!-- TODO 두줄 이상인 경우 말줄임으로 나오게 해주세요 -->
          <dt>
            <i v-if="isNew(video.uploadDate)" class="icon-new">N</i
            >{{ !video.isSeries ? video.videoTitle : video.seriesTitle }}
          </dt>
          <!--          <dd v-if="isNew(video.updateDate)">-->
          <!--            {{ dayDiff(video.uploadDate) }} 일전-->
          <!--          </dd>-->
          <dd>{{ convertDateFormat(video.uploadDate) }}</dd>
        </nuxt-link>
      </li>
    </ul>

    <!--<ul class="thumb-list mgt-10">-->
    <!--<li>-->
    <!--<a href="">-->
    <!--<div class="thumb">-->
    <!--<img-->
    <!--src="https://i.ytimg.com/vi/huF9H9SHAGA/hqdefault.jpg?sqp=-oaymwEZCNACELwBSFXyq4qpAwsIARUAAIhCGAFwAQ==&rs=AOn4CLD7292MGL79hY8MiMFu51WOa3MaTg"-->
    <!--/>-->
    <!--</div>-->
    <!--</a>-->
    <!--<dl class="thumb-desc">-->
    <!--<dt>더존 IT그룹 홍보CF</dt>-->
    <!--<dd>5시간 전 <span class="name">더존</span></dd>-->
    <!--</dl>-->
    <!--<span class="thumb-info"-->
    <!--&gt;<span class="video-view"><span class="txt">298</span></span-->
    <!--&gt;<span class="bookmark"><span class="txt">34</span></span></span-->
    <!--&gt;-->
    <!--</li>-->
    <!--<li>-->
    <!--<a href="">-->
    <!--<div class="thumb">-->
    <!--<img-->
    <!--src="https://i.ytimg.com/vi/GIwTZ0fjz7s/hqdefault.jpg?sqp=-oaymwEZCNACELwBSFXyq4qpAwsIARUAAIhCGAFwAQ==&rs=AOn4CLB9JXtkfsb-WSRR0gOytPOaYfFS3Q"-->
    <!--/>-->
    <!--</div>-->
    <!--</a>-->
    <!--<dl class="thumb-desc">-->
    <!--<dt>D_ERP DICS 소개CF</dt>-->
    <!--<dd>1일전 <span class="name">김더존</span></dd>-->
    <!--</dl>-->
    <!--<span class="thumb-info"-->
    <!--&gt;<span class="video-view"><span class="txt">298</span></span-->
    <!--&gt;<span class="bookmark"><span class="txt">34</span></span></span-->
    <!--&gt;-->
    <!--</li>-->
    <!--<li>-->
    <!--<a href="">-->
    <!--<div class="thumb">-->
    <!--<img-->
    <!--src="https://i.ytimg.com/vi/vtboZ3eH_ww/hqdefault.jpg?sqp=-oaymwEZCNACELwBSFXyq4qpAwsIARUAAIhCGAFwAQ==&rs=AOn4CLB9UDPw-1vCflwQTWWuc16TIAoO1Q"-->
    <!--/>-->
    <!--</div>-->
    <!--</a>-->
    <!--<dl class="thumb-desc">-->
    <!--<dt>기업을 위한 통합경영관리 프로그램 더존 SmartA</dt>-->
    <!--<dd>1주일 전 <span class="name">더존</span></dd>-->
    <!--</dl>-->
    <!--<span class="thumb-info"-->
    <!--&gt;<span class="video-view"><span class="txt">30</span></span-->
    <!--&gt;<span class="bookmark"><span class="txt">5</span></span></span-->
    <!--&gt;-->
    <!--</li>-->
    <!--<li>-->
    <!--<a href="">-->
    <!--<div class="thumb">-->
    <!--<img-->
    <!--src="https://i.ytimg.com/vi/huF9H9SHAGA/hqdefault.jpg?sqp=-oaymwEZCNACELwBSFXyq4qpAwsIARUAAIhCGAFwAQ==&rs=AOn4CLD7292MGL79hY8MiMFu51WOa3MaTg"-->
    <!--/>-->
    <!--</div>-->
    <!--</a>-->
    <!--<dl class="thumb-desc">-->
    <!--<dt>더존 ERP iU 도입사례_ 싸이버로지텍 편</dt>-->
    <!--<dd>한달 전 <span class="name">김더존</span></dd>-->
    <!--</dl>-->
    <!--<span class="thumb-info"-->
    <!--&gt;<span class="video-view"><span class="txt">298</span></span-->
    <!--&gt;<span class="bookmark"><span class="txt">34</span></span></span-->
    <!--&gt;-->
    <!--</li>-->
    <!--<li>-->
    <!--<a href="">-->
    <!--<div class="thumb">-->
    <!--<img-->
    <!--src="https://i.ytimg.com/vi/GIwTZ0fjz7s/hqdefault.jpg?sqp=-oaymwEZCNACELwBSFXyq4qpAwsIARUAAIhCGAFwAQ==&rs=AOn4CLB9JXtkfsb-WSRR0gOytPOaYfFS3Q"-->
    <!--/>-->
    <!--</div>-->
    <!--</a>-->
    <!--<dl class="thumb-desc">-->
    <!--<dt>기업을 위한 통합경영관리 프로그램 더존 SmartA</dt>-->
    <!--<dd>1주일 전<span class="name">김더존</span></dd>-->
    <!--</dl>-->
    <!--<span class="thumb-info"-->
    <!--&gt;<span class="video-view"><span class="txt">1,234</span></span-->
    <!--&gt;<span class="bookmark"><span class="txt">340</span></span></span-->
    <!--&gt;-->
    <!--</li>-->
    <!--<li>-->
    <!--<a href="">-->
    <!--<div class="thumb">-->
    <!--<img-->
    <!--src="https://i.ytimg.com/vi/GIwTZ0fjz7s/hqdefault.jpg?sqp=-oaymwEZCNACELwBSFXyq4qpAwsIARUAAIhCGAFwAQ==&rs=AOn4CLB9JXtkfsb-WSRR0gOytPOaYfFS3Q"-->
    <!--/>-->
    <!--</div>-->
    <!--</a>-->
    <!--<dl class="thumb-desc">-->
    <!--<dt>기업을 위한 통합경영관리 프로그램 더존 SmartA</dt>-->
    <!--<dd>1주일 전<span class="name">김더존</span></dd>-->
    <!--</dl>-->
    <!--<span class="thumb-info"-->
    <!--&gt;<span class="video-view"><span class="txt">1,234</span></span-->
    <!--&gt;<span class="bookmark"><span class="txt">340</span></span></span-->
    <!--&gt;-->
    <!--</li>-->
    <!--<li>-->
    <!--<a href="">-->
    <!--<div class="thumb">-->
    <!--<img-->
    <!--src="https://i.ytimg.com/vi/GIwTZ0fjz7s/hqdefault.jpg?sqp=-oaymwEZCNACELwBSFXyq4qpAwsIARUAAIhCGAFwAQ==&rs=AOn4CLB9JXtkfsb-WSRR0gOytPOaYfFS3Q"-->
    <!--/>-->
    <!--</div>-->
    <!--1-->
    <!--</a>-->
    <!--<dl class="thumb-desc">-->
    <!--<dt>기업을 위한 통합경영관리 프로그램 더존 SmartA</dt>-->
    <!--<dd>1주일 전<span class="name">김더존</span></dd>-->
    <!--</dl>-->
    <!--<span class="thumb-info"-->
    <!--&gt;<span class="video-view"><span class="txt">1,234</span></span-->
    <!--&gt;<span class="bookmark"><span class="txt">340</span></span></span-->
    <!--&gt;-->
    <!--</li>-->
    <!--</ul>-->
  </div>
</template>
<script lang="ts">
import { Component, Vue, namespace } from 'nuxt-property-decorator';
import { IProduct, IVideo, ListParams } from '@/store/modules/video';
import { dateFormat } from '~/utils/commonFuncs';

const Video = namespace('video');

@Component
export default class VideoList extends Vue {
  @Video.Action('getVideosByProduct') videosByProductAction!: (payload: {
    data: IProduct;
    params?: ListParams;
  }) => void;
  @Video.Action('updateVideoCount') updateVideoCountAction!: (
    _id: string
  ) => void;

  selectedProduct!: IProduct;

  created() {
    this.selectedProduct = this.$store.state.video.products[0];
  }

  onclickProduct(product: IProduct): void {
    if (this.selectedProduct._id === product._id) {
      return;
    }

    this.selectedProduct = product;
    this.videosByProductAction({
      data: product,
    });
  }

  onclickVideoDetail(video: IVideo): void {
    // await this.updateVideoCountAction(video._id);
    //
    // if (video.isSeries && !video.groupId) {
    //   video.series[0].viewCount++;
    // } else {
    //   video.viewCount++;
    // }

    // @ts-ignore
    this.$router.push({
      name: 'videoDetail',
      params: {
        productCode: video.productCode,
        _id: video.isSeries ? video.series[0]._id : video._id,
        video,
      },
    });
  }

  isNew(updateDate: number): boolean {
    const standard = 1000 * 3600 * 24;
    // 7일 이내에 등록했을 경우 New 표시
    return (Date.now() - updateDate) / standard < 7;
  }

  convertDateFormat(time): string {
    return dateFormat(time);
  }
}
</script>
<style scoped>
.thumb {
  cursor: pointer;
}

.thumb-desc dt {
  cursor: pointer;
}
</style>
