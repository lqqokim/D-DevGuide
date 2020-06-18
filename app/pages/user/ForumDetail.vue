<template>
  <div>내용</div>
</template>
<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator';
import ForumDetail from '~/components/forumDetail/index.vue';

@Component({
  layout: 'TypeA',
  components: {
    ForumDetail,
  },
})
export default class extends Vue {}
</script>

<style lang="scss"></style>
