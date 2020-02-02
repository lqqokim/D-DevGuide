<template>
  <div class="fileUpload">
    <input
      ref="fileInput"
      type="file"
      name="storageFile"
      :accept="FILE_ACCEPT_TYPES"
      @change="onSelect"
    />
    <button @click="upload">전송</button>
  </div>
</template>
<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator';

@Component
export default class FileRegister extends Vue {
  private file: any;
  readonly FILE_ACCEPT_TYPES: Array<String> = [
    // 'image/*',
    // 'video/*',
    // 'audio/*',
    // '.csv',
    // 'text/plain',
    'application/pdf',
    // 'application/msword',
    // 'application/vnd.ms-excel',
    // 'application/vnd.ms-powerpoint',
    // 'application/vnd.openxmlformats-officedocument.presentationml.slideshow',
    // 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
    // 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  ];

  // for TS2339 $refs error
  $refs!: {
    fileInput: HTMLFormElement;
  };

  onSelect(): void {
    this.file = this.$refs.fileInput;
    // this.file = this.$refs.fileInput.files; // multiple
  }

  upload(): void {
    if (!this.file) return;
    const formData = new FormData();
    formData.append('name', this.file.name);
    formData.append('file', this.file.files[0]);

    /**
     * TODO 화면 디자인 나오면 폼 바인딩 데이터로 변경
     */

    this.$axios
      .post('api/library/download/upload', formData)
      .then((res) => {
        // 파일 초기화
        this.initialFile();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  initialFile(): void {
    this.file = null;
    this.$refs.fileInput.value = '';
  }
}
</script>
<style scoped></style>
