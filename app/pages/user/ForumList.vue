<template>
  <forum-list></forum-list>
</template>
<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator';
import ForumList from '~/components/forumList/index.vue';

@Component({
  layout: 'TypeA',
  components: {
    ForumList,
  },
})
export default class extends Vue {}
</script>
