<template>
  <div>
    <h2>자료실 페이지</h2>
    <hr />

    <!--파일 업로드 컴포넌트-->
    <file-register></file-register>
    <hr />
    <!--파일 리스트 영역-->
    <file-list></file-list>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator';
import FileList from '@/components/common/file/FileList.vue';
import FileRegister from '@/components/common/file/FileRegister.vue';

@Component({
  layout: 'type1',
  components: {
    FileRegister,
    FileList,
  },
})
export default class Storage extends Vue {}
</script>

<style scoped></style>
