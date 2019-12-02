<template>
  <div class="container-panel">
    <div class="view-top">
      <h3 class="tit-con-text">
        동영상 등록/수정
      </h3>
      <div class="position-wrap">
        <input type="button" value="<-돌아가기" @click="onClickCancel" />
      </div>
    </div>
    <series-edit v-if="$store.state.video.selectedVideo.isSeries"></series-edit>
    <single-edit v-else></single-edit>
  </div>
</template>
<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator';
import SeriesEdit from '~/components/libraryVideoEdit/SeriesEdit.vue';
import SingleEdit from '~/components/libraryVideoEdit/SingleEdit.vue';

@Component({
  components: {
    SeriesEdit,
    SingleEdit,
  },
})
export default class LibraryVideoEdit extends Vue {
  created() {
    console.log('created ', this.$store.state.video.selectedVideo);
  }

  onClickCancel() {}
}
</script>

<style scoped></style>
