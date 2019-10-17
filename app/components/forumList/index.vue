<template>
  <div>
    <div>
      질문답변 리스트 페이지
    </div>
    카테고리 : {{ this.$route.params.categoryName }}
  </div>
</template>
<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator';

@Component
export default class ForumList extends Vue {}
</script>
