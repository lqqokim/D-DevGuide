<template>
  <div class="container-panel">
    <!-- 내가 작성한 질문 -->
    <my-forum-list />

    <!-- 네기 갑변한 질문 -->
    <my-reply-forum-list />
  </div>
</template>
<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator';
import MyForumList from './MyForumList.vue';
import MyReplyForumList from './MyReplyForumList.vue';

@Component({
  components: {
    MyForumList,
    MyReplyForumList,
  },
})
export default class ForumMy extends Vue {}
</script>

<style scoped></style>
