<template>
  <div></div>
</template>
<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator';
import ForumProductDetail from '~/components/forumProductDetail/index.vue';

@Component({
  layout: 'TypeA',
  components: {
    ForumProductDetail,
  },
})
export default class extends Vue {}
</script>

<style lang="scss"></style>
