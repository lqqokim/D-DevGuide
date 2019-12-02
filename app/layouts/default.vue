<template>
  <div class="base-wrap">
    <HeaderComp></HeaderComp>

    <div class="dbs-container-wrap">
      <!--    <product-top-section></product-top-section>-->
      <template v-if="isBannerLoad">
        <keep-alive>
          <component :is="bannerLoader"></component>
        </keep-alive>
      </template>

      <template v-if="isLnbLoad">
        <div class="dbs-container mgb-0">
          <div class="content-wrap">
            <!--        <manage-left-menu></manage-left-menu>-->
            <!--<product-left-menu-tree></product-left-menu-tree>-->
            <keep-alive>
              <component :is="lnbLoader"></component>
            </keep-alive>

            <nuxt />
          </div>
        </div>
      </template>

      <template v-else>
        <nuxt />
      </template>
    </div>
    <FooterComp></FooterComp>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator';
import HeaderComp from '@/components/common/header/index.vue';
import FooterComp from '@/components/common/footer/index.vue';
import MenuComp from '@/layouts/menu/index.vue';

@Component({
  components: {
    HeaderComp,
    FooterComp,
    MenuComp,
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

    return () =>
      import(
        `@/components/common/banner/${this.$route.meta.pageType}Banner.vue`
      );
  }

  /*
    PAGE_DEV = 'Dev';
    PAGE_LIB = 'Library';
    PAGE_FORUM = 'Forum';
  */
  get lnbLoader() {
    console.log('lnbLoader :: ', this.$route.meta.pageType);

    return () =>
      import(`@/components/common/lnb/${this.$route.meta.lnbType}Menu.vue`);
  }

  get isBannerLoad() {
    return !!this.$route.meta.pageType;
  }

  get isLnbLoad() {
    return !!this.$route.meta.useLeftMenu;
  }
}
</script>
