<template>
  <div>
    제품 리스트 페이지
  </div>
  <!--  <ProjectCard></ProjectCard>-->
</template>
<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator';
import ProjectCard from '~/components/ProjectList/ProjectCard.vue';
import { GET_PROJECT_LIST } from '~/utils/storeTypes';

@Component({
  layout: 'typeA',
  components: {
    ProjectCard,
  },
})
export default class ProductList extends Vue {
  async fetch({ store }) {
    try {
      await store.dispatch(`projects/${GET_PROJECT_LIST}`);
    } catch (e) {
      console.log(e);
    }
  }
}
</script>

<style scoped></style>
