<template>
  <forum-manage></forum-manage>
</template>
<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator';
import ForumManage from '~/components/forumManage/index.vue';

@Component({
  layout: 'TypeA',
  components: {
    ForumManage,
  },
})
export default class extends Vue {}
</script>

<style lang="scss"></style>
