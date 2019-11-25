<template>
  <div>
    자료실 동영상 수정 페이지

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
}
</script>

<style scoped></style>
