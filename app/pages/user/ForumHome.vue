<template>
  <forum-home></forum-home>
</template>
<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator';
import ForumHome from '~/components/forumHome/index.vue';

@Component({
  layout: 'TypeA',
  components: {
    ForumHome,
  },
})
export default class extends Vue {}
</script>

<style lang="scss"></style>
