<template>
  <div id="baseWrap" class="base-wrap">
    <HeaderComp></HeaderComp>

    <div class="dbs-container-wrap">
      <!--    <product-top-section></product-top-section>-->
      <template v-if="isBannerLoad">
        <!--        <keep-alive>-->
        <component :is="bannerLoader"></component>
        <!--        </keep-alive>-->
        <div
          v-if="
            $route.params.branchName !== undefined &&
              ($route.name === 'branchDocViewInit' ||
                $route.name === 'branchDocView')
          "
          class="dbs-viewer-desc"
        >
          작성중인 브랜치(<span class="write-branch">{{
            $route.params.branchName
          }}</span
          >)의 문서를 조회 중입니다.
        </div>
      </template>

      <template v-if="isLnbLoad">
        <div class="dbs-container mgb-0">
          <div class="content-wrap">
            <keep-alive
              v-if="
                $route.meta.lnbType === 'Viewer' ||
                  $route.meta.lnbType === 'Editing'
              "
            >
              <component :is="lnbLoader"></component>
            </keep-alive>

            <component :is="lnbLoader" v-else></component>
            <nuxt />
          </div>
        </div>
      </template>
      <template v-else>
        <nuxt />
      </template>
    </div>
    <FooterComp></FooterComp>
    <alert-component v-show="alertInfo.isShow" :info="alertInfo" />
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator';
import { IAlert } from '@/store/modules/common';
import HeaderComp from '@/components/common/header/index.vue';
import FooterComp from '@/components/common/footer/index.vue';
import AlertComponent from '@/components/common/alert/index.vue';

@Component({
  components: {
    HeaderComp,
    FooterComp,
    AlertComponent,
  },
})
export default class extends Vue {
  /*
    LNB_VIEWER = 'Viewer';
    LNB_EDITING = 'Editing';
    LNB_DEV = 'Dev';
    LNB_LIB = 'Library';
    LNB_FORUM = 'Forum';
  */
  get bannerLoader() {
    console.log('bannerLoader :: ', this.$route.meta.pageType);
    const pageType = this.$route.meta.pageType;
    return () => import(`@/components/common/banner/${pageType}Banner.vue`);
  }

  created() {
    // this.$store.subscribe((mutation, state) => {
    //   console.log('sub ', state);
    // });
  }

  /*
      PAGE_DEV = 'Dev';
      PAGE_LIB = 'Library';
      PAGE_FORUM = 'Forum';
    */
  get lnbLoader() {
    const lnbType = this.$route.meta.lnbType;
    return () => import(`@/components/common/lnb/${lnbType}Menu.vue`);
  }

  get alertInfo(): IAlert {
    return this.$store.state.common.alert;
  }

  get isBannerLoad() {
    return !!this.$route.meta.pageType;
  }

  get isLnbLoad() {
    return !!this.$route.meta.useLeftMenu;
  }
}
</script>
