<template>
  <forum-register></forum-register>
</template>
<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator';
import ForumRegister from '~/components/forum/ForumRegister.vue';

@Component({
  layout: 'TypeA',
  components: {
    ForumRegister,
  },
})
export default class extends Vue {}
</script>

<style scoped></style>
