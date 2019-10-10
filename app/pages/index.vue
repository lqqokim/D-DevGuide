<template>
  <ProjectCard />
  <!--  <div class="navbar">-->
  <!--    <a href="#home"></a>-->
  <!--    <div class="subnav">-->
  <!--      <button class="subnavbtn">About <i class="fa fa-caret-down"></i></button>-->
  <!--      <div class="subnav-content">-->
  <!--        <a href="#company">Company</a>-->
  <!--        <a href="#team">Team</a>-->
  <!--        <a href="#careers">Careers</a>-->
  <!--      </div>-->
  <!--    </div>-->
  <!--    <a href="#contact">Contact</a>-->
  <!--  </div>-->
</template>

<script lang="ts">
import Vue from 'vue';
import ProjectCard from '@/components/ProjectList/ProjectCard.vue';
import { GET_PROJECT_LIST } from '@/utils/storeTypes';

export default Vue.extend({
  layout: 'type1',
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
