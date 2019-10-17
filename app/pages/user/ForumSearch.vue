<template>
  <forum-search></forum-search>
</template>
<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator';
import ForumSearch from '~/components/forumSearch/index.vue';

@Component({
  layout: 'TypeA',
  components: {
    ForumSearch,
  },
})
export default class extends Vue {}
</script>

<style scoped></style>
