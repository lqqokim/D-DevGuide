<template>
  <forum-my></forum-my>
</template>
<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator';
import ForumMy from '~/components/forumMy/index.vue';

@Component({
  layout: 'TypeA',
  components: {
    ForumMy,
  },
})
export default class extends Vue {}
</script>

<style lang="scss"></style>
