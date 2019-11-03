<template>
  <div></div>
</template>
<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator';
import ForumRegister from '~/components/forumRegister/index.vue';

@Component({
  layout: 'TypeA',
  components: {
    ForumRegister,
  },
})
export default class extends Vue {}
</script>

<style lang="scss"></style>
