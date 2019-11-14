<template>
  <div>관리자 동영상 페이지</div>
</template>
<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator';
import AdminVideoList from '~/components/adminVideo/index.vue';

@Component({
  layout: 'TypeA',
  components: {
    AdminVideoList,
  },
})
export default class extends Vue {}
</script>

<style lang="scss"></style>
