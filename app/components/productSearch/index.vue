<template>
  <div class="dbs-container">
    <search-bar></search-bar>
    <search-contents></search-contents>
  </div>
</template>
<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator';
import SearchBar from '~/components/common/search/searchBar.vue';
import SearchContents from '~/components/productSearch/SearchContents.vue';

@Component({
  components: {
    SearchBar,
    SearchContents,
  },
})
export default class ProductSearch extends Vue {}
</script>

<style scoped></style>
