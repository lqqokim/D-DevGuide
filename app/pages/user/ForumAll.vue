<template>
  <forum-all></forum-all>
</template>
<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator';
import ForumAll from '~/components/forumAll/index.vue';

@Component({
  layout: 'TypeA',
  components: {
    ForumAll,
  },
})
export default class extends Vue {}
</script>

<style lang="scss"></style>
