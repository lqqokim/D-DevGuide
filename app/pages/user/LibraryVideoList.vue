<template>
  <library-video-list></library-video-list>
  <!-- // 좌측메뉴 E -->
  <!--  <div class="container-panel">-->
  <!--    <div class="view-top">-->
  <!--      <p class="tit-con-text">동영상 DEWS / UI</p>-->
  <!--      <div class="register">-->
  <!--        <button type="button" class="btn-main blue small">-->
  <!--          추가-->
  <!--        </button>-->
  <!--        <button type="button" class="btn-main blue small">-->
  <!--          시리즈 추가-->
  <!--        </button>-->
  <!--      </div>-->
  <!--    </div>-->
  <!--    <ul class="thumb-list video mgt-20 mgb-60">-->
  <!--      <li>-->
  <!--        <div class="thumb">-->
  <!--          <img src="../../assets/images/mov_01.jpg" alt="" />-->
  <!--          <em class="btn-time">10:23</em>-->
  <!--          <div class="play">-->
  <!--            <span class="count">12</span>-->
  <!--            <em class="icon-playlist"></em>-->
  <!--          </div>-->
  <!--        </div>-->
  <!--        <dl class="thumb-desc">-->
  <!--          &lt;!&ndash; TO DO 두줄 이상인 경우 말줄임으로 나오게 해주세요 &ndash;&gt;-->
  <!--          <dt>-->
  <!--            <i class="icon-new">N</i>2019-11-23 DEWS/UI 세미나 영상 제목이 긴-->
  <!--            경우-->
  <!--          </dt>-->
  <!--          <dd>3일전<span class="hit">조회 300</span></dd>-->
  <!--          <dd>-->
  <!--            노휘겸(플랫폼개발1팀)-->
  <!--            &lt;!&ndash; 관리자 일때 만 &ndash;&gt;<span class="administer"-->
  <!--          ><a href="#modify">수정</a-->
  <!--          ><a href="#admin" class="font-accent-color">관리</a></span-->
  <!--          >-->
  <!--          </dd>-->
  <!--        </dl>-->
  <!--      </li>-->
  <!--      <li>-->
  <!--        <div class="thumb">-->
  <!--          <img src="../../assets/images/mov_02.jpg" alt="" />-->
  <!--        </div>-->
  <!--        <dl class="thumb-desc">-->
  <!--          <dt>DEWS/UI 기초 교육 시리즈</dt>-->
  <!--          <dd>2019-09-24<span class="hit">조회 1039</span></dd>-->
  <!--          <dd>-->
  <!--            노휘겸(플랫폼개발1팀)-->
  <!--            &lt;!&ndash; 관리자 일때 만 &ndash;&gt;<span class="administer"-->
  <!--          ><a href="#modify">수정</a-->
  <!--          ><a href="#admin" class="font-accent-color">관리</a></span-->
  <!--          >-->
  <!--          </dd>-->
  <!--        </dl>-->
  <!--      </li>-->
  <!--      <li>-->
  <!--        <div class="thumb">-->
  <!--          <img src="../../assets/images/mov_03.jpg" alt="" />-->
  <!--          <em class="btn-time">1:30:41</em>-->
  <!--        </div>-->
  <!--        <dl class="thumb-desc">-->
  <!--          <dt>DEWS 플랫폼 CM - UI편</dt>-->
  <!--          <dd>2019-09-24<span class="hit">조회 1039</span></dd>-->
  <!--          <dd>-->
  <!--            노휘겸(플랫폼개발1팀)-->
  <!--            &lt;!&ndash; 관리자 일때 만 &ndash;&gt;<span class="administer"-->
  <!--          ><a href="#modify">수정</a-->
  <!--          ><a href="#admin" class="font-accent-color">관리</a></span-->
  <!--          >-->
  <!--          </dd>-->
  <!--        </dl>-->
  <!--      </li>-->
  <!--      <li>-->
  <!--        <div class="thumb">-->
  <!--          <img src="../../assets/images/mov_04.jpg" alt="" />-->
  <!--          <em class="btn-time">10:23</em>-->
  <!--        </div>-->
  <!--        <dl class="thumb-desc">-->
  <!--          <dt>2019 DEWS/UI 세미나 자료</dt>-->
  <!--          <dd>2019-09-24<span class="hit">조회 1039</span></dd>-->
  <!--          <dd>-->
  <!--            노휘겸(플랫폼개발1팀)-->
  <!--            &lt;!&ndash; 관리자 일때 만 &ndash;&gt;<span class="administer"-->
  <!--          ><a href="#modify">수정</a-->
  <!--          ><a href="#admin" class="font-accent-color">관리</a></span-->
  <!--          >-->
  <!--          </dd>-->
  <!--        </dl>-->
  <!--      </li>-->
  <!--      <li>-->
  <!--        <div class="thumb">-->
  <!--          <img src="../../assets/images/mov_05.jpg" alt="" />-->
  <!--          <em class="btn-time">1:30:41</em>-->
  <!--        </div>-->
  <!--        <dl class="thumb-desc">-->
  <!--          <dt>DEWS/UI 고급자 교육 시리즈</dt>-->
  <!--          <dd>2019-09-24<span class="hit">조회 300</span></dd>-->
  <!--          <dd>-->
  <!--            노휘겸(플랫폼개발1팀)-->
  <!--            &lt;!&ndash; 관리자 일때 만 &ndash;&gt;<span class="administer"-->
  <!--          ><a href="#modify">수정</a-->
  <!--          ><a href="#admin" class="font-accent-color">관리</a></span-->
  <!--          >-->
  <!--          </dd>-->
  <!--        </dl>-->
  <!--      </li>-->
  <!--      <li>-->
  <!--        <div class="thumb">-->
  <!--          <img src="../../assets/images/mov_03.jpg" alt="" />-->
  <!--          <em class="btn-time">10:23</em>-->
  <!--        </div>-->
  <!--        <dl class="thumb-desc">-->
  <!--          <dt>DEWS 플랫폼 CM - UI편</dt>-->
  <!--          <dd>2019-09-24<span class="hit">조회 300</span></dd>-->
  <!--          <dd>-->
  <!--            노휘겸(플랫폼개발1팀)-->
  <!--            &lt;!&ndash; 관리자 일때 만 &ndash;&gt;<span class="administer"-->
  <!--          ><a href="#modify">수정</a-->
  <!--          ><a href="#admin" class="font-accent-color">관리</a></span-->
  <!--          >-->
  <!--          </dd>-->
  <!--        </dl>-->
  <!--      </li>-->
  <!--    </ul>-->
  <!--    <div class="btn-wrap mgb-80">-->
  <!--      <button type="button" class="btn-main small">더보기</button>-->
  <!--    </div>-->
  <!--  </div>-->
</template>
<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator';
import LibraryVideoList from '@/components/libraryVideoList/index.vue';

@Component({
  layout: 'default',
  components: {
    LibraryVideoList,
  },
  async fetch({ params, store }) {
    try {
      if (!params.product) {
        // 제품코드로 제품정보 조회
        await store.dispatch('video/productByCode', params.productCode);
      } else {
        await store.commit('video/selectedProduct', params.product);
      }

      // 제품에 대한 동영상 목록 조회
      await store.dispatch('video/getVideosByProduct', {
        data: store.state.video.selectedProduct,
      });
    } catch (e) {
      console.error(e);
    }
  },
})
export default class extends Vue {}
</script>

<style lang="scss"></style>
