<template>
  <ul>
    <li v-for="project in projects" :key="project.id">
      <product-card-list-item :project="project"></product-card-list-item>
    </li>
  </ul>
</template>

<script lang="ts">
import Vue from 'vue';
import ProductCardListItem from '~/components/productList/ProductCardListItem.vue';

export default Vue.extend({
  name: 'ProductCardList',
  components: {
    ProductCardListItem,
  },
  computed: {
    projects(): [] {
      return this.$store.state.projects.list;
    },
  },
});
</script>
