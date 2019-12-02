<template>
  <div>로그인 화면 입니다.</div>
</template>
<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator';
import LoginComp from '~/components/login/index.vue';

@Component({
  layout: 'login',
  components: {
    LoginComp,
  },
})
export default class extends Vue {}
</script>

<style lang="scss"></style>
