<template>
  <download-list></download-list>
</template>
<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator';
import DownloadList from '~/components/libraryDownloadList/index.vue';

@Component({
  components: {
    DownloadList,
  },
})
export default class extends Vue {}
</script>

<style lang="scss"></style>
