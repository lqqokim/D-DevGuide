<template>
  <div class="base-wrap">
    <HeaderComp></HeaderComp>

    <div class="dbs-container-wrap">
      <template v-if="isBannerLoad">
        <keep-alive>
          <component :is="bannerLoader"></component>
        </keep-alive>
      </template>
    </div>

    <nuxt />

    <FooterComp></FooterComp>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator';
import HeaderComp from '@/components/common/header/index.vue';
import FooterComp from '@/components/common/footer/index.vue';

@Component({
  components: {
    HeaderComp,
    FooterComp,
  },
})
export default class SearchLayout extends Vue {
  /*
LNB_VIEWER = 'Viewer';
LNB_EDITING = 'Editing';
LNB_DEV = 'Dev';
LNB_LIB = 'Library';
LNB_FORUM = 'Forum';
*/
  get bannerLoader() {
    return () =>
      import(
        `@/components/common/banner/${this.$route.meta.pageType}Banner.vue`
      );
  }

  get isBannerLoad() {
    return !!this.$route.meta.pageType;
  }
}
</script>
<style lang="scss"></style>
