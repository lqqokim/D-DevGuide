<template>
  <nuxt-link
    :to="{ name: 'detail', params: { productId: project.id, data: project } }"
    class="project-link"
  >
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
  name: 'ProductCardListItem',
  props: {
    project: {
      type: Object as PropType<Project>,
      default: () => {},
    },
  },
  methods: {
    created() {
      console.log('project :: ', this.$props.project);
    },
    beforeUpdate() {
      console.log('beforeUpdate prj:: ', this.$props);
    },
    updated() {
      console.log('project :: ', this.$props.project);
    },
  },
});
</script>

<style lang="scss">
.project-link {
  color: $green-color;
}
</style>
