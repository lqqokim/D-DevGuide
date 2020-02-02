<template>
  <div class="dbs-container-wrap">
    <template v-if="isBannerLoad">
      <keep-alive>
        <component :is="bannerLoader"></component>
      </keep-alive>
    </template>

    <template v-if="isLnbLoad">
      <div class="dbs-container mgb-0">
        <div class="content-wrap">
          <keep-alive>
            <component :is="lnbLoader"></component>
          </keep-alive>
          <slot />
        </div>
      </div>
    </template>

    <template v-else>
      <slot />
    </template>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator';
// import ProductTopSection from '@/components/productDocView/ProductTopSection.vue';
// import ManageLeftMenu from '@/components/productManage/ManageLeftMenu.vue';
// import ProductLeftMenuTree from '@/components/productDocView/ProductLeftMenu.vue';

// import LibraryBanner from '@/components/common/banner/LibraryBanner.vue';
// import ForumBanner from '@/components/common/banner/ForumBanner';

@Component({
  components: {
    // ProductTopSection,
    // ManageLeftMenu,
    // ProductLeftMenuTree,
  },
})
export default class MenuComp extends Vue {
  /*
    LNB_VIEWER = 'Viewer';
    LNB_EDITING = 'Editing';
    LNB_DEV = 'Dev';
    LNB_LIB = 'Library';
    LNB_FORUM = 'Forum';
  */
  get bannerLoader() {
    // console.log('bannerLoader :: ', this.$route.meta.pageType);

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
    console.log('lnbLoader :: ', this.$route.meta.lnbType);

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

<style scoped></style>
