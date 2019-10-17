<template>
  <forum-detail></forum-detail>
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

<style scoped></style>
