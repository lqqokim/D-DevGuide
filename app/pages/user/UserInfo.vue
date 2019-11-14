<template>
  <user-info></user-info>
</template>
<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator';
import UserInfo from '~/components/userInfo/index.vue';

@Component({
  layout: 'TypeA',
  components: {
    UserInfo,
  },
})
export default class extends Vue {}
</script>

<style lang="scss"></style>
