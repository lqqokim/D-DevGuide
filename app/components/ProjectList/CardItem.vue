<template>
  <nuxt-link :to="`/project/${project.id}`" class="project-link">
    {{ project.name }}
  </nuxt-link>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue';

interface Project {
  id: number;
  name: string;
}

export default Vue.extend({
  props: {
    project: {
      type: Object as PropType<Project>,
      default: () => {},
    },
  },
});
</script>

<style lang="scss">
.project-link {
  color: $green-color;
}
</style>
