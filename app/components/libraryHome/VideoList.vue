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
              video: video,
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
          <div v-if="video.isSeries" class="play">
            <span class="count">{{ video.series.length }}</span>
            <em class="icon-playlist"></em>
          </div>
        </nuxt-link>
        <nuxt-link
          :to="{
            name: 'videoDetail',
            params: {
              productName: video.productName,
              productCode: video.productCode,
              _id: video._id,
              video: video,
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
import * as video from '@/store/modules/video';

const Video = namespace('video');

@Component({})
export default class VideoList extends Vue {
  @Video.Action('getVideosByProduct') videosByProductAction!: (
    arg0: video.Product
  ) => void;

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
<style scoped></style>
