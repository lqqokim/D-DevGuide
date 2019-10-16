<template>
  <forum-list></forum-list>
</template>
<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator';
import ForumList from '~/components/forum/ForumList.vue';

@Component({
  layout: 'TypeA',
  components: {
    ForumList,
  },
})
export default class extends Vue {}
</script>
