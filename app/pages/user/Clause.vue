<template>
  <clause></clause>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator';
import Clause from '~/components/clause/index.vue';

@Component({
  layout: 'default',
  components: {
    Clause,
  },
})
export default class extends Vue {}
</script>

<style></style>
