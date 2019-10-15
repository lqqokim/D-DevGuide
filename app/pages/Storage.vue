<template>
  <div>
    <h2>자료실 페이지</h2>
    <hr />

    <!--파일 업로드 컴포넌트-->
    <FileRegister></FileRegister>
    <hr />
    <!--파일 리스트 영역-->
    <FileList></FileList>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator';
import FileList from '@/components/FileComponent/FileList.vue';
import FileRegister from '@/components/FileComponent/FileRegister.vue';

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
