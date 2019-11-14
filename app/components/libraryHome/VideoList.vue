<template>
  <div class="dbs-container">
    <h1 class="tit-con mgt-50">동영상</h1>
    <div class="position-wrap">
      <h2 class="tit-con-small">D_ERP</h2>
      <nuxt-link class="pst-more" to="/library/video/:productType"
        >더보기</nuxt-link
      >
    </div>
    <ul class="thumb-list mgt-10">
      <li
        v-for="video in $store.state.video.videosByProduct.slice(0, 5)"
        :key="video._id"
      >
        <nuxt-link
          :to="{
            name: 'videoDetail',
            params: {
              productType: video.productType,
              _id: video._id,
            },
          }"
        >
          <div class="thumb">
            <img
              src="https://i.ytimg.com/vi/huF9H9SHAGA/hqdefault.jpg?sqp=-oaymwEZCNACELwBSFXyq4qpAwsIARUAAIhCGAFwAQ==&rs=AOn4CLD7292MGL79hY8MiMFu51WOa3MaTg"
            />
          </div>
        </nuxt-link>
        <dl class="thumb-desc">
          <nuxt-link
            :to="{
              name: 'videoDetail',
              params: {
                productType: video.productType,
                _id: video._id,
              },
            }"
            tag="dt"
            >{{
              !video.isSeries ? video.videoTitle : video.seriesTitle
            }}</nuxt-link
          >
          <dd>
            {{ video.uploadDate }} <span class="name">{{ video.empName }}</span>
          </dd>
        </dl>
        <span class="thumb-info"
          ><span class="video-view"
            ><span class="txt">{{ video.playTime }}</span></span
          ><span class="bookmark"
            ><span class="txt">{{ video.viewCount }}</span></span
          ></span
        >
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
    <div class="line"></div>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator';

@Component({})
export default class VideoList extends Vue {}
</script>
<style lang="scss"></style>
