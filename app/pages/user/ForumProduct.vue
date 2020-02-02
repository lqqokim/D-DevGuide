<template>
  <div></div>
</template>
<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator';
import ForumProduct from '~/components/forumProduct/index.vue';

@Component({
  layout: 'TypeA',
  components: {
    ForumProduct,
  },
})
export default class extends Vue {}
</script>

<style lang="scss"></style>
