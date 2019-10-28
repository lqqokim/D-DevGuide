<template>
  <ul>
    <li v-for="project in projects" :key="project.id">
      <product-card-list-item :project="project"></product-card-list-item>
    </li>
  </ul>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator';
import ProductCardListItem from '~/components/productList/ProductCardListItem.vue';

@Component({
  components: {
    ProductCardListItem,
  },
})
export default class ProductCardList extends Vue {
  get projects() {
    return this.$store.state.projects.list;
  }
}
</script>
