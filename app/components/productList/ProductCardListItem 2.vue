<template>
  <div>
    <!--<nuxt-link-->
    <!--:to="{-->
    <!--name: 'detail',-->
    <!--params: {-->
    <!--productId: project.projectId,-->
    <!--data: project,-->
    <!--pageType: 'Documents',-->
    <!--},-->
    <!--}"-->
    <!--tag="div"-->
    <!--class="product"-->
    <!--&gt;-->
    <!--<h2>{{ project.projectId }}</h2>-->
    <!--<h2>{{ project.productName }}</h2>-->
    <!--<h4>{{ project.productDescription }}</h4>-->
    <!--</nuxt-link>-->
    <!--<div class="product">{{ project.productName }}</div>-->
  </div>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue';

interface Project {
  projectId: string;
  productName: string;
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

<style></style>
