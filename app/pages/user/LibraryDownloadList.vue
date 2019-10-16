<template>
  <download-list></download-list>
</template>
<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator';
import DownloadList from '~/components/library/download/DownloadList.vue';

@Component({
  layout: 'TypeA',
  components: {
    DownloadList,
  },
})
export default class extends Vue {}
</script>

<style scoped></style>
