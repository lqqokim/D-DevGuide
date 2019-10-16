<template>
  <ul>
    <li v-for="project in projects" :key="project.id">
      <CardItem :project="project"></CardItem>
    </li>
  </ul>
</template>

<script lang="ts">
import Vue from 'vue';
import CardItem from './ProductCardListItem.vue';

export default Vue.extend({
  components: {
    CardItem,
  },
  computed: {
    projects(): [] {
      return this.$store.state.projects.list;
    },
  },
});
</script>
