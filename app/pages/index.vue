<template>
  <ProjectCard />
</template>

<script lang="ts">
import Vue from 'vue';
import ProjectCard from '@/components/ProjectList/ProjectCard.vue';
import { GET_PROJECT_LIST } from '@/utils/storeTypes';

export default Vue.extend({
  layout: 'typeA',
  components: {
    ProjectCard,
  },
  async fetch({ store }) {
    try {
      await store.dispatch(`projects/${GET_PROJECT_LIST}`);
    } catch (e) {
      console.log(e);
    }
  },
});
</script>
