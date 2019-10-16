<template>
  <div>질문답변 {{ this.$route.params.categoryName }} 리스트 페이지</div>
</template>
<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator';

@Component
export default class ForumList extends Vue {}
</script>
